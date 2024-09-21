import sqlite3
import uvicorn
from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer
from PIL import Image, ImageDraw, ImageFont
from pydantic import BaseModel
from jose import JWTError, jwt
import io
import random
import string
import base64
from io import BytesIO
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
import requests
import schedule
import time
import json
from datetime import datetime, timezone, timedelta
import asyncio
import threading
import random

# 配置
SECRET_KEY = "macaujc"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# 初始化 FastAPI
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许的源
    allow_credentials=True,  # 允许携带凭证（如 cookies）
    allow_methods=["*"],  # 允许的 HTTP 方法（GET, POST 等）
    allow_headers=["*"],  # 允许的请求头
)

# SQLite 数据库连接
def get_db():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row  # 将结果作为字典返回
    return conn

# OAuth2 密码模式
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 创建数据库并初始化用户表
def init_db():
    conn = get_db()
    conn.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )''')
    conn.execute('''CREATE TABLE IF NOT EXISTS jsons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        val TEXT NOT NULL
    )''')
    conn.execute('''CREATE TABLE IF NOT EXISTS lives (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        val TEXT NOT NULL
    )''')
    conn.execute('''CREATE TABLE IF NOT EXISTS plat (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        expect TEXT NOT NULL UNIQUE,
        openCode TEXT NOT NULL,
        openTime TEXT NOT NULL
    )''')
    conn.commit()
    conn.close()

# Pydantic 模型
class Token(BaseModel):
    access_token: str
    token_type: str

class LoginModel(BaseModel):
    username: str
    password: str
    captcha: str
    captcha_id: str

# 图片验证码生成
captcha_storage: Dict[str, str] = {}

def generate_captcha() -> (str, bytes):
    # 定义图片大小
    width, height = 50, 20  # 可以根据需要调整图片的大小
    image = Image.new('RGB', (width, height), (255, 255, 255))
    draw = ImageDraw.Draw(image)

    # 生成随机验证码
    captcha_text = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))

    # 设置字体大小
    font = ImageFont.load_default()  # 使用系统字体或自定义字体

    # 计算文本的边界框（更精准地获取文本尺寸）
    bbox = draw.textbbox((0, 0), captcha_text, font=font)
    text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]

    # 计算文本的 x 和 y 位置，使其居中
    x = (width - text_width) // 2
    y = (height - text_height) // 2

    # 绘制验证码文本
    draw.text((x, y), captcha_text, font=font, fill=(0, 0, 0))

    # 将图片保存为二进制数据
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    buffer.seek(0)

    # 将图片转换为 Base64 编码
    img_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return img_base64, captcha_text

# 验证验证码
def verify_captcha(captcha_id: str, captcha_input: str):
    if captcha_storage.get(captcha_id) == captcha_input.upper():
        return True
    return False

# 获取验证码图片接口
@app.get("/api/captcha")
async def get_captcha():
    captcha_id = ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))
    captcha_image, captcha_text = generate_captcha()
    
    # 存储验证码
    captcha_storage[captcha_id] = captcha_text
    return {
        "captcha_id": captcha_id,
        "captcha_image": captcha_image
    }

# 创建 Token
def create_access_token(data: dict):
    token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return token

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None  # Token expired
    except jwt.InvalidTokenError:
        return None  # Invalid token

# 登录接口
@app.post("/api/login", response_model=Token)
async def login(login_data: LoginModel):
    # 检查验证码是否正确
    if not verify_captcha(login_data.captcha_id, login_data.captcha):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid captcha"
        )

    # 数据库查找用户
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", 
                   (login_data.username, login_data.password))
    user = cursor.fetchone()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

    # 验证通过，生成 token
    access_token = create_access_token(data={"sub": login_data.username})
    return {"access_token": access_token, "token_type": "bearer"}




#################################  数据抓取  ###################################################

# 保存数据到数据库（插入或更新）
def save_data_to_db(key, json_data):
    conn = get_db()
    cursor = conn.cursor()
    
    # 插入或替换数据
    cursor.execute('''
        INSERT OR REPLACE INTO jsons (key, val) VALUES (?, json(?))
    ''', (key, json.dumps(json_data)))  # 使用 json.dumps() 将 JSON 数据转换为字符串存储
    conn.commit()
    conn.close()

# 获取数据并存储
def fetch_data():
    # 假设你有 6 个接口，分别获取数据
    urls = [
        'https://api.macaumarksix.com/api/macaujc2.com', 
        'https://api.macaumarksix.com/history/macaujc2/y/2024',
        'https://api.macaumarksix.com/api/macaujc.com', 
        'https://api.macaumarksix.com/history/macaujc/y/2024', 
    ]

    keys = ['macaujc2', 'macaujc2his', 'macaujc', 'macaujchis']

    for i, url in enumerate(urls):
        print('-- 同步六合彩数据 --')
        try:
            response = requests.get(url)
            if response.status_code == 200:
                json_data = response.json()  # 获取JSON数据
                save_data_to_db(keys[i], json_data)  # 存储数据
                print(f"Data for {keys[i]} saved successfully.")
            else:
                print(f"Failed to fetch data from {url}, status code: {response.status_code}")
        except Exception as e:
            print(f"Error fetching data from {url}: {e}")

# 获取数据并存储
async def fetch_data3():
    # 假设你有 6 个接口，分别获取数据
    urls = [
        '', 
        'https://api.macaumarksix.com/history/macaujc3' 
    ]

    keys = ['', 'macaujc3his']
    payload = {"pageNo": 1, "pageSize": 500}
    print('-- 开始抓取历史数据 --')
    try:
        # 发送 POST 请求
        response = requests.post('https://api.macaumarksix.com/history/macaujc3', json=payload)
        # 检查请求是否成功
        if response.status_code == 200:
            json_data = response.json()  # 获取JSON数据
            save_data_to_db("macaujc3his", json_data)  # 存储数据
            print("Data for macaujc3his saved successfully.")
        else:
            print(f"Failed to fetch data, status code: {response.status_code}")
    except Exception as e:
        print(f"Error fetching data: {e}")
    print('-- 开始抓取--')
    try:
        response = requests.get('https://api.macaumarksix.com/api/macaujc3.com')
        if response.status_code == 200:
            json_data = response.json()  # 获取JSON数据
            save_data_to_db('macaujc3', json_data)  # 存储数据

            print(f"Data for macaujc3 saved successfully.")

            open_time_str = json_data['data'][0]['openTime']
            # 将 openTime 转换为 naive datetime
            open_time = datetime.fromisoformat(open_time_str) 
            # 获取当前时间 (naive, 没有时区信息)
            current_time = datetime.now()  # 本地当前时间
            # 计算时间差
            time_difference = (current_time - open_time).total_seconds()
            # 打印时间差
            print(f"时间差: {time_difference}")
            # 判断时间差
            if time_difference < 0:
                fetch_data3()
            else:
                wait_time = time_difference + 20
                await asyncio.sleep(wait_time)
                await fetch_data3()
        else:
            print(f"Failed to fetch data, status code: {response.status_code}")
    except Exception as e:
        print(f"Error fetching data ")

class LivesModel(BaseModel):
    key: str
    value: str


# 修改直播地址
@app.post("/api/updateLives")
async def updateLives(updateData: LivesModel, token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # 插入或替换数据
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO lives (key, val)
        VALUES (:key, :val)
        ON CONFLICT(key) DO UPDATE SET val = excluded.val
        ''', (updateData.key, updateData.value))
    conn.commit()
    conn.close()
    return {
        "code": 200
    }

@app.get("/api/lives")
async def get_lives():
    # 数据库查找用户
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM lives")
    rows = cursor.fetchall()

    conn.close()
    return rows

    


# 获取新澳门六合彩
@app.get("/api/macaujc2")
async def get_macaujc2():
    # 数据库查找用户
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute('SELECT val FROM jsons WHERE key = ?', ('macaujc2',))
    result = cursor.fetchone()

    if result:
        json_data = json.loads(result[0])  # 解析为 JSON 对象
        return json_data
    else:
        return None

@app.get("/api/macaujc2his")
async def get_macaujc2his():
    # 数据库查找用户
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute('SELECT val FROM jsons WHERE key = ?', ('macaujc2his',))
    result = cursor.fetchone()

    if result:
        json_data = json.loads(result[0])  # 解析为 JSON 对象
        return json_data
    else:
        return None


# 获取澳门六合彩
@app.get("/api/macaujc")
async def get_macaujc():
    # 数据库查找用户
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute('SELECT val FROM jsons WHERE key = ?', ('macaujc',))
    result = cursor.fetchone()

    if result:
        json_data = json.loads(result[0])  # 解析为 JSON 对象
        return json_data
    else:
        return None

@app.get("/api/macaujchis")
async def get_macaujchis():
    # 数据库查找用户
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute('SELECT val FROM jsons WHERE key = ?', ('macaujchis',))
    result = cursor.fetchone()

    if result:
        json_data = json.loads(result[0])  # 解析为 JSON 对象
        return json_data
    else:
        return None


# 获取澳门六合彩3分
@app.get("/api/macaujc3")
async def get_macaujc3():
    # 数据库查找用户
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute('SELECT val FROM jsons WHERE key = ?', ('macaujc3',))
    result = cursor.fetchone()

    if result:
        json_data = json.loads(result[0])  # 解析为 JSON 对象
        return json_data
    else:
        return None

@app.get("/api/macaujc3his")
async def get_macaujc3his():
    # 数据库查找用户
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute('SELECT val FROM jsons WHERE key = ?', ('macaujc3his',))
    result = cursor.fetchone()

    if result:
        json_data = json.loads(result[0])  # 解析为 JSON 对象
        return json_data
    else:
        return None


# 获取平台彩
# 获取所有数据
@app.get("/api/platAll")
async def get_platAll():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT * FROM plat ORDER BY openTime DESC
    ''')
    rows = cursor.fetchall()
    result = [dict(row) for row in rows]
    conn.close()
    return result

# 获取当前时间之前的所有数据
@app.get("/api/plat")
async def get_plat():
    # 获取当前时间
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    # 连接数据库
    conn = get_db()
    cursor = conn.cursor()
    # 查询 openTime 小于当前时间的所有记录
    cursor.execute('''
        SELECT * FROM plat WHERE openTime < ?
        ORDER BY openTime DESC
    ''', (current_time,))
    # 获取所有结果
    rows = cursor.fetchall()
    # 将结果转换为列表格式
    result = [dict(row) for row in rows]
    # 关闭数据库连接
    conn.close()
    return result


# 定义请求体模型
class PlatUpdateRequest(BaseModel):
    expect: str
    openCode: str
# 更新 plat 表中 openCode 的接口
@app.post("/api/updatePlat")
async def update_plat(request: PlatUpdateRequest, token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    conn = get_db()
    cursor = conn.cursor()
    # 查找 expect 对应的记录
    cursor.execute('''
        SELECT * FROM plat WHERE expect = ?
    ''', (request.expect,))
    record = cursor.fetchone()
    if record is None:
        conn.close()
        raise HTTPException(status_code=404, detail="Record not found")

    # 更新 openCode
    cursor.execute('''
        UPDATE plat SET openCode = ? WHERE expect = ?
    ''', (request.openCode, request.expect))

    conn.commit()  # 提交更改
    conn.close()  # 关闭连接

    return {"message": "openCode updated successfully"}

# 定义每半小时运行一次的任务
schedule.every(30).minutes.do(fetch_data)
# 调度任务运行的函数
async def run_schedule():
    while True:
        schedule.run_pending()
        await asyncio.sleep(1) 

# 初始化数据库
@app.on_event("startup")
async def startup():
    init_db()
    # 启动定时任务
    # asyncio.create_task(fetch_data3())
    # 异步任务启动调度器
    # asyncio.create_task(run_schedule())
    print('-- 启动定时任务 --')

# 启动服务器
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
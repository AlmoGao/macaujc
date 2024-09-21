

安装
pip install fastapi uvicorn python-jose[cryptography] pillow requests schedule gunicorn


启动
python -m uvicorn main:app --reload


数据库
sqlite3 users.db

INSERT INTO users (username, password) VALUES ('admin', 'asd123jc');
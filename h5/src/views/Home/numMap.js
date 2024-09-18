
// hb-红波 lb-蓝波 lvb-绿波
export const numColorMap = {
    hb: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46],
    lb: [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48],
    lvb: [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]
}

// 生肖
export const numAniMap = {
    shu: [5, 17, 29, 41], // 鼠
    zhu: [6, 18, 30, 42], // 猪
    gou: [7, 19, 31, 43], // 狗
    ji: [8, 20, 32, 44], // 鸡
    hou: [9, 21, 33, 45], // 猴
    niu: [4, 16, 28, 40], // 牛
    yang: [10, 22, 34, 46], // 羊
    ma: [11, 23, 35, 47], // 马
    she: [12, 24, 36, 48], // 蛇
    long: [1, 13, 25, 37, 49], // 龙
    tu: [2, 14, 26, 38], // 兔
    hu: [3, 15, 27, 39], // 虎
}

// 获取号码的生肖文本
export const getAniText = num => {
    num = Number(num)
    if (numAniMap.shu.includes(num)) return '鼠'
    if (numAniMap.zhu.includes(num)) return '猪'
    if (numAniMap.gou.includes(num)) return '狗'
    if (numAniMap.ji.includes(num)) return '鸡'
    if (numAniMap.hou.includes(num)) return '猴'
    if (numAniMap.niu.includes(num)) return '牛'
    if (numAniMap.yang.includes(num)) return '羊'
    if (numAniMap.ma.includes(num)) return '马'
    if (numAniMap.she.includes(num)) return '蛇'
    if (numAniMap.long.includes(num)) return '龙'
    if (numAniMap.tu.includes(num)) return '兔'
    if (numAniMap.hu.includes(num)) return '虎'
    return ''
}
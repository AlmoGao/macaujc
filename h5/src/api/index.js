import http from "./request";

class HttpService {
  _captcha() {
    // 获取验证码
    return http("/api/captcha", {
      method: "get",
    });
  }
  _platAll() {
    // 星彩
    return http("/api/platAll", {
      method: "get",
    });
  }
  _plat() {
    // 星彩
    return http("/api/plat", {
      method: "get",
    });
  }
  _macaujc2() {
    // 新澳门六合彩-当前
    return http("/api/macaujc2", {
      method: "get",
    });
  }
  _macaujc2his() {
    // 新澳门六合彩-历史
    return http("/api/macaujc2his", {
      method: "get",
    });
  }
  _macaujc3() {
    // 澳门六合彩3分-当前
    return http("/api/macaujc2", {
      method: "get",
    });
  }
  _macaujc3his() {
    // 澳门六合彩3分-历史
    return http("/api/macaujc2his", {
      method: "get",
    });
  }
  _macaujc() {
    // 澳门六合彩-当前
    return http("/api/macaujc", {
      method: "get",
    });
  }
  _macaujchis() {
    // 澳门六合彩-历史
    return http("/api/macaujchis", {
      method: "get",
    });
  }
  _lives() {
    // 澳门六合彩-历史
    return http("/api/lives", {
      method: "get",
    });
  }

  _updatePassword(data) {
    // 修改密
    return http("/api/updatePassword", {
      method: "post",
      data,
    });
  }
  _cheats() {
    // 获取攻略
    return http("/api/cheats", {
      method: "get",
    });
  }
  _createCheat(data) {
    // 新增攻略
    return http("/api/createCheat", {
      method: "post",
      data,
    });
  }
  _updateCheat(data) {
    // 修改攻略
    return http("/api/updateCheat", {
      method: "post",
      data,
    });
  }
  _deleteCheat(data) {
    // 删除攻略
    return http("/api/deleteCheat", {
      method: "post",
      data,
    });
  }

  _updateMacaujc2Code(data) {
    // 登录
    return http("/api/updateMacaujc2Code", {
      method: "post",
      data,
    });
  }
  _updateMacaujcCode(data) {
    // 登录
    return http("/api/updateMacaujcCode", {
      method: "post",
      data,
    });
  }
  _login(data) {
    // 登录
    return http("/api/login", {
      method: "post",
      data,
    });
  }
  _updateLives(data) {
    // 修改直播地址
    return http("/api/updateLives", {
      method: "post",
      data,
    });
  }
  _updatePlat(data) {
    // 修改号码
    return http("/api/updatePlat", {
      method: "post",
      data,
    });
  }


}

const https = new HttpService();
export default https;

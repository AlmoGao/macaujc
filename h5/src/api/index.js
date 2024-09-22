import http from "./request";

class HttpService {
  _captcha() {
    // 获取验证码
    return http("/api/captcha", {
      method: "get",
    });
  }
  _platAll() {
    // 新彩
    return http("/api/platAll", {
      method: "get",
    });
  }
  _plat() {
    // 新彩
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

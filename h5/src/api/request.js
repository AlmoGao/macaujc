import axios from "axios";
import router from "@/router";
import store from "../store/index";
import { showToast } from 'vant'

class Interceptors {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8000/",
      timeout: 20000,
    });
  }
  // 初始化拦截器
  init() {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = store.state.token;
        if (token) {
          config.headers["Authorization"] = 'Bearer ' + token;
        }
        if (config['Content-Type']) {
          config.headers["Content-Type"] = config['Content-Type']
        }
        return config;
      },
      (error) => {
        showToast(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const res = response.data;
        return res
      },
      (error) => {
        if (error.response?.data?.detail) {
          showToast(error.response.data.detail);
        } else {
          showToast(error.message);
        }
        return Promise.reject(error);
      }
    );
  }
  // 返回一下
  getInterceptors() {
    return this.instance;
  }
}
const instance = new Interceptors();
instance.init();
export default instance.getInterceptors();

/**
 * @author City
 * @description axios封装，请求拦截、响应拦截、错误统一处理
 */

import axios from "axios";
import Vue from "vue";
import router from "../router";

// 创建axios实例
const instance = axios.create({ baseURL: "http://localhost:3000/admin/api" });
// 设置post请求头
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        if (localStorage.token) config.headers.Authorization = "Bearer " + localStorage.token;
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response;
    },
    error => {
        // 对响应错误做点什么

        // pop error info
        if (error.response.data.message) {
            Vue.prototype.$message.error(error.response.data.message);
        }

        // login
        if (error.response.status === 401) {
            router.push("/login");
        }

        return Promise.reject(error);
    }
);

export default instance;

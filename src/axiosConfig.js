import axios from "axios";

// 공통 설정
axios.defaults.baseURL = "http://15.164.17.221:8080";
axios.defaults.withCredentials = true;

// ✅ Authorization 헤더 설정
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // ✅ Bearer 중복 방지
      config.headers["Authorization"] = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default axios;
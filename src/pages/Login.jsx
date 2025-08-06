import { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const API_BASE = "http://15.164.17.221:8080";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ AuthContext에서 전역 유저 저장

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/ecomos/auth/signin`, {
        email,
        password,
      });

      const token = res.headers["authorization"] || res.headers["Authorization"];
      if (!token) {
        alert("로그인 실패: 토큰 없음");
        return;
      }

      // ✅ 토큰 저장
      localStorage.setItem("token", token);

      // ✅ 장바구니 병합
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (localCart.length > 0) {
        try {
          await axios.post(`${API_BASE}/ecomos/cart/items/marge`, localCart, {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          });
          localStorage.removeItem("cart");
        } catch (mergeErr) {
          console.error("장바구니 병합 실패:", mergeErr);
        }
      }

      // ✅ 유저 정보 불러오기 (로그인 유지 목적)
      const meRes = await axios.get(`${API_BASE}/ecomos/auth/me`, {
        headers: {
          Authorization: token,
        },
      });
      setUser(meRes.data); // 전역 유저 정보 저장

      alert("로그인 성공");
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("로그인 실패: 잘못된 정보 또는 서버 오류");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          로그인
        </button>
      </form>
    </div>
  );
}

export default Login;

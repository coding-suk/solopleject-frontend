import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://15.164.17.221:8080";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
      name,
      role: "USER",
      address,
      birthDate, // "2025-01-01" 형태여야 함
    };

    console.log("📦 회원가입 요청 바디:", requestBody);

    try {
      await axios.post(`${API_BASE}/ecomos/auth/signup`, requestBody);
      alert("회원가입 성공! 로그인해주세요");
      navigate("/login");
    } catch (err) {
      console.error("❌ 회원가입 실패:", err);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block mb-1">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
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
        <div>
          <label className="block mb-1">주소</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">생년월일</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;

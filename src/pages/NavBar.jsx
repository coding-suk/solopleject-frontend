import { useAuth } from "../pages/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center mb-6 p-4 bg-gray-800 text-white">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">홈</Link>
        <Link to="/cart" className="hover:underline">장바구니</Link>
        {user && <Link to="/mypage/orders" className="hover:underline">마이페이지</Link>}
        {user && <Link to="/mypage/coupons" className="hover:underline">쿠폰</Link>}
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <span>{user.name}님 환영합니다!</span>
            <button onClick={logout} className="hover:underline">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">로그인</Link>
            <Link to="/signup" className="hover:underline">회원가입</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

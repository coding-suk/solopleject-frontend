// src/pages/MyCoupons.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const MyCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("/ecomos/coupons/my", {
          headers: { Authorization: token },
        });
        setCoupons(response.data);
      } catch (error) {
        console.error("쿠폰 조회 실패:", error);
      }
    };

    if (token) {
      fetchCoupons();
    }
  }, [token]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">내 쿠폰 목록</h2>
      {coupons.length === 0 ? (
        <p>보유 중인 쿠폰이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {coupons.map((coupon) => (
            <li key={coupon.id} className="border p-3 rounded shadow">
              <p className="font-semibold">{coupon.name}</p>
              <p>할인 금액: {coupon.discountAmount || coupon.discountRate + "%"}</p>
              <p>최소 주문 금액: {coupon.minOrderAmount}원</p>
              <p>만료일: {coupon.expiredAt}</p>
              <p>사용 여부: {coupon.used ? "사용됨" : "미사용"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCoupons;

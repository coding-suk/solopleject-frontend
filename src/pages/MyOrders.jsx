import { useEffect, useState } from "react";
import axios from "../axiosConfig";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/ecomos/orders/my")
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error("주문 내역 조회 실패:", err);
        alert("로그인이 필요하거나 오류가 발생했습니다.");
      });
  }, []);

  if (orders.length === 0) {
    return <p className="p-4">주문 내역이 없습니다.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">나의 주문 내역</h1>
      {orders.map((order) => (
        <div key={order.orderId} className="border-b pb-4 mb-4">
          <p><strong>주문일:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>상태:</strong> {order.status}</p>
          <p><strong>총 금액:</strong> {order.totalPrice}원</p>
          {/* 주문 상품 간단히 나열 */}
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
            {order.items?.map((item, idx) => (
              <li key={idx}>{item.productName} x {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;

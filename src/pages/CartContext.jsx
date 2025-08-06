import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();
const API_BASE = "http://15.164.17.221:8080"; // 필요 시 외부에서 주입 가능

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 1️⃣ 장바구니 로컬/초기 로드
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(localCart);
  }, []);

  // 2️⃣ 장바구니 저장 (localStorage + 서버)
  const saveCart = async (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // 게스트 장바구니 Redis 저장
    const guestId = localStorage.getItem("guestId");
    if (guestId) {
      try {
        await axios.post(
          `${API_BASE}/ecomos/cart/guest/save?guestId=${guestId}`,
          updatedCart
        );
      } catch (e) {
        console.error("서버에 게스트 장바구니 저장 실패:", e);
      }
    }
  };

  // 3️⃣ 장바구니에 상품 추가
  const addToCart = async (productId, quantity) => {
    const existing = cart.find((item) => item.productId === productId);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { productId, quantity }];
    }

    await saveCart(updatedCart);
  };

  // 4️⃣ 장바구니 항목 삭제
  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    await saveCart(updatedCart);
  };

  // 5️⃣ 장바구니 전체 초기화
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 커스텀 훅으로 꺼내쓰기 쉽게
export function useCart() {
  return useContext(CartContext);
}

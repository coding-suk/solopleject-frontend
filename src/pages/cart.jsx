import { useCart } from "../pages/CartContext";
import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { toast } from "react-toastify";

function Cart() {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();
  const [productDetails, setProductDetails] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      const promises = cart.map((item) =>
        axios.get(`/ecomos/sellers/products/${item.productId}`)
      );
      const responses = await Promise.all(promises);
      setProductDetails(responses.map((res) => res.data));
    };

    if (cart.length > 0) fetchProductDetails();
    else setProductDetails([]);
  }, [cart]);

  const getQuantity = (productId) => {
    const item = cart.find((c) => c.productId === productId);
    return item ? item.quantity : 0;
  };

  const toggleSelect = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  const totalPrice = productDetails.reduce((sum, product) => {
    const quantity = getQuantity(product.pId);
    return selectedItems.includes(product.pId)
      ? sum + product.price * quantity
      : sum;
  }, 0);

  const placeOrder = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다");
      return;
    }

    if (!address || !contact) {
      alert("배송지 정보와 연락처를 입력해주세요.");
      return;
    }

    const selectedCartItems = cart.filter((item) =>
      selectedItems.includes(item.productId)
    );

    if (selectedCartItems.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }

    axios
      .post(
        `/ecomos/orders`,
        {
          items: selectedCartItems,
          address,
          contact,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then(() => {
        toast.success("주문이 완료되었습니다!");
        clearCart();
        setSelectedItems([]);
        setAddress("");
        setContact("");
      })
      .catch((err) => {
        console.error("주문 실패:", err);
        alert("주문 실패: 로그인 여부 또는 권한 확인");
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>

      {productDetails.length === 0 ? (
        <p>장바구니가 비어 있습니다</p>
      ) : (
        <>
          {productDetails.map((product) => (
            <div key={product.pId} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(product.pId)}
                  onChange={() => toggleSelect(product.pId)}
                />
                <img src={product.imageURL} alt={product.name} className="w-20 h-20 object-cover" />
                <div>
                  <h2 className="font-semibold">{product.name}</h2>
                  <p>{product.price}원</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() => addToCart(product.pId, -1)}
                      disabled={getQuantity(product.pId) <= 1}
                    >
                      -
                    </button>
                    <span>{getQuantity(product.pId)}</span>
                    <button
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() => addToCart(product.pId, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="text-red-500"
                onClick={() => removeFromCart(product.pId)}
              >
                삭제
              </button>
            </div>
          ))}

          {/* 배송지 입력 */}
          <div className="mt-6">
            <label className="block mb-2 font-semibold">배송지 주소</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="예: 서울시 강남구 ..."
            />

            <label className="block mb-2 font-semibold">연락처</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="예: 010-1234-5678"
            />
          </div>

          {/* 총합 금액 */}
          <div className="text-right mt-6 font-semibold text-lg">
            총 금액: {totalPrice}원
          </div>

          <div className="text-right mt-4">
            <button
              onClick={placeOrder}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              주문하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

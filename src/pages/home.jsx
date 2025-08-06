import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useCart } from "../pages/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        axios
            .get("/ecomos/sellers/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("상품 목록 불러오기 실패:", err));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">이커머스 쇼핑몰 🛒</h1>            <div className="grid grid-cols-2 gap-4">
                {products.map((p) => (
                    <div key={p.pId} className="border rounded p-2 shadow">
                        <Link to={`/product/${p.pId}`}>
                            <img src={p.imageURL} alt={p.name} className="w-full h-40 object-cover mb-2" />
                            <h2 className="text-lg font-semibold">{p.name}</h2>
                            <p>{p.price}원</p>
                        </Link>
                        <button
                            className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                            onClick={() => {
                                addToCart(p.pId, 1);
                                toast.success(`${p.name}을(를) 장바구니에 담았습니다!`);
                            }}
                        >
                            장바구니 담기
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;

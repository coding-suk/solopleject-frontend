import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/ecomos/sellers/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("상품 상세 조회 실패", err));
  }, [productId]);

  if (!product) return <div>로딩 중...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <img src={product.imageURL} alt={product.name} className="w-full mb-4" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-2 font-semibold text-lg">가격: {product.price}원</p>
      <p className="mt-1 text-sm text-gray-600">카테고리: {product.category}</p>
      <p className="mt-1 text-sm text-gray-600">판매자: {product.sellerName}</p>
      <p className="mt-1 text-sm text-gray-600">재고: {product.stock}개</p>
    </div>
  );
}

export default ProductDetail;

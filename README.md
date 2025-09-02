# 🛍 Ecomos Frontend

> React + Vite 기반으로 제작된 **이커머스 프론트엔드 프로젝트**입니다.  
> 백엔드(Spring Boot API)와 연동하여 실제 쇼핑몰의 **회원가입 → 로그인 → 장바구니 → 주문 → 결제 → 포인트 적립/쿠폰 사용** 흐름을 제공합니다.

---

## 🚀 배포 주소

- **Frontend (S3 Hosting):** [http://ecomos-frontend.s3-website.ap-northeast-2.amazonaws.com](http://ecomos-frontend.s3-website.ap-northeast-2.amazonaws.com)  
- **Backend (EC2):** `http://<ElasticIP>:8080`

---

## 📚 기술 스택

- **Frontend:** React 18, Vite, React Router, Context API  
- **State 관리:** AuthContext (로그인 상태), CartContext (장바구니)  
- **UI & UX:** TailwindCSS, React-Toastify  
- **HTTP 통신:** Axios  
- **배포:** AWS S3 (정적 웹 호스팅)  
- **기타:** ESLint, Prettier  

---

## 📌 주요 기능

### 👤 사용자 (User)
- 회원가입 (/signup)
- 로그인 (/signin → JWT 기반 인증)
- 로그인 유지 (/auth/me)
- 네비게이션 바에서 로그인 상태 표시 및 로그아웃 지원

### 🛒 상품 & 장바구니 (Product & Cart)
- 상품 목록 조회 (/sellers/products)
- 상품 상세 페이지 (/product/:id)
- 장바구니 추가/삭제/수량 변경
- 총 상품 금액 표시
- 비회원 장바구니(guestId) → 로그인 시 자동 병합

### 📦 주문 & 결제 (Order & Payment)
- 장바구니 → 주문 생성
- 배송지 입력
- 결제 시 포인트 적립
- 마이페이지에서 주문 내역 조회 (/mypage/orders)

### 🎟 쿠폰 & 포인트 (Coupon & Point)
- 자동 발급 쿠폰 (회원가입, 생일, 첫 구매)
- 쿠폰 만료 스케줄러 & 알림
- 결제 시 쿠폰 사용 / 포인트 사용
- 마이페이지에서 보유 쿠폰 조회 (/mypage/coupons)

---

## 🖥 화면 구성

- `Home.jsx` : 상품 목록  
- `ProductDetail.jsx` : 상품 상세  
- `Cart.jsx` : 장바구니  
- `Login.jsx` / `Signup.jsx` : 로그인 & 회원가입  
- `MyOrders.jsx` : 주문 내역  
- `MyCoupons.jsx` : 보유 쿠폰 조회  
- `NavBar.jsx` : 상단 네비게이션  
- `AuthContext.jsx` / `CartContext.jsx` : 전역 상태 관리  

---

## ⚙️ 실행 방법

### 1. 설치
```bash
npm install

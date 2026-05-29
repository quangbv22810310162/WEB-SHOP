# WEB-SHOP

Website bán hàng thời trang gồm **Frontend** và **Backend**, xây dựng phục vụ mục đích học tập, đồ án môn học và thực tập Backend.

Project tập trung vào các chức năng cơ bản của một hệ thống web bán hàng: quản lý sản phẩm, người dùng, xác thực, và giao tiếp FE–BE thông qua REST API.

---

## Công nghệ sử dụng

### Backend

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT Authentication
* dotenv

### Frontend

* ReactJS
* Axios
* HTML / CSS / JavaScript

---

## Cấu trúc thư mục

```
WEB-SHOP/
├── BE/                 # Backend (Node.js + Express)
│   ├── src/
│   ├── package.json
│   └── ...
├── FE/                 # Frontend (ReactJS)
│   ├── src/
│   ├── package.json
│   └── ...
├── fashion_new.sql     # File database mẫu
├── .env.example        # File mẫu cấu hình môi trường
└── README.md
```

---

## Cài đặt & chạy project

### 1. Clone project

```bash
git clone https://github.com/quangbv22810310162/WEB-SHOP.git
cd WEB-SHOP
```

---

### 2. Cài đặt Backend

```bash
cd BE
npm install
```

Tạo file `.env` dựa trên `.env.example` và cấu hình các biến môi trường phù hợp.

Chạy server backend:

```bash
npm start
```

---

### 3. Cài đặt Frontend

```bash
cd FE
npm install
npm start
```

Frontend mặc định chạy tại:

```
http://localhost:3000
```

---

## Biến môi trường

Các biến môi trường cần cấu hình được mô tả trong file `.env.example`.

⚠️ **Lưu ý**: File `.env` không được commit lên GitHub.

---

## Mục đích project

* Phục vụ học tập và làm đồ án
* Thực hành xây dựng Backend với Node.js & Express
* Làm quen với mô hình Frontend – Backend tách biệt

---

## Tác giả

* **Bùi Văn Quang**
* Sinh viên Công nghệ Thông tin

---

## Ghi chú

Project đang trong quá trình hoàn thiện và có thể được mở rộng thêm các chức năng như:

* Thanh toán
* Phân quyền người dùng
* Deploy production

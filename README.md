# 🛒 E-Commerce Platform

A modern, scalable, and high-performance e-commerce platform built with **Node.js**, **TypeScript**, **RabbitMQ**, **Nginx**, **Docker**, and **MySQL (Sequelize ORM)**. Inspired by Shopee, this platform is designed to handle high traffic and provide seamless user experiences.

## 🚀 Features

- **User Authentication & Authorization** (JWT-based)
- **Product Management** (CRUD operations for sellers & admins)
- **Cart & Checkout System** (Real-time cart management & order processing)
- **Payment Integration** (Third-party gateway support)
- **Messaging System** (RabbitMQ for asynchronous processing)
- **Scalability** (Microservices-ready architecture with Docker & Nginx)
- **Admin Dashboard** (Manage users, products, and orders)
- **RESTful API** (Well-structured and scalable API endpoints)
- **Logging & Monitoring** (Integrated logging & health checks)

## 🛠️ Tech Stack

- **Backend:** Node.js, TypeScript, Express.js
- **Database:** MySQL with Sequelize ORM
- **Messaging Queue:** RabbitMQ
- **Reverse Proxy:** Nginx
- **Containerization:** Docker & Docker Compose
- **Authentication:** JWT & OAuth
- **Caching:** Redis (Optional for performance optimization)

## 📦 Project Structure

```
/project-root
│── /src                # Source code
│   ├── /config         # App configurations
│   ├── /controllers    # API controllers
│   ├── /middlewares    # Express middlewares
│   ├── /models         # Sequelize models
│   ├── /routes         # API routes
│   ├── /services       # Business logic services
│   ├── /utils          # Utility functions
│── /dist               # Compiled output (TypeScript to JavaScript)
│── /docker             # Docker configurations
│── .env                # Environment variables
│── docker-compose.yml  # Docker Compose configuration
│── package.json        # Dependencies & scripts
│── tsconfig.json       # TypeScript configuration
│── README.md           # Project documentation
```

## 🏗️ Setup & Installation

### 1️⃣ Prerequisites

Ensure you have the following installed:

- **Node.js (>=16.x)**
- **Docker & Docker Compose**
- **MySQL (or use Docker for database)**
- **RabbitMQ (or use Docker for message queue)**

### 2️⃣ Clone the Repository

```sh
git clone https://github.com/your-repo/ecommerce-platform.git
cd ecommerce-platform
```

### 3️⃣ Install Dependencies

```sh
npm install
```

### 4️⃣ Setup Environment Variables

Copy the `.env.example` file and update the variables:

```sh
cp .env.example .env
```

Edit `.env` file with your database and service configurations.

### 5️⃣ Run with Docker

```sh
docker-compose up -d
```

This will start the MySQL database, RabbitMQ, and the Node.js backend.

### 6️⃣ Run Locally (Without Docker)

Start the MySQL and RabbitMQ services manually, then run:

```sh
npm run dev
```

### 7️⃣ Access the API

By default, the server runs on `http://localhost:3000`.
You can test API endpoints using **Postman** or **cURL**.

## 📖 API Documentation

API documentation is available via Swagger at:

```
http://localhost:3000/api-docs
```

## 🎯 Contributing

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

## 📜 License

This project is open-source and available under the MIT License.

---

🔥 Built with passion and modern technologies to empower e-commerce at scale.

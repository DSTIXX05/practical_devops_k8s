# 🛒 3-Tier E-Commerce Application

A full-stack e-commerce application built with React, Node.js/Express, and PostgreSQL.

![Architecture](https://img.shields.io/badge/Architecture-3--Tier-blue)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB)
![Backend](https://img.shields.io/badge/Backend-Node.js-339933)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This is a modern 3-tier web application demonstrating best practices for full-stack development. The application features a React frontend, RESTful API backend, and PostgreSQL database.

### Tech Stack

- **Frontend:** React 18, Axios, CSS3
- **Backend:** Node.js, Express.js, pg (node-postgres)
- **Database:** PostgreSQL
- **Dev Tools:** nodemon, dotenv

---

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │  (Port 3000)
│   (Tier 1)      │
└────────┬────────┘
         │ HTTP/REST
         │
┌────────▼────────┐
│ Node.js Backend │  (Port 5000)
│   (Tier 2)      │
└────────┬────────┘
         │ SQL
         │
┌────────▼────────┐
│   PostgreSQL    │  (Port 5432)
│   (Tier 3)      │
└─────────────────┘
```

---

## ✨ Features

- ✅ Product catalog display
- ✅ RESTful API architecture
- ✅ Database connection with PostgreSQL
- ✅ CORS-enabled backend
- ✅ Environment-based configuration
- ✅ Responsive UI design
- ✅ Error handling
- ✅ Hot reload for development

---

## 📦 Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** v7+ (comes with Node.js)
- **PostgreSQL** v12+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

### Verify Installation

```bash
node -v
npm -v
psql --version
git --version
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Set Up Database

```bash
# Start PostgreSQL
# Linux: sudo systemctl start postgresql
# macOS: brew services start postgresql
# Windows: Start via Services

# Create database
psql -U postgres
CREATE DATABASE ecommerce;
\q
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 4. Configure Environment Variables

**backend/.env:**

```bash
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASS=your_postgres_password
DB_NAME=ecommerce
```

**frontend/.env:**

```bash
REACT_APP_API_URL=http://localhost:5000
```

---

## 🏃 Running the Application

### Terminal 1 - Backend

```bash
cd backend
npm start
# or with auto-reload: npm run dev
```

Expected: `✅ Database connected! 🚀 Backend on http://localhost:5000`

### Terminal 2 - Frontend

```bash
cd frontend
npm start
```

Expected: Browser opens at `http://localhost:3000`

---

## 📁 Project Structure

```
project-root/
├── backend/
│   ├── index.js           # Express server
│   ├── package.json       # Backend dependencies
│   ├── .env              # Environment variables
│   └── node_modules/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js        # Main component
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json      # Frontend dependencies
│   ├── .env
│   └── node_modules/
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000`

| Method | Endpoint        | Description  | Response                     |
| ------ | --------------- | ------------ | ---------------------------- |
| GET    | `/`             | Health check | `{ message, database_time }` |
| GET    | `/api/products` | Get products | `{ products: [...] }`        |

### Example

```bash
curl http://localhost:5000/api/products
```

Response:

```json
{
  "products": [
    { "id": 1, "name": "Laptop", "price": 999.99 },
    { "id": 2, "name": "Mouse", "price": 29.99 }
  ]
}
```

---

## 🛠️ Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
# Linux/Mac: lsof -ti:5000 | xargs kill -9
# Windows: netstat -ano | findstr :5000
```

### Cannot Connect to Database

- Check PostgreSQL is running
- Verify credentials in `backend/.env`
- Test: `psql -U postgres -d ecommerce -c "SELECT NOW();"`

### CORS Errors

- Ensure `app.use(cors())` in backend
- Check `REACT_APP_API_URL` in frontend/.env

### Module Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Next Steps

- [ ] Add authentication (JWT)
- [ ] Implement shopping cart
- [ ] Add product CRUD operations
- [ ] Create admin dashboard
- [ ] Add payment integration
- [ ] Implement search/filters
- [ ] Add tests
- [ ] Deploy to production

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

**Happy Coding! 🚀**# 🛒 3-Tier E-Commerce Application

A full-stack e-commerce application built with React, Node.js/Express, and PostgreSQL.

![Architecture](https://img.shields.io/badge/Architecture-3--Tier-blue)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB)
![Backend](https://img.shields.io/badge/Backend-Node.js-339933)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This is a modern 3-tier web application demonstrating best practices for full-stack development. The application features a React frontend, RESTful API backend, and PostgreSQL database.

### Tech Stack

- **Frontend:** React 18, Axios, CSS3
- **Backend:** Node.js, Express.js, pg (node-postgres)
- **Database:** PostgreSQL
- **Dev Tools:** nodemon, dotenv

---

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │  (Port 3000)
│   (Tier 1)      │
└────────┬────────┘
         │ HTTP/REST
         │
┌────────▼────────┐
│ Node.js Backend │  (Port 5000)
│   (Tier 2)      │
└────────┬────────┘
         │ SQL
         │
┌────────▼────────┐
│   PostgreSQL    │  (Port 54321)
│   (Tier 3)      │
└─────────────────┘
```

---

## ✨ Features

- ✅ Product catalog display
- ✅ RESTful API architecture
- ✅ Database connection with PostgreSQL
- ✅ CORS-enabled backend
- ✅ Environment-based configuration
- ✅ Responsive UI design
- ✅ Error handling
- ✅ Hot reload for development

---

## 📦 Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** v7+ (comes with Node.js)
- **PostgreSQL** v12+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

### Verify Installation

```bash
node -v
npm -v
psql --version
git --version
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Set Up Database

```bash
# Start PostgreSQL
# Linux: sudo systemctl start postgresql
# macOS: brew services start postgresql
# Windows: Start via Services

# Create database
psql -U postgres
CREATE DATABASE ecommerce;
\q
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 4. Configure Environment Variables

**backend/.env:**

```bash
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASS=your_postgres_password
DB_NAME=ecommerce
```

**frontend/.env:**

```bash
REACT_APP_API_URL=http://localhost:5000
```

---

## 🏃 Running the Application

### Terminal 1 - Backend

```bash
cd backend
npm start
# or with auto-reload: npm run dev
```

Expected: `✅ Database connected! 🚀 Backend on http://localhost:5000`

### Terminal 2 - Frontend

```bash
cd frontend
npm start
```

Expected: Browser opens at `http://localhost:3000`

---

## 📁 Project Structure

```
project-root/
├── backend/
│   ├── index.js           # Express server
│   ├── package.json       # Backend dependencies
│   ├── .env              # Environment variables
│   └── node_modules/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js        # Main component
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json      # Frontend dependencies
│   ├── .env
│   └── node_modules/
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000`

| Method | Endpoint        | Description  | Response                     |
| ------ | --------------- | ------------ | ---------------------------- |
| GET    | `/`             | Health check | `{ message, database_time }` |
| GET    | `/api/products` | Get products | `{ products: [...] }`        |

### Example

```bash
curl http://localhost:5000/api/products
```

Response:

```json
{
  "products": [
    { "id": 1, "name": "Laptop", "price": 999.99 },
    { "id": 2, "name": "Mouse", "price": 29.99 }
  ]
}
```

---

## 🛠️ Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
# Linux/Mac: lsof -ti:5000 | xargs kill -9
# Windows: netstat -ano | findstr :5000
```

### Cannot Connect to Database

- Check PostgreSQL is running
- Verify credentials in `backend/.env`
- Test: `psql -U postgres -d ecommerce -c "SELECT NOW();"`

### CORS Errors

- Ensure `app.use(cors())` in backend
- Check `REACT_APP_API_URL` in frontend/.env

### Module Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Next Steps

- [ ] Add authentication (JWT)
- [ ] Implement shopping cart
- [ ] Add product CRUD operations
- [ ] Create admin dashboard
- [ ] Add payment integration
- [ ] Implement search/filters
- [ ] Add tests
- [ ] Deploy to production

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

**Happy Coding! 🚀**
# practical_devops_k8s

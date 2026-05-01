# Docker Deployment Guide

This guide explains the Docker setup for your 3-tier e-commerce application.

## 📁 Files Created

### 1. **docker-compose.yml**

Main orchestration file that defines and runs all three services:

- **PostgreSQL (db)**: Database service on port 5432
- **Backend (backend)**: Node.js/Express service on port 5000
- **Frontend (frontend)**: React/Nginx service on port 3000

### 2. **Dockerfiles**

- `backend/Dockerfile`: Multi-layer build for Node.js backend with health checks
- `frontend/Dockerfile`: Multi-stage build (builder + nginx) for optimized React app

### 3. **.dockerignore Files**

- `backend/.dockerignore`: Excludes unnecessary files from backend image
- `frontend/.dockerignore`: Excludes unnecessary files from frontend image

### 4. **frontend/nginx.conf**

- Nginx configuration for serving React SPA
- Proxies `/api/*` requests to the backend service

### 5. **.env File**

- Contains environment variables for database and services
- Update these values as needed for your deployment

## 🚀 Getting Started

### Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

### Step 1: Navigate to Project Directory

```bash
cd "C:/Users/DELL/Documents/Dstixx05/practical devops bootcamp/Week 4/Intermediate2-main/Intermediate2-main"
```

### Step 2: Build and Start Services

```bash
docker-compose up -d
```

The `-d` flag runs services in the background.

### Step 3: Verify Services are Running

```bash
docker-compose ps
```

You should see all three services running:

```
NAME                 IMAGE                    STATUS
ecommerce-db         postgres:15-alpine       Up (healthy)
ecommerce-backend    ecommerce-backend        Up (healthy)
ecommerce-frontend   ecommerce-frontend       Up
```

## 🌐 Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432

## 📊 Service Communication

```
┌─────────────────────────────────────────────────────┐
│                    Browser                           │
│                 localhost:3000                       │
└────────────────────┬────────────────────────────────┘
                     │ HTTP Request
                     ▼
         ┌──────────────────────┐
         │  Frontend (Nginx)    │ ◄─── Serves React App
         │    Port 3000         │      Proxies /api calls
         └──────────┬───────────┘
                    │ Proxies to /api
                    ▼
         ┌──────────────────────┐
         │  Backend (Node.js)   │ ◄─── Handles API requests
         │    Port 5000         │      Uses PostgreSQL
         └──────────┬───────────┘
                    │ Database connection
                    ▼
         ┌──────────────────────┐
         │  PostgreSQL          │ ◄─── Stores data
         │   Port 5432          │
         └──────────────────────┘
```

## 📝 Common Commands

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Stop Services

```bash
docker-compose down
```

### Stop and Remove Volumes (Clean Reset)

```bash
docker-compose down -v
```

### Rebuild Images

```bash
docker-compose up -d --build
```

### Execute Commands in Container

```bash
# Backend
docker-compose exec backend sh

# Database
docker-compose exec db psql -U postgres -d ecommerce_db
```

## 🔧 Configuration

### Environment Variables (.env)

```env
# Database
DB_USER=postgres          # PostgreSQL username
DB_PASS=postgres123       # PostgreSQL password (change in production!)
DB_NAME=ecommerce_db      # Database name
DB_PORT=5432              # Database port (container internal port)

# Backend
PORT=5000                 # Backend server port
NODE_ENV=production       # Node environment

# Frontend
REACT_APP_API_URL=...     # API URL (set during build)
```

### Modify Configuration

1. Edit `.env` file with your desired values
2. Rebuild: `docker-compose up -d --build`

## 🐛 Troubleshooting

### Frontend can't reach backend

- Check nginx config: `frontend/nginx.conf`
- Verify backend service name matches in proxy_pass (should be `http://backend:5000`)

### Database connection error

- Verify `.env` credentials match database setup
- Check DB_HOST is set to `db` (service name)
- Wait for database to be healthy before starting backend

### Port already in use

```bash
# Find and kill process on port
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Rebuild everything from scratch

```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

## 🔐 Security Notes (For Production)

1. **Change default passwords** in `.env`
2. **Use environment secrets** (Docker Secrets for Swarm, or external secret managers)
3. **Add HTTPS/TLS** with reverse proxy (Nginx/Traefik)
4. **Implement rate limiting** on API endpoints
5. **Use .env.production** for production secrets (don't commit to git)
6. **Add CORS configuration** in backend if frontend domain differs

## 📦 Production Deployment

For production, consider:

- Using a container orchestration platform (Kubernetes, Docker Swarm)
- Setting up persistent volumes for database
- Configuring automated backups
- Using environment-specific docker-compose files
- Implementing health checks and auto-restart policies
- Using container registries (Docker Hub, ECR, etc.)

## ✅ Next Steps

1. Customize `.env` for your environment
2. Add database initialization script if needed
3. Configure CORS in backend (`cors` middleware already configured)
4. Add authentication/authorization
5. Implement proper error handling and logging
6. Set up CI/CD pipeline for automated deployments

---

For more help, check Docker documentation:

- https://docs.docker.com/compose/
- https://docs.docker.com/engine/

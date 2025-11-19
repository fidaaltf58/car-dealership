# Docker Setup Guide

This guide explains how to run the car dealership application using Docker and Docker Compose.

## Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- At least 4GB of available RAM
- Ports 3000, 5000, and 27017 available

## Quick Start

1. **Build and start all services:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

4. **Stop and remove volumes (clears database):**
   ```bash
   docker-compose down -v
   ```

## Services

The application consists of three services:

- **Frontend** (React + Vite): Available at http://localhost:3000
- **Backend** (Node.js + Express): Available at http://localhost:5000
- **MongoDB**: Database running on port 27017

## Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/car_dealership
JWT_SECRET=your-secret-key-here
```

## Building Individual Services

### Build Frontend Only
```bash
docker build -t car-dealership-frontend .
```

### Build Backend Only
```bash
docker build -t car-dealership-backend ./server
```

## Development Mode

For development, you may want to run services individually:

1. **Start MongoDB:**
   ```bash
   docker-compose up -d mongodb
   ```

2. **Run backend locally:**
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Run frontend locally:**
   ```bash
   npm install
   npm run dev
   ```

## Troubleshooting

### Port Already in Use
If you get a port conflict error, you can change the ports in `docker-compose.yml`:
```yaml
ports:
  - "3001:80"  # Change 3000 to 3001
```

### Database Connection Issues
Ensure MongoDB container is running:
```bash
docker-compose ps
```

Check MongoDB logs:
```bash
docker-compose logs mongodb
```

### Rebuild After Code Changes
```bash
docker-compose up -d --build
```

### Clear Everything and Start Fresh
```bash
docker-compose down -v
docker-compose up -d --build
```

## Volumes

- `mongodb_data`: Persistent MongoDB data storage
- `./server/uploads`: Backend uploads directory (mounted as volume)
- `./public/images`: Public images directory (copied to frontend)

## Network

All services communicate through the `car-dealership-network` bridge network. The backend connects to MongoDB using the service name `mongodb` as the hostname.


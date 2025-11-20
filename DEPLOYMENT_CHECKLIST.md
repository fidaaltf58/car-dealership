# Deployment Checklist

## ✅ Pre-Deployment Fixes Applied

### 1. API Configuration
- ✅ Changed API baseURL from `http://localhost:5000/api` to `/api` (relative path)
- ✅ All API calls now use relative paths for production compatibility

### 2. Image URLs
- ✅ Fixed hardcoded `localhost:5000` URLs in:
  - `src/pages/VehicleDetails.tsx`
  - `src/pages/Inventory.tsx`
  - `src/pages/AdminDashboard.tsx`
- ✅ All image URLs now use relative paths (`/uploads/` and `/images/`)

### 3. Docker Configuration
- ✅ Frontend exposed on port **80** (as requested)
- ✅ Backend listens on `0.0.0.0` to accept external connections
- ✅ Removed duplicate line in backend Dockerfile
- ✅ Added `--legacy-peer-deps` flag for npm install
- ✅ Removed obsolete `version` field from docker-compose.yml

### 4. Nginx Configuration
- ✅ Server name set to `_` (accepts any hostname)
- ✅ API proxy configured correctly
- ✅ Uploads and images properly served
- ✅ Added proxy timeouts for better reliability
- ✅ Static asset caching configured

## 📋 Deployment Steps

1. **Ensure port 80 is available:**
   ```bash
   sudo netstat -tulpn | grep :80
   # If something is using port 80, stop it or change the port mapping
   ```

2. **Build and start services:**
   ```bash
   docker compose up --build -d
   ```

3. **Check service status:**
   ```bash
   docker compose ps
   docker compose logs -f
   ```

4. **Verify services:**
   - Frontend: http://your-server-ip (port 80)
   - Backend API: http://your-server-ip/api
   - MongoDB: Internal only (port 27017 not exposed externally)

## 🔧 Environment Variables

Create `server/.env` file with:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/car_dealership
JWT_SECRET=your-secret-key-here-change-this
```

## 🚨 Important Notes

1. **Port 80 requires root/sudo** - If you get permission errors, either:
   - Run with `sudo docker compose up`
   - Or change port mapping to `"8080:80"` and use a reverse proxy

2. **Firewall Configuration:**
   ```bash
   # Allow port 80
   sudo ufw allow 80/tcp
   ```

3. **MongoDB Data Persistence:**
   - Data is stored in Docker volume `mongodb_data`
   - To backup: `docker compose exec mongodb mongodump --out /data/backup`

4. **Logs:**
   ```bash
   # View all logs
   docker compose logs -f
   
   # View specific service
   docker compose logs -f frontend
   docker compose logs -f backend
   docker compose logs -f mongodb
   ```

## 🧪 Testing After Deployment

1. **Frontend loads:** http://your-server-ip
2. **API responds:** http://your-server-ip/api/vehicles
3. **Images load:** Check vehicle images display correctly
4. **Admin login:** Test authentication flow

## 🔄 Updating After Deployment

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker compose up --build -d

# Or restart specific service
docker compose restart frontend
docker compose restart backend
```

## 🛑 Troubleshooting

### Port 80 already in use
```bash
# Find what's using port 80
sudo lsof -i :80

# Stop the service or change docker-compose port mapping
```

### Services won't start
```bash
# Check logs
docker compose logs

# Rebuild from scratch
docker compose down -v
docker compose up --build -d
```

### Database connection issues
```bash
# Check MongoDB is running
docker compose ps mongodb

# Check MongoDB logs
docker compose logs mongodb
```

### Images not loading
- Verify `public/images` directory exists and is copied to container
- Check nginx logs: `docker compose logs frontend`
- Verify image paths in code use relative URLs (`/images/...`)


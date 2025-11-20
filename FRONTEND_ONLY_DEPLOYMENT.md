# Frontend-Only Deployment Guide

This deployment configuration runs **only the frontend** without the backend server.

## ⚠️ Important Notes

- **No Backend API**: The backend is not included in this deployment
- **Static Data Only**: The frontend uses static vehicle data defined in `src/App.tsx`
- **Admin Features Disabled**: Admin dashboard and login features will not work without the backend
- **API Calls Will Fail**: Any pages that try to fetch data from `/api` will return 404 errors

## 🚀 Quick Start

```bash
# Build and start frontend only
docker compose up --build -d

# View logs
docker compose logs -f frontend

# Stop
docker compose down
```

## 📋 What Works

✅ **Home Page** - Displays featured vehicles from static data  
✅ **Inventory Page** - Shows vehicles from static `realVehicles` array  
✅ **Cars Page** - Filterable car inventory  
✅ **Vehicle Details** - View individual vehicle details  
✅ **Services Page** - Static content  
✅ **Appointment Page** - Static form (submission won't work without backend)

## ❌ What Doesn't Work

❌ **Admin Dashboard** - Requires backend API  
❌ **Login** - Requires backend authentication  
❌ **Dynamic Vehicle Loading** - Pages using `getVehicles()` API call  
❌ **Image Uploads** - `/uploads` endpoint returns 404

## 🔧 Configuration

The frontend is configured to:
- Serve on **port 80**
- Use static vehicle data from `src/App.tsx`
- Return 404 for `/api` and `/uploads` requests
- Serve public images from `/images` directory

## 📁 Static Data Location

Vehicle data is defined in:
- `src/App.tsx` - `realVehicles` array (lines ~12-150)

To update vehicles, edit this array and rebuild:
```bash
docker compose up --build -d
```

## 🛠️ Troubleshooting

### Port 80 already in use
```bash
# Change port in docker-compose.yml
ports:
  - "8080:80"  # Use port 8080 instead
```

### Images not loading
- Verify `public/images` directory exists
- Check image paths in `realVehicles` array match actual files
- Rebuild container: `docker compose up --build -d`

### API errors in browser console
- This is expected - API endpoints return 404
- Only pages using static data will work properly

## 🔄 Adding Backend Later

When ready to add the backend:
1. Restore full `docker-compose.yml` with backend and MongoDB services
2. Update `nginx.conf` to proxy `/api` requests to backend
3. Rebuild: `docker compose up --build -d`


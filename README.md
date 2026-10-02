# US 1 Motors: Car Dealership Website

A website for **US 1 Motors**, a car dealership. Visitors can browse the inventory (cars, SUVs, trucks), filter vehicles, view vehicle details, explore services, and book an appointment. The repo also has a **Node.js / Express / MongoDB** backend with JWT authentication and image uploads for managing the inventory.

Built with **React 18 + TypeScript + Vite** on the frontend and **Express + Mongoose** on the backend. The frontend ships as an **Nginx** Docker image.

---

## Features

### Frontend
- Home page with a video hero and featured vehicles
- Inventory with category pages: `/inventory/cars`, `/inventory/suvs`, `/inventory/trucks`
- Sidebar filters: price, year, mileage, and make
- Vehicle details page (`/vehicle/:id`) with gallery, specs, and features
- Services and appointment-booking pages
- Admin login and dashboard routes (`/login`, `/admin`)
- SPA routing with React Router, served by Nginx in production

### Backend (`server/`)
- REST API for vehicles: list, create, update, delete
- Multi-image upload per vehicle (up to 10) with Multer, served from `/uploads`
- JWT authentication for admin write operations
- MongoDB persistence through Mongoose

## Tech stack

| Part | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite 5, React Router 6, Axios |
| Backend | Node.js, Express 4, TypeScript, Mongoose 8, Multer, JWT, bcryptjs |
| Database | MongoDB |
| Deployment | Docker (multi-stage build, Nginx), Docker Compose |

## Project structure

```
car-dealership/
├── src/
│   ├── App.tsx            # Routes, pages and the static vehicle catalogue
│   ├── components/        # Header, VehicleCard, FilterSidebar, VehicleForm
│   ├── pages/             # API-backed pages: AdminDashboard, Inventory, Login, VehicleDetails
│   ├── types/Vehicle.ts   # Vehicle model
│   └── utils/api.ts       # Axios client (baseURL /api, attaches the JWT)
├── public/                # Hero video and vehicle images
├── server/
│   └── src/
│       ├── app.ts         # Express app + Mongo connection
│       ├── models/        # Vehicle, User
│       ├── routes/        # /api/auth, /api/vehicles
│       └── middleware/    # JWT auth, upload
├── Dockerfile             # Frontend build → Nginx
├── nginx.conf
└── docker-compose.yml     # Frontend container on port 80
```

## Getting started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas), needed only for the backend

### Frontend

```bash
npm install
npm run dev          # http://localhost:5173
```

In development, Vite proxies `/api` to `http://localhost:5000` (see `vite.config.ts`).

### Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car_dealership
JWT_SECRET=replace-with-a-long-random-string
```

```bash
npm run dev          # ts-node + nodemon on http://localhost:5000
# or
npm run build && npm start
```

### Docker

```bash
docker compose up -d --build    # frontend served by Nginx on http://localhost
```

See [`DOCKER.md`](DOCKER.md), [`FRONTEND_ONLY_DEPLOYMENT.md`](FRONTEND_ONLY_DEPLOYMENT.md) and [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) for more deployment options.

## API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | – | Returns a JWT (valid for 7 days) |
| `GET` | `/api/vehicles` | – | List vehicles |
| `POST` | `/api/vehicles` | JWT | Create a vehicle (`multipart/form-data`, field `images[]`) |
| `PUT` | `/api/vehicles/:id` | JWT | Update a vehicle |
| `DELETE` | `/api/vehicles/:id` | JWT | Delete a vehicle |

**Vehicle fields:** `make`, `model`, `year`, `price`, `salePrice`, `mileage`, `color`, `interior`, `transmission`, `engine`, `stockNumber`, `vin`, `features[]`, `images[]`, `status` (`for-sale`, `for-rent`, `sold`, `rented`).

## Current status

- The public pages in `src/App.tsx` currently render a **static vehicle catalogue**, so the site works without the backend.
- The API-backed pages in `src/pages/` (admin CRUD, login) and the Express server are built but **not yet wired into the router**.
- The demo login uses hard-coded credentials. Replace it with the `/api/auth/login` flow and real user accounts before going to production.

## Scripts

| Location | Command | Description |
|---|---|---|
| root | `npm run dev` | Vite dev server |
| root | `npm run build` | Type-check + production build |
| root | `npm run lint` | ESLint |
| root | `npm run preview` | Preview the production build |
| `server/` | `npm run dev` | API in watch mode |
| `server/` | `npm run build` / `npm start` | Compile and run the API |

## Author

**Fidaa Letaief** · [@fidaaltf58](https://github.com/fidaaltf58)

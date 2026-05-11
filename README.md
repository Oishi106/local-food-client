## 🍽️ Local Food Lovers Network

A community-driven MERN platform where food lovers can share their local food experiences, post reviews with photos, discover trending dishes, and connect with nearby food enthusiasts.

## 🌐 Live Site: https://local-food-client.vercel.app/

## 🖼️ Project Overview

Local Food Lovers Network is a full-stack web application designed for food enthusiasts who enjoy exploring restaurants, street foods, and homemade dishes. Users can register, post reviews, manage their favorites, and view reviews from others in an engaging and responsive UI.

## 🚀 Tech Stack
## Frontend

- React

- React Router

- Firebase Authentication

- Tailwind CSS

- React Hook Form

## Backend

- Node.js

- Express.js

- MongoDB 

- CORS

  
## ⭐ Main Features

- 🔐 Firebase Authentication (Email/Password + Google login)

- 🧭 Dashboard (separate layout, role-based routes)
- 📝 Add, Edit & Delete (CRUD) only inside Dashboard

- ⭐ Top Reviews Section on Home (Dynamic)

- ❤️ Favorite System (Add/remove favorites, stored in DB)

- 🔍 Search Reviews by Food Name (MongoDB $regex)

- 📸 Image-based review cards

- 📱 Fully Responsive UI (Mobile, Tablet, Desktop)

- 🧭 Private Route Persistence (No logout on reload)

- 🌀 Loading Spinner & Skeleton

- ❌ 404 Page with a fun image

- 🔁 Hero Slider + Extra Sections

## ⚙️ Environment

- `VITE_API_BASE_URL` (optional): backend base URL (default: `https://local-food-server.onrender.com`)

## 🔌 Dashboard API expectations

The dashboard fetches data from the backend (no static values). Expected endpoints:

- `GET /users/role?email=...` → `{ role: "user" | "admin" }`
- `GET /dashboard/overview?email=...` → `{ metrics: {...}, chartData: [...] }`
- `GET /bookings` and `GET /bookings?email=...`
- `GET /payments?email=...`
- `GET /users`
- CRUD table uses `GET/POST/PUT/DELETE /details` and `/details/:id`


## 📦 Dependencies
### Client

- react

- react-router-dom

- firebase

- react-hook-form

- react-icons

- sweetalert2

-  react-hot-toast

- swiper 

- tailwindcss

### Server

- express

- mongodb 

- cors

- dotenv

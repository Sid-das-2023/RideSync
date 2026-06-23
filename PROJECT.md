# Project Deep Dive — RideSync

Personal reference document. Covers architecture, file structure, how everything connects, and how to build/deploy.

---

## Architecture Overview

```
Browser (React SPA)
    │
    ├── HTTP (axios) ──► Express REST API ──► MongoDB
    │
    └── WebSocket (Socket.IO) ──► Socket.IO Server
```

Two separate apps in one repo:
- `Backend/` — Node.js API + Socket.IO server, port 3000
- `Frontend/` — React + Vite SPA, port 5173 in dev

They share no code. Frontend talks to backend via HTTP and WebSocket.

---

## Tech Stack

### Backend
| Package | Purpose |
|---------|---------|
| `express` | HTTP server and routing |
| `mongoose` | MongoDB ODM — schemas, models, queries |
| `socket.io` | WebSocket server — real-time events |
| `jsonwebtoken` | Sign and verify JWTs for auth |
| `bcrypt` / `bcryptjs` | Hash passwords |
| `cookie-parser` | Parse cookies (JWT in cookie) |
| `express-validator` | Validate request bodies and query params |
| `axios` | HTTP client for calling Nominatim + OSRM APIs |
| `dotenv` | Load `.env` variables into `process.env` |
| `cors` | Allow cross-origin requests from frontend |

### Frontend
| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI framework |
| `vite` | Build tool and dev server (replaces CRA) |
| `react-router-dom` | Client-side routing with protected routes |
| `axios` | HTTP requests to backend API |
| `socket.io-client` | WebSocket client — connects to backend socket |
| `gsap` / `@gsap/react` | Slide-in panel animations |
| `remixicon` | Icon library (used throughout UI) |
| `tailwindcss` | Utility-first CSS |

### Database
MongoDB with Mongoose. Three main collections:
- `users` — riders
- `captains` — drivers
- `rides` — ride records

---

## File Structure

```
Uber-Clone/
├── Backend/
│   ├── app.js                  # Express app setup (middleware, routes)
│   ├── server.js               # HTTP server + Socket.IO init
│   ├── socket.js               # Socket.IO logic (join, broadcastToRoom, sendMessageToSocketId)
│   │
│   ├── db/
│   │   └── db.js               # MongoDB connection via mongoose
│   │
│   ├── models/
│   │   ├── user.model.js       # User schema: fullname, email, password, socketId
│   │   ├── captain.model.js    # Captain schema: fullname, email, password, vehicle, socketId, status
│   │   ├── ride.model.js       # Ride schema: user, captain, origin, destination, fare, status, otp
│   │   └── blacklistToken.model.js  # Stores invalidated JWT tokens (for logout)
│   │
│   ├── controllers/
│   │   ├── user.controller.js      # register, login, getProfile, logout
│   │   ├── captain.controller.js   # registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain
│   │   ├── ride.controller.js      # createRide, getFare, acceptRide, startRide, completeRide
│   │   └── maps.controller.js      # getCoordinates, getDistanceTime, getAutoCompleteSuggestions
│   │
│   ├── services/
│   │   ├── user.service.js         # createUser (DB write)
│   │   ├── captain.service.js      # createCaptain (DB write)
│   │   ├── ride.service.js         # createRide, getFare, acceptRide, startRide, completeRide
│   │   └── maps.service.js         # calls GoMaps API for geocode, distance, autocomplete
│   │
│   ├── routes/
│   │   ├── user.routes.js          # POST /users/register, POST /users/login, GET /users/profile, POST /users/logout
│   │   ├── captain.routes.js       # POST /captains/register, POST /captains/login, GET /captains/profile, POST /captains/logout
│   │   ├── ride.routes.js          # POST /rides/create-ride, GET /rides/get-fare, POST /rides/accept, POST /rides/start, POST /rides/complete
│   │   └── maps.routes.js          # GET /maps/get-coordinates, GET /maps/get-distance-time, GET /maps/get-suggestions
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js      # authUser, authCaptain — verifies JWT from cookie or Authorization header
│   │
│   └── .env                        # DB_CONNECT, JWT_SECRET, GOOGLE_MAP_API, PORT
│
└── Frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── .env                         # VITE_BASE_URL=http://localhost:3000
    │
    └── src/
        ├── main.jsx                 # Entry: BrowserRouter > CaptainContext > UserContext > App
        ├── App.jsx                  # All route definitions, protected routes
        ├── socket.js                # socket.io-client instance (singleton, imported where needed)
        │
        ├── context/
        │   ├── UserContext.jsx      # React context for rider state (user object + setter)
        │   └── CaptainContext.jsx   # React context for captain state (captain object + setter)
        │
        ├── pages/
        │   ├── Start.jsx                    # Landing page "/"
        │   ├── UserLogin.jsx                # Rider login "/login"
        │   ├── UserSignup.jsx               # Rider signup "/signup"
        │   ├── UserProtectedWrapper.jsx     # Verifies JWT, redirects to /login if invalid
        │   ├── UserLogout.jsx               # Calls logout API, clears token + context
        │   ├── Home.jsx                     # Main rider screen: search, fare, confirm, wait for driver
        │   ├── Riding.jsx                   # Active ride screen for rider
        │   ├── CaptainLogin.jsx             # Captain login "/captain-login"
        │   ├── CaptainSignup.jsx            # Captain signup "/captain-signup"
        │   ├── CaptainProtectedWrapper.jsx  # Same as UserProtectedWrapper but for captains
        │   ├── CaptainLogout.jsx            # Captain logout
        │   ├── CaptainHome.jsx              # Captain dashboard: incoming rides, socket listener
        │   └── CaptainRiding.jsx            # Active ride screen for captain
        │
        └── components/
            ├── LocationSearchPanel.jsx   # Dropdown suggestions for pickup/destination
            ├── VehiclePanel.jsx          # Car / Bike / Auto selection with fares
            ├── ConfirmedRide.jsx         # Final confirm before creating ride
            ├── WaitingForDriver.jsx      # "Searching for driver" screen
            ├── DriverDetailsPanel.jsx    # Shows driver info after captain accepts
            ├── CaptainDetails.jsx        # Captain stats panel on captain home
            ├── RidePopUp.jsx             # New ride popup for captain
            ├── ConfirmRidePopUp.jsx      # Captain enters OTP to start ride
            └── FinishRidePanel.jsx       # Captain ends ride, calls complete API
```

---

## How Key Flows Work

### 1. Auth Flow

```
User/Captain registers
  → POST /users/register (or /captains/register)
  → Password hashed with bcrypt
  → Stored in MongoDB
  → JWT signed and returned
  → Frontend stores JWT in localStorage
  → Context updated with user/captain object

Login same but uses comparePassword instead of creating new doc.

Logout:
  → Token added to blacklistToken collection
  → Any future request with that token → 401 Unauthorized
```

### 2. Protected Routes

```
UserProtectedWrapper:
  1. Check localStorage for token
  2. If missing → redirect /login
  3. GET /users/profile with Bearer token
  4. If valid → setUser(data), render children
  5. If invalid → remove token, redirect /login
```

### 3. Ride Request Flow

```
User opens /home
  → socket.emit('join', { userId, userType: 'user' })
  → Backend saves socketId to user document in DB

User enters pickup + destination
  → GET /rides/get-fare → returns { car, motorcycle, auto } prices
  → User picks vehicle type → ConfirmedRide component

User clicks Confirm
  → POST /rides/create-ride
  → Backend creates ride in DB (status: 'pending', OTP generated)
  → Backend broadcastToRoom('captains', 'new-ride', ride)
  → User sees "WaitingForDriver" panel
```

### 4. Captain Accept Flow

```
Captain opens /captain-home
  → socket.emit('join', { userId: captain._id, userType: 'captain' })
  → Backend saves socketId to captain doc
  → Captain socket joins 'captains' room

socket.on('new-ride') fires
  → RidePopUp slides up with rider info + route + fare

Captain clicks Accept → ConfirmRidePopUp shown
Captain enters OTP (rider tells captain their OTP)
Captain submits form:
  → POST /rides/accept  → status: 'accepted', captain assigned
  → POST /rides/start   → OTP verified, status: 'ongoing'
  → Backend: sendMessageToSocketId(user.socketId, 'ride-confirmed', ride)
  → Navigate to /captain-riding with ride data

User receives 'ride-confirmed'
  → Navigate to /riding with ride data (captain name, plate, fare)
```

### 5. Ride Completion

```
Captain on /captain-riding clicks "Finish Ride"
  → FinishRidePanel slides up
  → Click "Complete Ride"
  → POST /rides/complete → status: 'completed'
  → Navigate to /captain-home
```

### 6. Maps / Autocomplete

```
User types in pickup input (3+ chars)
  → GET /maps/get-suggestions?input=...
  → Backend calls Nominatim search API (free, no key)
  → Returns place suggestions → shown in LocationSearchPanel

Fare calculation:
  → GET /maps/get-distance-time?origin=...&destination=...
  → Backend geocodes both addresses via Nominatim → lat/lng
  → Calls OSRM routing API (free, no key) → distance + duration
  → Fare = baseFare + (km * ratePerKm) + (mins * ratePerMin)
  → Different rates for car / motorcycle / auto
```

---

## Environment Variables

### Backend `.env`
```env
PORT=3000
DB_CONNECT=mongodb://localhost:27017/ridesync
JWT_SECRET=any_long_random_string_here
```
No maps API key needed — Nominatim and OSRM are free with no auth.

### Frontend `.env`
```env
VITE_BASE_URL=http://localhost:3000
```

---

## How to Build and Run

### Development

```bash
# Terminal 1 — Backend
cd Backend
npm install
npm start          # nodemon not configured, uses: node server.js

# Terminal 2 — Frontend
cd Frontend
npm install
npm install socket.io-client   # install separately if registry blocked
npm run dev        # Vite dev server at http://localhost:5173
```

### Production Build

```bash
# Build frontend static files
cd Frontend
npm run build
# Output: Frontend/dist/

# Backend runs as-is with node
cd Backend
node server.js
```

To serve frontend from backend, copy `Frontend/dist` to `Backend/public` and add:
```js
// app.js
app.use(express.static(path.join(__dirname, 'public')));
```

---

## Deployment Options

### Option A — Separate services (recommended)

| Service | What to deploy |
|---------|---------------|
| [Railway](https://railway.app) | Backend (Node.js) |
| [Vercel](https://vercel.com) | Frontend (Vite/React) |
| [MongoDB Atlas](https://cloud.mongodb.com) | Database |

**Steps:**

1. **MongoDB Atlas**
   - Create free cluster
   - Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/uber-clone`
   - Whitelist all IPs (`0.0.0.0/0`) for Railway/Vercel

2. **Backend on Railway**
   - Connect GitHub repo
   - Set root directory to `Backend`
   - Add env vars: `DB_CONNECT`, `JWT_SECRET`, `GOOGLE_MAP_API`, `PORT=3000`
   - Railway gives you a URL like `https://uber-backend.railway.app`

3. **Frontend on Vercel**
   - Connect GitHub repo
   - Set root directory to `Frontend`
   - Add env var: `VITE_BASE_URL=https://uber-backend.railway.app`
   - Vercel auto-detects Vite and builds

### Option B — Single VPS (DigitalOcean / Linode)

```bash
# On server
git clone https://github.com/Sid-das-2023/Uber-Clone.git
cd Uber-Clone

# Build frontend
cd Frontend && npm install && npm run build

# Copy build to backend
cp -r dist ../Backend/public

# In Backend/app.js, add static serving (see above)

# Run backend
cd ../Backend
npm install
node server.js   # or use pm2: pm2 start server.js
```

Use nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

> Socket.IO requires the `Upgrade` headers above — without them WebSockets fail in production.

### Option C — Docker

```dockerfile
# Backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml (repo root)
version: '3'
services:
  backend:
    build: ./Backend
    ports: ["3000:3000"]
    env_file: ./Backend/.env
  frontend:
    build: ./Frontend
    ports: ["5173:5173"]
    env_file: ./Frontend/.env
```

---

## Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| `moongoose is not defined` | Fixed — was a typo | Already patched |
| Socket events not firing | `initializeSocket` not called | Already patched in `server.js` |
| Rides always fail with "All fields required" | `req.user_id` was undefined | Fixed — now uses `req.user._id` |
| Captain context crashes on home page | `fullname` vs `fullName` mismatch | Fixed with optional chaining |
| Logout crashes server | Missing `?.` on authorization header | Fixed |
| Socket.IO disconnects in production | Missing nginx Upgrade headers | See nginx config above |
| Maps return empty | Nominatim rate limit (1 req/sec) or bad address | Add delay between calls or check address format |

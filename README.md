# RideSync

A fullstack ride-sharing web application built with React and Node.js. Users can request rides, captains (drivers) can accept and complete them — all in real time.

---

## What it does

### For Riders
- Register and log in
- Enter a pickup and drop-off location with autocomplete suggestions
- Get live fare estimates across three vehicle types (Car, Bike, Auto)
- Confirm a ride and wait for a driver to accept
- See driver details (name, plate, vehicle) once a captain accepts
- View trip summary on the ride screen

### For Captains (Drivers)
- Register with vehicle details (color, plate, capacity, type)
- Log in and see incoming ride requests in real time
- View rider info, pickup/drop-off, and fare before accepting
- Enter the rider-provided OTP to start the trip
- Mark rides as complete to finish the session

### Real-Time Features
- Socket.IO powers live updates between riders and drivers
- Captains receive new ride requests instantly
- Riders are notified the moment a driver accepts

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, GSAP animations |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcrypt |
| Real-time | Socket.IO |
| Maps | Nominatim (OpenStreetMap) + OSRM — fully free, no API key |

---

## Screenshots

> Coming soon — run the app locally to explore the UI.

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- No maps API key needed — uses free OpenStreetMap services

### 1. Clone the repo
```bash
git clone https://github.com/Sid-das-2023/Uber-Clone.git
cd ridesync
```

### 2. Set up Backend
```bash
cd Backend
npm install
```

Create `Backend/.env`:
```env
PORT=3000
DB_CONNECT=mongodb://localhost:27017/ridesync
JWT_SECRET=your_jwt_secret_here
```

```bash
npm start
```

### 3. Set up Frontend
```bash
cd ../Frontend
npm install
npm install socket.io-client
```

Create `Frontend/.env`:
```env
VITE_BASE_URL=http://localhost:3000
```

```bash
npm run dev
```

Open `http://localhost:5173`

---

## License

MIT

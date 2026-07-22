# Deployment Guide — Live Host, Web App, Backend, Dashboard & APK

## Project Architecture

| Component | Folder | Technology | Port |
|-----------|--------|------------|------|
| **Mobile App (Android)** | `/` (root) | React Native Expo | — |
| **Web App (Browser)** | `/` (root) | Expo Web | 19006 |
| **Admin Web Dashboard** | `/dashboard` | React + Vite | 5173 |
| **Backend API** | `/backend` | Node.js + Express | 4000 |

---

## 1. Run Everything Locally (Before Deploy)

### Terminal 1 — Backend API
```bash
cd backend
npm install
npm run dev
```
API live at: **http://localhost:4000**

### Terminal 2 — Admin Web Dashboard
```bash
cd dashboard
npm install
npm run dev
```
Dashboard live at: **http://localhost:5173**

- **Public website:** http://localhost:5173/
- **Admin login:** http://localhost:5173/login  
  Credentials: `admin@lifelink.org` / `Admin1234`
- **APK download page:** http://localhost:5173/download

### Terminal 3 — Mobile App (Android + Web)
```bash
npm install
npx expo install react-dom react-native-web @expo/metro-runtime
npx expo start
```
- Press **a** for Android emulator
- Press **w** for web browser app
- Scan QR with **Expo Go** on phone

---

## 2. Deploy Backend (Live API)

### Option A — Render (Free, Recommended)

1. Push project to GitHub
2. Go to [render.com](https://render.com) → New → Blueprint
3. Connect repo — uses `render.yaml` automatically
4. Your API will be live at: `https://lifelink-api.onrender.com`

### Option B — Railway / Fly.io
```bash
cd backend
npm run build
npm start
```
Set `PORT` and `CORS_ORIGIN=*` environment variables.

---

## 3. Deploy Web Dashboard (Live Host)

### Vercel (Free, Recommended)

```bash
cd dashboard
npm install
npm run build
npx vercel --prod
```

Set environment variables in Vercel dashboard:
- `VITE_API_URL` = `https://YOUR-BACKEND-URL.onrender.com`
- `VITE_APK_URL` = your Expo APK download link (see section 5)

### Netlify
```bash
cd dashboard
npm run build
npx netlify deploy --prod --dir=dist
```

**Live URLs after deploy:**
- Website: `https://your-project.vercel.app`
- Admin: `https://your-project.vercel.app/login`
- Download: `https://your-project.vercel.app/download`

---

## 4. Deploy Mobile Web Application

Expo web can be exported and hosted on Vercel/Netlify:

```bash
npx expo export --platform web
```

Output in `dist/` folder — deploy to any static host.

Or run live during demo:
```bash
npx expo start --web
```

Set in `.env`:
```
EXPO_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## 5. Generate Android APK & Download Link

### Step 1 — Create Expo account
Sign up at [expo.dev](https://expo.dev) (free)

### Step 2 — Login and configure
```bash
npm install -g eas-cli
eas login
eas init
```

### Step 3 — Build APK
```bash
cd "c:\life link organ"
eas build -p android --profile preview
```

### Step 4 — Get APK link
After build completes (10–20 min), Expo provides a URL like:
```
https://expo.dev/artifacts/eas/xxxxxxxx.apk
```

Copy this URL and:
1. Add to `dashboard/.env` as `VITE_APK_URL`
2. Add to mobile `.env` as `EXPO_PUBLIC_APK_URL`
3. Redeploy dashboard so download page shows the link

### Alternative — Local APK (Android Studio required)
```bash
npx expo prebuild
npx expo run:android --variant release
```
APK at: `android/app/build/outputs/apk/release/app-release.apk`

---

## 6. API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |
| GET | `/api/auth/users` | All users |
| GET | `/api/donors` | Donors list |
| GET | `/api/hospitals` | Hospitals |
| GET | `/api/blood-banks` | Blood banks |
| GET | `/api/requests` | Emergency requests |
| POST | `/api/requests` | Create request |
| GET | `/api/dashboard/overview` | Admin stats |
| GET | `/api/campaigns` | Campaigns |
| GET | `/api/notifications` | Notifications |

---

## 7. College Project Demo Checklist

- [ ] Backend running (show `/api/health` in browser)
- [ ] Web dashboard login as admin
- [ ] Mobile app on Android via Expo Go or APK
- [ ] Login → "View All 50 Screens" for viva
- [ ] Show live stats updating on admin dashboard

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@lifelink.org | Admin1234 |
| Donor | donor@lifelink.org | Demo1234 |
| Patient | patient@lifelink.org | Demo1234 |
| Mobile demo | demo@college.edu | Demo1234 |

---

## Environment Variables Summary

**Backend (`backend/.env`):**
```
PORT=4000
CORS_ORIGIN=*
```

**Dashboard (`dashboard/.env`):**
```
VITE_API_URL=https://your-api.onrender.com
VITE_APK_URL=https://expo.dev/artifacts/eas/your-apk.apk
```

**Mobile (`.env`):**
```
EXPO_PUBLIC_API_URL=https://your-api.onrender.com
EXPO_PUBLIC_APK_URL=https://expo.dev/artifacts/eas/your-apk.apk
```

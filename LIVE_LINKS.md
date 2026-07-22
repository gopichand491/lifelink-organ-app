# LifeLink — Live Links & Access

## Your Expo Account: `ashok25`

---

## APK Download (Android App)

### Direct APK link (install on Android phone)
**https://expo.dev/artifacts/eas/juXSq8beBfXW6nXcTMuV2W.apk**

Open this link on your Android phone → download → install (enable "Install from unknown sources" if asked).

**Build management page:**
https://expo.dev/accounts/ashok25/projects/organ-donation-lifesaving-finder/builds/95cfc088-783e-4d55-9356-5a07d36d3d34

### Generate / rebuild APK
```bash
cd "c:\life link organ"
npm run android:apk
```

---

## Run Locally (Live Demo on Your PC)

| Service | URL | Command |
|---------|-----|---------|
| **Backend API** | http://localhost:4000 | `npm run backend` |
| **API Health** | http://localhost:4000/api/health | — |
| **Web Dashboard** | http://localhost:5173 | `cd dashboard && npm run dev` |
| **Admin Login** | http://localhost:5173/login | admin@lifelink.org / Admin1234 |
| **APK Info Page** | http://localhost:5173/download | — |
| **Mobile Web App** | http://localhost:8081 | `npx expo start --web` |
| **Mobile Android** | Expo Go QR | `npx expo start` |

---

## Deploy to Internet (Live Host)

### Backend → Render (free)
1. Push to GitHub
2. [render.com](https://render.com) → New Blueprint → uses `render.yaml`
3. Live API: `https://lifelink-api.onrender.com`

### Web Dashboard → Vercel (free)
```bash
cd dashboard
npx vercel --prod
```
Set env: `VITE_API_URL=https://YOUR-API.onrender.com`

---

## Admin Dashboard Login

| Email | Password | Role |
|-------|----------|------|
| admin@lifelink.org | Admin1234 | Admin |

---

## Mobile App — 50 Screens Demo

Login screen → **View All 50 Screens** → tap any screen for college viva.

---

## Project Structure

```
life link organ/
├── App.tsx              ← Mobile app (Android + Web) — 50 screens
├── backend/             ← REST API (Node.js Express)
├── dashboard/           ← Web app + Admin dashboard (React Vite)
├── DEPLOYMENT.md        ← Full deployment guide
└── LIVE_LINKS.md        ← This file
```

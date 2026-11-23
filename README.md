# Streamly — Frontend

React + TypeScript + Vite + Tailwind CSS frontend for the Spring Boot video streaming backend
([Suman807/streaming](https://github.com/Suman807/streaming/tree/feature/Adding_stream_in_chunks)).

Dark, cinematic "liquid glass" theme built with Tailwind CSS v4, framer-motion and lucide-react.

## Features

- **Landing page** (`/`): hero with a looping background video, an app preview mockup, feature, pricing
  and testimonial sections. Pricing and testimonials are placeholder content.
- **Sign in** (`/signin`) with JWT (`POST /login`). The token is stored in `localStorage` and sent as
  `Authorization: Bearer …`. You're signed out automatically when the token expires or the backend returns 401/403.
- **Library** (`/browse`): a featured latest upload plus a grid of videos from `GET /api/v1/videos`, with search and Cloudinary thumbnails.
- **Watch** (`/watch/:id`): HTML5 player with an "Up next" rail that streams the video's Cloudinary URL. The browser fetches it in chunks
  with HTTP range requests, so you can seek without downloading the whole file.
- **Upload** (`/upload`): drag-and-drop multipart upload to `POST /api/v1/videos`, with a local preview, a progress bar, and a 100 MB limit check.

## Getting started

```bash
npm install
cp .env.example .env     # then edit BACKEND_URL if needed
npm run dev              # http://localhost:5174
```

Start the Spring Boot backend first. In development every API call goes to `/backend/*`,
and Vite proxies it to `BACKEND_URL` with the prefix removed. This means:

- there are no CORS problems (the backend's `/login` has no `@CrossOrigin`)
- it doesn't clash with the backend's Thymeleaf `GET /login` page

The dev server runs on port **5174** because that's the `frontend.url` the backend allows for CORS.

### ⚠️ Port 8080 on this machine

Oracle XE's listener (`TNSLSNR`) already uses port 8080 here. Run Spring Boot on another port,
e.g. add `server.port: 8081` to `application.yml`, or start it with `--server.port=8081`, and set:

```
BACKEND_URL=http://localhost:8081
```

## Users

The backend has no signup endpoint. Create users directly in the `users` table with a
**BCrypt-hashed** password and a role of `USER` or `ADMIN`.

## Project structure

```
src/
  api/          axios client (JWT + 401 handling), auth & video endpoints, types
  auth/         AuthProvider, useAuth hook, RequireAuth route guard
  components/   Layout (app shell), VideoCard, brand/LogoMark
    landing/    landing-page sections (Hero, PlayerMockup, Pricing, …)
    ui/         Backdrop, PlayButton, SectionEyebrow
  pages/        Landing, SignIn, Library, Watch, Upload
  theme/        shared styles: gradient, motion presets, button classes
  utils/        Cloudinary thumbnail, date/size formatting
```

## Production build

```bash
npm run build   # outputs to dist/
```

If you host `dist/` separately from the backend, set `VITE_API_BASE_URL` to the backend URL
before building. The backend must then allow that origin with CORS on **all** endpoints,
including `/login`. A global `CorsConfigurationSource` bean is the simplest way to do that.

## Backend endpoints that would help (optional)

- `GET /api/v1/videos/{id}`: the Watch page currently loads the full list when opened directly
- `POST /signup`: so users can register from the UI

# Project

React 19 + TypeScript single-page app built with Vite, using React Router 7 and axios. It is the frontend
for a Spring Boot video streaming backend (https://github.com/Suman807/streaming, branch
`feature/Adding_stream_in_chunks`).

## UI / theme
- Tailwind CSS v4 (via `@tailwindcss/vite`, configured in `src/index.css` `@theme` — there is no
  `tailwind.config.js`), framer-motion for animation (`import { motion } from 'framer-motion'`), lucide-react icons.
- Dark cinematic "liquid glass" theme: base `#0c0c0c`, accents `#00d2ff` / `#A4F4FD` / `#0B2551`, Inter font.
- Shared pieces: `src/theme/styles.ts` (`gradientStyle`, `EASE`, `reveal()`, `pillPrimary`, `pillGhost`,
  `pageShell`), `src/components/ui/` (`Backdrop`, `PlayButton`, `SectionEyebrow`), `LogoMark`.
- Non-utility CSS (`.liquid-glass`, `.field`, `.c3-*` pricing classes) lives in `@layer components` in
  `src/index.css` so Tailwind utilities can still override it.
- SVG filters: `#c3-noise` (headline grain, in `Backdrop`) and `#c3-noise-pricing` (pricing watermark) —
  keep the ids distinct; duplicate ids make the second filter unreachable.
- `PlayButton variant="orbit"` (animated iridescent ring, `.orbit-*` in `index.css`) is reserved for
  hero-level "press play" CTAs: the hero, the final CTA and the library featured banner. Keep it to about
  one per screen. Don't use it on nav, form submits or utility buttons.
- Honor reduced motion: `MotionConfig reducedMotion="user"` wraps the app; use `motion-reduce:` variants
  for CSS animations.
- lucide-react is v1: some old icon names are gone (e.g. `History`, `Home` → `House`) — check exports.

## Routes
- `/` landing (public), `/signin` (public), `/browse` library, `/watch/:videoId`, `/upload` (all three
  behind `RequireAuth`, rendered inside `Layout`). Pages are lazy-loaded in `App.tsx`.
- Landing-page content (pricing, testimonials, player mockup) is static placeholder copy, not backend data.

## Backend contract
- `POST /login` — JSON `{username, password}` → returns the JWT as **plain text** (not JSON). 401 on bad creds.
- `GET /api/v1/videos` — returns `Video[]` (`videoId, title, description, contentType, url, uploadDate`).
- `POST /api/v1/videos` — multipart `file, title, description`; max 100 MB. Files are stored on Cloudinary
  and `url` is a Cloudinary URL that the `<video>` element plays directly.
- All endpoints except `/login` require `Authorization: Bearer <jwt>`. No signup endpoint exists.
- `src/api/types.ts` mirrors the backend Java models — keep them in sync when the backend changes.

## Dev proxy
- Browser calls go to `/backend/*`; Vite proxies them to `BACKEND_URL` with the prefix stripped
  (see `vite.config.ts`). Don't call the backend origin directly in dev — `/login` has no CORS, and
  `GET /login` on the backend is a Thymeleaf page.
- Dev server must run on port **5174** — the only origin the backend's CORS (`frontend.url`) allows.
- Port 8080 on this machine is used by Oracle XE (`TNSLSNR`); run Spring Boot elsewhere (e.g. 8081)
  and set `BACKEND_URL` in `.env`.

# Commands
- Dev server: `npm run dev` (http://localhost:5174)
- Build (type-check + bundle): `npm run build`
- Lint: `npm run lint` (oxlint)
- No test runner is configured yet.

# Code Style
- Use 2-space indentation, single quotes, no semicolons.
- Pages and components use default exports; API, utils, and hooks use named exports.
- All HTTP calls go through the shared `api` axios instance in `src/api/client.ts` (it attaches the JWT and
  logs out on 401/403). Add endpoint functions in `src/api/*.ts`, not inline in components.
- Use `errorMessage()` from `src/api/client.ts` to show backend errors to users.
- Use `import type` for type-only imports (`verbatimModuleSyntax` is on); no `enum` or parameter
  properties (`erasableSyntaxOnly`).
- Keep component files exporting only components (fast refresh lint rule) — put hooks/context in
  separate `.ts` files, e.g. `src/auth/useAuth.ts`.
- Avoid synchronous `setState` inside `useEffect` (lint rule `set-state-in-effect`); update state
  from event handlers or derive it during render.
- Run `npm run build` and `npm run lint` before considering a change done — both should pass cleanly.

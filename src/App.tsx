import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import RequireAuth from './auth/RequireAuth'
import Layout from './components/Layout'

// Route-level code splitting: the landing page and app pages load on demand.
const Landing = lazy(() => import('./pages/Landing'))
const SignIn = lazy(() => import('./pages/SignIn'))
const Library = lazy(() => import('./pages/Library'))
const Watch = lazy(() => import('./pages/Watch'))
const Upload = lazy(() => import('./pages/Upload'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-[#0c0c0c]" />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route element={<RequireAuth />}>
                <Route element={<Layout />}>
                  <Route path="/browse" element={<Library />} />
                  <Route path="/watch/:videoId" element={<Watch />} />
                  <Route path="/upload" element={<Upload />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </MotionConfig>
  )
}

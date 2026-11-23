import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { errorMessage } from '../api/client'
import LogoMark from '../components/brand/LogoMark'
import Backdrop from '../components/ui/Backdrop'
import { EASE, gradientStyle, pageShell, pillPrimary } from '../theme/styles'

export default function SignIn() {
  const { token, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/browse'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (token) return <Navigate to={from} replace />

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(username.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(errorMessage(err, 'Login failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={pageShell}>
      <Backdrop />
      <div className="relative z-10 min-h-screen flex flex-col px-6">
        <div className="max-w-6xl w-full mx-auto py-5">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to home
          </Link>
        </div>

        <div className="flex-1 grid place-items-center pb-16">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            onSubmit={handleSubmit}
            className="liquid-glass w-full max-w-sm rounded-3xl bg-black/40 backdrop-blur-xl p-8 flex flex-col gap-5"
          >
            <LogoMark className="w-10 h-10" />
            <h1 className="text-3xl font-semibold tracking-tight leading-[0.95]">
              Sign in to
              <br />
              <span className="animate-shiny motion-reduce:animate-none" style={gradientStyle}>
                Streamly
              </span>
            </h1>
            <p className="text-sm text-white/60 -mt-1">Pick up right where you left off.</p>

            <label className="block text-sm text-white/70">
              Username
              <input
                className="field mt-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
                required
              />
            </label>
            <label className="block text-sm text-white/70">
              Password
              <input
                className="field mt-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            {error && (
              <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 text-sm px-4 py-3">
                {error}
              </div>
            )}

            <button className={`${pillPrimary} w-full mt-1`} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
              {!loading && (
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-px" aria-hidden="true" />
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}

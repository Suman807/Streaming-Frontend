import { LogOut } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import LogoMark from './brand/LogoMark'
import Backdrop from './ui/Backdrop'
import { pageShell } from '../theme/styles'

const navClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 transition-colors ${
    isActive
      ? 'text-white after:absolute after:inset-x-0 after:-bottom-[21px] after:h-px after:bg-[#00d2ff]'
      : 'text-white/60 hover:text-white'
  }`

export default function Layout() {
  const { username, logout } = useAuth()

  return (
    <div className={pageShell}>
      <Backdrop video={false} />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 bg-black/40 backdrop-blur-md border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Streamly home">
              <LogoMark className="w-7 h-7" />
              <span className="hidden sm:inline font-semibold tracking-tight">Streamly</span>
            </Link>
            <nav className="flex gap-6 text-sm font-medium" aria-label="App">
              <NavLink to="/browse" className={navClass}>
                Browse
              </NavLink>
              <NavLink to="/upload" className={navClass}>
                Upload
              </NavLink>
            </nav>
            <div className="ml-auto flex items-center gap-3">
              {username && (
                <span className="hidden sm:flex items-center gap-2 text-sm text-white/60">
                  <span className="w-7 h-7 rounded-full bg-linear-to-br from-[#00d2ff] to-[#0B2551] grid place-items-center text-xs font-semibold text-white">
                    {username.charAt(0).toUpperCase()}
                  </span>
                  {username}
                </span>
              )}
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 md:py-14">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import LogoMark from '../brand/LogoMark'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <div className="flex items-center gap-2">
          <LogoMark className="w-4 h-4" />
          <span>© {YEAR} Streamly</span>
        </div>
        <nav className="flex gap-6" aria-label="Footer">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <Link to="/browse" className="hover:text-white">Browse</Link>
          <Link to="/upload" className="hover:text-white">Upload</Link>
        </nav>
      </div>
    </footer>
  )
}

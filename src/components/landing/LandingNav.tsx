import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import LogoMark from '../brand/LogoMark'
import PlayButton from '../ui/PlayButton'

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Stories', href: '#stories' },
  { label: 'Browse', to: '/browse' },
  { label: 'Upload', to: '/upload' },
]

const linkClass = 'text-white/70 text-sm font-medium hover:text-white transition-colors'

function NavItem({ item, onClick }: { item: (typeof LINKS)[number]; onClick?: () => void }) {
  return item.to ? (
    <Link to={item.to} className={linkClass} onClick={onClick}>
      {item.label}
    </Link>
  ) : (
    <a href={item.href} className={linkClass} onClick={onClick}>
      {item.label}
    </a>
  )
}

export default function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative max-w-6xl mx-auto px-6 py-5 flex items-center justify-between"
      aria-label="Main"
    >
      <Link to="/" aria-label="Streamly home">
        <LogoMark />
      </Link>

      <div className="hidden md:flex gap-8">
        {LINKS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
          >
            <NavItem item={item} />
          </motion.div>
        ))}
      </div>

      <div className="hidden md:block">
        <PlayButton />
      </div>

      <button
        type="button"
        className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 grid place-items-center"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full inset-x-6 z-30 liquid-glass rounded-2xl bg-black/70 backdrop-blur-xl p-4 flex flex-col gap-4"
          >
            {LINKS.map((item) => (
              <NavItem key={item.label} item={item} onClick={() => setOpen(false)} />
            ))}
            <PlayButton full />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

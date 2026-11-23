import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import LogoMark from '../brand/LogoMark'

const ITEMS = ['Home', 'Movies', 'Series', 'My List', 'Uploads', 'Live']

function formatClock(d: Date) {
  const date = d
    .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    .replace(',', '')
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${date} ${time}`
}

/** Desktop-app style menu strip with a live clock. */
export default function MenuBar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="h-10 bg-black/40 backdrop-blur-md border-t border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <LogoMark className="w-3.5 h-3.5" />
          <span className="font-bold text-white">Streamly</span>
          {ITEMS.map((item, i) => (
            <span
              key={item}
              className={`text-white/70 ${i > 3 ? 'hidden md:inline' : i > 2 ? 'hidden sm:inline' : ''}`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <Search className="w-3.5 h-3.5" aria-hidden="true" />
          <time dateTime={now.toISOString()}>{formatClock(now)}</time>
        </div>
      </div>
    </motion.div>
  )
}

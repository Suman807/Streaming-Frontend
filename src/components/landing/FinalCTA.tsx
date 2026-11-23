import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PlayButton from '../ui/PlayButton'
import { pillGhost, reveal } from '../../theme/styles'

export default function FinalCTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
      <motion.div
        {...reveal(0, 30)}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center"
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)' }}
        />
        <h2 className="relative text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
          Dim the lights.
          <br />
          Press play.
        </h2>
        <p className="relative mt-6 text-white/60 max-w-md mx-auto text-sm leading-[1.6]">
          Join creators, educators, and film lovers who treat their video library like a cinema — not
          a folder.
        </p>
        <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <PlayButton variant="orbit" />
          <Link to="/upload" className={pillGhost}>
            Upload a video <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

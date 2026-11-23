import { motion } from 'framer-motion'
import PlayButton from '../ui/PlayButton'
import { EASE, gradientStyle } from '../../theme/styles'

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 md:pt-28 pb-20 text-center flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
        className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]"
      >
        <span className="block">Your cinema.</span>
        <span className="block animate-shiny motion-reduce:animate-none pb-[0.08em]" style={gradientStyle}>
          Reimagined
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
        className="mt-8 text-white/60 max-w-md text-base leading-[1.5]"
      >
        Streamly is the home for every video you make and love. Upload once, then stream anywhere in
        smooth, chunked playback — seek instantly, no waiting for downloads.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
        className="mt-10 flex flex-col items-center gap-3"
      >
        <PlayButton variant="orbit" />
        <span className="text-xs text-white/40">Streams in any modern browser · No downloads</span>
      </motion.div>
    </section>
  )
}

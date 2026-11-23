import { motion } from 'framer-motion'
import SectionEyebrow from '../ui/SectionEyebrow'
import { reveal } from '../../theme/styles'

const CHIPS = ['Instant seek', 'Resume anywhere', 'Smart thumbnails', 'Drag-and-drop uploads']

const QUEUES = [
  { label: 'Now playing', count: 1, color: '#ffffff', items: ['Neon Tides — Episode 3 · 28 min left'] },
  {
    label: 'Continue watching',
    count: 7,
    color: '#e5e5e5',
    items: ['The Quiet Orbit — 1h left', 'Night Market, Taipei — 3 min left'],
  },
  {
    label: 'New uploads',
    count: 18,
    color: '#a3a3a3',
    items: ['Coastlines at Dawn — just now', 'Wire & Wood — synth build'],
  },
  { label: 'Watched', count: 16, color: '#525252', items: ['Documentaries · Shorts · Tutorials'] },
]

export default function FeatureStreaming() {
  return (
    <section id="features" className="scroll-mt-8 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div {...reveal()}>
          <SectionEyebrow label="Streaming" tag="Chunked delivery" />
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
            Press play.
            <br />
            Skip the wait.
          </h2>
          <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
            Videos are delivered in small byte-range chunks, so playback starts in moments and seeking
            jumps straight to the scene you want — no full downloads, no spinner marathons.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <span
                key={c}
                className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div {...reveal(0.15)} className="liquid-glass rounded-2xl p-5">
          <p className="text-xs text-white/50">Tonight · 42 titles in your queue</p>
          <div className="mt-4 grid gap-3">
            {QUEUES.map((q) => (
              <div key={q.label} className="liquid-glass rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full" style={{ background: q.color }} />
                  <span className="font-medium">{q.label}</span>
                  <span className="ml-auto text-xs text-white/40 tabular-nums">{q.count}</span>
                </div>
                <ul className="mt-2 space-y-1 pl-4">
                  {q.items.map((item) => (
                    <li key={item} className="text-xs text-white/55 truncate">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

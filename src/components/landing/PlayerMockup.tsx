import { motion } from 'framer-motion'
import {
  Bookmark,
  Captions,
  Clock,
  CloudUpload,
  Download,
  Film,
  Flame,
  House,
  Maximize,
  Play,
  Settings,
  SkipForward,
  Sparkles,
  Volume2,
} from 'lucide-react'
import { EASE } from '../../theme/styles'

const NAV = [
  { icon: House, label: 'Home', active: true },
  { icon: Flame, label: 'Trending', count: 12 },
  { icon: Bookmark, label: 'Watchlist', count: 3 },
  { icon: Clock, label: 'Continue watching', count: 2 },
  { icon: Film, label: 'My uploads' },
  { icon: Download, label: 'Downloads' },
]

const GENRES = [
  { label: 'Sci-Fi', color: '#00d2ff' },
  { label: 'Documentary', color: '#A4F4FD' },
  { label: 'Thriller', color: '#f59e0b' },
  { label: 'Nature', color: '#10b981' },
]

const CHAPTERS = [
  { time: '00:00', label: 'Cold open' },
  { time: '06:12', label: 'The harbor' },
  { time: '14:32', label: 'Signal lost', current: true },
  { time: '28:45', label: 'Undertow' },
]

const QUEUE = [
  { title: 'Neon Tides — Ep. 4', channel: 'Streamly Originals', duration: '44:02', gradient: 'from-[#0B2551] to-[#00d2ff]', active: true },
  { title: 'Coastlines at Dawn', channel: 'Marine Lab', duration: '12:18', gradient: 'from-[#10b981]/70 to-[#0B2551]', fresh: true },
  { title: 'Building a Synth from Scratch', channel: 'Wire & Wood', duration: '27:40', gradient: 'from-[#f59e0b]/70 to-[#091020]' },
  { title: 'Night Market, Taipei', channel: 'Field Notes', duration: '08:55', gradient: 'from-[#A4F4FD]/60 to-[#0B2551]' },
  { title: 'The Quiet Orbit', channel: 'Deep Field', duration: '1:12:30', gradient: 'from-[#091020] to-[#00d2ff]/60' },
  { title: 'Spring Boot in 20 Minutes', channel: 'Dev Reels', duration: '19:47', gradient: 'from-[#10b981]/50 to-[#091020]' },
]

const iconBtn = 'w-7 h-7 rounded-md grid place-items-center hover:bg-white/10 transition-colors'

/** Decorative app preview — not interactive. */
export default function PlayerMockup() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24" aria-label="Streamly app preview">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl"
      >
        {/* Title bar */}
        <div className="relative h-10 flex items-center px-4 border-b border-white/10">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-xs text-white/50">
            Streamly — Now Playing
          </span>
        </div>

        <div className="grid grid-cols-12 md:h-[520px]">
          {/* Sidebar */}
          <aside className="hidden md:flex md:col-span-3 flex-col border-r border-white/10 bg-black/30 p-4">
            <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black text-xs font-semibold px-3 py-2">
              <CloudUpload className="w-3.5 h-3.5" /> Upload to Streamly
            </div>
            <ul className="mt-5 space-y-1">
              {NAV.map(({ icon: Icon, label, count, active }) => (
                <li
                  key={label}
                  className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs ${
                    active ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="flex-1 truncate">{label}</span>
                  {count && <span className="text-white/40">{count}</span>}
                </li>
              ))}
            </ul>
            <p className="mt-6 px-2.5 text-[10px] uppercase tracking-widest text-white/40">Genres</p>
            <ul className="mt-2 space-y-1">
              {GENRES.map((g) => (
                <li key={g.label} className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-white/60">
                  <span className="w-2 h-2 rounded-full" style={{ background: g.color }} />
                  {g.label}
                </li>
              ))}
            </ul>
          </aside>

          {/* Player */}
          <div className="col-span-12 md:col-span-6 md:border-r border-white/10 flex flex-col min-h-0">
            <div className="relative aspect-video bg-linear-to-br from-[#0B2551] via-[#091020] to-black overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(400px_circle_at_70%_30%,rgba(0,210,255,0.35),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(300px_circle_at_20%_80%,rgba(164,244,253,0.15),transparent_60%)]" />
              <span className="absolute left-5 top-4 text-[10px] uppercase tracking-[0.3em] text-white/50">
                Streamly Original
              </span>
              <span className="absolute left-5 top-8 text-2xl md:text-3xl font-extrabold tracking-tight text-white/90">
                NEON TIDES
              </span>
              <div className="absolute inset-0 grid place-items-center">
                <span className="liquid-glass w-14 h-14 rounded-full grid place-items-center bg-white/10">
                  <Play className="w-5 h-5 fill-white translate-x-px" />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 px-3 pb-2 pt-8 bg-linear-to-t from-black/80 to-transparent">
                {/* Progress: played + buffered chunks */}
                <div className="relative h-1 rounded-full bg-white/15">
                  <div className="absolute inset-y-0 left-0 w-[58%] rounded-full bg-white/30" />
                  <div className="absolute inset-y-0 left-0 w-[34%] rounded-full bg-[#00d2ff]" />
                  <div className="absolute top-1/2 left-[34%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-white/80">
                  <div className="flex items-center gap-1">
                    <span className={iconBtn}><Play className="w-3.5 h-3.5 fill-current" /></span>
                    <span className={iconBtn}><SkipForward className="w-3.5 h-3.5" /></span>
                    <span className={iconBtn}><Volume2 className="w-3.5 h-3.5" /></span>
                    <span className="ml-1 text-[11px] tabular-nums text-white/70">14:32 / 42:10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={iconBtn}><Captions className="w-3.5 h-3.5" /></span>
                    <span className={iconBtn}><Settings className="w-3.5 h-3.5" /></span>
                    <span className={iconBtn}><Maximize className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 [scrollbar-width:none]">
              <h3 className="text-sm font-semibold">Neon Tides — Episode 3: Signal Lost</h3>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="w-7 h-7 rounded-full bg-linear-to-br from-[#00d2ff] to-[#0B2551] grid place-items-center text-[11px] font-semibold">
                  S
                </span>
                <div className="flex-1">
                  <p className="font-medium">Streamly Originals</p>
                  <p className="text-white/50">2026 · 4K HDR · 42 min</p>
                </div>
                <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/60 text-[11px]">
                  Sci-Fi
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-white/80">
                  <Sparkles className="w-3.5 h-3.5 text-[#A4F4FD]" /> Smart chapters
                </p>
                <ul className="mt-2 grid grid-cols-2 gap-1.5">
                  {CHAPTERS.map((c) => (
                    <li
                      key={c.time}
                      className={`flex gap-2 rounded-md px-2 py-1 text-[11px] ${
                        c.current ? 'bg-white/10 text-white' : 'text-white/55'
                      }`}
                    >
                      <span className="tabular-nums text-white/40">{c.time}</span>
                      {c.label}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-xs leading-[1.6] text-white/60">
                A coastal city loses contact with its offshore relay the night the tide never turns.
                Mara follows the last transmission out past the harbor lights — and finds something
                answering back.
              </p>
            </div>
          </div>

          {/* Up next */}
          <div className="hidden md:flex md:col-span-3 flex-col min-h-0">
            <div className="flex items-center justify-between px-4 h-11 border-b border-white/10 text-xs">
              <span className="font-semibold">Up next</span>
              <span className="flex items-center gap-1.5 text-white/50">
                Autoplay
                <span className="relative w-6 h-3.5 rounded-full bg-[#00d2ff]/80">
                  <span className="absolute right-0.5 top-0.5 w-2.5 h-2.5 rounded-full bg-white" />
                </span>
              </span>
            </div>
            <ul className="flex-1 overflow-y-auto p-2 space-y-1 [scrollbar-width:none]">
              {QUEUE.map((q) => (
                <li
                  key={q.title}
                  className={`flex gap-2.5 rounded-lg p-2 ${q.active ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'}`}
                >
                  <div className={`relative shrink-0 w-20 aspect-video rounded-md bg-linear-to-br ${q.gradient}`}>
                    <span className="absolute bottom-0.5 right-0.5 rounded bg-black/70 px-1 text-[9px] tabular-nums">
                      {q.duration}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[11px] leading-tight line-clamp-2 ${q.active ? 'font-semibold' : 'text-white/80'}`}>
                      {q.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/45 truncate">{q.channel}</p>
                    {q.fresh && <span className="mt-0.5 inline-block text-[9px] font-semibold text-[#00d2ff]">NEW</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

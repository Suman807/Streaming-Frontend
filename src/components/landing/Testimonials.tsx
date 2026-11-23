import { motion } from 'framer-motion'
import { reveal } from '../../theme/styles'

// Placeholder quotes from fictional people — replace with real ones.
const QUOTES = [
  {
    quote:
      'I upload a rough cut at lunch and my client is scrubbing through it before I finish my coffee. Seeking is instant.',
    name: 'Priya Raman',
    role: 'Documentary Editor',
    company: 'Halflight Films',
  },
  {
    quote:
      'Our training library finally feels like a streaming service instead of a shared drive full of MP4s.',
    name: 'Tomás Ortega',
    role: 'Learning & Development Lead',
    company: 'Northwind Labs',
  },
  {
    quote:
      'Clean, fast, and the dark interface makes every thumbnail pop. My students actually finish the lectures now.',
    name: 'Amara Okafor',
    role: 'Lecturer, Media Studies',
    company: 'Orbit Academy',
  },
]

export default function Testimonials() {
  return (
    <section id="stories" className="scroll-mt-8 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
      <div className="grid md:grid-cols-3 gap-6">
        {QUOTES.map((q, i) => (
          <motion.figure key={q.name} {...reveal(i * 0.1)} className="liquid-glass rounded-2xl p-6 flex flex-col">
            <blockquote className="text-sm text-white/80 leading-[1.6] flex-1">“{q.quote}”</blockquote>
            <figcaption className="mt-6 pt-5 border-t border-white/10">
              <p className="text-sm font-semibold">{q.name}</p>
              <p className="text-xs text-white/50">{q.role}</p>
              <p className="mt-2 text-xs text-white font-semibold tracking-wide uppercase">{q.company}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}

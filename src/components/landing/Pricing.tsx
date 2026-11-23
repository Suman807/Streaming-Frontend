import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Plan {
  tier: string
  monthly: string
  yearly: string
  desc: string
  features: string[]
  pro?: boolean
}

// Display-only plans — the backend has no billing yet.
const PLANS: Plan[] = [
  {
    tier: 'Free',
    monthly: 'Free',
    yearly: 'Free',
    desc: 'For viewers and creators pressing play for the first time.',
    features: [
      'Stream in up to 720p',
      'Upload videos up to 100 MB',
      '3 uploads per month',
      'Watch on web and mobile',
      'Personal watchlist',
    ],
  },
  {
    tier: 'Standard',
    monthly: '$9,99/m',
    yearly: '$99,99/y',
    desc: 'For creators and small teams sharing their work with an audience.',
    features: [
      'Stream in Full HD 1080p',
      'Unlimited uploads',
      'Smart chapters on every video',
      'Share with up to 5 members',
      'Ad-free playback',
    ],
  },
  {
    tier: 'Pro',
    monthly: '$19,99/m',
    yearly: '$199,99/y',
    desc: 'For studios, educators, and brands streaming at scale.',
    features: [
      'Stream in 4K HDR',
      'Priority processing',
      'Advanced view analytics',
      'Unlimited team members',
      'Custom branded player',
    ],
    pro: true,
  },
]

function Check() {
  return (
    <span className="c3-check" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  )
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="c3-pricing-section scroll-mt-8">
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="c3-noise-pricing">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.075" />
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="in" result="noise" />
            <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
          </filter>
        </defs>
      </svg>

      <div className="c3-watermark-container" aria-hidden="true">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Your cinema.</span>
          <span className="c3-watermark-line-2">Reimagined</span>
        </div>
      </div>

      <h2 className="sr-only">Pricing</h2>

      <div className="c3-grid">
        {PLANS.map((plan) => (
          <article key={plan.tier} className={`c3-card ${plan.pro ? 'c3-card-pro' : ''}`}>
            <span className="c3-tier-small">{plan.tier}</span>
            <span className="c3-tier-large">{yearly ? plan.yearly : plan.monthly}</span>
            <p className="c3-desc">{plan.desc}</p>
            <ul className="c3-list">
              {plan.features.map((f) => (
                <li key={f}>
                  <Check />
                  <span className="pt-1">{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/signin" className="c3-btn">
              Choose Plan
            </Link>
          </article>
        ))}
      </div>

      <div className="c3-toggle-wrap">
        <span id="yearly-label" className="text-sm text-white/80">
          Yearly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          aria-labelledby="yearly-label"
          className={`c3-toggle ${yearly ? 'active' : ''}`}
          onClick={() => setYearly((y) => !y)}
        >
          <span className="c3-toggle-knob" />
        </button>
      </div>
    </section>
  )
}

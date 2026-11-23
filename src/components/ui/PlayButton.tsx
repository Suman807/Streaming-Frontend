import { ChevronRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { pillPrimary } from '../../theme/styles'

interface Props {
  label?: string
  /** Defaults to the library when signed in, otherwise the sign-in page. */
  to?: string
  full?: boolean
  state?: unknown
  /**
   * `solid` — white pill (default). `orbit` — translucent pill whose icon disc wears an
   * animated iridescent ring. Reserve `orbit` for a few hero-level "press play" CTAs.
   */
  variant?: 'solid' | 'orbit'
}

/** Primary play CTA. */
export default function PlayButton({ label, to, full = false, state, variant = 'solid' }: Props) {
  const { token } = useAuth()
  const href = to ?? (token ? '/browse' : '/signin')
  const text = label ?? (token ? 'Open library' : 'Start watching')

  if (variant === 'orbit') {
    return (
      <Link to={href} state={state} className={`orbit-pill ${full ? 'w-full justify-center' : ''}`}>
        <span className="orbit-disc">
          <span className="orbit-ring" aria-hidden="true" />
          <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
        </span>
        {text}
      </Link>
    )
  }

  return (
    <Link to={href} state={state} className={`${pillPrimary} ${full ? 'w-full' : ''}`}>
      <Play className="w-4 h-4 fill-current" aria-hidden="true" />
      {text}
      <ChevronRight
        className="w-4 h-4 transition-transform group-hover:translate-x-px"
        aria-hidden="true"
      />
    </Link>
  )
}

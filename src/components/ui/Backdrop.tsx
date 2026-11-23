const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4'

/**
 * Fixed page backdrop: grain filter for the shiny headline, the looping
 * background video (or a static glow on app pages, so it doesn't compete
 * with the real player), and the two container guide lines.
 */
export default function Backdrop({ video = true }: { video?: boolean }) {
  return (
    <>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="c3-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
            <feComposite in2="SourceGraphic" operator="in" result="noise" />
            <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {video ? (
        <div className="fixed inset-0 z-0 pointer-events-none motion-reduce:hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="w-full h-full object-cover pointer-events-none"
            src={VIDEO_SRC}
          />
        </div>
      ) : (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(1100px_circle_at_50%_-20%,rgba(0,210,255,0.10),transparent_60%),radial-gradient(900px_circle_at_100%_110%,rgba(11,37,81,0.45),transparent_60%)]" />
      )}

      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />
    </>
  )
}

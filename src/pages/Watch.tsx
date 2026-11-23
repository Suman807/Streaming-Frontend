import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getVideos } from '../api/videos'
import { errorMessage } from '../api/client'
import type { Video } from '../api/types'
import { Thumbnail } from '../components/VideoCard'
import { formatDate } from '../utils/video'
import { EASE } from '../theme/styles'

const newestFirst = (a: Video, b: Video) => (b.uploadDate ?? '').localeCompare(a.uploadDate ?? '')

function BackLink() {
  return (
    <Link to="/browse" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
      <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to library
    </Link>
  )
}

export default function Watch() {
  const { videoId } = useParams()
  const passed = (useLocation().state as { video?: Video } | null)?.video
  const [list, setList] = useState<Video[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  // The backend has no GET /api/v1/videos/{id}, so we load the list once —
  // it resolves direct visits/refreshes and fills the "Up next" rail.
  useEffect(() => {
    let cancelled = false
    getVideos()
      .then((v) => !cancelled && setList(v))
      .catch((err) => !cancelled && setError(errorMessage(err, 'Failed to load video')))
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [videoId])

  const video =
    list?.find((v) => v.videoId === videoId) ?? (passed?.videoId === videoId ? passed : undefined)

  const upNext = useMemo(
    () => (list ?? []).filter((v) => v.videoId !== videoId).sort(newestFirst).slice(0, 8),
    [list, videoId],
  )

  if (!video) {
    if (error || list) {
      return (
        <div className="space-y-6">
          <BackLink />
          <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 text-sm px-4 py-3">
            {error ?? 'Video not found'}
          </div>
        </div>
      )
    }
    return (
      <div className="space-y-6 animate-pulse" aria-label="Loading video">
        <div className="aspect-video rounded-2xl bg-white/[0.04]" />
        <div className="h-6 w-1/2 rounded bg-white/10" />
      </div>
    )
  }

  const format = video.contentType?.split('/')[1]?.toUpperCase()

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <motion.div
        key={video.videoId}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="min-w-0 space-y-6"
      >
        <BackLink />

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-[#00d2ff]/5">
          {video.url ? (
            // The browser streams the file with HTTP range requests (chunks),
            // so seeking works without downloading the whole video.
            <video
              key={video.videoId}
              className="w-full aspect-video bg-black"
              src={video.url}
              controls
              autoPlay
              playsInline
              preload="metadata"
            >
              Your browser does not support HTML5 video.
            </video>
          ) : (
            <div className="aspect-video grid place-items-center text-sm text-red-200">
              This video has no playable URL.
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{video.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/50">
            <span className="w-8 h-8 rounded-full bg-linear-to-br from-[#00d2ff] to-[#0B2551] grid place-items-center text-sm font-semibold text-white">
              {video.title.charAt(0).toUpperCase()}
            </span>
            {video.uploadDate && <span>Uploaded {formatDate(video.uploadDate)}</span>}
            {format && (
              <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/60">{format}</span>
            )}
          </div>
        </div>

        {video.description && (
          <div className="liquid-glass rounded-2xl p-5">
            <p className="text-sm text-white/70 leading-[1.7] whitespace-pre-wrap">{video.description}</p>
          </div>
        )}
      </motion.div>

      <aside aria-label="Up next">
        <h2 className="text-sm font-semibold mb-4 lg:mt-10">Up next</h2>
        {upNext.length === 0 ? (
          <p className="text-sm text-white/50">
            {list ? (
              <>
                Nothing else yet.{' '}
                <Link to="/upload" className="text-[#00d2ff] hover:underline">
                  Upload another video
                </Link>
              </>
            ) : error ? null : (
              'Loading…'
            )}
          </p>
        ) : (
          <ul className="space-y-2">
            {upNext.map((v) => (
              <li key={v.videoId}>
                <Link
                  to={`/watch/${v.videoId}`}
                  state={{ video: v }}
                  className="group flex gap-3 rounded-xl p-2 hover:bg-white/[0.04] transition-colors"
                >
                  <Thumbnail video={v} className="w-36 shrink-0 rounded-lg" />
                  <div className="min-w-0 py-0.5">
                    <p className="text-sm font-medium leading-snug line-clamp-2">{v.title}</p>
                    {v.uploadDate && <p className="mt-1 text-xs text-white/45">{formatDate(v.uploadDate)}</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  )
}

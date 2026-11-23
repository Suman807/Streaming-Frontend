import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CloudUpload, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getVideos } from '../api/videos'
import { errorMessage } from '../api/client'
import type { Video } from '../api/types'
import VideoCard, { Thumbnail } from '../components/VideoCard'
import PlayButton from '../components/ui/PlayButton'
import SectionEyebrow from '../components/ui/SectionEyebrow'
import { formatDate } from '../utils/video'
import { EASE, gradientStyle, pillPrimary } from '../theme/styles'

const newestFirst = (a: Video, b: Video) => (b.uploadDate ?? '').localeCompare(a.uploadDate ?? '')

function Featured({ video }: { video: Video }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="liquid-glass rounded-3xl grid md:grid-cols-5 mb-12"
      aria-label="Latest upload"
    >
      <Link to={`/watch/${video.videoId}`} state={{ video }} className="group md:col-span-3 block">
        <Thumbnail video={video} className="h-full" />
      </Link>
      <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
        <SectionEyebrow
          label="Latest upload"
          tag={video.uploadDate ? formatDate(video.uploadDate) : undefined}
        />
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight leading-[1.05]">
          {video.title}
        </h2>
        <p className="mt-3 text-sm text-white/60 leading-[1.6] line-clamp-3">{video.description}</p>
        <div className="mt-6">
          <PlayButton variant="orbit" label="Play now" to={`/watch/${video.videoId}`} state={{ video }} />
        </div>
      </div>
    </motion.section>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Loading videos">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="liquid-glass rounded-2xl animate-pulse">
          <div className="aspect-video bg-white/[0.04]" />
          <div className="p-4 space-y-2">
            <div className="h-3 w-2/3 rounded bg-white/10" />
            <div className="h-2.5 w-full rounded bg-white/[0.06]" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Library() {
  const [videos, setVideos] = useState<Video[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let cancelled = false
    getVideos()
      .then((v) => !cancelled && setVideos(v))
      .catch((err) => !cancelled && setError(errorMessage(err, 'Failed to load videos')))
    return () => {
      cancelled = true
    }
  }, [])

  const sorted = useMemo(() => (videos ? [...videos].sort(newestFirst) : []), [videos])
  const q = query.trim().toLowerCase()
  const filtered = q
    ? sorted.filter((v) => v.title?.toLowerCase().includes(q) || v.description?.toLowerCase().includes(q))
    : sorted
  const featured = !q ? sorted[0] : undefined

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <SectionEyebrow label="Browse" tag={videos ? `${videos.length} videos` : undefined} />
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-[0.95]">
            Your{' '}
            <span className="animate-shiny motion-reduce:animate-none" style={gradientStyle}>
              library
            </span>
          </h1>
        </div>
        <label className="relative w-full md:w-80">
          <span className="sr-only">Search videos</span>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" aria-hidden="true" />
          <input
            className="field pl-10! rounded-full!"
            placeholder="Search videos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 text-sm px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {!videos && !error && <SkeletonGrid />}

      {videos && videos.length === 0 && (
        <div className="liquid-glass rounded-3xl px-8 py-16 text-center">
          <CloudUpload className="mx-auto w-10 h-10 text-white/40" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold">Nothing streaming yet</h2>
          <p className="mt-2 text-sm text-white/60">Upload your first video to start your library.</p>
          <Link to="/upload" className={`${pillPrimary} mt-6`}>
            Upload a video
          </Link>
        </div>
      )}

      {featured && <Featured video={featured} />}

      {videos && videos.length > 0 && (
        <>
          <h2 className="mb-5 text-sm font-semibold text-white/80">{q ? 'Results' : 'All videos'}</h2>
          {filtered.length === 0 ? (
            <p className="text-sm text-white/50">No videos match “{query}”.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((v, i) => (
                <VideoCard key={v.videoId} video={v} index={i} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

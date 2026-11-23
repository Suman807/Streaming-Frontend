import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Video } from '../api/types'
import { formatDate, thumbnailUrl } from '../utils/video'
import { EASE } from '../theme/styles'

export function Thumbnail({ video, className = '' }: { video: Video; className?: string }) {
  const thumb = thumbnailUrl(video.url)
  return (
    <div className={`relative aspect-video overflow-hidden bg-linear-to-br from-[#0B2551] via-[#091020] to-black ${className}`}>
      {thumb ? (
        <img
          src={thumb}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(300px_circle_at_70%_30%,rgba(0,210,255,0.3),transparent_60%)]" />
      )}
    </div>
  )
}

export default function VideoCard({ video, index = 0 }: { video: Video; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index, 12) * 0.04, ease: EASE }}
    >
      <Link
        to={`/watch/${video.videoId}`}
        state={{ video }}
        className="group block liquid-glass rounded-2xl transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="relative">
          <Thumbnail video={video} />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="w-12 h-12 rounded-full bg-white text-black grid place-items-center shadow-lg">
              <Play className="w-5 h-5 fill-current translate-x-px" aria-hidden="true" />
            </span>
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold truncate" title={video.title}>
            {video.title}
          </h3>
          <p className="mt-1 text-xs text-white/55 line-clamp-2 min-h-[2.5em]">{video.description}</p>
          {video.uploadDate && <p className="mt-2 text-[11px] text-white/40">{formatDate(video.uploadDate)}</p>}
        </div>
      </Link>
    </motion.div>
  )
}

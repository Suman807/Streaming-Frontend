import { useEffect, useRef, useState } from 'react'
import type { SubmitEvent } from 'react'
import { motion } from 'framer-motion'
import { CloudUpload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { uploadVideo } from '../api/videos'
import { errorMessage } from '../api/client'
import SectionEyebrow from '../components/ui/SectionEyebrow'
import { formatBytes } from '../utils/video'
import { EASE, gradientStyle, pillGhost, pillPrimary } from '../theme/styles'

// Matches spring.servlet.multipart.max-file-size in the backend.
const MAX_BYTES = 100 * 1024 * 1024

export default function Upload() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  // Track the object URL so it can be revoked when replaced or on unmount.
  const previewRef = useRef<string | null>(null)
  useEffect(
    () => () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current)
    },
    [],
  )

  function setPreviewFor(f: File | null) {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current)
    previewRef.current = f ? URL.createObjectURL(f) : null
    setPreview(previewRef.current)
  }

  function pickFile(f: File | null) {
    setError(null)
    if (f && f.size > MAX_BYTES) {
      setError(`File is ${formatBytes(f.size)}. The maximum allowed size is 100 MB.`)
      setFile(null)
      setPreviewFor(null)
      return
    }
    setFile(f)
    setPreviewFor(f)
    if (f && !title) setTitle(f.name.replace(/\.[^.]+$/, ''))
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    if (!file) return setError('Please choose a video file.')
    setError(null)
    setProgress(0)
    try {
      const saved = await uploadVideo(
        { file, title: title.trim(), description: description.trim() },
        setProgress,
      )
      navigate(`/watch/${saved.videoId}`, { state: { video: saved } })
    } catch (err) {
      setError(errorMessage(err, 'Upload failed'))
      setProgress(null)
    }
  }

  const uploading = progress !== null

  const fileInput = (
    <input
      type="file"
      accept="video/*"
      className="sr-only"
      disabled={uploading}
      onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
    />
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="max-w-2xl mx-auto"
    >
      <SectionEyebrow label="Upload" tag="Max 100 MB" />
      <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-[0.95]">
        Share your{' '}
        <span className="animate-shiny motion-reduce:animate-none" style={gradientStyle}>
          story
        </span>
      </h1>
      <p className="mt-4 text-sm text-white/60">
        Your video is stored on Cloudinary and streams in chunks as soon as it's processed.
      </p>

      <form className="liquid-glass rounded-3xl p-6 md:p-8 mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        {preview && file ? (
          <div className="space-y-3">
            <video src={preview} className="w-full max-h-80 rounded-2xl bg-black" muted controls />
            <div className="flex items-center justify-between gap-3 text-xs text-white/60">
              <span className="truncate">
                {file.name} · {formatBytes(file.size)}
              </span>
              <label className={`shrink-0 ${pillGhost} py-1.5! px-3! text-xs! cursor-pointer`}>
                {fileInput}
                Replace file
              </label>
            </div>
          </div>
        ) : (
          <label
            className={`flex flex-col items-center justify-center gap-3 min-h-52 p-6 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-colors ${
              dragging ? 'border-[#00d2ff]/70 bg-[#00d2ff]/5' : 'border-white/15 hover:border-white/30'
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              pickFile(e.dataTransfer.files?.[0] ?? null)
            }}
          >
            {fileInput}
            <span className="w-12 h-12 rounded-full liquid-glass grid place-items-center">
              <CloudUpload className="w-5 h-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium">Drag a video here or click to choose</span>
            <span className="text-xs text-white/45">MP4, WebM, MOV · up to 100 MB</span>
          </label>
        )}

        <label className="block text-sm text-white/70">
          Title
          <input
            className="field mt-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={uploading}
          />
        </label>
        <label className="block text-sm text-white/70">
          Description
          <textarea
            className="field mt-2 resize-y"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={uploading}
          />
        </label>

        {error && (
          <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 text-sm px-4 py-3">
            {error}
          </div>
        )}

        {uploading && (
          <div aria-live="polite">
            <div
              className="h-2 rounded-full bg-white/10 overflow-hidden"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-linear-to-r from-[#0B2551] via-[#00d2ff] to-[#A4F4FD] transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-white/60">
              {progress < 100 ? `Uploading… ${progress}%` : 'Processing on server (Cloudinary)…'}
            </p>
          </div>
        )}

        <button className={`${pillPrimary} self-start`} disabled={uploading || !file}>
          <CloudUpload className="w-4 h-4" aria-hidden="true" />
          {uploading ? 'Uploading…' : 'Upload video'}
        </button>
      </form>
    </motion.section>
  )
}

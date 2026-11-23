/** Mirrors com.sb.video.streaming.model.Video */
export interface Video {
  videoId: string
  title: string
  description: string
  contentType: string | null
  /** Cloudinary URL of the uploaded video */
  url: string | null
  /** ISO date (LocalDate), e.g. "2026-11-23" */
  uploadDate: string | null
}

/** Mirrors com.sb.video.streaming.payload.CustomMessage */
export interface CustomMessage {
  message: string
  success: boolean
}

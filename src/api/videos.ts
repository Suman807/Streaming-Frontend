import { api } from './client'
import type { Video } from './types'

const BASE = '/api/v1/videos'

export async function getVideos(): Promise<Video[]> {
  const res = await api.get<Video[]>(BASE)
  return res.data
}

export interface UploadInput {
  file: File
  title: string
  description: string
}

export async function uploadVideo(
  { file, title, description }: UploadInput,
  onProgress?: (percent: number) => void,
): Promise<Video> {
  const form = new FormData()
  form.append('file', file)
  form.append('title', title)
  form.append('description', description)

  const res = await api.post<Video>(BASE, form, {
    onUploadProgress: (e) => {
      if (e.total) onProgress?.(Math.round((e.loaded / e.total) * 100))
    },
  })
  return res.data
}

/**
 * Cloudinary can render a JPG frame of any video by swapping the extension:
 *   .../video/upload/v123/abc.mp4  ->  .../video/upload/so_1/v123/abc.jpg
 * Returns null for non-Cloudinary URLs.
 */
export function thumbnailUrl(url: string | null): string | null {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/video/upload/')) return null
  return url.replace('/video/upload/', '/video/upload/so_1,w_480,c_fill,ar_16:9/').replace(/\.[a-z0-9]+$/i, '.jpg')
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

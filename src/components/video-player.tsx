"use client"


interface VideoPlayerProps {
  url: string | null
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  if (!url) return null

  return (
    <div className="relative w-full h-auto">
      <video
        src={url}
        controls
        className="w-full h-auto rounded-xl object-cover border-1"
      />
      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-lg shadow-lg">
        Video miễn phí
      </span>
    </div>
  )
}

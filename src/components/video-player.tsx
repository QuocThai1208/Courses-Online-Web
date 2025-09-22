"use client"

import { useState, useEffect, useRef } from "react"

interface VideoPlayerProps {
  url: string | null
  onTimeUpdate?: (currentTime: number, duration: number) => void
  onComplete?: () => void
}

export function VideoPlayer({ url, onTimeUpdate, onComplete }: VideoPlayerProps) {
  const [isYouTube, setIsYouTube] = useState(false)
  const [videoId, setVideoId] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (url) {
      // Check if it's a YouTube URL
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      const match = url.match(youtubeRegex)

      if (match) {
        setIsYouTube(true)
        setVideoId(match[1])
      } else {
        setIsYouTube(false)
        setVideoId(null)
      }
    }
  }, [url])

  const handleTimeUpdate = () => {
    if (videoRef.current && onTimeUpdate) {
      onTimeUpdate(videoRef.current.currentTime, videoRef.current.duration)
    }
  }

  const handleEnded = () => {
    if (onComplete) {
      onComplete()
    }
  }

  if (!url) return null

  if (isYouTube && videoId) {
    return (
      <div className="relative w-full aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Video Player"
          className="w-full h-full rounded-xl border-1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-lg shadow-lg">
          Video miễn phí
        </span>
      </div>
    )
  }

  // For direct video files
  return (
    <div className="relative w-full h-auto">
      <video
        ref={videoRef}
        src={url}
        controls
        className="w-full h-auto rounded-xl object-cover border-1"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-lg shadow-lg">
        Video miễn phí
      </span>
    </div>
  )
}

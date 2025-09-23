"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"


interface VideoPlayerProps {
  url: string | null
  onTimeUpdate?: (currentTime: number, duration: number) => void
  onComplete?: () => void
  onManualProgress?: (percentage: number) => void
}

export function VideoPlayer({ url, onTimeUpdate, onComplete, onManualProgress }: VideoPlayerProps) {
  const [isYouTube, setIsYouTube] = useState(false)
  const [videoId, setVideoId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)
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

  const handleManualProgress = (percentage: number) => {
    setCurrentProgress(percentage)
    if (onManualProgress) {
      onManualProgress(percentage)
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      handleManualProgress(Math.min(currentProgress + 10, 100))
    }
  }

  const handleReset = () => {
    setCurrentProgress(0)
    setIsPlaying(false)
    if (onManualProgress) {
      onManualProgress(0)
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
        {/* Manual Progress Controls for YouTube */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-sm font-medium">Tiến độ học tập</span>
            <span className="text-white text-sm">{currentProgress}%</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Button
              size="sm"
              variant="secondary"
              onClick={handlePlayPause}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Tạm dừng' : 'Đang xem'}
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={handleReset}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleManualProgress(25)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              25%
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleManualProgress(50)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              50%
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleManualProgress(75)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              75%
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleManualProgress(100)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Hoàn thành
            </Button>
          </div>
        </div>
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

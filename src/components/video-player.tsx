

export function VideoPlayer() {

  return (

    <div className="relative w-full h-auto">
      <video
        src="https://api.huynhngoctruong.io.vn/image/user/soudcloud.mp4"
        controls
        className="w-full h-auto rounded-xl object-cover border-1"
      />
      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-lg shadow-lg">
        Video miễn phí
      </span>
    </div>
  )
}

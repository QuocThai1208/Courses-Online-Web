'use client'

import { useSearchParams } from "next/navigation"
import ChatRoom from "@/src/components/chat/ChatRoom"

const ChatPage = () => {
  const searchParams = useSearchParams()

  const roomId = searchParams.get("roomId")
  const currentUser = searchParams.get("currentUser")
  const targetUser = searchParams.get("targetUser")

  if (!roomId || !currentUser || !targetUser) {
    return <div>Không có dữ liệu chat</div>
  }

  return (
    <ChatRoom
      roomId={roomId}
      currentUser={JSON.parse(currentUser)}
      targetUser={JSON.parse(targetUser)}
    />
  )
}

export default ChatPage
"use client"

import { useState } from "react"
import { Reply, PlusCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"

interface Discussion {
  id: string
  author: {
    name: string
    avatar: string
    role: "student" | "instructor"
  }
  content: string
  timestamp: string
  likes: number
  replies: number
  isPinned?: boolean
  isLiked?: boolean
}

export function QuestionList() {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "2",
      author: {
        name: "Trần Thị B",
        avatar: "/female-student-avatar.png",
        role: "student",
      },
      content:
        "Mình có thắc mắc về useState Hook. Khi nào thì nên sử dụng useState và khi nào nên sử dụng useReducer ạ?",
      timestamp: "1 giờ trước",
      likes: 12,
      replies: 3,
      isLiked: true,
    },
    {
      id: "3",
      author: {
        name: "Lê Văn C",
        avatar: "/male-student-avatar.png",
        role: "student",
      },
      content: "Bài học về JSX rất hay! Mình đã hiểu rõ hơn về cách React render elements. Cảm ơn thầy!",
      timestamp: "45 phút trước",
      likes: 8,
      replies: 1,
    },
  ])

  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const [isAskOpen, setIsAskOpen] = useState(false)


  const handleReply = (id: string) => {
    if (replyContent.trim() === "") return
    // Ở đây bạn có thể call API để lưu reply
    console.log("Reply to:", id, replyContent)
    setReplyContent("")
    setReplyingTo(null)
  }


  return (
    <div className="space-y-6">


      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {discussion.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{discussion.author.name}</span>
                  <span className="text-sm text-muted-foreground">{discussion.timestamp}</span>
                </div>

                <p className="text-sm leading-relaxed">{discussion.content}</p>

                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => setReplyingTo(discussion.id)}
                  >
                    <Reply className="w-4 h-4 mr-1" />
                    Trả lời ({discussion.replies})
                  </Button>
                </div>

                {/* Khung nhập trả lời */}
                {replyingTo === discussion.id && (
                  <div className="mt-2 space-y-2">
                    <Textarea
                      placeholder="Viết phản hồi của bạn..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" onClick={() => setReplyingTo(null)}>
                        Hủy
                      </Button>
                      <Button onClick={() => handleReply(discussion.id)}>Gửi</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal đặt câu hỏi */}

    </div>
  )
}

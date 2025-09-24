"use client"

import type React from "react"
import api, { endpoints } from "@/src/utils/api"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { MessageCircle, ThumbsUp, Reply, Send, Pin, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"


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

export function DiscussionForum() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string

  const [newMessage, setNewMessage] = useState("")
  const [discussions, setDiscussions] = useState<Discussion[]>([])

  const fetchComments = async () => {
    if (!courseId) return
    try {
      const res = await api.get(endpoints.publicCourseCommentsByCourse(String(courseId)))
      const data = res.data
      const mapped: Discussion[] = (data || []).map((c: any) => ({
        id: String(c.id),
        author: {
          name: c.author_name || "Ẩn danh",
          avatar: c.author_avatar || "/placeholder.svg",
          role: "student",
        },
        content: c.content,
        timestamp: new Date(c.created_at).toLocaleString(),
        likes: c.likes || 0,
        replies: 0,
      }))
      setDiscussions(mapped)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }
  useEffect(() => {
    fetchComments()
  }, [courseId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      await api.post(endpoints.publicCourseComments, {
        course: Number(courseId),
        content: newMessage,
        author_name: "Ẩn danh"
      })
      setNewMessage("")
      await fetchComments()
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  const toggleLike = (id: string) => {
    setDiscussions(
      discussions.map((discussion) =>
        discussion.id === id
          ? {
            ...discussion,
            isLiked: !discussion.isLiked,
            likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1,
          }
          : discussion,
      ),
    )
  }

  const handleLike = async (discussionId: string) => {
    try {
      await api.post(endpoints.publicCourseCommentLike(String(discussionId)))
      toggleLike(discussionId)
    } catch (error) {
      console.error('Error liking comment:', error)
      toggleLike(discussionId)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Thảo luận
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* New Message Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Chia sẻ câu hỏi hoặc ý kiến của bạn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[100px] border-2-black"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!newMessage.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Gửi
            </Button>
          </div>
        </form>

        {/* Discussion List */}
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
                    {discussion.author.role === "instructor" && (
                      <Badge variant="secondary" className="text-xs">
                        Giảng viên
                      </Badge>
                    )}
                    {discussion.isPinned && <Pin className="w-4 h-4 text-primary" />}
                    <span className="text-sm text-muted-foreground">{discussion.timestamp}</span>
                  </div>

                  <p className="text-sm leading-relaxed">{discussion.content}</p>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 px-2 ${discussion.isLiked ? "text-primary" : ""}`}
                      onClick={() => handleLike(discussion.id)}
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {discussion.likes}
                    </Button>

                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Reply className="w-4 h-4 mr-1" />
                      Trả lời ({discussion.replies})
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

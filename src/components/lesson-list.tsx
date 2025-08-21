"use client"

import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, Play, Lock, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

interface Lesson {
  id: string
  title: string
  duration: string
  isCompleted: boolean
  isFree: boolean
}

interface Chapter {
  id: string
  title: string
  lessons: Lesson[]
  totalDuration: string
}

export function LessonList() {
  const [expandedChapters, setExpandedChapters] = useState<string[]>(["1"])

  const chapters: Chapter[] = [
    {
      id: "1",
      title: "Giới thiệu và cài đặt",
      totalDuration: "2h 15m",
      lessons: [
        { id: "1-1", title: "Giới thiệu về React.js", duration: "15:32", isCompleted: true, isFree: true },
        { id: "1-2", title: "Cài đặt môi trường phát triển", duration: "22:45", isCompleted: true, isFree: true },
        { id: "1-3", title: "Tạo ứng dụng React đầu tiên", duration: "18:30", isCompleted: false, isFree: true },
        { id: "1-4", title: "Cấu trúc thư mục và file", duration: "12:15", isCompleted: false, isFree: false },
      ],
    },
    {
      id: "2",
      title: "JSX và Components",
      totalDuration: "3h 45m",
      lessons: [
        { id: "2-1", title: "Hiểu về JSX", duration: "25:20", isCompleted: false, isFree: false },
        { id: "2-2", title: "Tạo và sử dụng Components", duration: "32:15", isCompleted: false, isFree: false },
        { id: "2-3", title: "Props và PropTypes", duration: "28:45", isCompleted: false, isFree: false },
        { id: "2-4", title: "Conditional Rendering", duration: "20:30", isCompleted: false, isFree: false },
        { id: "2-5", title: "Lists và Keys", duration: "24:10", isCompleted: false, isFree: false },
      ],
    },
    {
      id: "3",
      title: "State và Lifecycle",
      totalDuration: "4h 20m",
      lessons: [
        { id: "3-1", title: "useState Hook", duration: "35:45", isCompleted: false, isFree: false },
        { id: "3-2", title: "useEffect Hook", duration: "42:30", isCompleted: false, isFree: false },
        { id: "3-3", title: "Event Handling", duration: "28:15", isCompleted: false, isFree: false },
        { id: "3-4", title: "Forms và Controlled Components", duration: "38:20", isCompleted: false, isFree: false },
      ],
    },
  ]

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId],
    )
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Nội dung khóa học</span>
          <Badge variant="secondary" className="text-xs">
            156 bài học
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="border-b last:border-b-0">
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto text-left"
                onClick={() => toggleChapter(chapter.id)}
              >
                <div className="flex items-center gap-3">
                  {expandedChapters.includes(chapter.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <div>
                    <div className="font-medium">{chapter.title}</div>
                  </div>
                </div>
              </Button>

              {expandedChapters.includes(chapter.id) && (
                <div className="pb-2">
                  {chapter.lessons.map((lesson) => (
                    <Button
                      key={lesson.id}
                      variant="ghost"
                      className="w-full justify-start p-4 pl-12 h-auto text-left hover:#de3e2d/50"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0">
                          •
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{lesson.title}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

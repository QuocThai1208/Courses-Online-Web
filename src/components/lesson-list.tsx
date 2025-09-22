"use client"

import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, Play, Lock, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

interface IProps {
  course: ICourseDetail,
  setUrl: (url: string) => void
}

export function LessonList({ course, setUrl }: IProps) {
  const [expandedChapters, setExpandedChapters] = useState<number[]>([1])

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId],
    )
  }
  function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="sticky top-4">

      <CardContent className="p-0">
        <div className="space-y-1">
          {course.chapters.map((chapter) => (
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
                    <div className="font-medium">{chapter.name}</div>
                  </div>
                </div>
              </Button>

              {expandedChapters.includes(chapter.id) && (
                <div className="pb-2">
                  {chapter.lessons.map((lesson) => (
                    <Button
                      key={lesson.id}
                      variant="ghost"
                      className="w-full justify-start p-4 pl-12 h-auto text-left hover:bg-red-500/50"
                      onClick={() => setUrl(lesson?.video_url)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0">
                          •
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{lesson.name}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <div>{formatDuration(lesson.duration)}</div>
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

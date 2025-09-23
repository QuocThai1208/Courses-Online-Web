'use client'

import { MessageCircle, BookOpen, Users, Clock, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { MyUserContext } from "@/src/context/userContext"
import { Button } from "./ui/button"

interface IProps {
  course: ICourseDetail
}

export function CourseInfo({ course }: IProps) {
  const router = useRouter()
  const currentUserContext = useContext(MyUserContext)

  const totalLessons = (course: ICourseDetail) => {
    return course.chapters.reduce(
      (count, chapter) => count + chapter.lessons.length,
      0
    )
  }

  const currentUser = currentUserContext ? {
    id: currentUserContext.id,
    firstName: currentUserContext.first_name,
    lastName: currentUserContext.last_name,
    type: currentUserContext.type || "student" as const
  } : null;

  const targetUser = {
    id: course.lecturer.id,
    firstName: course.lecturer.first_name,
    lastName: course.lecturer.last_name,
    type: "teacher" as const
  };

  const goToChat = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!currentUser) {
      alert("Vui lòng đăng nhập để nhắn tin với giảng viên!")
      router.push("/user/login/")
      return
    }

    if (currentUser.id === targetUser.id) {
      alert("Bạn không thể nhắn tin cho chính mình!")
      return
    }

    const roomId = [currentUser.id, targetUser.id]
      .sort((a, b) => a - b)
      .join("-")

    // stringify để truyền qua query
    const query = new URLSearchParams({
      roomId,
      currentUser: JSON.stringify(currentUser),
      targetUser: JSON.stringify(targetUser),
    }).toString()

    router.push(`/chat?${query}`)
  }

  return (
    <div className="space-y-6">
      {/* Course Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Tổng quan khóa học
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap justify-around gap-4">
            <div className="text-center p-4 bg-muted rounded-lg min-w-[120px] border-2">
              <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-semibold">
                {Math.floor(course.duration / 60)} phút
              </div>
              <div className="text-sm text-muted-foreground">Video</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg min-w-[120px] border-2">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-semibold">{totalLessons(course)} bài</div>
              <div className="text-sm text-muted-foreground">Bài học</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg min-w-[120px] border-2">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-semibold">{course.students_count}</div>
              <div className="text-sm text-muted-foreground">Học viên</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructor */}
      <Card>
        <CardContent>
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/instructor-avatar.png" />
              <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                {course.lecturer.first_name?.[0] || 'G'}{course.lecturer.last_name?.[0] || 'V'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                {course.lecturer.first_name} {course.lecturer.last_name}
              </h3>
              <p className="text-muted-foreground mb-2">{course.lecturer.userRole || 'Giảng viên'}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span>⭐ 4.9 (2,847 đánh giá)</span>
                <span>🎓 15 khóa học</span>
              </div>
              <p className="text-sm">
                {course.lecturer.introduce || 'Giảng viên chuyên về lập trình web'}
              </p>
              <div className="mt-3 p-2 bg-blue-50 rounded-md border border-blue-200">
                <Button onClick={goToChat} variant="outline" className="font-manrope bg-transparent w-full justify-start">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Nhắn tin
                    </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

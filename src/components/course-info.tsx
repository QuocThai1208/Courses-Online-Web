'use client'
import { BookOpen, Users, Clock, Award, Target, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"


interface IProps {
  course: ICourseDetail

}
export function CourseInfo({ course }: IProps) {

  const totalLessons = (course: ICourseDetail) => {
    return course.chapters.reduce((count, chapter) => count + chapter.lessons.length, 0)
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
              <div className="font-semibold">{course.duration} phút</div>
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

      {/* What You'll Learn */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Bạn sẽ học được gì
          </CardTitle>
        </CardHeader>
        <CardContent
          dangerouslySetInnerHTML={{ __html: course.learning_outcomes }}
        />
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Yêu cầu</CardTitle>
        </CardHeader>
        <CardContent
          dangerouslySetInnerHTML={{ __html: course.requirements }}
        />
      </Card>

      {/* Instructor */}
      <Card>
        <CardHeader>
          <CardTitle>Giảng viên</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/instructor-avatar.png" />
              <AvatarFallback>NV</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{course.lecturer.first_name} {course.lecturer.last_name}</h3>
              <p className="text-muted-foreground mb-2">{course.lecturer.userRole}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span>⭐ 4.9 (2,847 đánh giá)</span>
                <span>🎓 15 khóa học</span>
              </div>
              <p className="text-sm">
                {course.lecturer.introduce}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
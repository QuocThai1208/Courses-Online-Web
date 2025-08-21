// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Users, Clock, Award, Target, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function CourseInfo() {
  const skills = [
    "React Hooks (useState, useEffect, useContext)",
    "Component-based Architecture",
    "State Management với Redux",
    "React Router cho Single Page Applications",
    "API Integration và Async Operations",
    "Testing với Jest và React Testing Library",
  ]

  const requirements = [
    "Kiến thức cơ bản về HTML, CSS và JavaScript",
    "Hiểu biết về ES6+ features",
    "Có máy tính cài đặt Node.js và npm",
  ]

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
              <div className="font-semibold">42 giờ</div>
              <div className="text-sm text-muted-foreground">Video</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg min-w-[120px] border-2">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-semibold">156 bài</div>
              <div className="text-sm text-muted-foreground">Bài học</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg min-w-[120px] border-2">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-semibold">15,234</div>
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
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Yêu cầu</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{req}</span>
              </li>
            ))}
          </ul>
        </CardContent>
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
              <h3 className="font-semibold text-lg">Nguyễn Văn A</h3>
              <p className="text-muted-foreground mb-2">Senior Frontend Developer</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span>⭐ 4.9 (2,847 đánh giá)</span>
                <span>🎓 15 khóa học</span>
              </div>
              <p className="text-sm">
                Với hơn 8 năm kinh nghiệm trong phát triển web, tôi đã làm việc với nhiều công ty công nghệ hàng đầu và
                có chuyên môn sâu về React.js, Node.js và các công nghệ web hiện đại.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

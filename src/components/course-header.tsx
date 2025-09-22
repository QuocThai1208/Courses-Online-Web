// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, Award } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

interface IProps {
  course: ICourseDetail
}

export function CourseHeader({ course }: IProps) {
  return (
    <div className="bg-card rounded-xl border-1">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4">

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{course.name}</h1>

            <p className="text-lg text-muted-foreground max-w-2xl">
              {course.description}
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>15,234 học viên</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(course.duration / 60)} phút</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Đăng ký khóa học
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
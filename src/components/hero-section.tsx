
import { Play, Users, BookOpen, Award } from "lucide-react"
import { Button } from "./ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Nền tảng quản lý
              <span className="text-primary"> khóa học </span>
              hàng đầu
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Khám phá hàng nghìn khóa học chất lượng cao từ các chuyên gia hàng đầu. Học tập linh hoạt, tiến bộ nhanh
              chóng với công nghệ hiện đại.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                Bắt đầu học ngay
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Play className="mr-2 h-5 w-5" />
                Xem demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold text-primary">50K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Học viên</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold text-primary">1000+</span>
                </div>
                <p className="text-sm text-muted-foreground">Khóa học</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold text-primary">95%</span>
                </div>
                <p className="text-sm text-muted-foreground">Hài lòng</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img src="/online-learning-dashboard.png" alt="Nền tảng học trực tuyến" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

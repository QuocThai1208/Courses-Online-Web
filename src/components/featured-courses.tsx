import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Lập trình Web với React",
    description: "Học cách xây dựng ứng dụng web hiện đại với React và các công nghệ mới nhất",
    image: "/placeholder-3xkis.png",
    instructor: "Nguyễn Văn A",
    duration: "12 tuần",
    students: 1250,
    rating: 4.8,
    price: "1,500,000 VNĐ",
    level: "Trung cấp",
  },
  {
    id: 2,
    title: "Thiết kế UI/UX chuyên nghiệp",
    description: "Nắm vững nguyên lý thiết kế và tạo ra những giao diện người dùng tuyệt vời",
    image: "/placeholder-uq487.png",
    instructor: "Trần Thị B",
    duration: "10 tuần",
    students: 890,
    rating: 4.9,
    price: "1,200,000 VNĐ",
    level: "Cơ bản",
  },
  {
    id: 3,
    title: "Data Science với Python",
    description: "Khám phá thế giới dữ liệu và machine learning với Python",
    image: "/python-data-science-course.png",
    instructor: "Lê Văn C",
    duration: "16 tuần",
    students: 2100,
    rating: 4.7,
    price: "2,000,000 VNĐ",
    level: "Nâng cao",
  },
]

export function FeaturedCourses() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Khóa học nổi bật</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá những khóa học được yêu thích nhất từ các chuyên gia hàng đầu
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
                <Badge className="absolute top-4 left-4" variant="secondary">
                  {course.level}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{course.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Giảng viên: {course.instructor}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{course.price}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full">Đăng ký ngay</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Xem tất cả khóa học
          </Button>
        </div>
      </div>
    </section>
  )
}

"use client"
import { Clock, Users, Star, Badge } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import api, { endpoints } from "../utils/api"


export function FeaturedCourses() {
  const router = useRouter()
  const [coursesTop, setCoursesTop] = useState<any>()

  const loadCoursesTop = async () => {
    try {
      const res = await api.get(endpoints['courses_top'])
      setCoursesTop(res.data)

    } catch (e) {
      console.log("error loadCoursesTop", e)
    }
  }

  const formatPrice = (price: string): string => {
    return new Intl.NumberFormat('vi-VN').format(parseFloat(price));
  };

  useEffect(() => {
    loadCoursesTop();
  }, [])

  const goToCourses = () => {
    router.push('/courses/')
  }

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
          {coursesTop?.map((course: any) => (
            <Card key={course.id} className="overflow-hidden shadow-xl bg-white/80 hover:shadow-2xl transition-shadow">
              <div className="relative">
                <img src={course.image || "/placeholder.svg"} alt={course.name} className="w-full h-48 object-cover" />
                <Badge className="absolute top-4 left-4">
                  {course.level}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{course.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{course.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Giảng viên: {course.lecturer_name}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration} Giờ
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.total_student} Học viên
                  </div>

                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{formatPrice(course.price)}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full">Đăng ký ngay</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button onClick={goToCourses} variant="outline" size="lg">
            Xem tất cả khóa học
          </Button>
        </div>
      </div>
    </section>
  )
}

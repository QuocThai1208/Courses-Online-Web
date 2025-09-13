import { BookOpen, Calendar, Users, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"

interface EnrolledCourse {
    id: string
    title: string
    instructor: string
    enrolledDate: string
    status: "active" | "completed" | "paused"
    rating: number
    totalStudents: number
    category: string
    thumbnail: string
}

export function EnrolledCourses() {
    const enrolledCourses: EnrolledCourse[] = [
        {
            id: "1",
            title: "React Fundamentals",
            instructor: "Nguyễn Văn A",
            enrolledDate: "15/01/2024",
            status: "active",
            rating: 4.8,
            totalStudents: 1250,
            category: "Frontend",
            thumbnail: "/placeholder.svg?height=80&width=120",
        },
        {
            id: "2",
            title: "Node.js Backend Development",
            instructor: "Trần Thị B",
            enrolledDate: "20/12/2023",
            status: "active",
            rating: 4.6,
            totalStudents: 890,
            category: "Backend",
            thumbnail: "/placeholder.svg?height=80&width=120",
        },
        {
            id: "3",
            title: "UI/UX Design Principles",
            instructor: "Lê Văn C",
            enrolledDate: "10/11/2023",
            status: "completed",
            rating: 4.9,
            totalStudents: 2100,
            category: "Design",
            thumbnail: "/placeholder.svg?height=80&width=120",
        },
        {
            id: "4",
            title: "JavaScript ES6+ Advanced",
            instructor: "Phạm Thị D",
            enrolledDate: "05/10/2023",
            status: "completed",
            rating: 4.7,
            totalStudents: 1680,
            category: "Programming",
            thumbnail: "/placeholder.svg?height=80&width=120",
        },
        {
            id: "5",
            title: "TypeScript for Beginners",
            instructor: "Hoàng Văn E",
            enrolledDate: "25/02/2024",
            status: "paused",
            rating: 4.5,
            totalStudents: 750,
            category: "Programming",
            thumbnail: "/placeholder.svg?height=80&width=120",
        },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "completed":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "paused":
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "active":
                return "Đang học"
            case "completed":
                return "Hoàn thành"
            case "paused":
                return "Tạm dừng"
            default:
                return status
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Khóa học đã đăng ký
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {enrolledCourses.map((course) => (
                    <div
                        key={course.id}
                        className="flex gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                        <img
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title}
                            className="w-20 h-14 rounded-md object-cover flex-shrink-0"
                        />

                        <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold text-foreground text-sm">{course.title}</h3>
                                    <p className="text-xs text-muted-foreground">Giảng viên: {course.instructor}</p>
                                </div>
                                <Badge variant="outline" className={`${getStatusColor(course.status)} text-xs`}>
                                    {getStatusText(course.status)}
                                </Badge>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{course.enrolledDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{course.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    <span>{course.totalStudents.toLocaleString()}</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {course.category}
                                </Badge>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

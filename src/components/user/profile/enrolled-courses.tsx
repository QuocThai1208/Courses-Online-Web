import { BookOpen, Calendar, Users, Star, Accessibility, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { useEffect, useState } from "react"
import { authApis, endpoints } from "@/src/utils/api"



export function EnrolledCourses() {
    const [myCourse, setMyCourse] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const loadMyCourse = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token') ?? ''
            const res = await authApis(token).get(endpoints['enrollments'])
            setMyCourse(res.data)
        } catch (e) {
            console.log("error loadMyCourse: ", e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMyCourse()
    }, [])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING":
                return "bg-magenta-100 text-magenta-800 dark:bg-magenta-900 dark:text-magenta-300"
            case "IN_PROGRESS":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "COMPLETE":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "FAILED":
            case "PAYMENT_FAILED":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    return (
        <Card className="shadow-xl bg-white/80">
            {(!loading) ? <>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Khóa học đã đăng ký
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {myCourse.length === 0 ? (
                        <div>Bạn chưa đăng ký khóa học nào</div>
                    ) : myCourse.map((course: any) => (
                        <div
                            key={course.id}
                            className="flex gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                        >
                            <img
                                src={course.course_obj.image || "/placeholder.svg"}
                                alt={course.course_obj.name}
                                className="w-25 h-20 rounded-md object-cover flex-shrink-0"
                            />

                            <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-foreground text-sm">{course.course_obj.name}</h3>
                                        <p className="text-xs text-muted-foreground">Giảng viên: {course.course_obj.lecturer_name}</p>
                                    </div>
                                    <Badge variant="outline" className={`${getStatusColor(course.status)} text-xs`}>
                                        {course.status_display}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{course.created_at}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        <span>100</span>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        {course.course_obj.subject}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </> : <>
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            </>}
        </Card>
    )
}

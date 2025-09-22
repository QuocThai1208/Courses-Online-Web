"use client"

import { useState, useEffect } from "react"

// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
// import { Skeleton } from "./ui/skeleton"
import { BookOpen, Clock, Users } from "lucide-react"
import { authApis, endpoints } from "../../utils/api"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { CourseCard } from "./course-progress"

interface EnrolledCourse {
    id: number
    course: ICourseDetail
    status: string
    progress: {
        id: number
        course: number
        course_name: string
        course_image: string
        total_lessons: number
        completed_lessons: number
        total_watch_time: number
        completion_percentage: number
        last_accessed_at: string | null
        enrolled_at: string
    }
    created_at: string
}

export function EnrolledCourses() {
    const [courses, setCourses] = useState<EnrolledCourse[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    router.push('/auth/signin')
                    return
                }

                const response = await authApis(token).get(endpoints.enrolledCourses || 'enrolled-courses/')
                setCourses(response.data)
                console.log(response.data)
                console.log(response.data.results)
            } catch (error) {
                console.error('Error fetching enrolled courses:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchEnrolledCourses()
    }, [router])

    const handleContinueCourse = (courseId: number) => {
        router.push(`/course/${courseId}/learn`)
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">Khóa học của tôi</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/4" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-3 w-full" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Skeleton className="h-8 w-full" />
                                    <Skeleton className="h-8 w-full" />
                                </div>
                                <Skeleton className="h-10 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (courses.length === 0) {
        return (
            <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có khóa học nào</h3>
                <p className="text-gray-500 mb-6">Bạn chưa đăng ký khóa học nào. Hãy khám phá các khóa học mới!</p>
                <button
                    onClick={() => router.push('/courses')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Khám phá khóa học
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Khóa học của tôi</h2>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                    {courses.length} khóa học
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((enrolledCourse) => (
                    <CourseCard
                        key={enrolledCourse.id}
                        course={enrolledCourse.course}
                    // onContinue={() => handleContinueCourse(enrolledCourse.course.id)}
                    />
                ))}
            </div>
        </div>
    )
}

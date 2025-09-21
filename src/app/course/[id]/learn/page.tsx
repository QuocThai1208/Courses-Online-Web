"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
// import { VideoPlayer } from "../../../components/video-player"
// import { LessonProgressItem } from "../../../components/progress/lesson-progress"
// import { CourseProgressCard } from "../../../components/progress/course-progress"
// import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
// import { Button } from "../../../components/ui/button"
// import { Badge } from "../../../components/ui/badge"
// import { Progress } from "../../../components/ui/progress"
import { BookOpen, Clock, Users, ArrowLeft } from "lucide-react"
import { authApis } from "@/src/utils/api"
import { Button } from "@/src/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Progress } from "@/src/components/ui/progress"
import { VideoPlayer } from "@/src/components/video-player"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { LessonProgressItem } from "@/src/components/progress/lesson-progress"
// import { authApis, endpoints } from "../../../utils/api"
// import { toast } from "../../../hooks/use-toast"

interface LessonProgressData {
    id: number
    lesson: number
    lesson_name: string
    lesson_duration: number
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'PAUSED'
    status_display: string
    started_at: string | null
    completed_at: string | null
    watch_time: number
    last_watched_at: string | null
    completion_percentage: number
}

interface CourseProgressData {
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

interface CourseLearnData {
    course_progress: CourseProgressData
    lesson_progresses: LessonProgressData[]
}

export default function CourseLearnPage() {
    const params = useParams()
    const router = useRouter()
    const courseId = params.id as string

    const [courseData, setCourseData] = useState<ICourseDetail | null>(null)
    const [progressData, setProgressData] = useState<CourseLearnData | null>(null)
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
    const [currentLessonId, setCurrentLessonId] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [isEnrolled, setIsEnrolled] = useState(false)

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    router.push('/auth/signin')
                    return
                }

                // Fetch course detail
                const courseResponse = await authApis(token).get(`/courses/${courseId}/detail/`)
                setCourseData(courseResponse.data)

                // Check if user is enrolled and fetch progress
                try {
                    const progressResponse = await authApis(token).get(`/lesson-progress/course/${courseId}/`)
                    setProgressData(progressResponse.data)
                    setIsEnrolled(true)
                } catch (error) {
                    // User not enrolled
                    setIsEnrolled(false)
                }
            } catch (error) {
                console.error('Error fetching course data:', error)
                toast({
                    title: "Lỗi",
                    description: "Không thể tải dữ liệu khóa học",
                    variant: "destructive"
                })
            } finally {
                setLoading(false)
            }
        }

        if (courseId) {
            fetchCourseData()
        }
    }, [courseId, router])

    const handleLessonClick = (lessonId: number, videoUrl: string) => {
        setCurrentLessonId(lessonId)
        setCurrentVideoUrl(videoUrl)

        // Update progress to IN_PROGRESS
        updateLessonProgress(lessonId, 0, 0, 'IN_PROGRESS')
    }

    const updateLessonProgress = async (lessonId: number, watchTime: number, completionPercentage: number, status: string) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            await authApis(token).post('/lesson-progress/update-progress/', {
                lesson_id: lessonId,
                watch_time: watchTime,
                completion_percentage: completionPercentage
            })

            // Refresh progress data
            const progressResponse = await authApis(token).get(`/lesson-progress/course/${courseId}/`)
            setProgressData(progressResponse.data)
        } catch (error) {
            console.error('Error updating lesson progress:', error)
        }
    }

    const handleVideoTimeUpdate = (currentTime: number, duration: number) => {
        if (!currentLessonId) return

        const completionPercentage = (currentTime / duration) * 100
        updateLessonProgress(currentLessonId, Math.floor(currentTime), completionPercentage, 'IN_PROGRESS')
    }

    const handleVideoComplete = () => {
        if (!currentLessonId) return
        updateLessonProgress(currentLessonId, 0, 100, 'COMPLETED')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg">Đang tải khóa học...</p>
                </div>
            </div>
        )
    }

    if (!courseData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Khóa học không tồn tại</h2>
                    <Button onClick={() => router.push('/courses')}>
                        Quay lại danh sách khóa học
                    </Button>
                </div>
            </div>
        )
    }

    if (!isEnrolled) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto">
                    <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Bạn chưa đăng ký khóa học này</h2>
                    <p className="text-gray-600 mb-6">
                        Vui lòng đăng ký khóa học để có thể truy cập nội dung học tập.
                    </p>
                    <div className="space-x-4">
                        <Button onClick={() => router.push(`/course/${courseId}`)}>
                            Xem chi tiết khóa học
                        </Button>
                        <Button variant="outline" onClick={() => router.push('/courses')}>
                            Quay lại danh sách
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.back()}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Quay lại
                            </Button>
                            <div>
                                <h1 className="text-xl font-bold">{courseData.name}</h1>
                                <p className="text-sm text-gray-600">Đang học</p>
                            </div>
                        </div>

                        {progressData && (
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-sm font-medium">
                                        {progressData.course_progress.completed_lessons}/{progressData.course_progress.total_lessons} bài học
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {progressData.course_progress.completion_percentage.toFixed(1)}% hoàn thành
                                    </div>
                                </div>
                                <Progress
                                    value={progressData.course_progress.completion_percentage}
                                    className="w-24 h-2"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Video Player */}
                    <div className="lg:col-span-2 space-y-6">
                        {currentVideoUrl ? (
                            <VideoPlayer
                                url={currentVideoUrl}
                                onTimeUpdate={handleVideoTimeUpdate}
                                onComplete={handleVideoComplete}
                            />
                        ) : (
                            <Card className="aspect-video flex items-center justify-center">
                                <div className="text-center">
                                    <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium mb-2">Chọn bài học để bắt đầu</h3>
                                    <p className="text-gray-600">Nhấn vào bài học bên phải để xem video</p>
                                </div>
                            </Card>
                        )}

                        {/* Course Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    Thông tin khóa học
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            {courseData.chapters.reduce((count, chapter) => count + chapter.lessons.length, 0)}
                                        </div>
                                        <div className="text-sm text-gray-600">Bài học</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">
                                            {Math.floor(courseData.duration / 3600)}h {Math.floor((courseData.duration % 3600) / 60)}m
                                        </div>
                                        <div className="text-sm text-gray-600">Thời lượng</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600">
                                            {courseData.students_count}
                                        </div>
                                        <div className="text-sm text-gray-600">Học viên</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Lesson List */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Nội dung khóa học</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {courseData.chapters.map((chapter) => (
                                    <div key={chapter.id} className="space-y-2">
                                        <h4 className="font-medium text-sm text-gray-700 bg-gray-100 p-2 rounded">
                                            {chapter.name}
                                        </h4>
                                        <div className="space-y-1 pl-4">
                                            {chapter.lessons.map((lesson) => {
                                                const lessonProgress = progressData?.lesson_progresses.find(
                                                    lp => lp.lesson === lesson.id
                                                )

                                                return (
                                                    <LessonProgressItem
                                                        key={lesson.id}
                                                        lesson={lessonProgress || {
                                                            id: 0,
                                                            lesson: lesson.id,
                                                            lesson_name: lesson.name,
                                                            lesson_duration: lesson.duration,
                                                            status: 'NOT_STARTED',
                                                            status_display: 'Chưa bắt đầu',
                                                            started_at: null,
                                                            completed_at: null,
                                                            watch_time: 0,
                                                            last_watched_at: null,
                                                            completion_percentage: 0
                                                        }}
                                                        onPlay={(lessonId) => handleLessonClick(lessonId, lesson.video_url)}
                                                        isActive={currentLessonId === lesson.id}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
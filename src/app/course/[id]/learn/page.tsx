"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
    BookOpen,
    Clock,
    Users,
    ArrowLeft,
    Play,
    CheckCircle,
    Circle,
    Pause,
    Star,
    Award,
    Target,
    TrendingUp,
    MessageSquare,
    Share2,
    Bookmark
} from "lucide-react"
import { authApis } from "@/src/utils/api"
import { Button } from "@/src/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Progress } from "@/src/components/ui/progress"
import { VideoPlayer } from "@/src/components/video-player"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { LessonProgressItem } from "@/src/components/progress/lesson-progress"

import { Badge } from "@/src/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Separator } from "@/src/components/ui/separator"
import { CourseProgressIndicator } from "@/src/components/progress/course-progress-indicator"
import { SuccessToast } from "@/src/components/ui/success-toast"

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

    const [showSuccessToast, setShowSuccessToast] = useState(false)
    const [completedLessonName, setCompletedLessonName] = useState("")

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


            console.log('Updating lesson progress:', {
                lesson_id: lessonId,
                watch_time: watchTime,
                completion_percentage: completionPercentage
            })

            const response = await authApis(token).post('/lesson-progress/update-progress/', {
                lesson_id: lessonId,
                watch_time: watchTime,
                completion_percentage: completionPercentage
            })

            console.log('Progress update response:', response.data)

            // Refresh progress data
            const progressResponse = await authApis(token).get(`/lesson-progress/course/${courseId}/`)
            setProgressData(progressResponse.data)

            toast({
                title: "Thành công",
                description: `Đã cập nhật tiến độ học tập: ${completionPercentage.toFixed(1)}%`,
                variant: "default"
            })
        } catch (error: any) {
            console.error('Error updating lesson progress:', error)
            toast({
                title: "Lỗi",
                description: error.response?.data?.error || "Không thể cập nhật tiến độ học tập",
                variant: "destructive"
            })
        }
    }

    const handleVideoTimeUpdate = (currentTime: number, duration: number) => {
        if (!currentLessonId) return

        const completionPercentage = (currentTime / duration) * 100
        updateLessonProgress(currentLessonId, Math.floor(currentTime), completionPercentage, 'IN_PROGRESS')
    }

    const handleVideoComplete = () => {
        if (!currentLessonId) return
        // Find lesson name for success toast
        const currentLesson = courseData?.chapters
            .flatMap(chapter => chapter.lessons)
            .find(lesson => lesson.id === currentLessonId)

        if (currentLesson) {
            setCompletedLessonName(currentLesson.name)
            setShowSuccessToast(true)
        }

        updateLessonProgress(currentLessonId, 0, 100, 'COMPLETED')
    }

    const handleManualProgress = (percentage: number) => {
        if (!currentLessonId) return

        // Find lesson name for success toast if completed
        if (percentage >= 100) {
            const currentLesson = courseData?.chapters
                .flatMap(chapter => chapter.lessons)
                .find(lesson => lesson.id === currentLessonId)

            if (currentLesson) {
                setCompletedLessonName(currentLesson.name)
                setShowSuccessToast(true)
            }
        }

        updateLessonProgress(currentLessonId, 0, percentage, percentage >= 90 ? 'COMPLETED' : 'IN_PROGRESS')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto animate-ping opacity-20"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Đang tải khóa học...</h3>
                    <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
                </div>
            </div>
        )
    }

    if (!courseData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Khóa học không tồn tại</h2>
                    <p className="text-gray-600 mb-8">Khóa học bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại.</p>
                    <div className="space-y-3">
                        <Button
                            onClick={() => router.push('/courses')}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                            Quay lại danh sách khóa học
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/')}
                            className="w-full"
                        >
                            Về trang chủ
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    if (!isEnrolled) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center max-w-lg mx-auto p-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Bạn chưa đăng ký khóa học này</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Vui lòng đăng ký khóa học để có thể truy cập nội dung học tập và theo dõi tiến độ của bạn.
                    </p>
                    <div className="space-y-3">
                        <Button
                            onClick={() => router.push(`/course/${courseId}`)}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                            Xem chi tiết khóa học
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/courses')}
                            className="w-full"
                        >
                            Khám phá khóa học khác
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Enhanced Header */}
            <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-6">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.back()}
                                className="hover:bg-blue-50 hover:text-blue-600 transition-colors"

                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Quay lại
                            </Button>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">{courseData.name}</h1>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                                            <Play className="w-3 h-3 mr-1" />
                                            Đang học
                                        </Badge>
                                        <span className="text-sm text-gray-500">với {courseData.lecturer.username}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {progressData && (
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-gray-900">
                                        {progressData.course_progress.completed_lessons}/{progressData.course_progress.total_lessons} bài học
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" />
                                        {progressData.course_progress.completion_percentage.toFixed(1)}% hoàn thành
                                    </div>
                                </div>
                                <div className="w-32">
                                    <Progress
                                        value={progressData.course_progress.completion_percentage}
                                        className="h-3 bg-gray-200"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.push(`/course/${courseId}/forum`)}
                                        className="hover:bg-blue-50"
                                    >
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        Thảo luận
                                    </Button>
                                </div>
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
                            <div className="relative">
                                <VideoPlayer
                                    url={currentVideoUrl}
                                    onTimeUpdate={handleVideoTimeUpdate}
                                    onComplete={handleVideoComplete}
                                    onManualProgress={handleManualProgress}
                                />
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-black/70 text-white hover:bg-black/80">
                                        <Play className="w-3 h-3 mr-1" />
                                        Đang phát
                                    </Badge>
                                </div>
                            </div>
                        ) : (
                            <Card className="aspect-video flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-200 hover:border-blue-300 transition-colors duration-300">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse hover:scale-110 transition-transform duration-300">
                                        <Play className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Chọn bài học để bắt đầu</h3>
                                    <p className="text-gray-600 max-w-sm">Nhấn vào bài học bên phải để xem video và bắt đầu hành trình học tập của bạn</p>
                                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </Card>
                        )}
                        {/* Enhanced Course Info */}
                        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-3 text-xl">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Award className="w-4 h-4 text-white" />
                                    </div>
                                    Thông tin khóa học
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <BookOpen className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            {courseData.chapters.reduce((count, chapter) => count + chapter.lessons.length, 0)}
                                        </div>
                                        <div className="text-sm text-blue-700 font-medium">Bài học</div>
                                    </div>
                                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-green-600">
                                            {Math.floor(courseData.duration / 3600)}h {Math.floor((courseData.duration % 3600) / 60)}m
                                        </div>
                                        <div className="text-sm text-green-700 font-medium">Thời lượng</div>
                                    </div>
                                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-purple-600">
                                            {courseData.students_count}
                                        </div>
                                        <div className="text-sm text-purple-700 font-medium">Học viên</div>
                                    </div>
                                </div>

                                <Separator className="my-6" />

                                {/* Instructor Info */}
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={courseData.lecturer.avatar || ""} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                            {courseData.lecturer.username.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">Giảng viên</h4>
                                        <p className="text-gray-600">{courseData.lecturer.username}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="text-sm font-medium">4.8</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Enhanced Lesson List */}
                    <div className="space-y-6">
                        {/* Progress Indicator */}
                        {progressData && (
                            <CourseProgressIndicator
                                completedLessons={progressData.course_progress.completed_lessons}
                                totalLessons={progressData.course_progress.total_lessons}
                                completionPercentage={progressData.course_progress.completion_percentage}
                                totalWatchTime={progressData.course_progress.total_watch_time}
                            />
                        )}

                        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-3 text-xl">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                                        <Target className="w-4 h-4 text-white" />
                                    </div>
                                    Nội dung khóa học
                                </CardTitle>
                                {progressData && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span>{progressData.course_progress.completed_lessons} bài đã hoàn thành</span>
                                        <span className="text-gray-400">•</span>
                                        <span>{progressData.course_progress.total_lessons - progressData.course_progress.completed_lessons} bài còn lại</span>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {courseData.chapters.map((chapter, chapterIndex) => (
                                    <div key={chapter.id} className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                {chapterIndex + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800">{chapter.name}</h4>
                                                <p className="text-sm text-gray-600">{chapter.lessons.length} bài học</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 pl-4">
                                            {chapter.lessons.map((lesson, lessonIndex) => {
                                                const lessonProgress = progressData?.lesson_progresses.find(
                                                    lp => lp.lesson === lesson.id
                                                )
                                                return (
                                                    <div
                                                        key={lesson.id}
                                                        className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] group ${currentLessonId === lesson.id
                                                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 shadow-md scale-[1.02]'
                                                            : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                                                            }`}
                                                        onClick={() => handleLessonClick(lesson.id, lesson.video_url)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lessonProgress?.status === 'COMPLETED'
                                                                ? 'bg-green-500 text-white'
                                                                : lessonProgress?.status === 'IN_PROGRESS'
                                                                    ? 'bg-blue-500 text-white'
                                                                    : 'bg-gray-200 text-gray-600'
                                                                }`}>
                                                                {lessonProgress?.status === 'COMPLETED' ? (
                                                                    <CheckCircle className="w-4 h-4" />
                                                                ) : lessonProgress?.status === 'IN_PROGRESS' ? (
                                                                    <Play className="w-4 h-4" />
                                                                ) : (
                                                                    <Circle className="w-4 h-4" />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h5 className="font-medium text-gray-900 truncate">
                                                                    {lesson.name}
                                                                </h5>
                                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                                    <Clock className="w-3 h-3" />
                                                                    <span>{Math.floor(lesson.duration / 60)} phút</span>
                                                                    {lessonProgress && (
                                                                        <>
                                                                            <span className="text-gray-400">•</span>
                                                                            <span className={`font-medium ${lessonProgress.status === 'COMPLETED' ? 'text-green-600' :
                                                                                lessonProgress.status === 'IN_PROGRESS' ? 'text-blue-600' :
                                                                                    'text-gray-500'
                                                                                }`}>
                                                                                {lessonProgress.status_display}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {lessonProgress && lessonProgress.completion_percentage > 0 && (
                                                                <div className="w-12">
                                                                    <Progress
                                                                        value={lessonProgress.completion_percentage}
                                                                        className="h-2"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
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
            <SuccessToast
                isVisible={showSuccessToast}
                onClose={() => setShowSuccessToast(false)}
                lessonName={completedLessonName}
                completionPercentage={100}
            />
        </div>
    )
}
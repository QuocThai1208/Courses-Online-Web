"use client"

import { Progress } from "../ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { BookOpen, Clock, CheckCircle, Users } from "lucide-react"
import { Button } from "../ui/button"

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

interface CourseProgressProps {
    progress: CourseProgressData
    onContinue?: () => void
}

export function CourseProgressCard({ progress, onContinue }: CourseProgressProps) {


    console.log(">>> check progress", progress)
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)

        if (hours > 0) {
            return `${hours}h ${minutes}m`
        }
        return `${minutes}m`
    }

    const getProgressColor = (percentage: number) => {
        if (percentage >= 80) return "bg-green-500"
        if (percentage >= 50) return "bg-yellow-500"
        return "bg-blue-500"
    }

    const getProgressText = (percentage: number) => {
        if (percentage >= 100) return "Hoàn thành"
        if (percentage >= 80) return "Gần hoàn thành"
        if (percentage >= 50) return "Đang tiến bộ"
        if (percentage > 0) return "Bắt đầu"
        return "Chưa bắt đầu"
    }

    return (
        <Card className="w-full">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{progress?.course_name}</CardTitle>
                    <Badge
                        variant="secondary"
                        className={`${getProgressColor(progress?.completion_percentage)} text-white`}
                    >
                        {getProgressText(progress?.completion_percentage)}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Tiến độ khóa học</span>
                        <span className="font-medium">{progress?.completion_percentage.toFixed(1)}%</span>
                    </div>
                    <Progress
                        value={progress?.completion_percentage}
                        className="h-3"
                    />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <div>
                            <div className="text-sm font-medium">{progress?.completed_lessons}/{progress?.total_lessons}</div>
                            <div className="text-xs text-gray-500">Bài học</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <div>
                            <div className="text-sm font-medium">{formatTime(progress?.total_watch_time)}</div>
                            <div className="text-xs text-gray-500">Thời gian học</div>
                        </div>
                    </div>
                </div>

                {/* Continue Button */}
                {progress?.completion_percentage < 100 && onContinue && (
                    <Button
                        onClick={onContinue}
                        className="w-full"
                        variant="default"
                    >
                        {progress?.completion_percentage > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
                    </Button>
                )}

                {/* Last Accessed */}
                {progress?.last_accessed_at && (
                    <div className="text-xs text-gray-500 text-center">
                        Lần cuối truy cập: {new Date(progress?.last_accessed_at).toLocaleDateString('vi-VN')}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

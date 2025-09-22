"use client"

import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import { BookOpen, Clock } from "lucide-react"

interface CourseCardProps {
    course: ICourseDetail
}

export function CourseCard({ course }: CourseCardProps) {
    const totalLessons = (course: ICourseDetail) => {
        return course.chapters.reduce((count, chapter) =>
            count + chapter.lessons.filter(lesson => lesson.is_published).length, 0
        )
    }
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)

        if (hours > 0) {
            return `${hours}h ${minutes}m`
        }
        return `${minutes}m`
    }
    const totalLessonsCount = totalLessons(course)

    return (
        <Link href={`/course/${course.id}/learn`}>
            <Card className="w-full">
                <CardContent className="p-4 space-y-3">

                    <div className="w-full h-48 rounded-lg overflow-hidden">
                        <img
                            src={course?.thumbnail_url || ''}
                            alt={course.name}
                            className="w-full h-full object-cover"
                        />
                    </div>


                    <h3 className="text-lg font-semibold line-clamp-2">
                        {course.name}
                    </h3>


                    <p className="text-sm text-gray-600 line-clamp-3">
                        {course.description}
                    </p>


                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <BookOpen className="w-4 h-4" />
                            <span>{totalLessonsCount} bài học</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(course.duration)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}


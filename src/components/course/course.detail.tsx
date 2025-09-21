'use client'

import api from "@/src/utils/api"
import { CourseHeader } from "../course-header"
import { CourseInfo } from "../course-info"
import { DiscussionForum } from "../discussion-forum"
import { LessonList } from "../lesson-list"
import { VideoPlayer } from "../video-player"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const CourseDetailPublic = () => {
    const params = useParams()
    const id = params.id as string

    const [course, setCourse] = useState<ICourseDetail | null>(null)
    const [loading, setLoading] = useState(true)

    const [url, setUrl] = useState<string | null>(null)

    useEffect(() => {
        async function fetchCourse() {
            try {
                const res = await api.get(`/courses/${id}/detail/`)
                setCourse(res.data)
                setUrl(res.data.video_url)
            } catch (error) {
                console.error("Error fetching course:", error)
            } finally {
                setLoading(false)
            }
        }
        if (id) {
            fetchCourse()
        }
    }, [id])


    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg">Đang tải khóa học...</p>
        </div>
    }

    if (!course) {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg">Khóa học không tồn tại hoặc đã bị xóa.</p>
        </div>
    }

    return (
        <>
            <CourseHeader course={course} />
            <main className="container mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">

                        {url && <VideoPlayer url={url} />}
                        <CourseInfo course={course} />
                        <DiscussionForum />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <LessonList course={course} setUrl={setUrl} />
                    </div>
                </div>
            </main>
        </>
    )
}

export default CourseDetailPublic

import { Metadata } from "next"
import { notFound } from "next/navigation"
// import { CourseProgress } from "@/components/course-progress"
// import { CourseLessons } from "@/components/course-lessons"
import { ICourseDetail } from "@/src/types/course"
import { CourseLessons } from "@/src/components/course-lessons"
import { CourseProgress } from "@/src/components/course-progress"

async function getCourseDetail(id: string): Promise<ICourseDetail> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}/`)
    if (!res.ok) {
        throw new Error("Failed to fetch course")
    }
    return res.json()
}

async function getCourseProgress(courseId: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/progress/`,
        {
            credentials: "include",
        }
    )
    if (!res.ok) {
        return {
            progress: 0,
            completedLessons: [],
        }
    }
    return res.json()
}

interface CourseLearnPageProps {
    params: {
        id: string
    }
}

export async function generateMetadata({
    params,
}: CourseLearnPageProps): Promise<Metadata> {
    const course = await getCourseDetail(params.id)

    return {
        title: `Học ${course.name}`,
        description: course.description,
    }
}

export default async function CourseLearnPage({ params }: CourseLearnPageProps) {
    let course: ICourseDetail
    try {
        course = await getCourseDetail(params.id)
    } catch (error) {
        notFound()
    }

    const { progress, completedLessons } = await getCourseProgress(params.id)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <CourseProgress course={course} progress={progress} />
                </div>
                <div className="lg:col-span-3">
                    <CourseLessons
                        courseId={course.id}
                        chapters={course.chapters}
                        completedLessons={completedLessons}
                    />
                </div>
            </div>
        </div>
    )
}

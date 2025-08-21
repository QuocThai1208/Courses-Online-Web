import { CourseHeader } from "@/src/components/course-header";
import { CourseInfo } from "@/src/components/course-info";
import { DiscussionForum } from "@/src/components/discussion-forum";
import { LessonList } from "@/src/components/lesson-list";
import { VideoPlayer } from "@/src/components/video-player";


export default function CoursePage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen bg-background ">
            <CourseHeader />

            <main className="container mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <VideoPlayer />
                        <CourseInfo />
                        <DiscussionForum />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <LessonList />
                    </div>
                </div>
            </main>
        </div>
    )
}

"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ForumLayout } from "@/src/components/forum/forum-layout"
import { authApis, endpoints } from "@/src/utils/api"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/src/components/ui/button"
import { ArrowLeft, MessageSquare } from "lucide-react"

export default function CourseForumPage() {
    const params = useParams()
    const router = useRouter()
    const courseId = params.id as string


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
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-6 h-6 text-blue-600" />
                                <h1 className="text-xl font-bold">Diễn đàn thảo luận</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Forum Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ForumLayout
                    courseId={courseId}
                />
            </div>
        </div>
    )
}

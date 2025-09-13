"use client"

import { useState } from "react"
import { BookOpen, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"

export function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("courses")

    const tabs = [
        { id: "courses", label: "Khóa học", count: 8 },
        { id: "about", label: "Giới thiệu", count: null },
    ]

    const courses = [
        {
            id: 1,
            title: "React Fundamentals - Từ cơ bản đến nâng cao",
            description: "Khóa học toàn diện về React, bao gồm hooks, state management và best practices...",
            instructor: "Nguyễn Văn A",
            duration: "12 giờ",
            students: 1250,
            rating: 4.8,
            progress: 85,
            status: "Đang học",
            tags: ["React", "JavaScript", "Frontend"],
        },
        {
            id: 2,
            title: "TypeScript cho Developer",
            description: "Học TypeScript từ cơ bản, type system, generics và integration với React...",
            instructor: "Trần Thị B",
            duration: "8 giờ",
            students: 890,
            rating: 4.9,
            progress: 60,
            status: "Đang học",
            tags: ["TypeScript", "JavaScript", "Programming"],
        },
        {
            id: 3,
            title: "Next.js Full-Stack Development",
            description: "Xây dựng ứng dụng full-stack với Next.js, API routes, và deployment...",
            instructor: "Lê Văn C",
            duration: "16 giờ",
            students: 2100,
            rating: 4.7,
            progress: 100,
            status: "Hoàn thành",
            tags: ["Next.js", "Full-Stack", "React"],
        },
    ]

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-border">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 font-manrope text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {tab.label}
                        {tab.count && <span className="ml-2 px-2 py-1 text-xs bg-muted rounded-full">{tab.count}</span>}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
                {activeTab === "courses" && (
                    <div className="space-y-4">
                        {courses.map((course) => (
                            <Card key={course.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="font-sans text-xl mb-2">{course.title}</CardTitle>
                                            <p className="text-muted-foreground font-manrope mb-2">{course.description}</p>
                                            <p className="text-sm text-muted-foreground font-manrope">Giảng viên: {course.instructor}</p>
                                        </div>
                                        <Badge variant={course.status === "Hoàn thành" ? "default" : "secondary"} className="font-manrope">
                                            {course.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {/* Progress bar for ongoing courses */}
                                    {course.status === "Đang học" && (
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-manrope">Tiến độ</span>
                                                <span className="font-manrope">{course.progress}%</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full transition-all"
                                                    style={{ width: `${course.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {course.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="font-manrope">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span className="font-manrope">{course.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span className="font-manrope">{course.students}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="font-manrope">⭐ {course.rating}</span>
                                            </div>
                                        </div>

                                        <Button variant="ghost" size="sm">
                                            <BookOpen className="w-4 h-4 mr-2" />
                                            {course.status === "Hoàn thành" ? "Xem lại" : "Tiếp tục học"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === "about" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-sans">Giới thiệu</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold font-sans mb-2">Kinh nghiệm</h3>
                                <p className="text-muted-foreground font-manrope">
                                    5+ năm kinh nghiệm phát triển web, từng làm việc tại các công ty công nghệ hàng đầu. Chuyên về
                                    frontend development với React ecosystem.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold font-sans mb-2">Học vấn</h3>
                                <p className="text-muted-foreground font-manrope">
                                    Cử nhân Công nghệ Thông tin - Đại học Bách Khoa Hà Nội
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold font-sans mb-2">Sở thích</h3>
                                <p className="text-muted-foreground font-manrope">
                                    Đọc sách công nghệ, chơi game, du lịch và khám phá những công nghệ mới.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

"use client"

import { useState } from "react"
import { Banknote, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { authApis, endpoints } from "@/src/utils/api"
import InfiniteScroll from "react-infinite-scroll-component";

export function ProfileTabs() {
    const [myCourse, setMyCourse] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)


    const loadMyCourse = async () => {
        if (!hasMore) return
        try {
            setLoading(true)
            const token = localStorage.getItem('token') ?? ''
            let url = `${endpoints['myCourses']}?page=${page}`
            const res = await authApis(token).get(url)
            setMyCourse(prev => [...prev, ...res.data.results])
            if (res.data.next === null) {
                setHasMore(false)
                setPage(0)
            } else {
                setPage(prev => prev + 1)
            }
        } catch (e) {
            console.log("error loadMyCourse: ", e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 ">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-border">
                <button
                    className={`px-4 py-2 font-manrope text-sm font-medium border-b-2 transition-colors  "border-primary text-primary"`
                    }
                >
                    Khóa học sở hữu
                    <span className="ml-2 px-2 py-1 text-xs bg-muted rounded-full">{myCourse.length}</span>
                </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
                <InfiniteScroll
                    dataLength={myCourse.length}
                    next={loadMyCourse}
                    hasMore={hasMore}
                    loader={<p className="text-center p-4">Loading...</p>}
                    endMessage={<p className="text-center p-4">Đã hết khóa học</p>}
                >
                    {myCourse.length === 0 ? <>
                        <div>Bạn chưa sở hữu khóa học nào.</div>
                    </> :
                        myCourse.map((course) => (
                            <Card key={`mycourse${course.id}`} className="hover:shadow-2xl transition-shadow shadow-xl bg-white/80">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <img
                                            src={course.image || "/placeholder.svg"}
                                            alt={course.name}
                                            className="w-30 h-30 rounded-md object-cover flex-shrink-0 mr-4"
                                        />
                                        <div className="flex-1">
                                            <CardTitle className="font-sans text-xl mb-2">{course.name}</CardTitle>
                                            <p className="text-muted-foreground font-manrope mb-2">{course.description}</p>
                                            <p className="text-sm text-muted-foreground font-manrope">Giảng viên: {course.lecturer_name}</p>
                                            <Badge variant="outline" className="font-manrope mt-4">
                                                {course.category_name}
                                            </Badge>
                                        </div>
                                        <Badge variant={"secondary"} className="font-manrope">
                                            {course.subject}
                                        </Badge>

                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1 font-medium">
                                                <Clock className="w-5 h-5" />
                                                <span className="font-manrope">{course.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1 font-medium">
                                                <Users className="w-5 h-5" />
                                                <span className="font-manrope">{course.total_student}</span>
                                            </div>
                                            <div className="flex items-center gap-1 font-medium">
                                                <Banknote className="w-5 h-5 text-green-600" />
                                                <span className="font-manrope">{course.price} vnđ</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}

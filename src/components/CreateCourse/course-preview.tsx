"use client"

import { Eye, Play, FileText, HelpCircle, Globe, Shield, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"

interface CoursePreviewProps {
    data: any
    onUpdate: (data: any) => void
}

export function CoursePreview({ data, onUpdate }: CoursePreviewProps) {
    const totalLessons = data.sections?.reduce((total: number, section: any) => total + section.items.length, 0) || 0
    const estimatedDuration = "2 giờ 30 phút" // This would be calculated from actual content

    return (
        <div className="space-y-6">
            {/* Preview Header */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Xem trước khóa học
                    </CardTitle>
                    <CardDescription>Đây là cách khóa học của bạn sẽ hiển thị với học viên</CardDescription>
                </CardHeader>
            </Card>

            {/* Course Preview Card */}
            <Card className="overflow-hidden">
                {/* Course Header */}
                <div className="relative h-48 bg-gradient-to-r from-primary to-accent">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-6 text-white">
                        <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">
                            {data.title || "Tên khóa học"}
                        </h1>
                        <p className="text-white/90 mt-1">
                            {data.category || "Danh mục"} • {data.level || "Cấp độ"}
                        </p>
                    </div>
                    <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            {data.pricing_type === "free"
                                ? "Miễn phí"
                                : data.pricing_type === "paid"
                                    ? `${data.price || "0"} VNĐ`
                                    : "Đăng ký"}
                        </Badge>
                    </div>
                </div>

                <CardContent className="p-6">
                    {/* Course Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{data.sections?.length || 0}</div>
                            <div className="text-sm text-muted-foreground">Chương</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-secondary">{totalLessons}</div>
                            <div className="text-sm text-muted-foreground">Bài học</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-accent">{estimatedDuration}</div>
                            <div className="text-sm text-muted-foreground">Thời lượng</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-chart-1">4.8</div>
                            <div className="text-sm text-muted-foreground">Đánh giá</div>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Course Description */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Mô tả khóa học</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {data.description || "Mô tả khóa học sẽ hiển thị ở đây..."}
                        </p>
                    </div>

                    {/* Learning Objectives */}
                    {data.objectives && (
                        <>
                            <Separator className="my-6" />
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Mục tiêu học tập</h3>
                                <p className="text-muted-foreground leading-relaxed">{data.objectives}</p>
                            </div>
                        </>
                    )}

                    {/* Tags */}
                    {data.tags && data.tags.length > 0 && (
                        <>
                            <Separator className="my-6" />
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold">Từ khóa</h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.tags.map((tag: string) => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Course Content */}
                    {data.sections && data.sections.length > 0 && (
                        <>
                            <Separator className="my-6" />
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Nội dung khóa học</h3>
                                <div className="space-y-3">
                                    {data.sections.map((section: any, index: number) => (
                                        <Card key={section.id} className="border-l-4 border-l-primary/30">
                                            <CardContent className="p-4">
                                                <h4 className="font-medium mb-2">
                                                    Chương {index + 1}: {section.title}
                                                </h4>
                                                <div className="space-y-2">
                                                    {section.items.map((item: any) => {
                                                        const Icon = item.type === "video" ? Play : item.type === "document" ? FileText : HelpCircle
                                                        return (
                                                            <div key={item.id} className="flex items-center gap-3 text-sm text-muted-foreground">
                                                                <Icon className="h-4 w-4" />
                                                                <span>{item.title}</span>
                                                                {item.duration && (
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {item.duration}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Course Settings Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Tóm tắt cài đặt</CardTitle>
                    <CardDescription>Xem lại các cài đặt quan trọng của khóa học</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pricing */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Giá cả</span>
                            </div>
                            <div className="pl-6">
                                <Badge variant={data.pricing_type === "free" ? "secondary" : "default"}>
                                    {data.pricing_type === "free"
                                        ? "Miễn phí"
                                        : data.pricing_type === "paid"
                                            ? `${data.price || "0"} VNĐ`
                                            : "Đăng ký"}
                                </Badge>
                            </div>
                        </div>

                        {/* Access Level */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Quyền truy cập</span>
                            </div>
                            <div className="pl-6">
                                <Badge variant="outline">
                                    {data.access_level === "public"
                                        ? "Công khai"
                                        : data.access_level === "private"
                                            ? "Riêng tư"
                                            : "Theo lời mời"}
                                </Badge>
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Lịch trình</span>
                            </div>
                            <div className="pl-6 text-sm text-muted-foreground">
                                {data.start_date ? `Bắt đầu: ${data.start_date}` : "Chưa thiết lập"}
                                {data.end_date && <div>Kết thúc: {data.end_date}</div>}
                            </div>
                        </div>

                        {/* Language */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Ngôn ngữ</span>
                            </div>
                            <div className="pl-6">
                                <Badge variant="outline">
                                    {data.language === "vi" ? "Tiếng Việt" : data.language === "en" ? "English" : "Khác"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
                <Button variant="outline" size="lg">
                    <Eye className="h-4 w-4 mr-2" />
                    Xem trước đầy đủ
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                    Xuất bản khóa học
                </Button>
            </div>
        </div>
    )
}

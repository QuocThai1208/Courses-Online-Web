"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Upload, X, Plus } from "lucide-react"

interface CourseBasicInfoProps {
    data: any
    onUpdate: (data: any) => void
}

export function CourseBasicInfo({ data, onUpdate }: CourseBasicInfoProps) {
    const [tags, setTags] = useState<string[]>(data.tags || [])
    const [newTag, setNewTag] = useState("")

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            const updatedTags = [...tags, newTag.trim()]
            setTags(updatedTags)
            onUpdate({ ...data, tags: updatedTags })
            setNewTag("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove)
        setTags(updatedTags)
        onUpdate({ ...data, tags: updatedTags })
    }

    const handleInputChange = (field: string, value: string) => {
        onUpdate({ ...data, [field]: value })
    }

    return (
        <div className="space-y-6">
            {/* Course Title */}
            <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">
                    Tên khóa học *
                </Label>
                <Input
                    id="name"
                    placeholder="Nhập tên khóa học của bạn"
                    value={data.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="text-lg"
                />
                <p className="text-sm text-muted-foreground">Tên khóa học nên rõ ràng và thu hút học viên</p>
            </div>

            {/* Course Description */}
            <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                    Mô tả khóa học *
                </Label>
                <Textarea
                    id="description"
                    placeholder="Mô tả chi tiết về khóa học, nội dung và lợi ích mà học viên sẽ nhận được..."
                    value={data.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                />
                <p className="text-sm text-muted-foreground">Mô tả chi tiết sẽ giúp học viên hiểu rõ hơn về khóa học</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="space-y-2">
                    <Label className="text-base font-medium">Danh mục *</Label>
                    <Select value={data.category || ""} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="technology">Công nghệ</SelectItem>
                            <SelectItem value="business">Kinh doanh</SelectItem>
                            <SelectItem value="design">Thiết kế</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="language">Ngôn ngữ</SelectItem>
                            <SelectItem value="health">Sức khỏe</SelectItem>
                            <SelectItem value="music">Âm nhạc</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Level */}
                <div className="space-y-2">
                    <Label className="text-base font-medium">Cấp độ *</Label>
                    <Select value={data.level || ""} onValueChange={(value) => handleInputChange("level", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn cấp độ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="beginner">Cơ bản</SelectItem>
                            <SelectItem value="intermediate">Trung cấp</SelectItem>
                            <SelectItem value="advanced">Nâng cao</SelectItem>
                            <SelectItem value="all">Tất cả cấp độ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="price" className="text-base font-medium">
                        Giá khóa học (VNĐ) *
                    </Label>
                    <Input
                        id="price"
                        type="number"
                        placeholder="0"
                        value={data.price || ""}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Nhập 0 nếu khóa học miễn phí</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="duration" className="text-base font-medium">
                        Thời lượng (giờ) *
                    </Label>
                    <Input
                        id="duration"
                        type="number"
                        placeholder="0"
                        value={data.duration || ""}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Tổng thời lượng ước tính của khóa học</p>
                </div>
            </div>

            {/* Learning Objectives */}
            <div className="space-y-2">
                <Label htmlFor="objectives" className="text-base font-medium">
                    Mục tiêu học tập
                </Label>
                <Textarea
                    id="objectives"
                    placeholder="Học viên sẽ học được gì sau khi hoàn thành khóa học này?"
                    value={data.objectives || ""}
                    onChange={(e) => handleInputChange("objectives", e.target.value)}
                    rows={3}
                />
            </div>

            {/* Tags */}
            <div className="space-y-3">
                <Label className="text-base font-medium">Từ khóa</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={() => handleRemoveTag(tag)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Input
                        placeholder="Thêm từ khóa"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    />
                    <Button onClick={handleAddTag} variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Course Thumbnail */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Ảnh đại diện khóa học</CardTitle>
                    <CardDescription>Tải lên ảnh đại diện cho khóa học của bạn (khuyến nghị: 1280x720px)</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">Kéo thả ảnh vào đây hoặc click để chọn file</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF tối đa 10MB</p>
                        <Input
                            type="hidden"
                            value={data.thumbnail_url || ""}
                            onChange={(e) => handleInputChange("thumbnail_url", e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-2">
                <Label htmlFor="video_url" className="text-base font-medium">
                    Video giới thiệu khóa học
                </Label>
                <Input
                    id="video_url"
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={data.video_url || ""}
                    onChange={(e) => handleInputChange("video_url", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">URL video giới thiệu khóa học (YouTube, Vimeo, etc.)</p>
            </div>
        </div>
    )
}

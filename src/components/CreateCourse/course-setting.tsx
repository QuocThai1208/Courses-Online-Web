"use client"

import { Users, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"

interface CourseSettingsProps {
    data: any
    onUpdate: (data: any) => void
}

export function CourseSettings({ data, onUpdate }: CourseSettingsProps) {
    const handleInputChange = (field: string, value: any) => {
        onUpdate({ ...data, [field]: value })
    }

    return (
        <div className="space-y-6">
            {/* Pricing */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Giá cả và thanh toán
                    </CardTitle>
                    <CardDescription>Thiết lập giá và phương thức thanh toán cho khóa học</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Loại khóa học</Label>
                            <Select
                                value={data.pricing_type || "free"}
                                onValueChange={(value) => handleInputChange("pricing_type", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">Miễn phí</SelectItem>
                                    <SelectItem value="paid">Trả phí</SelectItem>
                                    <SelectItem value="subscription">Đăng ký</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {data.pricing_type === "paid" && (
                            <div className="space-y-2">
                                <Label>Giá (VNĐ)</Label>
                                <Input
                                    type="number"
                                    placeholder="500000"
                                    value={data.price || ""}
                                    onChange={(e) => handleInputChange("price", e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {data.pricing_type === "paid" && (
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={data.discount_enabled || false}
                                onCheckedChange={(checked) => handleInputChange("discount_enabled", checked)}
                            />
                            <Label>Áp dụng giảm giá</Label>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Completion Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Cài đặt hoàn thành
                    </CardTitle>
                    <CardDescription>Thiết lập điều kiện hoàn thành khóa học</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Điều kiện hoàn thành (%)</Label>
                        <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="80"
                            value={data.completion_threshold || ""}
                            onChange={(e) => handleInputChange("completion_threshold", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">Phần trăm nội dung cần hoàn thành để nhận chứng chỉ</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={data.certificate_enabled || true}
                            onCheckedChange={(checked) => handleInputChange("certificate_enabled", checked)}
                        />
                        <Label>Cấp chứng chỉ khi hoàn thành</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={data.discussion_enabled || true}
                            onCheckedChange={(checked) => handleInputChange("discussion_enabled", checked)}
                        />
                        <Label>Cho phép thảo luận giữa học viên</Label>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

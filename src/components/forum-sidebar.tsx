"use client"


import { BookOpen, Users, Award, Filter } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

const subjects = [
  { name: "Toán học", count: 245, color: "bg-blue-100 text-blue-800" },
  { name: "Vật lý", count: 189, color: "bg-green-100 text-green-800" },
  { name: "Hóa học", count: 156, color: "bg-purple-100 text-purple-800" },
  { name: "Sinh học", count: 134, color: "bg-pink-100 text-pink-800" },
  { name: "Văn học", count: 98, color: "bg-yellow-100 text-yellow-800" },
  { name: "Lịch sử", count: 87, color: "bg-indigo-100 text-indigo-800" },
  { name: "Địa lý", count: 76, color: "bg-red-100 text-red-800" },
  { name: "Tiếng Anh", count: 203, color: "bg-orange-100 text-orange-800" },
]

const priorities = [
  { name: "Khẩn cấp", count: 12, color: "bg-red-100 text-red-800" },
  { name: "Cao", count: 34, color: "bg-orange-100 text-orange-800" },
  { name: "Trung bình", count: 156, color: "bg-yellow-100 text-yellow-800" },
  { name: "Thấp", count: 89, color: "bg-green-100 text-green-800" },
]

export function ForumSidebar() {

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5" />
            Thống kê
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tổng câu hỏi</span>
            <Badge variant="destructive">1</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Đã trả lời</span>
            <Badge variant="destructive">1</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Chưa trả lời</span>
            <Badge variant="destructive">1</Badge>
          </div>
        </CardContent>
      </Card>


    </div>
  )
}

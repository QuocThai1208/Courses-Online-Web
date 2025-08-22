"use client"


import { Search, Plus, TrendingUp, MessageSquareText } from "lucide-react"
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Textarea } from "./ui/textarea"

export function ForumHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAskOpen, setIsAskOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "" })

  const handleAsk = () => {
    if (!newQuestion.title || !newQuestion.content) return
    console.log("New question:", newQuestion)
    setIsAskOpen(false)
    setNewQuestion({ title: "", content: "" })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold font-serif text-foreground flex">
          <MessageSquareText size={32} color="purple" className="mr-5" />
          Diễn đàn Hỏi đáp khóa học
        </h1>
      </div>

      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Tìm kiếm câu hỏi, từ khóa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-3">
          <Button className="flex items-center gap-2" onClick={() => setIsAskOpen(true)}>
            <Plus className="w-4 h-4" />
            Đặt câu hỏi
          </Button>
        </div>


        <Dialog open={isAskOpen} onOpenChange={setIsAskOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Đặt câu hỏi mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Tiêu đề câu hỏi"
                value={newQuestion.title}
                onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
              />
              <Textarea
                placeholder="Nội dung chi tiết..."
                value={newQuestion.content}
                onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsAskOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleAsk}>Đăng câu hỏi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

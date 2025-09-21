"use client"

import { useState, useEffect, useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import {
    MessageSquare,
    Plus,
    Pin,
    Lock,
    Eye,
    Clock,
    Send,
    User,
    ChevronRight
} from "lucide-react"
import { authApis, endpoints } from "@/src/utils/api"
import { toast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { MyUserContext } from "@/src/context/userContext"

interface ForumLayoutProps {
    courseId: string

}

export function ForumLayout({ courseId }: ForumLayoutProps) {
    const [forum, setForum] = useState<IForum | null>(null)
    const [topics, setTopics] = useState<ITopic[]>([])
    const [selectedTopic, setSelectedTopic] = useState<ITopic | null>(null)
    const [comments, setComments] = useState<IComment[]>([])
    const [newTopicTitle, setNewTopicTitle] = useState("")
    const [newTopicContent, setNewTopicContent] = useState("")
    const [newComment, setNewComment] = useState("")
    const [showNewTopic, setShowNewTopic] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchForumData()
    }, [courseId])

    const fetchForumData = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            // Fetch forum for this course
            const forumResponse = await authApis(token).get(endpoints.forumByCourse(courseId))
            console.log(">>> check forumResponse", forumResponse.data)
            if (forumResponse.data && forumResponse.data.length > 0) {
                setForum(forumResponse.data[0])
                await fetchTopics(forumResponse.data[0].id)
            }
        } catch (error) {
            console.error('Error fetching forum:', error)
            toast({
                title: "Lỗi",
                description: "Không thể tải diễn đàn",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    const fetchTopics = async (forumId: number) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const response = await authApis(token).get(endpoints.topicsByForum(forumId.toString()))
            setTopics(response.data.results || response.data)
        } catch (error) {
            console.error('Error fetching topics:', error)
        }
    }

    const fetchComments = async (topicId: number) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const response = await authApis(token).get(endpoints.commentsByTopic(topicId.toString()))
            setComments(response.data.results || response.data)
        } catch (error) {
            console.error('Error fetching comments:', error)
        }
    }

    const handleTopicSelect = async (topic: ITopic) => {
        setSelectedTopic(topic)
        await fetchComments(topic.id)

        // Increment view count
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await authApis(token).post(`/topics/${topic.id}/increment-view/`)
            }
        } catch (error) {
            console.error('Error incrementing view count:', error)
        }
    }

    const handleCreateTopic = async () => {
        if (!newTopicTitle.trim() || !newTopicContent.trim() || !forum) return

        try {
            const token = localStorage.getItem('token')
            if (!token) return

            await authApis(token).post(endpoints.topics, {
                forum: forum.id,
                title: newTopicTitle,
                content: newTopicContent
            })

            setNewTopicTitle("")
            setNewTopicContent("")
            setShowNewTopic(false)
            await fetchTopics(forum.id)

            toast({
                title: "Thành công",
                description: "Đã tạo chủ đề mới"
            })
        } catch (error) {
            console.error('Error creating topic:', error)
            toast({
                title: "Lỗi",
                description: "Không thể tạo chủ đề",
                variant: "destructive"
            })
        }
    }

    const handleCreateComment = async () => {
        if (!newComment.trim() || !selectedTopic) return

        try {
            const token = localStorage.getItem('token')
            if (!token) return

            await authApis(token).post(endpoints.comments, {
                topic: selectedTopic.id,
                content: newComment
            })

            setNewComment("")
            await fetchComments(selectedTopic.id)

            toast({
                title: "Thành công",
                description: "Đã thêm bình luận"
            })
        } catch (error) {
            console.error('Error creating comment:', error)
            toast({
                title: "Lỗi",
                description: "Không thể thêm bình luận",
                variant: "destructive"
            })
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!forum) {
        return (
            <div className="text-center py-8">
                <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Chưa có diễn đàn</h3>
                <p className="text-gray-600">Khóa học này chưa có diễn đàn thảo luận</p>
            </div>
        )
    }

    return (
        <div className="h-[600px] flex border rounded-lg overflow-hidden">
            {/* Topics List - Right Side */}
            <div className="w-1/3 border-r bg-gray-50">
                <div className="p-4 border-b bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Chủ đề thảo luận</h3>
                        <Button
                            size="sm"
                            onClick={() => setShowNewTopic(!showNewTopic)}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Tạo mới
                        </Button>
                    </div>

                    {showNewTopic && (
                        <div className="space-y-3 mb-4">
                            <Input
                                placeholder="Tiêu đề chủ đề"
                                value={newTopicTitle}
                                onChange={(e) => setNewTopicTitle(e.target.value)}
                            />
                            <Textarea
                                placeholder="Nội dung chủ đề"
                                value={newTopicContent}
                                onChange={(e) => setNewTopicContent(e.target.value)}
                                rows={3}
                            />
                            <div className="flex gap-2">
                                <Button size="sm" onClick={handleCreateTopic}>
                                    Tạo
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setShowNewTopic(false)}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <ScrollArea className="h-[500px]">
                    <div className="p-2 space-y-2">
                        {topics.map((topic) => (
                            <Card
                                key={topic.id}
                                className={`cursor-pointer transition-colors hover:bg-blue-50 ${selectedTopic?.id === topic.id ? 'bg-blue-100 border-blue-300' : ''
                                    }`}
                                onClick={() => handleTopicSelect(topic)}
                            >
                                <CardContent className="p-3">
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                {topic.is_pinned && (
                                                    <Pin className="w-3 h-3 text-yellow-500" />
                                                )}
                                                {topic.is_locked && (
                                                    <Lock className="w-3 h-3 text-red-500" />
                                                )}
                                                <h4 className="font-medium text-sm truncate">
                                                    {topic.title}
                                                </h4>
                                            </div>
                                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                                {topic.content}
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    {topic.user}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MessageSquare className="w-3 h-3" />
                                                    {topic.comment_count}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" />
                                                    {topic.view_count}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Comments Section - Left Side */}
            <div className="flex-1 flex flex-col">
                {selectedTopic ? (
                    <>
                        {/* Topic Header */}
                        <div className="p-4 border-b bg-white">
                            <div className="flex items-start gap-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src="" />
                                    <AvatarFallback>
                                        {selectedTopic.user.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h2 className="font-semibold mb-1">{selectedTopic.title}</h2>
                                    <p className="text-sm text-gray-600 mb-2">{selectedTopic.content}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span>Bởi {selectedTopic.user}</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatDistanceToNow(new Date(selectedTopic.created_at), {
                                                addSuffix: true,
                                                locale: vi
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {selectedTopic.view_count} lượt xem
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comments */}
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {comments.map((comment) => (
                                    <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                    />
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Comment Input */}
                        <div className="p-4 border-t bg-white">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Viết bình luận..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleCreateComment()}
                                />
                                <Button onClick={handleCreateComment}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                            <MessageSquare className="w-16 h-16 mx-auto mb-4" />
                            <p>Chọn một chủ đề để bắt đầu thảo luận</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

interface CommentItemProps {
    comment: IComment
}

function CommentItem({ comment }: CommentItemProps) {

    const user = useContext(MyUserContext)
    const isCurrentUser = comment.user === user?.username

    return (
        <div className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
            <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={comment.user_avatar || ""} />
                <AvatarFallback>
                    {comment.user.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className={`flex-1 max-w-[70%] ${isCurrentUser ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-lg ${isCurrentUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                    }`}>
                    <p className="text-sm">{comment.content}</p>
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'text-right' : ''}`}>
                    {comment.user} • {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                        locale: vi
                    })}
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className={`mt-2 space-y-2 ${isCurrentUser ? 'text-right' : ''}`}>
                        {comment.replies.map((reply) => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

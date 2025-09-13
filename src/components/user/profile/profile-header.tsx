import { MapPin, Calendar, LinkIcon, Mail, Phone, GraduationCap, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Badge } from "../../ui/badge"

interface UserProfile {
    username: string
    first_name: string
    last_name: string
    date_joined: string
    email: string
    phone: string
    avatar: string
    userRole: string
    is_active: boolean
    id?: string
}


export function ProfileHeader({ user }: { user?: UserProfile | null }) {
    if (!user) return <div>Loading...</div>;
    return (
        <div className="bg-card rounded-xl p-8 shadow-sm border">
            <div className="flex gap-8 items-start">
                {/* Avatar Section */}
                <div className="flex-shrink-0 relative">
                    <Avatar className="w-40 h-40 border-4 border-primary/20 shadow-lg">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt="Profile picture" />
                        <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                            {(user.last_name + user.first_name)
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div
                        className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-background ${user.is_active ? "bg-green-500" : "bg-gray-400"
                            }`}
                        title={user.is_active ? "Đang hoạt động" : "Không hoạt động"}
                    />
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-4xl font-bold text-foreground">{(user.last_name + user.first_name)}</h1>
                        <Badge
                            variant="outline"
                            className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border-primary/20"
                        >
                            <GraduationCap className="w-4 h-4" />
                            {user.userRole}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-lg text-muted-foreground">
                        <span>@{user.username}</span>
                        {user.id && (
                            <>
                                <span>•</span>
                                <span>ID: {user.id}</span>
                            </>
                        )}
                    </div>

                    <p className="text-foreground leading-relaxed text-lg max-w-3xl">
                        Học viên tích cực với niềm đam mê học hỏi công nghệ mới. Đã hoàn thành khóa học
                        và đang tiếp tục hành trình phát triển kỹ năng lập trình. Chuyên tâm vào Frontend Development và luôn sẵn
                        sàng chia sẻ kiến thức với cộng đồng học tập.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-base text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5" />
                            <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5" />
                            <span>Hà Nội, Việt Nam</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5" />
                            <span>Tham gia từ: {user.date_joined}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

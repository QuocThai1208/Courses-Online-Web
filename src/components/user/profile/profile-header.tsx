"use client"

import { MapPin, Calendar, Mail, Phone, GraduationCap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Badge } from "../../ui/badge"
import { useContext } from "react"
import { MyUserContext } from "@/src/context/userContext"


export function ProfileHeader() {
    const user = useContext(MyUserContext)

    return (

        <div className="rounded-xl p-8 shadow-xl bg-white/80 border">
            <div className="flex gap-8 items-start">
                {/* Avatar Section */}
                <div className="flex-shrink-0 relative">
                    <Avatar className="w-40 h-40 border-4 border-primary/20 shadow-lg">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt="Profile picture" />
                        <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                            {((user?.last_name ?? '') + (user?.first_name ?? ''))
                                .split("")
                                .map((n: any) => n[0])
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div
                        className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-background ${user?.is_active ? "bg-green-500" : "bg-gray-400"
                            }`}
                        title={user?.is_active ? "Đang hoạt động" : "Không hoạt động"}
                    />
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-4xl font-bold text-foreground">{(user?.last_name + " " + user?.first_name)}</h1>
                        <Badge
                            variant="outline"
                            className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border-primary/20"
                        >
                            <GraduationCap className="w-4 h-4" />
                            {user?.userRole}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-lg text-muted-foreground">
                        <span>@{user?.username}</span>
                    </div>

                    <p className="text-foreground leading-relaxed text-lg max-w-3xl">
                        {user?.introduce}
                    </p>


                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-base text-muted-foreground mt-4">
                <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>{user?.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span>{user?.address}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span>Tham gia từ: {user?.date_joined}</span>
                </div>
            </div>
        </div>
    )
}

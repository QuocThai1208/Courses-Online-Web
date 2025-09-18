"use client"

import { MessageCircle, UserPlus, Settings, Share } from "lucide-react"
import { Card, CardContent } from "../../ui/card"
import { Button } from "../../ui/button"
import { useRouter } from "next/navigation"


export function ProfileActions() {
    const router = useRouter()

    const goToChat = () => {
        router.push("/chat/1/")
    }

    const goToSetting = () => {
        router.push("/user/update-profile/")
    }

    return (
        <Card className="shadow-sm">
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 font-sans">Hành động</h3>
                <div className="flex flex-col gap-3">

                    <Button onClick={goToChat} variant="outline" className="font-manrope bg-transparent w-full justify-start">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Nhắn tin
                    </Button>

                    <Button onClick={goToSetting} variant="outline" className="font-manrope bg-transparent w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Chỉnh sửa
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

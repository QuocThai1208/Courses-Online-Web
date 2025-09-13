import { MessageCircle, UserPlus, Settings, Share } from "lucide-react"
import { Card, CardContent } from "../../ui/card"
import { Button } from "../../ui/button"

export function ProfileActions() {
    return (
        <Card className="shadow-sm">
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 font-sans">Hành động</h3>
                <div className="flex flex-col gap-3">
                    <Button className="font-manrope w-full justify-start">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Theo dõi
                    </Button>

                    <Button variant="outline" className="font-manrope bg-transparent w-full justify-start">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Nhắn tin
                    </Button>

                    <Button variant="outline" className="font-manrope bg-transparent w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Chỉnh sửa
                    </Button>

                    <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Share className="w-4 h-4 mr-2" />
                        Chia sẻ
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

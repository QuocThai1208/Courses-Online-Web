"use client"

import { MessageCircle, Settings, LogOut, FilePlus } from "lucide-react"
import { Card, CardContent } from "../../ui/card"
import { Button } from "../../ui/button"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { MyDispatchContext, MyUserContext } from "@/src/context/userContext"


export function ProfileActions() {
    const user = useContext(MyUserContext)
    const dispatch = useContext(MyDispatchContext)
    const router = useRouter()

    const goToCreateCourse = () => {
        router.push("/course/create/")
    }

    const goToSetting = () => {
        router.push("/user/update-profile/")
    }

    const logout = () => {
        dispatch?.({
            "type": "logout",
        })

        router.push('/user/login/')
    }

    return (
        <Card className="shadow-xl bg-white/80">
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 font-sans">Hành động</h3>
                <div className="flex flex-col gap-3">

                    {user?.userRole === "teacher" && (
                        <Button onClick={goToCreateCourse} variant="outline" className="font-manrope bg-transparent w-full justify-start">
                            <FilePlus className="w-4 h-4 mr-2" />
                            Tạo khóa học
                        </Button>
                    )}

                    <Button onClick={goToSetting} variant="outline" className="font-manrope bg-transparent w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Chỉnh sửa
                    </Button>

                    <Button onClick={logout} variant="outline" className="font-manrope bg-transparent w-full justify-start">
                        <LogOut className="w-4 h-4 mr-2" />
                        Đăng xuất
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

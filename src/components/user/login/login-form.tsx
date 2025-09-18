"use client"

import type React from "react"
import { useContext, useEffect, useState } from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { BookOpen, Eye, EyeOff, Lock, User } from "lucide-react"
import api, { authApis, endpoints } from "@/src/utils/api"
import { MyDispatchContext } from "@/src/context/userContext"
import { useRouter } from "next/navigation"
import qs from 'qs';

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const dispatch = useContext(MyDispatchContext)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await api.post(endpoints['token'],
                qs.stringify({
                    grant_type: 'password',
                    username,
                    password,
                    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            if (res.status === 200) {
                const token = res.data.access_token

                localStorage.setItem('token', token)

                const userRes = await authApis(token).get(endpoints['curent_user'])
                dispatch?.({
                    "type": "login",
                    "payload": userRes.data
                })

                router.push('/')

            }
        } catch (e) {
            console.log("error get token:", e)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full shadow-lg border-0 bg-card">
            <CardHeader className="text-center space-y-4 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold text-card-foreground">Chào mừng trở lại</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Đăng nhập để tiếp tục học tập cùng chúng tôi
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="user" className="text-sm font-medium text-card-foreground">
                            Tên đăng nhập
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                id="username"
                                type="text"
                                placeholder="Nhập tên đăng nhập của bạn"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
                            Mật khẩu
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 pr-10 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring focus:ring-2"
                            />
                            <Label htmlFor="remember" className="text-sm text-muted-foreground">
                                Ghi nhớ đăng nhập
                            </Label>
                        </div>
                        <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 transition-colors"
                    >
                        {loading ? "Đang xử lý..." : "Đăng nhập"}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Hoặc</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full border-border hover:bg-muted transition-colors bg-transparent">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Đăng nhập với Google
                </Button>

                <div className="text-center">
                    <span className="text-sm text-muted-foreground">
                        Chưa có tài khoản?{" "}
                        <a href="#" className="text-primary hover:text-primary/80 transition-colors font-medium">
                            Đăng ký ngay
                        </a>
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
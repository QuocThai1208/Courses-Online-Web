// app/login/page.tsx (Next.js 13+ App Router)
// Nếu bạn dùng Next.js 12 thì đặt ở pages/login.tsx

"use client";

import { MyDispatchContext } from "@/src/context/userContext";
import api, { authApis, endpoints } from "@/src/utils/api";

import { useContext, useState } from "react";
import qs from 'qs';
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react'

export default function LoginPage() {


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
            toast({
                title: "Thông báo",
                description: "Tên đăng nhập hoặc mật khẩu không đúng",
                variant: 'destructive'
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex bg-white shadow-xl rounded-lg overflow-hidden w-[900px] border-1">

                <div className="w-1/2 bg-blue-50 flex items-center justify-center">
                    <img
                        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpxhere.com%2Fvi%2Fphoto%2F1447663&psig=AOvVaw0aSLSytnJHdjUx0khBal0R&ust=1758449179747000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLi2weeL548DFQAAAAAdAAAAABAL"
                        alt="school-system"
                        className="w-full h-full"
                    />
                </div>

                <div className="w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-center mb-6">
                        HỆ THỐNG QUẢN LÝ KHÓA HỌC TRỰC TUYẾN
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tên đăng nhập</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Nhập tên đăng nhập"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Nhập mật khẩu"
                            />
                            <div className="text-right text-sm mt-1">
                                <a href="#" className="text-blue-600 hover:underline">
                                    Quên mật khẩu
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Đăng nhập
                        </button>

                        <button
                            type="button"
                            className="w-full border py-2 rounded-md hover:bg-gray-50 transition"
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                        >
                            Đăng nhập với Google
                        </button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Chưa có tài khoản?{" "}
                        <button className="text-blue-600 hover:underline"
                            onClick={() => router.push('/auth/register')}
                        >
                            Đăng kí
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

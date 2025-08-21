// app/login/page.tsx (Next.js 13+ App Router)
// Nếu bạn dùng Next.js 12 thì đặt ở pages/login.tsx

"use client";

import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ username, password });
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex bg-white shadow-xl rounded-lg overflow-hidden w-[900px] border-1">
                {/* Left side - Image */}
                <div className="w-1/2 bg-blue-50 flex items-center justify-center">
                    <img
                        src="https://api.huynhngoctruong.io.vn/image/user/loginpage.jpg"
                        alt="school-system"
                        className="w-full h-full"
                    />
                </div>

                {/* Right side - Form */}
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
                        >
                            Đăng nhập với Google
                        </button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Chưa có tài khoản?{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Đăng kí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

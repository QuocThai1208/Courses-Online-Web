"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, User, Lock, Phone, AlertCircle } from "lucide-react"

import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import api from "@/src/utils/api"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export function RegisterForm() {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter()

    const [userRole, setUserRole] = useState<"student" | "teacher">("student")
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
    })

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
    })

    const validateField = (name: string, value: string) => {
        let error = ""
        switch (name) {
            case "first_name":
            case "last_name":
                if (!value.trim()) {
                    error = name === "first_name" ? "Vui lòng nhập họ" : "Vui lòng nhập tên"
                } else if (!/^[A-Za-zÀ-ỹ\s]+$/.test(value)) {
                    error = "Chỉ được nhập chữ cái và khoảng trắng"
                }
                break
            case "username":
                if (value.length < 3) {
                    error = "Tên đăng nhập phải có ít nhất 3 ký tự"
                }
                break
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = "Email không hợp lệ"
                }
                break
            case "phone":
                if (!/^[0-9]{10}$/.test(value)) {
                    error = "Số điện thoại phải có 10 chữ số"
                }
                break
            case "password":
                if (value.length < 6) {
                    error = "Mật khẩu phải có ít nhất 6 ký tự"
                } else if (!/[A-Z]/.test(value)) {
                    error = "Mật khẩu phải chứa ít nhất 1 chữ hoa"
                } else if (!/[a-z]/.test(value)) {
                    error = "Mật khẩu phải chứa ít nhất 1 chữ thường"
                } else if (!/[0-9]/.test(value)) {
                    error = "Mật khẩu phải chứa ít nhất 1 số"
                }
                break
            case "confirm_password":
                if (value !== formData.password) {
                    error = "Mật khẩu xác nhận không khớp"
                }
                break
        }
        return error
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        const error = validateField(name, value)
        setErrors(prev => ({
            ...prev,
            [name]: error
        }))

        // Update confirm password error when password changes
        if (name === "password" && formData.confirm_password) {
            const confirmError = value !== formData.confirm_password ? "Mật khẩu xác nhận không khớp" : ""
            setErrors(prev => ({
                ...prev,
                confirm_password: confirmError
            }))
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate all fields
        let hasErrors = false
        const newErrors = {
            first_name: validateField("first_name", formData.first_name),
            last_name: validateField("last_name", formData.last_name),
            username: validateField("username", formData.username),
            email: validateField("email", formData.email),
            phone: validateField("phone", formData.phone),
            password: validateField("password", formData.password),
            confirm_password: validateField("confirm_password", formData.confirm_password)
        }

        setErrors(newErrors)

        if (Object.values(newErrors).some(error => error !== "")) {
            toast({
                title: "Lỗi",
                description: "Vui lòng kiểm tra lại thông tin đăng ký",
                variant: "destructive"
            })
            return
        }

        try {
            setLoading(true)
            const response = await api.post(`/users/register-${userRole}/`, {
                first_name: formData.first_name,
                last_name: formData.last_name,
                username: formData.username,
                password: formData.password,
                confirm_password: formData.confirm_password,
                email: formData.email,
                phone: formData.phone
            })

            if (response.status === 201) {
                toast({
                    title: "Thành công",
                    description: userRole === "student"
                        ? "Đăng ký tài khoản học viên thành công"
                        : "Đăng ký tài khoản giảng viên thành công"
                })
                router.push('/auth/signin')
            }
        } catch (error: any) {
            const message = error.response?.data?.message || "Có lỗi xảy ra khi đăng ký"
            toast({
                title: "Lỗi",
                description: message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full shadow-xl border-0 bg-gradient-to-b from-white to-gray-50/50">
            <CardHeader className="text-center space-y-4 pb-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300 shadow-lg">
                    <User className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Tạo tài khoản mới
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-lg">
                        Đăng ký để bắt đầu hành trình học tập của bạn
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Role selection */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setUserRole("student")}
                            className={`p-4 rounded-lg border-2 transition-all duration-300 ${userRole === "student"
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-blue-200 hover:bg-blue-50/50"
                                }`}
                        >
                            <div className="text-2xl mb-2">👨‍🎓</div>
                            <div className="font-medium">Học viên</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserRole("teacher")}
                            className={`p-4 rounded-lg border-2 transition-all duration-300 ${userRole === "teacher"
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-blue-200 hover:bg-blue-50/50"
                                }`}
                        >
                            <div className="text-2xl mb-2">👩‍🏫</div>
                            <div className="font-medium">Giảng viên</div>
                        </button>
                    </div>

                    {/* First Name field */}
                    <div className="space-y-2">
                        <Label htmlFor="first_name" className="text-sm font-medium text-card-foreground">
                            Họ
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                            <Input
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="Nhập họ của bạn"
                                value={formData.first_name}
                                onChange={handleChange}
                                className={`pl-10 bg-white/50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.first_name ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.first_name && (
                                <div className="flex items-center space-x-1 mt-1 text-red-500 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.first_name}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Last Name field */}
                    <div className="space-y-2">
                        <Label htmlFor="last_name" className="text-sm font-medium text-card-foreground">
                            Tên
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                            <Input
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Nhập tên của bạn"
                                value={formData.last_name}
                                onChange={handleChange}
                                className={`pl-10 bg-white/50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.last_name ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.last_name && (
                                <div className="flex items-center space-x-1 mt-1 text-red-500 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.last_name}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Username field */}
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium text-card-foreground">
                            Tên đăng nhập
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Nhập tên đăng nhập"
                                value={formData.username}
                                onChange={handleChange}
                                className={`pl-10 bg-white/50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.username ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.username && (
                                <div className="flex items-center space-x-1 mt-1 text-red-500 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.username}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Email field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
                            Email
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Nhập địa chỉ email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`pl-10 bg-white/50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.email && (
                                <div className="flex items-center space-x-1 mt-1 text-red-500 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.email}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Phone field */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-card-foreground">
                            Số điện thoại
                        </Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Nhập số điện thoại"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`pl-10 bg-white/50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.phone ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.phone && (
                                <div className="flex items-center space-x-1 mt-1 text-red-500 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Password field */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
                            Mật khẩu
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                                value={formData.password}
                                onChange={handleChange}
                                className={`pl-10 pr-10 bg-white/50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.password ? 'border-red-500' : ''}`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            {errors.password && (
                                <div className="flex items-center space-x-1 mt-1 text-red-500 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.password}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Confirm Password field */}
                    <div className="space-y-2">
                        <Label htmlFor="confirm_password" className="text-sm font-medium text-card-foreground">
                            Xác nhận mật khẩu
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                            <Input
                                id="confirm_password"
                                name="confirm_password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                className={`pl-10 pr-10 bg-white/50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.confirm_password ? 'border-red-500' : ''}`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            {errors.confirm_password && (
                                <div className="flex items-center space-x-1 mt-1 text-red-500 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.confirm_password}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Password requirements */}
                    <div className="p-4 bg-blue-50 rounded-lg space-y-2">
                        <h3 className="text-sm font-medium text-blue-800">Yêu cầu mật khẩu:</h3>
                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                            <li>Ít nhất 6 ký tự</li>
                            <li>Ít nhất 1 chữ hoa (A-Z)</li>
                            <li>Ít nhất 1 chữ thường (a-z)</li>
                            <li>Ít nhất 1 số (0-9)</li>
                        </ul>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 text-lg transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                        disabled={loading || Object.values(errors).some(error => error !== "")}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Đang xử lý...</span>
                            </div>
                        ) : "Đăng ký ngay"}
                    </Button>
                </form>

                <div className="text-center">
                    <span className="text-sm text-muted-foreground">
                        Đã có tài khoản?{" "}
                        <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                            Đăng nhập
                        </Link>
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}

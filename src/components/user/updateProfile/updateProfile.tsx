"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Eye, EyeOff, Camera, Save, X, User, Mail, Phone, Lock, ChevronDown, ChevronUp } from "lucide-react"
import { MyDispatchContext, MyUserContext } from "@/src/context/userContext"
import { useRouter } from "next/navigation"
import api, { authApis, endpoints } from "@/src/utils/api"
import qs from 'qs';

interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const infoProfile = [{
  field: 'username',
  label: 'Tên người dùng',
  icon: <User className="h-4 w-4" />
}, {
  field: 'email',
  label: 'Địa chỉ email',
  icon: <Mail className="h-4 w-4" />
}, {
  field: 'phone',
  label: 'Số điện thoại',
  icon: <Phone className="h-4 w-4" />
}]

const infoPassword = [{
  field: 'currentPassword',
  label: 'Mật khẩu hiện tại',
  show: 'current'
}, {
  field: 'newPassword',
  label: 'Mật khẩu mới',
  show: 'new'
}, {
  field: 'confirmPassword',
  label: 'Xác nhận mật khẩu mới',
  show: 'confirm'
}]

export function UpdateProfile() {
  const router = useRouter()
  const profileData = useContext(MyUserContext)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const user = useContext(MyUserContext)
  const dispatch = useContext(MyDispatchContext)

  const [loading, setLoading] = useState(false)
  const [profileUpdate, setProfileUpdate] = useState<any | null>(profileData)
  const [reviewAvtar, setReviewAvatar] = useState<string | null>(null)
  const [msgPassword, setMsgPassword] = useState<string | null>(null)
  const [msgProfile, setMsgProfile] = useState<string | null>(null)
  
  const [showPasswordSection, setShowPasswordSection] = useState(false)
  const [wantToChangePassword, setWantToChangePassword] = useState(false)
  
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const handleProfileChange = (field: string, value: string | File) => {
    setProfileUpdate((prev: any) => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
  }

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const resetPasswordData = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setMsgPassword(null)
  }

  const togglePasswordChange = () => {
    const newState = !wantToChangePassword
    setWantToChangePassword(newState)
    if (!newState) {
      resetPasswordData()
    }
  }

  const validatePassword = () => {
    if (!wantToChangePassword) {
      return true
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    for (let i of infoPassword) {
      if (passwordData[i.field as keyof PasswordData] === '') {
        setMsgPassword("Vui lòng nhập " + i.label + "!")
        return false
      }
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMsgPassword("Mật khẩu xác nhận không khớp.")
      return false
    }

    if (!(regex.test(passwordData.newPassword))) {
      setMsgPassword("Mật khẩu chưa đáp ứng các yêu cầu bên dưới!")
      return false
    }

    setMsgPassword('')
    return true
  }

  const validateCurrentPassword = async () => {
    if (!wantToChangePassword) {
      return true
    }

    try {
      const loginRes = await api.post(endpoints['token'],
        qs.stringify({
          grant_type: 'password',
          username: user.username, 
          password: passwordData.currentPassword, 
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      
      return loginRes.status === 200
    } catch (error) {
      setMsgPassword("Mật khẩu hiện tại không đúng!")
      return false
    }
  }

  const handleSave = async () => {
    if (!validatePassword()) return
    
    try {
      setLoading(true)
      setMsgPassword('') 
      setMsgProfile('')
      
      if (wantToChangePassword) {
        const isValidPassword = await validateCurrentPassword()
        if (!isValidPassword) return
      }
      
      const token = localStorage.getItem('token') ?? ''
      const formData = new FormData();

      formData.append("first_name", profileUpdate.first_name || "");
      formData.append("last_name", profileUpdate.last_name || "");
      formData.append("username", profileUpdate.username || "");
      formData.append("email", profileUpdate.email || "");
      formData.append("phone", profileUpdate.phone || "");

      if (profileUpdate.avatar instanceof File) {
        formData.append("avatar", profileUpdate.avatar);
      }

      if (wantToChangePassword && passwordData.newPassword) {
        formData.append("password", passwordData.newPassword);
      }

      const res = await authApis(token).patch(
        endpoints["curent_user"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("update profile res:", res.data)

      dispatch?.({
        "type": "update",
        "payload":res.data
      })
      
      if (wantToChangePassword) {
        setMsgPassword("Cập nhật thông tin và mật khẩu thành công!")
      } else {
        setMsgProfile("Cập nhật thông tin thành công!")
      }
      
      if (wantToChangePassword) {
        resetPasswordData()
        setWantToChangePassword(false)
      }
      
    } catch (e) {
      console.log("error update profile:", e)
      setMsgProfile("Có lỗi xảy ra khi cập nhật thông tin!")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/user/profile/")
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setReviewAvatar(URL.createObjectURL(file))
      handleProfileChange('avatar', file)
    }
  }

  const handlePick = () => {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    console.log(passwordData)
  }, [passwordData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="space-y-8">
          {msgProfile && (
            <div className={`p-4 rounded-xl text-center font-medium ${
              msgProfile.includes('thành công') 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {msgProfile}
            </div>
          )}

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Ảnh đại diện</CardTitle>
                  <CardDescription className="text-base">Tải lên ảnh đại diện để cá nhân hóa tài khoản</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="relative group">
                  <div className="relative">
                    <Avatar className="h-32 w-32 ring-4 ring-white shadow-2xl">
                      <AvatarImage src={reviewAvtar || profileUpdate?.avatar || "/placeholder.svg"} alt="Avatar" />
                      <AvatarFallback className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        {profileData?.first_name}
                        {profileData?.last_name}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-white" />
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="cursor-pointer absolute -bottom-2 -right-2 h-12 w-12 rounded-full p-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                    onClick={handlePick}
                  >
                    <Camera className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Yêu cầu ảnh đại diện</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Định dạng: JPG, PNG, GIF</li>
                      <li>• Kích thước tối đa: 5MB</li>
                      <li>• Khuyến nghị: 400x400px</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Thông tin cá nhân</CardTitle>
                  <CardDescription className="text-base">Cập nhật thông tin cá nhân của bạn</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                    Tên
                  </Label>
                  <Input
                    id="firstName"
                    value={profileUpdate?.first_name}
                    onChange={(e) => handleProfileChange("first_name", e.target.value)}
                    placeholder="Nhập tên của bạn"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                    Họ
                  </Label>
                  <Input
                    id="lastName"
                    value={profileUpdate?.last_name}
                    onChange={(e) => handleProfileChange("last_name", e.target.value)}
                    placeholder="Nhập họ của bạn"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-colors"
                  />
                </div>
              </div>

              {infoProfile.map((item) => (
                <div key={item.field} className="space-y-3">
                  <Label htmlFor={item.field} className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </Label>
                  <Input
                    id={item.field}
                    value={profileUpdate?.[item.field]}
                    onChange={(e) => handleProfileChange(item.field, e.target.value)}
                    placeholder={item.label}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-colors"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Password Section - Now Collapsible and Optional */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader 
              className="pb-6 cursor-pointer" 
              onClick={() => setShowPasswordSection(!showPasswordSection)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Bảo mật tài khoản</CardTitle>
                    <CardDescription className="text-base">
                      {wantToChangePassword ? "Đang thay đổi mật khẩu" : "Nhấp để thay đổi mật khẩu (tùy chọn)"}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {wantToChangePassword && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePasswordChange()
                      }}
                      className="text-sm"
                    >
                      Hủy đổi mật khẩu
                    </Button>
                  )}
                  {showPasswordSection ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
              {msgPassword && (
                <div className="text-red-500 mt-3">
                  {msgPassword}
                </div>
              )}
            </CardHeader>
            
            {showPasswordSection && (
              <CardContent className="space-y-6">
                {!wantToChangePassword ? (
                  <div className="text-center py-8">
                    <Lock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Thay đổi mật khẩu</h3>
                    <p className="text-gray-500 mb-6">Bạn có muốn thay đổi mật khẩu không?</p>
                    <Button
                      onClick={togglePasswordChange}
                      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Đổi mật khẩu
                    </Button>
                  </div>
                ) : (
                  <>
                    {infoPassword.map((item) => (
                      <div key={item.field} className="space-y-3">
                        <Label htmlFor={item.field} className="text-sm font-semibold text-gray-700">
                          {item.label}
                        </Label>
                        <div className="relative">
                          <Input
                            id={item.field}
                            type={showPasswords[item.show as keyof typeof showPasswords] ? "text" : "password"}
                            value={passwordData[item.field as keyof PasswordData]}
                            onChange={(e) => handlePasswordChange(item.field as keyof PasswordData, e.target.value)}
                            placeholder={item.label}
                            className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-colors pr-12"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-lg"
                            onClick={() => togglePasswordVisibility(item.show as keyof typeof showPasswords)}
                          >
                            {showPasswords[item.show as keyof typeof showPasswords] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Yêu cầu mật khẩu mạnh
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                          Ít nhất 8 ký tự
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>1 chữ hoa (A-Z)
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>1 chữ thường (a-z)
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>1 số (0-9)
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            )}
          </Card>
        </div>

        <div className="fixed bottom-8 right-8 flex gap-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="h-14 px-6 bg-white border-2 border-gray-300 hover:bg-gray-50 shadow-xl rounded-2xl text-gray-700 hover:text-gray-900 cursor-pointer disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5 mr-2" />
            Hủy
          </Button>
          <Button
            disabled={loading}
            onClick={handleSave}
            className="h-14 px-8 bg-blue-600 hover:bg-blue-700 shadow-xl rounded-2xl text-white font-semibold border-0 cursor-pointer disabled:cursor-not-allowed"
          >
            <Save className="h-5 w-5 mr-2" />
            {loading ? "Đang xử lý..." : "Lưu thay đổi"}
          </Button>
        </div>
      </div>
    </div>
  )
}

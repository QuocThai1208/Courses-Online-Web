'use client'
import { BookOpen, Menu, User } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { MyUserContext, MyDispatchContext } from "../context/userContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { authApis, endpoints } from "../utils/api"

export function Header() {
  const router = useRouter()
  const user = useContext(MyUserContext)
  const dispatch = useContext(MyDispatchContext)


  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token && !user && dispatch) {
          const userRes = await authApis(token).get(endpoints['curent_user'])
          dispatch({
            "type": "login",
            "payload": userRes.data
          })
        }
      } catch (error) {
        console.error('Error loading user:', error)
        localStorage.removeItem('token')
      }
    }

    loadUser()
    console.log(">> check user", user)
  }, [dispatch, user])

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch?.({
      "type": "logout"
    })
    router.push('/auth/signin')
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
            <BookOpen className="h-8 w-8" />
            <span className="text-xl font-bold">EduManageTTT</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-accent transition-colors">
              Trang chủ
            </Link>
            <Link href="/courses" className="hover:text-accent transition-colors">
              Khóa học
            </Link>
            <Link href="/about" className="hover:text-accent transition-colors">
              Giới thiệu
            </Link>
            <Link href="/my-courses" className="hover:text-accent transition-colors">
              Khóa học của tôi
            </Link>
            <Link href="/user/profile" className="hover:text-accent transition-colors">
              Tài khoản
            </Link>
          </nav>

          {/* Auth buttons or User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.username} />
                      <AvatarFallback>{user.username}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{`${user.first_name} ${user.last_name}`}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuItem onClick={() => router.push('/user/profile')}>
                    Tài khoản
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="text-primary-foreground hover:opacity-80" onClick={() => router.push('/auth/signin')}>
                  Đăng nhập
                </Button>
                <Button variant="secondary" onClick={() => router.push('/auth/register')}>Đăng ký</Button>
              </>
            )}
          </div>
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}

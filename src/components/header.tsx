
import { BookOpen, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
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
            <Link href="/contact" className="hover:text-accent transition-colors">
              Liên hệ
            </Link>
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-primary-foreground hover:text-accent">
              Đăng nhập
            </Button>
            <Button variant="secondary">Đăng ký</Button>
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

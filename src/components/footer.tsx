import { BookOpen, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-sidebar-primary" />
              <span className="text-xl font-bold">EduManage</span>
            </div>
            <p className="text-muted-foreground">
              Nền tảng quản lý khóa học trực tuyến hàng đầu, mang đến trải nghiệm học tập tốt nhất cho mọi người.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                  Khóa học
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-sidebar-accent transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: info@edumanage.vn</li>
              <li>Điện thoại: (84) 123 456 789</li>
              <li>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 EduManage. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

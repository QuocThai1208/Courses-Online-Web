import { BookOpen, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
        <div className="flex flex-wrap justify-around gap-8 text-white">
          {/* Logo and description */}
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">EducationTTT</span>
            </div>
            <p className="text-white">
              Nền tảng quản lý khóa học trực tuyến hàng đầu, mang đến trải nghiệm học tập tốt nhất cho mọi người.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:text-sidebar-accent transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white hover:text-sidebar-accent transition-colors">
                  Khóa học
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-sidebar-accent transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-sidebar-accent transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-white">
              <li>Email: info@edumanagettt.vn</li>
              <li>Điện thoại: (84) 123 456 789</li>
              <li>Địa chỉ: TP.HCM</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

  )
}

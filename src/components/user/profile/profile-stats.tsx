import { Users, BookOpen, Award, Clock } from "lucide-react"
import { Card, CardContent } from "../../ui/card"

export function ProfileStats() {
    const stats = [
        {
            icon: BookOpen,
            label: "Khóa học đã hoàn thành",
            value: "12",
            change: "+2",
        },
        {
            icon: Clock,
            label: "Giờ học",
            value: "156h",
            change: "+8h",
        },
        {
            icon: Award,
            label: "Chứng chỉ",
            value: "8",
            change: "+1",
        },
        {
            icon: Users,
            label: "Bạn học",
            value: "47",
            change: "+3",
        },
    ]

    return (
        <Card className="shadow-xl bg-white/80">
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 font-sans">Thống kê học tập</h3>
                <div className="space-y-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <stat.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground font-manrope">{stat.label}</div>
                                    <div className="text-lg font-bold text-foreground font-sans">{stat.value}</div>
                                </div>
                            </div>
                            <div className="text-sm text-green-600 font-manrope font-medium">+{stat.change}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

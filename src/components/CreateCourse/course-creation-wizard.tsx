"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Badge } from "../ui/badge"
import { ChevronLeft, ChevronRight, BookOpen, Settings, Eye, Upload } from "lucide-react"
import { CourseContentBuilder } from "./course-conten-builder"
import { CourseBasicInfo } from "./course-basic-info"
import { CourseSettings } from "./course-setting"
import { CoursePreview } from "./course-preview"

const steps = [
    {
        id: 1,
        title: "Thông tin cơ bản",
        description: "Tên khóa học, mô tả và mục tiêu",
        icon: BookOpen,
        component: CourseBasicInfo,
    },
    {
        id: 2,
        title: "Nội dung khóa học",
        description: "Thêm video, tài liệu và bài kiểm tra",
        icon: Upload,
        component: CourseContentBuilder,
    },
    {
        id: 3,
        title: "Cài đặt",
        description: "Lịch trình và quyền truy cập",
        icon: Settings,
        component: CourseSettings,
    },
    {
        id: 4,
        title: "Xem trước",
        description: "Kiểm tra và xuất bản khóa học",
        icon: Eye,
        component: CoursePreview,
    },
]

export function CourseCreationWizard() {
    const [currentStep, setCurrentStep] = useState(1)
    const [courseData, setCourseData] = useState({})

    const currentStepData = steps.find((step) => step.id === currentStep)
    const CurrentComponent = currentStepData?.component || CourseBasicInfo

    const progress = (currentStep / steps.length) * 100

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleStepClick = (stepId: number) => {
        setCurrentStep(stepId)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-primary font-[family-name:var(--font-playfair)]">Tạo khóa học mới</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Tạo khóa học trực tuyến chuyên nghiệp với công cụ dễ sử dụng của chúng tôi
                </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                        Bước {currentStep} / {steps.length}
                    </span>
                    <span className="text-sm font-medium text-primary">{Math.round(progress)}% hoàn thành</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Step Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {steps.map((step) => {
                    const Icon = step.icon
                    const isActive = step.id === currentStep
                    const isCompleted = step.id < currentStep

                    return (
                        <Card
                            key={step.id}
                            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${isActive ? "ring-2 ring-primary bg-card" : isCompleted ? "bg-muted/50" : "bg-card"
                                }`}
                            onClick={() => handleStepClick(step.id)}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`p-2 rounded-lg ${isActive
                                                ? "bg-primary text-primary-foreground"
                                                : isCompleted
                                                    ? "bg-secondary text-secondary-foreground"
                                                    : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-medium text-sm truncate">{step.title}</h3>
                                            {isCompleted && (
                                                <Badge variant="secondary" className="text-xs">
                                                    Hoàn thành
                                                </Badge>
                                            )}
                                            {isActive && (
                                                <Badge variant="default" className="text-xs">
                                                    Hiện tại
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">{step.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Main Content */}
            <Card className="min-h-[600px]">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        {currentStepData && <currentStepData.icon className="h-5 w-5" />}
                        <span>{currentStepData?.title}</span>
                    </CardTitle>
                    <CardDescription>{currentStepData?.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <CurrentComponent data={courseData} onUpdate={setCourseData} />
                </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2 bg-transparent"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Quay lại</span>
                </Button>

                <div className="flex space-x-3">
                    <Button variant="outline">Lưu nháp</Button>
                    <Button onClick={handleNext} disabled={currentStep === steps.length} className="flex items-center space-x-2">
                        <span>{currentStep === steps.length ? "Xuất bản" : "Tiếp theo"}</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

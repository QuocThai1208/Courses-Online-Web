import { LoginForm } from "@/src/components/user/login/login-form";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    )
}
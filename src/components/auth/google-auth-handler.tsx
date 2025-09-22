'use client'

import { useSession } from 'next-auth/react'
import { useContext, useEffect } from 'react'
import { MyDispatchContext } from '@/src/context/userContext'
import { useRouter } from 'next/navigation'

export default function GoogleAuthHandler() {
    const { data: session, status } = useSession()
    const dispatch = useContext(MyDispatchContext)
    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated' && session?.accessToken && session?.user) {
            console.log('>>> Google auth session detected, saving to localStorage and dispatching login')

            // Lưu token vào localStorage
            localStorage.setItem('token', session.accessToken)

            // Dispatch login action với user data
            dispatch?.({
                type: 'login',
                payload: session.user
            })

            // Redirect về trang chủ
            router.push('/')
        }
    }, [session, status, dispatch, router])

    // Component này không render gì, chỉ xử lý logic
    return null
}

'use client'

import { useContext, useEffect } from 'react'
import { MyDispatchContext, MyUserContext } from '@/src/context/userContext'
import { authApis, endpoints } from '@/src/utils/api'

export default function TokenRestore() {
    const dispatch = useContext(MyDispatchContext)
    const user = useContext(MyUserContext)

    useEffect(() => {
        const restoreUserSession = async () => {
            // Chỉ khôi phục nếu chưa có user trong context
            if (!user) {
                const token = localStorage.getItem('token')

                if (token) {
                    try {
                        console.log('>>> Restoring user session from localStorage')

                        // Gọi API để lấy thông tin user hiện tại
                        const userResponse = await authApis(token).get(endpoints.curent_user)

                        // Dispatch login action
                        dispatch?.({
                            type: 'login',
                            payload: userResponse.data
                        })

                        console.log('>>> User session restored successfully')
                    } catch (error) {
                        console.error('>>> Failed to restore user session:', error)

                        // Nếu token không hợp lệ, xóa khỏi localStorage
                        localStorage.removeItem('token')
                    }
                }
            }
        }

        restoreUserSession()
    }, [dispatch, user])

    // Component này không render gì, chỉ xử lý logic
    return null
}

import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const endpoints = {
    token: '/o/token/',

    curent_user: 'users/current-user/',

    categories: 'categories/',

    courses: 'courses/',
    coursesDetail: (id: string) => `courses/${id}/`,

    chapters: 'chapters/',

    lessons: 'lessons/',

    enrollments: 'enrollments/',
    enrollmentsCreate: 'enrollments/create/'
}

export const authApis = (token: string) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
})

import axios from "axios"

const BASE_URL = "http://160.25.81.159:8080/"

export const endpoints = {
    user: 'users/current-user/',
    categories: 'categories/',

    courses: 'courses/',

    chapters: 'chapters/',

    lessons: 'lessons/',
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

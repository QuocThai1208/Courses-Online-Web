import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const endpoints = {
    token: '/o/token/',
    authSocial: '/auth/social/',
    curent_user: 'users/current-user/',

    categories: 'categories/',

    courses: 'courses/',

    myCourses: 'courses/my-course/',
    coursesDetail: (id: string) => `courses/${id}/`,

    chapters: 'chapters/',

    lessons: 'lessons/',

    enrollments: 'enrollments/',
    courseComplete: 'enrollments/complete/',
    enrollmentsCreate: 'enrollments/create/',

    // Progress tracking endpoints
    lessonProgress: 'lesson-progress/',
    lessonProgressUpdate: 'lesson-progress/update-progress/',
    lessonProgressCourse: (courseId: string) => `lesson-progress/course/${courseId}/`,
    enrolledCourses: 'enrolled-courses/',

    // Forum endpoints
    forums: 'forums/',
    topics: 'topics/',
    comments: 'comments/',
    forumByCourse: (courseId: string) => `forums/?course=${courseId}`,
    topicsByForum: (forumId: string) => `topics/?forum_id=${forumId}`,
    commentsByTopic: (topicId: string) => `comments/?topic_id=${topicId}`,

    // Public course comments
    publicCourseComments: 'public-course-comments/',
    publicCourseCommentsByCourse: (courseId: string) => `public-course-comments/?course_id=${courseId}`,
    publicCourseCommentsRecent: (courseId: string) => `public-course-comments/recent/?course_id=${courseId}`,
    publicCourseCommentLike: (id: string) => `public-course-comments/${id}/like/`
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

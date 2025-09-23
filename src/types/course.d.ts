export interface Course {
    id: number;
    subject: string;
    name: string;
    description: string;
    image: string;
    category: {
        id: number;
        name: string;
    };
    lecturer: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        avatar: string;
    };
    price: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: number;
    rating: number;
    total_reviews: number;
    total_students: number;
    created_at: string;
}

export interface Chapter {
    id: number;
    course: number;
    name: string;
    description: string;
    lessons: Lesson[];
}

export interface Lesson {
    id: number;
    chapter: number;
    name: string;
    description: string;
    type: string;
    video_url: string;
    duration: number;
}

export interface ICourseDetail extends Course {
    chapters: Chapter[];
    related_courses: Course[];
}

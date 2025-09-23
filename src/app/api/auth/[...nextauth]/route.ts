import NextAuth, { JWT } from "next-auth"

import GithubProvider from "next-auth/providers/github"

import { AuthOptions } from "next-auth"


import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { sendRequest } from "@/src/utils/sendapi";

import api, { authApis, endpoints } from "@/src/utils/api";


export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),


    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            // Xử lý khi đăng nhập bằng Google
            if (trigger === "signIn" && account?.provider === "google") {
                console.log(">>> Google sign in detected")

                try {
                    // Lấy thông tin từ Google profile
                    const googleProfile = profile as any;
                    console.log(">>> Google profile:", googleProfile)

                    // Bước 1: Đăng ký user với thông tin Google
                    const registerResponse = await api.post('/users/register-student/', {
                        first_name: googleProfile.given_name || '',
                        last_name: googleProfile.family_name || '',
                        username: googleProfile.email.split('@')[0], // Tạo username từ email
                        password: 'GoogleAuth123!', // Password mặc định cho Google auth
                        confirm_password: 'GoogleAuth123!',
                        email: googleProfile.email,
                        phone: '0000000000' // Số điện thoại mặc định
                    });

                    console.log(">>> User registered successfully");

                    // Bước 2: Lấy token từ backend
                    const tokenResponse = await api.post(endpoints.token,
                        new URLSearchParams({
                            grant_type: 'password',
                            username: googleProfile.email.split('@')[0],
                            password: 'GoogleAuth123!',
                            client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
                            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!
                        }),
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                    );

                    if (tokenResponse.data && tokenResponse.data.access_token) {
                        // Lưu access token vào token object
                        token.accessToken = tokenResponse.data.access_token;
                        token.refreshToken = tokenResponse.data.refresh_token;

                        // Bước 3: Lấy thông tin user
                        const userResponse = await authApis(tokenResponse.data.access_token).get(endpoints.curent_user);
                        token.user = userResponse.data;

                        console.log(">>> Google auth successful, token and user data saved");
                    }
                } catch (error: any) {
                    console.error(">>> Google auth error:", error);

                    // Nếu user đã tồn tại, thử đăng nhập trực tiếp
                    if (error.response?.status === 400) {
                        try {
                            const googleProfile = profile as any;

                            // Thử đăng nhập với user đã tồn tại
                            const tokenResponse = await api.post(endpoints.token,
                                new URLSearchParams({
                                    grant_type: 'password',
                                    username: googleProfile.email.split('@')[0],
                                    password: 'GoogleAuth123!',
                                    client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
                                    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!
                                }),
                                {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }
                            );

                            if (tokenResponse.data && tokenResponse.data.access_token) {
                                token.accessToken = tokenResponse.data.access_token;
                                token.refreshToken = tokenResponse.data.refresh_token;

                                const userResponse = await authApis(tokenResponse.data.access_token).get(endpoints.curent_user);
                                token.user = userResponse.data;

                                console.log(">>> Google auth successful with existing user");
                            }
                        } catch (loginError) {
                            console.error(">>> Google login error:", loginError);
                            throw new Error("Google authentication failed");
                        }
                    } else {
                        throw new Error("Google authentication failed");
                    }
                }
            }

            return token;
        },
        async session({ session, token }) {
            // Truyền thông tin user và token vào session
            if (token.accessToken) {
                (session as any).accessToken = token.accessToken as string;
                if (token.user) {
                    session.user = {
                        ...session.user,
                        ...token.user
                    };
                }
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
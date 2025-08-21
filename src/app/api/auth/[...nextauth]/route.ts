import NextAuth, { JWT } from "next-auth"

import GithubProvider from "next-auth/providers/github"

import { AuthOptions } from "next-auth"


import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { sendRequest } from "@/src/utils/api";







export const authOptions: AuthOptions = {
    // Configure one or more authentication providers

    secret: process.env.NEXTAUTH_SECRET,


    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {


                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
                    method: "POST",
                    body: {
                        username: credentials?.username,
                        password: credentials?.password
                    }
                })


                // If no error and we have user data, return it
                if (res && res.data) {
                    return res.data as any;
                }
                else {
                    throw new Error(res?.message as string);

                }

                // if (!res?.error) {
                //     const router = useRouter(),
                //     router.push('/');
                // }
                // Return null if user data could not be retrieved

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),



        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {




            if (trigger === "signIn" && account?.provider !== "credentials") {
                /// đăng nhập với người dùng bằng github để lấy token
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social`,
                    method: "POST",
                    body: { type: account?.provider.toLocaleUpperCase(), username: user.email }
                })

                if (res.data) {
                    token.access_token = res.data?.access_token;
                    token._id = res.data?._id;
                    token.name = res.data?.name;
                    token.email = res.data?.email;
                    token.avatar = res.data?.avatar;
                    token.typeLogin = res.data?.typeLogin;
                    token.followers = res.data?.followers;
                    token.following = res.data?.following;
                    token.role = res?.data?.role;
                    token.shared = res?.data?.shared;


                }
            }
            if (trigger === "signIn" && account?.provider === "credentials") {


                //@ts-ignore
                token.access_token = user?.access_token;
                //@ts-ignore
                token._id = user?._id;
                //@ts-ignore
                token.name = user?.name;
                //@ts-ignore
                token.email = user?.email;
                //@ts-ignore
                token.avatar = user?.avatar;
                //@ts-ignore
                token.typeLogin = user?.typeLogin;
                //@ts-ignore
                token.followers = user?.followers;
                //@ts-ignore
                token.following = user?.following;
                //@ts-ignore
                token.role = user?.role;
                //@ts-ignore
                token.shared = user?.shared;

            }

            return token
        },
        async session({ session, token, user }) {
            if (token) {
                //@ts-ignore
                session.user.access_token = token.access_token;
                //@ts-ignore
                session.user._id = token._id;
                //@ts-ignore
                session.user.name = token.name;
                //@ts-ignore
                session.user.email = token.email;
                //@ts-ignore
                session.user.avatar = token.avatar;
                //@ts-ignore
                session.user.typeLogin = token.typeLogin;
                //@ts-ignore
                session.user.followers = token.followers;
                //@ts-ignore
                session.user.following = token.following;
                //@ts-ignore
                session.user.role = token.role;
                //@ts-ignore
                session.user.shared = token.shared;




            }

            return session


        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
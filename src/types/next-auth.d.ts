import NextAuth from "next-auth"

import NextAuth, { DefaultSession } from "next-auth"



declare module "next-auth" {

    interface JWT {
        "access_token": string,
        "_id": string,
        "name": string,
        "email": string,
        "role": string[],
        "avatar": string,
        "countFollowers": number,
        "typeLogin": string,
        "followers": string[],
        "following": string[],
        "shared": string[],
        "socketId": string
    }
}


declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            "access_token": string,
            "_id": string,
            "name": string,
            "email": string,
            "role": string[],
            "avatar": string,
            "countFollowers": number,
            "typeLogin": string,
            "followers": string[],
            "following": string[],
            "shared": string[],
            "socketId": string
        }
    }

}
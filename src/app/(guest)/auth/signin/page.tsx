
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import AuthSignIn from "@/components/signin/app.signin";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import AuthSignIn from "@/src/components/signin/app.signin";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'


const AuthSignInPage = async () => {
    const session = await getServerSession(authOptions);
    

    if (session) {
        redirect("/");
    }
    return (

        <AuthSignIn />

    )
}

export default AuthSignInPage;
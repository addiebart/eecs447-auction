import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "../components/login/loginForm";

export default async function LoginPage() {

    const headerCookies = await cookies()
    const [username, password] = await Promise.all([headerCookies.get("username"), headerCookies.get("password")])
    if (username?.value && password?.value) {
        redirect("/")
    }

    return (
        <main className="grow flex flex-col m-4 items-center">
            <h1 className="text-4xl self-center m-4 p-2 underline">Login</h1>

            <div className="flex flex-col flex-1 justify-center items-center">
                <LoginForm />
            </div>
            <div className="flex-3"></div>
        </main>
    );
}
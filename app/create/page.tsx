import { cookies } from "next/headers";
import CreateForm from "../components/create/createForm";

export default async function CreatePage() {

    const headerCookies = await cookies()
    const [username, password] = await Promise.all([headerCookies.get("username"), headerCookies.get("password")])
    const loggedIn = username?.value !== undefined && password?.value !== undefined

    return (
        <main className="grow flex flex-col m-4 items-center">
            <h1 className="text-4xl self-center m-4 p-2 underline">Create Auction</h1>

            <div className="flex flex-col flex-1 justify-center items-center">
                { loggedIn ? <CreateForm /> : <div></div> }
            </div>
            <div className="flex-3"></div>
        </main>
    );
}
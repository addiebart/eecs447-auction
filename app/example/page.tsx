import admin from "@/utils/supabase/admin";

export default async function ExamplePage() {
    // at /example

    const {data: tuples, error} = await admin.from("users").select("username");
    if (error) throw error;
    const usernames = tuples?.map(tuple => tuple.username) ?? [];
    
    return (
        <div className="w-fit">
            <h1 className="text-2xl w-fit"></h1>
            <ul>
                {usernames?.map(username => <li className="border">{username}</li>)}
            </ul>
        </div>
    )
}
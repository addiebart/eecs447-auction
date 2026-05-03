import admin from "@/utils/supabase/admin";

export default async function ExamplePage() {
    // at /example

    const {data: tuples, error} = await admin.from("users").select("username, uid");
    if (error) throw error;
    
    return (
        <div className="w-fit">
            <h1 className="text-2xl w-fit"></h1>
            <ul>
                {tuples?.map(tuple => <li className="border" key={tuple.uid}>{tuple.username}</li>)}
            </ul>
        </div>
    )
}
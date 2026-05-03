import admin from "@/utils/supabase/admin";
import TuplesDisplay from "../components/auctions/tuplesDisplay";
import { cookies } from "next/headers";

export default async function AuctionsPage() {

    const cs = await cookies()
    const username = (await cs.get("username"))?.value

    const {data: tuples, error} = await admin.from("auctions_page_data").select("*")
    if (error) throw error;
    if (tuples.some(t => {
        t.end_time == null ||
        t.iid === null ||
        t.item_name === null ||
        t.seller_name === null ||
        t.seller_uid === null
    }))  {
        throw new Error("Illegal null state on auctions_page_data")
    };

    return (
        <main className="grow flex flex-col m-4 items-center">
            <h1 className="text-4xl self-center m-4 p-2 underline">Auctions</h1>

            <section className="flex flex-col gap-4">
                <TuplesDisplay tuples={tuples} username={username} />
            </section>
        </main>
    );
}
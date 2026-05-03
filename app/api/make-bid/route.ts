import admin from "@/utils/supabase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type BidRequest = {
    amount?: string;
    iid?: string;
    username?: string;
    password?: string;
};

export async function POST(request: Request) {
    try {
        const body: BidRequest = await request.json();
        const { username, password, iid, amount } = body;
        if (!username || !password || !iid || !amount) {
            return NextResponse.json({ error: "Missing field in request" }, { status: 400 });
        }
        const iidInt = Number.parseInt(iid), amountInt = Number.parseInt(amount);
        if (!Number.isInteger(iidInt) || !Number.isInteger(amountInt)) {
            return NextResponse.json({ error: "Type mismatched field in request" }, { status: 400 });
        }
        const {data: tuples, error} = await admin.from("auctions_page_data").select("max_bid").eq("iid", iidInt)
        if (error) throw error
        if (tuples.length > 0 && (tuples[0].max_bid ?? 0) >= amountInt) {
            return NextResponse.json({ error: "Requested bid does not exceed current max bid of " + String(tuples[0].max_bid) }, { status: 400 });
        }
        const {data: uidTuples, error: uidError} = await admin.from("users").select("uid").eq("username", username).eq("password", password)
        if (uidError) throw uidError
        if (uidTuples?.length !== 1) {
            return NextResponse.json({ error: "Unable to authenticate user" }, { status: 400 });
        }
        await admin.from("bid").insert({bid_timestamp: (new Date()).toISOString(), iid: iidInt, price: amountInt, uid: uidTuples[0].uid})
        return NextResponse.json({meessage: "Bid successful"}, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}

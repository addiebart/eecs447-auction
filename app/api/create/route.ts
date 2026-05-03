import admin from "@/utils/supabase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type CreateRequest = {
    itemName?: string;
    minBid?: string;
    username?: string;
    password?: string;
    endTime?: string;
};

export async function POST(request: Request) {
    try {
        const body: CreateRequest = await request.json();
        const { itemName, endTime } = body;
        const headerCookies = await cookies()
        const [usernameCookie, passwordCookie] = await Promise.all([headerCookies.get("username"), headerCookies.get("password")])
        const username = usernameCookie?.value, password = passwordCookie?.value
        console.log({
            username: username,
            password: password,
            itemName: itemName,
            endTime: endTime   
        })
        if (username === undefined || password === undefined || itemName === undefined || endTime === undefined) {
            return NextResponse.json({ error: "Missing field in request" }, { status: 400 });
        }
        if (isNaN((new Date(endTime ?? "")).valueOf()) || Date.parse(endTime!) <= Date.now() || itemName.length > 100) {
            return NextResponse.json({ error: "Type mismatched field in request" }, { status: 400 });
        }
        const {data: uidTuples, error: uidError} = await admin.from("users").select("uid").eq("username", username).eq("password", password)
        if (uidError) throw uidError
        if (uidTuples?.length !== 1) {
            return NextResponse.json({ error: "Unable to authenticate user" }, { status: 400 });
        }
        const {error} = await admin.from("item").insert({
            created_by: uidTuples[0].uid,
            end_time: (new Date(endTime!)).toISOString(),
            name: itemName
        })
        if (error) {
            return NextResponse.json({ error: "Internal database error" }, { status: 500 });
        }
        return NextResponse.json({message: "Bid successful"}, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}

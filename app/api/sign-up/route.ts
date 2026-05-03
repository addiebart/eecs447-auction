import admin from "@/utils/supabase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type SignUpRequest = {
    username?: string;
    password?: string;
    address?: string;
};

export async function POST(request: Request) {
    try {
        const body: SignUpRequest = await request.json();
        const { username, password, address } = body;
        if (!username || !password || !address) {
            return NextResponse.json({ error: "Missing username, password, or address" }, { status: 400 });
        }
        const {data: tuples, error} = await admin.from("users").select("username").eq("username", username)
        if (error) throw error
        if (tuples.length > 0) {
            return NextResponse.json({message: "Username is already registered."}, { status: 400 });
        }
        const res = await admin.from("users").insert({username: username, password: password, address: address})
        const cs = await cookies()
        const p1 = cs.set("username", username)
        const p2 = cs.set("password", password)
        await Promise.all([p1, p2])
        return NextResponse.json({meessage: "Login successful"}, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}

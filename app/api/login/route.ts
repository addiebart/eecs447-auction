import admin from "@/utils/supabase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type LoginRequest = {
	username?: string;
	password?: string;
};

export async function POST(request: Request) {
	try {
		const body: LoginRequest = await request.json();
		const { username, password } = body;
		if (!username || !password) {
			return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
		}
        const {data: tuples, error} = await admin.from("users").select("password").eq("username", username)
        if (error) throw error
        if (tuples.length !== 1 || tuples[0].password !== password) {
            return NextResponse.json({message: "Invalid username/password"}, { status: 400 });
        }
        const cs = await cookies()
        const p1 = cs.set("username", username)
        const p2 = cs.set("password", password)
        await Promise.all([p1, p2])
		return NextResponse.json({meessage: "Login successful"}, { status: 200 });
	} catch (err) {
		return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
	}
}

"use client"

import { MouseEvent } from "react"

export default function LogoutButton() {

    async function handleClick(e: MouseEvent<HTMLButtonElement>) {
        const p1 = cookieStore.delete("username")
        const p2 = cookieStore.delete("password")
        await Promise.all([p1, p2])
        location.reload()
    }

    return <button
        className="text-sm px-3 py-1 border cursor-pointer"
        onClick={handleClick}
        style={{ color: 'var(--foreground)', borderColor: 'var(--foreground)' }}
    >
        Log Out
    </button>
}
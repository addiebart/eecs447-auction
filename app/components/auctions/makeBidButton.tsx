"use client"

import axios, { AxiosError } from "axios"
import { MouseEvent } from "react"

export default function MakeBidBtnAuctions({iid, name, current} : {iid: number, name: string, current: number}) {
    async function handleClick(e: MouseEvent<HTMLButtonElement>) {
        const usernamePromise = cookieStore.get("username")
        const passwordPromise = cookieStore.get("password")
        const [usernameCookie, passwordCookie] = await Promise.all([usernamePromise, passwordPromise])
        const username = usernameCookie?.value
        const password = passwordCookie?.value
        if (username && password) {
            const promptResult = prompt(`Enter the positive integer number of dollars you wish to bet on ${name}. The minimum bid is $${current + 1}.`)
            if (promptResult === null) return
            let amount = Number.parseInt(promptResult)
            while (Number.isNaN(amount) || amount <= current) {
                const promptResult = prompt(`Your input was invalid. Enter the positive integer number of dollars you wish to bet on ${name}. The number must be greater than the minimum bid of $${current + 1}.`)
                if (promptResult === null) return
                amount = Number.parseInt(promptResult)
            }

            try {
                const res = await axios.post("/api/make-bid", {iid, amount}, { withCredentials: true })
                if (res.status >= 200 && res.status <= 299) {
                    alert(`Your bid on ${name} was successfully placed for $${amount}.`)
                    location.reload() // not using react :P
                }
            }
            catch (e) {
                if (!(e instanceof AxiosError)) {
                    throw e;
                }
                alert(`Your bid failed due to an error in your request: "${e.response?.data.error ?? "Unknown server error"}"`)
            }
        }

        else {
            alert("You are not currently signed in. Sign in to make bids.")
        }
    }

    return (
        <button type="button" 
            className="border-l hover:bg-green-300 hover:cursor-pointer hover:text-black"
            onClick={handleClick}
        >
            Make Bid
        </button>
    );
}
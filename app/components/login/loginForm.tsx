"use client"

import axios, { AxiosError } from "axios";
import { SubmitEvent } from "react";

function clearValueFields(...inputElements: HTMLInputElement[]) {
    for (const x of inputElements) {
        x.value = ""
    }
}

export default function LoginForm() {
    async function submitHandler(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const userInputElem = e.currentTarget.elements.namedItem("username")
        const passwdInputElem = e.currentTarget.elements.namedItem("password")
        if (!(userInputElem instanceof Element) || !(passwdInputElem instanceof Element)) {
            throw new Error("Username and password fields not found on form tag HTML.")
        }
        const fields = [userInputElem as HTMLInputElement, passwdInputElem as HTMLInputElement]
        const userValue = fields[0].value.trim()
        const passwdValue = fields[1].value
        if (userValue.length > 20) {
            alert("Username may not be longer than 20 characters. Try again.")
            clearValueFields(...fields)
            return
        }
        if (passwdValue.length > 20) {
            alert("Password may not be longer than 20 characters. Try again.")
            clearValueFields(...fields)
            return
        }
        try {
            const res = await axios.post("/api/login", {username: userValue, password: passwdValue}, { withCredentials: true })
            if (res.status >= 200 && res.status <= 299) {
                location.pathname = "/" // use instead of next toolkit to reload cookies
            }
            else {
                alert(`The login was unsuccessful. "${res.data}"`);
                clearValueFields(...fields)
            }
        }
        catch (e) {
            if (!(e instanceof AxiosError)) throw e
            if (e.response?.data.error) {
                alert(`The login was unsuccessful. "${e.response.data.error}"`);
                clearValueFields(...fields)
            }
            else console.error(`The POST request itself failed. ${e}`)
        }
    }
    
    return (
        <form action="submit" className="flex flex-col gap-2 border-2 rounded-lg p-8" onSubmit={submitHandler} autoComplete="off">
            <p>Username:</p>
            <input type="text" name="username" className="rounded-sm px-1 bg-white text-black" autoComplete="off"/>
            <p>Password:</p>
            <input type="password" name="password" className="rounded-sm px-1 bg-white text-black" autoComplete="off"/>
            <button type="submit" className="p-2 border w-fit self-center mt-4 hover:cursor-pointer hover:bg-green-300 hover:text-black">Login</button>
        </form>
    );
}
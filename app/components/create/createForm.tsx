"use client"

import axios, { AxiosError } from "axios"
import { HTMLInputTypeAttribute, SubmitEvent } from "react"

function clearValueFields(...inputElements: HTMLInputElement[]) {
    for (const x of inputElements) {
        x.value = ""
    }
}

export default function CreateForm() {

    async function submitHandler(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const itemNameElem = e.currentTarget.elements.namedItem("itemName")
        const endTimeElem = e.currentTarget.elements.namedItem("endTime")
        if (!(itemNameElem instanceof Element) || !(endTimeElem instanceof Element)) {
            throw new Error("Username and password fields not found on form tag HTML.")
        }
        const [username, password] = await Promise.all([cookieStore.get("username"), cookieStore.get("password")])
        const loggedIn = username?.value !== undefined && password?.value !== undefined
        if (!loggedIn) {
            alert("You must be logged in to create listings.")
            return
        }
        const fields = [itemNameElem as HTMLInputElement, endTimeElem as HTMLInputElement]
        const itemNameValue = fields[0].value.trim()
        const endTimeValue = new Date(fields[1].value + " 23:59:59")
        if (itemNameValue.length > 100) {
            alert("Item name may not be longer than 100 characters. Try again.")
            clearValueFields(itemNameElem as HTMLInputElement)
            return
        }
        if (isNaN(endTimeValue.getTime()) || endTimeValue.valueOf() <= Date.now()) {
            alert("End date must be after current date")
            clearValueFields(endTimeElem as HTMLInputElement)
            return
        }
        const isoString = endTimeValue.toISOString()
        try {
            const res = await axios.post("/api/create", {itemName: itemNameValue, endTime: isoString}, { withCredentials: true })
            if (res.status >= 200 && res.status <= 299) {
                alert("Your listing was created successfully")
            }
        }
        catch (e) {
            if (!(e instanceof AxiosError)) {
                throw e;
            }
            alert(e.response?.data.error ?? "Creation failed on our servers. No information was provided.")
        }
    }

    return (
        <form action="submit" className="flex flex-col gap-2 border-2 rounded-lg p-8" onSubmit={submitHandler} autoComplete="off">
            <p>Item Name:</p>
            <input type="text" name="itemName" className="rounded-sm px-1 bg-white text-black" autoComplete="off"/>
            <p>End Date:</p>
            <input type="date" name="endTime" className="rounded-sm px-1 bg-white text-black" autoComplete="off"/>
            <button type="submit" className="p-2 border w-fit self-center mt-4 hover:cursor-pointer hover:bg-green-300 hover:text-black">Create Listing</button>
        </form>
    )
}
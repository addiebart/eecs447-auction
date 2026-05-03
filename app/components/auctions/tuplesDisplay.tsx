// HELL FILE I DIDNT FEEL LIKE TYPING PROPERLY

"use client"

import React, { ChangeEvent, useState } from "react"
import MakeBidBtnAuctions from "./makeBidButton"

export default function TuplesDisplay({tuples,username}:{tuples:any[],username?:string}) {

    const activeTuples = tuples.filter(t => Date.parse(t.end_time!) > Date.now())
    const inactiveTuples = tuples.filter(t => Date.parse(t.end_time!) <= Date.now())
    const wonTuples = inactiveTuples.filter(t => t.max_bidder && t.max_bidder === username)

    const [filter, setFilter] = useState<"active" | "inactive" | "won">("active")

    function radioChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setFilter(e.target.value as "active" | "inactive" | "won")
    }

    const displayTuples = 
        filter === "active" ? activeTuples : 
        filter === "inactive" ? inactiveTuples : 
        wonTuples

    return <>
    <div className="flex gap-4">
      <label className="inline-flex items-center gap-2">
        <input type="radio" name="auctionFilter" value="active" checked={filter === "active"} onChange={radioChangeHandler}/>
        <span className="text-sm">Active auctions</span>
      </label>
      <label className="inline-flex items-center gap-2">
        <input type="radio" name="auctionFilter" value="inactive" checked={filter === "inactive"} onChange={radioChangeHandler}/>
        <span className="text-sm">Ended / sold auctions</span>
      </label>
      <label className="inline-flex items-center gap-2">
        <input type="radio" name="auctionFilter" value="won" checked={filter === "won"} onChange={radioChangeHandler}/>
        <span className="text-sm">Auctions you've won</span>
      </label>
    </div>
    <div className="grid border *:border-b [&>*:last-child]:border-b-none [&>*:nth-last-child(2)]:border-b-none [&>*:nth-last-child(5)]:border-none [&>*:nth-last-child(3)]:border-b-none [&>*:nth-last-child(4)]:border-b-none items-center *:py-1 *:px-2" style={{gridTemplateColumns: "auto auto auto auto auto"}}>
        {displayTuples.length <= 0 ? <p>There are no items to show</p> : displayTuples.map(t => (
            <React.Fragment key={t.iid}>
                <p>Name: {t.item_name}</p>
                <p>Ends At: {(new Date(t.end_time! + "Z")).toLocaleString().replace(/:[0-9][0-9] /," ")}</p>
                <p>Current Bid: ${t.max_bid ?? 0}{t.max_bidder ? ` by ${t.max_bidder}` : ""}</p>
                <p>Sold By: {t.seller_name}</p>
                <MakeBidBtnAuctions iid={t.iid!} name={t.item_name!} current={t.max_bid ?? 0} />
            </React.Fragment>
        ))}
    </div>
    </>
}
// HELL FILE I DIDNT FEEL LIKE TYPING PROPERLY

"use client"

import React, { ChangeEvent, useState } from "react"
import MakeBidBtnAuctions from "./makeBidButton"

export default function TuplesDisplay({tuples}:{tuples:any[]}) {

    const activeTuples = tuples.filter(t => Date.parse(t.end_time!) > Date.now() && !t.sold)
    const inactiveTuples = tuples.filter(t => Date.parse(t.end_time!) <= Date.now() || t.sold)
    const [showInactive, setShowInactive] = useState(false)

    function checkChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setShowInactive(e.target.checked)
    }

    return <>
    <label className="inline-flex items-center gap-2">
      <input type="checkbox" name="showSold" checked={showInactive} onChange={checkChangeHandler}/>
      <span className="text-sm">Show ended / sold auctions</span>
    </label>
    <div className="grid border *:border-b [&>*:last-child]:border-b-none [&>*:nth-last-child(2)]:border-b-none [&>*:nth-last-child(5)]:border-none [&>*:nth-last-child(3)]:border-b-none [&>*:nth-last-child(4)]:border-b-none items-center *:py-1 *:px-2" style={{gridTemplateColumns: "auto auto auto auto auto"}}>
        {(showInactive ? inactiveTuples : activeTuples).map(t => (
            <React.Fragment key={t.iid}>
                <p>Name: {t.item_name}</p>
                <p>Ends At: {(new Date(t.end_time!)).toLocaleString().replace(":00 "," ")}</p>
                <p>Current Bid: ${t.max_bid ?? "None"}{t.max_bidder ? ` by ${t.max_bidder}` : ""}</p>
                <p>Sold By: {t.seller_name}</p>
                <MakeBidBtnAuctions iid={t.iid!} name={t.item_name!} current={t.max_bid ?? 0} />
            </React.Fragment>
        ))}
    </div>
    </>
}
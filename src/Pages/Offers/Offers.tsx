import { useEffect, useState } from "react"
import type { IOffer } from "../../Interfaces/IOffer"
import OffersComponent from "../../Components/Offers/OffersComponent"

export default function Offers(){

    const [offers, setOffers] = useState<IOffer[]>([])

    useEffect(() => {
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/offers"].join(""), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then((res: any) => {
            console.log(res)
            setOffers(res.member);
        })
    }, [])
    return <div className="offers">
        {
        <OffersComponent offers={offers} />
        }
    </div>
}
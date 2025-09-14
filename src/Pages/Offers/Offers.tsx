import { useEffect, useState } from "react"
import type { IOffer } from "../../Interfaces/IOffer"
import { Link } from "react-router"
import { findIfUserIsAdmin } from "../../Components/PrivateRoutes/Utils/functions"
import AdminHeader from "../../Components/Headers/AdminHeader"
import UserHeader from "../../Components/Headers/UserHeader"

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
        {findIfUserIsAdmin() ? <AdminHeader /> : <UserHeader />}        
        {offers.map(offer => <Link to={`/offer/${offer.id}`}><div className="offer" key={offer.id}>
            <span className="title">{offer.title}</span>
            <span className="date">{new Date(offer.createdAt).toString()}</span>
            <p className="description">{offer.description}</p>
            <span className="price">{offer.price} €</span>
            <span className="service">{offer.service}</span>
        </div></Link>)
        }
    </div>

}
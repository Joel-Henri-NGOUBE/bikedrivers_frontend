import { useEffect, useState } from "react"
import type { IOffer } from "../../Interfaces/IOffer"
import { Link } from "react-router"
import { findIfUserIsAdmin } from "../../Components/PrivateRoutes/Utils/functions"
import AdminHeader from "../../Components/Headers/AdminHeader"
import UserHeader from "../../Components/Headers/UserHeader"
import "./offers.css"
import { sliceText } from "../../Utils/functions"

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
    return <div className="offers-page">
        {findIfUserIsAdmin() ? <AdminHeader /> : <UserHeader />}  
        <div className="content">
        <span className="pub">Welcome to <b>BikeDrivers</b>. Find out a selection of all types of bikes for sale or for rent</span>
        <div className="offers">
            <div className="offers-wrapper">
                {offers.map(offer => <Link to={`/offer/${offer.id}`}><div className="offer" key={offer.id}>
                    <span className="date">{new Date(offer.createdAt).toLocaleDateString("fr-FR", {year: "numeric", month: "2-digit", day: "2-digit"})}</span>
                    <span className="title">{offer.title}</span>
                    <p className="description">{sliceText(offer.description, 100)}</p>
                    <div>
                        <span className="service" style={
                            offer.service === "LOCATION" 
                            ? {color: 'var(--green-500)', borderColor: 'var(--green-500)'} 
                            : {color: 'var(--blue-300)', borderColor: 'var(--blue-300)'}}>
                            {offer.service}
                        </span>
                        <span className="price">{offer.price} €</span>
                    </div>
                </div></Link>)}
            </div>
        </div>
        </div>
    </div>

}
import { useEffect, useState } from "react"
import type { IOffer } from "../../Interfaces/IOffer"
import { Link } from "react-router"
import { findIfUserIsAdmin } from "../../Components/PrivateRoutes/Utils/functions"
import AdminHeader from "../../Components/Headers/AdminHeader"
import UserHeader from "../../Components/Headers/UserHeader"
import "./offers.css"
import { sliceText, match } from "../../Utils/functions"

export default function Offers(){

    const [offers, setOffers] = useState<IOffer[]>([])

    const [searchPattern, setSearchPattern] = useState<string>("")

    const [resultingOffers, setResultingOffers] = useState<IOffer[]>([])

    // Getting all the existing offers
    useEffect(() => {
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/offers"].join(""), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then((res: any) => {
            setOffers(res.member);
        })
    }, [])


    function handleSetSearchPattern(e: any, offers: IOffer[]){
        const targetValue = e.target.value
        setSearchPattern(targetValue)
        const filteredOffers = offers.filter((o) => 
            match(targetValue, o.description) ||
            match(targetValue, o.status) ||
            match(targetValue, o.price) ||
            match(targetValue, o.service) ||
            match(targetValue, o.title)
        )
        setResultingOffers(filteredOffers)
    }

    return <div className="offers-page">
        {findIfUserIsAdmin() ? <AdminHeader /> : <UserHeader />}  
        <div className="filter">
            <input type="text" className="search" placeholder="Audi 79B2 - SALE - Car..." value={searchPattern} onChange={(e) => handleSetSearchPattern(e, offers)}/>
            {searchPattern && <button className="discard" onClick={() => setSearchPattern("")}>Discard</button>}
        </div>
        <div className="content">
        <span className="pub">Welcome to <b>BikeDrivers</b>. Find out a selection of all types of bikes for sale or for rent</span>
        <div className="offers">
            <div className="offers-wrapper">
                {/* Displays all the offers if there is no search patter and the research result if there is */}
                {(searchPattern ? resultingOffers : offers).map(offer => <Link to={`/offer/${offer.id}`} key={offer.id}><div className="offer" >
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
import { useEffect, useState } from "react";
import type { IOffer } from "../../Interfaces/IOffer";
import { useParams } from "react-router";
import type { Picture } from "../../Interfaces/Picture";

export default function Offer(){

    const [offer, setOffer] = useState<IOffer | null>(null)

    const [pictures, setPictures] = useState<Picture[]>([])

    const { id } = useParams()

    useEffect(() => {
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${id}`].join(""), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then((res: any) => {
                setOffer(res);
            })
        }, [])

    useEffect(() => {
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${id}`].join(""), {
                method: "GET"
            })
            .then(res => res.json())
            .then((res: any) => {
                console.log(res)
                setOffer(res);
            })
        }, [])

    useEffect(() => {
        if(offer){
        const vehicle_id = offer.vehicle.split("/").reverse()[0]
        console.log(vehicle_id)
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/vehicles/${vehicle_id}/pictures`].join(""), {
            method: "GET"
        })
        .then(res => res.json())
        .then((res: any) => {
            console.log(res)
            setPictures(res.member);
        })}
    }, [offer])

    return <div className="offer" key={offer?.id}>
        <span className="title">{offer?.title}</span>
        <span className="date">{offer && new Date(offer.createdAt).toString()}</span>
        <p className="description">{offer?.description}</p>
        <span className="price">{offer?.price} €</span>
        <span className="service">{offer?.service}</span>
        {pictures.map(p => <img src={[`${import.meta.env.VITE_APP_BACKEND_API_URL}`,p.path].join("")} alt={p.path}></img>)}
    </div>
}
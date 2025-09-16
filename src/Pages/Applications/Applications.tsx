import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate, type NavigateFunction } from "react-router";
import type { IOfferElements, IOffersToApplications } from "../../Interfaces/IOffer";
import type { IApplication } from "../../Interfaces/Application";
import { findIfUserIsAdmin } from "../../Components/PrivateRoutes/Utils/functions";
import AdminHeader from "../../Components/Headers/AdminHeader";
import UserHeader from "../../Components/Headers/UserHeader";
import "./applications.css"

export default function Applications(){
    // Faire une requête vers offers qui me renvoie les offres en passant par les véhicules de l'utilisateur
    // Récupérer pour chaque offre les candidatures correspondantes

    const [userId, setUserId] = useState<number>(0)

    const [offersElements, setOffersElements] = useState<IOfferElements[]>([])

    const [offersToApplications, setOffersToApplications] = useState<IOffersToApplications[]>([])

    const navigate: NavigateFunction = useNavigate()

    const token = localStorage.getItem("token")

    useEffect(() => {
        token
        ?
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        mail: (jwtDecode(token) as any).username
                    })
                })
        .then(res => {
                if(res.status.toString().startsWith("4")){
                navigate("/login");
                }
                else{
                return res.json()
                }
        })
        .then((res: {id: number}) => {
            setUserId(res.id)
        })
        : navigate("/login")
    }
    , [])

    useEffect(() => {
        // console.log(token, userId);
        (token && userId) &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/${userId}/offers/elements`].join(""), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
            })
        .then(res => res.json())
        .then((res: IOfferElements[]) => {
            setOffersElements(res);
        })
    }, [userId])

    useEffect(() => {
        // console.log(token, userId);
        token &&
        offersElements.forEach((oe) => {
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${oe.id_offer}/applications/appliers`].join(""), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
            })
        .then(res => res.json())
        .then((res: IApplication[]) => {
            !offersToApplications.length && setOffersToApplications((ota) => [...ota, {offer: oe, applications: []}])
            setOffersToApplications((ota) => ota.map((oa) => 
                        (oa.offer.id_offer === oe.id_offer)
                        ? ({...oa, applications: res})
                        : oa));
        })
    })
    }, [offersElements, offersToApplications.length])
    
    return <div className="applications-page">
        {findIfUserIsAdmin() ? <AdminHeader /> : <UserHeader />}
        <div className="content">
            {offersToApplications.map((ota) => <div className="offer">
                <span className="title">{ota.offer.title}</span>
                <span className="type">{ota.offer.type}</span>
                <span className="brand-model">{`${ota.offer.brand} ${ota.offer.model}`}</span>
                <span className="status">{ota.offer.status}</span>
                <div className="applications">
                    {ota.applications.map((a) => <Link to={`/applications/${a.application_id}/documents`}><div className="application">
                        <span className="name">{`${a.firstname.toUpperCase()} ${a.lastname.toUpperCase()}`}</span>
                        <span className="state">{a.state}</span>
                        <span className="date">{a.application_date}</span>
                    </div></Link>)}
                </div>
            </div>)}
        </div>
    </div>
}
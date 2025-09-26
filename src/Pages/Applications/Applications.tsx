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

    function toggleClass(e: any){
        const attribute = e.currentTarget.nextElementSibling?.getAttribute("class")
        attribute === "applications" ? e.currentTarget.nextElementSibling?.setAttribute("class", "applications disappear") : e.currentTarget.nextElementSibling?.setAttribute("class", "applications")
    }
    
    return <div className="applications-page">
        {findIfUserIsAdmin() ? <AdminHeader /> : <UserHeader />}
        <div className="content">
            {offersToApplications.map((ota) => <div className="offer">
                <div className="top" onClick={(e) => toggleClass(e)}>
                    <span className="title">{ota.offer.title}</span>
                    <div className="bottom">
                        <span className="type">{ota.offer.type}</span>
                        <span className="brand-model">{`${ota.offer.brand} ${ota.offer.model}`}</span>
                    </div>
                </div>
                {/* <span className="status">{ota.offer.status}</span> */}
                <div className="applications disappear">
                    {ota.applications.map((a) => <Link to={`/applications/${a.application_id}/documents`}><div className="application">
                        <span className="name">{`${a.firstname.toUpperCase()} ${a.lastname.toUpperCase()}`}</span>
                        <span className="date">{new Date(a.application_date).toLocaleDateString("fr-FR", {year: "numeric", month: "2-digit", day: "2-digit"}).split("/").reverse().join("-")}</span>
                        <span className="state" style={a.state === "ACCEPTED" ? {color: 'var(--green-500)', borderColor: 'var(--green-500)'} : (a.state === "REJECTED" ? {color: 'var(--red-400)', borderColor: 'var(--red-400)'} : {})}>{a.state}</span>
                    </div></Link>)}
                </div>
            </div>)}
        </div>
    </div>
}
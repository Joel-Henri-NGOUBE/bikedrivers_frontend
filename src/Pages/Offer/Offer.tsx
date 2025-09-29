import { useEffect, useState } from "react";
import type { IOffer } from "../../Interfaces/IOffer";
import { useNavigate, useParams, type NavigateFunction } from "react-router";
import type { IPicture } from "../../Interfaces/Picture";
import { getLastSplittedElement, sliceFileName } from "../../Utils/functions";
import type { IRequiredDocument } from "../../Interfaces/RequiredDocuments";
import type { IAssociateDocumentsId, IDocument } from "../../Interfaces/Document";
import { jwtDecode } from "jwt-decode";
import { findIfUserIsAdmin } from "../../Components/PrivateRoutes/Utils/functions";
import AdminHeader from "../../Components/Headers/AdminHeader";
import UserHeader from "../../Components/Headers/UserHeader";
import "./offer.css"

export default function Offer(){

    const [offer, setOffer] = useState<IOffer | null>(null)

    const [pictures, setPictures] = useState<IPicture[]>([])

    const [requiredDocuments, setRequiredDocuments] = useState<IRequiredDocument[]>([])

    const [documents, setDocuments] = useState<IDocument[]>([])

    const [hasNotApplied, setHasNotApplied] = useState<boolean>(false)

    const [associateDocumentsId, setAssociateDocumentsId] = useState<IAssociateDocumentsId[]>([])

    const [userId, setUserId] = useState<number>(0)

    const navigate: NavigateFunction = useNavigate()

    const token = localStorage.getItem("token")


    const { id } = useParams()

    // Getting the id if exists to verify if the current user is authenticated

    useEffect(() => {
        token
        &&
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
        }
    , [])

    // Getting the informations of the offer to modify
    useEffect(() => {
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${id}`].join(""), {
                method: "GET",
            })
            .then(res => res.json())
            .then((res: any) => {
                setOffer(res);
            })
        }, [])

    // Finding if the authenticated user has already applied to the offer
    useEffect(() => {
            (token && userId) && fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${id}/applications/users/${userId}/hasApplied`].join(""), {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
            .then((res: any) => {
                setHasNotApplied(!res.hasApplied);
            });
            !token && setHasNotApplied(false)
        }, [userId])

    // Finding all the required documents attached to the offer
    useEffect(() => {
            hasNotApplied && fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${id}/required_documents`].join(""), {
                method: "GET"
            })
            .then(res => res.json())
            .then((res: any) => {
                setRequiredDocuments(res.member);
                setAssociateDocumentsId(res.member.map((rd: IRequiredDocument) => ({
                    requiredDocumentId: rd.id,
                    documentId: 0
                })))
            })
        }, [hasNotApplied])

    // Getting the images pictures
    useEffect(() => {
        if(offer){
        const vehicle_id = getLastSplittedElement(offer.vehicle)
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/vehicles/${vehicle_id}/pictures`].join(""), {
            method: "GET"
        })
        .then(res => res.json())
        .then((res: any) => {
            setPictures(res.member);
        })}
    }, [offer])

    // Retrieving all the users documents in order to permit him to apply
    useEffect(() => {
            (hasNotApplied && userId && token) && fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/${userId}/documents`].join(""), {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then((res: any) => {
                setDocuments(res.member);
            })
        }, [userId, hasNotApplied])

    /**
     * Creates an application on the server
     * @param associateDocumentsIdArray an array which associates required documents with documents
     * @param offerId The id of the offer
     */
    async function sendApplication(associateDocumentsIdArray: IAssociateDocumentsId[], offerId: number | undefined){
        /**
         * Calculates the sum of documentIds, if being 0, it means that a document is not specified for a required document,
         * so the request won't be sent
         */
        const isADocumentAssociated = associateDocumentsIdArray.reduce((acc, cur) => acc * cur.documentId, 1);
        isADocumentAssociated && associateDocumentsIdArray.forEach(async (adi) =>  {
           await fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/required_documents/${adi.requiredDocumentId}/documents/${adi.documentId}/match_documents`].join(""), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                requiredDocument: `api/requiredDocuments/${adi.requiredDocumentId}`,
                document: `api/documents/${adi.documentId}`
            })
        });
        (isADocumentAssociated && offerId) && await fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${offerId}/applications`].join(""), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                offer: `api/offers/${offerId}`,
                documents: associateDocumentsIdArray.map((adi) => `api/documents/${adi.documentId}`)
            })
        })
        })
        setHasNotApplied(false)
    }

    return <div className="offer-page" key={offer?.id}>
        {findIfUserIsAdmin() ? <AdminHeader /> : <UserHeader />}
        <div className="content">
            <div className="top">
                <div>
                    <span className="title">{offer?.title}</span>
                    <span className="date">publiée le {offer && new Date(offer.createdAt).toLocaleDateString("fr-FR", {year: "numeric", month: "2-digit", day: "2-digit"}).split("/").reverse().join("/")}</span>
                </div>
                <span className="status">STATUS: <b style={offer?.status === "AVAILABLE" ? {color: 'var(--green-500)'} : (offer?.status === "TRANSACTED" ? {color: 'var(--blue-400)'} : {color: 'var(--black-500)'})}>{offer?.status}</b></span>
                <div>
                    <span className="service" style={offer?.service === "LOCATION" ? {color: 'var(--green-500)', borderColor: 'var(--green-500)'} : {color: 'var(--blue-300)', borderColor: 'var(--blue-300)'}}>{offer?.service}</span>
                    <span className="price">{offer?.price} €</span>
                </div>
                <p className="description">{offer?.description}</p>
            </div>
            <div className="pictures">
                {pictures.map(p => <img src={[`${import.meta.env.VITE_APP_BACKEND_API_URL}`,p.path].join("")} alt={p.path} width="350px" height="250px" key={p.id}></img>)}
            </div>
            <button className="apply">{hasNotApplied ? "Apply to this offer" : "Already applied to this offer"}</button>
            { hasNotApplied && <div className="requiredDocuments">
                {requiredDocuments?.map((rd) => <div className="requiredDocument" key={rd.id}>
                    <label htmlFor="name">{rd.name}</label>
                    <p className="informations">{rd.informations}</p>
                    {documents.map((d) => <div className="document" key={d.id} onClick={() => hasNotApplied && setAssociateDocumentsId((adi) => adi.map((di) => di.requiredDocumentId === rd.id ? ({...di, documentId: d.id}) : di))}>
                        <img src="/file.png" alt={getLastSplittedElement(d.path)} width="35px"/>
                        <span className="path">{sliceFileName(getLastSplittedElement(d.path), 30)}</span>
                    </div>
                    )}
                </div>)}
                <button className="sendApplication" onClick={() => sendApplication(associateDocumentsId, offer?.id)}>Send application</button>
            </div>}
        </div>
    </div>
}
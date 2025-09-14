import { useEffect, useState } from "react";
import type { IOffer } from "../../Interfaces/IOffer";
import { useNavigate, useParams, type NavigateFunction } from "react-router";
import type { IPicture } from "../../Interfaces/Picture";
import { getLastSplittedElement } from "../../Utils/functions";
import type { IRequiredDocument } from "../../Interfaces/RequiredDocuments";
import type { IAssociateDocumentsId, IDocument } from "../../Interfaces/Document";
import { jwtDecode } from "jwt-decode";
import InputSelect from "../../Components/InputSelect";
import { findIfUserIsAdmin } from "../../Components/PrivateRoutes/Utils/functions";
import AdminHeader from "../../Components/Headers/AdminHeader";
import UserHeader from "../../Components/Headers/UserHeader";

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
            console.log(jwtDecode(token))
        })
        }
    , [])

    useEffect(() => {
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${id}`].join(""), {
                method: "GET"
            })
            .then(res => res.json())
            .then((res: any) => {
                setOffer(res);
            })
        }, [])

    useEffect(() => {
            userId && fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${id}/applications/users/${userId}/hasApplied`].join(""), {
                method: "GET"
            })
            .then(res => res.json())
            .then((res: any) => {
                setHasNotApplied(!res.hasApplied);
            })
        }, [userId])

    useEffect(() => {
        console.log(hasNotApplied)
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

    useEffect(() => {
        if(offer){
        const vehicle_id = getLastSplittedElement(offer.vehicle)
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

    useEffect(() => {
            (hasNotApplied && userId) && fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/${userId}/documents`].join(""), {
                method: "GET"
            })
            .then(res => res.json())
            .then((res: any) => {
                setDocuments(res.member);
            })
        }, [userId, hasNotApplied])

    async function sendApplication(associateDocumentsIdArray: IAssociateDocumentsId[], offerId: number | undefined){
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
        // .then(res => res.json())
        // .then((res: any) => {
        //     console.log(res)
        //     setPictures(res.member);
        // }) 
        })
    }

    // function associateDocuments(requiredDocumentsCount, )

    return <div className="offer" key={offer?.id}>
        {findIfUserIsAdmin() ? <AdminHeader /> : <UserHeader />}
        {/* {`${console.log(jwtDecode(token ? token : ""))}`}
        {`Apparais`} */}
        <div className="top">
            <span className="title">{offer?.title}</span>
            <span className="date">{offer && new Date(offer.createdAt).toString()}</span>
            <p className="description">{offer?.description}</p>
            <span className="price">{offer?.price} €</span>
            <span className="service">{offer?.service}</span>
            <button onClick={() => {}} className="apply">{hasNotApplied ? "Apply to offer" : "Already applied"}</button>
        </div>
        { hasNotApplied && <div className="requiredDocuments">
            {requiredDocuments?.map((rd) => <div className="requiredDocument">
                <label htmlFor="name">{rd.name}</label>
                <p className="informations">{rd.informations}</p>
                {documents.map((d) => <div className="document" onClick={() => hasNotApplied && setAssociateDocumentsId((adi) => adi.map((di) => di.requiredDocumentId === rd.id ? ({...di, documentId: d.id}) : di))}>
                    <img src="/file.png" alt={getLastSplittedElement(d.path)} width="35px"/>
                    <span className="path">{getLastSplittedElement(d.path)}</span>
                </div>
                )}
            </div>)}
            <button className="sendApplication" onClick={() => sendApplication(associateDocumentsId, offer?.id)}>Send application</button>
        </div>}
        <div className="pictures">
            {pictures.map(p => <img src={[`${import.meta.env.VITE_APP_BACKEND_API_URL}`,p.path].join("")} alt={p.path}></img>)}
        </div>
    </div>
}
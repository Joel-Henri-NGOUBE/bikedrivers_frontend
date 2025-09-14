import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate, useParams, type NavigateFunction } from "react-router"
import type { IDocumentElements } from "../../Interfaces/Document"
import { getLastSplittedElement } from "../../Utils/functions"

export default function Documents(){

    const { applicationId } = useParams()

    const [userId, setUserId] = useState<number>(0)

    const [documentsElements, setDocumentsElements] = useState<IDocumentElements[]>([])

    const navigate: NavigateFunction = useNavigate()

    const token = localStorage.getItem("token")

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

    useEffect(() => {
        // console.log(token, userId);
        (token && applicationId) &&
        fetchDocumentsElements(applicationId)
    }, [userId])

    async function fetchDocumentsElements(applicationId: string){{
        await fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/applications/${applicationId}/documents/elements`].join(""), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            })
            .then(res => res.json())
            .then((res: IDocumentElements[]) => {
                setDocumentsElements(res);
                console.log(res)
            })
    }}

    async function handleAccept(offerId: number, applicationId: string | undefined){
        if(offerId && applicationId){
            await fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${offerId}/applications/${applicationId}`].join(""), {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        state: "ACCEPTED"
                    })
            })
            fetchDocumentsElements(applicationId)
        }
    }

    async function handleReject(offerId: number, applicationId: string | undefined){
        if(offerId && applicationId){
            await fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${offerId}/applications/${applicationId}`].join(""), {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        state: "REJECTED"
                    })
            })
            fetchDocumentsElements(applicationId)
        }
    }

    return <div className="documents">
        {/* {application_id} */}
        <div className="head">
            <span >
               {documentsElements[0]?.title}
            </span>
            <span >
               {`${documentsElements[0]?.brand} ${documentsElements[0]?.model}`}
            </span>
            <span >
               {documentsElements[0]?.application_state}
            </span>
        </div>
        {documentsElements?.map((de) => <div className="document">
            <span className="name">{de.name}</span>
            <span className="informations">{de.informations}</span>
            <a href={[`${import.meta.env.VITE_APP_BACKEND_API_URL}`, de.path].join("")} target="_blank">
                <div className="doc">
                    <img src="/file.png" alt="file" width="35px" />
                    <span className="path">{getLastSplittedElement(de.path)}</span>
                    <span className="state">{de.state}</span>
                    <div className="actions">
                    </div>
                </div>
            </a>
            {/* <img src="/valid.svg" alt="valid" width="30px" onClick={() => handleValidateDocument()}/>
            <img src="/invalid.png" alt="invalid" width="30px" onClick={() => handleInvalidateDocument()}/> */}
        </div>)}
        <button className="accept" onClick={() => handleAccept(documentsElements[0]?.offer_id, applicationId)}>Validate the application</button>
        <button className="deny" onClick={() => handleReject(documentsElements[0]?.offer_id, applicationId)}>Reject the application</button>
    </div>
}
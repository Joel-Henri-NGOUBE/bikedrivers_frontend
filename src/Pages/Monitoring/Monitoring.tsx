import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate, type NavigateFunction } from "react-router"
import Documents from "../../Components/Monitoring/Documents"
import type { IDocument } from "../../Interfaces/Document"
import AppliedOffers from "../../Components/Monitoring/AppliedOffers"
import type { IAppliedOffer } from "../../Interfaces/IOffer"
import AdminHeader from "../../Components/Headers/AdminHeader"
import UserHeader from "../../Components/Headers/UserHeader"
import { findIfUserIsAdmin } from "../../Components/PrivateRoutes/Utils/functions"
import "./monitoring.css"

export default function Monitoring(){

    const [userId, setUserId] = useState<number>(0)
    
    const [documents, setDocuments] = useState<IDocument[]>([])

    const [uploadedDocument, setUploadedDocument] = useState<File | null>(null)

    const [appliedOffers, setAppliedOffers] = useState<IAppliedOffer[]>([])

    const navigate: NavigateFunction = useNavigate()

    const token = localStorage.getItem("token")
        
    // Getting the id if exists to verify if the current user is authenticated
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
        fetchDocuments(userId)
    }, [userId])

    // fFetching all the offers to which the user applied
    useEffect(() => {
        (token && userId) &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/${userId}/offers/applied`].join(""), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
            })
            .then(res => res.json())
            .then((res: IAppliedOffer[]) => {
                setAppliedOffers(() => res);
            })
    }, [userId])

    /**
     * Gets all the users' documents
     * @param userId The id of the authenticated user
     */
    async function fetchDocuments(userId: number){
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/${userId}/documents`].join(""), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            })
            .then(res => res.json())
            .then((res: any) => {
                setDocuments(() => res.member);
            })
    }

    /**
     * Sends documents to the server for the user
     * @param userId The id of the authenticated user
     * @param uploadedDocument The document that has been uploaded
     */
    async function handleDocumentSending(userId: number, uploadedDocument: File | null){
        if(uploadedDocument){
        let formData = new FormData()
        formData.append('file' , uploadedDocument)
        await fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/${userId}/documents`].join(""), {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })
        .then(res => res.json())

        fetchDocuments(userId)
    }
    }

    return <div className="monitoring-page">
        {findIfUserIsAdmin() ? <AdminHeader /> : <UserHeader />}
        <div className="content">
            <div className="addDocument">
                <h2>Add document</h2>
                <input type="file" onChange={(e) => setUploadedDocument(e.target.files ? e.target.files[0]: null)}/>
                <button onClick={() => handleDocumentSending(userId, uploadedDocument)}>Send Document</button>
            </div>
            <div className="bottom">
                <Documents 
                documents={documents}/>
                <AppliedOffers
                appliedOffers={appliedOffers}
                />
            </div>
        </div>
    </div>
}
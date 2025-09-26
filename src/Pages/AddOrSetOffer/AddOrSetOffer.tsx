import { useEffect, useState } from "react";
import type { IOffer } from "../../Interfaces/IOffer";
import { Link, useLocation, useNavigate, useParams, type NavigateFunction } from "react-router";
import { jwtDecode } from "jwt-decode";
import InputLabel from "../../Components/Inputs/InputLabel";
import InputSelect from "../../Components/Inputs/InputSelect";
import type { IVehicle } from "../../Interfaces/Vehicle";
import { getLastSplittedElement } from "../../Utils/functions";
import type { IRequiredDocument } from "../../Interfaces/RequiredDocuments";
import RequiredDocuments from "../../Components/RequiredDocuments/RequiredDocuments";
import { findIfUserIsAdmin } from "../../Components/PrivateRoutes/Utils/functions";
import AdminHeader from "../../Components/Headers/AdminHeader";
import UserHeader from "../../Components/Headers/UserHeader";
import "./addorsetoffer.css"

export default function AddOrSetOffer(){

    const [offer, setOffer] = useState<IOffer | null>(null)

    const [offers, setOffers] = useState<IOffer[]>([])

    const [requiredDocumentsCount, setRequiredDocumentsCount] = useState<number>(1)

    const [requiredDocuments, setRequiredDocuments] = useState<IRequiredDocument[]>([{
        id: 1,
        name: "",
        informations: ""
    }])

    const location = useLocation()

    const [vehicles, setVehicles] = useState<IVehicle[] | null>(null)

    const [userId, setUserId] = useState<number>(0)

    const [vehicleId, setVehicleId] = useState<number>(0)

    const { id } = useParams()

    const form = {
        title: "",
        description: "",
        vehicle: "",
        service: "",
        price: "",
    }
    const [formValues, setFormValues] = useState<typeof form>(form)

    const navigate: NavigateFunction = useNavigate()

    const token = localStorage.getItem("token")
        
    // Getting the id to verify is the current user is authenticated
    
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
            fetchOffers()
        }, [])

    useEffect(() => {
        (token && id) &&
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${id}`].join(""), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.status === 404 && parseInt(id) !== offer?.id ? navigate("/offers") : res.json()
            )
            .then((res: IOffer) => {
                setOffer(res);
                setFormValues({...formValues,
                    title: res.title,
                    description: res.description,
                    service: res.service,
                    price: res.price
                })
            })
            !id && setFormValues((fv) => ({...fv, service: "LOCATION"}))
        }, [location.key])

    useEffect(() => {
        (token && id) &&
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${id}/required_documents`].join(""), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then((res: any) => {
                setRequiredDocuments(res.member)
            })
    }, [location.key])

    useEffect(() => {
        (token && userId) &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/${userId}/vehicles`].join(""), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then((res: any) => {
            setVehicles(res.member);
            if(offer?.vehicle){
                const vehicleId = getLastSplittedElement(offer?.vehicle)
                setVehicleId(vehicleId ? parseInt(vehicleId) : 0)
                setFormValues({...formValues, vehicle: res.member.filter((v: any) => v.id === vehicleId)})
            }
            setVehicleId(res.member[0].id)
        })
    }, [userId, offer?.vehicle])

    
    async function fetchOffers(){
        await fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers`].join(""), {
                method: "GET",
            })
        .then(res => res.json())
        .then((res: any) =>
            setOffers(() => res.member)
        )
}

    async function addOrSetOffer(formValues: typeof form, requiredDocuments: IRequiredDocument[], vehicleId: number){
        if(!id){
            const isANameGiven = requiredDocuments.reduce((acc, cur) => acc + cur.name, "")
            if(vehicleId && isANameGiven){
                const offer: IOffer = await fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/", userId, "/vehicles/", vehicleId,"/offers"].join(""), {
                            method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: formValues.title,
                        description: formValues.description,
                        service: formValues.service,
                        price: parseFloat(formValues.price),
                        user: `api/users/${userId}`,
                        vehicle: `api/vehicles/${vehicleId}`,
                    })
                })
                .then(res => {
                    return res.json()
                })

                requiredDocuments?.forEach((rd) => 
                rd.name &&
                fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/offers/", offer.id, "/required_documents"].join(""), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(rd.informations 
                        ? ({
                            name: rd.name,
                            informations: rd.informations,
                            offer: `api/offers/${offer.id}`
                        })
                        : ({
                            name: rd.name,
                            offer: `api/offers/${offer.id}`
                        })
                    )
                    })
                .then(res => res.json())
                )
                fetchOffers()
            }
        }
        else{
            if(vehicleId){
                fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/", userId, "/vehicles/", vehicleId, "/offers/", id].join(""), {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: formValues.title,
                        description: formValues.description,
                        service: formValues.service,
                        price: parseFloat(formValues.price),
                    })
                })
                .then(res => res.json())
                requiredDocuments?.forEach((rd) => 
                    rd.name &&
                    fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/offers/", id, "/required_documents/", rd.id].join(""), {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/merge-patch+json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify(rd.informations 
                            ? ({
                                name: rd.name,
                                informations: rd.informations
                            })
                            : ({
                                name: rd.name
                            })
                        )
                        })
                    .then(res => res.json())
                    )
                    fetchOffers()
                    fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/offers/", id, "/required_documents"].join(""), {
                                method: "GET",
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                },
                            })
                        .then(res => res.json())
                        .then(res => setRequiredDocuments(res.member))
            }
        }
    }

    async function deleteOffer(offerId: number){
        await fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/offers/", offerId].join(""), {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        id && setOffers((o) => o.filter((offer) => offer.id !== offerId))
        fetchOffers()
    }

    return <div className="addorsetoffer-page">

        {findIfUserIsAdmin() ? <AdminHeader /> : <UserHeader />}

        <div className="content">
            <div className="inputs">
                <InputLabel 
                label="Title"
                placeholder=""
                type=""
                inputValue={formValues.title}
                handleChange={(e) => setFormValues({...formValues, title: e.target.value})}
                />

                <InputLabel 
                label="Description"
                placeholder=""
                type=""
                inputValue={formValues.description}
                handleChange={(e) => setFormValues({...formValues, description: e.target.value})}
                />

                <div className="inputselect">
                    <label htmlFor="vehicle">Vehicle</label>
                    <select name="vehicle" id="vehicle" value={formValues.vehicle} onChange={(e) => setFormValues({...formValues, vehicle: e.target.value})}>
                        {/* Définir vehicle ID pour chaque option */}
                        {vehicles?.map((v, index) => {
                            return <option value={`${v.model.toUpperCase()} ${v.brand.toUpperCase()}`} key={index} onChange={() => setVehicleId(v.id)}>{`${v.model.toUpperCase()} ${v.brand.toUpperCase()}`}</option>})}
                    </select>
                </div>

                <InputSelect
                label="Service"
                options={["LOCATION", "SALE"]}
                inputValue={formValues.service}
                handleChange={(e) => setFormValues({...formValues, service: e.target.value})}
                />

                <InputLabel 
                label="Price"
                placeholder="Insert how much your service costs"
                type="number"
                inputValue={formValues.price}
                handleChange={(e) => setFormValues({...formValues, price: e.target.value})}
                />

                <RequiredDocuments
                requiredDocuments={requiredDocuments}
                setRequiredDocuments={setRequiredDocuments}
                requiredDocumentsCount={requiredDocumentsCount}
                setRequiredDocumentsCount={setRequiredDocumentsCount}
                />

                <button onClick={() => addOrSetOffer(formValues, requiredDocuments, vehicleId)}>Add Offer</button>
            </div>

            <div className="offers">
                {offers?.map((o) => <div className="offer-wrapper"><Link to={`/offers/${o.id}`}><div className="offer">
                    <span className="title">{o.title}</span>
                    <div className="top">
                        <span className="service" style={o.service === "LOCATION" ? {color: 'var(--green-500)', borderColor: 'var(--green-500)'} : {color: 'var(--blue-300)', borderColor: 'var(--blue-300)'}}>{o.service}</span>
                        {/* <span className="title">{o.status}</span> */}
                        <span className="price">{o.price} €</span>
                    </div>
                </div></Link>
                    <button className="delete" onClick={() => deleteOffer(o.id)}>Delete offer</button>
                </div>)}
            </div>
        </div>

    </div>
}
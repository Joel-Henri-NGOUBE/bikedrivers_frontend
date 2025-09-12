import { useEffect, useState } from "react";
import type { IOffer } from "../../Interfaces/IOffer";
import { useNavigate, useParams, type NavigateFunction } from "react-router";
import { jwtDecode } from "jwt-decode";
import InputLabel from "../../Components/InputLabel";
import InputSelect from "../../Components/InputSelect";
import type { IVehicle } from "../../Interfaces/Vehicle";

export default function AddOrSetOffer(){

    const [offer, setOffer] = useState<IOffer | null>(null)

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
                navigate("/");
             }
             else{
                // console.log("Hey")
                return res.json()
             }
        })
        .then((res: {id: number}) => {
            setUserId(res.id)
            // console.log(res.id)
        })
        }
    , [])

    useEffect(() => {
        (token && id) &&
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${id}`].join(""), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then((res: IOffer) => {
                // console.log(res)
                setOffer(res);
                setFormValues({...formValues,
                    title: res.title,
                    description: res.description,
                    service: res.service,
                    price: res.price
                })
            })
        }, [])

    useEffect(() => {
        // console.log(token, userId);
        (token && userId) &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/${userId}/vehicles`].join(""), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then((res: any) => {
            setVehicles(res.member);
            // console.log(offer)
            // Mettre l'id du vehicule s'il n'y a pas d'offre
            if(offer?.vehicle){
                const vehicleId = offer?.vehicle.split("/").reverse()[0]
                // console.log(offer?.vehicle)
                setVehicleId(vehicleId ? parseInt(vehicleId) : 0)
                setFormValues({...formValues, vehicle: res.member.filter((v: any) => v.id === vehicleId)})
                console.log("vehicle set", vehicleId)
            }
        })
    }, [userId, offer?.vehicle])

    function addOrSetOffer(formValues: typeof form, navigate: Function){
        console.log(userId, vehicleId)
        if(!id){
            vehicleId && fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/", userId, "/vehicles/", vehicleId,"/offers"].join(""), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            title: formValues.title,
                            description: formValues.description,
                            service: formValues.service,
                            price: formValues.price,
                        })
                    })
            .then(res => {
                res.status === 200 && navigate()
            })
        }
        else{
            vehicleId && fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/", userId, "/vehicles/", vehicleId, "/offers/", id].join(""), {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/merge-patch+json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            title: formValues.title,
                            description: formValues.description,
                            service: formValues.service,
                            price: formValues.price,
                        })
                    })
            .then(res => {
                res.status === 200 && navigate()
            })}
    }

    return <div className="addorsetoffer">
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
                    return <option value={`${v.model.toUpperCase()} ${v.brand.toUpperCase()}`} key={index} onChange={() => {setVehicleId(v.id); console.log(v.id) }}>{`${v.model.toUpperCase()} ${v.brand.toUpperCase()}`}</option>})}
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

        <button onClick={() => addOrSetOffer(formValues, () => navigate("/offers"))}>Add Offer</button>

    </div>
}
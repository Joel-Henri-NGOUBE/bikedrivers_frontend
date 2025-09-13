import { useEffect, useState } from "react"
import VehiclesList from "../../Components/Vehicles/VehiclesList"
import type { IVehicle, IVehicleForm, IVehicleToPictures } from "../../Interfaces/Vehicle"
import { useNavigate, type NavigateFunction } from "react-router"
import { jwtDecode } from "jwt-decode"
import VehicleForm from "../../Components/Vehicles/VehicleForm"

export default function Vehicles(){

    const [vehicles, setVehicles] = useState<IVehicle[]>([])

    const [vehicleId, setVehicleId] = useState<number>(0)

    const [uploadedPicture, setUploadedPicture] = useState<File | null>(null)

    const form = {
        brand: "",
        model: "",
        type: "",
        purchasedAt: "",
    }

    const [vehicleForm, setVehicleForm] = useState<IVehicleForm>(form)

    const [userId, setUserId] = useState<number>(0)

    const [isPictureUploaded, setIsPictureUploaded] = useState<boolean>(false)

    // const [vehicleId, setVehicleId] = useState<number>(0)

    const [vehiclesToPictures, setVehiclesToPictures] = useState<IVehicleToPictures[]>([])


    // const form = {
    //     title: "",
    //     description: "",
    //     vehicle: "",
    //     service: "",
    //     price: "",
    // }
    // const [formValues, setFormValues] = useState<typeof form>(form)

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
                return res.json()
             }
        })
        .then((res: {id: number}) => {
            setUserId(res.id)
        })
        }
    , [])

    // useEffect(() => {
    //     token &&
    //         fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/offers/${id}`].join(""), {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         })
    //         .then(res => res.json())
    //         .then((res: IOffer) => {
    //             // console.log(res)
    //             setOffer(res);
    //             setFormValues({...formValues,
    //                 title: res.title,
    //                 description: res.description,
    //                 service: res.service,
    //                 price: res.price
    //             })
    //         })
    //     }, [])

    useEffect(() => {
        // console.log(token, userId);
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
        })
    }, [userId])

    useEffect(() => {
        vehicles?.forEach((v) => {
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/", userId, "/vehicles/", v.id,"/pictures"].join(""), {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
            .then(res => res?.json())
            .then(res => {
                setVehiclesToPictures((vtp) => [...vtp, {vehicleId: v.id, pictures: res.member}])
            })
            })
        }, [userId, vehicles])

    function addVehicle(vehicleId: number, uploadedPicture: File | null, vehicleForm: IVehicleForm){
        console.log(vehicleId)
        if(vehicleId){
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/${userId}/vehicles/${vehicleId}`].join(""), {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(vehicleForm)
            })
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
            })
            if(uploadedPicture){
                let formData = new FormData()
                formData.append('file' ,uploadedPicture)
                fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/${userId}/vehicles/${vehicleId}/pictures`].join(""), {
                        method: "POST",
                        headers: {
                            // "Content-Type": `multipart/form-data; charset=utf-8; boundary=${Math.random().toString()}`,
                            "Authorization": `Bearer ${token}`
                        },
                        body: formData
                    })
                .then(res => res.json())
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
                })
            }
        }else{
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/${userId}/vehicles`].join(""), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(vehicleForm)
                })
            .then(res => res.json())}
        // .then((res: {id: number}) => {
        //     setUserId(res.id)
        // })
    }

    // function handleSetVehicle(id: number, vehicleForm: IVehicleForm){
    //     setVehicleId(id)
    //     setVehicleForm(vehicleForm)
    // }

    return <div className="vehicles">

        <VehicleForm 
        vehicleForm={vehicleForm}
        setVehicleForm={setVehicleForm}
        isPictureUploaded={isPictureUploaded}
        setIsPictureUploaded={setIsPictureUploaded}
        addVehicle={() => addVehicle(vehicleId, uploadedPicture, vehicleForm)}
        setUploadedPicture={setUploadedPicture}
        vehicleId={vehicleId}
        />

        {/* {`${console.log(vehicleForm)}`} */}
        <VehiclesList 
        vehicles={vehicles}
        vehiclesToPictures={vehiclesToPictures}
        setVehicleId={setVehicleId}
        setVehicleForm={setVehicleForm}
        />
    </div>
}
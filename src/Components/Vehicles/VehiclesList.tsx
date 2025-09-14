import type { IVehicle, IVehicleForm, IVehicleListProp } from "../../Interfaces/Vehicle";

export default function VehiclesList({vehicles, vehiclesToPictures, setVehicleId, setVehicleForm, handleDelete}: IVehicleListProp){
    function handleSetVehicle(id: number, vehicleForm: IVehicleForm){
        setVehicleId(id)
        setVehicleForm(vehicleForm)
    }
    return <div className="vehicles-list">
        {vehicles.map((v) => 
        <div className="vehicle-wrapper">
            <div className="vehicle" onClick={() => handleSetVehicle(v.id, {type: v.type, model: v.model, brand: v.brand, purchasedAt: v.purchasedAt})}>
                <span>{`${v.brand} ${v.model}`}</span>
                <span>{v.type}</span>
                <span className="purchasedDate">{v.purchasedAt}</span>
                <div className="pictures">
                    {vehiclesToPictures?.filter((vtp) => vtp.vehicleId === v.id)[0]?.pictures?.map((p) => <img src={[`${import.meta.env.VITE_APP_BACKEND_API_URL}`,p.path].join("")} alt={p.path} width="40px"></img>)}
                </div>
            </div>
            <button className="delete" onClick={() => handleDelete(v.id)}>Delete Vehicle</button>
        </div>
        )}
        
    </div>
}
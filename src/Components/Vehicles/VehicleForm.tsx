import type { IVehicleForm, IVehicleFormProp } from "../../Interfaces/Vehicle";
import { formateDate } from "../../Utils/functions"
import InputLabel from "../Inputs/InputLabel";

export default function VehicleForm({vehicleForm, setVehicleForm, form, vehicleId, setVehicleId, addVehicle, setUploadedPicture}: IVehicleFormProp){
    /**
     * Modifies vehicles' information
     * @param id The vehicle id
     * @param vehicleForm The input values of the form
     */
    function handleUnsetVehicle(form: IVehicleForm){
        setVehicleId(0)
        setVehicleForm(form)
    }
    return <div className="vehicle-form">
        <InputLabel 
        label="Type"
        placeholder="Voiture"
        type="text"
        inputValue={vehicleForm.type}
        handleChange={(e) => setVehicleForm((vf: IVehicleForm) => ({...vf, type: e.target.value}))}
        />

        <InputLabel 
        label="Brand"
        placeholder="Renault"
        type="text"
        inputValue={vehicleForm.brand}
        handleChange={(e) => setVehicleForm((vf: IVehicleForm) => ({...vf, brand: e.target.value}))}
        />

        <InputLabel 
        label="Model"
        placeholder="Clio 5"
        type="text"
        inputValue={vehicleForm.model}
        handleChange={(e) => setVehicleForm((vf: IVehicleForm) => ({...vf, model: e.target.value}))}
        />

        <div className="purchasedDate">
            <label htmlFor="date">Date d'achat</label>
            <input type="date" name="date" id="date" placeholder="19/06/2026" value={formateDate(vehicleForm.purchasedAt)} onChange={(e) => setVehicleForm((vf: IVehicleForm) => ({...vf, purchasedAt: e.target.value}))}/>
        </div>

        {vehicleId ? <div className="imageField">
            <label htmlFor="file">Image</label>
            <input type="file" name="file" id="file" onChange={(e) => setUploadedPicture(e.target.files ? e.target.files[0] : null)}/>
        <button className="cancelChange" onClick={() => handleUnsetVehicle(form)}>Cancel Modification</button>
        </div> : ""}
        <button className="addVehicle" onClick={() => addVehicle()}>{vehicleId ? "Set": "Add"} vehicle</button>
    </div>
}
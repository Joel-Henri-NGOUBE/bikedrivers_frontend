import type { Dispatch, SetStateAction } from "react"
import type { Picture } from "./Picture"

export interface IVehicleForm{
    type: string,
    brand: string,
    model: string,
    purchasedAt: string
}

export interface IVehicle extends IVehicleForm{
    id: number,
    type : string,
    model : string,
    brand : string,
    addedAt: string,
    updatedAt: string,
    purchasedAt : string
    user: string
    offers: string[],
    pictures: string[]
}
export interface IVehicleToPictures{
    vehicleId: number,
    pictures: Picture[]
}

export interface IVehicleListProp{
    vehicles: IVehicle[],
    vehiclesToPictures: IVehicleToPictures[],
    setVehicleId: Dispatch<SetStateAction<number>>,
    setVehicleForm: Dispatch<SetStateAction<IVehicleForm>>,
}

export interface IVehicleFormProp{
    vehicleForm: IVehicleForm, 
    setVehicleForm: Dispatch<SetStateAction<IVehicleForm>>, 
    isPictureUploaded: boolean, 
    setIsPictureUploaded: Dispatch<SetStateAction<boolean>>,
    setUploadedPicture: Dispatch<SetStateAction<File | null>>,
    vehicleId: number,
    addVehicle: Function
}


import type { Dispatch, SetStateAction } from "react"
import type { IPicture } from "./Picture"

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
    pictures: IPicture[]
}

export interface IVehicleListProp{
    vehicles: IVehicle[],
    handleDelete: Function
    vehiclesToPictures: IVehicleToPictures[],
    setVehicleId: Dispatch<SetStateAction<number>>,
    setVehicleForm: Dispatch<SetStateAction<IVehicleForm>>,
}

export interface IVehicleFormProp{
    vehicleForm: IVehicleForm, 
    form: IVehicleForm, 
    setVehicleForm: Dispatch<SetStateAction<IVehicleForm>>, 
    isPictureUploaded: boolean, 
    setIsPictureUploaded: Dispatch<SetStateAction<boolean>>,
    setVehicleId: Dispatch<SetStateAction<number>>,
    setUploadedPicture: Dispatch<SetStateAction<File | null>>,
    vehicleId: number,
    addVehicle: Function
}


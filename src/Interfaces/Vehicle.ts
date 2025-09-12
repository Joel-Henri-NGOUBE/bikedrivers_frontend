export interface IVehicle{
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
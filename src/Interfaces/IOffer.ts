export interface IOffer{
    id: number,
    status: "AVAILABLE" | "TRANSACTED" | "INACTIVE",
    description: string
    createdAt: string,
    updatedAt: string,
    vehicle: string,
    comments: string[],
    applications: string[],
    messages: string[],
    requiredDocuments: string[],
    title: string,
    price: string,
    service: "LOCATION" | "SALE"
}

export interface IAppliedOffer{
    title: string,
    model: string,
    brand: string,
    id_offer: number,
    status: string,
    state: string,
    application_date: string
}

export interface IAppliedOffersProp{
    appliedOffers: IAppliedOffer[]
}
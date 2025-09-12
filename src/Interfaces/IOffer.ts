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
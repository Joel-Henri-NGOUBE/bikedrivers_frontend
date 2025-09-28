import type { ChangeEvent, Dispatch, SetStateAction } from "react"

export interface IRequiredDocument{
    id: number,
    name: string,
    informations: string
}

export interface IRequiredDocumentsProp{
    requiredDocumentsCount: number
    setRequiredDocumentsCount: Dispatch<SetStateAction<number>>
    requiredDocuments: IRequiredDocument[]
    setRequiredDocuments: Dispatch<SetStateAction<IRequiredDocument[]>>
}

export interface IReaquiredDocumentProp {
    handleChange1(event: ChangeEvent<HTMLInputElement>): void,
    handleChange2(event: ChangeEvent<HTMLInputElement>): void,
    name: string,
    informations?: string
}
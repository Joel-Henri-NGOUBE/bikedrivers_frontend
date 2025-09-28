export interface IDocument{
    id: number,
    path: string,
    addedAt: string,
    updatedAt: string,
    user: string
}

export interface IDocumentProp{
    documents: IDocument[]
}

export interface IDocumentElements{
    path: string,
    state: string,
    name: string,
    informations: string,
    title: string,
    brand: string,
    model: string
    offer_id: number,
    application_state: string
}

export interface IAssociateDocumentsId{
    documentId: number,
    requiredDocumentId: number,
}
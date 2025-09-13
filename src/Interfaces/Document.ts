export interface IDocument{
    id: number,
    path: string,
    addedAt: string,
    updatedAt: string,
    user: number
}

export interface IDocumentProp{
    documents: IDocument[]
}
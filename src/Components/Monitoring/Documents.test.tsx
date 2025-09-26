import { render } from "@testing-library/react"
import type { IDocument } from "../../Interfaces/Document"
import Documents from "./Documents"
import { getLastSplittedElement, sliceFileName } from "../../Utils/functions"

const documents: IDocument[] = [{
    path: "monfichier.txt",
    addedAt: "",
    updatedAt: "",
    user: "",
    id: 0
},  
{
    path: "monfichier2.txt",
    addedAt: "",
    updatedAt: "",
    user: "",
    id: 0
}
]

describe("Documents Component tests", () => {
    it("Should have two appliedOffer div element", async () => {

        render(<Documents
            documents={documents}
        />)
        const documentsDivList = document.querySelectorAll(".document")
        expect(documentsDivList).toHaveLength(2)
        expect(documentsDivList[0]).toBeVisible()
        expect(documentsDivList[1]).toBeVisible()

    })
    it("Should display corresponding content", async () => {

        render(<Documents
            documents={documents}
        />)
        
        const firstDocumentLink = document.querySelector("a:first-of-type")
        expect(firstDocumentLink).toHaveAttribute("href", [`${import.meta.env.VITE_APP_BACKEND_API_URL}`, documents[0].path].join(""))
        
        const firstDocumentImg = document.querySelector(".document:first-of-type img")
        expect(firstDocumentImg).toHaveAttribute("alt", getLastSplittedElement(documents[0].path))
        
        const firstDocumentPathSpan = document.querySelector(".document:first-of-type .path")
        expect(firstDocumentPathSpan).toHaveTextContent(sliceFileName(getLastSplittedElement(documents[0].path), 30))

        const secondDocumentLink = document.querySelector("a:nth-of-type(2)")
        expect(secondDocumentLink).toHaveAttribute("href", [`${import.meta.env.VITE_APP_BACKEND_API_URL}`, documents[1].path].join(""))
        
        const secondDocumentImg = document.querySelectorAll("img")
        expect(secondDocumentImg[1]).toHaveAttribute("alt", getLastSplittedElement(documents[1].path))
        
        const secondDocumentPathSpan = document.querySelectorAll(".path")
        expect(secondDocumentPathSpan[1]).toHaveTextContent(sliceFileName(getLastSplittedElement(documents[1].path), 30))

    })
})
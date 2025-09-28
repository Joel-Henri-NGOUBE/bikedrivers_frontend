import { render } from "@testing-library/react"
import AppliedOffers from "./AppliedOffers"
import type { IAppliedOffer } from "../../Interfaces/IOffer"

const appliedOffers: IAppliedOffer[] = [{
    brand: "brand",
    model: "model",
    state: "state",
    status: "status",
    title: "title",
    application_date: "03/05/2026",
    id_offer: 0,
},  
{
    brand: "brand2",
    model: "model2",
    state: "state2",
    status: "status2",
    title: "title2",
    application_date: "03/05/2026",
    id_offer: 0,
}
]

describe("AppliedOffers Component tests", () => {
    it("Should have two appliedOffer div element", async () => {

        render(<AppliedOffers
            appliedOffers={appliedOffers}
        />)
        const appliedOffersDivList = document.querySelectorAll(".appliedOffer")
        expect(appliedOffersDivList).toHaveLength(2)
        expect(appliedOffersDivList[0]).toBeVisible()
        expect(appliedOffersDivList[1]).toBeVisible()

    })
    it("Should display corresponding content", async () => {

        render(<AppliedOffers
            appliedOffers={appliedOffers}
        />)

        const firstAppliedOfferBrandModelSpan = document.querySelector(".appliedOffer:first-of-type .brand-model")
        expect(firstAppliedOfferBrandModelSpan).toHaveTextContent(`${appliedOffers[0].brand} ${appliedOffers[0].model.toUpperCase()}`)
        
        const firstAppliedOfferTitleSpan = document.querySelector(".appliedOffer:first-of-type .title")
        expect(firstAppliedOfferTitleSpan).toHaveTextContent(appliedOffers[0].title)
        
        const firstAppliedOfferStateSpan = document.querySelector(".appliedOffer:first-of-type .state")
        expect(firstAppliedOfferStateSpan).toHaveTextContent(appliedOffers[0].state)
        
        const firstAppliedOfferApplicationDateSpan = document.querySelector(".appliedOffer:first-of-type .date")
        expect(firstAppliedOfferApplicationDateSpan).toHaveTextContent("05/03/2026")

        const secondAppliedOfferBrandModelSpan = document.querySelector(".appliedOffer:nth-of-type(2) .brand-model")
        expect(secondAppliedOfferBrandModelSpan).toHaveTextContent(`${appliedOffers[1].brand} ${appliedOffers[1].model.toUpperCase()}`)
        
        const secondAppliedOfferTitleSpan = document.querySelector(".appliedOffer:nth-of-type(2) .title")
        expect(secondAppliedOfferTitleSpan).toHaveTextContent(appliedOffers[1].title)
        
        const secondAppliedOfferStateSpan = document.querySelector(".appliedOffer:nth-of-type(2) .state")
        expect(secondAppliedOfferStateSpan).toHaveTextContent(appliedOffers[1].state)
        
        const secondAppliedOfferApplicationDateSpan = document.querySelector(".appliedOffer:nth-of-type(2) .date")
        expect(secondAppliedOfferApplicationDateSpan).toHaveTextContent("05/03/2026")

    })
})
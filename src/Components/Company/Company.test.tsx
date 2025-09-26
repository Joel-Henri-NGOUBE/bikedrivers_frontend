import { screen, render } from "@testing-library/react"
import Company from "./Company"

describe("Company component tests", () => {
    it("should have a logo of right dimension", async () => {
        render(<Company 
                svg="/Bikedrivers-blue"
                length="60px"
        />)

        expect(screen.getByRole("img")).toHaveAttribute("width", "60px")

    })
    it("should have a title", async () => {
        render(<Company 
                svg="/Bikedrivers-blue"
                length="60px"
        />)

        expect(screen.getByRole("heading")).toHaveTextContent("BikeDrivers")

    })
})
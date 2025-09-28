import { screen, render } from "@testing-library/react"
import InputSelect from "./InputSelect"

describe("InputSelect tests", () => {
    it("should have label with the good id", async () => {

        render(<InputSelect
            label="Vehicles"
            options={["Renault C545", "Renault C546", "Renault C547", "Renault C548", "Renault C549"]}
            inputValue=""
            handleChange={vi.fn()}
        />)

        expect(document.querySelector("label")).toHaveAttribute("for", "vehicles")
        expect(document.querySelector("label")).toHaveTextContent("Vehicles")

    })
    it("should have all the good attributes and options ", async () => {

        render(<InputSelect
            label="Vehicles"
            options={["Renault C545", "Renault C546", "Renault C547", "Renault C548", "Renault C549"]}
            inputValue=""
            handleChange={vi.fn()}
        />)

        const select = screen.getByRole("combobox")
        expect(select).toHaveAttribute("name", "vehicles")
        expect(select).toHaveAttribute("id", "vehicles")

        const options = screen.getAllByRole("option")
        
        expect(options[0]).toHaveAttribute("value", "Renault C545")
        expect(options[1]).toHaveAttribute("value", "Renault C546")
        expect(options[2]).toHaveAttribute("value", "Renault C547")
        expect(options[3]).toHaveAttribute("value", "Renault C548")
        expect(options[4]).toHaveAttribute("value", "Renault C549")

    })
})
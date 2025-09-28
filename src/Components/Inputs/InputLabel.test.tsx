import { screen, render } from "@testing-library/react"
import InputLabel from "./InputLabel"

describe("InputLabel tests", () => {
    it("Should have a label with the correct id", async () => {

        render(<InputLabel
            label="Mail"
            placeholder="ambroisegenevillers@gmail.com"
            type="text"
            inputValue="the value"
            handleChange={vi.fn()}
        />)
        expect(document.querySelector("label")).toHaveAttribute("for", "mail")
        expect(document.querySelector("label")).toHaveTextContent("Mail")
    })
    it("Should have an input with the corresponding attributes", async () => {

        render(<InputLabel
            label="Mail"
            placeholder="ambroisegenevillers@gmail.com"
            type="text"
            inputValue=""
            handleChange={vi.fn()}
        />)

        const input = screen.getByRole("textbox")
        expect(input).toHaveAttribute("name", "mail")
        expect(input).toHaveAttribute("id", "mail")
        expect(input).toHaveAttribute("type", "text")
        expect(input).toHaveAttribute("placeholder", "ambroisegenevillers@gmail.com")

    })
})
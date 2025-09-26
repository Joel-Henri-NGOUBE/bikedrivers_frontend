import { render, act } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import { setupServer } from "msw/node"
import { http, HttpResponse } from "msw"
import Offers from "../Offers/Offers"
import Monitoring from "../Monitoring/Monitoring"
import AddOrSetOffer from "../AddOrSetOffer/AddOrSetOffer"
import Vehicles from "../Vehicles/Vehicles"
import Applications from "../Applications/Applications"
import SignUp from "../Signup/Signup"
import LogIn from "../Login/Login"
import PrivateRoute from "../../Components/PrivateRoutes/PrivateRoutes"
import type { IOffer } from "../../Interfaces/IOffer"

const offers: IOffer[] = [
    {
        id: 1,
        status: "AVAILABLE",
        description: "I'm describing my car",
        createdAt: "",
        updatedAt: "",
        vehicle: "",
        comments: [""],
        applications: [""],
        requiredDocuments: [""],
        title: "This is the title",
        price: "152",
        service: "LOCATION"
    },
    {
        id: 2,
        status: "AVAILABLE",
        description: "I'm describing my car 2",
        createdAt: "",
        updatedAt: "",
        vehicle: "",
        comments: [""],
        applications: [""],
        requiredDocuments: [""],
        title: "This is the title 2",
        price: "15000",
        service: "SALE"
    },
    {
        id: 3,
        status: "TRANSACTED",
        description: "I'm describing my car 3",
        createdAt: "",
        updatedAt: "",
        vehicle: "",
        comments: [""],
        applications: [""],
        requiredDocuments: [""],
        title: "This is the title 3",
        price: "10500",
        service: "SALE"
    }
]

// The definition of mocked API routes

const server = setupServer(
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/offers"].join(""), async () => {
        return HttpResponse.json(
                {
                    member: offers
                },
                {
                    status: 200
                }
            )
        }
    ),
    http.post([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), async () => {
    return HttpResponse.json(
            {
                id: 1
            },
            {
                status: 200
            }
        )
    })
)

beforeAll(
    () => {
        server.listen()
    }
)

afterEach(
    () => {
        server.resetHandlers()
    }
)
afterAll(
    () => {
        server.close()
    }
)

describe("Sign Up page tests", () => {
    it("Should contain 4 inputs", async () => {
        // Awaiting the router for permitting the requests to reach the API routes after the application is rendered 
        await act(async () => render(
        <MemoryRouter initialEntries={["/signup"]}>
                <Routes>
                    <Route path="/" element={<Offers />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/monitoring" element={<Monitoring />} />
                              
                    <Route element={<PrivateRoute />}>
                        <Route path="/offers" element={<AddOrSetOffer />} />
                        <Route path="/vehicles" element={<Vehicles />}/>
                        <Route path="/applications" element={<Applications />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        ))

        const inputLabelDivList = document.querySelectorAll(".signup-page .inputlabel")
        expect(inputLabelDivList).toHaveLength(4)
        expect(inputLabelDivList[0]).toBeVisible()
        expect(inputLabelDivList[1]).toBeVisible()
        expect(inputLabelDivList[2]).toBeVisible()
        expect(inputLabelDivList[3]).toBeVisible()


    })
})
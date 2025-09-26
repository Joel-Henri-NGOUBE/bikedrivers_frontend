import { render, act, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import { setupServer } from "msw/node"
import { http, HttpResponse } from "msw"
import userEvent from "@testing-library/user-event"
import jwt from "jsonwebtoken"
import Offers from "../Offers/Offers"
import Monitoring from "../Monitoring/Monitoring"
import AddOrSetOffer from "../AddOrSetOffer/AddOrSetOffer"
import Vehicles from "../Vehicles/Vehicles"
import Applications from "../Applications/Applications"
import SignUp from "../Signup/Signup"
import LogIn from "../Login/Login"
import type { IOffer } from "../../Interfaces/IOffer"
import Offer from "../Offer/Offer"
import type { IRequiredDocument } from "../../Interfaces/RequiredDocuments"

const offers: IOffer[] = [
    {
        id: 1,
        status: "AVAILABLE",
        description: "I'm describing my car",
        createdAt: "",
        updatedAt: "",
        vehicle: "/api/vehicles/1",
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
        vehicle: "/api/vehicles/1",
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
        vehicle: "/api/vehicles/1",
        comments: [""],
        applications: [""],
        requiredDocuments: [""],
        title: "This is the title 3",
        price: "10500",
        service: "SALE"
    }
]

const requiredDocument: IRequiredDocument = {
    id: 1,
    name: "Pièce d'identité",
    informations: "Le document qui prouve qui vous êtes"
}

// The definition of mocked API routes

const server = setupServer(
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/offers/:id"].join(""), async () => {
        return HttpResponse.json(
                {
                    ...offers[0]
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
    }),
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/offers/:id/applications/users/:userId/hasApplied"].join(""), async () => {
        return HttpResponse.json(
                {
                    hasApplied: false
                },
                {
                    status: 200
                }
            )
        }
    ),
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/offers/:id/required_documents"].join(""), async () => {
        return HttpResponse.json(
                {
                    member: [requiredDocument]
                },
                {
                    status: 200
                }
            )
        }
    ),
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/vehicles/:id/pictures"].join(""), async () => {
        return HttpResponse.json(
                {
                    member: []
                },
                {
                    status: 200
                }
            )
        }
    ),
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/:id/documents"].join(""), async () => {
        return HttpResponse.json(
                {
                    member: [{
                        id: 1,
                        path: "path.pdf",
                        addedAt: "",
                        updatedAt: "",
                        user: "/api/users/1"
                    }]
                },
                {
                    status: 200
                }
            )
        }
    ),
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/required_documents/:id/documents/:document_id/match_documents"].join(""), async () => {
        return HttpResponse.json(
                {
                },
                {
                    status: 200
                }
            )
        }
    ),
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/offers/:id/applications"].join(""), async () => {
        return HttpResponse.json(
                {
                    member: offers[0]
                },
                {
                    status: 200
                }
            )
        }
    )
)

beforeAll(
    () => {
        setToken()
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
        unsetToken()
        server.close()
    }
)

function setToken(){
    const token = jwt.sign({username: "this@gmail.com", roles: ["ROLE_USER"]},"SECRET")
    localStorage.setItem("token", token)
}

function unsetToken(){
    localStorage.removeItem("token")
}

describe("Offers page tests", () => {
    it("Should display offer page elements", async () => {
        // Awaiting the router for permitting the requests to reach the API routes before the application is rendered 
        await act(async () => render(
        <MemoryRouter initialEntries={["/offer/1"]}>
                <Routes>
                    <Route path="/" element={<Offers />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/offer/:id" element={<Offer />}/> 
                    <Route path="/monitoring" element={<Monitoring />} />   
                    <Route path="/offers" element={<AddOrSetOffer />} />
                    <Route path="/vehicles" element={<Vehicles />}/>
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </MemoryRouter>
        ))

        const statusSpan = await waitFor(() => document.querySelector(".status"))
        
        expect(statusSpan).toHaveTextContent(`STATUS: ${offers[0].status}`)

        const serviceSpan = await waitFor(() => document.querySelector(".service"))
        
        expect(serviceSpan).toHaveTextContent(offers[0].service)

        const descriptionParagraph = await waitFor(() => document.querySelector(".description"))
        
        expect(descriptionParagraph).toHaveTextContent(offers[0].description)


    })
    it("Should make the user apply", async () => {
        // Awaiting the router for permitting the requests to reach the API routes before the application is rendered 
        await act(async () => render(
        <MemoryRouter initialEntries={["/offer/1"]}>
                <Routes>
                    <Route path="/" element={<Offers />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/monitoring" element={<Monitoring />} />
                    <Route path="/offer/:id" element={<Offer />}/> 
                    <Route path="/offers" element={<AddOrSetOffer />} />
                    <Route path="/vehicles" element={<Vehicles />}/>
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </MemoryRouter>
        ))

        const applyInfoButton = await waitFor(() => document.querySelector(".apply"))
        
        expect(applyInfoButton).toHaveTextContent("Apply to this offer")
        
        const applyButton = await waitFor(() => document.querySelector(".sendApplication"))
        
        expect(applyButton).toBeVisible()
        
        applyButton && await userEvent.click(applyButton)
        
        expect(applyInfoButton).toHaveTextContent("Already applied to this offer")

        expect(applyButton).not.toBeVisible()

    })
})
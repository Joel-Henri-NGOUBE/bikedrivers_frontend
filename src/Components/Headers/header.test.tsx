import { render, act, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import { setupServer } from "msw/node"
import { http, HttpResponse } from "msw"
import userEvent from "@testing-library/user-event"
import jwt from "jsonwebtoken"
import Offers from "../../Pages/Offers/Offers"
import Monitoring from "../../Pages/Monitoring/Monitoring"
import AddOrSetOffer from "../../Pages/AddOrSetOffer/AddOrSetOffer"
import Vehicles from "../../Pages/Vehicles/Vehicles"
import Applications from "../../Pages/Applications/Applications"
import SignUp from "../../Pages/Signup/Signup"
import LogIn from "../../Pages/Login/Login"
import type { IOffer } from "../../Interfaces/IOffer"
import type { IVehicle } from "../../Interfaces/Vehicle"

const offers: IOffer[] = []

const vehicles: IVehicle[] = [
    {
        id: 1,
        type: "Voiture",
        model: "Clio 5",
        brand: "Renault",
        addedAt: "",
        updatedAt: "",
        purchasedAt: "",
        user: "/api/users/1",
        offers: [""],
        pictures: [""]
    },
    {
        id: 2,
        type: "Voiture",
        model: "Clio 5",
        brand: "Renault",
        addedAt: "",
        updatedAt: "",
        purchasedAt: "",
        user: "/api/users/1",
        offers: [""],
        pictures: [""]
    },
    {
        id: 3,
        type: "Voiture",
        model: "Clio 5",
        brand: "Renault",
        addedAt: "",
        updatedAt: "",
        purchasedAt: "",
        user: "/api/users/1",
        offers: [""],
        pictures: [""]
    },
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
        }
    ),
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/:id/vehicles`].join(""), async () => {
        return HttpResponse.json(
                {
                    member: vehicles
                },
                {
                    status: 200
                }
            )
        }
    ),
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/:id/offers/elements`].join(""), async () => {
        return HttpResponse.json(
                {
                    
                },
                {
                    status: 200
                }
            )
        }
    ),
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/:id/offers/applied`].join(""), async () => {
        return HttpResponse.json(
                {
                    
                },
                {
                    status: 200
                }
            )
        }
    ),
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/:id/documents`].join(""), async () => {
        return HttpResponse.json(
                {
                    
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

function setToken(){
    const token = jwt.sign({username: "this@gmail.com", roles: ["ROLE_ADMIN"]},"SECRET")
    localStorage.setItem("token", token)
}

function unsetToken(){
    localStorage.removeItem("token")
}

describe("Header tests", () => {
    it("Should redirect to Signup page", async () => {
        // Awaiting the router for permitting the requests to reach the API routes after the application is rendered 
        await act(async () => render(
        <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<Offers />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/monitoring" element={<Monitoring />} />
                    <Route path="/offers" element={<AddOrSetOffer />} />
                    <Route path="/vehicles" element={<Vehicles />}/>
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </MemoryRouter>
        ))

        const offerDivContainer = document.querySelector(".offers-page")

        expect(offerDivContainer).toBeInTheDocument()
        expect(offerDivContainer).toBeVisible()


        const links = await waitFor(() => document.querySelectorAll(".offers-page .header a"))
        
        await userEvent.click(links[1])

        const signupDivContainer =  document.querySelector(".signup-page")

        // As the sign-up-page' class only exist on the operations' page, it asserts that the redirection was successful
        expect(signupDivContainer).toBeInTheDocument()
        expect(signupDivContainer).toBeVisible()

    })
    it("Should redirect to Login page", async () => {
        // Awaiting the router for permitting the requests to reach the API routes after the application is rendered 
        await act(async () => render(
        <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<Offers />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/monitoring" element={<Monitoring />} />
                    <Route path="/offers" element={<AddOrSetOffer />} />
                    <Route path="/vehicles" element={<Vehicles />}/>
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </MemoryRouter>
        ))

        const offerDivContainer = document.querySelector(".offers-page")

        expect(offerDivContainer).toBeInTheDocument()
        expect(offerDivContainer).toBeVisible()


        const links = await waitFor(() => document.querySelectorAll(".offers-page .header a"))
        
        await userEvent.click(links[2])

        const signupDivContainer =  document.querySelector(".login-page")

        // As the operations' class only exist on the operations' page, it asserts that the redirection was successful
        expect(signupDivContainer).toBeInTheDocument()
        expect(signupDivContainer).toBeVisible()
    })
    it("Should redirect to AddOrSetOffer page", async () => {
        // Awaiting the router for permitting the requests to reach the API routes after the application is rendered 
        setToken()

        await act(async () => render(
        <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<Offers />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/monitoring" element={<Monitoring />} />                    
                    <Route path="/offers" element={<AddOrSetOffer />} />
                    <Route path="/vehicles" element={<Vehicles />}/>
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </MemoryRouter>
        ))

        const offerDivContainer = document.querySelector(".offers-page")

        expect(offerDivContainer).toBeInTheDocument()
        expect(offerDivContainer).toBeVisible()


        const links = await waitFor(() => document.querySelectorAll(".offers-page .header a"))

        await userEvent.click(links[1])

        const addOrSetOfferDivContainer = document.querySelector(".addorsetoffer-page")

        expect(addOrSetOfferDivContainer).toBeInTheDocument()
        expect(addOrSetOfferDivContainer).toBeVisible()

        unsetToken() 

    })
    it("Should redirect to Vehicles page", async () => {
        // Awaiting the router for permitting the requests to reach the API routes after the application is rendered 
        setToken()

        await act(async () => render(
        <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<Offers />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/monitoring" element={<Monitoring />} />                    
                    <Route path="/offers" element={<AddOrSetOffer />} />
                    <Route path="/vehicles" element={<Vehicles />}/>
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </MemoryRouter>
        ))

        const offerDivContainer = document.querySelector(".offers-page")

        expect(offerDivContainer).toBeInTheDocument()
        expect(offerDivContainer).toBeVisible()


        const links = await waitFor(() => document.querySelectorAll(".offers-page .header a"))
        
        await userEvent.click(links[2])

        const vehiclesDivContainer =  document.querySelector(".vehicles-page")

        expect(vehiclesDivContainer).toBeInTheDocument()
        expect(vehiclesDivContainer).toBeVisible()

        unsetToken() 

    })
    it("Should redirect to Applications page", async () => {
        // Awaiting the router for permitting the requests to reach the API routes after the application is rendered 
        setToken()

        await act(async () => render(
        <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<Offers />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/monitoring" element={<Monitoring />} />                    
                    <Route path="/offers" element={<AddOrSetOffer />} />
                    <Route path="/vehicles" element={<Vehicles />}/>
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </MemoryRouter>
        ))

        const offerDivContainer = document.querySelector(".offers-page")

        expect(offerDivContainer).toBeInTheDocument()
        expect(offerDivContainer).toBeVisible()


        const links = await waitFor(() => document.querySelectorAll(".offers-page .header a"))
        
        await userEvent.click(links[3])

        const applicationsDivContainer =  document.querySelector(".applications-page")

        // As the operations' class only exist on the operations' page, it asserts that the redirection was successful
        expect(applicationsDivContainer).toBeInTheDocument()
        expect(applicationsDivContainer).toBeVisible()

        unsetToken() 

    })
    it("Should redirect to Monitoring page", async () => {
        // Awaiting the router for permitting the requests to reach the API routes after the application is rendered 
        setToken()

        await act(async () => render(
        <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<Offers />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/monitoring" element={<Monitoring />} />                    
                    <Route path="/offers" element={<AddOrSetOffer />} />
                    <Route path="/vehicles" element={<Vehicles />}/>
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </MemoryRouter>
        ))

        const offerDivContainer = document.querySelector(".offers-page")

        expect(offerDivContainer).toBeInTheDocument()
        expect(offerDivContainer).toBeVisible()


        const links = await waitFor(() => document.querySelectorAll(".offers-page .header a"))
        
        await userEvent.click(links[4])

        const monitoringDivContainer =  document.querySelector(".monitoring-page")

        // As the operations' class only exist on the operations' page, it asserts that the redirection was successful
        expect(monitoringDivContainer).toBeInTheDocument()
        expect(monitoringDivContainer).toBeVisible()

        unsetToken() 


    }),
    it("Should redirect to Login page after Logging out", async () => {
        // Awaiting the router for permitting the requests to reach the API routes after the application is rendered 
        setToken()

        await act(async () => render(
        <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<Offers />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/monitoring" element={<Monitoring />} />                    
                    <Route path="/offers" element={<AddOrSetOffer />} />
                    <Route path="/vehicles" element={<Vehicles />}/>
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </MemoryRouter>
        ))

        const offerDivContainer = document.querySelector(".offers-page")

        expect(offerDivContainer).toBeInTheDocument()
        expect(offerDivContainer).toBeVisible()


        const links = await waitFor(() => document.querySelectorAll(".offers-page .header a"))
        
        await userEvent.click(links[6])

        const loginDivContainer =  document.querySelector(".login-page")

        // As the operations' class only exist on the operations' page, it asserts that the redirection was successful
        expect(loginDivContainer).toBeInTheDocument()
        expect(loginDivContainer).toBeVisible()

        unsetToken()

    })
})
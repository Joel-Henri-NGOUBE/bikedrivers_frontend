import { fireEvent, screen, render, act, waitFor } from "@testing-library/react"
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
import type { IVehicle } from "../../Interfaces/Vehicle"

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
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/:user_id/vehicles/:vehicle_id/pictures"].join(""), async () => {
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
    http.post([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/:id/vehicles`].join(""), async () => {
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
    http.delete([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, `/api/users/:id/vehicles/:vehicle_id`].join(""), async () => {
        return HttpResponse.json(
                {
                },
                {
                    status: 204
                }
            )
        }
    ),
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
    const token = jwt.sign({username: "this@gmail.com", roles: ["ROLE_ADMIN"]},"SECRET")
    localStorage.setItem("token", token)
}

function unsetToken(){
    localStorage.removeItem("token")
}

describe("Vehicles page tests", () => {
    it("Should change inputs values", async () => {
        // Awaiting the router for permitting the requests to reach the API routes before the application is rendered 
        await act(async () => render(
        <MemoryRouter initialEntries={["/vehicles"]}>
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

    // const vehiclesPage = await waitFor(() => document.querySelectorAll(".vehicles-page"))

        const inputs = await screen.findAllByRole("textbox")

        fireEvent.change(inputs[0], {
            target: {
                value: "Voiture"
            }
        })

        expect(inputs[0]).toHaveAttribute("value", "Voiture")

        fireEvent.change(inputs[1], {
            target: {
                value: "Renault"
            }
        })

        expect(inputs[1]).toHaveAttribute("value", "Renault")

        fireEvent.change(inputs[2], {
            target: {
                value: "Clio 5"
            }
        })

        expect(inputs[2]).toHaveAttribute("value", "Clio 5")

    })
    it("Should delete a vehicle", async () => {
        // Awaiting the router for permitting the requests to reach the API routes before the application is rendered 
        await act(async () => render(
        <MemoryRouter initialEntries={["/vehicles"]}>
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

        let vehiclesList = await waitFor(() => document.querySelectorAll(".vehicles-list > *"))

        expect(vehiclesList.length).toBe(3)

        const deleteButtons = await waitFor(() => document.querySelectorAll(".vehicles-list .delete"))

        await userEvent.click(deleteButtons[0])

        const newVehicleList = await waitFor(() => document.querySelectorAll(".vehicles-list > *"))

        expect(newVehicleList.length).toBe(2)

    })
})

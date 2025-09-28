import { useEffect, useState } from "react";
import InputLabel from "../../Components/Inputs/InputLabel";
import type { ISignup } from "../../Interfaces/APIResponses";
import { Link, useNavigate, type NavigateFunction } from "react-router";
import { jwtDecode } from "jwt-decode";
import Company from "../../Components/Company/Company";
import "../authenticate.css"

export default function SignUp(){

    const form = {
        firstname: "",
        lastname: "",
        mail: "",
        password: ""
    }
    const [formValues, setFormValues] = useState<typeof form>(form)

    const [_, setResponse] = useState<ISignup>({
            code: 0,
            message: ""
        })
    
    const navigate: NavigateFunction = useNavigate()
    
    const token = localStorage.getItem("token")
    
    // Getting the id if exists to verify if the current user is authenticated
    
    useEffect(() => {
        token
        &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        mail: (jwtDecode(token) as any).username
                    })
                })
        .then(res => {
            (res.status.toString().startsWith("2")) && navigate("/")
        })
        }
    , [])

    /**
     * Making a request to create a new user on the server
     * @param inputValues the values of the form
     */
    function handleSignUp(inputValues: typeof form){
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/signup"].join(""), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstname: inputValues.firstname,
              lastname: inputValues.lastname,
              email: inputValues.mail,
              password: inputValues.password
            })
        })
        .then(res => res.json())
        .then((res: ISignup) => {
            setResponse(res)
        })
    }
    return <div className="signup-page">
        <div className="wrapper">
            <Company
                svg="/Bikedrivers-blue.svg"
                length="70px"
            />
            <h2>Sign Up</h2>
            <div className="inputs">
                <InputLabel
                label="Firstname"
                placeholder="Ambroise"
                type="text"
                inputValue={formValues.firstname}
                handleChange={(e) => setFormValues({...formValues, firstname: e.target.value})}
                />

                <InputLabel
                label="Lastname"
                placeholder="Genevilliers"
                type="text"
                inputValue={formValues.lastname}
                handleChange={(e) => setFormValues({...formValues, lastname: e.target.value})}
                />

                <InputLabel
                label="Mail"
                placeholder="ambroisegenevillers@gmail.com"
                type="text"
                inputValue={formValues.mail}
                handleChange={(e) => setFormValues({...formValues, mail: e.target.value})}
                />

                <InputLabel
                label="Password"
                placeholder="Enter your password"
                type="password"
                inputValue={formValues.password}
                handleChange={(e) => setFormValues({...formValues, password: e.target.value})}
                />
            
            </div>

            <Link to="/login">Already an account ? Log in</Link>

            <button onClick={() => handleSignUp(formValues)}>Sign up</button>
        </div>
    </div>
}
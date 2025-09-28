import { useEffect, useState } from "react";
import InputLabel from "../../Components/InputLabel";
import type { ISignup } from "../../Interfaces/APIResponses";
import { Link, useNavigate, type NavigateFunction } from "react-router";
import { jwtDecode } from "jwt-decode";

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
    
    // Getting the id to verify is the current user is authenticated
    
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
                        email: (jwtDecode(token) as any).username
                    })
                })
        .then(res => {
            (res.status.toString().startsWith("2")) && navigate("/offers")
        })
        }
    , [])

    function handleSignUp(inputValues: typeof form){
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/signup"].join(""), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstname: inputValues.firstname,
              lastname: inputValues.lastname,
              mail: inputValues.mail,
              password: inputValues.password
            })
        })
        .then(res => res.json())
        .then((res: ISignup) => {
            setResponse(res)
        })
    }
    return <div className="signup">
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

        <Link to="/">Already an account ? Log in</Link>

        <button onClick={() => handleSignUp(formValues)}>Sign up</button>

    </div>
}
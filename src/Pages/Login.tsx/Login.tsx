import { useEffect, useState } from "react";
import InputLabel from "../../Components/InputLabel";
import type { TLogin } from "../../Interfaces/APIResponses";
import { Link, useNavigate, type NavigateFunction } from "react-router";
import { jwtDecode } from "jwt-decode";

export default function LogIn(){

    const form = {
        mail: "",
        password: ""
    }
    const [formValues, setFormValues] = useState<typeof form>(form)

    const [_, setResponse] = useState<TLogin>({
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
                        mail: (jwtDecode(token) as any).username
                    })
                })
        .then(res => {
            (res.status.toString().startsWith("2")) && navigate("/")
        })
        }
    , [])



    function handleLogIn(inputValues: typeof form){
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/login_check"].join(""), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mail: inputValues.mail,
                password: inputValues.password
            })
        })
        .then(res => res.json())
        .then((res: TLogin) => {
            console.log(res)
            setResponse(res);
            if("token" in res){
                navigate("/")
                localStorage.setItem("token", res.token)
            }
        })
    }

    return <div className="login">

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

        <Link to="/signup">Not yet an account ? Sign in</Link>

        <button onClick={() => handleLogIn(formValues)}>Log in</button>
    </div>
}
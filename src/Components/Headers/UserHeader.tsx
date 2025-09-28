import { jwtDecode } from "jwt-decode";
import Company from "../Company/Company";
import "./header.css"
import { Link, useLocation, useNavigate, type NavigateFunction } from "react-router";

export default function UserHeader(){
    const location = useLocation()
    const path = location.pathname

    const token = localStorage.getItem("token")

    const navigate: NavigateFunction = useNavigate()
    /**
     * 
     * @param e The event triggered
     * Sets off the token in the local storage and navigates to the authenticate page
     */
    function handleLogout(e: any){
        e.preventDefault()
        localStorage.removeItem("token")
        navigate("/login")
    }

    function makeSublinksVisible(){
        (document.querySelector(".sublinks") as HTMLElement).style = "display: flex;"
    }

    function makeSublinksInvisible(){
        (document.querySelector(".sublinks") as HTMLElement).style = "display: none;"
    }

    return <div className="header user">
        <Company
        svg="/Bikedrivers-blue.svg"
        length="60px"
        />
        <div className="links">
            <Link to="/" style={path === "/" ? {color: "var(--green-500)"} : {}}>Home</Link>
            {(token && (jwtDecode(token) as any).username) 
            ?  <>
                <Link to="/monitoring" style={path === "/monitoring" ? {color: "var(--green-500)"} : {}}>Monitoring</Link>
                <Link to="/settings" style={path === "/settings" ? {color: "var(--green-500)"} : {}}>Settings</Link>
                <a href="" onClick={(e) => {handleLogout(e)}}>Logout</a>
            </>
            : <>
                <Link to="/signup" style={path === "/signup" ? {color: "var(--green-500)"} : {}}>Sign Up</Link>
                <Link to="/login" style={path === "/login" ? {color: "var(--green-500)"} : {}}>Log In</Link>
            </>}

        </div>
        <div className="stripes" onClick={() => makeSublinksVisible()}>
            <img src="/stripes.svg" alt="" width="30px" />
        </div>
        <div className="sublinks">
            <span className="cross" onClick={() => makeSublinksInvisible()}><img src="/close.png" alt="" width="10px" /></span>
            <Link to="/" style={path === "/" ? {color: "var(--green-500)"} : {}}>Home</Link>
            {(token && (jwtDecode(token) as any).username) 
            ?  <>
                <Link to="/monitoring" style={path === "/monitoring" ? {color: "var(--green-500)"} : {}}>Monitoring</Link>
                <Link to="/settings" style={path === "/settings" ? {color: "var(--green-500)"} : {}}>Settings</Link>
                <a href="" onClick={(e) => {handleLogout(e)}}>Logout</a>
            </>
            : <>
                <Link to="/signup" style={path === "/signup" ? {color: "var(--green-500)"} : {}}>Sign Up</Link>
                <Link to="/login" style={path === "/login" ? {color: "var(--green-500)"} : {}}>Log In</Link>
            </>}
        </div>
    </div>
}
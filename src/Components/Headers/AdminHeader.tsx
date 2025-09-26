import { jwtDecode } from "jwt-decode";
import Company from "../Company/Company";
import "./header.css"
import { Link, useLocation, useNavigate, type NavigateFunction } from "react-router";

export default function AdminHeader(){
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


    return <div className="header admin">
        <div className="left">
            <Company
            svg="/Bikedrivers-blue.svg"
            length="60px"
            />
            <div className="adminpanel">
            <h4>ADMIN PANEL</h4> 
            </div>
        </div>
        <div className="links">
            <Link to="/" style={path === "/" ? {color: "var(--green-500)"} : {}}>Home</Link>
            <Link to="/offers" style={path === "/offers" ? {color: "var(--green-500)"} : {}}>Offers</Link>
            <Link to="/vehicles" style={path === "/vehicles" ? {color: "var(--green-500)"} : {}}>Vehicles</Link>
            <Link to="/applications" style={path === "/applications" ? {color: "var(--green-500)"} : {}}>Applications</Link>
            <Link to="/monitoring" style={path === "/monitoring" ? {color: "var(--green-500)"} : {}}>Monitoring</Link>
            <Link to="/settings" style={path === "/settings" ? {color: "var(--green-500)"} : {}}>Settings</Link>
            <a href="" onClick={(e) => {handleLogout(e)}}>Logout</a>        
        </div>
        <div className="stripes" onClick={() => makeSublinksVisible()}>
            <img src="/stripes.svg" alt="" width="30px" />
        </div>
        <div className="sublinks">
            <span className="cross" onClick={() => makeSublinksInvisible()}><img src="/close.png" alt="" width="10px" /></span>
            <Link to="/" style={path === "/" ? {color: "var(--green-500)"} : {}}>Home</Link>
            <Link to="/offers" style={path === "/offers" ? {color: "var(--green-500)"} : {}}>Offers</Link>
            <Link to="/vehicles" style={path === "/vehicles" ? {color: "var(--green-500)"} : {}}>Vehicles</Link>
            <Link to="/applications" style={path === "/applications" ? {color: "var(--green-500)"} : {}}>Applications</Link>
            <Link to="/monitoring" style={path === "/monitoring" ? {color: "var(--green-500)"} : {}}>Monitoring</Link>
            <Link to="/settings" style={path === "/settings" ? {color: "var(--green-500)"} : {}}>Settings</Link>
            <a href="" onClick={(e) => {handleLogout(e)}}>Logout</a>
        </div>
    </div>
}
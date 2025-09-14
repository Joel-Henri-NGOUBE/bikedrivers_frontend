import Company from "../Company/Company";
// import "./header.css"
import { Link, useLocation, useNavigate, type NavigateFunction } from "react-router";

export default function AdminHeader(){
    const location = useLocation()
    const path = location.pathname

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

    return <div className="header">
        <Company
        svg="/Bikedrivers-blue.svg"
        length="50px"
        />
        <div className="links">
            <Link to="/" style={path === "/" ? {color: "var(--green-500)"} : {}}>Home</Link>
            <Link to="/offers" style={path === "/offers" ? {color: "var(--green-500)"} : {}}>Offers</Link>
            <Link to="/vehicles" style={path === "/vehicles" ? {color: "var(--green-500)"} : {}}>Vehicles</Link>
            <Link to="/applications" style={path === "/applications" ? {color: "var(--green-500)"} : {}}>Applications</Link>
            <Link to="/monitoring" style={path === "/monitoring" ? {color: "var(--green-500)"} : {}}>Monitoring</Link>
            <Link to="/settings" style={path === "/monitoring" ? {color: "var(--green-500)"} : {}}>Settings</Link>
            <a href="" onClick={(e) => {handleLogout(e)}}>logout</a>
        </div>
    </div>
}
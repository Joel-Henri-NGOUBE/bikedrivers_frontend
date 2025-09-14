import { Navigate, Outlet } from 'react-router-dom'
import { findIfUserIsAdmin } from "./Utils/functions"

export default function PrivateRoute() {
  return (
    findIfUserIsAdmin() ? <Outlet/> : <Navigate to="/"/>
  )
}
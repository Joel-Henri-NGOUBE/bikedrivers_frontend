import { jwtDecode } from 'jwt-decode'

export function findIfUserIsAdmin(){
    const token = localStorage.getItem("token")

    const credentials = token ? jwtDecode(token) : {}

    const isAdmin = credentials?.roles.find((r) => r === "ROLE_ADMIN")?.length

    return isAdmin
}
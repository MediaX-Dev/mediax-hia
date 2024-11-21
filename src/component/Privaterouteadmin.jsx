import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "./Spinner"
function Privaterouteadmin() {
    const {loggedIn, checkingStatus} = useAuthStatus()
    if(checkingStatus){
        return <Spinner/>
    }
    return loggedIn ? <Outlet /> : <Navigate to='/admin/sign-in' />
}

export default Privaterouteadmin

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const stillConnected = localStorage.isStillConnected
    return ( (stillConnected === 'false') ? <Navigate to=''/> : <Outlet/> )
}

export default PrivateRoutes
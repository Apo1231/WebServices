import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoutes({ isAllowed }){

    if(!isAllowed){
        return <Navigate to='login' />
    }

    return <Outlet />
}


export default ProtectedRoutes;

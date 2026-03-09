import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ isAllowed }) {
    if (!isAllowed) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

export default ProtectedRoutes;


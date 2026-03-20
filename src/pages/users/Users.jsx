import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../security/AuthContex";
import UserList from "./UserList";

function Users() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div>
            <nav style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                padding: "12px 24px",
                background: "#1976D2",
                color: "#fff"
            }}>
                <NavLink to="/dashboard" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>
                    Dashboard
                </NavLink>
                <NavLink to="/users" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>
                    Usuarios
                </NavLink>
                <button onClick={handleLogout} style={{
                    marginLeft: "auto",
                    padding: "6px 14px",
                    background: "transparent",
                    border: "1px solid #fff",
                    color: "#fff",
                    borderRadius: 6,
                    cursor: "pointer"
                }}>
                    Cerrar sesión
                </button>
            </nav>
            <UserList />
        </div>
    );
}

export default Users;

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Page404 from "./pages/Page404";
import UserFindOne from "./pages/users/UserFindOne";
import UserList from "./pages/users/UserList";
import Users from "./pages/users/Users";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useAuth } from "./security/authContex";

function App() {
  const { isLoggedIn } = useAuth();

  return (
      <Routes>
        {/* ── Rutas públicas ── */}
        <Route path="/" element={<Home />} />
        <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* ── Rutas protegidas por wrapper ─── */}
        <Route element={<ProtectedRoutes isAllowed={isLoggedIn} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />}>
            <Route path="list" element={<UserList />} />
            <Route path=":id" element={<UserFindOne />} />
          </Route>
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
  );
}

export default App;

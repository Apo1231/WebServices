import "./components/components-style.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Page404 from "./pages/Page404";
import UserFindOne from "./pages/users/UserFindOne";
import UserList from "./pages/users/UserList";
import Users from "./pages/users/Users";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  const isAllowed = true;

  return (
    <>
      {isAllowed ? (
        <Routes>
          <Route path="/login" element={<Navigate to="/dashboard" />} />
          
          <Route element={<ProtectedRoutes isAllowed={isAllowed} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/users" element={<Users />}>
            <Route path="list" element={<UserList />} />
            <Route path=":id" element={<UserFindOne />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;

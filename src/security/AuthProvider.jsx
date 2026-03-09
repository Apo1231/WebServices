import { useEffect, useState } from "react";
import { AuthContext } from "./authContex";
import { loginService } from "../services/fakestore";

function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('session');
        if (saved) setSession(JSON.parse(saved));
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const data = await loginService(username, password);
            const sessionData = { username, token: data.token };
            setSession(sessionData);
            localStorage.setItem('session', JSON.stringify(sessionData));
            return true;
        } catch {
            return false;
        }
    };

    const logout = () => {
        setSession(null);
        localStorage.removeItem('session');
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ session, login, logout, isLoggedIn: !!session }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

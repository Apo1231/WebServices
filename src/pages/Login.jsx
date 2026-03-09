import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../security/authContex";
import Swal from "sweetalert2";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            Swal.fire({ icon: "warning", title: "Campo requerido", text: "Ingresa tu usuario" });
            return;
        }
        if (!password.trim()) {
            Swal.fire({ icon: "warning", title: "Campo requerido", text: "Ingresa tu contraseña" });
            return;
        }

        setLoading(true);
        const success = await login(username, password);
        setLoading(false);

        if (success) {
            await Swal.fire({ icon: "success", title: "¡Bienvenido!", timer: 1200, showConfirmButton: false });
            navigate("/dashboard");
        } else {
            Swal.fire({ icon: "error", title: "Credenciales inválidas", text: "Verifica tu usuario y contraseña" });
        }
    };

    return (
        <div style={s.page}>
            <div style={s.card}>
                <h2 style={s.title}>🔐 Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div style={s.group}>
                        <label style={s.label}>Usuario</label>
                        <input
                            style={s.input}
                            type="text"
                            placeholder="johnd"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div style={s.group}>
                        <label style={s.label}>Contraseña</label>
                        <input
                            style={s.input}
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} type="submit" disabled={loading}>
                        {loading ? "Cargando..." : "Entrar"}
                    </button>
                </form>
                <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#999" }}>
                    Usuario de prueba: <b>mor_2313</b> / <b>83r5^_</b>
                </p>
                <p style={{ textAlign: "center", marginTop: 8 }}>
                    <Link to="/" style={{ color: "#1976D2", fontSize: 13 }}>← Volver al inicio</Link>
                </p>
            </div>
        </div>
    );
}

const s = {
    page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f2f5" },
    card: { background: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" },
    title: { textAlign: "center", marginBottom: "28px", color: "#333" },
    group: { marginBottom: "16px" },
    label: { display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "14px", color: "#555" },
    input: { width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" },
    btn: { width: "100%", padding: "12px", background: "#1976D2", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px", fontWeight: "600" },
};

export default Login;

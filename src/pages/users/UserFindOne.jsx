import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../services/fakestore";
import Swal from "sweetalert2";

function InfoRow({ label, value }) {
    return (
        <div style={{ display: "flex", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
            <span style={{ fontWeight: 600, width: 160, color: "#555", fontSize: 14 }}>{label}</span>
            <span style={{ color: "#333", fontSize: 14 }}>{value || "—"}</span>
        </div>
    );
}

function UserFindOne() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(id);
                setUser(data);
            } catch {
                Swal.fire({ icon: "error", title: "Error", text: "No se encontró el usuario" });
                navigate("/users/list");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) return <div style={{ textAlign: "center", padding: 60, fontSize: 18 }}>⏳ Cargando usuario...</div>;
    if (!user) return null;

    return (
        <div style={{ padding: 30, maxWidth: 620, margin: "0 auto" }}>
            <button onClick={() => navigate("/users/list")}
                    style={{ padding: "8px 16px", background: "#eee", border: "none", borderRadius: 8, cursor: "pointer", marginBottom: 24, fontWeight: 600 }}>
                ← Volver
            </button>

            <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 30 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#1976D2", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, marginRight: 16 }}>
                        {user.name.firstname[0].toUpperCase()}
                    </div>
                    <div>
                        <h2 style={{ margin: 0 }}>{user.name.firstname} {user.name.lastname}</h2>
                        <p style={{ margin: 0, color: "#888", fontSize: 14 }}>@{user.username}</p>
                    </div>
                </div>

                <h4 style={{ color: "#1976D2", marginBottom: 8 }}>Información personal</h4>
                <InfoRow label="ID" value={user.id} />
                <InfoRow label="Email" value={user.email} />
                <InfoRow label="Teléfono" value={user.phone} />

                <h4 style={{ color: "#1976D2", marginTop: 20, marginBottom: 8 }}>Dirección</h4>
                <InfoRow label="Calle" value={`${user.address.street} #${user.address.number}`} />
                <InfoRow label="Ciudad" value={user.address.city} />
                <InfoRow label="Código postal" value={user.address.zipcode} />
                <InfoRow label="Coordenadas" value={`${user.address.geolocation.lat}, ${user.address.geolocation.long}`} />
            </div>
        </div>
    );
}

export default UserFindOne;

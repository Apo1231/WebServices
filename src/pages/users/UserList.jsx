import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser, createUser } from "../../services/fakestore";
import Swal from "sweetalert2";

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div style={ms.overlay} onClick={onClose}>
            <div style={ms.box} onClick={(e) => e.stopPropagation()}>
                <button style={ms.close} onClick={onClose}>✕</button>
                {children}
            </div>
        </div>
    );
}

const ms = {
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    box: { background: "#fff", borderRadius: "12px", padding: "32px", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", position: "relative" },
    close: { position: "absolute", top: 12, right: 16, background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#666" },
};

function InputField({ label, name, type = "text", value, onChange, required }) {
    return (
        <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", marginBottom: 4, fontWeight: 600, fontSize: 13, color: "#555" }}>
                {label} {required && <span style={{ color: "red" }}>*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                style={{ width: "100%", padding: "9px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}
            />
        </div>
    );
}

const emptyForm = { email: "", username: "", password: "", firstname: "", lastname: "", phone: "", city: "", street: "" };

function CreateUserForm({ onSuccess, onClose }) {
    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const validate = () => {
        const { email, username, password, firstname, lastname } = form;
        if (!email || !username || !password || !firstname || !lastname) {
            Swal.fire({ icon: "warning", title: "Campos requeridos", text: "Completa todos los campos obligatorios (*)" });
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            Swal.fire({ icon: "warning", title: "Email inválido", text: "Ingresa un email con formato válido" });
            return false;
        }
        if (password.length < 6) {
            Swal.fire({ icon: "warning", title: "Contraseña débil", text: "La contraseña debe tener mínimo 6 caracteres" });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const userData = {
                email: form.email,
                username: form.username,
                password: form.password,
                name: { firstname: form.firstname, lastname: form.lastname },
                address: { city: form.city, street: form.street, number: 1, zipcode: "00000", geolocation: { lat: "0", long: "0" } },
                phone: form.phone,
            };
            await createUser(userData);
            Swal.fire({ icon: "success", title: "¡Usuario creado!", timer: 1500, showConfirmButton: false });
            onSuccess();
        } catch {
            Swal.fire({ icon: "error", title: "Error", text: "No se pudo crear el usuario" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 style={{ marginBottom: 20, color: "#333" }}>Nuevo Usuario</h3>
            <InputField label="Nombre" name="firstname" value={form.firstname} onChange={handleChange} required />
            <InputField label="Apellido" name="lastname" value={form.lastname} onChange={handleChange} required />
            <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <InputField label="Usuario" name="username" value={form.username} onChange={handleChange} required />
            <InputField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} required />
            <InputField label="Teléfono" name="phone" value={form.phone} onChange={handleChange} />
            <InputField label="Ciudad" name="city" value={form.city} onChange={handleChange} />
            <InputField label="Calle" name="street" value={form.street} onChange={handleChange} />
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button type="submit" disabled={loading}
                        style={{ flex: 1, padding: "10px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
                    {loading ? "Guardando..." : "Crear Usuario"}
                </button>
                <button type="button" onClick={onClose}
                        style={{ flex: 1, padding: "10px", background: "#eee", border: "none", borderRadius: 8, cursor: "pointer" }}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}

function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch {
            Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar los usuarios" });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, nombre) => {
        const result = await Swal.fire({
            title: "¿Eliminar usuario?",
            text: `Se eliminará a ${nombre}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!result.isConfirmed) return;
        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            Swal.fire({ icon: "success", title: "Eliminado", timer: 1400, showConfirmButton: false });
        } catch {
            Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar el usuario" });
        }
    };

    if (loading) return <div style={{ textAlign: "center", padding: 60, fontSize: 18 }}>Cargando usuarios...</div>;

    return (
        <div style={{ padding: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ margin: 0 }}>Usuarios</h2>
                <button onClick={() => setShowModal(true)}
                        style={{ padding: "10px 20px", background: "#1976D2", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                    Crear Usuario
                </button>
            </div>
            <div style={{ overflowX: "auto", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
                    <thead>
                    <tr style={{ background: "#1976D2", color: "#fff" }}>
                        {["ID", "Nombre", "Usuario", "Email", "Teléfono", "Acciones"].map(h => (
                            <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, i) => (
                        <tr key={user.id} style={{ background: i % 2 === 0 ? "#fafafa" : "#fff", borderBottom: "1px solid #eee" }}>
                            <td style={td}>{user.id}</td>
                            <td style={td}>{user.name.firstname} {user.name.lastname}</td>
                            <td style={td}>{user.username}</td>
                            <td style={td}>{user.email}</td>
                            <td style={td}>{user.phone}</td>
                            <td style={td}>
                                <button onClick={() => navigate(`/users/${user.id}`)}
                                        style={{ ...btnStyle, background: "#1976D2", marginRight: 6 }}>
                                    Ver
                                </button>
                                <button onClick={() => handleDelete(user.id, `${user.name.firstname} ${user.name.lastname}`)}
                                        style={{ ...btnStyle, background: "#e53935" }}>
                                    Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <CreateUserForm
                    onSuccess={() => { setShowModal(false); fetchUsers(); }}
                    onClose={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );
}

const td = { padding: "12px 16px", fontSize: 14 };
const btnStyle = { padding: "6px 12px", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600 };

export default UserList;

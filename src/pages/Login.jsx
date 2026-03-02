import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if(username === ''){
            alert('Please enter a username');
            return;
        }

        if(password === ''){
            alert('Please enter a password');
            return;
        }

        alert(`Username: ${username} and Password: ${password}`)
        navigate('/dashboard')
    }

    return (
        <div>
            <h1>Login</h1>
            <div>
                <input type="text" placeholder="Username" 
                 onChange={
                    (event) => setUsername(event.target.value)
                 }
                />
            </div>
            <div>
                <input type="password" placeholder="Password"
                onChange={
                    (event) => setPassword(event.target.value)
                }
                />
            </div>
            <Button text="Iniciar sesion"
            action={handleLogin} 
            />
        </div>
    )
}

export default Login;
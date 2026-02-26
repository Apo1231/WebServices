import { useState } from "react";
import Button from "./components/Button";
import './components/components-style.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <Button
          text="Cerrar sesion"
          action={() => {
            alert("Cerrando sesion");
            setIsLoggedIn(false);
          }}
          type="primary"
        />
      ) : (
        <Button
          text="Inciar sesion"
          action={() => {
            alert("Iniciando sesion");
            setIsLoggedIn(true);
          }}
          type="primary"
        />
      )}

      {
        isLoggedIn && (
          <>
            <h1>Bienvenido</h1>
            <Button
              text="Hola"
            />
          </>
        )
      }
    </>
  );
}

export default App;

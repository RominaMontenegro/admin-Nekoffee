import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user.trim().toLowerCase() === "admin") {
      localStorage.setItem("isAuth", "true");
      navigate("/admin");
    } else {
      setError("Usuario incorrecto, poné 'admin'");
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "80px auto", padding: 20, backgroundColor: "white", borderRadius: 8, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={{ width: "100%", marginBottom: 15 }}
      />
      <button onClick={handleLogin} style={{ width: "100%" }}>
        Entrar
      </button>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}

export default Login;
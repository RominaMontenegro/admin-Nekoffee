// src/components/Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const linkStyle = ({ isActive }) => ({
    margin: "0 12px",
    textDecoration: isActive ? "underline" : "none",
    color: "#c49899",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <nav
      style={{
        padding: "1rem 2rem",
        backgroundColor: "#f2e5d0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <NavLink to="/admin" style={linkStyle}>
          Panel
        </NavLink>
        <NavLink to="/usuarios" style={linkStyle}>
          Usuarios
        </NavLink>
        <NavLink to="/productos" style={linkStyle}>
          Productos
        </NavLink>
        <NavLink to="/categorias" style={linkStyle}>
          Categorías
        </NavLink>
        <NavLink to="/admins" style={linkStyle}>
          Admins
        </NavLink>
        <NavLink to="/orders" style={linkStyle}>
          Pedidos
        </NavLink>
        <NavLink to="/estadisticas" style={linkStyle}>
          Estadísticas
        </NavLink>
        <NavLink to="/analisisprecios" style={linkStyle}>
          Análisis Gráfico
        </NavLink>
      </div>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#c49899",
          color: "#fff",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Cerrar sesión
      </button>
    </nav>
  );
}

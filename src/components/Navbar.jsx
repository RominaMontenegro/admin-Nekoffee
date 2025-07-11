import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login");
  };

  return (
    <nav>
      <div>
        <NavLink
          to="/admin"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Panel
        </NavLink>
        <NavLink
          to="/usuarios"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Usuarios
        </NavLink>
        <NavLink
          to="/productos"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Productos
        </NavLink>
        <NavLink
          to="/estadisticas"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Estadísticas
        </NavLink>
        <NavLink
          to="/analisisprecios"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Análisis y Estadísticas Gráficas
        </NavLink>
      </div>
      <button className="logout-btn" onClick={logout}>
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;

import React from "react";
import Navbar from "./Navbar";

function Estadisticas() {
  const data = {
    visitas: 1234,
    ventas: 567,
    usuariosActivos: 89,
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Estadísticas</h2>
        <p>Visitas: {data.visitas}</p>
        <p>Ventas: {data.ventas}</p>
        <p>Usuarios Activos: {data.usuariosActivos}</p>
      </div>
    </>
  );
}

export default Estadisticas;
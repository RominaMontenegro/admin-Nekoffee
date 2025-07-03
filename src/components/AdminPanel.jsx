import React from "react";
import Navbar from "./Navbar";

function AdminPanel() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Panel de Administrador</h1>
        <p>Bienvenido, admin!</p>
        <p>Usá el menú para navegar entre nuestras Miawsecciones.</p>
      </div>
    </>
  );
}

export default AdminPanel;

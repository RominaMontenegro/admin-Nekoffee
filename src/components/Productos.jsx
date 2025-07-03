import React from "react";
import Navbar from "./Navbar";

function Productos() {
  const productos = [
    { id: 1, nombre: "Juguetes" },
    { id: 2, nombre: "Cafe" },
    { id: 3, nombre: "Sanguchito" },
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Productos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Productos;

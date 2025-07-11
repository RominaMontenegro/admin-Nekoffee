// src/components/AnalisisPrecios.jsx
import React from "react";
import latte from "../assets/latte_gatuno.png";
import torta from "../assets/torta_zanahoria.png";
import peluche from "../assets/peluche_gato.png";
import Navbar from "./Navbar";

function AnalisisPrecios() {
  return (
    <div>
      <Navbar></Navbar>
      <h2>Latte Gatuno</h2>
      <img src={latte} alt="Precio Latte Gatuno" style={{ width: "600px" }} />

      <h2>Torta de Zanahoria Miauravillosa</h2>
      <img
        src={torta}
        alt="Precio Torta Zanahoria"
        style={{ width: "600px" }}
      />

      <h2>Souvenir Peluche de Gato</h2>
      <img src={peluche} alt="Precio Peluche" style={{ width: "600px" }} />
    </div>
  );
}

export default AnalisisPrecios;

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  // Leemos token y role desde Redux
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  // Si no está autenticado o no es admin, redirigimos al login
  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // Caso contrario, renderizamos el contenido protegido
  return children;
}

export default ProtectedRoute;

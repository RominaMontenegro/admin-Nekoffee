// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import Usuarios from "./components/Usuarios";
import Productos from "./components/Productos";
import Estadisticas from "./components/Estadisticas";
import AnalisisPrecios from "./components/AnalisisPrecios";
import Categorias from "./components/Categorias"; // 👈 New
import Admins from "./components/Admins"; // 👈 New
import OrdersList from "./components/OrdersList"; // 👈 New
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Usuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <Productos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorias"
          element={
            <ProtectedRoute>
              <Categorias />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admins"
          element={
            <ProtectedRoute>
              <Admins />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estadisticas"
          element={
            <ProtectedRoute>
              <Estadisticas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analisisprecios"
          element={
            <ProtectedRoute>
              <AnalisisPrecios />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<h1>404 — Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

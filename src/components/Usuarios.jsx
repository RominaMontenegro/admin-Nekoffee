// src/components/Usuarios.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./Usuarios.css";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editUser, setEditUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
  });

  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  // 1. Cargar usuarios
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  // 2. Crear usuario (solo admin)
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/users",
        {
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
          password: newUser.password,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNewUser({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        password: "",
      });
      fetchUsuarios();
    } catch (err) {
      console.error("Error creating user:", err);
      alert(err.response?.data?.error || "Create failed");
    }
  };

  // 3. Iniciar edición inline
  const startEdit = (u) => {
    setEditingId(u.id);
    setEditUser({
      firstname: u.firstname,
      lastname: u.lastname,
      email: u.email,
      phone: u.phone,
      address: u.address,
    });
  };

  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  // 4. Guardar edición
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/users/${editingId}`, editUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(null);
      fetchUsuarios();
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Update failed");
    }
  };

  // 5. Borrar usuario
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsuarios();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Delete failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="usuarios-container">
        <h2>Users</h2>

        {role === "admin" && (
          <form className="usuario-form" onSubmit={handleCreate}>
            <input
              name="firstname"
              placeholder="First Name"
              value={newUser.firstname}
              onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
              required
            />
            <input
              name="lastname"
              placeholder="Last Name"
              value={newUser.lastname}
              onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <input
              name="address"
              placeholder="Address"
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
            <button type="submit">Add User</button>
          </form>
        )}

        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First</th>
              <th>Last</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                {editingId === u.id ? (
                  <>
                    <td>{u.id}</td>
                    <td>
                      <input
                        name="firstname"
                        value={editUser.firstname}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        name="lastname"
                        value={editUser.lastname}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        name="email"
                        type="email"
                        value={editUser.email}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td>
                      <input name="phone" value={editUser.phone} onChange={handleEditChange} />
                    </td>
                    <td>
                      <input name="address" value={editUser.address} onChange={handleEditChange} />
                    </td>
                    {role === "admin" && (
                      <td>
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                      </td>
                    )}
                  </>
                ) : (
                  <>
                    <td>{u.id}</td>
                    <td>{u.firstname}</td>
                    <td>{u.lastname}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.address}</td>
                    {role === "admin" && (
                      <td>
                        <button onClick={() => startEdit(u)}>Edit</button>
                        <button onClick={() => handleDelete(u.id)}>Delete</button>
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

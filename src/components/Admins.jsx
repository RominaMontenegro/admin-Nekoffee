import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./Admins.css";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editAdmin, setEditAdmin] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admins", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data);
    } catch (err) {
      console.error("Error loading admins:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/admins", newAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewAdmin({ firstname: "", lastname: "", email: "", password: "" });
      fetchAdmins();
    } catch (err) {
      console.error("Error creating admin:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axios.delete(`http://localhost:3000/admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdmins();
    } catch (err) {
      console.error("Error deleting admin:", err);
    }
  };

  const startEdit = (admin) => {
    setEditingId(admin.id);
    setEditAdmin({
      firstname: admin.firstname,
      lastname: admin.lastname,
      email: admin.email,
      password: "",
    });
  };

  const handleEditChange = (e) => {
    setEditAdmin({ ...editAdmin, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/admins/${editingId}`, editAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(null);
      fetchAdmins();
    } catch (err) {
      console.error("Error updating admin:", err);
    }
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <>
      <Navbar />
      <div className="admins-container">
        <h2>Administrators</h2>

        {/* Create Form */}
        <form className="admin-form" onSubmit={handleCreate}>
          <input
            name="firstname"
            placeholder="First Name"
            value={newAdmin.firstname}
            onChange={(e) => setNewAdmin({ ...newAdmin, firstname: e.target.value })}
            required
          />
          <input
            name="lastname"
            placeholder="Last Name"
            value={newAdmin.lastname}
            onChange={(e) => setNewAdmin({ ...newAdmin, lastname: e.target.value })}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
            required
          />
          <button type="submit">Add Admin</button>
        </form>

        {/* Admins Table */}
        <table className="admins-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                {editingId === admin.id ? (
                  <>
                    <td>{admin.id}</td>
                    <td>
                      <input
                        name="firstname"
                        value={editAdmin.firstname}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        name="lastname"
                        value={editAdmin.lastname}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        name="email"
                        type="email"
                        value={editAdmin.email}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{admin.id}</td>
                    <td>{admin.firstname}</td>
                    <td>{admin.lastname}</td>
                    <td>{admin.email}</td>
                    <td>
                      <button onClick={() => startEdit(admin)}>Edit</button>
                      <button onClick={() => handleDelete(admin.id)}>Delete</button>
                    </td>
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

// src/components/Categorias.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./Categorias.css";

export default function Categorias() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ title: "" });
  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState({ title: "" });
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!newCategory.title.trim()) {
      setError("Title cannot be empty");
      return;
    }
    try {
      await axios.post(
        "http://localhost:3000/categories",
        { firstname: newCategory.title },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNewCategory({ title: "" });
      setError("");
      fetchCategories();
    } catch (err) {
      console.error("Error creating category:", err);
      setError(err.response?.data?.error || "Operation failed");
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditCategory({ title: cat.title });
    setError("");
  };

  const handleEditChange = (e) => {
    console.log(e.target.value);
    setEditCategory({ title: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(editingId);
    if (!editCategory.title.trim()) {
      setError("Title cannot be empty");
      return;
    }
    try {
      const cosa = await axios.patch(
        `http://localhost:3000/categories/${editingId}`,
        { title: editCategory.title },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(cosa, editCategory.title);
      setEditingId(null);
      setError("");
      fetchCategories();
    } catch (err) {
      console.error("Error updating category:", err);
      setError(err.response?.data?.error || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`http://localhost:3000/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Delete failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="categorias-container">
        <h2>Manage Categories</h2>

        {/* Create form */}
        <form className="categoria-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="New category title"
            value={newCategory.title}
            onChange={(e) => setNewCategory({ title: e.target.value })}
          />
          <button type="submit">Add Category</button>
        </form>

        {/* Edit error */}
        {error && <p className="error">{error}</p>}

        {/* Table */}
        <table className="categoria-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                {editingId === cat.id ? (
                  <>
                    <td>{cat.id}</td>
                    <td>
                      <input value={editCategory.title} onChange={handleEditChange} />
                    </td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{cat.id}</td>
                    <td>{cat.title}</td>
                    <td>
                      <button onClick={() => startEdit(cat)}>Edit</button>
                      <button onClick={() => handleDelete(cat.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="3">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

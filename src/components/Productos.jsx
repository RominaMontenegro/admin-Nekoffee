// src/components/Productos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./Productos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    stock: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    title: "",
    price: "",
    stock: "",
  });
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  // 1. Cargar productos
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setProductos(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  // 2. Crear producto (solo admin)
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/products",
        {
          title: newProduct.title,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock, 10),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNewProduct({ title: "", price: "", stock: "" });
      fetchProductos();
    } catch (err) {
      console.error("Error creating product:", err);
      alert(err.response?.data?.error || "Create failed");
    }
  };

  // 3. Borrar producto (solo admin)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Delete failed");
    }
  };

  // 4. Iniciar edición inline
  const startEdit = (p) => {
    setEditingId(p.id);
    setEditProduct({
      title: p.title,
      price: p.price.toString(),
      stock: p.stock.toString(),
    });
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  // 5. Guardar edición
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/products/${editingId}`,
        {
          title: editProduct.title,
          price: parseFloat(editProduct.price),
          stock: parseInt(editProduct.stock, 10),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setEditingId(null);
      fetchProductos();
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Update failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="productos-container">
        <h2>Products</h2>

        {role === "admin" && (
          <form className="product-form" onSubmit={handleCreate}>
            <input
              name="title"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              required
            />
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              required
            />
            <button type="submit">Add Product</button>
          </form>
        )}

        <table className="productos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                {editingId === p.id ? (
                  <>
                    <td>{p.id}</td>
                    <td>
                      <input
                        name="title"
                        value={editProduct.title}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        value={editProduct.price}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        name="stock"
                        type="number"
                        value={editProduct.stock}
                        onChange={handleEditChange}
                        required
                      />
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
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>${p.price.toFixed(2)}</td>
                    <td>{p.stock}</td>
                    {role === "admin" && (
                      <td>
                        <button onClick={() => startEdit(p)}>Edit</button>
                        <button onClick={() => handleDelete(p.id)}>Delete</button>
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

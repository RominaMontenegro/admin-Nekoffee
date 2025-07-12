// src/components/Productos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./Productos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    stock: "",
    categoryId: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    title: "",
    price: "",
    stock: "",
    categoryId: "",
  });

  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  // Fetch products & categories on mount
  useEffect(() => {
    fetchProductos();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/categories", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  // Create product (admin only)
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/products",
        {
          title: newProduct.title,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock, 10),
          categoryId: parseInt(newProduct.categoryId, 10),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNewProduct({ title: "", price: "", stock: "", categoryId: "" });
      fetchProductos();
    } catch (err) {
      console.error("Error creating product:", err);
      alert(err.response?.data?.error || "Create failed");
    }
  };

  // Delete product (admin only)
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

  // Start inline edit
  const startEdit = (p) => {
    setEditingId(p.id);
    setEditProduct({
      title: p.title,
      price: p.price.toString(),
      stock: p.stock.toString(),
      categoryId: p.categoryId?.toString() || "",
    });
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  // Save inline edit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/products/${editingId}`,
        {
          title: editProduct.title,
          price: parseFloat(editProduct.price),
          stock: parseInt(editProduct.stock, 10),
          categoryId: parseInt(editProduct.categoryId, 10),
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
            <select
              name="categoryId"
              value={newProduct.categoryId}
              onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
              required
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
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
              <th>Category</th>
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
                    <td>
                      <select
                        name="categoryId"
                        value={editProduct.categoryId}
                        onChange={handleEditChange}
                        required
                      >
                        <option value="">—</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
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
                    <td>{categories.find((c) => c.id === p.categoryId)?.title || "—"}</td>
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

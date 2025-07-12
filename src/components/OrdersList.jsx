import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./OrdersList.css";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
      console.log("esto es ordenes", res);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="orders-container">
        <h2>Orders</h2>
        {orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <strong>Order #{order.id}</strong> Status: {order.orderStatus}
                </div>
                <div>
                  User ID: {order.userId} Date:
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div className="order-item" key={idx}>
                    <img src={item.image} alt={item.title} />
                    <div className="item-details">
                      <p className="item-title">{item.title}</p>
                      <p>Qty: {item.qty}</p>
                      <p>Price: ${item.price.toFixed(2)}</p>
                      <p>Subtotal: ${(item.qty * item.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-total"></div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

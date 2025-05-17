import React, { useState } from "react";
import axios from "axios";
import "./adminPage.css";

export default function OrderRow({ order, index }) {
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await axios.put(`http://localhost:4004/api/orderDetails/${order._id}`, {
        status: newStatus,
      });
      console.log("Status updated successfully");

      await axios.put(`http://localhost:4004/api/orders/${order.order_id._id}`, {
        order_type: newStatus,
      });

    } catch (error) {
      console.error("Error updating status:", error);
      alert("Status update failed.");
      setStatus(order.status);
    }
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{order.username}</td>
      <td>{order.phone}</td>
      <td>{order.email}</td>
      <td>{order.paper_type}</td>
      <td>{order.created_date}</td>
      <td>{order.quantity}</td>
      <td>{order.unit_price}</td>
      <td>
        <select
          value={status}
          onChange={handleStatusChange}
          className={`status-select ${status}`}
        >
          <option value="Илгээсэн">Илгээсэн</option>
          <option value="Дууссан">Дууссан</option>
          <option value="Цуцалсан">Цуцалсан</option>
        </select>
      </td>
    </tr>
  );
}

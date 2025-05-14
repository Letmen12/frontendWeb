import React, { useEffect, useState } from 'react';
import './MyOrdersPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const user_id = user?.id;

        const response = await axios.post(`http://localhost:4004/api/orders/filter`, {
          user_id ,
        });
        console.log("Fetched orders:", response.data);

        if (response.status === 200) {
          setOrders(response.data);
        } else {
          console.warn('Unexpected status:', response.status);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <div className="offers-header">
        <button onClick={() => navigate(-1)} className="back-button" aria-label="Back">
          ←
        </button>
        <h2>Миний захиалгууд</h2>
      </div>
      {orders.length === 0 ? (
        <p>Захиалга олдсонгүй.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Огноо</th>
              <th>Төлбөр</th>
              <th>Төлөв</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{new Date(order.order_date).toLocaleDateString('mn-MN')}</td>
                <td>{order.total_price.toLocaleString()}₮</td>
                <td>{order.order_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

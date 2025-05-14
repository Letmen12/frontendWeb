import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderRow from "./orderRow";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4004/api/orderDetails/`,);
        
        console.log("Fetched orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Түр хүлээнэ үү...</p>;

  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Нэр</th>
          <th>Утас</th>
          <th>Имэйл</th>
          <th>Загвар</th>
          <th>Илгээсэн огноо</th>
          <th>Ширхэг</th>
          <th>Үнэ</th>
          <th>Төлөв</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <OrderRow key={order.id} order={order} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
}

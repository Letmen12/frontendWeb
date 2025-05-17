import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./userListPage.css";

export default function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4004/api/users/list`,);
        if (response.status === 200) {
          setUsers(response.data); 
        } else {
          console.warn('Failed to fetch users, status:', response.status);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="users-container">
      {users.length === 0 ? (
        <p>Хэрэглэгч олдсонгүй.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Нэр</th>
              <th>И-мэйл</th>
              <th>Утас</th>
              <th>Багц</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.offer_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

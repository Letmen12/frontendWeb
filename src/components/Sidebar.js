import React from 'react';
import './sidebar.css';
import { FaChartBar, FaList, FaCog, FaTags, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">QGeneret.mn</h3>
      <ul className="sidebar-list">
        <li className="sidebar-item"><FaList /> Миний QR</li>
        <li className="sidebar-item"><FaChartBar /> Тайлан</li>
        <li className="sidebar-item"><FaCog /> Тохиргоо</li>
        <li className="sidebar-item"><FaTags /> Үнийн санал</li>
        <li className="sidebar-item"><FaPlus /> Нэмжмлэх</li>
        <li className="sidebar-item logout" onClick={handleLogout}>
          <FaSignOutAlt /> Системээс гарах
        </li>
      </ul>
    </div>
  );
}

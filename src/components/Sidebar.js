import React from 'react';
import './sidebar.css';
import { FaList,FaTags, FaSignOutAlt, FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className='sider-title'>
      <img src="/logo.png" alt="Profile" className="profile-image" />
        <h3 className="sidebar-title">QGeneret.mn</h3>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-item" onClick={() => navigate('/orders')}>
          <FaList /> Миний захиалгууд
        </li>
        <li className="sidebar-item" onClick={() => navigate('/cardsPage')}>
          <FaCartPlus />Нэрийн хуудасууд
        </li>
        <li className="sidebar-item" onClick={() => navigate('/offers')}>
          <FaTags /> Үнийн санал
        </li>
        <li className="sidebar-item logout" onClick={handleLogout}>
          <FaSignOutAlt /> Системээс гарах
        </li>
      </ul>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CardsPage.css';

export default function CardsPage() {
  const rawUser = localStorage.getItem('user');
  const user = rawUser ? JSON.parse(rawUser) : {};
  const user_id = user?.id?.toString() || '';

  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`http://localhost:4004/api/templates/filter/${user_id}`);
        const data = response.data.templates || [];

        console.log('Fetched Templates:', data);
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, [user_id]);

  const renderModernTemplate = (template, index) => (
    <div key={index} className="template-card modern-cards">
      <div className="modern-left">
        {template.profileImage ? (
          <img src={template.profileImage} alt="Profile" className="profile-image" />
        ) : (
          <div className="profile-placeholder">👤</div>
        )}
      </div>
      <div className="modern-right">
        <h2>{template.name}</h2>
        <p>{template.title} at {template.company}</p>
        <p>📞 {template.phone}</p>
        <p>✉️ {template.email}</p>
      </div>
    </div>
  );

  const renderMinimalTemplate = (template, index) => (
    <div key={index} className="template-card minimal-card">
      <div className="header-section">
        {template.profileImage ? (
          <img src={template.profileImage} alt="Profile" className="profile-image-rounded" />
        ) : (
          <div className="profile-placeholder">👤</div>
        )}
        <div className="text-info">
          <h2 className="name-text">{template.name}</h2>
          <p className="job-title">{template.title}</p>
          <p className="company-name">{template.company}</p>
        </div>
      </div>
      <div className="contact-section">
        <p><strong>📞</strong> {template.phone}</p>
        <p><strong>✉️</strong> {template.email}</p>
      </div>
    </div>
  );

  const renderCard = (template, index) => {
    if (template.template === 'modern') {
      return renderModernTemplate(template, index);
    } else {
      return renderMinimalTemplate(template, index);
    }
  };

  return (
    <div className="view-card">
        <button onClick={() => navigate(-1)} className="back-button" aria-label="Back">
          ←
        </button>
      {templates.length === 0 ? (
        <div className='center-title'>Одоогоор та нэрийн хуудас үүсгээгүй байна.</div>
      ) : (
        templates.map((template, index) => renderCard(template, index))
      )}
    </div>
  );
}

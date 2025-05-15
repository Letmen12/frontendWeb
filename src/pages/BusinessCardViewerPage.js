import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BusinessCardViewerPage() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`http://192.168.37.118:4004/api/templates/user/${id}`);
        const data = response.data.templates;
        console.log('Fetched Template:', data);

        if (Array.isArray(data)) {
          setTemplate(data[0]);
        } else {
          setTemplate(data);
        }
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };
    fetchTemplate();
  }, [id]);

  const theme = {
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '10px',
  };

  const renderModernTemplate = () => (
    <div className="modern-card" style={{ ...theme, position: 'relative', height: '250px' }}>
      <div className="modern-left">
        {template.profileImage ? (
          <img src={template.profileImage} alt="Profile" className="profile-image" />
        ) : (
          <div className="profile-placeholder">👤</div>
        )}
      </div>
      <div className="modern-right" style={{ position: 'relative' }}>
        <h2>{template.name}</h2>
        <p>{template.title} at {template.company}</p>
        <p>📞 {template.phone}</p>
        <p>✉️ {template.email}</p>
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className="modern-card" style={theme}>
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

  if (!template) return <div>Loading...</div>;

  return (
    <div style={{ padding: '40px' }} className='view-card'>
      {template.template === 'modern' ? renderModernTemplate() : renderMinimalTemplate()}
    </div>
  );
}

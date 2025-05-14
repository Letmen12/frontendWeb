// BusinessCardViewerPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BusinessCardViewerPage() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`http://localhost:4004/api/templates/${id}`);
        setTemplate(response.data);
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };
    fetchTemplate();
  }, [id]);

  if (!template) return <div>Loading...</div>;

  return (
    <div>
      <h1>{template.name}</h1>
      <p>{template.title} at {template.company}</p>
      <p>📞 {template.phone}</p>
      <p>✉️ {template.email}</p>
      <p>🌐 {template.website}</p>
      {template.profileImage && <img src={template.profileImage} alt="Profile" />}
    </div>
  );
}

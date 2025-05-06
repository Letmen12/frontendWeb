import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './BusinessCardPage.css'; 

export default function BusinessCardPage() {
  const [form, setForm] = useState({
    name: 'John Doe',
    title: 'Software Engineer',
    company: 'TechNova LLC',
    phone: '+1 (123) 456-7890',
    email: 'john@example.com',
    website: 'https://john.dev',
    profileImage: '',
    template: 'modern',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const vCard = `
BEGIN:VCARD
VERSION:3.0
N:${form.name}
ORG:${form.company}
TITLE:${form.title}
TEL:${form.phone}
EMAIL:${form.email}
URL:${form.website}
END:VCARD
`.trim();

  const renderModernTemplate = () => (
    <div className="card modern-card">
      <div className="modern-left">
        {form.profileImage ? (
          <img src={form.profileImage} alt="Profile" className="profile-image" />
        ) : (
          <div className="profile-placeholder">👤</div>
        )}
        <QRCodeSVG value={vCard} size={100} />
      </div>
      <div className="modern-right">
        <h2>{form.name}</h2>
        <p>{form.title} at {form.company}</p>
        <div className="contact-info">
          <p>📞 {form.phone}</p>
          <p>✉️ {form.email}</p>
          <p>
            🔗 <a href={form.website} target="_blank" rel="noreferrer">
              {form.website}
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className="card minimal-card">
      {form.profileImage && (
        <img src={form.profileImage} alt="Profile" className="profile-image" />
      )}
      <h2>{form.name}</h2>
      <p className="job-title">{form.title}</p>
      <p className="company-name">{form.company}</p>
      <p>{form.phone}</p>
      <p>{form.email}</p>
      <a href={form.website} target="_blank" rel="noreferrer">
        {form.website}
      </a>
      <div className="qr-wrapper">
        <QRCodeSVG value={vCard} size={120} />
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <h1>Бизнес карт үүсгэх</h1>
      <form className="card-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-grid">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
          <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" />
          <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input name="website" value={form.website} onChange={handleChange} placeholder="Website" />
        </div>

        <div className="upload-section">
          <label>Upload Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <div className="template-select">
          <label>Select Template</label>
          <select name="template" value={form.template} onChange={handleChange}>
            <option value="modern">Modern Template</option>
            <option value="minimal">Minimal Template</option>
          </select>
        </div>
      </form>

      <div className="preview-wrapper">
        {form.template === 'modern' ? renderModernTemplate() : renderMinimalTemplate()}
      </div>
    </div>
  );
}

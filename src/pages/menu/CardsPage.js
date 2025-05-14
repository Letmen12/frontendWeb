
import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import "./CardsPage.css"; 

const CardsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : {};
  const user_id = user?.id?.toString() || '';

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get("http://localhost:4004/api/templates/${user_id}");
        setCards(res.data);
      } catch (err) {
        console.error("Error fetching templates", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const renderModernTemplate = (form) => {
    const viewerUrl = `http://localhost:3000/view/${form._id}`;
    return (
      <div key={form._id} className="card modern-card">
        <div className="modern-left">
          {form.profileImage ? (
            <img src={form.profileImage} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-placeholder">👤</div>
          )}
          <QRCodeSVG value={viewerUrl} size={106} />
        </div>
        <div className="modern-right">
          <h2>{form.name}</h2>
          <p>{form.title} at {form.company}</p>
          <div className="contact-info">
            <p>📞 {form.phone}</p>
            <p>✉️ {form.email}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderMinimalTemplate = (form) => {
    const viewerUrl = `http://localhost:3000/view/${form._id}`;
    return (
      <div key={form._id} className="card minimal-card">
        <div className="header-section">
          {form.profileImage ? (
            <img src={form.profileImage} alt="Profile" className="profile-image-rounded" />
          ) : (
            <div className="profile-placeholder">👤</div>
          )}
          <div className="text-info">
            <h2>{form.name}</h2>
            <p>{form.title}</p>
            <p>{form.company}</p>
          </div>
        </div>
        <div className="contact-section">
          <p><strong>📞</strong> {form.phone}</p>
          <p><strong>✉️</strong> {form.email}</p>
        </div>
        <div className="qr-wrapper">
          <QRCodeSVG value={viewerUrl} size={106} />
        </div>
      </div>
    );
  };

  const renderCards = () => {
    return cards.map((card) => {
      return card.template === "modern"
        ? renderModernTemplate(card)
        : renderMinimalTemplate(card);
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="cards-page">
      <h1>Your Business Cards</h1>
      <div className="card-list">
        {cards.length > 0 ? renderCards() : <p>No cards available</p>}
      </div>
    </div>
  );
};

export default CardsPage;

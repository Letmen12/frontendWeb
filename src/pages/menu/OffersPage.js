import React, { useState } from 'react';
import './OffersPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OffersPage() {
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [orderNote, setOrderNote] = useState('');
  const [message, setMessage] = useState('');
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : {};
  const user_id = user?.id?.toString() || '';
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const offers = [
    {
      title: 'QR-1 БАГЦ',
      price: '15,000₮',
      description: '1-10 хүртэлх динамик Нэрийн хуудас үүсгэж хандалтын мэдээллийг цаг алдалгүй авах...',
      features: [
        'НӨАТ авах',
        'Шууд тусламж дэмжлэг авах',
        '10 хүртэлх Нэрийн хуудас үүсгэх эрх',
        'Нэрийн хуудас-н утгыг хүссэн үедээ солих'
      ],
      offer_type: 'qr-1'
    },
    {
      title: 'QR-2 БАГЦ',
      price: '25,000₮',
      description: '1-50 хүртэлх динамик Нэрийн хуудас үүсгэж хандалтын мэдээллийг цаг алдалгүй авах...',
      features: [
        'НӨАТ авах',
        'Шууд тусламж дэмжлэг авах',
        '50 хүртэлх Нэрийн хуудас үүсгэх эрх',
        'Нэрийн хуудас-н утгыг хүссэн үедээ солих'
      ],
      offer_type: 'qr-2'
    },
    {
      title: 'СУПЕР БАГЦ',
      price: '140,000₮',
      description: 'QGeneret болон бусад дэд системүүдийг цогцоор ашиглах ААН болон Боловсролын байгууллагад тохиромжтой.',
      features: [
        'Бүгдийг шингээсэн:',
        'QGeneret.mn БОЛОВСРОЛ БАГЦ',
        'QGeneret.mn QR-2 БАГЦ',
      ],
      offer_type: 'super'
    }
  ];

  const openDialog = (offer) => {
    setSelectedOffer(offer);
    setShowDialog(true);
    setOrderNote('');
    setMessage('');
  };

  const order = async () => {
    try {
      const response = await axios.put(`http://localhost:4004/api/users/update-offer-type/${user_id}`, {
        offer_type: selectedOffer.offer_type,
      });

      if (response.status === 200) {
        setShowDialog(false);
        setShowSuccessDialog(true);
      } else {
        setMessage("Багц идэвхжүүлэхэд алдаа гарлаа.");
      }
    } catch (error) {
      console.error("Error updating offer:", error);
      setMessage("Сервертэй холбогдоход алдаа гарлаа.");
    }
  };

  return (
    <div className="offers-container">
      <div className="offers-header">
        <button onClick={() => navigate(-1)} className="back-button" aria-label="Back">←</button>
        <h2 className="offers-title">Үнийн санал</h2>
      </div>

      <div className={`offer-list ${showDialog ? 'blurred' : ''}`}>
        {offers.map((offer, idx) => (
          <div key={idx} className="offer-card">
            <h3>{offer.title}</h3>
            <strong className="price">{offer.price}</strong>
            <p>{offer.description}</p>
            <ul>
              {offer.features.map((feat, i) => (
                <li key={i}>✅ {feat}</li>
              ))}
            </ul>
            <button className="select-button" onClick={() => openDialog(offer)}>
              Багц идэвхжүүлэх
            </button>
          </div>
        ))}
      </div>

      {showDialog && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <div className="payment-header">
              <h3>Төлбөр төлөх</h3>
              <button onClick={() => setShowDialog(false)} className="close-btn">×</button>
            </div>

            <p className="payment-title">Төлбөрийн хэрэгсэл сонгоно уу</p>
            <div className="payment-options">
              <div className="payment-option"><img src="/qpay.png" alt="Qpay" /><p>Qpay</p></div>
              <div className="payment-option"><img src="/socialpay.png" alt="Social Pay" /><p>Social Pay</p></div>
              <div className="payment-option"><img src="/bankcard.jpeg" alt="Bank Card" /><p>Банкны карт</p></div>
            </div>

            <textarea
              placeholder="Захиалгын тайлбар (заавал биш)"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              className="order-note"
            />

            <p className="total-amount">Төлөх дүн: <strong>{selectedOffer?.price}</strong></p>

            {message && (
              <p className={message.includes("амжилттай") ? "success-message" : "error-message"}>
                {message}
              </p>
            )}
            <button className="confirm-order" onClick={order}>Захиалах</button>
          </div>
        </div>
      )}
      {showSuccessDialog && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Амжилттай</h2>
            <p>Амжилттай багц идэвхжүүллээ.</p>
            <button onClick={() => setShowSuccessDialog(false)} className="confirm-order">Хаах</button>
          </div>
        </div>
      )}
    </div>
  );
}

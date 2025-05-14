import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import './BusinessCardPage.css';

export default function BusinessCardPage() {
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const previewRef = useRef(null);

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : {};
  const user_id = user?.id?.toString() || '';

  const [templateId, setTemplateId] = useState('');

  const viewerUrl = templateId
    ? `http://localhost:3000/business-card/${templateId}`
    : 'http://localhost:3000/home';

  const [form, setForm] = useState({
    name: user?.fname || '',
    title: 'Software Engineer',
    company: 'TechNova LLC',
    phone: user?.phone || '',
    email: user?.email || '',
    website: viewerUrl,
    profileImage: '',
    template: 'modern',
    user_id: user_id
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

  const createTemplate = async () => {
    try {
      const response = await axios.post("http://localhost:4004/api/templates/create", form);
      if (response.status === 201 || response.data.success) {
        console.log("Template create response:", response.data);

        return response.data.template._id?.toString();
      } else {
        setMessage("Бизнес карт үүсгэхэд алдаа гарлаа.");
        return null;
      }
    } catch (err) {
      console.error("Template creation error:", err);
      setMessage("Template үүсгэхэд алдаа гарлаа: " + err.message);
      return null;
    }
  };
  // const checkExistingTemplate = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:4004/api/templates/user/${user_id}`);
  //     return res.data.templates.length >= 10;
  //   } catch (err) {
  //     console.error("Error checking templates:", err);
  //     return false;
  //   }
  // };

  const order = async () => {
    // const hasTemplate = await checkExistingTemplate();
    // if (hasTemplate) {
    //   setMessage("Та аль хэдийн бизнес карт үүсгэсэн байна.");
    //   return;
    // }

    const template_id = await createTemplate(); 
    if (!template_id) {
      return;
    }

    const order_date = new Date().toISOString();
    const total_price = 10000;
    const order_type = "waiting";


    try {
      const orderRes = await axios.post("http://localhost:4004/api/orders/create", {
        user_id,
        order_date,
        total_price,
        order_type,
      });

      if (orderRes.status === 201) {
        const order_id = orderRes.data.order?._id?.toString();
        if (!order_id) {
          setMessage("Order ID олдсонгүй.");
          return;
        }

        const orderDetailPayload = {
          order_id,
          user_id,
          quantity: 1,
          side: form.template === "modern" ? 2 : 1,
          paper_type: form.template,
          description: orderNote || `Template: ${form.template}, Name: ${form.name}`,
          status: orderRes.data.order?.order_type,
          unit_price: total_price,
          username: user.fname,
          email: user.email,
          phone: user.phone,
          template_id
        };

        const detailRes = await axios.post("http://localhost:4004/api/orderDetails/create", orderDetailPayload);

        if (detailRes.status === 201 || detailRes.data.success) {
          setMessage("Захиалга амжилттай бүртгэгдлээ!");
          setTemplateId(template_id);
          setTimeout(() => {
            setShowDialog(false)
          }, 2000);
        } else {
          setMessage("Order detail үүсгэхэд алдаа гарлаа.");
        }
      }
    } catch (error) {
      console.error("Order error:", error);
      setMessage("Алдаа гарлаа: " + error.message);
    } 
  };

  const renderModernTemplate = () => (
    <div className="card modern-card">
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

  const renderMinimalTemplate = () => (
    <div className="card minimal-card enhanced-minimal-card">
      <div className="header-section">
        {form.profileImage ? (
          <img src={form.profileImage} alt="Profile" className="profile-image-rounded" />
        ) : (
          <div className="profile-placeholder">👤</div>
        )}
        <div className="text-info">
          <h2 className="name-text">{form.name}</h2>
          <p className="job-title">{form.title}</p>
          <p className="company-name">{form.company}</p>
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

  return (
    <div className="page-container">
      <h1>Бизнес карт үүсгэх</h1>
      <div className='row-container'>
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

        <div className="preview-wrapper" ref={previewRef}>
          {form.template === 'modern' ? renderModernTemplate() : renderMinimalTemplate()}
          <button className="order-button" onClick={() => setShowDialog(true)}>Захиалах</button>
        </div>
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
              <div className="payment-option">
                <img src="/qpay.png" alt="Qpay" />
                <p>Qpay</p>
              </div>
              <div className="payment-option">
                <img src="/socialpay.png" alt="Social Pay" />
                <p>Social Pay</p>
              </div>
              <div className="payment-option">
                <img src="/bankcard.jpeg" alt="Bank Card" />
                <p>Банкны карт</p>
              </div>
            </div>

            <textarea
              placeholder="Захиалгын тайлбар (заавал биш)"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              className="order-note"
            />

            <p className="total-amount">Төлөх дүн: <strong>10000₮</strong></p>

            {message && (
              <p className={message.includes("амжилттай") ? "success-message" : "error-message"}>
                {message}
              </p>
            )}

            <button className="confirm-order" onClick={order}>
              {'Захиалах'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

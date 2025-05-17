import React, { useState, useRef } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
import './BusinessCardPage.css';
import { useNavigate } from 'react-router-dom';


const qrButtonStyle = {
  fontWeight: 'bold'
};
const DraggableText = ({ children, defaultPosition }) => {
  const [position, setPosition] = useState(defaultPosition);
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: 'move',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  );
};

export default function BusinessCardPage() {
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [showQr, setShowQr] = useState(false);
  const qrRef = useRef(null);
  const previewRef = useRef(null);
  const navigate = useNavigate();
  const [createdOrderId, setOrderId] = useState('');
  const [createdDetailId, setOrderDetailId] = useState('');

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : {};
  const user_id = user?.id?.toString() || '';
  const viewerUrl = `http://192.168.37.118:3000/UserProfilePage`;
  const [qrUrl, setQrUrl] = useState(`http://192.168.6.118:3000/business-card/`);
  const [, setTemplateId] = useState('');

  const order = async () => {
    setShowDialog(true)
    const order_date = new Date().toISOString();
    const total_price = 10000;
    const order_type = "Илгээсэн";

    try {
      // Create Order
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

        // Store globally
        setOrderId(order_id);

        // Create Order Detail
        const detailRes = await axios.post("http://localhost:4004/api/orderDetails/create", {
          order_id,
          user_id,
          quantity: 1,
          side: form.template === "modern" ? 2 : 1,
          paper_type: form.template,
          description: orderNote || `Template: ${form.template}, Name: ${form.name}`,
          status: order_type,
          unit_price: total_price,
          username: user.fname,
          email: user.email,
          phone: user.phone,
        });

        setOrderDetailId(detailRes.data?._id);

        setMessage("Захиалга амжилттай үүслээ!");
      }
    } catch (error) {
      console.error("Order error:", error);
      setMessage("Алдаа гарлаа: " + error.message);
    }
  };

  const payment = async () => {
    try {
      if (!createdOrderId || !createdDetailId) {
        setMessage("Order эсвэл OrderDetail ID олдсонгүй.");
        return;
      }

      await axios.put(`http://localhost:4004/api/orderDetails/${createdDetailId}`, {
        status: "Дууссан",
      });

      await axios.put(`http://localhost:4004/api/orders/${createdOrderId}`, {
        order_type: "Дууссан",
      });

      setMessage("Төлбөр амжилттай. Захиалга дууссан.");
      setTimeout(() => setShowDialog(false), 2000);
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("Төлбөрийн алдаа: " + error.message);
    }
  };

  const inactive = async () => {
    try {
      if (!createdOrderId || !createdDetailId) {
        setMessage("Order эсвэл OrderDetail ID олдсонгүй.");
        return;
      }

      await axios.put(`http://localhost:4004/api/orderDetails/${createdDetailId}`, {
        status: "Илгээсэн",
      });

      await axios.put(`http://localhost:4004/api/orders/${createdOrderId}`, {
        order_type: "Илгээсэн",
      });
      setShowDialog(false);
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("Төлбөрийн алдаа: " + error.message);
    }
  };

  const [form, setForm] = useState({
    name: user?.fname || '',
    title: 'Software Engineer',
    company: 'TechNova LLC',
    phone: user?.phone || '',
    email: user?.email || '',
    website: viewerUrl,
    profileImage: '',
    template: 'modern',
    user_id: user_id,
    offer_type: user?.offer_type
  });

  const [theme, setTheme] = useState({
    backgroundColor: '#ffffff',
    fontColor: '#000000',
    fontFamily: 'Arial',
    textAlign: 'left',
    textTransform: 'none'
  });

  const [activeTab, setActiveTab] = useState('info');

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

  const handleThemeChange = (e) => {
    setTheme({ ...theme, [e.target.name]: e.target.value });
  };

  const toggleQrCode = async () => {
    const hasReachedLimit = await checkExistingTemplate();
    if (hasReachedLimit >= 5) {
      setMessage("Та аль хэдийн 5 бизнес карт үүсгэсэн байна.");
      navigate('/offers'); 
      return null;         
    }
    const newTemplateId = await createTemplate();
    if (newTemplateId) {
      setTemplateId(newTemplateId); 
      setQrUrl(`http://192.168.6.118:3000/business-card/${newTemplateId}`);
      setShowQr((prev) => !prev);
    }
  };


  const createTemplate = async () => {
    try {
      const response = await axios.post("http://localhost:4004/api/templates/create", form);
      if (response.status === 201 || response.data.success) {
        const newId = response.data.template._id?.toString();
        setTemplateId(newId); 
        return newId; 
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


  const checkExistingTemplate = async () => {
    try {
      const res = await axios.get(`http://localhost:4004/api/templates/count/${user_id}`);
      return res.data.count;
    } catch (err) {
      console.error("Error checking templates:", err);
      return false;
    }
  };

  const renderModernTemplate = () => (
    <div className="modern-card" style={{ ...theme, position: 'relative', height: '250px' }}>
      <div className="modern-left">
        {form.profileImage ? (
          <img src={form.profileImage} alt="Profile" className="profile-image" />
        ) : (
          <div className="profile-placeholder">👤</div>
        )}
      </div>
      <div className="modern-right" style={{ position: 'relative' }}>
        <DraggableText defaultPosition={{ x: 10, y: 10 }}><h2>{form.name}</h2></DraggableText>
        <DraggableText defaultPosition={{ x: 10, y: 50 }}><p>{form.title} at {form.company}</p></DraggableText>
        <DraggableText defaultPosition={{ x: 10, y: 90 }}><p>📞 {form.phone}</p></DraggableText>
        <DraggableText defaultPosition={{ x: 10, y: 130 }}><p>✉️ {form.email}</p></DraggableText>
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className="modern-card" style={theme}>
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
    </div>
  );

  const renderInfoForm = () => (
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
        <label>Зураг оруулах</label>
        <input type="file" accept="image/*" onChange={handleImageUpload}/>
      </div>
      <div className="template-select">
        <label>Загвар сонгох</label>
        <select name="template" value={form.template} onChange={handleChange}>
          <option value="modern">Modern Template</option>
          <option value="minimal">Minimal Template</option>
        </select>
      </div>
    </form>
  );

  const renderDesignEditor = () => (
    <div className="panel">
      <label>Background Color</label>
      <input type="color" name="backgroundColor" value={theme.backgroundColor} onChange={handleThemeChange} />
      <label>Font Color</label>
      <input type="color" name="fontColor" value={theme.fontColor} onChange={handleThemeChange} />
      <label>Font Family</label>
      <select name="fontFamily" value={theme.fontFamily} onChange={handleThemeChange}>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier New</option>
        <option value="Tahoma">Tahoma</option>
      </select>
      <label>Text Align</label>
      <select name="textAlign" value={theme.textAlign} onChange={handleThemeChange}>
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
      <label>Text Transform</label>
      <select name="textTransform" value={theme.textTransform} onChange={handleThemeChange}>
        <option value="none">None</option>
        <option value="uppercase">UPPERCASE</option>
        <option value="lowercase">lowercase</option>
        <option value="capitalize">Capitalize</option>
      </select>
    </div>
  );

  return (
    <div className="page-container">
      <h1>Бизнес карт үүсгэх</h1>
      <div className='row-container'>
        <div className="preview-wrapper" ref={previewRef}>
          {form.template === 'modern' ? renderModernTemplate() : renderMinimalTemplate()}
          <div className="qr-code-section">
            <button onClick={toggleQrCode} className='qr-title' style={qrButtonStyle}>
            {showQr ? 'Qr код дахин үүсгэх' : 'Qr код үүсгэх '}</button>
              {showQr && (
                <div className='qr-content'>
                  <div className='qr-border'>
                    <div ref={qrRef} className='qr-wrapper'>
                      <QRCode value={qrUrl} size={106} />
                    </div>
                  </div>
                  <h2>Та зөвхөн 5 удаа нэрийн хуудасны qr үүсгэх эрхтэй.</h2>
                </div>
              )}
          </div>
          <button className="order-button" onClick={order}>Захиалах</button>
        </div>
        <div className="right-column">
          <div className="tabs">
            <button onClick={() => setActiveTab('info')} className={activeTab === 'info' ? 'active' : ''}>Info</button>
            <button onClick={() => setActiveTab('design')} className={activeTab === 'design' ? 'active' : ''}>Design</button>
          </div>
          {activeTab === 'info' ? renderInfoForm() : renderDesignEditor()}
        </div>
      </div>
      {showDialog && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <div className="payment-header">
              <h3>Төлбөр төлөх</h3>
              <button onClick={inactive} className="close-btn">×</button>
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

            <button className="confirm-order" onClick={payment}>
              Төлбөр төлөх
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import './PDFPage.css';

export default function PDFPage() {
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [material, setMaterial] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [message, setMessage] = useState('');

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : {};
  const user_id = user?.id?.toString() || '';

  const calculatePrice = () => {
    const pricePerUnit = 100;
    return quantity && type
      ? (parseInt(quantity) * parseInt(type) * pricePerUnit).toFixed(2)
      : '0.00';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Файл сонгоно уу!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('quantity', quantity);
    formData.append('material', material);
    formData.append('description', description);

    try {
      const res = await fetch('http://192.168.6.118:4004/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        alert('Серверээс алдаа ирлээ');
        return;
      }

      const data = await res.json();

      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);

        try {
          const newMaterial = await axios.post("http://192.168.6.118:4004/api/materials/create", {
            user_id: user_id,
            file_url: data.downloadUrl,
            quantity: quantity,
            side: type,
            paper_type: material,
            description: description,
            total_price: parseFloat(calculatePrice()),
          });

          if (newMaterial.status === 201) {
            const order_date = new Date().toISOString();
            const order_type = "Дууссан";
            try {
            // Create Order
            const orderRes = await axios.post("http://192.168.6.118:4004/api/orders/create", {
              user_id: user_id,
              order_date: order_date,
              total_price: parseFloat(calculatePrice()),
              order_type: order_type,
            });

            if (orderRes.status === 201) {
              const order_id = orderRes.data.order?._id?.toString();
              if (!order_id) {
                setMessage("Order ID олдсонгүй.");
                return;
              }


              const detailRes = await axios.post("http://192.168.6.118:4004/api/orderDetails/create", {
                order_id: order_id,
                user_id: user_id,
                quantity: quantity,
                side: type,
                paper_type: material,
                description: description,
                status: order_type,
                unit_price: parseFloat(calculatePrice()),
                username: user.fname,
                email: user.email,
                phone: user.phone,
              });
            }
          } catch (error) {
            console.error("Order error:", error);
            setMessage("Алдаа гарлаа: " + error.message);
          }
          } else {
            setMessage("Material үүсгэхэд алдаа гарлаа.");
          }
        } catch (error) {
          console.error("Order error:", error);
          setMessage("Алдаа гарлаа: " + error.message);
        }
      } else {
        alert('Файл илгээхэд алдаа гарлаа');
      }
    } catch (err) {
      console.error(err);
      alert('Сервертэй холбогдоход алдаа гарлаа');
    }
  };

  return (
    <div className="pdf-form-container">
      <h2 className="pdf-title">Өөрийн загвараа оруулна уу!</h2>

      <form onSubmit={handleSubmit} className="pdf-form">
        <div className="form-group">
          <label>Тал</label>
          <input
            type="number"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Ширхэг</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Цаасны төрөл</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
          >
            <option value="">--Сонгох--</option>
            <option value="matt">Мэтт цаас</option>
            <option value="glossy">Гялгар цаас</option>
          </select>
        </div>

        <div className="form-group">
          <label>Тайлбар</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Файл оруулах</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          {file && <p className="file-info">Сонгосон файл: {file.name}</p>}
        </div>

        <div className="total-price">Нийт үнэ: {calculatePrice()} ₮</div>

        <button type="submit" className="submit-btn">Захиалах</button>
      </form>

      {message && <p className="info-message">{message}</p>}

      {downloadUrl && (
        <div className="qr-code-section">
          <h3>Файлаа татах QR код:</h3>
          <QRCodeSVG value={downloadUrl} size={200} />
          <p>Энэ QR кодыг уншуулснаар файл татагдана</p>
          <a href={downloadUrl} download>Файлыг татах</a>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import './PDFPage.css';

export default function PDFPage() {
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [material, setMaterial] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const calculatePrice = () => {
    const pricePerUnit = 100;
    return quantity && type ? (parseInt(quantity) * parseInt(type) * pricePerUnit).toFixed(2) : '0.00';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:');
    console.log('Тал:', type);
    console.log('Ширхэг:', quantity);
    console.log('Цаасны төрөл:', material);
    console.log('Тайлбар:', description);
    console.log('Файл:', file);
    alert('Захиалга илгээгдлээ!');
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
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && <p className="file-info">Сонгосон файл: {file.name}</p>}
        </div>

        <div className="total-price">Нийт үнэ: {calculatePrice()} ₮</div>

        <button type="submit" className="submit-btn">
          Захиалах
        </button>
      </form>
    </div>
  );
}

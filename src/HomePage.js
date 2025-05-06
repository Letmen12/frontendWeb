import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PDFPage from './pages/PDFPage';
import BusinessCardPage from './pages/BusinessCardPage';
import './home.css';
import UserFormPage from './pages/UserFormPage';

const types = [
  { label: 'Өөрийн веб линк үүсгэх', icon: '🌐' },
  { label: 'PDF', icon: '📄' },
  { label: 'Нэрийн хуудас', icon: '🪪' },
];

export default function HomePage() {
  const [selectedType, setSelectedType] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (selectedType) setStep(2);
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="step-container"><div className="type-selection">
            {types.map(({ label, icon }) => (
              <button
                key={label}
                className={`type-button ${label === selectedType ? 'active' : ''}`}
                onClick={() => setSelectedType(label)}
              >
                <span className="icon">{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {selectedType && (
            <div className="type-description">
              {selectedType === 'Өөрийн веб линк үүсгэх' && (
                <p>
                  Өөрийн мэдээллийг оруулан таны өөрийн гэсэн хуудас үүсэх боломжтой болно.
                </p>
              )}
              {selectedType === 'PDF' && (
                <p>
                  PDF file оруулан таны pdf үүсэх болно.
                </p>
              )}
              {selectedType === 'Нэрийн хуудас' && (
                <p>
                  Өөрийн мэдээллийг оруулан таны нэрийн хуудас үүсэх болно.
                </p>
              )}
            </div>
          )}
          <div className="step-header">
            <button onClick={handleNext} className="next-button">Дараах</button>
          </div>
        </div>
      );
    }

    switch (selectedType) {
      case 'Өөрийн веб линк үүсгэх':
        return <UserFormPage/>;
      case 'PDF':
        return <PDFPage />;
      case 'Нэрийн хуудас':
        return <BusinessCardPage />;
      default:
        return <div>Алдаа гарлаа.</div>;
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="home-body">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
}

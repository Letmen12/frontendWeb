import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PDFPage from './pages/PDFPage';
import BusinessCardPage from './pages/BusinessCardPage';
import './home.css';
import UserFormPage from './pages/UserFormPage';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const types = [
  { label: 'Өөрийн веб линк үүсгэх', icon: '🌐' },
  { label: 'PDF', icon: '📄' },
  { label: 'Нэрийн хуудас', icon: '🪪' },
];

// Correct public path (no "/public")
const images = [
  '/images/slider1.png',
  '/images/slider2.png',
  '/images/slider3.png',
  '/images/slider4.png',
];

export default function HomePage() {
  const [selectedType, setSelectedType] = useState('');
  const [step, setStep] = useState(1);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleNext = () => {
    if (selectedType) setStep(2);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 400,
    responsive: [         
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  };

  const renderSlider = () => (
    <div className="image-slider">
      <Slider {...sliderSettings}>
        {images.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Slide ${index}`} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="step-container">
          <div className="type-selection">
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
                <p>Өөрийн мэдээллийг оруулан таны өөрийн гэсэн хуудас үүсэх боломжтой болно.</p>
              )}
              {selectedType === 'PDF' && (
                <p>PDF file оруулан таны pdf үүсэх болно.</p>
              )}
              {selectedType === 'Нэрийн хуудас' && (
                <p>Өөрийн мэдээллийг оруулан таны нэрийн хуудас үүсэх болно.</p>
              )}
            </div>
          )}
          <div className="step-header">
            <button onClick={handleNext} className="next-button">Дараах</button>
          </div>
          
          {renderSlider()}

        </div>
      );
    }

    switch (selectedType) {
      case 'Өөрийн веб линк үүсгэх':
        return <UserFormPage />;
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
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header onMenuClick={toggleSidebar} />
        <div className="home-body">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
}

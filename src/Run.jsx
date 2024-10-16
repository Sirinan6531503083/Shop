import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Run.css'; 
import logo from './image/logomfu.jpg';
import promotionImage1 from './image/runn.jpg'; 
import promotionImage2 from './image/wat.jpg'; 
import promotionImage3 from './image/bbag.jpg'; 
import profileImage from './image/profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faBox, faStar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Promotion = () => {
  const [isOpen, setIsOpen] = useState(false); // State สำหรับเปิด modal
  const [selectedImage, setSelectedImage] = useState(null); // State สำหรับเก็บรูปภาพที่ถูกเลือก

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsOpen(true); // เปิด modal
  };

  const handleCloseModal = () => {
    setIsOpen(false); // ปิด modal
    setSelectedImage(null); // รีเซ็ตภาพที่เลือก
  };

 
  return (
    <div className="promotion-container">
      <div className="promotion-card" onClick={() => handleImageClick(promotionImage1)}>
        <img src={promotionImage1} alt="Promotion 1" className="runn-image" /> 
        <h3>40% off on all running gear!</h3>
        <p>Use code <strong>RUN10</strong> at checkout. Valid until the end of the month.</p>
      </div>
      <div className="promotion-card" onClick={() => handleImageClick(promotionImage2)}>
        <img src={promotionImage2} alt="Promotion 2" className="wat-image" /> 
        <h3>Free shipping on orders over $50!</h3>
        <p>Shop now and enjoy free shipping on your next order.</p>
      </div>
      <div className="promotion-card" onClick={() => handleImageClick(promotionImage3)}>
        <img src={promotionImage3} alt="Promotion 3" className="bbag-image" /> 
        <h3>Buy one, get one 50% off!</h3>
        <p>Mix and match on selected items. Limited time offer!</p>
      </div>

      {/* Modal สำหรับแสดงรูปภาพที่ขยาย */}
      {isOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <img src={selectedImage} alt="Expanded Promotion" className="expanded-image" />
          </div>
        </div>
      )}
    </div>
  );
};

const Run = () => {
  const navigate = useNavigate(); // ใช้ useNavigate

  const handleBackClick = () => {
    navigate(-1); // กลับไปหน้าก่อนหน้า
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="MFU Logo" className="navbar-logo" />
          <h1 className="navbar-title">MFU ECOMMERCE</h1>
        </div>
        <div className="navbar-right">
          <button onClick={handleBackClick}>Back</button>
          <button className="profile-button">Profile</button>
          <button className="logout-button" onClick={() => console.log('Logging out...')}>Logout</button>
        </div>
      </div>

      <div className="shop-container">
        <div className="shop-sidebar">
          <div className="shop-profile">
            <img src={profileImage} alt="Profile" className="profile-image" />
          </div>
          <div className="shop-details">
            <h2>THAI CHAYANON</h2>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Address:</strong> Mae Fah Luang University</p>
            <p><FontAwesomeIcon icon={faPhoneAlt} /> <strong>Phone Number:</strong> 0984790272</p>
            <p><FontAwesomeIcon icon={faBox} /> <strong>Total Products:</strong> 2</p>
            <p><FontAwesomeIcon icon={faStar} /> <strong>Shop Ratings:</strong> 5/5</p>
            <p><FontAwesomeIcon icon={faCalendarAlt} /> <strong>Joined On:</strong> 2024-10-02</p>
          </div>
        </div>

        <div className="shop-main">
          <div className="shop-tabs">
            <button className="shop-products-button" onClick={() => navigate('/')}>Shop Products</button>
            <button className="running-events-button" onClick={() => navigate('/run')}>Running Events</button>
            <button className="shop-reviews-button" onClick={() => navigate('/shopreview')}>Shop Reviews</button>
          </div>

          <h2>Special Promotions</h2>
          
          {/* เพิ่มส่วนแนะนำโปรโมชั่นสินค้า */}
          <Promotion />
        </div>
      </div>
    </div>
  );
};

export default Run;

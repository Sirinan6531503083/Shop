import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faEye, faCartPlus, faMapMarkerAlt, faPhoneAlt, faBox, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './Shop.css'; 
import logo from './image/logomfu.jpg';
import profileImage from './image/profile.jpg'; 
import Study from './image/Study.jpg'; 
import shirt from './image/shirt.jpg'; 

const ProductCard = ({ image, title, oldPrice, price, sold, onImageClick }) => {
  const [rating, setRating] = useState(0);
  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(true);
  const [alert, setAlert] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleAddToCart = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 2000); // Show alert for 2 seconds
  };

  return (
    <div className="product-card">
      <img src={image} alt={title} style={{ display: visible ? 'block' : 'none' }} onClick={() => onImageClick(image)} />
      <h3>{title}</h3>
      <p className="old-price">{oldPrice}฿</p>
      <p className="price">{price}฿</p>
      <p>{sold} sold</p>

      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            className={`star ${rating >= star ? 'filled' : ''}`}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>

      <div className="icon-container">
        <FontAwesomeIcon
          icon={faHeart}
          className={`heart ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        />
        <FontAwesomeIcon
          icon={faEye}
          className="visibility-icon" 
          onClick={toggleVisibility}
        />
        <FontAwesomeIcon
          icon={faCartPlus}
          className="cart-icon" 
          onClick={handleAddToCart}
        />
      </div>

      {alert && <div className="alert">Product stock limited!</div>}
    </div>
  );
};

const Shop = () => {
  const navigate = useNavigate(); 
  const [modalImage, setModalImage] = useState(null);

  const handleBackClick = () => {
    navigate(-1); 
  };

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
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
            <button className="gold-button">Shop Products</button>
            <button onClick={() => navigate('/run')}>Running Events</button>
            <button onClick={() => navigate('/shopreview')}>Shop Reviews</button>
          </div>

          <h2>Shop Products</h2>
          
          <div className="shop-products">
            <ProductCard
              image={Study}
              title="Study Supplies"
              oldPrice="54"
              price="255"
              sold="0"
              onImageClick={handleImageClick}
            />
            <ProductCard
              image={shirt}
              title="Red Shirt"
              oldPrice="1645"
              price="795"
              sold="9"
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      </div>

      {modalImage && (
        <div className="image-modal" onClick={closeModal}>
          <img src={modalImage} alt="Expanded view" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default Shop;

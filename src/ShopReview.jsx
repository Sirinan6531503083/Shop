import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopReview.css';
import logo from './image/logomfu.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faBox, faStar, faCalendarAlt, faPen, faHeart, faEye, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import reviewImage1 from './image/bag.jpg';
import reviewImage2 from './image/dress.jpg';
import profileImage from './image/profile.jpg';
import reviewImage3 from './image/gap.jpg';

const ProductCard = ({ image, title, oldPrice, price, sold, onAddToCart, onLike }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p className="old-price">{oldPrice}฿</p>
      <p className="price">{price}฿</p>
      <p>{sold} sold</p>

      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            className="star"
            onClick={() => onLike(star)}
          />
        ))}
      </div>

      <div className="icon-container">
        <FontAwesomeIcon icon={faHeart} className="heart" onClick={onLike} />
        <FontAwesomeIcon icon={faEye} className="visibility-icon" />
        <FontAwesomeIcon icon={faCartPlus} className="cart-icon" onClick={onAddToCart} />
      </div>
    </div>
  );
};

const ShopReview = () => {
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [reviewImage, setReviewImage] = useState(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // แสดงข้อความยืนยันการรีวิว และซ่อนฟอร์มรีวิวหลังส่งเสร็จ
    setShowConfirmation(true);
    setReviewText('');
    setReviewImage(null);
    setIsFormVisible(false);
    setTimeout(() => setShowConfirmation(false), 3000); // แสดงข้อความยืนยันเป็นเวลา 3 วินาที
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
            <button className="gold-button" onClick={() => navigate('/')}>Shop Products</button>
            <button onClick={() => navigate('/run')}>Running Events</button>
            <button className="shop-review-button" onClick={() => navigate('/shopreview')}>Shop Reviews</button>
          </div>

          <div className="product-reviews">
            <h2>Product Reviews</h2>
            <div className="write-review-container">
              <button className="write-review-button" onClick={() => setIsFormVisible(!isFormVisible)}>
                <FontAwesomeIcon icon={faPen} /> Write a Review
              </button>
            </div>

            {isFormVisible && (
              <div className="review-form">
                <h3>Write a Review</h3>
                <form onSubmit={handleSubmit}>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                    required
                  />
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  {reviewImage && <img src={reviewImage} alt="Preview" className="preview-image" />}
                  <button type="submit" className="submit-button">Submit</button>
                </form>
              </div>
            )}

            {showConfirmation && (
              <div className="confirmation-message">
                <p>Thank you for your review!</p>
              </div>
            )}

            {modalImage && (
              <div className="image-modal" onClick={closeModal}>
                <img src={modalImage} alt="Expanded view" className="modal-image" />
              </div>
            )}

            <div className="review-card" onClick={() => handleImageClick(reviewImage1)}>
              <img src={reviewImage1} alt="Bag" className="review-image" />
              <h3>Great Product!</h3>
              <p>This product exceeded my expectations. Highly recommend!</p>
              <p><strong>- John Doe</strong></p>
            </div>
            <div className="review-card" onClick={() => handleImageClick(reviewImage3)}>
              <img src={reviewImage3} alt="gap" className="review-image" />
              <h3>Not worth the price</h3>
              <p>I expected more for the price. It's decent but not great.</p>
              <p><strong>- Jane Smith</strong></p>
            </div>
            <div className="review-card" onClick={() => handleImageClick(reviewImage2)}>
              <h3>Not worth the price</h3>
              <p>I expected more for the price. It's decent but not great.</p>
              <p><strong>- Jane Smith</strong></p>
            </div>
            <div className="review-card" onClick={() => handleImageClick(reviewImage2)}>
              <h3>Not worth the price</h3>
              <p>I expected more for the price. It's decent but not great.</p>
              <p><strong>- Jane Smith</strong></p>
            </div>
            <div className="review-card" onClick={() => handleImageClick(reviewImage2)}>
              <img src={reviewImage2} alt="Dress" className="review-image" />
              <h3>Not worth the price</h3>
              <p>I expected more for the price. It's decent but not great.</p>
              <p><strong>- Jane Smith</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopReview;

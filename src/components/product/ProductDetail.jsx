import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../../context/AppContext";
import RelatedProduct from "./RelatedProduct";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  // const url = "http://localhost:3000/api";
  // const url = "https://mern-ecommerce-backend-ejje.onrender.com/api";
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/${id}`, {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        });
        setProduct(api.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(
        product._id,
        product.title,
        product.price,
        quantity,
        product.imgSrc
      );
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(
        product._id,
        product.title,
        product.price,
        quantity,
        product.imgSrc
      );
      navigate("/cart");
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  if (!product) {
    return <div className="loading">Loading product details...</div>;
  }

  return (
    <>
      <div className="product-detail-container">
        <div className="product-detail">
          <div className="product-image">
            <img src={product.imgSrc} alt={product.title} />
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-description">{product.description}</p>

            <div className="product-price">
              <span className="price">₹{product.price}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice}</span>
              )}
            </div>

            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button onClick={decreaseQuantity}>-</button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />
                <button onClick={increaseQuantity}>+</button>
              </div>
            </div>

            <div className="product-actions">
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Availability:</span>
                <span className="meta-value in-stock">
                  {product.qty > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-products-section">
        <RelatedProduct category={product.category} />
      </div>
    </>
  );
};

export default ProductDetail;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

const ShowProduct = () => {
  const { products, filteredData, addToCart } = useContext(AppContext);

  const handleAddToCart = (product) => {
    if (addToCart && product) {
      addToCart(
        product._id,
        product.title,
        product.price,
        1, // Default quantity
        product.imgSrc
      );
    }
  };

  // Loading state
  if (!products) {
    return (
      <div className="show-products-loading">
        <div className="show-loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  // No products state
  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="show-product-container">
        <div className="show-no-products">
          <div className="show-no-products-icon">📦</div>
          <h3>No Products Found</h3>
          <p>We couldn't find any products matching your current filters.</p>
          <Link to="/" className="browse-categories-btn">
            Browse All Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="show-product-container">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="show-products-grid">
          {filteredData.map((product) => (
            <div key={product._id} className="show-product-card">
              <Link
                to={`/product/${product._id}`}
                className="show-product-link"
              >
                <img
                  src={product.imgSrc}
                  className="show-product-image"
                  alt={product.title}
                  loading="lazy"
                />
              </Link>

              <div className="show-product-info">
                <h5 className="show-product-title-text">{product.title}</h5>

                <div className="show-product-actions">
                  <button className="show-product-price">
                    ₹{product.price}
                  </button>
                  <button
                    className="show-product-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;

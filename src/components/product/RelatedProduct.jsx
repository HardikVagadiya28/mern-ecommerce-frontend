import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

const RelatedProduct = ({ category }) => {
  const { products, addToCart } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    if (products && category) {
      const filtered = products.filter(
        (data) =>
          data?.category?.toLowerCase() === category?.toLowerCase() && data._id 
      );
      setRelatedProduct(filtered.slice(0, 6)); 
    }
  }, [category, products]);

  const handleAddToCart = (product) => {
    if (addToCart && product) {
      addToCart(
        product._id,
        product.title,
        product.price,
        1, 
        product.imgSrc
      );
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="related-products-loading">
        Loading related products...
      </div>
    );
  }

  if (!relatedProduct || relatedProduct.length === 0) {
    return (
      <div className="related-products-empty">
        <h3>No Related Products Found</h3>
        <p>Check back later for similar items</p>
      </div>
    );
  }

  return (
    <div className="related-product-container">
      <div className="container text-center">
        <h1 className="related-product-title">Related Products</h1>

        <div className="related-products-grid">
          {relatedProduct.map((product) => (
            <div key={product._id} className="related-product-card">
              <Link
                to={`/product/${product._id}`}
                className="related-product-link"
              >
                <img
                  src={product.imgSrc}
                  className="related-product-image"
                  alt={product.title}
                  loading="lazy"
                />
              </Link>

              <div className="related-product-info">
                <h5 className="related-product-title-text">{product.title}</h5>

                <div className="related-product-actions">
                  <button className="related-product-price">
                    ₹{product.price}
                  </button>
                  <button
                    className="related-product-cart-btn"
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

export default RelatedProduct;

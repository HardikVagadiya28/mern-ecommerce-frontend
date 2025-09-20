import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

const SearchProduct = () => {
  const { products, addToCart } = useContext(AppContext);
  const [searchProduct, setSearchProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { term } = useParams();

  useEffect(() => {
    setIsLoading(true);

    if (products && term) {
      const filtered = products.filter((data) => {
        const searchTerm = term.toLowerCase();
        const title = data?.title?.toLowerCase() || "";
        const description = data?.description?.toLowerCase() || "";
        const category = data?.category?.toLowerCase() || "";

        return (
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          category.includes(searchTerm)
        );
      });

      setSearchProduct(filtered);
    } else {
      setSearchProduct([]);
    }

    setIsLoading(false);
  }, [term, products]);

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

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="search-term-highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (isLoading) {
    return (
      <div className="search-products-loading">
        <div className="loading-spinner"></div>
        <p>Searching for products...</p>
      </div>
    );
  }

  if (!searchProduct || searchProduct.length === 0) {
    return (
      <div className="search-product-container">
        <div className="search-no-results">
          <h3>No products found for "{term}"</h3>
          <p>We couldn't find any products matching your search.</p>
          <p>Try adjusting your search terms or browse our categories.</p>

          <div className="search-suggestions">
            <h4>Search Suggestions:</h4>
            <ul>
              <li>• Check your spelling</li>
              <li>• Try more general terms</li>
              <li>• Use different keywords</li>
              <li>• Browse by category instead</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-product-container">
      <div className="search-results-header">
        <h1 className="search-results-title">Search Results</h1>
        <p className="search-results-subtitle">
          Found{" "}
          <span className="search-results-count">{searchProduct.length}</span>{" "}
          products for "{term}"
        </p>
      </div>

      <div className="search-products-grid">
        {searchProduct.map((product) => (
          <div key={product._id} className="search-product-card">
            <Link
              to={`/product/${product._id}`}
              className="search-product-link"
            >
              <img
                src={product.imgSrc}
                className="search-product-image"
                alt={product.title}
                loading="lazy"
              />
            </Link>

            <div className="search-product-info">
              <h5 className="search-product-title-text">
                {highlightSearchTerm(product.title, term)}
              </h5>

              <div className="search-product-actions">
                <button className="search-product-price">
                  ₹{product.price}
                </button>
                <button
                  className="search-product-cart-btn"
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
  );
};

export default SearchProduct;

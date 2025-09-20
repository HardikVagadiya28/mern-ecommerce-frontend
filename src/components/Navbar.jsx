import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const categoryMap = {
    mobiles: ["mobile", "mobiles", "phone", "phones", "smartphone"],
    laptops: ["laptop", "laptops", "notebook", "notebooks"],
    cameras: ["camera", "cameras", "dslr", "mirrorless"],
    headphones: ["headphone", "headphones", "earphone", "earphones", "headset"],
  };

  useEffect(() => {
    if (location.pathname === "/") {
      if (activeFilter === "all") {
        setFilteredData(products || []);
      }
    }
  }, [location.pathname, products, activeFilter, setFilteredData]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowMobileSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setShowMobileSearch(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filterbyCategory = (cat) => {
    setActiveFilter(cat);

    if (!products || products.length === 0) {
      console.error("No products available for filtering");
      return;
    }

    const dbCategories = categoryMap[cat.toLowerCase()] || [cat.toLowerCase()];

    const filteredProducts = products.filter(
      (data) =>
        data.category && dbCategories.includes(data.category.toLowerCase())
    );

    setFilteredData(filteredProducts);

    if (location.pathname !== "/") {
      navigate("/");
    }

    setIsMobileMenuOpen(false);
  };

  const filterbyPrice = (price) => {
    const filterKey = `price-${price}`;
    setActiveFilter(filterKey);

    if (!products || products.length === 0) {
      console.error("No products available for filtering");
      return;
    }

    const filteredProducts = products.filter((data) => data.price >= price);
    setFilteredData(filteredProducts);

    if (location.pathname !== "/") {
      navigate("/");
    }

    setIsMobileMenuOpen(false);
  };

  const resetFilters = () => {
    setActiveFilter("all");
    setFilteredData(products || []);

    if (location.pathname !== "/") {
      navigate("/");
    }

    setIsMobileMenuOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product/search/${searchTerm}`);
      setSearchTerm("");
      setActiveFilter("all");
    }

    setIsMobileMenuOpen(false);
    setShowMobileSearch(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setShowMobileSearch(false);
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    if (!showMobileSearch) {
      setIsMobileMenuOpen(false);
    }
  };

  const closeMobileMenus = () => {
    setIsMobileMenuOpen(false);
    setShowMobileSearch(false);
  };

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <div className="nav-left">
            <Link to={"/"} className="logo" onClick={resetFilters}>
              <h3>ElectroBazar</h3>
            </Link>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>

          <form
            className={`search_bar ${showMobileSearch ? "mobile-open" : ""}`}
            onSubmit={submitHandler}
          >
            <span className="material-symbols-outlined">search</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
            />
          </form>

          <div className={`nav-right ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            {isAuthenticated ? (
              <>
                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary cart-btn"
                  onClick={closeMobileMenus}
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {cart?.items?.length > 0 && (
                    <span className="cart-badge">{cart?.items?.length}</span>
                  )}
                </Link>
                <Link
                  to={"/profile"}
                  className="btn btn-info"
                  onClick={closeMobileMenus}
                >
                  Profile
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    logout();
                    closeMobileMenus();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="btn btn-secondary"
                  onClick={closeMobileMenus}
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="btn btn-info"
                  onClick={closeMobileMenus}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        <div
          className={`mobile-auth-row ${isMobileMenuOpen ? "mobile-open" : ""}`}
        >
          {isAuthenticated ? (
            <>
              <Link
                to={"/cart"}
                type="button"
                className="btn btn-primary cart-btn mobile-btn"
                onClick={closeMobileMenus}
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Cart
                {cart?.items?.length > 0 && (
                  <span className="cart-badge">{cart?.items?.length}</span>
                )}
              </Link>
              <Link
                to={"/profile"}
                className="btn btn-info mobile-btn"
                onClick={closeMobileMenus}
              >
                Profile
              </Link>
              <button
                className="btn btn-danger mobile-btn"
                onClick={() => {
                  logout();
                  closeMobileMenus();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="btn btn-secondary mobile-btn"
                onClick={closeMobileMenus}
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="btn btn-info mobile-btn"
                onClick={closeMobileMenus}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {location.pathname === "/" && (
          <div className={`sub_bar ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <div
              className={`items ${activeFilter === "all" ? "active" : ""}`}
              onClick={resetFilters}
            >
              No Filter
            </div>
            <div
              className={`items ${activeFilter === "mobiles" ? "active" : ""}`}
              onClick={() => filterbyCategory("mobiles")}
            >
              Mobiles
            </div>
            <div
              className={`items ${activeFilter === "laptops" ? "active" : ""}`}
              onClick={() => filterbyCategory("laptops")}
            >
              Laptops
            </div>
            <div
              className={`items ${activeFilter === "cameras" ? "active" : ""}`}
              onClick={() => filterbyCategory("cameras")}
            >
              Camera's
            </div>
            <div
              className={`items ${
                activeFilter === "headphones" ? "active" : ""
              }`}
              onClick={() => filterbyCategory("headphones")}
            >
              Headphones
            </div>
            <div
              className={`items ${
                activeFilter === "price-15999" ? "active" : ""
              }`}
              onClick={() => filterbyPrice(15999)}
            >
              15999+
            </div>
            <div
              className={`items ${
                activeFilter === "price-25999" ? "active" : ""
              }`}
              onClick={() => filterbyPrice(25999)}
            >
              25999+
            </div>
            <div
              className={`items ${
                activeFilter === "price-45999" ? "active" : ""
              }`}
              onClick={() => filterbyPrice(45999)}
            >
              45999+
            </div>
            <div
              className={`items ${
                activeFilter === "price-69999" ? "active" : ""
              }`}
              onClick={() => filterbyPrice(69999)}
            >
              69999+
            </div>
            <div
              className={`items ${
                activeFilter === "price-89999" ? "active" : ""
              }`}
              onClick={() => filterbyPrice(89999)}
            >
              89999+
            </div>
          </div>
        )}
      </div>

      {(isMobileMenuOpen || showMobileSearch) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 500,
          }}
          onClick={closeMobileMenus}
        />
      )}
    </>
  );
};

export default Navbar;

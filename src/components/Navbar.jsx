import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
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

  const filterbyCategory = (cat) => {
    setActiveFilter(cat);

    if (!products || products.length === 0) {
      console.error("No products available for filtering");
      return;
    }

    console.log("Filtering by category:", cat);

    const dbCategories = categoryMap[cat.toLowerCase()] || [cat.toLowerCase()];
    console.log("Looking for database categories:", dbCategories);

    const filteredProducts = products.filter(
      (data) =>
        data.category && dbCategories.includes(data.category.toLowerCase())
    );

    console.log("Filtered products:", filteredProducts);
    setFilteredData(filteredProducts);

    if (location.pathname !== "/") {
      navigate("/");
    }
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
  };

  const resetFilters = () => {
    setActiveFilter("all");
    setFilteredData(products || []);

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product/search/${searchTerm}`);
      setSearchTerm("");
      setActiveFilter("all");
    }
  };

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
            onClick={resetFilters}
          >
            <h3>ElectroBazar</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>{" "}
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
            />
          </form>
          <div className="right">
            {isAuthenticated ? (
              <>
                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                    </span>
                  )}
                </Link>
                <Link to={"/profile"} className="btn btn-info mx-3">
                  Profile
                </Link>
                <button className="btn btn-danger mx-3" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname === "/" && (
          <div className="sub_bar">
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
    </>
  );
};

export default Navbar;

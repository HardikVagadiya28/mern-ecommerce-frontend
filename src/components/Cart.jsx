import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        totalQty += cart.items[i].qty;
        totalPrice += cart.items[i].price;
      }
    }
    setPrice(totalPrice);
    setQty(totalQty);
  }, [cart]);

  return (
    <>
      <div className="container my-4">
        <h1 className="text-center mb-4" style={{ color: "#ffc107" }}>
          Shopping Cart
        </h1>

        {cart?.items?.length === 0 ? (
          <div className="text-center py-5">
            <div
              className="empty-cart-icon"
              style={{ fontSize: "4rem", color: "#6c757d" }}
            >
              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <h3 className="my-3">Your cart is empty</h3>
            <p className="text-muted mb-4">Add some products to get started</p>
            <button
              className="btn btn-warning btn-lg"
              style={{ fontWeight: "bold" }}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Summary */}
            <div className="cart-summary card bg-dark text-light mb-4">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">Cart Summary</h5>
                </div>
                <div className="d-flex gap-3">
                  <span className="badge bg-info fs-6">Items: {qty}</span>
                  <span className="badge bg-warning text-dark fs-6">
                    Total: ₹{price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="cart-items">
              {cart?.items?.map((product) => (
                <div key={product._id} className="card bg-dark text-light mb-3">
                  <div className="card-body">
                    <div className="row align-items-center">
                      {/* Product Image */}
                      <div className="col-md-2">
                        <img
                          src={product.imgSrc}
                          alt={product.title}
                          className="img-fluid rounded"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            border: "2px solid #ffc107",
                          }}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/80x80/333/fff?text=No+Image";
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="col-md-4">
                        <h6 className="card-title text-warning">
                          {product.title}
                        </h6>
                        <p className="mb-1 text-muted">
                          Unit Price: ₹{product.price / product.qty}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-md-3">
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => decreaseQty(product?.productId, 1)}
                            disabled={product.qty <= 1}
                          >
                            -
                          </button>
                          <span className="mx-3 fw-bold">{product.qty}</span>
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() =>
                              addToCart(
                                product?.productId,
                                product.title,
                                product.price / product.qty,
                                1,
                                product.imgSrc
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="col-md-3 text-end">
                        <div className="mb-2">
                          <span className="fw-bold fs-5">₹{product.price}</span>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to remove this item?"
                              )
                            ) {
                              removeFromCart(product?.productId);
                            }
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Actions */}
            <div className="cart-actions mt-4">
              <div className="row">
                <div className="col-md-6">
                  <button
                    className="btn btn-outline-light w-100"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
                <div className="col-md-6">
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate("/shipping")}
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to clear your cart?")
                        ) {
                          clearCart();
                        }
                      }}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;

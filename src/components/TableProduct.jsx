import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const AppContext = React.createContext({});

const TableProduct = ({ cart }) => {
  const { decreaseQty, addToCart, removeFromCart, clearCart } = {
    decreaseQty: (id, qty) => console.log("Decrease qty:", id, qty),
    addToCart: (id, title, price, qty, img) =>
      console.log("Add to cart:", id, title, price, qty, img),
    removeFromCart: (id) => console.log("Remove from cart:", id),
    clearCart: () => console.log("Clear cart"),
  };

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <>
      <table className="table table-bordered border-primary bg-dark text-center d-none d-lg-table">
        <thead>
          <tr>
            <th scope="col" className="bg-dark text-light">
              Product Img
            </th>
            <th scope="col" className="bg-dark text-light">
              Title
            </th>
            <th scope="col" className="bg-dark text-light">
              Price
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty++
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty--
            </th>
            <th scope="col" className="bg-dark text-light">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id}>
              <th scope="row" className="bg-dark text-light">
                <img
                  src={product.imgSrc}
                  style={{ width: "50px", height: "50px" }}
                  alt={product.title}
                />
              </th>
              <td className="bg-dark text-light">{product.title}</td>
              <td className="bg-dark text-light">{product.price}</td>
              <td className="bg-dark text-light">{product.qty}</td>
              <td className="bg-dark text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() =>
                    addToCart(
                      product?.productId,
                      product.title,
                      product.price / product.qty,
                      1,
                      product.imgSrc
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  add_circle
                </span>
              </td>
              <td className="bg-dark text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() => decreaseQty(product?.productId, 1)}
                  style={{ cursor: "pointer" }}
                >
                  do_not_disturb_on
                </span>
              </td>
              <td className="bg-dark text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    if (confirm("Are you sure, want remove from cart")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  delete
                </span>
              </td>
            </tr>
          ))}
          <tr>
            <th scope="row" className="bg-dark text-light"></th>
            <td className="bg-dark text-light">
              <button
                className="btn btn-primary"
                style={{ fontWeight: "bold" }}
              >
                Total
              </button>
            </td>
            <td className="bg-dark text-light">
              <button
                className="btn btn-warning"
                style={{ fontWeight: "bold" }}
              >
                {price}
              </button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-info" style={{ fontWeight: "bold" }}>
                {qty}
              </button>
            </td>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
          </tr>
        </tbody>
      </table>

      {/* Mobile/Tablet View - Cards (Hidden on desktop) */}
      <div className="container-fluid d-lg-none px-2">
        {cart?.items?.map((product) => (
          <div
            key={product._id}
            className="card mb-3 bg-dark text-light border-primary"
          >
            <div className="card-body p-3">
              <div className="row align-items-center">
                {/* Product Image & Info */}
                <div className="col-12 col-sm-8 mb-3 mb-sm-0">
                  <div className="row align-items-center">
                    <div className="col-3">
                      <img
                        src={product.imgSrc}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        alt={product.title}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-9">
                      <h6 className="card-title mb-1 text-light fw-bold">
                        {product.title}
                      </h6>
                      <div className="row">
                        <div className="col-6">
                          <small className="text-muted">Price:</small>
                          <div className="text-warning fw-bold">
                            ${product.price}
                          </div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Quantity:</small>
                          <div className="text-info fw-bold">{product.qty}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="col-12 col-sm-4">
                  <div className="d-flex justify-content-center justify-content-sm-end gap-2 flex-wrap">
                    {/* Increase Quantity */}
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        addToCart(
                          product?.productId,
                          product.title,
                          product.price / product.qty,
                          1,
                          product.imgSrc
                        )
                      }
                      title="Increase Quantity"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "18px" }}
                      >
                        add_circle
                      </span>
                    </button>

                    {/* Decrease Quantity */}
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => decreaseQty(product?.productId, 1)}
                      title="Decrease Quantity"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "18px" }}
                      >
                        do_not_disturb_on
                      </span>
                    </button>

                    {/* Remove Item */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (confirm("Are you sure, want remove from cart")) {
                          removeFromCart(product?.productId);
                        }
                      }}
                      title="Remove from Cart"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "18px" }}
                      >
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Total Summary Card for Mobile */}
        {cart?.items?.length > 0 && (
          <div className="card bg-dark text-light border-primary border-2 mt-4 mb-3">
            <div className="card-body">
              <div className="text-center mb-3">
                <button className="btn btn-primary fw-bold">Cart Total</button>
              </div>
              <div className="row text-center">
                <div className="col-6">
                  <div className="mb-2">
                    <small className="text-muted d-block">Total Price</small>
                    <button className="btn btn-warning fw-bold mt-1">
                      ${price}
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-2">
                    <small className="text-muted d-block">Total Items</small>
                    <button className="btn btn-info fw-bold mt-1">{qty}</button>
                  </div>
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to clear the entire cart?")
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
        )}

        {/* Empty Cart Message */}
        {(!cart?.items || cart.items.length === 0) && (
          <div className="card bg-dark text-light border-primary text-center py-5">
            <div className="card-body">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "48px", opacity: 0.5 }}
              >
                shopping_cart
              </span>
              <h5 className="mt-3 text-muted">Your cart is empty</h5>
              <p className="text-muted">Add some products to get started!</p>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for better mobile experience */}
      <style jsx>{`
        @media (max-width: 991.98px) {
          .card {
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
            border-radius: 12px;
            transition: transform 0.2s ease;
          }
          .card:hover {
            transform: translateY(-2px);
          }
          .btn-sm {
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
          }
          .material-symbols-outlined {
            user-select: none;
          }
        }

        @media (max-width: 576px) {
          .container-fluid {
            padding-left: 8px;
            padding-right: 8px;
          }
          .card-body {
            padding: 1rem;
          }
          .btn-sm {
            padding: 0.35rem 0.7rem;
            font-size: 0.8rem;
          }
          .gap-2 {
            gap: 0.5rem !important;
          }
        }

        .btn:hover {
          transform: scale(1.05);
          transition: transform 0.1s ease;
        }

        .material-symbols-outlined {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .material-symbols-outlined:hover {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default TableProduct;

import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
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
    <Container className="my-4">
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
          <Button
            variant="warning"
            size="lg"
            style={{ fontWeight: "bold" }}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
        
          <Card className="bg-dark text-light mb-4">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
              <h5 className="mb-2 mb-md-0">Cart Summary</h5>
              <div className="d-flex gap-2 gap-md-3">
                <Badge bg="info" className="fs-6 py-2">
                  Items: {qty}
                </Badge>
                <Badge bg="warning" text="dark" className="fs-6 py-2">
                  Total: ₹{price.toLocaleString()}
                </Badge>
              </div>
            </Card.Body>
          </Card>

          <div className="cart-items">
            {cart?.items?.map((product) => (
              <Card key={product._id} className="bg-dark text-light mb-3">
                <Card.Body className="p-3">
                  <Row className="align-items-center">
                 
                    <Col
                      xs={12}
                      md={2}
                      className="order-1 order-md-1 mb-3 mb-md-0"
                    >
                      <div className="d-flex justify-content-center">
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
                    </Col>

                    <Col
                      xs={12}
                      md={4}
                      className="order-3 order-md-2 mb-2 mb-md-0"
                    >
                      <h6 className="card-title text-warning mb-1">
                        {product.title}
                      </h6>
                      <p className="mb-1 text-muted">
                        Unit Price: ₹
                        {(product.price / product.qty).toLocaleString()}
                      </p>
                      <div className="d-md-none mt-2">
                        <span className="fw-bold fs-5">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                    </Col>

                   <Col
                      xs={12}
                      md={3}
                      className="order-4 order-md-3 mb-3 mb-md-0"
                    >
                      <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                        <Button
                          variant="outline-warning"
                          size="sm"
                          onClick={() => decreaseQty(product?.productId, 1)}
                          disabled={product.qty <= 1}
                          className="px-3"
                        >
                          -
                        </Button>
                        <span className="mx-3 fw-bold">{product.qty}</span>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          onClick={() =>
                            addToCart(
                              product?.productId,
                              product.title,
                              product.price / product.qty,
                              1,
                              product.imgSrc
                            )
                          }
                          className="px-3"
                        >
                          +
                        </Button>
                      </div>
                    </Col>

                    <Col
                      xs={12}
                      md={3}
                      className="order-2 order-md-4 text-md-end"
                    >
                      <div className="d-none d-md-block mb-2">
                        <span className="fw-bold fs-5">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="d-flex justify-content-center justify-content-md-end gap-2">
                        <Button
                          variant="outline-danger"
                          size="sm"
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
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>

          <div className="cart-actions mt-4">
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <Button
                  variant="outline-light"
                  className="w-100"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </Col>
              <Col md={6}>
                <div className="d-grid gap-2">
                  <Button
                    variant="warning"
                    onClick={() => navigate("/shipping")}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to clear your cart?")
                      ) {
                        clearCart();
                      }
                    }}
                  >
                    Clear Cart
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;

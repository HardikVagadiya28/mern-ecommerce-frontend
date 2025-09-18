import React, { useContext, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import AppContext from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51S8IguDGc9acWm7z59EM13FLfDCzyQrxrWrtR1kgGep1V6E1HtWFfMRRdSVzhrXIdOSKtIboQP3D99eAqMtusWNE008yGOh7Ia"
);

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price * cart.items[i].qty;
      }
    }

    setPrice(price);
    setQty(qty);
    setTotal(price);
  }, [cart]);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    try {
      if (!user || !user._id) {
        alert("Please login to proceed with payment");
        navigate("/login");
        return;
      }

      if (!userAddress) {
        alert("Please add a shipping address first");
        navigate("/shipping");
        return;
      }

      const response = await axios.post(`${url}/payment/checkout`, {
        amount: total,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      const { clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: userAddress?.fullName,
            email: user.email || "you@example.com",
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
        alert(`Payment failed: ${result.error.message}`);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const paymentData = {
            paymentIntentId: result.paymentIntent.id,
            amount: total,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData
          );

          if (api.data.success) {
            clearCart();
            navigate("/oderconfirmation");
          }
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert("An error occurred during payment processing.");
      }
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 text-center mb-4">
          <h1 className="text-primary">Checkout</h1>
        </div>
      </div>

      <div className="row">
        {/* Left Column - Order Summary and Shipping Info */}
        <div className="col-md-7 mb-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h2 className="h5 mb-0">Order Summary</h2>
            </div>
            <div className="card-body">
              {cart?.items?.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  <div>
                    <h3 className="h6 mb-1">{item.name}</h3>
                    <p className="text-muted small mb-0">
                      Quantity: {item.qty}
                    </p>
                  </div>
                  <div className="fw-bold">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}

              <hr />

              <div className="mb-3">
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h2 className="h5 mb-0">Shipping Information</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>Full Name:</strong>
                    <br />
                    {userAddress?.fullName || "Not provided"}
                  </p>
                  <p className="mb-2">
                    <strong>Address:</strong>
                    <br />
                    {userAddress?.address || "Not provided"}
                  </p>
                  <p className="mb-2">
                    <strong>City/State:</strong>
                    <br />
                    {userAddress?.state || "Not provided"}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>Country:</strong>
                    <br />
                    {userAddress?.country || "Not provided"}
                  </p>
                  <p className="mb-2">
                    <strong>Postal Code:</strong>
                    <br />
                    {userAddress?.pincode || "Not provided"}
                  </p>
                  <p className="mb-2">
                    <strong>Phone:</strong>
                    <br />
                    {userAddress?.phoneNumber || "Not provided"}
                  </p>
                </div>
              </div>
              <p className="mt-3 mb-0">
                <strong>Email:</strong>
                <br />
                {user?.email || "you@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Details */}
        <div className="col-md-5">
          <div className="card shadow-sm sticky-top" style={{ top: "20px" }}>
            <div className="card-header bg-light text-black">
              <h2 className="h5 mb-0">Payment Method</h2>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h3 className="h6 text-dark mb-3">Enter Card Details</h3>
                <div className="border rounded p-3 bg-light">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#212529",
                          fontFamily: "Arial, sans-serif",
                          "::placeholder": {
                            color: "#6c757d",
                          },
                        },
                        invalid: {
                          color: "#dc3545",
                        },
                      },
                      hidePostalCode: true,
                    }}
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg w-100 py-3 mb-3 fw-bold"
                  onClick={handlePayment}
                  disabled={!stripe}
                >
                  Pay ₹{total.toFixed(2)}
                </button>
                <small className="text-muted d-block">
                  🔒 Payments are secure & encrypted
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

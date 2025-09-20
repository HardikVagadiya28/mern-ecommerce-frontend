import React, { useContext } from "react";
import { Container, Table, Card, Row, Col, Badge } from "react-bootstrap";
import AppContext from "../../context/AppContext";
import ShowOrderProduct from "../‎ShowOrderProduct";

const Profile = () => {
  const { user, userOrder } = useContext(AppContext);

  return (
    <>
      <Container className="text-center my-3">
        <h1>Welcome, {user?.name}</h1>
        <h3>{user?.email}</h3>
        <h1>Total Order: {userOrder?.length}</h1>
      </Container>

      <Container className="my-5">
        <div className="d-none d-md-block">
          <Table bordered className="border-primary bg-dark">
            <thead className="bg-dark">
              <tr>
                <th className="bg-dark text-light text-center">OrderItems</th>
                <th className="bg-dark text-light text-center">
                  OrderDetails & ShippingAddress
                </th>
              </tr>
            </thead>
            <tbody className="bg-dark">
              {userOrder &&
                userOrder.map((product) => (
                  <tr key={product._id}>
                    <td className="bg-dark text-light">
                      <ShowOrderProduct items={product?.orderItems} />
                    </td>
                    <td className="bg-dark text-light">
                      <ul style={{ fontWeight: "bold" }}>
                        <li>OrderId: {product?.orderId}</li>
                        <li>PaymentId: {product?.paymentId}</li>
                        <li>PaymentStatus: {product?.payStatus}</li>
                        <li>Name: {product?.userShipping?.fullName}</li>
                        <li>Phone: {product?.userShipping?.phoneNumber}</li>
                        <li>Country: {product?.userShipping?.country}</li>
                        <li>State: {product?.userShipping?.state}</li>
                        <li>PinCode: {product?.userShipping?.pincode}</li>
                        <li>Near By: {product?.userShipping?.address}</li>
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>

        <div className="d-md-none mobile-orders">
          {userOrder &&
            userOrder.map((product) => (
              <Card key={product._id} className="mobile-order-card mb-3">

                <Card.Header className="mobile-header bg-primary text-white p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="order-id">
                      #{product?.orderId?.slice(-8) || "N/A"}
                    </span>
                    <Badge
                      bg={
                        product?.payStatus === "paid"
                          ? "success"
                          : product?.payStatus === "pending"
                          ? "warning"
                          : "danger"
                      }
                      className="payment-badge"
                    >
                      {product?.payStatus}
                    </Badge>
                  </div>
                </Card.Header>

                <Card.Body className="mobile-body p-2">
              
                  <div className="mobile-section mb-2">
                    <div className="section-header">
                      <span className="section-icon">📦</span>
                      <span className="section-title">Items</span>
                    </div>
                    <div className="items-container">
                      <ShowOrderProduct items={product?.orderItems} />
                    </div>
                  </div>

                 
                  <div className="mobile-section mb-2">
                    <div className="section-header">
                      <span className="section-icon">💳</span>
                      <span className="section-title">Payment</span>
                    </div>
                    <div className="payment-info">
                      <small className="payment-id text-muted">
                        ID: {product?.paymentId?.slice(-12) || "N/A"}
                      </small>
                    </div>
                  </div>

                
                  <div className="mobile-section">
                    <div className="section-header">
                      <span className="section-icon">🚚</span>
                      <span className="section-title">Shipping</span>
                    </div>
                    <div className="shipping-compact">
                      <div className="shipping-row">
                        <strong>{product?.userShipping?.fullName}</strong>
                      </div>
                      <div className="shipping-row">
                        <a
                          href={`tel:${product?.userShipping?.phoneNumber}`}
                          className="phone-link"
                        >
                          📞 {product?.userShipping?.phoneNumber}
                        </a>
                      </div>
                      <div className="shipping-row">
                        <small className="address-text">
                          {product?.userShipping?.address},{" "}
                          {product?.userShipping?.state} -{" "}
                          {product?.userShipping?.pincode}
                        </small>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
        </div>

        {(!userOrder || userOrder.length === 0) && (
          <div className="text-center py-5">
            <Card className="bg-light">
              <Card.Body>
                <Card.Title className="text-info">No orders found</Card.Title>
                <Card.Text className="text-muted">
                  You haven't placed any orders yet.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
      </Container>

      <style jsx>{`
        /* Keep existing desktop/tablet styles intact */
        body,
        html {
          overflow-x: hidden !important;
        }

        .container {
          max-width: 100% !important;
        }

        /* Mobile-only optimizations (below 768px) */
        @media (max-width: 767.98px) {
          /* Container adjustments for mobile */
          .container {
            padding-left: 4px !important;
            padding-right: 4px !important;
          }

          /* Header text sizing for mobile */
          h1 {
            font-size: 1rem !important;
            margin-bottom: 0.5rem !important;
          }

          h3 {
            font-size: 1rem !important;
            margin-bottom: 0.5rem !important;
          }

          /* Mobile order cards */
          .mobile-order-card {
            border-radius: 5px !important;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important;
            border: 1px solid #dee2e6 !important;
          }

          .mobile-header {
            border-radius: 5px 5px 0 0 !important;
            border-bottom: 1px solid #0056b3 !important;
          }

          .order-id {
            font-weight: bold;
            font-size: 0.9rem;
          }

          .payment-badge {
            font-size: 0.7rem !important;
            padding: 0.2em 0.5em !important;
          }

          /* Mobile sections */
          .mobile-section {
            background-color: #f8f9fa;
            border-radius: 3px;
            padding: 4px;
            border-left: 3px solid #0d6efd;
          }

          .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
          }

          .section-icon {
            font-size: 1rem;
            margin-right: 6px;
          }

          .section-title {
            font-weight: bold;
            font-size: 0.9rem;
            color: #0d6efd;
          }

          /* Items container mobile */
          .items-container {
            background-color: white;
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
          }

          /* Payment info mobile */
          .payment-info {
            background-color: white;
            padding: 6px 8px;
            border-radius: 4px;
          }

          .payment-id {
            font-size: 0.75rem;
            font-family: monospace;
          }

          /* Shipping compact layout */
          .shipping-compact {
            background-color: white;
            padding: 8px;
            border-radius: 4px;
          }

          .shipping-row {
            margin-bottom: 4px;
            font-size: 0.85rem;
          }

          .shipping-row:last-child {
            margin-bottom: 0;
          }

          .phone-link {
            color: #0d6efd !important;
            text-decoration: none !important;
            font-weight: 500;
          }

          .phone-link:hover {
            text-decoration: underline !important;
          }

          .address-text {
            color: #6c757d;
            line-height: 1.3;
          }
        }

        /* Extra small mobile devices */
        @media (max-width: 575.98px) {
          .container {
            padding-left: 2px !important;
            padding-right: 2px !important;
          }

          th {
            font-size: 0.58rem !important;
          }

          td {
            font-size: 0.58rem !important;
          }

          button {
            font-size: 0.58rem !important;
            padding: 4px 8px !important;
          }

          h1 {
            font-size: 0.9rem !important;
          }

          h3 {
            font-size: 0.9rem !important;
          }

          .mobile-order-card {
            margin-bottom: 0.75rem !important;
          }

          .mobile-section {
            padding: 3px;
            margin-bottom: 3px;
          }

          .section-title {
            font-size: 0.8rem;
          }

          .shipping-row {
            font-size: 0.8rem;
          }

          .order-id {
            font-size: 0.8rem;
          }

          .payment-badge {
            font-size: 0.65rem !important;
          }
        }

        /* Ensure text doesn't overflow */
        .mobile-orders * {
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }

        /* Prevent horizontal scrolling in mobile cards */
        .mobile-order-card {
          width: 100% !important;
          max-width: 100% !important;
          overflow-x: hidden !important;
        }
      `}</style>
    </>
  );
};

export default Profile;

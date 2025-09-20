import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./‎ShowOrderProduct";

const OrderConfirmation = () => {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});

  useEffect(() => {
    if (userOrder && userOrder.length > 0) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  return (
    <>
      <Container className="my-3">
        <h1 className="text-center">Your order has been confirmed!</h1>
        <h3 className="text-center">It will be delivered soon</h3>
      </Container>

      <Container>
        {/* Custom CSS for mobile responsive table */}
        <style jsx>{`
          @media (max-width: 991.98px) {
            .order-items-wrapper table {
              font-size: 12px !important;
              width: 100% !important;
            }

            .order-items-wrapper table th,
            .order-items-wrapper table td {
              padding: 0.25rem !important;
              font-size: 11px !important;
              word-wrap: break-word !important;
              max-width: 80px !important;
            }

            .order-items-wrapper table th:first-child,
            .order-items-wrapper table td:first-child {
              max-width: 50px !important;
            }

            .order-items-wrapper table img {
              max-width: 40px !important;
              max-height: 40px !important;
            }

            .order-items-wrapper table .btn {
              font-size: 10px !important;
              padding: 0.15rem 0.3rem !important;
            }
          }

          @media (max-width: 575.98px) {
            .order-items-wrapper table {
              font-size: 10px !important;
            }

            .order-items-wrapper table th,
            .order-items-wrapper table td {
              padding: 0.2rem !important;
              font-size: 9px !important;
              max-width: 60px !important;
            }

            .order-items-wrapper table th:first-child,
            .order-items-wrapper table td:first-child {
              max-width: 35px !important;
            }

            .order-items-wrapper table img {
              max-width: 30px !important;
              max-height: 30px !important;
            }
          }
        `}</style>

        {/* Desktop/Laptop View - Table Layout */}
        <div className="d-none d-lg-block">
          <table className="table table-bordered border-primary bg-dark">
            <thead className="bg-dark">
              <tr>
                <th scope="col" className="bg-dark text-light text-center">
                  Order Items
                </th>
                <th scope="col" className="bg-dark text-light text-center">
                  Order Details & Shipping Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-dark">
              <tr>
                <td className="bg-dark text-light">
                  <ShowOrderProduct items={latestOrder?.orderItems} />
                </td>
                <td className="bg-dark text-light">
                  <ul style={{ fontWeight: "bold" }}>
                    <li>Order ID: {latestOrder?.orderId}</li>
                    <li>Payment ID: {latestOrder?.paymentId}</li>
                    <li>Payment Status: {latestOrder?.payStatus}</li>
                    <li>Name: {latestOrder?.userShipping?.fullName}</li>
                    <li>Phone: {latestOrder?.userShipping?.phoneNumber}</li>
                    <li>Country: {latestOrder?.userShipping?.country}</li>
                    <li>State: {latestOrder?.userShipping?.state}</li>
                    <li>Pin Code: {latestOrder?.userShipping?.pincode}</li>
                    <li>Address: {latestOrder?.userShipping?.address}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet View - Card Layout */}
        <div className="d-lg-none">
          <Row className="g-3">
            {/* Order Items Card */}
            <Col xs={12} md={6}>
              <Card bg="dark" text="light" className="border-primary h-100">
                <Card.Header className="text-center">
                  <h5 className="mb-0">Order Items</h5>
                </Card.Header>
                <Card.Body className="p-2">
                  <div className="order-items-wrapper">
                    <ShowOrderProduct items={latestOrder?.orderItems} />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Order Details Card */}
            <Col xs={12} md={6}>
              <Card bg="dark" text="light" className="border-primary h-100">
                <Card.Header className="text-center">
                  <h5 className="mb-0">Order Details & Shipping Address</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush" className="bg-dark">
                    <ListGroup.Item className="bg-dark text-light border-secondary px-0">
                      <strong>Order ID:</strong> {latestOrder?.orderId}
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-secondary px-0">
                      <strong>Payment ID:</strong> {latestOrder?.paymentId}
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-secondary px-0">
                      <strong>Payment Status:</strong> {latestOrder?.payStatus}
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-secondary px-0">
                      <strong>Name:</strong>{" "}
                      {latestOrder?.userShipping?.fullName}
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-secondary px-0">
                      <strong>Phone:</strong>{" "}
                      {latestOrder?.userShipping?.phoneNumber}
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-secondary px-0">
                      <strong>Country:</strong>{" "}
                      {latestOrder?.userShipping?.country}
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-secondary px-0">
                      <strong>State:</strong> {latestOrder?.userShipping?.state}
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-secondary px-0">
                      <strong>Pin Code:</strong>{" "}
                      {latestOrder?.userShipping?.pincode}
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-secondary px-0">
                      <strong>Address:</strong>{" "}
                      {latestOrder?.userShipping?.address}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default OrderConfirmation;

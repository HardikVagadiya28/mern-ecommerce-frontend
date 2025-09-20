import React, { useContext } from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  const validateNumber = (value) => {
    return /^\d*$/.test(value);
  };

  const onChangerHandler = (e) => {
    const { name, value } = e.target;

    // Validate pincode and phoneNumber to only accept numbers
    if (
      (name === "pincode" || name === "phoneNumber") &&
      value !== "" &&
      !validateNumber(value)
    ) {
      setErrors({ ...errors, [name]: "Only numbers are allowed" });
      return;
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    // Final validation before submission
    let formErrors = {};
    if (!validateNumber(pincode)) {
      formErrors.pincode = "Only numbers are allowed";
    }
    if (!validateNumber(phoneNumber)) {
      formErrors.phoneNumber = "Only numbers are allowed";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    console.log("address added ", result);

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };

  return (
    <Container className="my-3 my-md-4 px-2 px-md-4">
      <Card
        className="shadow-sm"
        style={{
          border: "2px solid #ffc107",
          borderRadius: "10px",
        }}
      >
        <Card.Header className="bg-transparent border-0 py-3 py-md-4">
          <h1 className="text-center mb-0 fs-2 fs-md-1">Shipping Address</h1>
        </Card.Header>

        <Card.Body className="px-3 px-md-4 pb-4">
          <Form onSubmit={submitHandler}>
            <Row className="mb-3">
              <Col xs={12} md={4} className="mb-3 mb-md-0">
                <Form.Group>
                  <Form.Label className="fw-semibold">Full Name</Form.Label>
                  <Form.Control
                    name="fullName"
                    value={formData.fullName}
                    onChange={onChangerHandler}
                    type="text"
                    className="bg-dark text-light border-secondary"
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={4} className="mb-3 mb-md-0">
                <Form.Group>
                  <Form.Label className="fw-semibold">Country</Form.Label>
                  <Form.Control
                    name="country"
                    value={formData.country}
                    onChange={onChangerHandler}
                    type="text"
                    className="bg-dark text-light border-secondary"
                    placeholder="Enter country"
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold">State</Form.Label>
                  <Form.Control
                    name="state"
                    value={formData.state}
                    onChange={onChangerHandler}
                    type="text"
                    className="bg-dark text-light border-secondary"
                    placeholder="Enter state"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} sm={6} md={4} className="mb-3 mb-sm-0">
                <Form.Group>
                  <Form.Label className="fw-semibold">City</Form.Label>
                  <Form.Control
                    name="city"
                    value={formData.city}
                    onChange={onChangerHandler}
                    type="text"
                    className="bg-dark text-light border-secondary"
                    placeholder="Enter city"
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} className="mb-3 mb-md-0">
                <Form.Group>
                  <Form.Label className="fw-semibold">Pincode</Form.Label>
                  <Form.Control
                    name="pincode"
                    value={formData.pincode}
                    onChange={onChangerHandler}
                    type="text"
                    className="bg-dark text-light border-secondary"
                    placeholder="Enter pincode"
                    required
                    isInvalid={!!errors.pincode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pincode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Phone Number</Form.Label>
                  <Form.Control
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={onChangerHandler}
                    type="text"
                    className="bg-dark text-light border-secondary"
                    placeholder="Enter phone number"
                    required
                    isInvalid={!!errors.phoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={onChangerHandler}
                    className="bg-dark text-light border-secondary"
                    placeholder="Enter your complete address"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={8} md={6} className="mx-auto">
                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="fw-bold py-1 py-md-1"
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>

          {userAddress && (
            <Row className="mt-3">
              <Col xs={12} sm={8} md={6} className="mx-auto">
                <div className="d-grid">
                  <Button
                    variant="warning"
                    size="lg"
                    onClick={() => navigate("/checkout")}
                    className="fw-bold py-1 py-md-1"
                  >
                    Use Previous Address
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Address;

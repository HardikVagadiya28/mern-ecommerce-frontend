import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import AppContext from "../../context/AppContext";

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (message.text) {
      setMessage({ text: "", type: "" });
    }
  };

  const { name, email, password } = formData;

  const validateForm = () => {
    if (!name || !email || !password) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return false;
    }

    if (name.length < 2) {
      setMessage({
        text: "Name must be at least 2 characters long",
        type: "error",
      });
      return false;
    }

    if (!email.includes("@")) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return false;
    }

    if (password.length < 6) {
      setMessage({
        text: "Password must be at least 6 characters long",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const result = await register(name, email, password);

      if (result.success) {
        setMessage({
          text: "Registration successful! Redirecting to login...",
          type: "success",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage({
          text: result.message || "Registration failed. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "An error occurred. Please try again.",
        type: "error",
      });
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 py-2">
      <div
        className="register-container"
        style={{
          width: "600px",
          border: "2px solid yellow",
          borderRadius: "10px",
          padding: "2rem",
          background: "#1a1a1a",
        }}
      >
        <h1 className="register-title text-center text-white mb-4">Register</h1>

        {message.text && (
          <Alert
            variant={message.type === "error" ? "danger" : "success"}
            className="register-message text-center"
          >
            {message.text}
          </Alert>
        )}

        <Form onSubmit={submitHandler} className="register-form">
          <Form.Group className="register-form-group mb-3">
            <Form.Label className="text-white fw-bold">Full Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={formData.name}
              onChange={onChangeHandler}
              placeholder="Enter your full name"
              required
              disabled={isLoading}
              style={{
                backgroundColor: "#2a2a2a",
                borderColor: "#444",
                color: "#fff",
              }}
            />
          </Form.Group>

          <Form.Group className="register-form-group mb-3">
            <Form.Label className="text-white fw-bold">
              Email Address
            </Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="Enter your email address"
              required
              disabled={isLoading}
              style={{
                backgroundColor: "#2a2a2a",
                borderColor: "#444",
                color: "#fff",
              }}
            />
          </Form.Group>

          <Form.Group className="register-form-group mb-3">
            <Form.Label className="text-white fw-bold">Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={formData.password}
              onChange={onChangeHandler}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              style={{
                backgroundColor: "#2a2a2a",
                borderColor: "#444",
                color: "#fff",
              }}
            />
          </Form.Group>

          <div className="register-button-wrapper d-grid col-6 mx-auto my-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="register-loading">
                  <span className="register-spinner"></span>
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </Form>

        <div className="register-footer text-center mt-3">
          <p className="text-light mb-0">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-warning fw-bold text-decoration-none"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Register;

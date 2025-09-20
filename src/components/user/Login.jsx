import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear message when user starts typing
    if (message.text) {
      setMessage({ text: "", type: "" });
    }
  };

  const { email, password } = formData;

  const validateForm = () => {
    if (!email || !password) {
      setMessage({ text: "Please fill in all fields", type: "error" });
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
      const result = await login(email, password);

      if (result.success) {
        setMessage({
          text: "Login successful! Redirecting...",
          type: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage({
          text:
            result.message || "Login failed. Please check your credentials.",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "An error occurred. Please try again.",
        type: "error",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">Login</h1>

        {message.text && (
          <div
            className={`login-message ${
              message.type === "error" ? "login-error" : "login-success"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={submitHandler} className="login-form">
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChangeHandler}
              className="login-input"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={onChangeHandler}
              className="login-input"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="login-button-wrapper">
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <span className="login-loading">
                  <span className="login-spinner"></span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/register">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

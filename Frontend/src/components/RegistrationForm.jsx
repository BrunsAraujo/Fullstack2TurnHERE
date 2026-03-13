// RegistrationForm component - allows new users to create an account
// Includes frontend validation before sending data to the backend

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import ReusableButton from "./ReusableButton";

function RegistrationForm() {
  const navigate = useNavigate();

  // Form field state for all registration inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for inline error and success feedback messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Updates the matching form field when the user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validates the form and submits registration data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validates that both password fields match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Validates password length is between 8 and 12 characters
    if (formData.password.length < 8 || formData.password.length > 12) {
      setErrorMessage("Password must be 8-12 characters long");
      return;
    }

    // Validates that the password contains at least one number
    if (!/\d/.test(formData.password)) {
      setErrorMessage("Password must contain at least one number");
      return;
    }

    try {
      // Sends registration data to the backend
      const response = await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setSuccessMessage("Registration successful! Redirecting to login...");

      // Redirects to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "500px",
        margin: "0 auto",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        marginTop: "40px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#007BFF" }}>Create Account</h2>

      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Email input */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Password input with validation hint */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <small style={{ color: "#666" }}>
            8-12 characters, must include at least one number
          </small>
        </div>

        {/* Confirm password input */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Inline error message displayed on validation or API failure */}
        {errorMessage && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Inline success message displayed after successful registration */}
        {successMessage && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#d4edda",
              color: "#155724",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            {successMessage}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          Register
        </button>

        {/* Navigation link to login for existing users */}
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <p>Already have an account?</p>
          <ReusableButton label="Go to Login" path="/login" />
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;

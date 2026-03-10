import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import ReusableButton from "./ReusableButton";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await authAPI.login({
        username: username,
        password: password,
      });

      const userData = response.data;

      // Check if user has ADMIN role
      if (userData.role !== "ADMIN") {
        setErrorMessage("Access denied. Admin privileges required.");
        return;
      }

      // Save admin data to localStorage
      localStorage.setItem("admin", JSON.stringify(userData));

      // Redirect to admin dashboard
      navigate("/admin-dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "40px",
        maxWidth: "400px",
        margin: "40px auto",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#dc3545" }}>Admin Login</h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
        Admin access only
      </p>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Username:
        </label>
        <input
          type="text"
          placeholder="Enter admin username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Password:
        </label>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      {errorMessage && (
        <div
          style={{
            color: "#721c24",
            backgroundColor: "#f8d7da",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
            fontSize: "0.9em",
          }}
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        Login as Admin
      </button>

      <div style={{ textAlign: "center" }}>
        <ReusableButton label="Back to Home Page" path="/" />
      </div>
    </form>
  );
}

export default AdminLogin;

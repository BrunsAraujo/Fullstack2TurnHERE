//Updated LoginForm.jsx to include password validation and error handling, to handle frontend validation of password requirements, and to display error messages in a user-friendly way. Also added navigation to user dashboard on successful login.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import ReusableButton from "./ReusableButton";

function LoginForm({ onLogin }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic validation
    const isValidLength = password.length >= 8 && password.length <= 12;
    const hasNumber = /\d/.test(password);

    if (!isValidLength || !hasNumber) {
      setErrorMessage(
        "Password must be 8–12 characters long and include at least one number.",
      );
      return;
    }

    try {
      const response = await authAPI.login({
        username: username,
        password: password,
      });

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Call parent's onLogin if provided
      if (onLogin) {
        onLogin(response.data);
      }

      // Redirect to user dashboard
      navigate("/user-dashboard");
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
      <h2 style={{ textAlign: "center", color: "#007BFF" }}>User Login</h2>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Username:
        </label>
        <input
          type="text"
          placeholder="Enter username"
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
          placeholder="Enter password"
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
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        Login
      </button>

      <div style={{ textAlign: "center" }}>
        <p>Don't have an account?</p>
        <ReusableButton label="Register Now" path="/register" />
        <br />
        <br />
        <ReusableButton label="Back to Home Page" path="/" />
      </div>
    </form>
  );
}

export default LoginForm;

import { useState } from "react";
import ReusableButton from "./ReusableButton";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidLength = password.length >= 8 && password.length <= 12;
    const hasNumber = /\d/.test(password);

    if (!isValidLength || !hasNumber) {
      setErrorMessage("Password must be 8–12 characters long and include at least one number.");
      return;
    }

    if (username.trim() && password.trim()) {
      setErrorMessage(""); // Clear any previous error
      onLogin(username); // You can also pass password if needed
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="login-form"
      style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}
    >
      <h2>User Login</h2>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      {errorMessage && (
        <div style={{ color: "red", marginBottom: "10px", fontSize: "0.9em" }}>
          {errorMessage}
        </div>
      )}

      <button type="submit">Login</button>
      <br />
      <ReusableButton label="Back to Home Page" />
    </form>
  );
}

export default LoginForm;
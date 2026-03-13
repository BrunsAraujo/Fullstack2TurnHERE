// ReusableButton component - a styled navigation button used across multiple pages
// Always navigates to the home page when clicked

import React from "react";
import { useNavigate } from "react-router-dom";

function ReusableButton({ label, type = "button", style = {} }) {
  const navigate = useNavigate();

  // Navigates to the home page on click
  const handleClick = () => {
    navigate("/");
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      // Allows custom styles to be passed in via props while keeping default styling
      style={{
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "30px",
        ...style,
      }}
    >
      {label}
    </button>
  );
}

export default ReusableButton;

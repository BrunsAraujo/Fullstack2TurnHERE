import React from "react";
import { useNavigate } from "react-router-dom";

function ReusableButton({ label, type = "button", style = {} }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Always go to Home Page
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "30px",
        ...style
      }}
    >
      {label}
    </button>
  );
}

export default ReusableButton;

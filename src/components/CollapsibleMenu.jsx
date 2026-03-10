//adds link to the menu from react-router-dom for navigation, improves the nomeclature of the lables
// adds light blue padding border.
import React, { useState } from "react";
import { Link } from "react-router-dom";

function CollapsibleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="collapsible-menu"
      style={{
        backgroundColor: "#f0f8ff", // Light blue background
        padding: "20px",
        borderBottom: "2px solid #ccc",
        textAlign: "left"
      }}
    >
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      {isOpen && (
        <nav className="menu">
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/">HOME PAGE</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/search">SEARCH FOR A CITY</Link></li>
            <li><Link to="/CityRandomizer">RANDOM CITY SELECTOR</Link></li>
            <li><Link to="/cities">CITIES AVAILABLE</Link></li>
            <li><Link to="/login">USER AREA</Link></li>
          </ul>
        </nav>
      )}
    
    </div>
    
  );
}

export default CollapsibleMenu;
//adds link to the menu from react-router-dom for navigation, improves the nomeclature of the lables
// adds light blue padding border.
//adds front end links to the menu for navigation, improves the nomeclature of the lables
//updated collapsible menu to check if user is logged in and show different links accordingly, also added an admin dashboard link for easy access. Styled the menu for better user experience and visual appeal.
import { Link } from "react-router-dom";
import { useState } from "react";

function CollapsibleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const user = localStorage.getItem("user");
  const isLoggedIn = !!user;

  return (
    <div>
      <button
        onClick={toggleMenu}
        style={{
          width: "100%",
          padding: "15px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        {isOpen ? "CLOSE MENU" : "OPEN MENU"}
      </button>

      {isOpen && (
        <nav
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderBottom: "2px solid #007BFF",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/"
                style={{
                  color: "#007BFF",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
                onClick={toggleMenu}
              >
                HOME PAGE
              </Link>
            </li>

            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/about"
                style={{
                  color: "#007BFF",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
                onClick={toggleMenu}
              >
                ABOUT
              </Link>
            </li>

            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/search"
                style={{
                  color: "#007BFF",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
                onClick={toggleMenu}
              >
                SEARCH FOR A CITY
              </Link>
            </li>

            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/CityRandomizer"
                style={{
                  color: "#007BFF",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
                onClick={toggleMenu}
              >
                RANDOM CITY SELECTOR
              </Link>
            </li>

            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/cities"
                style={{
                  color: "#007BFF",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
                onClick={toggleMenu}
              >
                CITIES AVAILABLE
              </Link>
            </li>

            <hr style={{ margin: "15px 0", border: "1px solid #ddd" }} />

            {isLoggedIn ? (
              <>
                <li style={{ marginBottom: "10px" }}>
                  <Link
                    to="/user-dashboard"
                    style={{
                      color: "#28a745",
                      textDecoration: "none",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                    onClick={toggleMenu}
                  >
                    MY DASHBOARD
                  </Link>
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <Link
                    to="/create-itinerary"
                    style={{
                      color: "#28a745",
                      textDecoration: "none",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                    onClick={toggleMenu}
                  >
                    CREATE ITINERARY
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li style={{ marginBottom: "10px" }}>
                  <Link
                    to="/register"
                    style={{
                      color: "#28a745",
                      textDecoration: "none",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                    onClick={toggleMenu}
                  >
                    REGISTER
                  </Link>
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <Link
                    to="/login"
                    style={{
                      color: "#28a745",
                      textDecoration: "none",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                    onClick={toggleMenu}
                  >
                    LOGIN
                  </Link>
                </li>
              </>
            )}

            <hr style={{ margin: "15px 0", border: "1px solid #ddd" }} />

            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/admin"
                style={{
                  color: "#dc3545",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
                onClick={toggleMenu}
              >
                ADMIN DASHBOARD
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default CollapsibleMenu;

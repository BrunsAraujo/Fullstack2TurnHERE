//Creates the City List and adds the reusable button to the bottom of the city list page, also adds error handling to the city list page to display an error message if the backend is not running or if there is an issue fetching the cities. The error message will be displayed in red and will inform the user to check if Spring Boot is running on port 8080.
//adds the services/api.js file to the project, which contains the API calls for the city and attraction endpoints. This file uses axios to make HTTP requests to the backend and provides functions for getting all cities, getting a city by ID, creating a city, updating a city, and deleting a city. It also provides functions for getting all attractions, getting an attraction by ID, creating an attraction, and deleting an attraction.
//Backend integration - makes the styling of the city list the same as the search page, and randomizer page, with a loading state while fetching cities
// from the backend, and error handling if the fetch fails. The city list now displays a message if no cities are found in the database,
//  and includes a button to go back to the home page. The city list also displays the number of cities available in the database.

// CityList component - fetches and displays all available cities from the backend
// Each city is a clickable button that navigates to the city's attractions page

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cityAPI } from "../services/api";
import ReusableButton from "./ReusableButton";

function CityList() {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetches all cities from the backend when the component mounts
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await cityAPI.getAll();
        setCities(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError("Failed to load cities. Is the backend running?");
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Shows loading state while cities are being fetched
  if (loading) {
    return (
      <div
        className="city-list"
        style={{ padding: "20px", textAlign: "center" }}
      >
        <h2>Loading cities...</h2>
      </div>
    );
  }

  // Shows error message if the backend fetch fails
  if (error) {
    return (
      <div
        className="city-list"
        style={{ padding: "20px", textAlign: "center" }}
      >
        <h2 style={{ color: "red" }}>{error}</h2>
        <p>Make sure Spring Boot is running on port 8080</p>
        <ReusableButton label="Back to Home Page" />
      </div>
    );
  }

  // Shows empty state if no cities exist in the database
  if (cities.length === 0) {
    return (
      <div
        className="city-list"
        style={{ padding: "20px", textAlign: "center" }}
      >
        <h2>No cities found</h2>
        <p>Add cities using Postman or the admin panel</p>
        <ReusableButton label="Back to Home Page" />
      </div>
    );
  }

  return (
    <div className="city-list" style={{ padding: "20px", textAlign: "center" }}>
      <h2>Select a City</h2>

      {/* Shows total number of available cities */}
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Choose from {cities.length} available{" "}
        {cities.length === 1 ? "city" : "cities"}
      </p>

      {/* Renders each city as a styled button that navigates to its attractions */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cities.map((city) => (
          <li key={city.id} style={{ margin: "10px 0" }}>
            <button
              onClick={() => navigate(`/cities/${city.name}`)}
              style={{
                fontSize: "1rem",
                padding: "12px 24px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                minWidth: "250px",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
            >
              {city.name}, {city.state}
            </button>
          </li>
        ))}
      </ul>

      {/* Navigation back to home */}
      <div style={{ marginTop: "30px" }}>
        <ReusableButton label="Back to Home Page" />
      </div>
    </div>
  );
}

export default CityList;

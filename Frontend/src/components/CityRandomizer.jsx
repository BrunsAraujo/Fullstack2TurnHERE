//Backend data fetching and random city selection logic for the CityRandomizer component
//1 - Fetches cities from database; 2 - Fetches attractions from database; 3 - filters attractions by city - only shows attraction from the city selected
//4 - shows state while fetching data; 5 - shows error if backend fails to fetch data; 6 - shows number of cities in database;
//  7 - improved styling for better UX (buttons, layout, colors); 8 - handles empty database case with user-friendly message.

// CityRandomizer component - randomly selects a city and displays its attractions
// Fetches all cities and attractions from the backend on mount

import { useState, useEffect } from "react";
import { cityAPI, attractionAPI } from "../services/api";

function CityRandomizer() {
  const [cities, setCities] = useState([]);
  const [allAttractions, setAllAttractions] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [cityAttractions, setCityAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetches all cities and attractions from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, attractionsResponse] = await Promise.all([
          cityAPI.getAll(),
          attractionAPI.getAll(),
        ]);

        setCities(citiesResponse.data);
        setAllAttractions(attractionsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load cities and attractions from database");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Picks a random city and filters its attractions from the full attractions list
  const pickRandomCity = () => {
    if (cities.length === 0) {
      alert("No cities available!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * cities.length);
    const randomCity = cities[randomIndex];
    setCurrentCity(randomCity);

    // Filters attractions to only those belonging to the randomly selected city
    const attractionsForCity = allAttractions.filter(
      (attr) => attr.city.id === randomCity.id,
    );
    setCityAttractions(attractionsForCity);
  };

  // Shows loading state while data is being fetched
  if (loading) {
    return (
      <div
        className="app"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Loading...</h2>
        <p>Fetching cities and attractions from database...</p>
      </div>
    );
  }

  // Shows error message if the backend fetch fails
  if (error) {
    return (
      <div
        className="app"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "red" }}>{error}</h2>
        <p>Make sure Spring Boot is running on port 8080</p>
      </div>
    );
  }

  // Shows empty state if no cities exist in the database
  if (cities.length === 0) {
    return (
      <div
        className="app"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>No Cities Available</h2>
        <p>Add cities to the database using Postman or the admin panel!</p>
      </div>
    );
  }

  return (
    <div
      className="app"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h2>Random City Selector</h2>

      {/* Shows total number of cities available in the database */}
      <p style={{ color: "#666", marginBottom: "20px" }}>
        We have {cities.length} {cities.length === 1 ? "city" : "cities"} in our
        database!
      </p>

      {/* Button that triggers the random city selection */}
      <button
        onClick={pickRandomCity}
        style={{
          padding: "15px 30px",
          fontSize: "1.2rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Pick a Random City
      </button>

      {/* Result panel shown only after a city has been randomly selected */}
      {currentCity && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "2px solid #007BFF",
          }}
        >
          {/* Selected city name and location */}
          <h3 style={{ color: "#007BFF", fontSize: "1.8rem" }}>
            {currentCity.name}, {currentCity.state}
          </h3>
          <p style={{ color: "#666", fontSize: "1.1rem" }}>
            {currentCity.country}
          </p>

          <div style={{ marginTop: "25px" }}>
            <h4 style={{ color: "#333", marginBottom: "15px" }}>
              Attractions in {currentCity.name}:
            </h4>

            {/* Renders attractions list or empty state message */}
            {cityAttractions.length > 0 ? (
              <ul
                style={{
                  textAlign: "left",
                  listStyle: "none",
                  padding: 0,
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                {cityAttractions.map((attr) => (
                  <li
                    key={attr.id}
                    style={{
                      marginBottom: "15px",
                      padding: "15px",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                    }}
                  >
                    {/* Attraction name and type badge */}
                    <strong style={{ color: "#007BFF", fontSize: "1.1rem" }}>
                      {attr.name}
                    </strong>
                    <div
                      style={{
                        display: "inline-block",
                        marginLeft: "10px",
                        padding: "3px 10px",
                        backgroundColor: "#28a745",
                        color: "white",
                        borderRadius: "3px",
                        fontSize: "0.85rem",
                      }}
                    >
                      {attr.type}
                    </div>
                    <br />

                    {/* Attraction address and description */}
                    <em style={{ color: "#666", fontSize: "0.9rem" }}>
                      {attr.address}
                    </em>
                    <p style={{ marginTop: "8px", color: "#333" }}>
                      {attr.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              // Shown when the selected city has no attractions yet
              <p style={{ color: "#999", fontStyle: "italic" }}>
                No attractions available for this city yet. Add some using the
                admin panel!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CityRandomizer;

//adds the button to go back to search, error feedback - displays "city not found" when user enter city that is not listed
//shows itinerary inline using CotyItinerary3, handles selectedCity and query with state management.
//update for backend integration to add: Fetches cities from backend; 2 - search city by name or State; 3 - show loading state while fetching;
// 4 - error handling if backend fetch fails; 5 - display number of search results; 6 - improved styling for better styled buttons (UX).

// Search component - allows users to search for a city and view its attractions
// Fetches all cities from the backend and filters them based on the search query

import { useState, useEffect } from "react";
import { cityAPI } from "../services/api";
import CityItinerary from "./CityItinerary.jsx";
import ReusableButton from "./ReusableButton";

function Search({ onSelectCity }) {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
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
        setError("Failed to load cities from database");
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Filters cities by name or state based on the current search query
  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(query.toLowerCase()) ||
      city.state.toLowerCase().includes(query.toLowerCase()),
  );

  // Sets the selected city and calls the optional parent callback
  const handleCityClick = (city) => {
    setSelectedCity(city);
    if (onSelectCity) {
      onSelectCity(city);
    }
  };

  // Clears the selected city and resets the search input
  const handleBackToSearch = () => {
    setSelectedCity(null);
    setQuery("");
  };

  // Shows loading state while cities are being fetched
  if (loading) {
    return (
      <div
        className="search-container"
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
        className="search-container"
        style={{ padding: "20px", textAlign: "center" }}
      >
        <h2 style={{ color: "red" }}>{error}</h2>
        <p>Make sure Spring Boot is running on port 8080</p>
        <ReusableButton label="Back to Home Page" />
      </div>
    );
  }

  return (
    <div
      className="search-container"
      style={{ padding: "20px", textAlign: "center" }}
    >
      {/* Toggles between search view and city detail view */}
      {!selectedCity ? (
        <>
          <h2>Search for a City</h2>

          {/* Search input filters cities as the user types */}
          <input
            type="text"
            placeholder="Type a city name or state..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "10px",
              width: "60%",
              fontSize: "1rem",
              marginBottom: "20px",
              border: "2px solid #ccc",
              borderRadius: "5px",
            }}
          />

          {/* Shows a no results message when the search has no matches */}
          {query && filteredCities.length === 0 && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              No cities found matching "{query}"
            </p>
          )}

          {/* Shows the number of matching results when found */}
          {query && filteredCities.length > 0 && (
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Found {filteredCities.length}{" "}
              {filteredCities.length === 1 ? "city" : "cities"}
            </p>
          )}

          {/* Shows filtered results when searching, or all cities when input is empty */}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {(query ? filteredCities : cities).map((city) => (
              <li key={city.id} style={{ margin: "10px 0" }}>
                <button
                  onClick={() => handleCityClick(city)}
                  style={{
                    fontSize: "1rem",
                    padding: "12px 24px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    minWidth: "250px",
                  }}
                >
                  {city.name}, {city.state}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          {/* Shows the CityItinerary component for the selected city */}
          <CityItinerary city={selectedCity} />

          {/* Back button returns the user to the search results */}
          <button
            onClick={handleBackToSearch}
            style={{
              marginTop: "30px",
              padding: "10px 20px",
              fontSize: "1rem",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Back to Search
          </button>
        </>
      )}
      <br />

      {/* Navigation back to home */}
      <ReusableButton label="Back to Home Page" />
    </div>
  );
}

export default Search;

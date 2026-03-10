//adds the button to go back to search, error feedback - displays "city not found" when user enter city that is not listed
//shows itinerary inline using CotyItinerary3, handles selectedCity and query with state management.
//update for backend integration to add: Fetches cities from backend; 2 - search city by name or State; 3 - show loading state while fetching;
// 4 - error handling if backend fetch fails; 5 - display number of search results; 6 - improved styling for better styled buttons (UX).
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

  useEffect(() => {
    // Fetch cities from backend when component mounts
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

  // Filter cities based on search query
  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(query.toLowerCase()) ||
      city.state.toLowerCase().includes(query.toLowerCase()),
  );

  const handleCityClick = (city) => {
    setSelectedCity(city);
    if (onSelectCity) {
      onSelectCity(city);
    }
  };

  const handleBackToSearch = () => {
    setSelectedCity(null);
    setQuery("");
  };

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
      {!selectedCity ? (
        <>
          <h2>Search for a City</h2>
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

          {query && filteredCities.length === 0 && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              No cities found matching "{query}"
            </p>
          )}

          {query && filteredCities.length > 0 && (
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Found {filteredCities.length}{" "}
              {filteredCities.length === 1 ? "city" : "cities"}
            </p>
          )}

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
          <CityItinerary city={selectedCity} />
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
      <ReusableButton label="Back to Home Page" />
    </div>
  );
}

export default Search;

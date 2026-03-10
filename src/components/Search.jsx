//adds the button to go back to search, error feedback - displays "city not found" when user enter city that is not listed
//shows itinerary inline using CotyItinerary3, handles selectedCity and query with state management. 
import { useState } from "react";
import { cityData } from "./cityData";
import CityItinerary from "./CityItinerary.jsx";
import ReusableButton from "./ReusableButton";

function Search({ onSelectCity }) {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  const filteredCities = Object.keys(cityData).filter((city) =>
    city.toLowerCase().includes(query.toLowerCase())
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

  return (
    <div className="search-container" style={{ padding: "20px", textAlign: "center" }}>
      {!selectedCity ? (
        <>
          <h2>Search for a City</h2>
          <input
            type="text"
            placeholder="Type a city name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: "10px", width: "60%", fontSize: "1rem", marginBottom: "20px" }}
          />

          {query && filteredCities.length === 0 && (
            <p style={{ color: "red", fontWeight: "bold" }}>City not found</p>
          )}

          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredCities.map((city) => (
              <li key={city} style={{ margin: "10px 0" }}>
                <button
                  onClick={() => handleCityClick(city)}
                  style={{ fontSize: "1rem", padding: "8px 16px" }}
                >
                  {city}
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
              backgroundColor: "#eee",
              border: "1px solid #ccc",
              cursor: "pointer"
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
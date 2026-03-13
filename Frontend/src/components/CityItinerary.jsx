//supports props and URL params, works with or without routing, back button conditionally shown
//if onBack is passed. Adds inline styling layout ofr readability.
//Works with both parent controlled and route context. Better reusability
//update for backend integration to add: Fetches city data and attractions from backend; 2 - shows loading state while fetching;
// 3 - error handling if backend fetch fails; 4 - improved styling for better UX (button styling).
// CityItinerary component - displays attractions for a selected city
// Works both as a routed page (via URL param) and as a component (via props)

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cityAPI, attractionAPI } from "../services/api";

function CityItinerary({ city, onBack }) {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [cityData, setCityData] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref used to smooth-scroll down to the attractions list
  const detailsRef = useRef(null);

  // Supports both prop-based city object and URL param city name
  const selectedCity = city || cityName;

  // Fetches city and attraction data from the backend when the component loads
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setLoading(true);

        // Finds the matching city by name or ID from the full city list
        const citiesResponse = await cityAPI.getAll();
        const foundCity = citiesResponse.data.find(
          (c) =>
            c.name === selectedCity?.name ||
            c.name === selectedCity ||
            c.id === selectedCity?.id,
        );

        if (foundCity) {
          setCityData(foundCity);

          // Filters all attractions to only those belonging to this city
          const attractionsResponse = await attractionAPI.getAll();
          const cityAttractions = attractionsResponse.data.filter(
            (attr) => attr.city.id === foundCity.id,
          );

          setAttractions(cityAttractions);
        } else {
          setError("City not found in database");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching city data:", err);
        setError("Failed to load city data from database");
        setLoading(false);
      }
    };

    if (selectedCity) {
      fetchCityData();
    }
  }, [selectedCity]);

  // Smoothly scrolls the page down to the attractions list
  const scrollToDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Shows loading state while data is being fetched
  if (loading) {
    return (
      <div
        className="itinerary"
        style={{
          marginLeft: "40px",
          marginRight: "40px",
          padding: "20px",
          textAlign: "center",
          lineHeight: "1.6",
        }}
      >
        <h2>Loading itinerary...</h2>
      </div>
    );
  }

  // Shows error message if the fetch fails
  if (error) {
    return (
      <div
        className="itinerary"
        style={{
          marginLeft: "40px",
          marginRight: "40px",
          padding: "20px",
          textAlign: "center",
          lineHeight: "1.6",
        }}
      >
        <h2 style={{ color: "red" }}>{error}</h2>
        {/* Back button - uses onBack prop if provided, otherwise navigates to cities page */}
        <button
          onClick={onBack ? onBack : () => navigate("/cities")}
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
          Back to City List
        </button>
      </div>
    );
  }

  // Shows not found message if city data is missing
  if (!cityData) {
    return (
      <div
        className="itinerary"
        style={{
          marginLeft: "40px",
          marginRight: "40px",
          padding: "20px",
          textAlign: "center",
          lineHeight: "1.6",
        }}
      >
        <h2>City not found</h2>
        {/* Back button - uses onBack prop if provided, otherwise navigates to cities page */}
        <button
          onClick={onBack ? onBack : () => navigate("/cities")}
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
          Back to City List
        </button>
      </div>
    );
  }

  return (
    <div
      className="itinerary"
      style={{
        marginLeft: "40px",
        marginRight: "40px",
        padding: "20px",
        textAlign: "center",
        lineHeight: "1.6",
      }}
    >
      {/* City header */}
      <h2>
        Itinerary for {cityData.name}, {cityData.state}
      </h2>
      <p style={{ color: "#666", fontSize: "1.1rem" }}>{cityData.country}</p>

      {/* Conditionally renders attractions list or a no-attractions message */}
      {attractions.length > 0 ? (
        <>
          <p style={{ marginTop: "20px", fontSize: "1.1rem", color: "#333" }}>
            Discover {attractions.length} amazing{" "}
            {attractions.length === 1 ? "attraction" : "attractions"} in{" "}
            {cityData.name}!
          </p>

          {/* Button that scrolls to the attractions list */}
          <button
            onClick={scrollToDetails}
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              margin: "20px 0",
            }}
          >
            View Attractions
          </button>

          {/* Attractions list - scroll target via ref */}
          <div
            ref={detailsRef}
            className="details"
            style={{
              marginTop: "20px",
              marginLeft: "40px",
              marginRight: "40px",
              textAlign: "left",
              lineHeight: "1.6",
            }}
          >
            <h3>Attractions in {cityData.name}</h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                maxWidth: "800px",
                margin: "20px auto",
              }}
            >
              {attractions.map((attraction) => (
                <li
                  key={attraction.id}
                  style={{
                    marginBottom: "20px",
                    padding: "20px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                >
                  {/* Attraction name */}
                  <h4
                    style={{
                      color: "#007BFF",
                      marginBottom: "10px",
                      fontSize: "1.3rem",
                    }}
                  >
                    {attraction.name}
                  </h4>

                  {/* Attraction type badge - underscores replaced with spaces */}
                  <div
                    style={{
                      display: "inline-block",
                      padding: "5px 12px",
                      backgroundColor: "#28a745",
                      color: "white",
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                      marginBottom: "10px",
                    }}
                  >
                    {attraction.type.replace(/_/g, " ")}
                  </div>

                  {/* Attraction address */}
                  <p
                    style={{
                      color: "#666",
                      fontStyle: "italic",
                      marginBottom: "10px",
                    }}
                  >
                    Address: {attraction.address}
                  </p>

                  {/* Attraction description */}
                  <p style={{ color: "#333", lineHeight: "1.8" }}>
                    {attraction.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        // Shown when the city has no attractions yet
        <div
          style={{
            marginTop: "30px",
            padding: "30px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "8px",
            maxWidth: "600px",
            margin: "30px auto",
          }}
        >
          <h3 style={{ color: "#856404" }}>No Attractions Yet</h3>
          <p style={{ color: "#856404", marginTop: "10px" }}>
            We don't have any attractions listed for {cityData.name} yet. Check
            back soon or help us by adding some through the admin panel!
          </p>
        </div>
      )}

      {/* Back button - uses onBack prop if provided, otherwise navigates to cities page */}
      <button
        onClick={onBack ? onBack : () => navigate("/cities")}
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
        Back to City List
      </button>
      <br />
    </div>
  );
}

export default CityItinerary;

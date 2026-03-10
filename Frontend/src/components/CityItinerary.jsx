//supports props and URL params, works with or without routing, back button conditionally shown
//if onBack is passed. Adds inline styling layout ofr readability.
//Works with both parent controlled and route context. Better reusability
//update for backend integration to add: Fetches city data and attractions from backend; 2 - shows loading state while fetching;
// 3 - error handling if backend fetch fails; 4 - improved styling for better UX (button styling).

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { cityAPI, attractionAPI } from "../services/api";

function CityItinerary({ city, onBack }) {
  const { cityName } = useParams();
  const [cityData, setCityData] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const detailsRef = useRef(null);

  const selectedCity = city || cityName;

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setLoading(true);
        console.log("Fetching city data for:", selectedCity);

        const citiesResponse = await cityAPI.getAll();
        const foundCity = citiesResponse.data.find(
          (c) =>
            c.name === selectedCity?.name ||
            c.name === selectedCity ||
            c.id === selectedCity?.id,
        );

        if (foundCity) {
          console.log("City found:", foundCity);
          setCityData(foundCity);

          const attractionsResponse = await attractionAPI.getAll();
          const cityAttractions = attractionsResponse.data.filter(
            (attr) => attr.city.id === foundCity.id,
          );

          console.log("Attractions for this city:", cityAttractions);
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

  const scrollToDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        {onBack && <button onClick={onBack}>Back to City List</button>}
      </div>
    );
  }

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
        {onBack && <button onClick={onBack}>Back to City List</button>}
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
      <h2>
        Itinerary for {cityData.name}, {cityData.state}
      </h2>
      <p style={{ color: "#666", fontSize: "1.1rem" }}>{cityData.country}</p>

      {attractions.length > 0 ? (
        <>
          <p style={{ marginTop: "20px", fontSize: "1.1rem", color: "#333" }}>
            Discover {attractions.length} amazing{" "}
            {attractions.length === 1 ? "attraction" : "attractions"} in{" "}
            {cityData.name}!
          </p>

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
                  <h4
                    style={{
                      color: "#007BFF",
                      marginBottom: "10px",
                      fontSize: "1.3rem",
                    }}
                  >
                    {attraction.name}
                  </h4>

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

                  <p
                    style={{
                      color: "#666",
                      fontStyle: "italic",
                      marginBottom: "10px",
                    }}
                  >
                    Address: {attraction.address}
                  </p>

                  <p style={{ color: "#333", lineHeight: "1.8" }}>
                    {attraction.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
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

      {onBack && (
        <button
          onClick={onBack}
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
      )}
      <br />
    </div>
  );
}

export default CityItinerary;

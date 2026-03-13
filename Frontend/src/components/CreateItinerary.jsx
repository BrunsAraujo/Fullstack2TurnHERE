// CreateItinerary component - allows logged-in users to create and save a new itinerary
// Protected route: redirects to login if no user session is found

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { itineraryAPI, cityAPI, attractionAPI } from "../services/api";
import ReusableButton from "./ReusableButton";

function CreateItinerary() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Form field state for the new itinerary
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cityId: "",
    attractionIds: [],
  });

  const [cities, setCities] = useState([]);
  const [attractions, setAttractions] = useState([]);
  // Attractions filtered by the selected city
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Checks for valid user session and fetches cities and attractions on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
    fetchCitiesAndAttractions();
  }, [navigate]);

  // Fetches all cities and attractions from the backend
  const fetchCitiesAndAttractions = async () => {
    try {
      const [citiesResponse, attractionsResponse] = await Promise.all([
        cityAPI.getAll(),
        attractionAPI.getAll(),
      ]);
      setCities(citiesResponse.data);
      setAttractions(attractionsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error loading cities and attractions");
    }
  };

  // Updates selected city and filters attractions to match the chosen city
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setFormData({
      ...formData,
      cityId: cityId,
      attractionIds: [], // Resets attraction selection when city changes
    });

    if (cityId) {
      const filtered = attractions.filter(
        (attraction) => attraction.city.id === parseInt(cityId),
      );
      setFilteredAttractions(filtered);
    } else {
      setFilteredAttractions([]);
    }
  };

  // Toggles an attraction's selection on or off when clicked
  const handleAttractionToggle = (attractionId) => {
    setFormData((prevData) => {
      const isSelected = prevData.attractionIds.includes(attractionId);
      return {
        ...prevData,
        attractionIds: isSelected
          ? prevData.attractionIds.filter((id) => id !== attractionId)
          : [...prevData.attractionIds, attractionId],
      };
    });
  };

  // Validates the form and submits the new itinerary to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!user) {
      setMessage("You must be logged in to create an itinerary");
      setLoading(false);
      return;
    }

    // Requires at least one attraction to be selected
    if (formData.attractionIds.length === 0) {
      setMessage("Please select at least one attraction");
      setLoading(false);
      return;
    }

    try {
      const itineraryData = {
        name: formData.name,
        description: formData.description,
        userId: user.id,
        cityId: formData.cityId ? parseInt(formData.cityId) : null,
        attractionIds: formData.attractionIds,
      };

      await itineraryAPI.create(itineraryData);
      setMessage("Itinerary created successfully! Redirecting...");

      // Redirects to user dashboard after successful creation
      setTimeout(() => {
        navigate("/user-dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error creating itinerary:", error);
      if (error.response && error.response.data) {
        setMessage("Error: " + error.response.data);
      } else {
        setMessage("Failed to create itinerary. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#007BFF", marginBottom: "30px" }}>
        Create New Itinerary
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f8f9fa",
          padding: "30px",
          borderRadius: "8px",
        }}
      >
        {/* Itinerary name input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Itinerary Name: *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Weekend Wine Tour"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Description input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Description: *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe your trip..."
            required
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #ccc",
              borderRadius: "5px",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* City dropdown - populated from backend data */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Select City: *
          </label>
          <select
            value={formData.cityId}
            onChange={handleCityChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <option value="">-- Choose a city --</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}, {city.state}
              </option>
            ))}
          </select>
        </div>

        {/* Attractions selection - only shown after a city is selected */}
        {formData.cityId && (
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              Select Attractions: * ({formData.attractionIds.length} selected)
            </label>

            {filteredAttractions.length === 0 ? (
              <p style={{ color: "#666", fontStyle: "italic" }}>
                No attractions available for this city.
              </p>
            ) : (
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  backgroundColor: "white",
                }}
              >
                {/* Each attraction is a clickable card with a checkbox */}
                {filteredAttractions.map((attraction) => (
                  <div
                    key={attraction.id}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      // Highlights selected attractions in green
                      backgroundColor: formData.attractionIds.includes(
                        attraction.id,
                      )
                        ? "#d4edda"
                        : "#f8f9fa",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAttractionToggle(attraction.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="checkbox"
                        checked={formData.attractionIds.includes(attraction.id)}
                        onChange={() => {}} // Click handled by parent div
                        style={{ marginRight: "10px" }}
                      />
                      <div>
                        <strong>{attraction.name}</strong>
                        <br />
                        <small style={{ color: "#666" }}>
                          {attraction.type} - {attraction.address}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inline success or error message */}
        {message && (
          <div
            style={{
              padding: "15px",
              backgroundColor:
                message.includes("Error") || message.includes("Failed")
                  ? "#f8d7da"
                  : "#d4edda",
              color:
                message.includes("Error") || message.includes("Failed")
                  ? "#721c24"
                  : "#155724",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            {message}
          </div>
        )}

        {/* Submit and cancel buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          {/* Submit button is disabled while the request is in progress */}
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: loading ? "#ccc" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating..." : "Create Itinerary"}
          </button>

          {/* Cancel button navigates back to the user dashboard */}
          <button
            type="button"
            onClick={() => navigate("/user-dashboard")}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateItinerary;

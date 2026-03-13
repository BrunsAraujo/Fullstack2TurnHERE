// EditItinerary component - allows logged-in users to edit an existing saved itinerary
// Pre-populates the form with the current itinerary data fetched from the backend
// Protected route: redirects to login if no user session is found

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { itineraryAPI, cityAPI, attractionAPI } from "../services/api";

function EditItinerary() {
  const navigate = useNavigate();
  const { id } = useParams(); // Gets the itinerary ID from the URL
  const [user, setUser] = useState(null);

  // Form field state pre-populated with existing itinerary data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cityId: "",
    attractionIds: [],
  });

  const [cities, setCities] = useState([]);
  const [attractions, setAttractions] = useState([]);
  // Attractions filtered by the currently selected city
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // Tracks initial data fetch before showing the form
  const [initialLoading, setInitialLoading] = useState(true);

  // Checks for valid user session and loads all required data on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
    loadData();
  }, [navigate]);

  // Fetches cities, attractions, and the existing itinerary data in parallel
  const loadData = async () => {
    try {
      const [citiesRes, attractionsRes, itineraryRes] = await Promise.all([
        cityAPI.getAll(),
        attractionAPI.getAll(),
        itineraryAPI.getById(id),
      ]);

      const allCities = citiesRes.data;
      const allAttractions = attractionsRes.data;
      const itinerary = itineraryRes.data;

      setCities(allCities);
      setAttractions(allAttractions);

      // Extracts city ID and attraction IDs from the existing itinerary
      const cityId = itinerary.city?.id?.toString() || "";
      const attractionIds = itinerary.attractions?.map((a) => a.id) || [];

      // Pre-populates the form with the existing itinerary values
      setFormData({
        name: itinerary.name,
        description: itinerary.description,
        cityId: cityId,
        attractionIds: attractionIds,
      });

      // Pre-filters attractions for the itinerary's existing city
      if (cityId) {
        const filtered = allAttractions.filter(
          (a) => a.city.id === parseInt(cityId),
        );
        setFilteredAttractions(filtered);
      }

      setInitialLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setMessage("Error loading itinerary data");
      setInitialLoading(false);
    }
  };

  // Updates selected city and re-filters attractions when city changes
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setFormData({ ...formData, cityId: cityId, attractionIds: [] }); // Resets attractions on city change

    if (cityId) {
      const filtered = attractions.filter(
        (a) => a.city.id === parseInt(cityId),
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
          ? prevData.attractionIds.filter((aid) => aid !== attractionId)
          : [...prevData.attractionIds, attractionId],
      };
    });
  };

  // Validates the form and submits the updated itinerary to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

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

      // Sends updated data to the backend using the itinerary ID from the URL
      await itineraryAPI.update(id, itineraryData);
      setMessage("Itinerary updated successfully! Redirecting...");

      // Redirects to user dashboard after successful update
      setTimeout(() => {
        navigate("/user-dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error updating itinerary:", error);
      if (error.response && error.response.data) {
        setMessage("Error: " + error.response.data);
      } else {
        setMessage("Failed to update itinerary. Please try again.");
      }
      setLoading(false);
    }
  };

  // Shows loading state while initial data is being fetched
  if (initialLoading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading itinerary...
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#ffc107", marginBottom: "30px" }}>Edit Itinerary</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f8f9fa",
          padding: "30px",
          borderRadius: "8px",
        }}
      >
        {/* Itinerary name input - pre-populated with existing value */}
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
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Description input - pre-populated with existing value */}
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

        {/* City dropdown - pre-selected with the itinerary's existing city */}
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
                      // Highlights previously selected attractions in green
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
          {/* Submit button is disabled while the update request is in progress */}
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: loading ? "#ccc" : "#ffc107",
              color: "#000",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {/* Cancel button navigates back to the user dashboard without saving */}
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

export default EditItinerary;

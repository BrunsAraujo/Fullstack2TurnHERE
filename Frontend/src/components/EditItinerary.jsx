import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { itineraryAPI, cityAPI, attractionAPI } from "../services/api";

function EditItinerary() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cityId: "",
    attractionIds: [],
  });

  const [cities, setCities] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
    loadData();
  }, [navigate]);

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

      const cityId = itinerary.city?.id?.toString() || "";
      const attractionIds = itinerary.attractions?.map((a) => a.id) || [];

      setFormData({
        name: itinerary.name,
        description: itinerary.description,
        cityId: cityId,
        attractionIds: attractionIds,
      });

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

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setFormData({ ...formData, cityId: cityId, attractionIds: [] });

    if (cityId) {
      const filtered = attractions.filter(
        (a) => a.city.id === parseInt(cityId),
      );
      setFilteredAttractions(filtered);
    } else {
      setFilteredAttractions([]);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

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

      await itineraryAPI.update(id, itineraryData);
      setMessage("Itinerary updated successfully! Redirecting...");

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
        {/* Itinerary Name */}
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

        {/* Description */}
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

        {/* City Selection */}
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

        {/* Attractions Selection */}
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
                {filteredAttractions.map((attraction) => (
                  <div
                    key={attraction.id}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
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
                        onChange={() => {}}
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

        {/* Message */}
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

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
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

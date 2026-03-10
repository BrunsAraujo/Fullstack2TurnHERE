import { useState, useEffect } from "react";
import { cityAPI, attractionAPI } from "../services/api";

function AdminDashboard() {
  const [cities, setCities] = useState([]);
  const [attractions, setAttractions] = useState([]);

  const [cityName, setCityName] = useState("");
  const [cityState, setCityState] = useState("");
  const [cityCountry, setCityCountry] = useState("USA");
  const [editingCityId, setEditingCityId] = useState(null);

  const [attractionName, setAttractionName] = useState("");
  const [attractionType, setAttractionType] = useState("WINERY");
  const [attractionDescription, setAttractionDescription] = useState("");
  const [attractionAddress, setAttractionAddress] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [editingAttractionId, setEditingAttractionId] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const citiesResponse = await cityAPI.getAll();
      const attractionsResponse = await attractionAPI.getAll();
      setCities(citiesResponse.data);
      setAttractions(attractionsResponse.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleAddOrUpdateCity = async (e) => {
    e.preventDefault();
    try {
      if (editingCityId) {
        await cityAPI.update(editingCityId, {
          name: cityName,
          state: cityState,
          country: cityCountry,
        });
        setMessage("City updated successfully!");
        setEditingCityId(null);
      } else {
        await cityAPI.create({
          name: cityName,
          state: cityState,
          country: cityCountry,
        });
        setMessage("City added successfully!");
      }

      setCityName("");
      setCityState("");
      setCityCountry("USA");
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage("Error: " + err.response.data);
      } else {
        setMessage("Error: " + err.message);
      }
      setTimeout(() => setMessage(""), 5000);
      console.error(err);
    }
  };

  const handleEditCity = (city) => {
    setCityName(city.name);
    setCityState(city.state);
    setCityCountry(city.country);
    setEditingCityId(city.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEditCity = () => {
    setCityName("");
    setCityState("");
    setCityCountry("USA");
    setEditingCityId(null);
  };

  const handleAddOrUpdateAttraction = async (e) => {
    e.preventDefault();
    try {
      if (editingAttractionId) {
        await attractionAPI.update(editingAttractionId, {
          name: attractionName,
          type: attractionType,
          description: attractionDescription,
          address: attractionAddress,
          cityId: parseInt(selectedCityId),
        });
        setMessage("Attraction updated successfully!");
        setEditingAttractionId(null);
      } else {
        await attractionAPI.create({
          name: attractionName,
          type: attractionType,
          description: attractionDescription,
          address: attractionAddress,
          cityId: parseInt(selectedCityId),
        });
        setMessage("Attraction added successfully!");
      }

      setAttractionName("");
      setAttractionType("WINERY");
      setAttractionDescription("");
      setAttractionAddress("");
      setSelectedCityId("");
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error: " + err.message);
      setTimeout(() => setMessage(""), 5000);
      console.error(err);
    }
  };

  const handleEditAttraction = (attraction) => {
    setAttractionName(attraction.name);
    setAttractionType(attraction.type);
    setAttractionDescription(attraction.description);
    setAttractionAddress(attraction.address);
    setSelectedCityId(attraction.city.id.toString());
    setEditingAttractionId(attraction.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEditAttraction = () => {
    setAttractionName("");
    setAttractionType("WINERY");
    setAttractionDescription("");
    setAttractionAddress("");
    setSelectedCityId("");
    setEditingAttractionId(null);
  };

  const handleDeleteCity = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this city? This will also delete all attractions in this city.",
      )
    ) {
      try {
        await cityAPI.delete(id);
        setMessage("City deleted successfully!");
        fetchData();
        setTimeout(() => setMessage(""), 3000);
      } catch (err) {
        setMessage("Error deleting city: " + err.message);
      }
    }
  };

  const handleDeleteAttraction = async (id) => {
    if (window.confirm("Are you sure you want to delete this attraction?")) {
      try {
        await attractionAPI.delete(id);
        setMessage("Attraction deleted successfully!");
        fetchData();
        setTimeout(() => setMessage(""), 3000);
      } catch (err) {
        setMessage("Error deleting attraction: " + err.message);
      }
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#007BFF" }}>Admin Dashboard</h1>

      {message && (
        <div
          style={{
            padding: "15px",
            backgroundColor: message.includes("Error") ? "#f8d7da" : "#d4edda",
            color: message.includes("Error") ? "#721c24" : "#155724",
            borderRadius: "5px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}
      >
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>{editingCityId ? "Edit City" : "Add New City"}</h2>
          <form onSubmit={handleAddOrUpdateCity}>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                City Name:
              </label>
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                State:
              </label>
              <input
                type="text"
                value={cityState}
                onChange={(e) => setCityState(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Country:
              </label>
              <input
                type="text"
                value={cityCountry}
                onChange={(e) => setCityCountry(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: editingCityId ? "#007BFF" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {editingCityId ? "Update City" : "Add City"}
              </button>

              {editingCityId && (
                <button
                  type="button"
                  onClick={handleCancelEditCity}
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
              )}
            </div>
          </form>

          <div style={{ marginTop: "30px" }}>
            <h3>Existing Cities ({cities.length})</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cities.map((city) => (
                <li
                  key={city.id}
                  style={{
                    padding: "10px",
                    backgroundColor: "white",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    {city.name}, {city.state}
                  </span>
                  <div>
                    <button
                      onClick={() => handleEditCity(city)}
                      style={{
                        padding: "5px 15px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCity(city.id)}
                      style={{
                        padding: "5px 15px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>
            {editingAttractionId ? "Edit Attraction" : "Add New Attraction"}
          </h2>
          <form onSubmit={handleAddOrUpdateAttraction}>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Attraction Name:
              </label>
              <input
                type="text"
                value={attractionName}
                onChange={(e) => setAttractionName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Type:
              </label>
              <select
                value={attractionType}
                onChange={(e) => setAttractionType(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <option value="WINERY">Winery</option>
                <option value="BREWERY">Brewery</option>
                <option value="MUSEUM">Museum</option>
                <option value="PARK">Park</option>
                <option value="WALKING_TRAILS">Walking Trails</option>
                <option value="HISTORICAL_INTEREST">Historical Interest</option>
                <option value="ANTIQUE_SHOP">Antique Shop</option>
                <option value="CEMETERIES">Cemeteries</option>
                <option value="BARNS">Barns</option>
                <option value="CIVIL_WAR">Civil War</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Description:
              </label>
              <textarea
                value={attractionDescription}
                onChange={(e) => setAttractionDescription(e.target.value)}
                required
                rows="3"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Address:
              </label>
              <input
                type="text"
                value={attractionAddress}
                onChange={(e) => setAttractionAddress(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                City:
              </label>
              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <option value="">Select a city...</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}, {city.state}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: editingAttractionId ? "#007BFF" : "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {editingAttractionId ? "Update Attraction" : "Add Attraction"}
              </button>

              {editingAttractionId && (
                <button
                  type="button"
                  onClick={handleCancelEditAttraction}
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
              )}
            </div>
          </form>

          <div style={{ marginTop: "30px" }}>
            <h3>Existing Attractions ({attractions.length})</h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {attractions.map((attraction) => (
                <li
                  key={attraction.id}
                  style={{
                    padding: "10px",
                    backgroundColor: "white",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    <strong>{attraction.name}</strong> - {attraction.type}
                    <br />
                    <small style={{ color: "#666" }}>
                      {attraction.city.name}
                    </small>
                  </span>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => handleEditAttraction(attraction)}
                      style={{
                        padding: "5px 15px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAttraction(attraction.id)}
                      style={{
                        padding: "5px 15px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

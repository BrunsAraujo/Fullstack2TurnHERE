//added edit button to cities and attractions to pre-populate the form for easy editing, added cancel button to reset the form and exit edit mode, added confirmation prompts for deletions, improved styling of the dashboard with a cleaner layout and better colors, added success/error messages for user feedback on actions performed.
//Removed in broser alers and added admin login, protection of admin routes, and admin registration with secret key requirement for better security and user management.

// Admin Dashboard - allows admin to manage cities and attractions (add, edit, delete)
// Protected route: redirects to admin login if no valid admin session is found
// Uses inline confirmation instead of browser alerts for delete actions

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cityAPI, attractionAPI } from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [cities, setCities] = useState([]);
  const [attractions, setAttractions] = useState([]);

  // State for new city and attraction form inputs
  const [newCity, setNewCity] = useState({ name: "", state: "", country: "" });
  const [newAttraction, setNewAttraction] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
    cityId: "",
  });

  // State for tracking which city or attraction is being edited
  const [editingCity, setEditingCity] = useState(null);
  const [editingAttraction, setEditingAttraction] = useState(null);

  // State for inline success/error feedback messages
  const [cityMessage, setCityMessage] = useState("");
  const [attractionMessage, setAttractionMessage] = useState("");

  // State for tracking which item is pending delete confirmation
  const [confirmDeleteCityId, setConfirmDeleteCityId] = useState(null);
  const [confirmDeleteAttractionId, setConfirmDeleteAttractionId] =
    useState(null);

  // Checks for valid admin session on mount; redirects if not authenticated
  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      navigate("/admin-login");
      return;
    }

    const parsedAdmin = JSON.parse(adminData);

    // Ensures the logged-in user has ADMIN role
    if (parsedAdmin.role !== "ADMIN") {
      navigate("/admin-login");
      return;
    }

    setAdmin(parsedAdmin);
    fetchData();
  }, [navigate]);

  // Fetches all cities and attractions from the backend
  const fetchData = async () => {
    try {
      const [citiesRes, attractionsRes] = await Promise.all([
        cityAPI.getAll(),
        attractionAPI.getAll(),
      ]);
      setCities(citiesRes.data);
      setAttractions(attractionsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Clears admin session and redirects to home
  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  // ─── CITY FUNCTIONS ───────────────────────────────────────────────

  // Submits new city to the backend and refreshes the list
  const handleAddCity = async (e) => {
    e.preventDefault();
    setCityMessage("");
    try {
      await cityAPI.create(newCity);
      setCityMessage("City added successfully!");
      setNewCity({ name: "", state: "", country: "" });
      fetchData();
      setTimeout(() => setCityMessage(""), 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        setCityMessage("Error: " + error.response.data);
      } else {
        setCityMessage("Error adding city");
      }
    }
  };

  // Populates the city form with existing data for editing
  const handleEditCity = (city) => {
    setEditingCity({ ...city });
    setCityMessage("");
  };

  // Submits updated city data to the backend
  const handleUpdateCity = async (e) => {
    e.preventDefault();
    setCityMessage("");
    try {
      await cityAPI.update(editingCity.id, editingCity);
      setCityMessage("City updated successfully!");
      setEditingCity(null);
      fetchData();
      setTimeout(() => setCityMessage(""), 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        setCityMessage("Error: " + error.response.data);
      } else {
        setCityMessage("Error updating city");
      }
    }
  };

  // Deletes a city after inline confirmation
  const handleDeleteCity = async (id) => {
    try {
      await cityAPI.delete(id);
      setCityMessage("City deleted successfully!");
      setConfirmDeleteCityId(null);
      fetchData();
      setTimeout(() => setCityMessage(""), 3000);
    } catch (error) {
      setCityMessage("Error deleting city");
      setConfirmDeleteCityId(null);
    }
  };

  // Exits city edit mode and clears the message
  const handleCancelEditCity = () => {
    setEditingCity(null);
    setCityMessage("");
  };

  // ─── ATTRACTION FUNCTIONS ─────────────────────────────────────────

  // Submits new attraction to the backend and refreshes the list
  const handleAddAttraction = async (e) => {
    e.preventDefault();
    setAttractionMessage("");
    try {
      await attractionAPI.create(newAttraction);
      setAttractionMessage("Attraction added successfully!");
      setNewAttraction({
        name: "",
        type: "",
        description: "",
        address: "",
        cityId: "",
      });
      fetchData();
      setTimeout(() => setAttractionMessage(""), 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        setAttractionMessage("Error: " + error.response.data);
      } else {
        setAttractionMessage("Error adding attraction");
      }
    }
  };

  // Populates the attraction form with existing data for editing
  const handleEditAttraction = (attraction) => {
    setEditingAttraction({ ...attraction, cityId: attraction.city.id });
    setAttractionMessage("");
  };

  // Submits updated attraction data to the backend
  const handleUpdateAttraction = async (e) => {
    e.preventDefault();
    setAttractionMessage("");
    try {
      await attractionAPI.update(editingAttraction.id, {
        name: editingAttraction.name,
        type: editingAttraction.type,
        description: editingAttraction.description,
        address: editingAttraction.address,
        cityId: editingAttraction.cityId,
      });
      setAttractionMessage("Attraction updated successfully!");
      setEditingAttraction(null);
      fetchData();
      setTimeout(() => setAttractionMessage(""), 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        setAttractionMessage("Error: " + error.response.data);
      } else {
        setAttractionMessage("Error updating attraction");
      }
    }
  };

  // Deletes an attraction after inline confirmation
  const handleDeleteAttraction = async (id) => {
    try {
      await attractionAPI.delete(id);
      setAttractionMessage("Attraction deleted successfully!");
      setConfirmDeleteAttractionId(null);
      fetchData();
      setTimeout(() => setAttractionMessage(""), 3000);
    } catch (error) {
      setAttractionMessage("Error deleting attraction");
      setConfirmDeleteAttractionId(null);
    }
  };

  // Exits attraction edit mode and clears the message
  const handleCancelEditAttraction = () => {
    setEditingAttraction(null);
    setAttractionMessage("");
  };

  // Shows loading state while admin session is being verified
  if (!admin) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header with admin username and logout button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ color: "#dc3545" }}>Admin Dashboard</h1>
        <div>
          <span style={{ marginRight: "15px", color: "#666" }}>
            Logged in as: <strong>{admin.username}</strong>
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ── CITIES SECTION ── */}
      <div
        style={{
          marginBottom: "50px",
          backgroundColor: "#f8f9fa",
          padding: "30px",
          borderRadius: "8px",
        }}
      >
        {/* Form toggles between Add and Edit mode based on editingCity state */}
        <h2 style={{ color: "#007BFF", marginBottom: "20px" }}>
          {editingCity ? "Edit City" : "Add New City"}
        </h2>

        <form onSubmit={editingCity ? handleUpdateCity : handleAddCity}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <input
              type="text"
              placeholder="City Name"
              value={editingCity ? editingCity.name : newCity.name}
              onChange={(e) =>
                editingCity
                  ? setEditingCity({ ...editingCity, name: e.target.value })
                  : setNewCity({ ...newCity, name: e.target.value })
              }
              required
              style={{
                padding: "10px",
                border: "2px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <input
              type="text"
              placeholder="State"
              value={editingCity ? editingCity.state : newCity.state}
              onChange={(e) =>
                editingCity
                  ? setEditingCity({ ...editingCity, state: e.target.value })
                  : setNewCity({ ...newCity, state: e.target.value })
              }
              required
              style={{
                padding: "10px",
                border: "2px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <input
              type="text"
              placeholder="Country"
              value={editingCity ? editingCity.country : newCity.country}
              onChange={(e) =>
                editingCity
                  ? setEditingCity({ ...editingCity, country: e.target.value })
                  : setNewCity({ ...newCity, country: e.target.value })
              }
              required
              style={{
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
                padding: "10px 20px",
                backgroundColor: editingCity ? "#ffc107" : "#28a745",
                color: editingCity ? "#000" : "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {editingCity ? "Update City" : "Add City"}
            </button>
            {/* Cancel button only shown when in edit mode */}
            {editingCity && (
              <button
                type="button"
                onClick={handleCancelEditCity}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Inline success or error message for city actions */}
        {cityMessage && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: cityMessage.includes("Error")
                ? "#f8d7da"
                : "#d4edda",
              color: cityMessage.includes("Error") ? "#721c24" : "#155724",
              borderRadius: "5px",
            }}
          >
            {cityMessage}
          </div>
        )}

        <h3 style={{ marginTop: "30px", marginBottom: "15px" }}>
          Cities List ({cities.length})
        </h3>

        {/* Scrollable list of all cities with edit and delete buttons */}
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {cities.map((city) => (
            <div
              key={city.id}
              style={{
                padding: "15px",
                backgroundColor: "white",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{city.name}</strong>, {city.state}, {city.country}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleEditCity(city)}
                    style={{
                      padding: "5px 15px",
                      backgroundColor: "#ffc107",
                      color: "#000",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  {/* Clicking Delete shows inline confirmation instead of browser alert */}
                  <button
                    onClick={() => setConfirmDeleteCityId(city.id)}
                    style={{
                      padding: "5px 15px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Inline delete confirmation panel */}
              {confirmDeleteCityId === city.id && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#fff3cd",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "#856404" }}>
                    Are you sure you want to delete this city?
                  </span>
                  <button
                    onClick={() => handleDeleteCity(city.id)}
                    style={{
                      padding: "5px 15px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setConfirmDeleteCityId(null)}
                    style={{
                      padding: "5px 15px",
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── ATTRACTIONS SECTION ── */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "30px",
          borderRadius: "8px",
        }}
      >
        {/* Form toggles between Add and Edit mode based on editingAttraction state */}
        <h2 style={{ color: "#007BFF", marginBottom: "20px" }}>
          {editingAttraction ? "Edit Attraction" : "Add New Attraction"}
        </h2>

        <form
          onSubmit={
            editingAttraction ? handleUpdateAttraction : handleAddAttraction
          }
        >
          <div style={{ display: "grid", gap: "15px", marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Attraction Name"
              value={
                editingAttraction ? editingAttraction.name : newAttraction.name
              }
              onChange={(e) =>
                editingAttraction
                  ? setEditingAttraction({
                      ...editingAttraction,
                      name: e.target.value,
                    })
                  : setNewAttraction({ ...newAttraction, name: e.target.value })
              }
              required
              style={{
                padding: "10px",
                border: "2px solid #ccc",
                borderRadius: "5px",
              }}
            />

            {/* Dropdown values must match the Attraction.Type enum in the backend */}
            <select
              value={
                editingAttraction ? editingAttraction.type : newAttraction.type
              }
              onChange={(e) =>
                editingAttraction
                  ? setEditingAttraction({
                      ...editingAttraction,
                      type: e.target.value,
                    })
                  : setNewAttraction({ ...newAttraction, type: e.target.value })
              }
              required
              style={{
                padding: "10px",
                border: "2px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <option value="">Select Type</option>
              <option value="ANTIQUE_SHOP">Antique Shop</option>
              <option value="BREWERY">Brewery</option>
              <option value="WINERY">Winery</option>
              <option value="MUSEUM">Museum</option>
              <option value="PARK">Park</option>
              <option value="RESTAURANT">Restaurant</option>
              <option value="WALKING_TRAILS">Walking Trails</option>
              <option value="CEMETERIES">Cemeteries</option>
              <option value="BARNS">Barns</option>
              <option value="CIVIL_WAR">Civil War Site</option>
              <option value="HISTORICAL_INTEREST">Historical Interest</option>
            </select>

            <textarea
              placeholder="Description"
              value={
                editingAttraction
                  ? editingAttraction.description
                  : newAttraction.description
              }
              onChange={(e) =>
                editingAttraction
                  ? setEditingAttraction({
                      ...editingAttraction,
                      description: e.target.value,
                    })
                  : setNewAttraction({
                      ...newAttraction,
                      description: e.target.value,
                    })
              }
              rows="3"
              style={{
                padding: "10px",
                border: "2px solid #ccc",
                borderRadius: "5px",
                fontFamily: "inherit",
              }}
            />

            <input
              type="text"
              placeholder="Address"
              value={
                editingAttraction
                  ? editingAttraction.address
                  : newAttraction.address
              }
              onChange={(e) =>
                editingAttraction
                  ? setEditingAttraction({
                      ...editingAttraction,
                      address: e.target.value,
                    })
                  : setNewAttraction({
                      ...newAttraction,
                      address: e.target.value,
                    })
              }
              required
              style={{
                padding: "10px",
                border: "2px solid #ccc",
                borderRadius: "5px",
              }}
            />

            {/* City dropdown populated from backend data */}
            <select
              value={
                editingAttraction
                  ? editingAttraction.cityId
                  : newAttraction.cityId
              }
              onChange={(e) =>
                editingAttraction
                  ? setEditingAttraction({
                      ...editingAttraction,
                      cityId: e.target.value,
                    })
                  : setNewAttraction({
                      ...newAttraction,
                      cityId: e.target.value,
                    })
              }
              required
              style={{
                padding: "10px",
                border: "2px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <option value="">Select City</option>
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
                padding: "10px 20px",
                backgroundColor: editingAttraction ? "#ffc107" : "#28a745",
                color: editingAttraction ? "#000" : "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {editingAttraction ? "Update Attraction" : "Add Attraction"}
            </button>
            {/* Cancel button only shown when in edit mode */}
            {editingAttraction && (
              <button
                type="button"
                onClick={handleCancelEditAttraction}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Inline success or error message for attraction actions */}
        {attractionMessage && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: attractionMessage.includes("Error")
                ? "#f8d7da"
                : "#d4edda",
              color: attractionMessage.includes("Error")
                ? "#721c24"
                : "#155724",
              borderRadius: "5px",
            }}
          >
            {attractionMessage}
          </div>
        )}

        <h3 style={{ marginTop: "30px", marginBottom: "15px" }}>
          Attractions List ({attractions.length})
        </h3>

        {/* Scrollable list of all attractions with edit and delete buttons */}
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              style={{
                padding: "15px",
                backgroundColor: "white",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: "5px" }}>
                    <strong>{attraction.name}</strong> -{" "}
                    <em>{attraction.type}</em>
                  </div>
                  <div
                    style={{
                      color: "#666",
                      fontSize: "0.9rem",
                      marginBottom: "5px",
                    }}
                  >
                    {attraction.description}
                  </div>
                  <div style={{ fontSize: "0.9rem" }}>
                    <strong>Address:</strong> {attraction.address}
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "#007BFF" }}>
                    <strong>City:</strong> {attraction.city.name},{" "}
                    {attraction.city.state}
                  </div>
                </div>
                <div
                  style={{ display: "flex", gap: "10px", marginLeft: "15px" }}
                >
                  <button
                    onClick={() => handleEditAttraction(attraction)}
                    style={{
                      padding: "5px 15px",
                      backgroundColor: "#ffc107",
                      color: "#000",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Edit
                  </button>
                  {/* Clicking Delete shows inline confirmation instead of browser alert */}
                  <button
                    onClick={() => setConfirmDeleteAttractionId(attraction.id)}
                    style={{
                      padding: "5px 15px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Inline delete confirmation panel */}
              {confirmDeleteAttractionId === attraction.id && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#fff3cd",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "#856404" }}>
                    Are you sure you want to delete this attraction?
                  </span>
                  <button
                    onClick={() => handleDeleteAttraction(attraction.id)}
                    style={{
                      padding: "5px 15px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setConfirmDeleteAttractionId(null)}
                    style={{
                      padding: "5px 15px",
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

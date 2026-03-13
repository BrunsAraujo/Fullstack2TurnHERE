// UserDashboard component - displays the logged-in user's saved itineraries
// Allows the user to create, edit, and delete itineraries
// Protected route: redirects to login if no user session is found

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { itineraryAPI } from "../services/api";
import ReusableButton from "./ReusableButton";

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  // Tracks which itinerary is pending inline delete confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Checks for valid user session and fetches itineraries on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchUserItineraries(parsedUser.id);
  }, [navigate]);

  // Fetches all saved itineraries belonging to the logged-in user
  const fetchUserItineraries = async (userId) => {
    try {
      const response = await itineraryAPI.getByUserId(userId);
      setItineraries(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      setLoading(false);
    }
  };

  // Clears user session and redirects to home page
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Deletes an itinerary by ID and refreshes the list
  const handleDeleteItinerary = async (id) => {
    try {
      await itineraryAPI.delete(id);
      setConfirmDeleteId(null);
      fetchUserItineraries(user.id);
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  // Shows loading state while itineraries are being fetched
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header with welcome message and logout button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ color: "#007BFF" }}>Welcome, {user?.username}!</h1>
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

      {/* Action buttons for creating a new itinerary or going back home */}
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={() => navigate("/create-itinerary")}
          style={{
            padding: "15px 30px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          + Create New Itinerary
        </button>
        <ReusableButton label="Back to Home" path="/" />
      </div>

      <h2>My Saved Itineraries ({itineraries.length})</h2>

      {/* Shows empty state if the user has no saved itineraries */}
      {itineraries.length === 0 ? (
        <div
          style={{
            padding: "40px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "1.2rem", color: "#666" }}>
            You haven't created any itineraries yet.
          </p>
          <p>Click "Create New Itinerary" to plan your first trip!</p>
        </div>
      ) : (
        // Renders each saved itinerary as a card
        <div style={{ display: "grid", gap: "20px" }}>
          {itineraries.map((itinerary) => (
            <div
              key={itinerary.id}
              style={{
                padding: "20px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                border: "2px solid #ddd",
              }}
            >
              {/* Itinerary name and description */}
              <h3 style={{ color: "#007BFF", marginBottom: "10px" }}>
                {itinerary.name}
              </h3>

              <p style={{ color: "#666", marginBottom: "10px" }}>
                {itinerary.description}
              </p>

              {/* City info shown if available */}
              {itinerary.city && (
                <p style={{ marginBottom: "10px" }}>
                  <strong>City:</strong> {itinerary.city.name},{" "}
                  {itinerary.city.state}
                </p>
              )}

              {/* Attractions list shown if any are linked to the itinerary */}
              {itinerary.attractions && itinerary.attractions.length > 0 && (
                <div style={{ marginBottom: "15px" }}>
                  <strong>Attractions ({itinerary.attractions.length}):</strong>
                  <ul style={{ marginTop: "5px" }}>
                    {itinerary.attractions.map((attraction) => (
                      <li key={attraction.id}>
                        {attraction.name} - <em>{attraction.type}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Creation date formatted for display */}
              <p style={{ fontSize: "0.9rem", color: "#999" }}>
                Created: {new Date(itinerary.createdAt).toLocaleDateString()}
              </p>

              {/* Edit and Delete action buttons */}
              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                {/* Edit button navigates to the EditItinerary page */}
                <button
                  onClick={() => navigate(`/edit-itinerary/${itinerary.id}`)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#ffc107",
                    color: "#000",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Edit
                </button>

                {/* Delete button triggers inline confirmation instead of browser alert */}
                <button
                  onClick={() => setConfirmDeleteId(itinerary.id)}
                  style={{
                    padding: "8px 15px",
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

              {/* Inline delete confirmation panel */}
              {confirmDeleteId === itinerary.id && (
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
                    Are you sure you want to delete this itinerary?
                  </span>
                  <button
                    onClick={() => handleDeleteItinerary(itinerary.id)}
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
                    onClick={() => setConfirmDeleteId(null)}
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
      )}
    </div>
  );
}

export default UserDashboard;

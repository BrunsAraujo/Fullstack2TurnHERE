import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { itineraryAPI, reviewAPI } from "../services/api";
import ReusableButton from "./ReusableButton";

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchUserItineraries(parsedUser.id);
  }, [navigate]);

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDeleteItinerary = async (id) => {
    if (window.confirm("Are you sure you want to delete this itinerary?")) {
      try {
        await itineraryAPI.delete(id);
        // Refresh the list
        fetchUserItineraries(user.id);
      } catch (error) {
        console.error("Error deleting itinerary:", error);
        alert("Failed to delete itinerary");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
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
              <h3 style={{ color: "#007BFF", marginBottom: "10px" }}>
                {itinerary.name}
              </h3>

              <p style={{ color: "#666", marginBottom: "10px" }}>
                {itinerary.description}
              </p>

              {itinerary.city && (
                <p style={{ marginBottom: "10px" }}>
                  <strong>City:</strong> {itinerary.city.name},{" "}
                  {itinerary.city.state}
                </p>
              )}

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

              <p style={{ fontSize: "0.9rem", color: "#999" }}>
                Created: {new Date(itinerary.createdAt).toLocaleDateString()}
              </p>

              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => navigate(`/itinerary/${itinerary.id}`)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteItinerary(itinerary.id)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;

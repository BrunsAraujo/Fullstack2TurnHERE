//This file handles the trip saver function, and the feedback section/save feedback
//the idea is once several users are added we can use the comments among users
//and users will be able to communicate in later versions
import { useState } from "react";
import ReusableButton from "./ReusableButton";

function TripSaver({ user }) {
  const [trip, setTrip] = useState("");
  const [savedTrips, setSavedTrips] = useState([]);

  const [feedback, setFeedback] = useState("");
  const [savedFeedbacks, setSavedFeedbacks] = useState([]);

  const handleSaveTrip = () => {
    if (trip.trim()) {
      setSavedTrips([...savedTrips, trip]);
      setTrip("");
    }
  };

  const handleSendFeedback = () => {
    if (feedback.trim()) {
      setSavedFeedbacks([...savedFeedbacks, feedback]);
      setFeedback("");
    }
  };

  return (
    <div className="trip-saver" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Welcome, {user}!</h2>

      {/* Trip Saver Section */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Save a Trip</h3>
        <input
          type="text"
          placeholder="Enter trip destination"
          value={trip}
          onChange={(e) => setTrip(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button onClick={handleSaveTrip}>Save Trip</button>

        <ul>
          {savedTrips.map((t, index) => (
            <li key={index}>{t}</li>
          ))}
        </ul>
      </div>

      {/* Feedback Section */}
      <div>
        <h3>Submit Feedback</h3>
        <textarea
          placeholder="Share your thoughts about a trip..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button onClick={handleSendFeedback}>Send Feedback</button>


        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "8px" }}>#</th>
              <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "8px" }}>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {savedFeedbacks.map((f, index) => (
              <tr key={index}>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{index + 1}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px", fontStyle: "italic" }}>
                  “{f}”
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br>

        </br>
        <ReusableButton label="Back to Home Page" />
      </div>
    </div>
  );
}

export default TripSaver;
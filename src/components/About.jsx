//adds about page

import ReusableButton from "./ReusableButton";

function About() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h1>About This App</h1>
      <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
        Turn-HERE! is your personalized day trip planner. Whether you're exploring local gems or
        planning a quick getaway, our app helps you discover curated itineraries for cities like
        Gardner, Leavenworth, and Edgerton.
      </p>
      <p style={{ fontSize: "1.1rem", marginTop: "20px" }}>
        Built with ❤️ using React, this app is designed to be fast, fun, and easy to use. We hope
        it inspires your next adventure!
      </p>

      <ReusableButton label="Back to Home Page" />
    
    </div>
  );
}

export default About;
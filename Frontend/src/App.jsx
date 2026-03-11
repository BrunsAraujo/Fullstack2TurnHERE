//App7.jsx adds the about page and routes it
//updated app.jsx to include user authentication state management, and to route to the user dashboard on successful login. Also added a welcome message on the home page, and styled it for better user experience.
//Added admin routes

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CollapsibleMenu from "./components/CollapsibleMenu";
import About from "./components/About";
import CityList from "./components/CityList";
import Search from "./components/Search";
import CityItinerary from "./components/CityItinerary";
import CityRandomizer from "./components/CityRandomizer";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import UserDashboard from "./components/UserDashboard";
import CreateItinerary from "./components/CreateItinerary";
import ItineraryDetail from "./components/ItineraryDetail";
import AdminLogin from "./components/AdminLogin";
import AdminRegistration from "./components/AdminRegistration";
import AdminDashboard from "./components/AdminDashboard";
import TripSaver from "./components/TripSaver";
import EditItinerary from "./components/EditItinerary";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <CollapsibleMenu />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <div style={{ padding: "40px", textAlign: "center" }}>
                  <h1 style={{ color: "#007BFF", marginBottom: "20px" }}>
                    Welcome to Turn-HERE! Day Trip Planner
                  </h1>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      color: "#666",
                      maxWidth: "800px",
                      margin: "0 auto",
                    }}
                  >
                    Discover amazing day trip destinations, plan custom
                    itineraries, and explore hidden gems in your area. Start
                    your adventure today!
                  </p>
                </div>
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/cities" element={<CityList />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cities/:cityName" element={<CityItinerary />} />
            <Route path="/CityRandomizer" element={<CityRandomizer />} />

            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/login"
              element={<LoginForm onLogin={handleLogin} />}
            />

            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/create-itinerary" element={<CreateItinerary />} />
            <Route path="/itinerary/:id" element={<ItineraryDetail />} />
            <Route
              path="/trip-saver"
              element={<TripSaver user={user?.username || "Guest"} />}
            />

            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-register" element={<AdminRegistration />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/edit-itinerary/:id" element={<EditItinerary />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

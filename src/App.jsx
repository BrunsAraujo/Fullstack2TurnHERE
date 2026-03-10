//App7.jsx adds the about page and routes it
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import CollapsibleMenu from "./components/CollapsibleMenu";
import CityList from "./components/CityList";
import CityItinerary from "./components/CityItinerary";
import Search from "./components/Search.jsx";
import LoginForm from "./components/LoginForm";
import TripSaver from "./components/TripSaver";
import Footer from "./components/Footer.jsx";
import CityRandomizer from "./components/CityRandomizer";
import "./App.css";
import "./index.css";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f0f8ff" }}>
        <header>
        <Header />
        </header>

        <nav>
        <CollapsibleMenu />
        </nav>
        <main style={{ flex: 1 }}>
          <Routes>
          <Route path="/about" element={<About />} />

            <Route
              path="/login"
              element={
                !loggedInUser ? (
                  <LoginForm onLogin={handleLogin} />
                ) : (
                  <TripSaver user={loggedInUser} />
                )
              }
            />
            <Route
              path="/cities"
              element={
                <div className="app">
                  
                  {!selectedCity ? (
                    <CityList onSelectCity={setSelectedCity} />
                  ) : (
                    <CityItinerary
                      city={selectedCity}
                      onBack={() => setSelectedCity(null)}
                    />
                  )}
                </div>
              }
            />
            <Route
              path="/search"
              element={<Search onSelectCity={setSelectedCity} />}
            />
            <Route path="/cities/:cityName" element={<CityItinerary />} />
            <Route path="/CityRandomizer" element={<CityRandomizer />} />

          </Routes>
          </main>
        </div>
      <footer>
        <Footer />
        </footer>
      
    </Router>
  );
}

export default App;

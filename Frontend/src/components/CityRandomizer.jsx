import React, { useState } from 'react';
import { cityData } from "./cityData";

function CityRandomizer() {
  const [currentCity, setCurrentCity] = useState(null);

  const cityArray = Object.entries(cityData).map(([name, data]) => ({
    name,
    ...data
  }));

  const pickRandomCity = () => {
    const randomIndex = Math.floor(Math.random() * cityArray.length);
    setCurrentCity(cityArray[randomIndex]);
  };

  return (
    <div className="app" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px", textAlign: "center" }}>
      <h2>Random City Selector</h2>
      <button onClick={pickRandomCity}>Pick a Random City</button>
      {currentCity && (
        <div style={{ marginTop: "20px" }}>
          <h3>{currentCity.name}</h3>
          <p>{currentCity.summary}</p>
          <p>{currentCity.details}</p>
        </div>
      )}

    </div>
  );
}

export default CityRandomizer;
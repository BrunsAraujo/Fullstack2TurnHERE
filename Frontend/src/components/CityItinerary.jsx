//supports props and URL params, works with or without routing, back button conditionally shown
//if onBack is passed. Adds inline styling layout ofr readability.
//Works with both parent controlled and route context. Better reusability

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { cityData } from "./cityData";


function CityItinerary({ city, onBack }) {
  const { cityName } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const detailsRef = useRef(null);

  const selectedCity = city || cityName;

  useEffect(() => {
    if (selectedCity && cityData[selectedCity]) {
      setItinerary(cityData[selectedCity]);
    } else {
      setItinerary(null);
    }
  }, [selectedCity]);

  const scrollToDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="itinerary"
      style={{
    marginLeft: "40px",
    marginRight: "40px",
    padding: "20px",
    textAlign: "center",
    lineHeight: "1.6"
  }}
>

      <h2>Itinerary for {selectedCity}</h2>
      {itinerary ? (
        <>
          <p>{itinerary.summary}</p>
          <button onClick={scrollToDetails}>View Details</button>
          <div
            ref={detailsRef}
            className="details"
            style={{
              marginTop: "20px",
              marginLeft: "80px",
              marginRight: "80px",
              textIndent: "30px",
              textAlign: "left",
              lineHeight: "1.6"
            }}
          >
            <h3>Details</h3>
            <p>{itinerary.details}</p>
          </div>
        </>
      ) : (
        <p>No itinerary available for this city.</p>
      )}
      {onBack && <button onClick={onBack}>Back to City List</button>}
      <br>

      </br>
      
    </div>
  );
}

export default CityItinerary;


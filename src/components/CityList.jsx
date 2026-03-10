//Creates the City List and adds the reusable button to the bottom of the city list page
import ReusableButton from "./ReusableButton";

function CityList({ onSelectCity }) {
  const cities = ["Gardner", "Leavenworth", "Edgerton"];

  return (
    <div className="city-list">
      <h2>Select a City</h2>
      <ul>
        {cities.map((city) => (
          <li key={city} onClick={() => onSelectCity(city)}>
            {city}
          </li>
        ))}
      </ul>
      <ReusableButton label="Back to Home Page" />
    </div>
  );
}

export default CityList;
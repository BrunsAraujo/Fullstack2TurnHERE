//Adds Flexbox layout for title and image, adds shake-hover to HERE, and bounce-hover to car.png
//assures that the title Turn-HERE and the car image are always side-by-side
//uses better class names 
import carImage from "./../assets/car.png";

function Header() {
  return (
    <header
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f0f8ff",
        borderBottom: "2px solid #ccc"
      }}
    >
      {/* Flex container for title and car */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
        <h1
          style={{
            fontSize: "6rem", // Smaller to fit with car
            margin: 0
          }}
        >
          Turn - <span className="shake-hover" style={{ color: "#ff6600" }}>HERE!</span>
        </h1>

        <img
          src={carImage}
          alt="Blue cartoon car icon representing Turn-HERE travel app"
          className="bounce-hover"
          style={{
            width: "150px",
            height: "auto"
          }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          Your day trip planned for you.
        </h2>
      </div>
    </header>
  );
}

export default Header;
//creates footer page, sets color, copyright self updates each year, renders name of the app after year
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f0f8ff",
        borderTop: "2px solid #ccc",
        fontSize: "1rem",
        color: "#333",
        marginTop: "40px"
      }}
    >
      <p>
        &copy; {currentYear} Turn-HERE!
      </p>
    </footer>
  );
}

export default Footer;
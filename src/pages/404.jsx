import monkeyImage from "../assets/monkey.jpg";
import { Link } from "react-router-dom";

export default function NotFound() {
  console.log("NotFound component rendered");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Link to="/">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "18px",
            backgroundColor: "darkgrey",
            color: "white",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go back to home
        </button>
      </Link>
      <div style={{ height: "80vh" }}>
        <img
          src={monkeyImage}
          alt="Monkey"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            marginTop: "20px",
          }}
        />
      </div>
    </div>
  );
}

import { useParams, Link } from "react-router-dom";

function Dash() {
  const { id } = useParams();

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>{id}</h1>
      <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          borderRadius: "50px",
          backgroundColor: "red",
          color: "white",
          textDecoration: "none",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Dash;

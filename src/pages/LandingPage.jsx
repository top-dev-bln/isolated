import { Link } from "react-router-dom";
import "./css/LandingPage.css";

const featuresList = [
  {
    title: "Easy File Uploads ",
    description: "Quick and seamless file uploading process.",
  },
  {
    title: "Secure Sharing",
    description: "Ensure the privacy and security of your shared files.",
  },
  {
    title: "Customizable Access Permissions",
    description: "Control who can view and edit your files.",
  },
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <h1> Welcome to Uploadify </h1>{" "}
        <p> The best file sharing solution for your business </p>{" "}
      </header>{" "}
      <section className="features-section">
        <h2> Key Features </h2>{" "}
        <div className="features-list">
          {" "}
          {featuresList.map((feature, index) => (
            <div key={index} className="feature-item">
              <h3> {feature.title} </h3> <p> {feature.description} </p>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </section>{" "}
      <section className="get-started-section">
        <div className="get-started-content">
          <h2> Get Started </h2>{" "}
          <p>
            Sign up now and start sharing files securely with Uploadify.Your
            files, your control!
          </p>{" "}
          <Link to="/signup" className="signup-button">
            Sign Up{" "}
          </Link>{" "}
        </div>{" "}
      </section>{" "}
      <footer>
        <p> ©2024 Uploadify.All rights reserved. </p>{" "}
      </footer>{" "}
    </div>
  );
};

export default LandingPage;

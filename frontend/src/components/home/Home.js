import { Link } from "react-router-dom";
import "./home.css";
import imageSrc from "./home.jpg"; // Import the image
import { useSelector } from "react-redux";

function Home() {
  const token = useSelector((state) => state.auth.token);
  return (
    <div>
      <div className="container">
        <div className="row" style={{ textAlign: "center", marginTop: "100px", marginBottom: "100px" }}>
          <h1 className="slide-in-left" style={{ color: "aliceblue", marginLeft: "25px" }}>Bug Detector</h1>
          <p className="slide-in-left-delayed-1" style={{ color: "aliceblue", fontSize: "20px" }}>
          A Comprehensive Vulnerability Scanner. This tool is meticulously designed to tackle security challenges across web applications, networks, and source code. As organizations increasingly depend on digital platforms, safeguarding against potential threats is crucial. Our scanner ensures robust protection by identifying and addressing vulnerabilities, helping to secure the digital infrastructure of businesses.
          </p>
        </div>
      </div>

      <div className="container" style={{ display: "flex", justifyContent: "space-around" }}>
        <ul style={{ width: "40%", color: "aliceblue", marginTop: "100px", listStyleType: "none", fontSize: "larger" }}>
          <li className="slide-in-left-delayed-2">Import and scan your internal and external attack surfaces</li>
          <li className="slide-in-left-delayed-3">
            Manage your risks via dashboards, alerts, and powerful reporting
            {
              token ? (
                <Link className="btn btn-outline-warning slide-in-left-delayed-4" style={{ marginLeft: "20px", marginTop: "5px", color: "aliceblue", textDecoration: "none" }} to="/scanner">Scan Now</Link>
              ) : (
                <Link className="btn btn-outline-warning slide-in-left-delayed-4" style={{ marginLeft: "20px", marginTop: "5px", color: "aliceblue", textDecoration: "none" }} to="/login">Scan Now</Link>
              )
            }
          </li>
        </ul>

        <div  style={{ width: "500px", background: "rgba(255,255,255, 0.1)", borderRadius: "10px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
          <img src={imageSrc} alt="" style={{ width: "90%", borderRadius: "10px" }} />
        </div>
      </div>
    </div>
  );
}

export default Home;

import { Link } from "react-router-dom";
import "./home.css";
import imageSrc from "./home.jpg"; // Import the image

function Home() {
  
  return (
    <div>
      <div className="container">
        <div className="row" style={{textAlign: "center", marginTop: "100px", marginBottom: "100px"}}>
          <h1 style={{color: "aliceblue", marginLeft: "25px"}}>BugDetector</h1>
          <p style={{color: "aliceblue", fontSize: "xx-large"}}>A Comprehensive GUI Security Scanner</p>
        </div>
      </div>

      <div className="container" style={{display: "flex", justifyContent: "space-around"}}>
        <ul style={{width: "40%", color: "aliceblue", marginTop: "100px",listStyleType:"none",fontSize:"larger"}}>
           <li>
           Import and scan your internal and external attack surfaces
           </li>
          <li>
          Manage your risks via dashboards, alerts, and powerful reporting
          
          <Link className="btn btn-outline-warning" style={{marginLeft: "20px", marginTop: "5px",color: "aliceblue", textDecoration: "none"}} to="/">Scan Now</Link>
          
          </li>
        </ul>
        
        <div style={{width: "500px", background: "rgba(255,255,255, 0.1)", borderRadius: "10px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", height: "400px"}}>
          <img src={imageSrc} alt="" style={{width: "90%", borderRadius: "10px"}} />
        </div>
      </div>
    </div>
  );
}

export default Home;

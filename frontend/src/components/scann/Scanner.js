import "./scanner.css";
import net from "./network.png";
import web from "./web.jpeg";
import source from "./لقطة الشاشة 2024-02-23 221609.jpg";
import { Link } from "react-router-dom";
function Scanner() {
  return (
    <>
   
      <div className="main">
        
        <div
          className="network"
          style={{ display: "flex", marginTop: "100px" }}
        >
          <div id="network-img">
            <img src={net} alt="" style={{ width: "200px", height: "210px" }} />
          </div>
          <div className="dec-network" style={{ marginTop: "30px" }}>
            <Link
              to="/scanner/network"
              style={{
                textDecoration: "none",
                color: "aliceblue",
                paddingLeft: "50px",
                fontWeight: "600",
              }}
            >
              Network Scanner
            </Link>
            <ul
              style={{
                color: "rgba(206, 218, 228, 0.89)",
                paddingLeft: "50px",
                marginLeft: "25px",
              }}
            >
              <li>Port Scanning</li>
              <li>identify network vulnerabilities</li>
              <li>exploitation</li>
              <li>reporting and how to mitigate these vulnerabilities</li>
            </ul>
          </div>
        </div>
        <div className="web" style={{ display: "flex", marginTop: "50px" }}>
          <div className="dec-web" style={{ marginTop: "25px" }}>
            <Link
              to="/scanner/web"
              style={{
                textDecoration: "none",
                color: "aliceblue",
                fontWeight: "600",
              }}
              id="x"
            >
              Web Application Scanner
            </Link>
            <ul
              style={{
                color: "rgba(206, 218, 228, 0.89)",
                marginTop: "20px",
                marginLeft: "25px",
              
              }}
            >
              <li>Identify and assess web vulnerabilities including those outlined</li>
              <li> in OWASP Top 10, with advanced capabilities, it conducts thorough</li>
              <li>testing for both client and server-side vulnerabilities</li>
            </ul>
          </div>
          <div id="web-img">
            <img src={web} alt="" style={{ width: "250px", height: "210px",marginLeft:'25px' }} />
          </div>
        </div>

        <div
          className="sourcecode"
          style={{ display: "flex", marginTop: "50px" }}
        >
          <div id="code-img">
            <img
              src={source}
              alt=""
              style={{ width: "250px", height: "210px" }}
            />
          </div>
          <div
            className="dec-code"
            style={{ marginTop: "25px", marginLeft: "20px" }}
          >
            <Link
              to="/scanner/sourcecode"
              style={{
                textDecoration: "none",
                color: "aliceblue",
                fontWeight: "600",
              }}
            >
              Source Code Scanner
            </Link>
            <ul
              style={{
                color: "rgba(206, 218, 228, 0.89)",
                marginTop: "20px",
                marginLeft: "25px",
              }}
            >
               <li> Specializing in source code review</li>
              <li> meticulously testing for
              security vulnerabilities</li>
              <li>syntax irregularities</li>
              <li> and compilation
              errors</li>
        
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scanner;

import React from "react";
import "./user.css";
import { Link } from "react-router-dom";
function User() {
  return (
    <>
    <div className="container" style={{marginTop:"70px",backgroundColor:"rgba(255, 255, 255, 0.75)", borderRadius:"10px", height:"100vh",padding:'50px'}}>

    <h2 style={{color:"white"}}>Scans</h2>
    <Link to="/scanner" className="btn btn-warning" id="btn-scan" ><i className="fa-solid fa-plus"></i> New Scan </Link>
      
    <table className="table align-middle mb-0 bg-white" style={{marginTop:"10px"}}>
          <thead className="bg-light">
            <tr>

              <th scope="col">Scans</th>
              <th scope="col">Status</th>
              <th scope="col">Target</th>
              <th scope="col">Date</th>
            </tr>

          </thead>
          <tbody>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                 
                  <div className="ms-3">
                   Network Scanner 
                  </div>
                </div>
              </td>
              <td>
              <i className="fa-solid fa-check" style={{color: "white", backgroundColor:"#76fe06",width:"30px",height:"30px",display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%" }}></i>
              </td>
              <td>
                <span >8.8.8.8.8</span>
              </td>
              <td>Apr 18,2024</td>
             
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                 
                  <div className="ms-3">
                   Network Scanner 
                  </div>
                </div>
              </td>
              <td>
              <i className="fa-solid fa-x" style={{ color: "white", backgroundColor:"#f50a0a", width:"30px", height:"30px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%" }}></i>

              </td>
              <td>
                <span >8.8.8.8.8</span>
              </td>
              <td>Apr 18,2024</td>
             
            </tr>
           
          </tbody>
        </table>
    </div>

    
    </>
  );
}

export default User;

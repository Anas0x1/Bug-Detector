import "./sourceodescan.css";
import React from "react";
export default function Sourcecodescan() {
  return (
    <div className="container " style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlTextarea2"
              className="form-label"
              style={{ color: "white" }}
            >
              Source code :
            </label>
            <textarea
              style={{ height: "300px",   resize: "none" }}
              className="form-control"
              id="exampleFormControlTextarea2"
              rows="3"
            ></textarea>
          </div>
        
          <div className="mb-3" style={{width:"200px"}}>
            <input
              className="form-control form-control-sm"
              id="formFileSm"
              type="file"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="mb-2" >
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label"
              style={{ color: "white" }}
            >
              output :
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              style={{ height: "300px" }}
            ></textarea>
          </div>
        </div>
        <div className="btn btn-outline-success" style={{margin:"10px",width:"100px"}}>Run <i className="fa-solid fa-code"></i></div>
      </div>
    </div>
  );
}

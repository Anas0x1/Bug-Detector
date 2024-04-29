import "./sourceodescan.css";
import React from "react";
export default function Sourcecodescan() {
  return (
    <div className="container " style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div class="mb-3">
            <label
              for="exampleFormControlTextarea2"
              class="form-label"
              style={{ color: "white" }}
            >
              Source code :
            </label>
            <textarea
              style={{ height: "300px",   resize: "none" }}
              class="form-control"
              id="exampleFormControlTextarea2"
              rows="3"
            ></textarea>
          </div>
        
          <div class="mb-3" style={{width:"200px"}}>
            <input
              className="form-control form-control-sm"
              id="formFileSm"
              type="file"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div class="mb-2" >
            <label
              for="exampleFormControlTextarea1"
              class="form-label"
              style={{ color: "white" }}
            >
              output :
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              style={{ height: "300px" }}
            ></textarea>
          </div>
        </div>
        <div className="btn btn-outline-success" style={{margin:"10px",height:"50px",width:"100px"}}>Run <i class="fa-solid fa-code"></i></div>
      </div>
    </div>
  );
}

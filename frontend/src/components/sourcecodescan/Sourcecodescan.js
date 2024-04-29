import "./sourceodescan.css";
import React from "react";

export default function Sourcecodescan() {
  return (
    <div className="container " style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div class="mb-3">
            <label
              for="exampleFormControlTextarea1"
              class="form-label"
              style={{ color: "white" }}
            >
              Source code :
            </label>
            <textarea style={{height:"300px"}}
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div class="mb-2">
            <label
              for="exampleFormControlTextarea1"
              class="form-label"
              style={{ color: "white",  marginTop:"5px"}}
            >
              input :
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-2">
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
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

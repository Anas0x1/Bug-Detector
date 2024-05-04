import "./webscan.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scanPrUrl } from "../../Redux/urlScanPSlice";
import { scanUrl } from "../../Redux/urlScanFreeSlice";
function Webscan() {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const result = useSelector((state) => state.urlScan.result);
  const status = useSelector((state) => state.urlScan.status);
  const error = useSelector((state) => state.urlScan.error);
  
  const [type,setType]=useState("none");

  const handleScanUrl = () => {
    setType('free');
    dispatch(scanUrl(url));
  };
  const handlePremiumScanUrl = () => {
    setType('Pr');
    dispatch(scanPrUrl(url));
  };
 
  return (
    <>
      <div className="container">
        <div
          className="row"
          style={{ marginTop: "150px", marginBottom: "100px" }}
        >
          <h3 style={{ color: "aliceblue" }}>Web Application Scanner</h3>
        </div>
      </div>
      <div className="container">
        <h4 style={{ color: "aliceblue" }}>Enter Target</h4>
        <div className="input-group mb-3 group">
          <input
            type="text"
            placeholder="Enter Domin , SubDomin , URL"
            id="input"
            className="input-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <div className="btn-group" style={{ marginLeft: "10px" }}>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleScanUrl}
            >
              Free Scan
            </button>
            <button
              type="button"
              className="btn btn-success"
              style={{ marginLeft: "10px" }}
              onClick={handlePremiumScanUrl}
            >
              Primum Scan
            </button>
          </div>

          <div className="input-group-append" style={{ marginLeft: "10px" }}>
            <button
              type="button"
              className="btn btn-success"
              id="btn-schedule"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Schedule <i className="fa-regular fa-clock"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Schedule
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <fieldset>
                  <label>
                    <input
                      type="radio"
                      name="schedule"
                      value="one-time"
                      defaultChecked
                    />{" "}
                    One time
                  </label>
                  <br />
                  <label>
                    <input type="radio" name="schedule" value="daily" /> Daily
                  </label>
                  <br />
                  <label>
                    <input type="radio" name="schedule" value="weekly" /> Weekly
                  </label>
                  <br />
                  <label>
                    <input type="radio" name="schedule" value="monthly" />{" "}
                    Monthly
                  </label>
                  <br />
                </fieldset>

                <hr />

                <label htmlFor="start-time">Start Time:</label>
                <br />
                <input
                  type="time"
                  id="start-time"
                  name="start-time"
                  defaultValue="11:35"
                  step="1800"
                />
                <br />
                <br />
                <label htmlFor="start-date">Date:</label>
                <br />
                <input
                  type="date"
                  id="start-date"
                  name="start-date"
                  defaultValue="2022-12-23"
                />
                <br />
                <hr />
                <fieldset>
                  <legend>Email Notification</legend>
                  <label>
                    <input
                      type="checkbox"
                      name="email-notification"
                      value="email-results"
                      defaultChecked
                    />{" "}
                    Email results
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="email-notification"
                      value="do-not-email-results"
                    />{" "}
                    Do not email results
                  </label>
                  <br />
                </fieldset>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-success">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="conatiner output">
          {status === "loading" && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {status === "succeeded" && <div>{JSON.stringify(result)}</div>}
          {status === "failed" && (
            <div
              className="alert alert-warning"
              role="alert"
              style={{ width: "300px" }}
            >
              Faild to scan try again !!!! {error}
            </div>
          )}
        </div>
    </>
  );
}

export default Webscan;

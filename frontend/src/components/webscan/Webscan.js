import "./webscan.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import moment from 'moment';

import { scanUrl } from "../../Redux/urlScanFreeSlice";
import { scanPrUrl } from "../../Redux/urlScanPSlice";
import Swal from "sweetalert2";

function Webscan() {


  const getTargetElement = () => document.getElementById('table-id');

  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const result = useSelector((state) => state.urlScan.result);
  const status = useSelector((state) => state.urlScan.status);
  const error = useSelector((state) => state.urlScan.error);
  const token = useSelector((state) => state.auth.token);
  const type = useSelector(state => state.auth.type);


  const options = {
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.MEDIUM,
    },
    filename: url + ' scan ' + moment(new Date()).format('LLL') + '.pdf',
  };
  const handleScanUrl = () => {
    if (token) {
      if (url)
        dispatch(scanUrl(url));
      else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "info",
          title: "Enter a URL or Domain",
        });
      }

    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "info",
        title: "Login first",
      });
    }
  };
  const handlePremiumScanUrl = () => {
    if (token) {
      if (url)
        dispatch(scanPrUrl(url));
      else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "info",
          title: "Enter a URL or Domain",
        });
      }

    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "info",
        title: "Login first",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div
          className="row"
          style={{ marginTop: "100px", marginBottom: "80px" }}
        >
          <h3 style={{ color: "aliceblue" }}>Web Application Scanner</h3>
        </div>
      </div>
      <div className="container"><h4 style={{ color: "aliceblue" }}>Enter Target</h4></div>

      <div className="container" style={{ display: "flex" }}>


        <div className="input-group mb-3 group">
          <input
            type="text"
            placeholder="Enter Domin , SubDomin , URL"
            id="input"
            className="input-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          {type === "FreeUser" &&
            <div className="btn-group" style={{ marginLeft: "10px" }}>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleScanUrl}
                style={{ width: "100px", maxWidth: "100px" }}
              >
                Scan
              </button>
            </div>
          }

          {type === "PremiumUser" &&
            <div className="btn-group" style={{ marginLeft: "10px" }}>
              <button
                type="button"
                className="btn btn-success"
                onClick={handlePremiumScanUrl}
                style={{ width: "100px", maxWidth: "100px" }}
              >
                Scan
              </button>
            </div>
          }


          {token && <div className="input-group-append" style={{ marginLeft: "10px" }}>
            <button
              type="button"
              className="btn btn-success"
              id="btn-schedule"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Schedule <i className="fa-regular fa-clock"></i>
            </button>
          </div>}
         
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
          <div className="d-flex justify-content-center mx-auto">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {status === "succeeded" && (
          <div className='table-responsive-sm' id="table-id" style={{ width: "90%" }}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col" style={{ color: "red" }} >Title</th>
                  <th scope="col" style={{ color: "red" }} >Description</th>
                  <th scope="col" style={{ color: "red" }} >Output</th>
                  <th scope="col" style={{ color: "red" }} >Mitigation</th>
                </tr>
              </thead>
              <tbody >
                {result.result ? Object.keys(result.result.result).map(key => (
                  <tr key={key}>
                    <td>{result.result.result[key].title && result.result.result[key].title.replaceAll("<br>", "\n")}</td>
                    <td>{result.result.result[key].details && result.result.result[key].details.replaceAll("<br>", "\n")}</td>
                    <td>{result.result.result[key].output && result.result.result[key].output.replaceAll("<br>", "\n")}</td>
                    <td>{result.result.result[key].mitigation && result.result.result[key].mitigation.replaceAll("<br>", "\n")}</td>
                  </tr>
                )) : <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>}
              </tbody>
            </table>
            <div> {(status === "succeeded" && result) &&
            <button className="btn btn-success rounded" onClick={() => generatePDF(getTargetElement, options)}><i className="fa-solid fa-download fa-beat me-1"></i> Download</button>
          }</div>
          </div>
      
        )}

        {status === "failed" && (
          <div
            className="alert alert-warning"
            role="alert"
            style={{ width: "300px", marginLeft: '100px' }}
          >
            Faild to scan try again !!!!
            {error}
          </div>
        )}
      </div>

    </>
  );
}

export default Webscan;

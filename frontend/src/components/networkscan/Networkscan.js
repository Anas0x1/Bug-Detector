import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scanNetwork } from '../../Redux/networkFreeSlice';
import { scanPremiumNetwork } from '../../Redux/networkPslice';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import moment from 'moment';

import Swal from 'sweetalert2';
import "./networkscan.css"

function Networkscan() {
  const getTargetElement = () => document.getElementById('table-id');

  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const status = useSelector((state) => state.networkScan.status);
  const error = useSelector((state) => state.networkScan.error);
  const result = useSelector((state) => state.networkScan.result);
  const token = useSelector(state => state.auth.token);
  const type = useSelector(state => state.auth.type);

  const options = {
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.MEDIUM,
    },
    filename: url + ' scan ' + moment(new Date()).format('LLL') + '.pdf',
  };
  
  const handleSubmit = () => {
    if (token) {
      dispatch(scanNetwork(url));
      console.log(result);
    } else {
      Swal.fire({
        icon: "info",
        title: "Login first",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const handleSubmitPremium = () => {
    dispatch(scanPremiumNetwork(url));
  };

  return (
    <>
      <div className="container">
        <div className="row" style={{ marginTop: "100px", marginBottom: "80px" }}>
          <h3 style={{ color: "aliceblue" }}>Network Scanner</h3>
        </div>
      </div>
      <div className="container">
        <h4 style={{ color: "aliceblue" }}>Enter Target</h4>
        <div className="input-group mb-3 group">
          <input
            type="text"
            placeholder="Enter IP, CIDR"
            id="input"
            className="input-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          {type === 'FreeUser' &&
            <div className="btn-group" style={{ marginLeft: "10px" }}>
              <button
                className="btn btn-success"
                type="submit"
                onClick={handleSubmit}
                style={{ width: "100px", maxWidth: "100px" }}
              >
                Scan
              </button>
            </div>
          }

          {type === 'PremiumUser' &&
            <div className="btn-group" style={{ marginLeft: "10px" }}>
              <button
                className="btn btn-success"
                type="submit"
                onClick={handleSubmitPremium}
                style={{ width: "100px", maxWidth: "100px" }}
              >
                Scan
              </button>
            </div>
          }

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

      <div className="container output" id="table-id">
        {status === "loading" && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {status === "succeeded" && (
          <div style={{ width: "90%" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" style={{ color: "red" }}>Title</th>
                  <th scope="col" style={{ color: "red" }}>Description</th>
                  <th scope="col" style={{ color: "red" }}>Output</th>
                  <th scope="col" style={{ color: "red" }}>Mitigation</th>
                </tr>
              </thead>
              <tbody>
                {result.result ? Object.keys(result.result.result).map(key => (
                  <tr key={key}>
                    <td>{result.result.result[key].title && result.result.result[key].title.replaceAll("<br>", "\n")}</td>
                    <td>{result.result.result[key].details && result.result.result[key].details.replaceAll("<br>", "\n")}</td>
                    <td>{result.result.result[key].output && result.result.result[key].output.replaceAll("<br>", "\n")}</td>
                    <td>{result.result.result[key].mitigation && result.result.result[key].mitigation.replaceAll("<br>", "\n")}</td>
                  </tr>
                )) : <tr></tr>}
              </tbody>
            </table>
          </div>
        )}
        {(status === "succeeded" && result) &&
          <button className="btn btn-success" onClick={() => generatePDF(getTargetElement, options)}><i className="fa-solid fa-download fa-beat me-1"></i> Download</button>
        }
        {status === "failed" && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ width: "300px" }}
          >
            Faild to scan try again ! {error}
          </div>
        )}
      </div>
    </>
  );
}

export default Networkscan;

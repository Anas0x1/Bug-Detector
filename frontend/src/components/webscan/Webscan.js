import "./webscan.css";

function Webscan() {
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
          />

          <div className="btn-group" style={{ marginLeft: "10px" }}>
            <button
              type="button"
              className="btn btn-success dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Scan options
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" style={{ maxHeight: "200px", overflowY: "auto" }}>
              <li>
                <span className="dropdown-item" value="information gathering">
                  information gathering
                </span>
              </li>
              <li>
                <span className="dropdown-item" value="DNS scan">
                  DNS scan
                </span>
              </li>
              <li>
                <span className="dropdown-item" value="Directory fuzzing">
                  Directory fuzzing
                </span>
              </li>
              <li>
                <span className="dropdown-item" value="Parameter discovery">
                  Parameter discovery
                </span>
              </li>
              <li>
                <span className="dropdown-item" value="SubDomin enumeration">
                  SubDomin enumeration
                </span>
              </li>

              <li>
                <span className="dropdown-item" value="SubDomin takeover">
                  SubDomin takeover
                </span>
              </li>
              <li>
                <span className="dropdown-item" value="Xss scan">
                  Xss scan
                </span>
              </li>
              <li>
                <span className="dropdown-item" value="CORS scan">
                  CORS scan
                </span>
              </li>
              <li>
                <span className="dropdown-item" value="Missing response header">
                  Missing response header
                </span>
              </li>
              <li>
                <span className="dropdown-item" value="SQLI scan">
                  SQLI scan
                </span>
              </li>
              <li>
                <span className="dropdown-item" value="Lfi scan">
                  Lfi scan
                </span>
              </li>
              <li>
                <span className="dropdown-item" value="SSTI scan">
                  SSTI scan
                </span>
              </li>
              <li>
                <span className="dropdown-item" value="CVEs scan">
                  CVEs scan
                </span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <span className="dropdown-item" value="Scan All">
                  Scan All
                </span>
              </li>
            </ul>
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
    </>
  );
}

export default Webscan;

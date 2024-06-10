import "./nav.css";
import User from "./user.png";
import bug from "./boxelder-bug.png";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authSlice";

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.user);
  const type = useSelector((state) => state.auth.type);
  const navigate = useNavigate();

  console.log(type);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="container">
      <nav
        className="navbar fixed-top navbar-expand-lg bg-body-tertiary justify-content-between"
        data-bs-theme="dark"
      >
        <div className="container">
          <Link className="navbar-brand text-white" to="/">
            Bug Detector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/scanner"
                  className="nav-link text-white"
                  target="blank"
                >
                  Scanner
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/blogs"
                  target="blank"
                >
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/pricing"
                  className="nav-link text-white"
                  target="blank"
                >
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contectus"
                  className="nav-link text-white"
                  target="blank"
                >
                  Contact us
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav align-items-center mx-auto mb-2 mb-lg-0">
              {user ? (
                <>
                  {type === "PremiumUser" && (
                    <li className="nav-item">
                      <div className="nav-link me-0 pe-0">
                        <i
                          className="fa-solid fa-crown"
                          style={{ color: "#FFD43B" }}
                        ></i>
                      </div>
                    </li>
                  )}
                  <li className="nav-item text-light">
                    <div className="nav-link text-white">
                      <em>Welcome {userName}</em>
                    </div>
                  </li>
                  <li className="ms-3 nav-item dropdown">
                    <a
                      className="nav-link"
                      href="/#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="text-light fs-3 fa-solid fa-ellipsis"></i>
                    </a>
                    <ul className="dropdown-menu">
                      {type === "PremiumUser" && (
                        <li>
                          <span className="text-center dropdown-item">
                            Premium User
                          </span>
                        </li>
                      )}
                      {type === "FreeUser" && (
                        <li>
                          <span className="text-center dropdown-item">
                            Free User
                          </span>
                        </li>
                      )}
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li className="text-center dropdown-item">
                        <h5 onClick={handleLogout}>Logout</h5>
                      </li>
                      <li>
                        <Link
                          to="/useraccount"
                          className="text-center dropdown-item"
                          style={{textDecoration:"none"}}
                        >
                          Scan history
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-center dropdown-item"
                          to={"/changepassword"}
                          style={{textDecoration:"none"}}
                        >
                          Change Password
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link text-warning"
                    target="blank"
                    style={{ marginLeft: "200px" }}
                  >
                    Log in
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;

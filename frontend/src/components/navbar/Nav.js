import "./nav.css";
import User from "./user.png";
import bug from "./boxelder-bug.png";
import { Link,useNavigate } from "react-router-dom";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/authSlice';

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.token);
  const userName = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="container">
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary justify-content-between" data-bs-theme="dark">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">Bug Detector</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active text-white" aria-current="page" >Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/scanner" className="nav-link text-white" target="blank">Scanner</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/blogs" target="blank">Blogs</Link>
              </li>
              <li className="nav-item">
                <Link to="/pricing" className="nav-link text-white" target="blank">Pricing</Link>
              </li>
              <li className="nav-item">
                <Link to="/contectus" className="nav-link text-white" target="blank">Contact us</Link>
              </li>
            </ul>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {user ? (
                <>
                  <li className="nav-item text-light">
                    <div className="nav-link text-white"><em>Welcome {userName}</em></div>
                  </li>
                  <li className="nav-item" style={{ marginRight: "10px" }}>
                    <button className="nav-link text-white" onClick={handleLogout} style={{ color: "yellow" }}>Logout</button>
                  </li>

                  <li className="nav-item">
                    <Link to="/useraccount">
                      <img src={User} alt="/" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                    </Link>
                  </li>
                </>
              )
                : (
                  <li className="nav-item" >
                    <Link to="/login" className="nav-link text-warning" target="blank" style={{ marginLeft: "200px" }}>Log in</Link>
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

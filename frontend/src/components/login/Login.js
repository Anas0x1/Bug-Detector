import Sign from "../sign/Sign";
import "./login.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from "sweetalert2-react-content";
import React, { useState } from 'react';
function Login() {



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    


  const MySwal = withReactContent(Swal);
  return (
    <>
      <div className="main-login">
        <div className="right-login">
          <div className="card-login">
            <h1>Login</h1>
            <div className="textfield">
              <label htmlFor="Email">Email</label>
              <input type="text" name="Email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="textfield">
              <label htmlFor="password">password</label>
              <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <span className="btn-cadastre-se" href="/">
              Forget password?
            </span>

            <button
              className="btn-login"
         
          
            >
              Login
            </button>
            
            <div className="log-in-another">
              <span className="btn btn-light">
                <i
                  className="fa-brands fa-facebook "
                  style={{ color: "#2555a2" }}
                ></i>
              </span>
              <span className="btn btn-light">
                <i className="fa-brands fa-google" style={{ color: "#2555a2" }}></i>
              </span>
            </div>
            <div className="new-users">
              <Link to="/sign" style={{ textDecoration: "none" }}>
                New BugDetector?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

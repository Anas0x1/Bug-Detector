import "./login.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/authSlice';
import withReactContent from "sweetalert2-react-content";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login({ email: email, password: password }))
      .then((response) => {
        if (!response.error) {
          navigate('/');
        }
        else {
          MySwal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: response.error.message || 'Something went wrong with login',
          });
        }
      });
      // .catch((error) => {
      //   MySwal.fire({
      //     icon: 'error',
      //     title: 'Login Failed',
      //     text: error.message || 'Something went wrong with login',
      //   });
      // });
  };

  const MySwal = withReactContent(Swal);
  return (
    <>
      <div className="main-login">
        <div className="right-login">
          <div className="card-login">
            <h1>Login</h1>
            <div className="textfield">
              <label htmlFor="Email">Email</label>
              <input type="text" name="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="textfield">
              <label htmlFor="password">password</label>
              <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <span className="btn-cadastre-se" href="/" >
              Forget password?
            </span>

            <button
              className="btn-login"
              onClick={handleLogin} disabled={loading}
            >
              Login
            </button>
            {error && <p style={{ color: "white" }}>{error}</p>}

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

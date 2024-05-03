import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Redux/authSlice';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './sign.css';
import HomePage from '../../pages/HomePage';
function Sign() {
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const registrationError = useSelector((state) => state.auth.error);
   

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (formData.password !== formData.confirmPassword) {
            MySwal.fire({
                icon: 'error',
                title: 'Passwords do not match',
                text: 'Please make sure your passwords match',
            });
            return;
        }

        dispatch(register(formData))
            .then(() => {
                MySwal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'Welcome to BugDetector',
                    showConfirmButton: false,
                    timer: 1500
                });
              
            
            })
            .catch((error) => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message || 'Something went wrong with registration',
                });
            });
    };

    return (
        <>
            <div className="main-login1" >
                <div className="right-login1">
                    <div className="card-login1">
                        <h1>Sign up</h1>
                        <div className="textfield">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="textfield">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="textfield">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="textfield">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} />
                        </div>
                        <button className="btn-login1" onClick={handleSubmit}>Sign up</button>
                        <div className="log-in-another1">
                            <span className="btn btn-light">
                                <i className="fa-brands fa-facebook " style={{ color: "#2555a2" }}></i>
                            </span>
                            <span className="btn btn-light">
                                <i className="fa-brands fa-google" style={{ color: "#2555a2" }}></i>
                            </span>
                        </div>
                        <div className="new-users1">
                            <Link to="/login" style={{ textDecoration: 'none' }} >Already have an account?</Link>
                        </div>
                        {registrationError && <div>{registrationError}</div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sign;

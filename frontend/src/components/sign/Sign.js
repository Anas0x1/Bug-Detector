import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, generateOTP } from '../../Redux/authSlice'; 
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './sign.css';

function Sign() {
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
   

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        otp: '',
        confirmPassword: ''
    });
      
    const [errors, setErrors] = useState({
        PasswordErr: ""
    });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?=.{6,})/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'password') {
            setErrors({
                ...errors,
                PasswordErr: !passwordRegex.test(e.target.value) &&
                    "Password must be at least 6 characters.one alphanumerice,one lowercase and one uppercase"
            });
        }
        
    };
   

    const handleSendCode = () => {
        if(formData.email){
        dispatch(generateOTP(formData.email))
            .then(() => {

                MySwal.fire({
                    icon: 'success',
                    title: 'Code Sent',
                    text: 'An Code has been sent to your email.',
                });
            })
            .catch((error) => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to Send Code',
                    text: error.message || 'Something went wrong while sending the OTP.',
                });
            });
        }
        else {
            MySwal.fire({
                icon: 'error',
                title: 'Failed to Send OTP',
                text: 'Enter your Email',
                timer: 1500,
            });
        }
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
            .then((response) => {
                console.log(formData);
                if (!response.error) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: 'Welcome to BugDetector',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/login');
                }
                else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: response.error.message || 'Something went wrong with registration',
                    });
                }
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
                            <small><button style={{marginTop:'5px',border:'none' ,borderRadius:'3px'}} onClick={handleSendCode}>send code</button></small>
                        </div>
                        <div className="textfield">
                            <label htmlFor="otp">Verify Email</label>
                            <div style={{ display: "flex" }}>
                                <input type="text" name="otp" placeholder="Enter the send code" style={{
                                    padding: "15px",
                                    background: "#514869",
                                    color: "#f0ffffde",
                                    fontSize: "12pt",
                                    boxShadow: "0px 10px 40px #00000056",
                                    outline: "none",
                                    boxSizing: "border-box",
                                    borderRadius: "10px",
                                    border: 'none'
                                }} />
                            </div>
                        </div>

                        <div className="textfield">
                            <label htmlFor="userName">Username</label>
                            <input type="text" name="userName" placeholder="Username" value={formData.userName} onChange={handleChange} />
                        </div>

                        <div className="textfield">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                            <p>{errors.PasswordErr}</p>
                        </div>
                        <div className="textfield">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} />
                        </div>
                        <button className="btn-login1" onClick={handleSubmit}>Sign up</button>
                        <div className="new-users1">
                            <Link to="/login" style={{ textDecoration: 'none' }} >Already have an account?</Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Sign;

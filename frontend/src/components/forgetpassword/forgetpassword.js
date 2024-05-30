import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgetpassword, generateOTPforForgetPassword } from '../../Redux/authSlice';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './forgetpassword.css';

function ForgetPassword() {
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);


    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        otp: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        PasswordErr: ""
    });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?=.{6,10})/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'password') {
            setErrors({
                ...errors,
                PasswordErr: !passwordRegex.test(e.target.value) &&
                    "Password must be 6-10 characters.one alphanumerice,one lowercase and one uppercase"
            });
        }

    };


    const handleSendCode = () => {
        if (formData.email) {
            dispatch(generateOTPforForgetPassword(formData.email))
                .then((response) => {
                    console.log("response")
                    console.log(response)
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

        dispatch(forgetpassword(formData))
            .then((response) => {
                console.log(response);
                if (!response.error) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Your password has been reset successfully',
                        text: 'Welcome to BugDetector',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/login');
                }
                else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Failed to reset your password',
                        text: response.error.message || 'Something went wrong with registration',
                    });
                }
            });

    };

    return (
        <>
            <div className="main-login1" style={{marginTop:"10%"}} >
                <div className="right-login1">
                    <div className="card-login1">
                        <h1>Reset Password</h1>
                        <div className="textfield">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="textfield">
                            <small><button className='btn btn-outline-light' style={{ marginTop: '5px' }} onClick={handleSendCode}>send code</button></small>
                        </div>

                        <div className="textfield">
                            <label htmlFor="otp">Verify Code</label>
                            <input type="text" name="otp" placeholder="Enter the send code" value={formData.otp} onChange={handleChange} />
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
                        <button className="btn-login1 mt-4" onClick={handleSubmit}>Reset Password</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;

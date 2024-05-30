import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changepassword, logout } from '../../Redux/authSlice';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './changepassword.css';

function ChangePassword() {
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);


    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [errors, setErrors] = useState({
        PasswordErr: ""
    });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?=.{6,10})/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'newPassword') {
            setErrors({
                ...errors,
                PasswordErr: !passwordRegex.test(e.target.value) &&
                    "Password must be 6-10 characters.one alphanumerice,one lowercase and one uppercase"
            });
        }

    };


    const handleSubmit = () => {
        if (formData.newPassword !== formData.confirmNewPassword) {
            MySwal.fire({
                icon: 'error',
                title: 'Passwords do not match',
                text: 'Please make sure your passwords match',
            });
            return;
        }

        dispatch(changepassword(formData))
            .then((response) => {
                if (!response.error) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Your password has been changed successfully',
                        text: 'Welcome to BugDetector',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    dispatch(logout());
                    navigate('/login');
                }
                else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Failed to change your password',
                        text: response.error.message || 'Something went wrong with registration',
                    });
                }
            });

    };

    return (
        <>
            <div className="main-login1" style={{marginTop:"7%"}}>
                <div className="right-login1">
                    <div className="card-login1 py-5">
                        <h1>Change Password</h1>
                        <div className="textfield">
                            <label htmlFor="oldPassword">Old Password</label>
                            <input type="password" name="oldPassword" placeholder="Enter your old password" value={formData.oldPassword} onChange={handleChange} />
                        </div>
                        <div className="textfield">
                            <label htmlFor="newPassword">New Password</label>
                            <input type="password" name="newPassword" placeholder="Enter new password" value={formData.newPassword} onChange={handleChange} />
                            <p>{errors.PasswordErr}</p>
                        </div>
                        <div className="textfield">
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                            <input type="password" name="confirmNewPassword" placeholder="Confirm new password" value={formData.confirmNewPassword} onChange={handleChange} />
                        </div>
                        <button className="btn-login1" onClick={handleSubmit}>Change Password</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;

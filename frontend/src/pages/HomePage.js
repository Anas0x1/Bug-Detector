import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Nav from "../components/navbar/Nav";
import Home from "../components/home/Home";

const HomePage = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Use navigate instead of history.push
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <Nav />
            <Home />
        </>
    );
}

export default HomePage;

import './pricing.css';
import React from 'react';

import { Link } from 'react-router-dom';

function Pricing() {
 

    return (
        <div className="pricing-container">
            <div className="pricing-content section-padding">
                <div className="container" style={{ display: "block" }}>
                    <div className="section-title text-center">
                        <h3 style={{ color: "white", marginTop: "100px", marginBottom: "30px" }}>Pricing Plan</h3>
                    </div>
                    <div className="row text-center" style={{ justifyContent: "center", alignItems: "center" }}>
                        <div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0" style={{ width: "400px" }}>
                            <div className="single-pricing">
                                <div className="price-head">
                                    <h2>Free</h2>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <h1 className="price">$0.00</h1>
                                <h5>Monthly</h5>
                                <ul>
                                    <li>Web Application information gathering</li>
                                    <li>Port scanning</li>
                                    <li>Source code review basic scan</li>
                                    <li>Limited scan</li>
                                    <li>Summary reports</li>
                                </ul>
                                <Link to="/" className='btn btn-outline-warning'>Get start </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0" style={{ width: "400px" }}>
                            <div className="single-pricing single-pricing-white">
                                <div className="price-head">
                                    <h2>Premium</h2>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <span className="price-label">Best</span>
                                <h1 className="price">$20.00</h1>
                                <h5>Monthly</h5>
                                <ul>
                                    <li>Web security advanced scan</li>
                                    <li>OWASP top 10</li>
                                    <li>Port scanning , Exloitation</li>
                                    <li>Source code advanced scan</li>
                                    <li>Scheduled scan</li>
                                    <li>Summary reports</li>
                                </ul>
                               
             <Link to="/pricing/payment" className='btn btn-outline-warning'>Purchase</Link>
                              

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;

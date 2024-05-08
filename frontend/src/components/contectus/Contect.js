import Swal from 'sweetalert2';

import './contect.css';
import { useState } from 'react';

const Contect = () => {
    const [x,setX]=useState("");
    const [email,setE]=useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if(x&&email){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "Message send",
              });
           }
           else{
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "info",
                title: "fill up the data first",
              });

           }
           
        
    };
    
    return (
        <div className="container" id="container-2">
            <div className="main1">
                <h3>Contact us</h3>
                <input type="email" placeholder="Your email" id="email" required onChange={(e)=>{setE(e.target.value)}}/>
            </div>
            <div className="message">
                <form onSubmit={handleSubmit}>
                    <textarea placeholder="Your Message" id="message" onChange={(e)=>{setX(e.target.value)}}></textarea>
                    <button type="submit" id="submit-button" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Contect;

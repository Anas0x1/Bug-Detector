import Swal from 'sweetalert2';
import { send } from '../../Redux/messageSlice';
import './contect.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Contect = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && email) {
      dispatch(send({ email, message })).then(
        Toast.fire({
          icon: "success",
          title: "Message send",
        }),
        setEmail(''),
        setMessage('')
      )
    }
    else {
      Toast.fire({
        icon: "info",
        title: "fill up the data first",
      });

    }


  };

  return (
    <div className="container text-center" style={{ marginTop: "10%" }}>
      <div className="d-flex flex-column" style={{ paddingRight: "20%", paddingLeft: "20%" }}>
        <h3 className='text-light'>Contact us</h3>
        <div className='textfield'>
          <input type="email" placeholder="Your email" id="email" required onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className='textfield'>
          <textarea placeholder="Your Message" rows={6} required onChange={(e) => { setMessage(e.target.value) }}></textarea>

        </div>
        <button className='btn-login1 w-25 mt-3 ms-auto' type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    // <div className="container" id="container-2">
    //     <div className="main1">
    //         <h3>Contact us</h3>
    //         <input type="email" placeholder="Your email" id="email" required onChange={(e)=>{setE(e.target.value)}}/>
    //     </div>
    //     <div className="message">
    //         <form onSubmit={handleSubmit}>
    //             <textarea placeholder="Your Message" id="message" onChange={(e)=>{setX(e.target.value)}}></textarea>
    //             <button type="submit" id="submit-button" onClick={handleSubmit}>Submit</button>
    //         </form>
    //     </div>
    // </div>
  );
};

export default Contect;

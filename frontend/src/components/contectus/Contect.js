import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './contect.css';

const Contect = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };
    const MySwal = withReactContent(Swal);
    
    return (
        <div className="container" id="container-2">
            <div className="main1">
                <h3>Contact us</h3>
                <input type="email" placeholder="Your email" id="email" required />
            </div>
            <div className="message">
                <form onSubmit={handleSubmit}>
                    <textarea placeholder="Your Message" id="message"></textarea>
                    <button type="submit" id="submit-button" onClick={()=>{Swal.fire({
  title: "Message was send",
  text: "continue!!",
  icon: "success"
});}} >Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Contect;

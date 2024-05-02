
import "./sign.css";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content'
function Sign() {
    const MySwal = withReactContent(Swal)
return(<>
<div className="main-login1" >

            <div className="right-login1">
                <div className="card-login1">
                    <h1>Sign up</h1>
                    <div className="textfield">
                        <label htmlFor="Email">Email</label>
                        <input type="text" name="Email" placeholder="Email"/>
                    </div>
                    <div className="textfield">
                        <label htmlFor="Name">Name</label>
                        <input type="text" name="Name" placeholder="Name"/>
                    </div>
                    <div className="textfield">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password"/>
                    </div>
                    <div className="textfield">
                        
                        <input type="confirm password" name="confirm password" placeholder="Confirm password"/>
                    </div>
                
                    
                    <button className="btn-login1"onClick={()=>{
Swal.fire({

  icon: "success",
  title: "Welcome to BugDetector",
  showConfirmButton: false,
  timer: 700
});}}>Sign up</button>
        
                 <div className="log-in-another1">
                        <span className="btn btn-light">
                        <i className="fa-brands fa-facebook " style={{color: "#2555a2"}}></i>
                        </span>
                        <span className="btn btn-light">
                        <i className="fa-brands fa-google" style={{color: "#2555a2"}}></i>
                        </span>
                    </div>
                    <div className="new-users1">
                        <Link to="/login" style={{textDecoration:'none'}} >have account!</Link>
                    </div>
                
                </div>
            </div>
        </div>


</>);
}

export default Sign;

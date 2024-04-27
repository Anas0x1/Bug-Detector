
import Sign from "../sign/Sign";
import "./login.css";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { useState } from "react";
import withReactContent from 'sweetalert2-react-content'
function Login() {


    const MySwal = withReactContent(Swal)
return(<>
<div className="main-login">

            <div className="right-login">
                <div className="card-login">
                    <h1>Login</h1>
                    <div className="textfield">
                        <label for="Email">Email</label>
                        <input type="text" name="Email" placeholder="Email"/>
                    </div>
                    <div className="textfield">
                        <label for="password">password</label>
                        <input type="password" name="password" placeholder="password"/>
                    </div>
                
                        <span className="btn-cadastre-se" href="/">Forget password?</span>
                    
                    <button className="btn-login"  onClick={()=>{
Swal.fire({

  icon: "success",
  title: "Hello !!",
  showConfirmButton: false,
  timer: 700
});}}>Login</button>
        
                    <div className="log-in-another">
                        <button className="btn "style={{background:" 	#1877F2"}}>
                      Facebook
                        </button>
                        <button className="btn "style={{background:" #ffffff"}} >
                            Google
                        </button>
                    </div>
                    <div className="new-users">
                        <Link to="/login/signin" onClick={()=>{<Sign/>}}>New BugDetector?</Link>
                    </div>
                </div>
            </div>
        </div>


</>);
}

export default Login;

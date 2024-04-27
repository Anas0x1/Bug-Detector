



import "./sign.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function Sign() {
    const MySwal = withReactContent(Swal)
return(<>
<div className="main-login">

            <div className="right-login">
                <div className="card-login">
                    <h1>Sign up</h1>
                    <div className="textfield">
                        <label for="Email">Email</label>
                        <input type="text" name="Email" placeholder="Email"/>
                    </div>
                    <div className="textfield">
                        <label for="Name">Name</label>
                        <input type="text" name="Name" placeholder="Name"/>
                    </div>
                    <div className="textfield">
                        <label for="password">Password</label>
                        <input type="password" name="password" placeholder="Password"/>
                    </div>
                    <div className="textfield">
                        
                        <input type="confirm password" name="confirm password" placeholder="Confirm password"/>
                    </div>
                
                    
                    <button className="btn-login"onClick={()=>{
Swal.fire({

  icon: "success",
  title: "Welcome to BugDetector",
  showConfirmButton: false,
  timer: 700
});}}>Sign up</button>
        
                    <div className="log-in-another">
                        <button className="btn "style={{background:" 	#1877F2"}}>
                      Facebook
                        </button>
                        <button className="btn "style={{background:" #ffffff"}}>
                            Google
                        </button>
                    </div>
                
                </div>
            </div>
        </div>


</>);
}

export default Sign;

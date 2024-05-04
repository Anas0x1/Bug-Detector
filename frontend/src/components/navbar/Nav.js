import { Link } from "react-router-dom";
import "./nav.css";
import user from "./user.png";
import bug from "./boxelder-bug.png"

function Nav() {

  return (<>
    <div className="container">
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">BugDetector</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><img href={bug} alt="logo" /></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active text-white" aria-current="page" >Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/scanner" className="nav-link text-white" target="blank">Scanner</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/blogs" target="blank">Blogs</Link>
              </li>
              <li className="nav-item">
                <Link to="/pricing" className="nav-link text-white" target="blank">Pricing</Link>
              </li>
              <li className="nav-item">
                <Link to="/contectus" className="nav-link text-white" target="blank">Contact us</Link>
              </li>

              <li className="nav-item" >
                <Link to="/login" className="nav-link text-warning" target="blank" style={{ marginLeft: "200px" }}>Log in</Link>
              </li>

              <li className="nav-item" >
                <Link to="/useraccount">
                  <img src={user} alt="/" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>

  </>);
}
export default Nav;


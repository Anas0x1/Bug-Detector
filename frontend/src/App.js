import Home from "./components/home/Home";
import Nav from "./components/navbar/Nav";
import { Route,Routes,Switch } from "react-router-dom";
import Scanner from "./components/scann/Scanner";
import Webscan from "./components/webscan/Webscan";
import Networkscan from "./components/networkscan/Networkscan";
import Contect from "./components/contectus/Contect";
import Blogs from "./components/blogs/Blogs";
import Pricing from "./components/pricing/Pricing";
import Login from "./components/login/Login";
import Sign from "./components/sign/Sign";



function App() {
  return (
    <div classNameName="App">
      <Nav/>
      <Home/>
    </div>
  );
}

export default App;

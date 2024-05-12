import React from 'react';
import "./card.css"
import { Link } from "react-router-dom";

export default function BlogCard(props) {

  const handleDelete=()=>{


  }
  return (
    <>
      <div className="card" style={{ height: "400px", width: "400px",overflow: "auto"  }}>
    
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text" style={{color:"black"}}>{props.content}</p>
        </div>
        <div className="card-footer">
          < Link className='read-btn' to="/readblog">read <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
      </div>
    </>
  );
}

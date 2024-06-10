import React from 'react';
import "./card.css"
import { Link } from "react-router-dom";
import moment from 'moment';

export default function BlogCard(props) {
  return (
    <>
      <div className="card" style={{ height: "400px", width: "400px", overflow: "auto" }}>
        <div className="card-body">
         
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text" style={{ color: "black" }}>
            {props.content && props.content.slice(0, 150)} ...
            < Link className='read-btn' to={"/readblog/" + props.id}>
              <i className="fa-solid fa-circle-right fa-beat ms-2 text-info"></i>
            </Link>
          </p>
        </div>
        <div className="m-3 text-dark">
         <h5 ><small>{props.Name}</small></h5>
         <small>{moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}</small> 
        </div>
      </div>
    </>
  );
}

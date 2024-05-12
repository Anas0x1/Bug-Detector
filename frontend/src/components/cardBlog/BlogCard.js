import React from 'react';

export default function BlogCard(props) {

  return (
    <>
      <div className="card" style={{ height: "350px", width: "250px" }}>
        <div className="card-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <h6 className="card-title">{props.title}</h6>
          <p className="card-text text-dark">{props.content}</p>
        </div>
      </div>
    </>
  );
}

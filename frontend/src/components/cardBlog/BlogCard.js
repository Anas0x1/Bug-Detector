import React from 'react';

export default function BlogCard(props) {
  return (
    <>
      <div className="card" style={{ height: "100px", width: "1000px" }}>
        <div className="card-body">
          <h5 className="card-title">{props.blog.title}</h5>
          <p className="card-text">{props.blog.content}</p>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBlog, selectOneBlog, addLike, addDislike } from '../../Redux/blogsSlice';
import { addNewComment, fetchAllComment, selectAllComments, addCommentLike, addCommentDislike, deleteComment } from '../../Redux/commentSlice';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './readblog.css';

export default function Readblog() {
  const [comment, setComment] = useState('');
  const blog = useSelector((state) => selectOneBlog(state.blogs));
  const comments = useSelector((state) => selectAllComments(state));
  const token = useSelector((state) => state.auth.token);
  let Like = <i className="fa-regular fa-thumbs-up"></i>;
  let disLike = <i className="fa-regular fa-thumbs-down"></i>;
  const dispatch = useDispatch();

  const blogId = useParams();
  const blogid = blogId.blogId;
  console.log(blogId.blogId)

  const handleSubmit = () => {
    if (token) {
      if (comment) {
        dispatch(addNewComment({ blogid, comment }))
          .then(() => {
            dispatch(fetchAllComment(blogId));
          });
        setComment('')
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Comment added successfly"
        });
      }
      else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "info",
          title: "Add comment"
        });
      }

    }
    else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Login first"
      });
    }
  };

  useEffect(() => {
    dispatch(getBlog(blogId));
    dispatch(fetchAllComment(blogId));

  }, [blogId, dispatch]);
  console.log("comments")
  console.log(comments)
  const handleLike = (blogid, e) => {
    e.preventDefault();
    dispatch(addLike({ blogid })).then(() => {
      dispatch(getBlog({ blogid }));
    });
  };
  const handleDislike = (blogid, e) => {
    e.preventDefault();
    dispatch(addDislike({ blogid })).then(() => {
      dispatch(getBlog({ blogid }));
    });
  }
  const handleCommentLike = (commentid, e) => {
    e.preventDefault();
    dispatch(addCommentLike({ commentid })).then(() => {
      dispatch(fetchAllComment(blogId));
    });
  };
  const handleCommentDislike = (commentid, e) => {
    e.preventDefault();
    dispatch(addCommentDislike({ commentid })).then(() => {
      dispatch(fetchAllComment(blogId));
    });
  };
  const handleCommentDelete = (commentid, e) => {
    e.preventDefault();
    dispatch(deleteComment({ blogid, commentid })).then(() => {
      dispatch(fetchAllComment(blogId));
    });
  };


  return (
    <>
      <div className='container mx-auto d-flex' style={{ marginTop: "10%", width: "90%", height: "600px" }}>
        <div className='col-8'>
          <div className="card" style={{ height: "400px", overflow: "auto" }}>
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>
              <span className="text-dark">
                {moment(blog.publicationDate).format('MMMM Do YYYY, h:mm:ss a')}
              </span>
              <p className="card-text mt-3" style={{ color: "black" }}>{blog.content}</p>
            </div>
          </div>
          <div className='mt-2 fs-5'>
            <span className='me-2' onClick={(e) => handleLike(blog.id, e)} style={{ color: "blue" }}>{Like}</span>
            <span className='me-2' style={{ color: "white" }}>{blog.numberOfLikes}</span>
            <span className='me-2' onClick={(e) => handleDislike(blog.id, e)} style={{ color: "red" }}>{disLike}</span>
            <span style={{ color: "white" }}>{blog.numberOfDisLikes}</span>
          </div>
          <div className='mt-3'>
            <h4 style={{ color: "aliceblue" }}>Comment</h4>
            <div className='d-flex'>
              <textarea rows="3" placeholder="Enter your comment" id="input" className="form-control me-3"
                value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
              <button className="btn btn-success align-self-start" type="submit" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </div>
        </div>
        <div className='col-4 bg-light ms-4 rounded-3' style={{ overflow: "auto" }}>
          <div className="card-body p-4">
            <h4 className="mb-0">Recent comments</h4>
            <p className="fw-light text-dark mb-4 pb-2">Latest Comments section by users</p>
            <div>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index}>
                    <h6 className="fw-bold mb-1">{comment.usrName}</h6>
                    <div className="d-flex align-items-center mb-3">
                      <p className="mb-0 text-dark">
                        {moment(comment.publicationDate).format('MMMM Do YYYY, h:mm:ss a')}
                      </p>
                      <span onClick={(e) => handleCommentLike(comment.id, e)} className="link-muted link-muted1">
                        <i className="fa-regular fa-thumbs-up mx-2"></i>
                        <span className='text-primary fw-medium'>{comment.numberOfLikes}</span>
                      </span>
                      <span onClick={(e) => handleCommentDislike(comment.id, e)} className="link-muted link-muted2">
                        <i className="fa-regular fa-thumbs-down mx-2"></i>
                        <span className='text-danger fw-medium'>{comment.numberOfDisLikes}</span>
                      </span>
                      <span onClick={(e) => handleCommentDelete(comment.id, e)} className="link-muted link-muted2">
                        <i className="fa-solid fa-trash mx-2"></i>
                      </span>
                    </div>
                    <p className="mb-0 text-dark">
                      {comment.content}
                    </p>
                    <hr className="my-3" style={{ height: "1px" }} />
                  </div>
                ))
              ) : (
                <div className="text-center text-light" role="status" style={{ marginBottom: "1000px", justifyContent: "center" }}>
                  <span className="fs-4" style={{ color: "black" }}>No comments</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBlogs, selectAllBlogs, addNewBlog, addLike, addDislike,deleteBlog } from '../../Redux/blogsSlice';
import Swal from 'sweetalert2';
import BlogCard from '../cardBlog/BlogCard';
import "./blogs.css"

const Blogs = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllBlogs());
    }, [dispatch]);

    const blogs = useSelector((state) => selectAllBlogs(state));
    const token = useSelector((state) => state.auth.token);
    let Like = <i className="fa-regular fa-thumbs-up"></i>;
    let disLike = <i className="fa-regular fa-thumbs-down"></i>;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    console.log("blogs")
    console.log(blogs)

    const handleAddBlog = () => {
        if (title && content) {
            dispatch(addNewBlog({ title, content })).then(() => {
                dispatch(fetchAllBlogs());
            });
            setTitle('');
            setContent('');

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "success",
                title: "blog add",
            });

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
                },
            });
            Toast.fire({
                icon: "info",
                title: "fill up the data",
            });
        }
    };

    const handleLike = (blogid, e) => {
        e.preventDefault();
        dispatch(addLike({ blogid })).then(() => {
            dispatch(fetchAllBlogs());
        });


    };
    const handleDislike = (blogid, e) => {
        e.preventDefault();
        dispatch(addDislike({ blogid })).then(() => {
            dispatch(fetchAllBlogs());
        });

    };
    const handleDelete = (blogid, e) => {
        e.preventDefault();
        dispatch(deleteBlog(blogid))
        .then(() => {
          dispatch(fetchAllBlogs());
        });
      };

    return (
        <>
            <div className="container search-input" style={{ marginTop: "10%" }}>
                <input type="text" placeholder="Search" id="search-on-blogs" style={{ outline: "none", border: "none", width: "50%", borderRadius: "2px", marginRight: "3px", height: "40px" }} />

                {token && <button type="button" className="btn btn-success mt-3 mt-md-0" id="btn-schedule" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="fa-solid fa-plus"></i> Add Blog

                </button>}



                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new blog</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <label htmlFor="exampleFormControlInput1">Title</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" style={{ marginTop: '10px', border: '2px solid rgba(0, 0, 0, 0.13)' }} required value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>

                            <div className="modal-body">
                                <label htmlFor="exampleFormControlTextarea1"><small>Content</small></label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" style={{ marginTop: '10px', border: '2px solid rgba(0, 0, 0, 0.13)' }} required value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-success p-2" id="Publish-btn" data-bs-dismiss="modal" onClick={handleAddBlog}>
                                    <small style={{ width: '50%' }}>Publish</small>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container d-flex flex-wrap justify-content-evenly'>
                {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <div className='mt-3' key={index}>
                            <BlogCard date={blog.publicationDate} title={blog.title} content={blog.content} id={blog.id} />
                            <span className='me-2' onClick={(e) => handleLike(blog.id, e)} style={{ color: "blue" }}>{Like}</span>
                            <span className='me-2' style={{ color: "white" }}>{blog.numberOfLikes}</span>
                            <span className='me-2' onClick={(e) => handleDislike(blog.id, e)} style={{ color: "red" }}>{disLike}</span>
                            <span style={{ color: "white" }}>{blog.numberOfDisLikes}</span>
                            <span onClick={(e) => handleDelete(blog.id, e)} className="link-muted link-muted2">
                                <i className="fa-solid fa-trash mx-2"></i>
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="spinner-border text-light" role="status" style={{ marginBottom: "1000px", justifyContent: "center" }}>
                        <span className="sr-only" style={{ color: "white" }}>Loading...</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Blogs;

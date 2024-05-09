import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBlogs, selectAllBlogs, selectBlogsLoading, selectBlogsError, addNewBlog } from '../../Redux/blogsSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import BlogCard from '../cardBlog/BlogCard';

const Blogs = () => {
    const MySwal = withReactContent(Swal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllBlogs());
    }, [dispatch]);

    const blogs = useSelector((state) =>selectAllBlogs(state));
    const loading = useSelector((state) =>selectBlogsLoading(state));
    const error = useSelector((state) =>selectBlogsError(state));
    const token = useSelector((state) => state.auth.token);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleAddBlog = () => {
        dispatch(addNewBlog({ title, content }));
        setTitle('');
        setContent('');
        MySwal.fire({
            title: "Blog added successfully",
            icon: "success"
        });
    };

    if (loading) {
        return <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
        </div>;
    }

    return (
        <>
            <div className="container search-input">
                <input type="text" placeholder="Search" id="search-on-blogs" />

                <button type="button" className="btn btn-success" id="btn-schedule" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="fa-solid fa-plus"></i> Add Blog
                </button>

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
                                <button type="button" className="btn btn-success p-2" id="Publish-btn" onClick={handleAddBlog}>
                                    <small style={{ width: '50%' }}>Publish</small>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                {blogs.map((blog, index) => (
                    <BlogCard key={index} title={blog.title} content={blog.content} />
                ))}
            </div>
        </>
    );
};

export default Blogs;

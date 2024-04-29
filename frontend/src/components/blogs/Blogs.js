
import './blogs.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import BlogCard from '../cardBlog/BlogCard';

const Blogs = () => {
    const MySwal = withReactContent(Swal);

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
                                <input type="text" className="form-control" id="exampleFormControlInput1" style={{ marginTop: '10px', border: '2px solid rgba(0, 0, 0, 0.13)' }} required />
                            </div>

                            <div className="modal-body">
                                <label htmlFor="exampleFormControlTextarea1"><small>Content</small></label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" style={{ marginTop: '10px', border: '2px solid rgba(0, 0, 0, 0.13)' }} required></textarea>
                            </div>

                            <div className="modal-body">
                                <label htmlFor="exampleFormControlInput2">Tag</label>
                                <input type="text" className="form-control" id="exampleFormControlInput2" style={{ marginTop: '10px', border: '2px solid rgba(0, 0, 0, 0.13)' }} required />
                            </div>

                            <div className="modal-body">
                                <label htmlFor="exampleFormControlFile1"><small>Insert img</small></label>
                                <small><input type="file" className="form-control-file" id="exampleFormControlFile1" /></small>
                            </div>
                            
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success p-2" id="Publish-btn" onClick={() => {
                                    MySwal.fire({
                                        title: "Blog publish",
                                        text: "continue!!",
                                        icon: "success"
                                    });
                                }}>
                                    <small style={{ width: '50%' }}>Publish</small>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <BlogCard/>
            </div>
          
        </>
    );
};

export default Blogs;


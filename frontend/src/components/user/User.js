import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllReports, selectAllReports, selectReportsLoading } from '../../Redux/userSlice';
import "./user.css";
import { Link } from "react-router-dom";
import moment from 'moment';
import ReactPaginate from 'react-paginate';

function User() {
  const dispatch = useDispatch();

  const reports = useSelector((state) => selectAllReports(state));
  const loading = useSelector((state) => selectReportsLoading(state));
  const [currentPage, setCurrentPage] = useState(0);
  const dataPerPage = 10; // You can adjust this as needed
  const maxPageLinks = 2; // Number of page links to display

  useEffect(() => {
    dispatch(fetchAllReports());

  }, [dispatch]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  // Calculate the total number of pages
  const pageCount = Math.ceil(reports.length / dataPerPage);

  // Calculate the range of visible page links
  const visiblePageLinks = [];
  const startPage = Math.max(0, currentPage - Math.floor(maxPageLinks / 2));
  const endPage = Math.min(pageCount - 1, startPage + maxPageLinks - 1);
  for (let i = startPage; i <= endPage; i++) {
    visiblePageLinks.push(i);
  }
  const offset = currentPage * dataPerPage;
  const currentPageData = reports.slice(offset, offset + dataPerPage);

  console.log("currentPageData")
  console.log(currentPageData)
  return (
    <>
      <div className="container" style={{ marginTop: "70px", backgroundColor: "rgba(255, 255, 255, 0.75)", borderRadius: "10px", minHeight: "70vh", padding: '50px' }}>

        <h2 style={{ color: "white" }}>Scans</h2>
        <Link to="/scanner" className="btn btn-warning me-3" id="btn-scan" ><i className="fa-solid fa-plus"></i> New Scan </Link>

        <Link className="btn-cadastre-se btn btn-info text-dark" to={"/changepassword"} >
          <i className="fa-solid fa-arrow-rotate-right me-1"></i>Change Password
        </Link>
        <table className="mb-3 table align-middle mb-0 bg-white" style={{ marginTop: "10px" }}>
          <thead className="bg-light">
            <tr>

              <th scope="col">Scans</th>
              <th scope="col">Status</th>
              <th scope="col">Target</th>
              <th scope="col">Date</th>
              <th scope="col">Read More</th>
            </tr>

          </thead>
          <tbody>
            {currentPageData.length > 0 ? (
              currentPageData.map((report, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">

                      <div className="ms-3">
                        {report.type}
                      </div>
                    </div>
                  </td>
                  <td>
                    {report.result &&
                      report.result.toLowerCase().includes('error') ?
                      <i className="fa-solid fa-x" style={{ color: "white", backgroundColor: "#f50a0a", width: "30px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%" }}></i>
                      : <i className="fa-solid fa-check" style={{ color: "white", backgroundColor: "#76fe06", width: "30px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%" }}></i>
                    }
                  </td>
                  <td>
                    <span style={{ cursor: 'auto' }}>{report.targit}</span>
                  </td>
                  <td>{moment(report.dateTime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  <td>
                    <Link to={"/report/" + report.reportId} className="" ><i className="fa-solid fa-angles-right text-info"></i></Link>
                  </td>
                </tr>
              ))
            ) : (loading ?
              <tr>
                <td colSpan={5} className='text-center'>
                  <div className="spinner-border text-dark" role="status" style={{ marginBottom: "10%", marginTop: "10%", justifyContent: "center" }}>
                    <span className="sr-only" style={{ color: "black" }}>Loading...</span>
                  </div>
                </td>
              </tr> :
              <tr>
                <td colSpan={5} className='text-center'>
                  <div className='text-dark my-5 mx-auto display-6'>No scans found</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {pageCount > 0 && <div className='d-flex justify-content-center'>
          <ReactPaginate
            pageCount={Math.ceil(reports.length / dataPerPage)}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousClassName={'pagination-previous'}
            nextClassName={'pagination-next'}
            pageClassName={'pagination-page'}
            breakClassName={'pagination-break'}
          />
        </div>}


      </div>


    </>
  );
}

export default User;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReport, selectOneReport } from '../../Redux/userSlice';
import "./report.css";
import { Link } from "react-router-dom";
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';

function Report() {
    const report = useSelector((state) => selectOneReport(state.user.report));
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    console.log("report")
    console.log(report)

    const reportId = useParams();
    const data = { id: reportId.reportId }
    console.log(reportId)
    useEffect(() => {
        dispatch(getReport(data));

    }, [ reportId, dispatch]);
    return (
        <>
        <div className='text-light' style={{marginTop:"200px",border:"1px solid black"}}>
            {report.title}
        </div>
        </> 
    );
}

export default Report;

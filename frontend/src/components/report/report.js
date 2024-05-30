import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReport, selectOneReport, selectReportsLoading } from '../../Redux/userSlice';
import "./report.css";
import moment from 'moment';
import { useParams } from 'react-router-dom';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

function Report() {
    const getTargetElement = () => document.getElementById('table-id');

    const report = useSelector((state) => selectOneReport(state.user.report));
    const loading = useSelector((state) => selectReportsLoading(state));
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    console.log("report")
    console.log(report)
    console.log(typeof report)

    const reportId = useParams();
    console.log(reportId)
    useEffect(() => {
        dispatch(getReport({ id: reportId.reportId }));
    }, [reportId, dispatch]);
    const options = {
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.HIGH,
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.MEDIUM,
        },
        filename: reportId.reportId + ' scan ' + moment(new Date()).format('LLL') + '.pdf',
    };
    return (
        <>
            {!loading ? <div className='container' style={{ marginTop: "8%", minHeight: "100hv" }}>
                <div className='row'>
                    <div id='table-id' className='table-responsive bg-light rounded-3 p-5'>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ color: "red" }} >Title</th>
                                    <th scope="col" style={{ color: "red" }} >Description</th>
                                    <th scope="col" style={{ color: "red" }} >Output</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.result ? report.result.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.title && item.title.replaceAll("<br>", "")}</td>
                                        <td>{item.details && item.details.replaceAll("<br>", "\n")}</td>
                                        <td>{item.output && item.output.replaceAll("<br>", "")}</td>
                                    </tr>
                                )) : <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                {(report.result) &&
                    <button className="mt-3 btn btn-success rounded" onClick={() => generatePDF(getTargetElement, options)}><i className="fa-solid fa-download fa-beat me-1"></i> Download</button>
                }
            </div> :
                <div className='text-center'>
                    <div style={{ marginTop: "20%" }} className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }

        </>
    );
}

export default Report;

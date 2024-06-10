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

    const reportId = useParams().reportId;
    const type = useParams().type;

    useEffect(() => {
        dispatch(getReport({ id: reportId }));
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
                        {type === 'SourceCodeScan' ? <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ color: "red" }} >Filepath</th>
                                    <th scope="col" style={{ color: "red" }} >Injected Function</th>
                                    <th scope="col" style={{ color: "red" }} >Mitigation Function</th>
                                    <th scope="col" style={{ color: "red" }} >Explanation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.result ? Object.keys(report.result.result).map(key =>
                                    <tr key={key}>
                                        <td id="filepath">{report.result.result[key].filepath && report.result.result[key].filepath.replaceAll("<br>", "\n")}</td>
                                        <td>{report.result.result[key].injectedFunction && report.result.result[key].injectedFunction.replaceAll("<br>", "\n")}</td>
                                        <td>{report.result.result[key].mitigationFunction && report.result.result[key].mitigationFunction.replaceAll("<br>", "\n")}</td>
                                        <td>{report.result.result[key].explanation && report.result.result[key].explanation.replaceAll("<br>", "\n")}</td>
                                    </tr>
                                ) : <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>}
                            </tbody>
                        </table> : <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ color: "red" }} >Title</th>
                                    <th scope="col" style={{ color: "red" }} >Description</th>
                                    <th scope="col" style={{ color: "red" }} >Output</th>
                                    <th scope="col" style={{ color: "red" }} >Mitigation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.result ? Object.keys(report.result.result).map(key =>
                                    <tr key={key}>
                                        <td>{report.result.result[key].title && report.result.result[key].title.replaceAll("<br>", "\n")}</td>
                                        <td>{report.result.result[key].details && report.result.result[key].details.replaceAll("<br>", "\n")}</td>
                                        <td>{report.result.result[key].output && report.result.result[key].output.replaceAll("<br>", "\n")}</td>
                                        <td>{report.result.result[key].mitigation && report.result.result[key].mitigation.replaceAll("<br>", "\n")}</td>
                                    </tr>
                                ) : <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>}
                            </tbody>
                        </table>}

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

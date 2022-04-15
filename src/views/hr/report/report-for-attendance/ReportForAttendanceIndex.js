/**
* Report For Attendance
*
* @author  ht_nguyen
* @create  08/07/2021 (D/M/Y)
* @param
* @return
*/

import React, { useState, useEffect } from "react";
import { withTranslation } from 'react-i18next';
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import {
    Link
} from "@material-ui/core";
import {
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CRow,
    CSelect,
    CLabel
} from "@coreui/react";


const LegacyWelcomeClass = ({ t, i18n }) => {

    const [error, setError]                 = useState([]);             // For show error message
    const [success, setSuccess]             = useState([]);             // For show success message
    const [deptState, setDeptState]         = useState("");             // For selected departmentID
    const [departmentAPI, setDepartmentAPI] = useState([]);             // For list department from API
    const [listLink, setListLink]           = useState([]);             // For list button export file
    const [loading, setLoading]             = useState(false);          // For show loading image

    /**
    * Page Load
    *
    * @author  ht_nguyen
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        loadDept();
        loadListAttendanceFile();
    }, []);

    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  ht_nguyen
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        };
    }, [error, success]);

    /**
    * Load Department
    *
    * @author  ht_nguyen
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadDept = async () => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setDepartmentAPI([]) : setDepartmentAPI(response.data.data);
    };

    /**
    * Select deparment function
    *
    * @author  ht_nguyen
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const deptChange = (e) => {
        setDeptState(e.target.value);
    };

    /**
    * Load list attendance file to download
    *
    * @author  ht_nguyen
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadListAttendanceFile = async () => {
        let url = `${ApiPath.ReportForAttendance}`
            + `?company_id=${ApiPath.companyID}`
            + `&language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setListLink([]) : setListLink(response.data?.data?.salary_calculated_date);
    };

    /**
    * Export file Report For Attendance
    *
    * @author  ht_nguyen
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const handleExportFile = async (e) => {
        setError([]);
        setLoading(true);
        const salaryMonth = e.target.value;
        let params = {
            company_id: ApiPath.companyID,
            employee_id: ApiPath.loginEmp,
            department_id: deptState === "" ? null : parseInt(deptState),
            salary_calculated_date: salaryMonth,
            language: ApiPath.lang
        };
        let obj = {
            package_name: 'hr',
            url: ApiPath.ReportForAttendanceExport,
            method: 'post',
            params,
            type: "blob",
        };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess([]);
            response.message && setError(response.message);
        } else {
            const isReturnFile = response.headers["content-disposition"];
            if (isReturnFile) {
                let fileName = response.headers["content-disposition"].split("filename=")[1];
                const modifyFileName = fileName.slice(1, fileName.length - 1);                     // Remove special character from response file name
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", modifyFileName);
                document.body.appendChild(link);
                link.click();
            };
        };
    };

    return (
        <CRow>
            <CCol xs={12}>
                <Loading start={loading} />
                <Message success={success} error={error} />
                <CCard className='report-for-attendance'>
                    <CCardHeader><h5 id='pageTitle'>{t('Report For Attendance')}</h5></CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol md={12} lg={4}>
                                <CLabel id="lblDepartment">{t('Department Name')}</CLabel>
                                <CSelect
                                    id="dropSelectDepartmentName"
                                    value={deptState}
                                    onChange={deptChange}
                                    autoFocus
                                    className="bamawl-select"
                                    custom
                                >
                                    <option value="">---{t("Select Department")}---</option>
                                    {departmentAPI.length > 0 &&
                                        departmentAPI.map((dept, index) => {
                                            return (
                                                <option key={index} value={dept.id}>
                                                    {(dept.department_name)}
                                                </option>
                                            );
                                        })
                                    }
                                </CSelect>
                            </CCol>
                        </CRow>
                        <br />
                        <ListAttendanceFile
                            listLink={listLink}
                            handleExportFile={handleExportFile}
                        />

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};
const ListAttendanceFile = (props) => {
    let {
        listLink,
        handleExportFile,
    } = props;
    return (
        listLink && listLink.length > 0 &&
        <div className="reportForPayroll">
            <div className='formLoad ' >
                {
                    listLink.map((element, index) => {
                        return (
                            <div key={index} className="boderColum p-2">
                                <Link
                                    component="button"
                                    value={element}
                                    onClick={handleExportFile}
                                    className="linkReportAttendanceCSV"
                                >
                                    {element}
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};
const Legacy = withTranslation()(LegacyWelcomeClass);
export default function ReportForAttendanceIndex() { return (<Legacy />) };

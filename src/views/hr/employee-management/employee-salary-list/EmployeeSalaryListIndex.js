import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import DepartmentNameExport from './DepartmentNameExport';
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Message from '../../../brycen-common/message/Message';

/**
 * EmployeeSalaryList
 * 
 * @author  c_dinh
 * @create_date  2021-07-27 (YYYY-MM-DD)
 */

function LegacyWelcomeClass({ t }) {
    const [error, setError] = useState([]);   // For Error Message
    const [success, setSuccess] = useState(""); // for success message
    const [departmentAPI, setDepartment] = useState([]);   // For Dept API
    const [loading, setLoading] = useState(false);
    const [deptState, setDeptState] = useState(""); // for show department name
    const [deptStateName, setDeptStateName] = useState(""); // for show department name

    /** Form Load */
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
        setLoading(true);
        loadViewPermission();  
        loadDepartment();
    }, []);

    /**
    * GET VIEW PERMISSION
    *
    * @author  v_hao
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadViewPermission = async () => {
        let params = {
            login_employee_id: ApiPath.loginEmp
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) { }
    };

    /**
    * Load Department
    *
    * @author  c_dinh
    * @create  2021-07-27 (YYYY-MM-DD)
    * @param
    * @return
    */
    const loadDepartment = async () => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setDepartment([]) : setDepartment(response.data.data);
    };

    let deptChange = (e) => {
        let index = e.target.selectedIndex;
        setDeptState(e.target.value);
        let optionElement = e.target.childNodes[index];
        setDeptStateName(optionElement.getAttribute('name'));
    }

    /**
    * Function Export Salary
    *
    * @author  v_hao
    * @create_date  2021-05-06
    * @param
    * @return
    */
    const exportSalary = async () => {
        let params = {
            "company_id": ApiPath.companyID, // login data from erp 
            "language": ApiPath.lang,
            "department_id": deptState,
            "department_name": deptStateName,
            "login_id": ApiPath.loginEmp,
        }
        setLoading(true);
        let obj = { package_name: 'hr', url: ApiPath.exportSalary, method: 'post', params, type: "blob" };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess([]);
            response.message && setError(response.message);
        } else {
            const isReturnFile = response.headers["content-disposition"];
            if (isReturnFile) {
                const [, filename] = response.headers['content-disposition'].split('filename=');
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                setError([]);
            }
            else {
                setError(response.message);
                setSuccess([]);
            }
        };
    }

    return (
        <CRow className="salary-list">
            <CCol xs="12">
                <Loading start={loading} />
                {/* ErrorMessage Start */}
                <Message success={success} error={error} />
                {/* ErrorMessage End */}
                <CCard>
                    <CCardHeader>
                        <h5 id="cardTitle">{t('Employee Salary List')}</h5>
                    </CCardHeader>

                    <CCardBody>
                        <DepartmentNameExport
                            departmentAPI={departmentAPI} deptState={deptState} deptChange={deptChange}
                            exportSalary={exportSalary}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function EmployeeSalaryListIndex() { return (<Welcome />) }

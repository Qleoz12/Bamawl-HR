import React ,{ useState, useEffect} from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import ReportForPayrollFormLoad from './ReportForPayrollFormLoad';
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';

function LegacyWelcomeClass({ t}) {

  const [mainTable, setMainTable]                        = useState([]);
  const [error, setError]                                = useState([]);
  const [success, setSuccess]                            = useState("");
  const [departmentAPI, setDepartmentAPI]                = useState([]);// For Dept API
  const [deptState, setDeptState]                        = useState("");// for show department name
  const [loading, setLoading]                            = useState(false);// For show loading

   /**
    * Page Load
    *
    * @author  nt_linh
    * @create  15/07/2021 (D/M/Y)
    * @param
    * @return
    */
  useEffect(() => {
    setLoading(true);
    loadDept();
    loadDate();
  }, []);

    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  nt_linh
    * @create  15/07/2021 (D/M/Y)
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
    * @author  nt_linh
    * @create  15/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadDept = async () => {
        let data = {
            package_name: 'erp',
            url: ApiPath.ERPGetAllDepartment,
            method: 'get',
          }
          let response = await ApiRequest(data);
          setLoading(false);
          response.flag === false ? setDepartmentAPI([]) : setDepartmentAPI(response.data.data);
    };

    let deptChange = (e) => {
        let idDept=e.target.value
        setDeptState(idDept);
    }

  /**
    * Load list payroll file to download
    *
    * @author  nt_linh
    * @create  15/07/2021 (D/M/Y)
    * @param
    * @return
    */
  const loadDate = async()=>{
    let params = {
        company_id: ApiPath.companyID,
        language: ApiPath.lang,
    };
    let obj = {
        package_name: 'hr',
        url: ApiPath.ReportForPayroll,
        method: 'get',
        params
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    response.flag === false ? setMainTable([]) : setMainTable(response.data.data.salary_month_date);
  };


  /* Start Export Function */
  const exportSalary = async (e) => {
    setError("");
    setLoading(true);
    const salaryMonth = e.target.value;
    let params = {
        company_id: ApiPath.companyID,
        employee_id: ApiPath.loginEmp,
        department_id: deptState === "" ? null : parseInt(deptState),
        salary_calculated_date: salaryMonth,
        language: ApiPath.lang,
    };
    let obj = {
        package_name: 'hr',
        url: ApiPath.ReportForPayrollExport,
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
}
/* End Export Function */

  return (
    <CRow>
        <CCol>
            <Loading start={loading} />
            <Message success={success} error={error} />
            <CCard className="reportForPayroll">
                <CCardHeader>
                    <h5 id='lblReportForPayroll'>{t('Report For Payroll')}</h5>
                </CCardHeader>
                <CCardBody>
                    <ReportForPayrollFormLoad
                        deptChange={deptChange}
                        deptState={deptState}
                        departmentAPI={departmentAPI}
                        mainTable={mainTable}
                        exportSalary={exportSalary}
                    />
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
  );
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function ReportForPayroll() { return ( <Welcome />) }

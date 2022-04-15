import React ,{ useState, useEffect, useCallback} from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CImg, CLabel} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { checkNullOrBlank } from '../../hr-common/common-validation/CommonValidation';
import message from '../../hr-common/common-message/CommonMessage'; 
import $ from 'jquery';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import TableData from './TableData';


/**
 * Main Component
 * @author Su Pyae Maung
 * @create 18/06/2021
 * @modify 
 * @returns output shown in web page
 */
function LegacyWelcomeClass({t}) {
    const history                                 = useHistory();   // For edit link
    const [error,setError]                        = useState([]);   // For Error Message
    const [success,setSuccess]                    = useState([]);   // For Success Message
    const [loading, setLoading]                   = useState(false);// For Loading
    const [rowCount , setRowCount]                = useState('');   // For row count
    const [content, setContent]                   = useState('');   // For Confirmation box
    const [type, setType]                         = useState('');   // For Confirmation box
    const [salaryDataTable, setSalaryDataTable]   = useState([]);   // For Salary Calculation3 table
    const [currencyArr,setCurrencyArr]            = useState([]);   // For Currency(MMK,USD,...) Array
    const [curLength,setCurLength]                = useState('');   // For Currency Length 1,2,3,...
    const [sessionData,setSessionData]            = useState({});   // For Save and Next Data From Calculate1
    const [ loginID, setLoginID ]                 = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
    const [ companyID, setCompanyID ]             = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP
    const [ positionRank, setPositionRank]        = useState(JSON.parse(localStorage.getItem("POSITION_RANK"))); // for session position rank
/** Form Load */
useEffect(() => {
    setLoading(true);
    formLoad();loadCurrency();
},[]);

/** Get all currency type(MMK, USD) from database */
const loadCurrency = async () => {
    let obj = { method: 'get', url: 'api/currencies' }
    let response = await ApiRequest(obj);setLoading(false);
    if(response.flag === false){
        setError(response.message); window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        let data = response.data.data;
        setCurrencyArr(data);
        setCurLength(data.length);
    }
}

/** Get All Salary Calculation Data From Database */
let formLoad = async() => {
    let data = JSON.parse(localStorage.getItem('CALCULATE2_DATA'));
    localStorage.removeItem('CALCULATE2_DATA');

    if(data !== null){
        setSessionData(data);
        let obj = {
            method:"post",
            url: "api/salary-calculate3/form-load",
            params: {
                "company_id": companyID,
                "employee_id": data.employee_id, // 20001
                "employee_code": data.employee_code, // EMP01
                "employee_name": data.employee_name, // Test
                "department_id": data.department_id, // 1
                "calculate_month": data.calculate_month, // "2021-05"
                "day_range": data.day_range, // First Day to Last Day in Month
                "login_id": loginID
            }
        }
        let response = await ApiRequest(obj); setLoading(false);
        if(response.flag == false){ 
            setSuccess([]);setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status == 'OK'){
                setSalaryDataTable(response.data.data);
            }else if(response.data.status == 'NG'){
                setSalaryDataTable([]);
                setSuccess([]);setError(response.data.message);
            }
        }
    }else{
        let customer_name = window.location.href.split("/")[3];
        history.push(`/${customer_name}/hr/salary-calculation/salary-calculation-step2`);
    }
}

/** Mail Send Function */
const mailSend =async() =>{
    setLoading(true);setSuccess([]);setError([]);
    let obj = {
        method:"post",
        url: "api/salary-calculate3/request-mail-send",
        params: {
            "company_id": companyID,
            "employee_id": sessionData.employee_id, // 20001
            "employee_code": sessionData.employee_code, // EMP01
            "employee_name": sessionData.employee_name, // Test
            "department_id": sessionData.department_id, // 1
            "calculate_month": sessionData.calculate_month, // "2021-05"
            "day_range": sessionData.day_range, // First Day to Last Day in Month
            "login_id": loginID
        }
    }
    let response = await ApiRequest(obj); setLoading(false);
    if(response.flag == false){ 
        setSuccess([]);setError(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(response.data.status == 'OK'){
            setSuccess([response.data.message]);setError([]);
        }else if(response.data.status == 'NG'){
            setSuccess([]);setError(response.data.message);
        }
    }
}

/** Download Excel Salary/Attendance */
const downloadExcel =async(e)=>{
    setLoading(true);setSuccess([]);setError([]);
    let downFlag = e;
    let obj = {
        method:"get",
        url: "api/salary-calculate3/download-excel",
        params: {
            "company_id": companyID,
            "employee_id": sessionData.employee_id,  
            "employee_code": sessionData.employee_code, 
            "employee_name": sessionData.employee_name,
            "department_id": sessionData.department_id, 
            "calculate_month": sessionData.calculate_month, 
            "day_range": sessionData.day_range, 
            "download_flag":downFlag, // for salary =0, attendance =1
            "login_id": loginID
        },
        type: 'blob',
    }
    let response = await ApiRequest(obj);setLoading(false);
    if(response.flag == false){ 
        setSuccess([]);setError(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        let getHeader = response.headers["content-disposition"];
        let tmpName  = getHeader.split('filename=')[1];
        let fileName = tmpName.replace(/['"]+/g, '');
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        if(downFlag == 0){setSuccess(["Salary Download Successfully!"]);}
        else if(downFlag == 1){setSuccess(["Attendance Download Successfully!"]);}
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }
}

return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading}/>
        <Message success={success} error={error} error2={[]} />
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Monthly Salary List')}</CLabel></h5></CCardHeader>
            <CCardBody>
                <TableData 
                    salaryDataTable={salaryDataTable} positionRank={positionRank}
                    currencyArr={currencyArr} curLength={curLength}
                    mailSend={mailSend} downloadExcel={downloadExcel}
                />
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
);
}
export default withTranslation()(LegacyWelcomeClass);


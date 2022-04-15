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
 * @create 02/06/2021
 * @modify 21/07/2021
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
    const [salaryDataTable, setSalaryDataTable]   = useState([]);   // For Salary Calculation2 table
    const [currencyArr,setCurrencyArr]            = useState([]);   // For Currency(MMK,USD,...) Array
    const [curLength,setCurLength]                = useState('');   // For Currency Length 1,2,3,...
    const [deductionArr,setDeductionArr]          = useState([]);   // For Deductionn Array
    const [dedLength,setDedLength]                = useState('');   // For Deduction Length 1,2,3,...
    const [deTotalLength,setDeTotalLength]        = useState('');   // For All Deduction Length 1,2,3,...
    const [allowanceArr,setAllowanceArr]          = useState([]);   // For Allowance Array
    const [allowLength,setAllowLength]            = useState('');   // For Allowance Length 1,2,3,...
    const [allowTotalLength,setAllowTotalLength]  = useState('');   // For All Allowance Length 1,2,3,...
    const [reqAllowArr,setReqAllowArr]            = useState([]);   // For Requested Allowance Array
    const [reqAllowLength,setReqAllowLength]      = useState('');   // For Requested Allowance Length 1,2,3,...
    const [reqTotalLength,setReqTotalLength]      = useState('');   // For All Requested Allowance Length 1,2,3,...
    const [leaveArr,setLeaveArr]                  = useState([]);   // For Leave Array
    const [leaveLength,setLeaveLength]            = useState('');   // For Leave Length 1,2,3,...
    const [levTotalLength,setLevTotalLength]      = useState('');   // For All Leave Length 1,2,3,...
    const [pitStatus,setPitStatus]                = useState(false);   // For Adjustment PIT Status
    const [pitValue,setPitValue]                  = useState("");      // For Adjustment PIT Value
    const [notPitStatus,setNotPitStatus]          = useState(false);   // For Adjustment NOT PIT Status
    const [notPitValue,setNotPitValue]            = useState("");      // For Adjustment NOT PIT Value
    const [curType,setCurType]                    = useState("");      // For Currency Type
    const [commentStatus,setCommentStatus]        = useState(false);   // For Comment Status
    const [commentValue,setCommentValue]          = useState("");   // For Comment Value
    const [editID,setEditID]                      = useState("");   // For Temp_Sal2_id
    const [sessionData, setSessionData]           = useState({});   // For Save and Next Data From Calculate1
    const [ loginID, setLoginID ]                 = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
    const [ companyID, setCompanyID ]             = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP

/** Form Load */
useEffect(() => {
    setLoading(true);
    formLoad();
},[]);

/** Get All Salary Calculation Data From Database */
let formLoad = useCallback( async() => {
    let data = JSON.parse(localStorage.getItem('SALARY1_DATA'));
    localStorage.removeItem('SALARY1_DATA');

    if(data !== null){
        setSessionData({
            employee_id: data.employee_id, employee_code: data.employee_code, employee_name: data.employee_name,
            calculate_month: data.calculate_month, exchange_rate: data.exchange_rate, 
            day_range: data.day_range, department_id: data.department_id
        })
        let obj = {
            method:"post",
            url: "api/salary-calculation-step2",
            params:{
                "company_id": companyID,
                "calculate_month": data.calculate_month, // "2021-05"
                "exchange_rate": data.exchange_rate, // 1500
                "department_id":data.department_id, // 1
                "day_range": data.day_range, // "26-25"
                "employee_id": data.employee_id, // 20001
                "login_id": loginID
            }
        }
        let response = await ApiRequest(obj); setLoading(false);
        if(response.flag == false){
            setSuccess([]);setError(response.message);
        }else{
            if(response.data.status == 'OK'){     
                let data = response.data.data;
                setSalaryDataTable(data.salCal2Data);

                setCurrencyArr(data.currencies);
                setCurLength(data.currencies.length);

                setDeductionArr(data.other_deductions_list);
                setDedLength(data.other_deductions_list.length);
                setDeTotalLength(data.other_deductions_list.length * data.currencies.length);

                setAllowanceArr(data.allowance_list)
                setAllowLength(data.allowance_list.length);
                setAllowTotalLength(data.allowance_list.length * data.currencies.length);

                setLeaveArr(data.leave_lists)
                setLeaveLength(data.leave_lists.length);
                setLevTotalLength(data.leave_lists.length * data.currencies.length);

                setReqAllowArr(data.other_allowance_list)
                setReqAllowLength(data.other_allowance_list.length);
                setReqTotalLength(data.other_allowance_list.length * data.currencies.length);
            }
            else if(response.data.status == 'NG'){
                setSalaryDataTable([]);
                setSuccess([]);setError(response.data.message);setLoading(false);
            }
        }// end API response condition
    }else{ // end data != null condition
        let customer_name = window.location.href.split("/")[3];
        history.push(`/${customer_name}/hr/salary-calculation/salary-calculation-step1`);
    }  
});

/** Save and Next Function */
const saveAndNext=async()=>{
    let data = {
       
            method:"post",
            url: "api/salary-calculation-step2/save",
            params:{
                "login_id": loginID,
                "company_id": companyID,
                "calculate_month": sessionData.calculate_month, // "2021-05"
                "exchange_rate": sessionData.exchange_rate, // 1500
                "department_id":sessionData.department_id, // 1
                "day_range": sessionData.day_range, // "26-25"
                "employee_id": sessionData.employee_id, // 20001
            }
        
    }
    let response = await ApiRequest(data); setLoading(false);
    if(response.flag == false){
        setSuccess([]);setError(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(response.data.status == 'OK'){
            localStorage.setItem('CALCULATE2_DATA', JSON.stringify(sessionData));
            let customer_name = window.location.href.split("/")[3];
            history.push(`/${customer_name}/hr/salary-calculation/salary-calculation-step3`);
        }else{
            setError([response.data.message]);
        }
    }
}

/** Excel Download */
const exportFile = async()=>{
    setLoading(true);setSuccess([]);setError([]);
    let obj = {
        method:"post",
        url: "api/salary-calculation-step2/export",
        params: {
            "login_id": loginID,
            "company_id": companyID,
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
        setSuccess(["Successfully Downloaded!"]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }
}

/** Amount Function */
const changeAmt = async(e)=>{    
    
}

/** Comment Function */
const changeCmt = async(e,emp_id,temp_id)=>{    
    setLoading(true);
    let obj = { url: 'api/salary-calculation-step2/adjust', method: 'post',
        params:{
            "login_id":loginID, //loginID
            "edit_id":temp_id,
            "adjust_comment_status":true,
            "adjust_comment":e.target.value
        }
    }
    let response = await ApiRequest(obj); setLoading(false);
    if(response.flag === false){
        setError(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(response.data.status === 'OK'){
            setSuccess([]);setError([]);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else if(response.data.status === 'NG'){
            setSuccess([]);setError([]);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }
    }
}

/** Adjustment Pit Function */
const changeAdjPIT = async(e,emp_id,temp_id,cur_id)=>{
    setLoading(true);
    let obj = { url: 'api/salary-calculation-step2/adjust', method: 'post',
        params:{
            "login_id":loginID, //loginID
            "edit_id":temp_id,
            "pit_adjust_status":true,
            "amount": e.target.value,
            "currency_id":cur_id
        }
    }
    let response = await ApiRequest(obj); setLoading(false);
    if(response.flag === false){
        setError(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(response.data.status === 'OK'){
            setSuccess([]);setError([]);
            let obj = response.data.data.salCal2Data;
            let data = salaryDataTable.map((main,i)=>{
                if(main.employee_id == emp_id){
                    main.income_tax = obj.income_tax;
                    main.income_tax_currency_id = obj.income_tax_currency_id;
                    main.net_salary_1 = obj.net_salary_1;
                    main.net_salary_2 = obj.net_salary_2;
                    main.total_salary_1 = obj.total_salary_1;
                    main.total_salary_2 = obj.total_salary_2;
                    return main;
                }
                return main;
            })
            setSalaryDataTable(data);
        }else if(response.data.status === 'NG'){
            setSuccess([]);setError([response.data.message]);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }
    }

}

/** Adjustment Not Pit Function */
const changeAdjNotPIT = async(e,emp_id,temp_id,cur_id) =>{
    setLoading(true);
    let obj = { url: 'api/salary-calculation-step2/adjust', method: 'post',
        params:{
            "login_id":loginID, //loginID
            "edit_id":temp_id,
            "pitnot_adjust_status":true,
            "amount": e.target.value,
            "currency_id":cur_id
        }
    }
    let response = await ApiRequest(obj); setLoading(false);
    if(response.flag === false){
        setError(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(response.data.status === 'OK'){
            setSuccess([]);setError([]);
            let obj = response.data.data.salCal2Data;
            let data = salaryDataTable.map((main,i)=>{
                if(main.employee_id == emp_id){
                    main.net_salary_1 = obj.net_salary_1;
                    main.net_salary_2 = obj.net_salary_2;
                    return main;
                }
                return main;
            })
            setSalaryDataTable(data);
        }else if(response.data.status === 'NG'){
            setSuccess([]);setError([response.data.message]);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }
    }
}

return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading}/>
        <Message success={success} error={error} error2={[]} />
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Calculate Salary Step2')}</CLabel></h5></CCardHeader>
            <CCardBody>
                <TableData 
                    salaryDataTable={salaryDataTable}
                    currencyArr={currencyArr} curLength={curLength}
                    deductionArr={deductionArr} deTotalLength={deTotalLength} dedLength={dedLength} 
                    allowanceArr={allowanceArr} allowTotalLength={allowTotalLength} allowLength={allowLength} 
                    leaveArr={leaveArr} levTotalLength={levTotalLength} leaveLength={leaveLength} 
                    reqAllowArr={reqAllowArr} reqTotalLength={reqTotalLength} reqAllowLength={reqAllowLength}
                    saveAndNext={saveAndNext} exportFile={exportFile} changeCmt={changeCmt}
                    changeAdjNotPIT={changeAdjNotPIT} changeAdjPIT={changeAdjPIT}
                />
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
);
}
export default withTranslation()(LegacyWelcomeClass);


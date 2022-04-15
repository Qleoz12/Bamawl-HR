import React, { lazy,useState,useEffect,useCallback } from 'react';
import { checkNullOrBlank, onlyAllowDecimalInteger } from '../../hr-common/common-validation/CommonValidation'
import {CButton, CButtonGroup,CCard, CCardBody, CCardHeader, CCol, CRow, CImg, CLabel, CFormGroup, CForm, CInputRadio, CInput, CFormText, CInputCheckbox,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'; 
import message from '../../hr-common/common-message/CommonMessage';
import Moment from 'moment';
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import { MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker, useStaticState } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import $ from 'jquery'
import { cilAlignCenter } from '@coreui/icons';
import api from '../../../../service/API';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Currency from '../../hr-common/currency/Currency';
import Method from '../../hr-common/method/Method';
import PayrollCalculationMethod from './PayrollCalculationMethod';
import SsbCalculationMethod from './SsbCalculationMethod';
import PerfectAttendanceSetup from './PerfectAttendanceSetup';
import SalaryCalculateDayRange from './SalaryCalculateDayRange';
import FiscalYear from './FiscalYear';
import SetupRules from './SetupRules';
import ApproverCheckerSetting from './ApproverCheckerSetting';
import Message from '../../../brycen-common/message/Message';
import SaveData from './SaveData';
import Loading from '../../../brycen-common/loading/Loading';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import { SelectCurrency } from '../../hr-common/select-currency/SelectCurrency';
import CommonAlert from '../../hr-common/common-alert/CommonAlert';

/**
 * Main Component
 * @author Su Pyae Maung
 * @create /04/2021
 * @modify 
 * @returns output shown in web page
 */
function LegacyWelcomeClass ({t, i18n}) {
    const [error,setError]                          = useState([]); // For Error Message
    const [error2,setError2]                        = useState([]); // For Error2 Message
    const [success,setSuccess]                      = useState([]); // For Success Message
    const [loading, setLoading]                     = useState(false); // For Loading

    const [dayShow,setDayShow]                      = useState(true); // use for show/hide Salary Calculate Day Range
    const [dayrangeSwitch, setDayRangeSwitch]       = useState({isChecked: false}); // for Day Range 
    const [firstLast, setFirstLast]                 = useState(""); // for overwrite FirstLast =1 or Manual =2
    const [showCalendar,setShowCalendar]            = useState(false); // use for show/hide manual calendar 
    const [selectedFromDate, setSelectedFromDate]   = useState(null); //for Fisrt Day or Manual Start Day 
    const [startDate, setStartDate]                 = useState(null);  // for overwrite
    const [selectedToDate, setSelectedToDate]       = useState(null);//for Last Day or Manual End Day
    const [endDate, setEndDate]                     = useState(null);  // for overwrite
    const [payDate, setPayDate]                     = useState(null);//for Bank Pay Date
    const [salPayDate, setSalPayDate]               = useState(null); // for overwrite
    const [basicsalarySwitch, setBasicSalarySwitch] = useState({isChecked: false}); // for Creation of Basic Salary Exp =1(false) or Manual =2(true)
    const [basicPay, setBasicPay]                   = useState(""); // for overwrite
    const [forFirstLast, setForFirstLast]           = useState("firstlast");
    const [forBasicSalary, setForBasicSalary]       = useState("basic");

    const [currencyData,setCurrencyData]            = useState([]); // use for Currency Type from database
    const [payrollCalMethod,setPayrollCalMethod]    = useState([]);  // use for Payroll Calculate Method from database
    const [payrollShow, setPayrollShow]             = useState(false); //use for show/hide Payroll Calculation Method
    const [payRoll ,setPayRoll ]                    = useState(""); // use for Payroll Calculate All =1 or Choose Emp =2
    const [payrollType ,setPayrollType ]            = useState([]); // use for Payroll MMK or USD 
    const [forPayroll, setForPayroll]               = useState("payroll"); // for Payroll Currency
    const [payrollMethod ,setPayrollMethod ]        = useState(""); // use for Payroll Method
    const [payrollTextboxOne, setPayrollTextboxOne] = useState("");
    const [payrollTextboxTwo, setPayrollTextboxTwo] = useState("");

    const [currencySsb,setCurrencySsb]              = useState([]); // use for Currency Type from database
    const [ssbShow, setSsbShow]                     = useState(false); //use for show/hide SSB Paid or Not
    const [ssbpayShow ,setSsbPayShow ]              = useState(false); // use for show/hide SSB pay All or Choose Emp
    const [ssbpaidSwitch, setSSBPaidSwitch]         = useState({isChecked: false}); // for SSB Paid =1(true) or Not Paid =2(false)
    const [ssbPay ,setSsbPay ]                      = useState(""); // use for SSB pay All =1 or Choose Emp =2
    const [ssbpayType ,setSsbpayType ]              = useState(""); // use for SSB MMK or USD
    const [ssbBased ,setSsbBased ]                  = useState(""); // use for SSB Based on Total =1, Basic =2, Fixed =3
    const [showFixedamt,setShowFixedamt]            = useState(false); // use for show/hide SSB fixed amount
    const [fixedAmount ,setFixedAmount ]            = useState(0); // use for SSB fixed amount
    const [ssbpaidmethodSwitch, setSSBPaidMethodSwitch] = useState({isChecked: false}); // for SSB Paid Method 5% 0% or 3% 2%
    const [forSsbPaid, setForSsbPaid]               = useState("ssbmethod");
    const [ssbOption ,setSsbOption ]                = useState(""); // for overwrite
    const [ssbMethodOption ,setSsbMethodOption ]    = useState(""); // for overwrite

    const [currencyPerfect,setCurrencyPerfect]      = useState([]); // use for Currency Type from database
    const [perfectShow, setPerfectShow]             = useState(false); // use for show/hide Perfect Attendance Paid or Not
    const [perfectPayShow, setPerfectPayShow]       = useState(false); // use for show/hide Perfect Attendance All or Choose Emp
    const [perfectpaidSwitch, setPerfectPaidSwitch] = useState({isChecked: false}); // for Perfect Paid =1 or Not Paid =2
    const [perfectPay ,setPerfectPay ]              = useState(""); // use for Perfect Attendance pay All =1 or Choose Emp =2
    const [perfectType ,setPerfectType ]            = useState(""); // use for Perfect Attendance MMK or USD
    const [perfectAmount ,setPerfectAmount ]        = useState(0); // use for Perfect Attendance Amount
    const [perfectOption ,setPerfectOption ]        = useState(""); // for overwrite

    const [chooseBank,setChooseBank]                = useState([]); // use for Bank Name from database
    const [startMonth, setStartMonth]               = useState(null); //use for Fiscal Year Start Month
    const [fromMonth, setFromMonth]                 = useState(null); // for overwrite
    const [endMonth, setEndMonth]                   = useState(null); //use for Fiscal Year End Month
    const [toMonth, setToMonth]                     = useState(null); // for overwrite
    const [leaveruleSwitch, setLeaveRuleSwitch]     = useState({isChecked: false}); // for leave rule 1=system, 2=user
    const [leaveOption ,setLeaveOption]             = useState("");  // for overwrite
    const [bankName,setBankName]                    = useState([]); // use for choose Bank

    const [leavedaySwitch, setLeaveDaySwitch]       = useState({isChecked: false}); // for caluclate leave days 1=yes, 0=no
    const [overtimeamtSwitch, setOvertimeAmtSwitch] = useState({isChecked: false}); // for calculate ot amount 1=yes, 0=no
    const [unpaidleaveSwitch, setUnpaidLeaveSwitch] = useState({isChecked: false}); // for regard as unpaid leave 1=yes, 0=no
    const [announcementSwitch, setAnnouncementSwitch] = useState({isChecked: false}); // for announcement 1=yes,0=no
    const [maxrowCount ,setMaxRowCount ]            = useState(0); // use for total rows count in dashboard
    const [lastLevOption ,setLastLevOption ]        = useState(""); // for overwrite
    const [lastOtOption ,setLastOtOption ]          = useState(""); // for overwrite
    const [unpaidLevOption ,setUnpaidLevOption ]    = useState(""); // for overwrite
    const [announOption ,setAnnounOption]           = useState(""); // for overwrite
    
    const [approverSetting ,setApproverSetting ]    = useState(""); // use for Approver Setting
    const [showAppChk,setShowAppChk]                = useState(false); // use for show/hide Approver Checker
    const [maxApprover ,setMaxApprover ]            = useState(0); // use for Maximum Approver
    const [maxChecker ,setMaxChecker ]              = useState(0); // use for Maximun Checker

    const [content, setContent]                     = useState('');   // For Confirmation box
    const [type, setType]                           = useState('');   // For Confirmation box
    const [show, setShow]                           = useState(false);// For show/hide confirmation box
    const [ alert, setAlert ]                       = useState(false); // for common alert
    const [ alertContent, setAlertContent ]         = useState(""); // for alert content
    const [ continues, setContinues ]               = useState(true); // for alert continues
    const [formLoadData,setFormLoadData]            = useState('');
    const [ loginID, setLoginID ]                   = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
    const [ departmentID, setDepartmentID ]         = useState(localStorage.getItem('DEPARTMENT_ID')); // for session department id from ERP
    const [ positionID, setPositionID ]             = useState(localStorage.getItem('POSITION_ID')); // for session position id from ERP
    const [ companyID, setCompanyID ]               = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP

/** Start Form Load */
    useEffect(() => {
        loadPayrollData();
        setLoading(true);loadPayrollMethod();
        getCurrency(); getBanks();
    }, []);
/** End Form Load */

/** Get Payroll Rule Setup Form Data */
const loadPayrollData = async() => {
    let allData = { method:"get",url:"api/payroll-calculate-rule", params:{"login_id":loginID} }
    let response = await ApiRequest(allData);setLoading(false);
    if(response.flag == false){
        setSuccess([]);setError(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(response.data.status === 'OK'){
            let data = response.data.data;
            if(data.already_saved === true){  // save data exist
                if(data.end_offdays_month == "2"){
                    setDayRangeSwitch( { isChecked: !dayrangeSwitch.isChecked } );
                    setShowCalendar(true);
                }
                setSelectedFromDate(data.salary_calculation_day_start);
                setSelectedToDate(data.salary_calculation_day_end);
                setPayDate(data.salary_pay_date);
                if(data.basic_salary_create == "2"){
                    setBasicSalarySwitch( { isChecked: !basicsalarySwitch.isChecked } );
                }
                setPayRoll(data.payroll_calculate_option);
                if(data.payroll_calculate_option == "1"){
                    $(".payall").addClass('btnGroup1');
                    setPayrollShow(true);
                }else{
                    $(".paychoose").addClass('btnGroup1');
                    setPayrollShow(false);
                }
                setPayrollMethod(data.calculatebasedonmethods.calculate_method_id);
                setPayrollTextboxOne(data.calculatebasedonmethods.f_divisor);
                setPayrollTextboxTwo(data.calculatebasedonmethods.f_divisor);
               
                let cur_arr = [];
                if(data.payroll_currency.length >0 ){
                    data.payroll_currency.forEach(id =>{
                        cur_arr.push(id.currency_id); 
                    })
                }setPayrollType(cur_arr);
                loadCurrency(cur_arr);
                setSsbPay(data.ssb_calculate_option);
                if(data.ssb_paid == "1"){
                    setSsbShow(true);
                    setSSBPaidSwitch( { isChecked: !ssbpaidSwitch.isChecked } );
                }
                if((data.ssb_paid == "1") && (data.ssb_calculate_option == "1" )){
                    setSsbShow(true);setSsbPayShow(true);
                    setSSBPaidSwitch( { isChecked: !ssbpaidSwitch.isChecked } );
                    $(".ssball").addClass('btnGroup2');
                }
                if(data.ssb_calculate_option == "2"){
                    $(".ssbchoose").addClass('btnGroup2');
                }
                if(data.ssb_calculate_option == "1"){
                    $(".ssball").addClass('btnGroup2');
                }
                setSsbpayType(data.ssb_currency);
                setSsbBased(data.ssb_based_on);
                if(data.ssb_based_on == "1"){
                    $(".ssbtotal").addClass('btnGroup2');
                    setShowFixedamt(false);
                }
                if(data.ssb_based_on == "2"){
                    $(".ssbbasic").addClass('btnGroup2');
                    setShowFixedamt(false);
                }
                if(data.ssb_based_on == "3"){
                    $(".ssbfixed").addClass('btnGroup2');
                    setShowFixedamt(true);
                }
                setFixedAmount(data.ssb_fixed_amount);
                if(data.employee_ssb_rate == "2"){
                    setSSBPaidMethodSwitch( { isChecked: !ssbpaidmethodSwitch.isChecked } );
                }
                setPerfectPay(data.perfect_calculate_option);
                if(data.perfect_attendance_flag == "1"){
                    setPerfectShow(true);
                    setPerfectPaidSwitch( { isChecked: !perfectpaidSwitch.isChecked } );
                }
                if((data.perfect_attendance_flag == "1") && (data.perfect_calculate_option == "1" )){
                    setPerfectShow(true);setPerfectPayShow(true);
                    setPerfectPaidSwitch( { isChecked: !perfectpaidSwitch.isChecked } );
                    $(".perfectall").addClass('btnGroup3');
                }
                if(data.perfect_calculate_option == "2"){
                    $(".perfectchoose").addClass('btnGroup3');
                }if(data.perfect_calculate_option == "1"){
                    $(".perfectall").addClass('btnGroup3');
                }
                setPerfectType(data.perfect_currency);
                setPerfectAmount(data.perfect_attendance_amount_for_all);
                setStartMonth(data.fiscal_year_start_month);
                setEndMonth(data.fiscal_year_end_month);
                if(data.leave_rules == "2"){
                    setLeaveRuleSwitch( { isChecked: !leaveruleSwitch.isChecked } );
                }
                let arr = [];
                if(data.bank_id.length >0 ){
                    data.bank_id.forEach(id =>{
                        arr.push(id); 
                    })
                }setBankName(arr);
                loadBank(arr); 
                if(data.last_month_leave == "1"){
                    setLeaveDaySwitch( { isChecked: !leavedaySwitch.isChecked } );
                }
                if(data.last_month_ot == "1"){
                    setOvertimeAmtSwitch( { isChecked: !overtimeamtSwitch.isChecked } );
                }
                if(data.regard_as_unpaid == "1"){
                    setUnpaidLeaveSwitch( { isChecked: !unpaidleaveSwitch.isChecked } );
                }
                if(data.use_announcement_flag == "1"){
                    setAnnouncementSwitch( { isChecked: !announcementSwitch.isChecked } );
                }
                setMaxRowCount(data.no_of_rows_in_dashboard);
                if(data.approver_setting == "2"){
                    setApproverSetting(data.approver_setting); setShowAppChk(true);
                }else{
                    setApproverSetting(data.approver_setting); setShowAppChk(false);
                }
                setMaxApprover(data.max_approver);
                setMaxChecker(data.max_checker);
            }
        }else{
            setSuccess([]);setError(response.data.message);
        }
    }
}

/** Get all Payroll Method from database */
const loadPayrollMethod = useCallback(async() => {
    let payrollmethod = { method:"get", url:"api/calculate-methods/payroll"    }
    let response = await ApiRequest(payrollmethod);setLoading(false);
    if(response.flag == false){ 
        setSuccess([]);setError(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(response.data.status === 'OK'){
            setPayrollCalMethod(response.data.data);
        }else{
            setPayrollCalMethod([]);
            setSuccess([]);setError(response.data.message);
        }
    }
}, []);

/** GET Currency(MMK,USD) From Database (for formload) */
const getCurrency = async()=>{
    let obj = { method: 'get', url: 'api/currencies' }
    let response = await ApiRequest(obj);setLoading(false);
    if(response.flag === false){
        setError(response.message); window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        setCurrencyData(response.data.data);
        setCurrencySsb(response.data.data);
        setCurrencyPerfect(response.data.data);
    }
}
/** Get currency from database (already saved) */
const loadCurrency = async (id) => {
    let obj = { method: 'get', url: 'api/currencies' }
    let response = await ApiRequest(obj);setLoading(false);
    if(response.flag === false){
        setError(response.message); window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        let cur_array = [];
        response.data.data.forEach(a=>{
            cur_array.push({
                currency_desc: a.currency_desc,
                currency_name: a.currency_name,
                id: a.id,
                main_flag: a.main_flag,
                is_checked: false
            })
        })

        id.forEach(id=>{
            cur_array.forEach(res=>{
                if(id == res.id){
                    res.is_checked = true
                }
            })
        })
        setCurrencyData(cur_array);
        setCurrencySsb(response.data.data);
        setCurrencyPerfect(response.data.data);
    }
}

/** GET Banks(CB, KBZ) from Database (for formload)*/
const getBanks = async() =>{
    let bank = { method:"get",url:"api/payment-name-register"}
    let response = await ApiRequest(bank);setLoading(false);
    if(response.flag == false){ 
        setSuccess([]);setError([]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(response.data.status === 'OK'){
            let array = [];
            response.data.data.forEach(a=>{
                array.push({
                    id: a.id,
                    bank_name: a.bank_name,
                    is_checked: false
                })
            })
           setChooseBank(array);
        }else{setChooseBank([]);setSuccess([]);setError(response.data.message);}
    }
}
/** Get Banks form database (already saved) */
const loadBank = async(id) => {
    let bank = { method:"get",url:"api/payment-name-register"}
    let response = await ApiRequest(bank);setLoading(false);
    if(response.flag == false){ 
        setSuccess([]);setError([]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(response.data.status === 'OK'){
            let array = [];
            response.data.data.forEach(a=>{
                array.push({
                    id: a.id,
                    bank_name: a.bank_name,
                    is_checked: false
                })
            })

            id.forEach(id=>{
                array.forEach(res=>{
                    if(id == res.id){
                        res.is_checked = true
                    }
                })
            })
           setChooseBank(array);
        }else{setChooseBank([]);setSuccess([]);setError(response.data.message);}
    }
}
    
/** Start Salary Calculate Day Range Function */
let dayrangeChecked = () => {setDayRangeSwitch( { isChecked: !dayrangeSwitch.isChecked } );
    if(dayrangeSwitch.isChecked){setShowCalendar(false);} else{setShowCalendar(true);}
}
let handleFromDateChange = (e) => {setSelectedFromDate(e);}
let handleToDateChange = (e) => {setSelectedToDate(e);}
let payDateChange = (e) => {setPayDate(e);}
let basicsalaryChecked = ()=>{setBasicSalarySwitch( { isChecked: !basicsalarySwitch.isChecked } );}
/** End Salary Calculate Day Range Function */

/** Start Payroll Setup Function */
let payRollAllChange=(e)=>{ 
    $(".payall").addClass('btnGroup1');$(".paychoose").removeClass('btnGroup1');
    setPayRoll(e.target.value);setPayrollShow(true);
}
let payRollChooseChange=(e)=>{
    $(".paychoose").addClass('btnGroup1');$(".payall").removeClass('btnGroup1');
    // setPayrollType([]); setPayrollMethod(""); setPayrollTextboxOne(""); setPayrollTextboxTwo("");
    setPayRoll(e.target.value);setPayrollShow(false);
}
let payrollTypeChange=(e)=>{
    let value = e.target.value;
    let checked = e.target.checked;
    let data;
    let id_list  = [];
    data = currencyData.map(payment =>payment.id === parseInt(value) ? { ...payment, is_checked: checked } : payment)
    for(let i=0; i<data.length; i++){
        if(data[i].is_checked === true){id_list.push(data[i].id);}
    }
    setPayrollType(id_list); setCurrencyData(data);
}
let payrollMethodChange=(e)=>{setPayrollMethod(e.target.value);}
let textboxOneValue=(e)=>{setPayrollTextboxOne(e.target.value);}
let textboxTwoValue=(e)=>{setPayrollTextboxTwo(e.target.value);}
/** End Payroll Setup Function */

/** Start SSB Setup Function */
const ssbpaidChecked = ()=>{ setSSBPaidSwitch( { isChecked: !ssbpaidSwitch.isChecked } );
    if(ssbpaidSwitch.isChecked){
        setSsbShow(false);
    }else{setSsbShow(true);}
}   
const ssbPayAllChange= (e)=>{
    $(".ssball").addClass('btnGroup2');$(".ssbchoose").removeClass('btnGroup2');
    setSsbPay(e.target.value);setSsbPayShow(true);
}
const ssbPayChooseChange=(e)=>{
    $(".ssbchoose").addClass('btnGroup2');$(".ssball").removeClass('btnGroup2');
    setSsbPay(e.target.value);setSsbPayShow(false);
}
const ssbpayTypeChange=(e)=>{setSsbpayType(e.target.value);}
const ssbBasicChange=(e)=>{
    $(".ssbbasic").addClass('btnGroup2');$(".ssbtotal").removeClass('btnGroup2');$(".ssbfixed").removeClass('btnGroup2');
    setSsbBased(e.target.value);setShowFixedamt(false);
}
const ssbTotalChange=(e)=>{
    $(".ssbtotal").addClass('btnGroup2');$(".ssbbasic").removeClass('btnGroup2');$(".ssbfixed").removeClass('btnGroup2');
    setSsbBased(e.target.value);setShowFixedamt(false);
}
const ssbFixedChange=(e)=>{
    $(".ssbfixed").addClass('btnGroup2');$(".ssbbasic").removeClass('btnGroup2');$(".ssbtotal").removeClass('btnGroup2');
    setSsbBased(e.target.value);setShowFixedamt(true);
}
const fixedAmountValue=(e)=>{setFixedAmount(e.target.value);}
const ssbpaidmethodChecked = ()=>{setSSBPaidMethodSwitch({isChecked: !ssbpaidmethodSwitch.isChecked} )}
/** End SSB Setup Function */

/** Start Perfect Setup Function */
const perfectpaidChecked = ()=>{
    setPerfectPaidSwitch( { isChecked: !perfectpaidSwitch.isChecked } );
    if(perfectpaidSwitch.isChecked){ // for perfect paid
        setPerfectShow(false);
    }else{ // for perfect not paid
        setPerfectShow(true);
    }
}
const perfectPayAllChange=(e)=>{
    $(".perfectall").addClass('btnGroup3');
    $(".perfectchoose").removeClass('btnGroup3');
    setPerfectPay(e.target.value);
    setPerfectPayShow(true);
}
const perfectPayChooseChange=(e)=>{
    $(".perfectchoose").addClass('btnGroup3');
    $(".perfectall").removeClass('btnGroup3');
    setPerfectPay(e.target.value);
    setPerfectPayShow(false);
}
const perfectTypeChange=(e)=>{setPerfectType(e.target.value);}
const perfectAmountValue=(e)=>{setPerfectAmount(e.target.value);}
/** End Perfect Setup Function */

/** Start Fiscal Year Leave Rule and Choose Bank */
let startMonthChange = (e) => {setStartMonth(e);};
let removeStartMonth =()=>{setStartMonth(null);}
let endMonthChange = (e) => {setEndMonth(e);};
let removeEndMonth =()=>{setEndMonth(null);}
let leaveruleChecked = ()=>{setLeaveRuleSwitch( { isChecked: !leaveruleSwitch.isChecked } );}

let selectBankChange=(e)=>{
    let value = e.target.value;
    let checked = e.target.checked;
    let id_list  = [];
    let banks = chooseBank.map(bank =>
        bank.id === parseInt(value) ? { ...bank, is_checked: checked } : bank
    )
    for(let i=0; i<banks.length; i++){
        if(banks[i].is_checked === true){
            id_list.push(banks[i].id);
        }
    }
    setBankName(id_list);
    setChooseBank(banks);
}
/** End Fiscal Year Leave Rule and Choose Bank */

/** Start Setup Rules */
let leavedayChecked = ()=>{setLeaveDaySwitch( { isChecked: !leavedaySwitch.isChecked } );}
let overtimeamtChecked = ()=>{setOvertimeAmtSwitch( { isChecked: !overtimeamtSwitch.isChecked } );}
let unpaidleaveChecked = ()=>{setUnpaidLeaveSwitch( { isChecked: !unpaidleaveSwitch.isChecked } );}
let announcementChecked = ()=>{setAnnouncementSwitch( { isChecked: !announcementSwitch.isChecked } );}
let plusRows=()=>{
    let data = parseInt(maxrowCount);
    setMaxRowCount(data+1);
}
let minusRows=()=>{setMaxRowCount(maxrowCount-1);
    if(maxrowCount <= 0){setMaxRowCount(0);}
}
/** End Setup Rules */

/** Start Approver Setting */
let approverSettingChange=(e)=>{setApproverSetting(e.target.value);}
let plusApprover=()=>{
    let data = parseInt(maxApprover);
    setMaxApprover(data+1);
}
let minusApprover=()=>{setMaxApprover(maxApprover-1);
    if(maxApprover <= 0){setMaxApprover(0);}
}
let plusChecker=()=>{
    let data = parseInt(maxChecker);
    setMaxChecker(data+1);
}
let minusChecker=()=>{setMaxChecker(maxChecker-1);
    if(maxChecker <= 0){setMaxChecker(0);}
}
/** End Approver Setting */

/** Start Save Function */
let saveAllData=()=>{
    setShow(!show);setContent('Are you sure want to save?');setType('save');
}
let saveOK=async()=> {
    setShow(!show);
    let errMsg = [];
    let firstLastManual =""; // firstlast =1, manual =2
    let fromDate = 25;let toDate = 26;let paymentDate = null;
    let basicSalary = ""; // exp =1, manual =2

    let ssbYesNo = "";  // paid =1, not paid =2
    let ssbMethod = ""; // 5% and 0% =1, 3% and 2% =2

    let perfectYesNo = "";  // paid =1, not paid =2

    let firstMonth = 4;let lastMonth  = 3;let leaveRule  = "";
    let lastMonthLeave = "";let lastMonthOT  = "";let unpaidLeave = "";let announcementFlag = "";

    /** GET SALARY CALCULATE DAY RANGE VALUES */
    if(dayrangeSwitch.isChecked == false){
        firstLastManual = 1;setFirstLast(1);
    }else{
        firstLastManual = 2;setFirstLast(2);
        if(!checkNullOrBlank(selectedFromDate)){
            let str = t(message.JSE001).replace('%s',t('FromDate'));errMsg.push(str);
        }else{
            fromDate = Moment(selectedFromDate).format('DD');
            setStartDate(Moment(selectedFromDate).format('DD'));
        }
        if(!checkNullOrBlank(selectedToDate)){
            let str = t(message.JSE001).replace('%s',t('ToDate'));errMsg.push(str);
        }else{
            toDate = Moment(selectedToDate).format('DD');
            setEndDate(Moment(selectedToDate).format('DD'));
        }
    }
    paymentDate = Moment(payDate).format('DD');setSalPayDate(Moment(payDate).format('DD'));

    if(basicsalarySwitch.isChecked == false){
        basicSalary = 1; setBasicPay(1);
    }else{
        basicSalary = 2; setBasicPay(2);
    }

    /** GET PAYROLL VALUES */
    if(checkNullOrBlank(payRoll)){  
        if(payRoll == 1){ // All Employee
            if(!checkNullOrBlank(payrollType)){
                let str = t(message.JSE001).replace('%s',t('Payroll Payment Type'));errMsg.push(str); 
            }
            if(!checkNullOrBlank(payrollMethod)){
                let str = t(message.JSE001).replace('%s',t('Payroll Method'));errMsg.push(str);
            }
            if(payrollMethod == 2){
                if(!checkNullOrBlank(payrollTextboxOne)){
                    let str = t(message.JSE005).replace('%s',t('Payroll Division By'));errMsg.push(str); 
                }
                if(checkNullOrBlank(payrollTextboxOne)){
                    if(!onlyAllowDecimalInteger(payrollTextboxOne)){
                        let str = t(message.JSE005).replace('%s',t('Payroll Divisor Number Only'));errMsg.push(str); 
                    }
                }
            }
            if(payrollMethod == 8){
                if(!checkNullOrBlank(payrollTextboxTwo)){
                    let str = t(message.JSE005).replace('%s',t('Payroll Multiply By'));errMsg.push(str); 
                }
                if(checkNullOrBlank(payrollTextboxTwo)){
                    if(!onlyAllowDecimalInteger(payrollTextboxTwo)){
                        let str = t(message.JSE005).replace('%s',t('Payroll Multiplier Number Only'));errMsg.push(str); 
                    }
                }
            }
        }
    }

    /** GET SSB VALUES */
    if(ssbpaidSwitch.isChecked == false){
        ssbYesNo = 2; setSsbOption(2);
    }else{
        ssbYesNo = 1; setSsbOption(1);
        if(checkNullOrBlank(ssbPay)){
            if(ssbPay == 1){
                if(!checkNullOrBlank(ssbBased)){
                    let str = t(message.JSE001).replace('%s',t('SSB Based On'));errMsg.push(str); 
                }
                if(ssbBased == 3){
                    if(!checkNullOrBlank(ssbpayType)){
                        let str = t(message.JSE001).replace('%s',t('SSB Payment Type'));errMsg.push(str); 
                    }
                    if(!onlyAllowDecimalInteger(fixedAmount)){
                        let str = t(message.JSE005).replace('%s',t('SSB Paid Fixed Amount Number Only'));errMsg.push(str); 
                    }
                }
            }
        }
    }
    if(ssbpaidmethodSwitch.isChecked == false){
        ssbMethod = 1; setSsbMethodOption(1);
    }else{ 
        ssbMethod = 2; setSsbMethodOption(2);
    }

    /** GET PERFECT VALUES */
    if(perfectpaidSwitch.isChecked == false){ 
        perfectYesNo = 2; setPerfectOption(2);
    }else{
        perfectYesNo = 1; setPerfectOption(1);
        if(checkNullOrBlank(perfectPay)){
            if(perfectPay == 1){
                if(!checkNullOrBlank(perfectType)){
                    let str = t(message.JSE001).replace('%s',t('Perfect Payment Type'));
                    errMsg.push(str); 
                }
                if(!onlyAllowDecimalInteger(perfectAmount)){
                    let str = t(message.JSE005).replace('%s',t('Pefect Attendance Amount Number Only'));
                    errMsg.push(str); 
                }
            }
        }
    }

    /** GET FISCAL YEAR, BANK, LEAVE AND OTHER VALUES */
    if(!checkNullOrBlank(startMonth)){
        let str = t(message.JSE001).replace('%s',t('Start Month')); errMsg.push(str);
    }else{ 
        firstMonth = Moment(startMonth).format('MM'); setFromMonth(Moment(startMonth).format('MM'));
    }
    if(!checkNullOrBlank(endMonth)){
        let str = t(message.JSE001).replace('%s',t('End Month'));errMsg.push(str);
    }else{ 
        lastMonth = Moment(endMonth).format('MM'); setToMonth(Moment(endMonth).format('MM'));
    }

    if(leaveruleSwitch.isChecked == false){ 
        leaveRule = 1; setLeaveOption(1);  // System Defined
    }else{ 
        leaveRule = 2; setLeaveOption(2); // User Defined
    }
    if(!checkNullOrBlank(bankName)){
        let str = t(message.JSE001).replace('%s',t('Bank'));errMsg.push(str); 
    }

    /** GET SETUP RULES */
    if(leavedaySwitch.isChecked == false){lastMonthLeave = 0; setLastLevOption(0);}else{lastMonthLeave = 1; setLastLevOption(1);}
    if(overtimeamtSwitch.isChecked == false){lastMonthOT = 0; setLastOtOption(0);}else{lastMonthOT = 1; setLastOtOption(1);}
    if(unpaidleaveSwitch.isChecked == false){unpaidLeave = 0; setUnpaidLevOption(0);}else{unpaidLeave =1; setUnpaidLevOption(1);}
    if(announcementSwitch.isChecked == false){announcementFlag = 0; setAnnounOption(0);}else{announcementFlag =1; setAnnounOption(1);}

    /** GET APPROVER SETTING */
    if(!checkNullOrBlank(approverSetting)){
        let str = t(message.JSE001).replace('%s',t('Approver Setting'));errMsg.push(str); 
    }
    if(checkNullOrBlank(errMsg)){
        setError(errMsg);setSuccess([]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        setLoading(true);
        setError([]);setSuccess([]);
        let savedata = {
            "method":"post","url":"api/payroll-calculate-rule",
            "params": {
                // "form_number": 9,
                "company_id" : companyID,
                "calculate_method_id": payrollMethod,
                "f_divisor": payrollTextboxOne,
                "end_offdays_month": firstLastManual,
                "salary_calculation_day_start": fromDate,
                "salary_calculation_day_end": toDate,
                "payroll_calculate_option": payRoll, // All or Choose
                "ssb_calculate_option": ssbPay,
                "perfect_calculate_option": perfectPay,
                "basic_salary_create": basicSalary,
                "salary_pay_date": paymentDate,
                "perfect_attendance_flag": perfectYesNo,
                "perfect_attendance_amount_for_all": perfectAmount,
                "ssb_paid": ssbYesNo,
                "ssb_based_on": ssbBased,
                "ssb_fixed_amount": fixedAmount,
                "employee_ssb_rate": ssbMethod,
                "approver_setting": approverSetting,
                "max_approver": maxApprover,
                "max_checker": maxChecker,
                "last_month_leave": lastMonthLeave,
                "last_month_ot": lastMonthOT,
                "leave_rules": leaveRule,
                "regard_as_unpaid": unpaidLeave,
                "no_of_rows_in_dashboard": maxrowCount,
                "use_announcement_flag": announcementFlag,
                "payroll_currency_id": payrollType, // mmk & usd
                "ssb_currency_id": ssbpayType, // mmk or usd
                "perfect_attend_currency_id": perfectType, // mmk or usd
                "fiscal_year_start_month": firstMonth,
                "fiscal_year_end_month": lastMonth,
                "bank_id": bankName,
                "login_id": loginID,
            }
        }
        let response = await ApiRequest(savedata);setLoading(false);    
        if(response.flag == false){ 
            // if(response.message == "Data is already exist! Are you sure to overwrite  ?"){
            //     setAlert(true);setAlertContent(response.message);
            // }
            if(response.data.data.already_saved === true){
                setAlert(true);setAlertContent(response.message);
            }else{
                setSuccess([]);setError(response.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
        }else{
            if(response.data.status === 'OK'){
                setSuccess([response.data.message]);setError([]);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else{
                setSuccess([]);setError(response.data.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'});   
            }
        }
    }
}
/** End Save Function */

/** Overwrite YES Function */
let  alertOkBtn= async()=>{ 
    setAlert(false);setLoading(true);
    setError([]);setSuccess([]);
    let obj = {
        "method":"post","url":"api/payroll-calculate-rule/overwrite",
        "params": {
            // "form_number": 9,
            "company_id" : companyID,
            "calculate_method_id": payrollMethod,
            "f_divisor": payrollTextboxOne,
            "end_offdays_month": firstLast,
            "salary_calculation_day_start": startDate,
            "salary_calculation_day_end": endDate,
            "payroll_calculate_option": payRoll, // All or Choose
            "ssb_calculate_option": ssbPay,
            "perfect_calculate_option": perfectPay,
            "basic_salary_create": basicPay,
            "salary_pay_date": salPayDate,
            "perfect_attendance_flag": perfectOption,
            "perfect_attendance_amount_for_all": perfectAmount,
            "ssb_paid": ssbOption,
            "ssb_based_on": ssbBased,
            "ssb_fixed_amount": fixedAmount,
            "employee_ssb_rate": ssbMethodOption,
            "approver_setting": approverSetting,
            "max_approver": maxApprover,
            "max_checker": maxChecker,
            "last_month_leave": lastLevOption,
            "last_month_ot": lastOtOption,
            "leave_rules": leaveOption,
            "regard_as_unpaid": unpaidLevOption,
            "no_of_rows_in_dashboard": maxrowCount,
            "use_announcement_flag": announOption,
            "payroll_currency_id": payrollType, // mmk & usd
            "ssb_currency_id": ssbpayType, // mmk or usd
            "perfect_attend_currency_id": perfectType, // mmk or usd
            "fiscal_year_start_month": fromMonth,
            "fiscal_year_end_month": toMonth,
            "bank_id": bankName,
            "login_id" : loginID,
        }
    }
    let response = await ApiRequest(obj);setLoading(false);
    if(response.flag == false){ 
        setSuccess([]);setError(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(response.data.status === 'OK'){
            setSuccess([response.data.message]);setError([]);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            setSuccess([]);setError(response.data.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});   
        }
    }
}
/** Overwrite NO Function */
let  alertCancelBtn= async()=>{ setAlert(false);}


/** Start Cancel Function */
    let cancelAllData = () =>{
        setError([]);setSuccess([]);setError2([]);
        setDayShow(false);setDayRangeSwitch(false);setShowCalendar(false);setSelectedFromDate(null);setSelectedToDate(null);setPayDate(null);setBasicSalarySwitch(false);

        setPayrollShow(false);setPayRoll("");setPayrollType([]);setPayrollMethod("");
        setPayrollTextboxOne("");setPayrollTextboxTwo("");
        $(".payall").removeClass('btnGroup1');$(".paychoose").addClass('btnGroup1');
        
        setSsbShow(false);setSsbPayShow(false);setSSBPaidSwitch(false);setSsbPay("");
        setSsbpayType("");setSsbBased("");setShowFixedamt(false);
        setFixedAmount(0);setSSBPaidMethodSwitch(false);
        $(".ssball").removeClass('btnGroup2');$(".ssbchoose").addClass('btnGroup2');

        setPerfectShow(false);setPerfectPayShow(false);setPerfectPaidSwitch(false);
        setPerfectPay("");setPerfectType("");setPerfectAmount(0);
        $(".perfectall").removeClass('btnGroup3');$(".perfectchoose").addClass('btnGroup3');

        setStartMonth(null);setEndMonth(null);setLeaveRuleSwitch(false);setBankName([]);

        setLeaveDaySwitch(false);setOvertimeAmtSwitch(false);setUnpaidLeaveSwitch(false);
        setAnnouncementSwitch(false);setMaxRowCount(0);

        setApproverSetting("");setShowAppChk(false);
        setMaxApprover(0);setMaxChecker(0);
    }
/** End Cancel Function */

    return (
    <> 
    <CRow id="payroll-setup-form"> 
        <CCol>
        <Loading start={loading} />
        <Message success={success} error={error} error2={[]} />
        <CCard className="">
            <CCardHeader>
                <h5><CLabel className="m-0">{t('Payroll Rule Setup')}</CLabel></h5>
            </CCardHeader>
            <CCardBody>
                <CForm className=""> 
                    <SalaryCalculateDayRange
                        dayShow={dayShow} setDayShow={setDayShow} firstlastDay={t('First Day to Last Day')} 
                        manualDay={t('Manual')} forFirstLast={forFirstLast}
                        dayrangeSwitch={dayrangeSwitch.isChecked} dayrangeChecked={dayrangeChecked} 
                        showCalendar={showCalendar} selectedFromDate={selectedFromDate}
                        handleFromDateChange={handleFromDateChange} selectedToDate={selectedToDate}
                        handleToDateChange={handleToDateChange} payDate={payDate}
                        payDateChange={payDateChange}
                        experience={t('Experience')} manual={t("Manual")} forBasicSalary={forBasicSalary}
                        basicsalarySwitch={basicsalarySwitch.isChecked} basicsalaryChecked={basicsalaryChecked}

                    />
                    <PayrollCalculationMethod
                        payrollShow={payrollShow} payRoll={payRoll} payrollCalMethod={payrollCalMethod}
                        payRollAllChange={payRollAllChange} payRollChooseChange={payRollChooseChange} currencyData={currencyData}
                        payrollMethodChange={payrollMethodChange} payrollMethod={payrollMethod}
                        textboxOneValue={textboxOneValue} payrollTextboxOne={payrollTextboxOne}
                        textboxTwoValue={textboxTwoValue} payrollTextboxTwo={payrollTextboxTwo}
                        checkedPay={payrollType} payrollTypeChange={payrollTypeChange} forPayroll={forPayroll}
                    />
                    <SsbCalculationMethod 
                        ssbShow={ssbShow} ssbpayShow={ssbpayShow} ssbpaidSwitch={ssbpaidSwitch}
                        ssbpaidChecked={ssbpaidChecked} ssbPay={ssbPay} ssbPayAllChange={ssbPayAllChange}
                        ssbPayChooseChange={ssbPayChooseChange} currencySsb={currencySsb} ssbpayType={ssbpayType}
                        ssbpayTypeChange={ssbpayTypeChange} ssbBased={ssbBased} 
                        ssbBasicChange={ssbBasicChange} ssbTotalChange={ssbTotalChange} ssbFixedChange={ssbFixedChange}
                        showFixedamt={showFixedamt} fixedAmount={fixedAmount} fixedAmountValue={fixedAmountValue}
                        ssbpaidmethodSwitch={ssbpaidmethodSwitch.isChecked} ssbpaidmethodChecked={ssbpaidmethodChecked} 
                        ssbM1={t('Employer 5% and Employee 0%')} ssbM2={t('Employer 3% and Employee 2%')} forSsbPaid={forSsbPaid}
                    />
                    <PerfectAttendanceSetup 
                        perfectShow={perfectShow} perfectPayShow={perfectPayShow}perfectpaidSwitch={perfectpaidSwitch}
                        perfectpaidChecked={perfectpaidChecked} perfectPayAllChange={perfectPayAllChange}
                        perfectPayChooseChange={perfectPayChooseChange} currencyPerfect={currencyPerfect}
                        perfectType={perfectType} perfectTypeChange={perfectTypeChange} 
                        perfectAmount={perfectAmount} perfectAmountValue={perfectAmountValue}
                    />
                    <FiscalYear
                        startMonth={startMonth} startMonthChange={startMonthChange} removeStartMonth={removeStartMonth}
                        endMonth={endMonth} endMonthChange={endMonthChange} removeEndMonth={removeEndMonth}
                        leaveruleSwitch={leaveruleSwitch} leaveruleChecked={leaveruleChecked}
                        chooseBank={chooseBank} selectBankChange={selectBankChange}
                    />
                    <SetupRules
                        leavedaySwitch={leavedaySwitch} leavedayChecked={leavedayChecked}
                        overtimeamtSwitch={overtimeamtSwitch} overtimeamtChecked={overtimeamtChecked}
                        unpaidleaveSwitch={unpaidleaveSwitch} unpaidleaveChecked={unpaidleaveChecked}
                        announcementSwitch={announcementSwitch} announcementChecked={announcementChecked}
                        maxrowCount={maxrowCount} plusRows={plusRows} minusRows={minusRows}
                    />
                    <ApproverCheckerSetting
                        approverSetting={approverSetting} approverSettingChange={approverSettingChange}
                        setShowAppChk={setShowAppChk} showAppChk={showAppChk}
                        maxApprover={maxApprover} plusApprover={plusApprover} minusApprover={minusApprover}
                        maxChecker={maxChecker} plusChecker={plusChecker} minusChecker={minusChecker}
                    />
                    <SaveData
                        saveAllData={saveAllData} cancelAllData={cancelAllData}
                    />
                    <Confirmation
                        content={content} okButton={t('OK')} cancelButton={t('Cancel')} type={type} show={show} cancel={()=>setShow(!show)} saveOK={saveOK}
                    />
                    <CommonAlert show={alert} content={alertContent} okBtn={alertOkBtn} cancelBtn={alertCancelBtn} continues={continues} okButton={alertCancelBtn} />
                </CForm>
            </CCardBody>
        </CCard>
        </CCol>
    </CRow>
    </>
  )
}
export default withTranslation()(LegacyWelcomeClass);
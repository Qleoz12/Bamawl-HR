/* eslint-disable no-use-before-define */
import React ,{ useState, useEffect, useCallback } from 'react';
import {CCard,CCardBody,CCardHeader,CCol,CRow,CImg,CLabel,CButton,CFormGroup,CModal,CModalHeader,CModalBody,CButtonToolbar,CSelect} from '@coreui/react';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import message from '../../../hr/hr-common/common-message/CommonMessage';
import { withTranslation } from 'react-i18next';
import $ from 'jquery'
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import SearchData from './SearchData';
import YearlyBonusRegistrationMethod from './YearlyBonusRegistrationMethod';
import SelectBonusMethod from './SelectBonusMethod';
import {validateNumberOnly}  from '../../hr-common/common-validation/CommonValidation'
import {ChangeDate} from '../../hr-common/change-date/ChangeDate';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const [ empID, setEmpID ] = useState(''); // for employee id autocomplete box
    const [ empIDData, setEmpIDData ] = useState([]); // for employee id data for autocomplete box
    const [ empCode, setEmpCode ] = useState(''); // for employee code autocomplete box
    const [ empCodeData, setEmpCodeData ] = useState([]); // for employee code data for autocomplete box
    const [ empName, setEmpName ] = useState(''); // for employee name autocomplete box
    const [ empNameData, setEmpNameData ] = useState([]); // for employee name data for autocomplete box
    const [ department, setDepartment ] = useState(''); // for department name autocomplete box
    const [ departmentData, setDepartmentData ] = useState([]); // for department data for autocomplete box
    const [ loading, setLoading ] = useState(false); // for loading 
    const [ mainTable, setMainTable ] = useState([]); // for main table
    const [ allCheck, setAllCheck ] = useState(false);
    const [ success, setSuccess] = useState([]); // for success message
    const [ error, setError ] = useState([]); // for error message 
    const [ error2, setError2 ] = useState([]); // for error message 
    const [ methodMode, setMethodMode ] = useState("8"); // for method mode
    const [ totalText, setTotalText ] = useState("");  // for total text value
    const [ basicText, setBasicText ] = useState("");  // for basic text value
    const [ fixedText, setFixedText ] = useState("");  // for fixed text value
    const [ currency, setCurrency ] = useState(1); // for checked currency 
    const [ salaryMode, setSalaryMode] = useState("1"); // for salary method
    const [ allDate, setAllDate ] = useState(null); // for all date picker
    const [confirmShow, setConfirmShow ] = useState(false); // for confirmation show hide
    const [ companyID, setCompanyID ] = useState(localStorage.getItem('COMPANY_ID')); // for session company id
    const [ loginID, setLoginID ] = useState(localStorage.getItem('LOGIN_ID')); // for session login id
    const [currencyData,setCurrencyData]= useState([]);

    /** Form Load */
    useEffect(() => {
        setLoading(true);
        getDepartment();getCurrency();
    },[]);
    /** Start get currency Function */
    const getCurrency = async () => {
        let obj = { package_name: 'hr', url: 'api/currencies', method: 'get' }
        let response = await ApiRequest(obj);
        if(response.flag == false){ // catch error
            setLoading(false);setSuccess([]);setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            setLoading(false);
            if(response.data.status == "OK"){
               setSuccess([]);setError([]);
               setCurrencyData(response.data.data)
            }
        }
    }
    /** End get currency Function */
   
    /** Start get Department Function */
    const getDepartment = async () => {
        let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
        let response = await ApiRequest(obj);
        response.flag === false ? setDepartmentData([]) : setDepartmentData(response.data.data);
        setLoading(false);
    }
    /** End get Department Function */



    /**Start change autocomplete */
    const changeAutocomplete = async (type, i) => {
        setError([]); setSuccess([]);
        // type is id, show name in Employee ID and clear remain input
        if(type === 'id'){
            setEmpID(i.target.value); setEmpCode(''); setEmpName('');
        }
        // type is code, show name in Employee Code and clear remain input
        else if(type === 'code') {
            setEmpID(''); setEmpCode(i.target.value); setEmpName('');
        }
        // type is name, show name in Employee Name and clear remain input
        else{
            setEmpID(''); setEmpCode(''); setEmpName(i.target.value);
        }

        // if empty, remove data from autocomplete
        if(i.target.value === ''){
            setEmpID(''); setEmpName(''); setEmpCode('');
        }else{
            let obj = { package_name: 'erp', url: `api/employee/${type}-autocomplete-search`, method: 'post', params: { search_item: i.target.value, company_id: companyID } }
            let response = await ApiRequest(obj);
            if(response.flag === false){
                setError(response.message); setEmpID([]); setEmpName([]); setEmpCode([]);
            }else{
                (type === 'id') ? setEmpIDData(response.data.data) :
                (type === 'code') ? setEmpCodeData(response.data.data) : setEmpNameData(response.data.data);
            }
        }
    }
    /**End change autocomplete */
    
    /**Start select autocomplete */
    const selectAutocomplete = async (val, obj) => {
        let object = { package_name: 'erp', url: 'api/employee/autocomplete-result', method: 'post', params: { id: obj.id, company_id: companyID } }
        let response = await ApiRequest(object);
        if(response.flag === false){
            setError(response.message);
        }else{
            if(response.data.data[0].employee_id !== null){setEmpID(response.data.data[0].employee_id)}else{setEmpID('')}
            if(response.data.data[0].name !== null){setEmpName(response.data.data[0].name)}else{setEmpName('')}
            if(response.data.data[0].employee_code !== null){setEmpCode(response.data.data[0].employee_code)}else{setEmpCode('')}
        }
    }
    /**End select autocomplete */

    /** Start all checkbox function **/
    let allCheckBoxChange = ()=>{
        let Data = mainTable.map(data =>{
            data.is_checked= !allCheck
            return data;
        });
        setAllCheck(!allCheck);
        setMainTable(Data)

    }
    /** End all checkbox function **/

    /** Start sub checkbox check function **/
    let  subCheckboxChange=(e)=>{
        let id = e.target.value;
        let data = mainTable.map(main=>{
          if(main.employee_id == id){
            main.is_checked = !main.is_checked;
            return main;
          }
          return main;
        })
        setMainTable(data)
        let flag = true;
        data.forEach(data=>{
          if(data.is_checked == false){
            flag = false;
          }
        })
        setAllCheck(flag);
    }
    /** End sub checkbox check function **/


    /** Start all pick datePicker function **/
    let allDateChange = (e) => {
        let data = mainTable.map(main=>{
            main.pay_date = ChangeDate(e);
            return main; 
        })
        setMainTable(data);setAllDate(ChangeDate(e));
    };
    /** End all pick datePicker function **/

    /** Start sub pick datePicker function **/
    let subDateChange = (id, e) => {
        let data = mainTable.map(main=>{
            if(main.employee_id == id){
                main.pay_date = ChangeDate(e);
                return main;
                }
                return main;
        })
        setMainTable(data);setAllDate(null);
    };

    /** End sub pick datePicker function **/

    

    /** Start search button function **/
    let searchBtn =async ()=>{
        setLoading(true);setError([]);setSuccess([]);let error=[];
       
            let search = {
                "method":"post",
                "url": "api/yearly-bonus-register/search",
                "params": {
                    "employee_id":empID,
                    "employee_code":empCode,
                    "employee_name":empName,
                    "department_id":department,
                    "currency_id": currency,
                    "company_id":companyID,
                    "login_id":loginID
                },
                "package_name": "hr"
            }
            let response = await ApiRequest(search);
            if(response.flag == false){ // catch error
                setLoading(false);setSuccess([]);setError(response.message);setMainTable([]);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else{
                if(response.data.status == "OK"){
                    let main_data = response.data.data;
                    main_data.map(main=>{
                        main.bonus_amount = main.total_salary;
                        return main; 
                    });
                    setMainTable(main_data)
                    setLoading(false);setCurrency("1");
                }else if(response.data.status == "NG"){
                    setLoading(false);setSuccess([]);setError(response.data.message);
                    window.scrollTo({top:0, left:0, behavior:'smooth'});
                }
            }

    }
    /** End search button function **/

    /** Start totalChange function **/
    let totalChange =()=>{
        let data = mainTable.map(main=>{
                main.bonus_amount = main.total_salary;
                return main; 
        })
        setMethodMode("1");setFixedText("");setMainTable(data);setBasicText("");setTotalText("");setFixedText("");setCurrency(mainTable[0]['total_salary_currency']);
        
    }
    /** End totalChange function **/

    /** Start basicChange function **/
    let  basicChange=()=>{
        let data = mainTable.map(main=>{
            main.bonus_amount = main.basic_salary;
            return main; 
        })
        setMethodMode("2");setFixedText("");setMainTable(data);setBasicText("");setTotalText("");setFixedText("");setCurrency(mainTable[0]['basic_salary_currency']);
    }
    /** End basicChange function **/

    /** Start percentTotalChange function **/
    let  percentTotalChange=()=>{
        let data = mainTable.map(main=>{
            main.bonus_amount = 0;
            return main; 
        })
        setMethodMode("3");setCurrency("");setFixedText("");setBasicText("");setFixedText("");setMainTable(data);setCurrency(mainTable[0]['total_salary_currency']);
    }
    /** End percentTotalChange function **/

    /** Start percentBasicChange function **/
    let percentBasicChange =()=>{
        let data = mainTable.map(main=>{
            main.bonus_amount = 0;
            return main; 
        })
        setMethodMode("4");setFixedText("");setTotalText("");setFixedText("");setMainTable(data);setCurrency(mainTable[0]['basic_salary_currency']);
    }
    /** End percentBasicChange function **/

    /** Start totalWorkingChange function **/
    let totalWorkingChange =()=>{
        let data = mainTable.map(main=>{
            main.bonus_amount = (main.total_salary * main.working_month).toFixed(3);
            return main; 
        })
        setMethodMode("5");setFixedText("");setBasicText("");setTotalText("");setFixedText(""); setMainTable(data);setCurrency(mainTable[0]['total_salary_currency']);
    }
    /** End totalWorkingChange function **/

    /** Start basicWorkingChange function **/
    let basicWorkingChange =()=>{
        let data = mainTable.map(main=>{
            main.bonus_amount = (main.basic_salary * main.working_month).toFixed(3);
            return main; 
        })
        setMethodMode("6"); setFixedText("");setBasicText("");setTotalText("");setFixedText(""); setMainTable(data);setCurrency(mainTable[0]['basic_salary_currency']);
    }
    /** End basicWorkingChange function **/

    /** Start fixedAmountChange function **/
    let fixedAmountChange =()=>{
        let data = mainTable.map(main=>{
            main.bonus_amount = 0;
            return main; 
        })
        setMethodMode("7");setCurrency("1"); setTotalText(""); setBasicText(""); setMainTable(data);
    }
    /** End fixedAmountChange function **/

    /** Start userDefinedChange function **/
    let userDefinedChange =()=>{
        let data = mainTable.map(main=>{
            main.bonus_amount = "";
            return main; 
        })
        setMethodMode("8");setCurrency("1"); setTotalText("");setBasicText(""); setFixedText("");setMainTable(data);
    }
    /** End userDefinedChange function **/

    /** Start totalTextChange function **/
    let totalTextChange =(e)=>{
        if(validateNumberOnly(e.target.value) || e.target.value == ""){
            let data = mainTable.map(main=>{
                main.bonus_amount = (main.total_salary * (e.target.value / 100)).toFixed(3);
                return main; 
            })
            setTotalText(e.target.value);setMethodMode("3");setBasicText("");setFixedText("");setMainTable(data);
        }
       
    }
    /** End totalTextChange function **/

    /** Start basicTextChange function **/
    let  basicTextChange=(e)=>{
        if(validateNumberOnly(e.target.value) || e.target.value == ""){
            let data = mainTable.map(main=>{
                main.bonus_amount = (main.basic_salary * (e.target.value / 100)).toFixed(3);
                return main; 
            })
            setBasicText(e.target.value);setMethodMode("4");setTotalText("");setFixedText("");setMainTable(data);
        }
    }
    /** End basicTextChange function **/

    /** Start fixedTextChange function **/
    let  fixedTextChange=(e)=>{
        if(validateNumberOnly(e.target.value) || e.target.value == ""){
            let data = mainTable.map(main=>{
                main.bonus_amount = e.target.value;
                return main; 
            })
            setFixedText(e.target.value);setMethodMode("7");setTotalText("");setBasicText("");setMainTable(data);
        }
    }
    /** End fixedTextChange function **/

    /** Start fixedTextChange function **/
    let  currencyChange=(e)=>{
        setCurrency(e.target.value);
    }
    /** End fixedTextChange function **/

    /** Start bonus Method Change function **/
    let  bonusMethodChange=()=>{
        if(salaryMode == "1"){
            setSalaryMode("0");
        }else{
            setSalaryMode("1");
        }
        
    }
    /** End fixedTextChange function **/
    
    /** Start bonus amount textbox change function **/
    let  bonusAmountChange=(e)=>{
        let id =e.target.attributes['id'].value;
        if(validateNumberOnly(e.target.value) || e.target.value == ""){
            let data = mainTable.map(main=>{
                if(main.employee_id == id){
                    main.bonus_amount = e.target.value;
                    return main;
                    }
                    return main;
            })
            setMainTable(data)
        }

    }
    /** End bonus amount textbox change function **/

    /** Start remove button function **/
    let removeBtn = ()=>{
        let flag = false;setError([]);setSuccess([]);
        mainTable.forEach(data=>{
            if(data.is_checked == true){ flag = true ;}
        })
        if(flag == false){
            let msg = t(message.JSE001).replace('%s', t('Employee ID'));
            setError([msg]);setSuccess([]);setLoading(false);
            $("html, body").animate({ scrollTop: 0 }, 1500);
        }else{
            setError([]);setSuccess([]);
            let data = mainTable.filter(main=> main.is_checked != true)
            if(data == ""){
                setAllCheck(false);
            }
            setMainTable(data)
        }
        
    }
    /** End remove button function **/
     
    /** Start confirm save btn function **/
    let saveOk =async ()=>{
        setConfirmShow(false);setLoading(true);
        let yearly_bonus_data = [];
        mainTable.forEach(data=>{
            if(data.is_checked == true){
                yearly_bonus_data.push({
                    "employee_id": data.employee_id ,
                    "pay_date": data.pay_date,
                    "bonus_amount": data.bonus_amount
                })
            }
        })


        let search = {
            "method":"post",
            "url": "api/yearly-bonus-register/save",
            "params": {
                "login_id"  :loginID,
                "company_id":companyID,
                "paid_with_salary": salaryMode,
                "paid_finish":"0",
                "currency_id": currency,
                "yearly_bonus_data": yearly_bonus_data
            },
            "package_name": "hr"
        }
        let response = await ApiRequest(search);
        if(response.flag == false){ // catch error
            setLoading(false);setSuccess([]);setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            setLoading(false);
            if(response.data.status == "OK"){
               setSuccess([response.data.message]);setError([]); window.scrollTo({top:0, left:0, behavior:'smooth'});
               setDepartment('');setAllCheck(false);setMainTable([]);setAllDate(null);setEmpCode("");setEmpID('');setEmpName('');setMethodMode(8);setTotalText('');setBasicText('');setFixedText('');setSalaryMode('1');
            }else if(response.data.status == "NG"){
                setError(response.data.message);setSuccess([]); window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
        }
    }
    /** End confirm save btn function **/

    /** Start  save btn function **/
    let saveBtn = ()=>{
        let flag= false;
        mainTable.forEach(data=>{
           if(data.is_checked == true){
               flag= true;
           }
        })
        if(flag == false){
            let msg = t(message.JSE001).replace('%s', t('Employee ID'));
            setError([msg]);setSuccess([]);setLoading(false);
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }else{
            let id = [];
            mainTable.forEach(data=>{
                if(data.is_checked == true && data.pay_date == null){
                    id.push(data.employee_id);
                }
            })
            if(id.length > 0){
                id.toString();
                let msg = t(message.JSE006).replace('%s', t('Pay Date'))+' '+id.toString();
                setError([msg]);setSuccess([]);setLoading(false);
                $("html, body").animate({ scrollTop: 0 }, 1000);
            }else{
                setSuccess([]);setError([]);setConfirmShow(true);
            }
            
        }
    }
    /** End  save btn function **/
 
   
    return (
        <>
            <Loading start={loading}/>
            <Message success={success} error={error} error2={error2}/>
            <CCard>
                <CCardHeader>
                    <h5><CLabel className="m-0">{t('Yearly Bonus Registration')}</CLabel></h5>
                </CCardHeader>
                    <CCardBody>
                        <CRow lg="12" style={{marginBottom:'10px'}}>
                            <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                    <CLabel htmlFor="emp_id">{t('Employee ID')}</CLabel>
                                    <Autocomplete onChange={(i) =>changeAutocomplete('id', i)} onSelect={selectAutocomplete} items={empIDData} name={empID} />
                            </CCol>
                            <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                    <CLabel htmlFor="emp_code">{t('Employee Code')}</CLabel>
                                    <Autocomplete onChange={(i) =>changeAutocomplete('code', i)} onSelect={selectAutocomplete} items={empCodeData} name={empCode} />
                            </CCol>
                            <CCol lg="4">
                                    <CLabel htmlFor="emp_name">{t('Employee Name')}</CLabel>
                                    <Autocomplete onChange={(i) =>changeAutocomplete('name', i)} onSelect={selectAutocomplete} items={empNameData} name={empName} />
                            </CCol>
                        </CRow>
                        <CRow lg="12" className="mt-4" style={{marginBottom:'10px'}}>
                            <CCol lg="4">
                                    <CLabel htmlFor="department_name">{t('Department Name')}</CLabel>
                                     <CSelect  className="bamawl-select" custom  id="department_name" value={department} onChange={(i)=>{setDepartment(i.target.value);}}>
                                        <option key="" value="">---Select---</option>
                                        {
                                            departmentData != "" &&
                                                departmentData.map(i => {
                                                    return( <option key={i.id} name={i.id} value={i.id}>{ i.department_name }</option>)})
                                        }
                                    </CSelect>
                            </CCol>
                        </CRow><br/>
                        <CRow alignHorizontal="center">
                            <CButton  className="form-btn" onClick={searchBtn}>{t('Search')}</CButton>
                        </CRow>
                        <SearchData mainTable={mainTable}  allCheckBoxChange={allCheckBoxChange} allCheck={allCheck} methodMode={methodMode} subCheckboxChange={subCheckboxChange} bonusAmountChange={bonusAmountChange} allDate={allDate} allDateChange={allDateChange} subDateChange={subDateChange} removeBtn={removeBtn} />
                        <YearlyBonusRegistrationMethod methodMode={methodMode} mainTable={mainTable} totalFun={totalChange} basicFun={basicChange} perTotalFun={percentTotalChange} perBasicFun={percentBasicChange} totalWorking={totalWorkingChange} basicWoking={basicWorkingChange} fixedAmount={fixedAmountChange} userDefined={userDefinedChange} totalTextChange={totalTextChange} basicTextChange={basicTextChange} fixedTextChange={fixedTextChange} totalText={totalText} basicText={basicText} fixedText={fixedText} currencyData={currencyData} currencyChange={currencyChange} currency={currency}/>    
                        <SelectBonusMethod label1={t('With Salary')} label2={t('Without Salary')} mainTable={mainTable} salaryMode={salaryMode} bonusMethodChange={bonusMethodChange} saveBtn={saveBtn}/>  
                        <Confirmation show={confirmShow} content={t('Are you sure want to save!')} type={"save"} saveOK={saveOk} okButton={t("Ok")} cancel={()=>setConfirmShow(false)}  cancelButton={t('Cancel')} />                  
                    </CCardBody>
            </CCard>

         
        </>
    );
                                
}

export default withTranslation()(LegacyWelcomeClass)

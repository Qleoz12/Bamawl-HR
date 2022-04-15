import React, { useState, useEffect, useCallback } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImg,
  CButton,
  CLabel,
  CRow,
  CFormGroup,
  CModal,
  CModalHeader,
  CModalBody,
  CButtonToolbar,
  CButtonGroup,
  CInputRadio,
  CInput,
} from '@coreui/react'
import { TextField } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import $ from 'jquery'
import { isEmpty, englishCharacterNumberOnly, greaterThanHundred, isdigit } from '../../hr-common/common-validation/CommonValidation'; // Common validation function
import message from '../../hr-common/common-message/CommonMessage'; // Common message
import { fi } from 'date-fns/locale';
import FormData from './FormData';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '25ch',
  },
}));

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const [error,setError]    = useState([]);
  const [success,setSuccess]= useState('');
   /** Start Form Load */
   useEffect(() => {
    $(".pay-basic").addClass('btnGroup2');
    loadTotalSalaryBasedOn();
    loadBasicSalaryBasedOn();
    loadMainTable();
    loadBasedOnSalary();
  // }, [loadTotalSalaryBasedOn,loadBasicSalaryBasedOn,loadMainTable]);
   }, [loadMainTable, loadTotalSalaryBasedOn, loadBasedOnSalary, loadBasicSalaryBasedOn]);

  const [ calculateBasedOnMethodId, setCalculateBasedOnMethodId ] = useState();
  const [ calculateBasedOnMethods, setCalculateBasedOnMethods ] = useState();
  const [ createdAt, setCreatedAt ] = useState();
  const [ createdEmp, setCreatedEmp ] = useState();
  const [ dateRangeFlag, setDateRangeFlag ] = useState();
  const [ maxCarryDay, setMaxCarryDay ] = useState();
  const [ maxCarryYear, setMaxCarryYear ] = useState();
  const [ paymentCalculateBasedOn, setPaymentCalculateBasedOn ] = useState();
  const [ paymentDeductionFlag, setPaymentDeductionFlag ] = useState();
  const [ totalMaxDay, setTotalMaxDay ] = useState();
  const [ updatedAt, setUpdatedAt ] = useState();
  const [ updatedEmp, setUpdatedEmp ] = useState();
  const [ basedOnMethodId, setBasedOnMethodId ] = useState();
  const [ calculateMethodsId, setCalculateMethodsId ] = useState();
  const [ calculateMethodsDescription, setCalculateMethodsDescription ] = useState();
  const [ FDivisor, setFDivisor ] = useState();
  const [ MFactor, setMFactor ] = useState();

  const [ mainTable, setMainTable ] = useState([]);
  const loadMainTable = useCallback(() => {

  }, []);

  const [basedOnName, setBasedOnName] = useState(''); // For based on method
  const [basicSalary, setBasicSalary] = useState(false);
  const [basicSalaryList, setBasicSalaryList] = useState([]);
  const loadBasicSalaryBasedOn = useCallback(() => {
    let basedOnName = 'Basic Salary';

  }, []);

  const [totalSalary, setTotalSalary] = useState(false);
  const [totalSalaryList, setTotalSalaryList] = useState([]);
  const loadTotalSalaryBasedOn = useCallback(() => {
    let basedOnName = 'Total Salary';

  }, []);

  const [maxAllowDay, setMaxAllowDay] = useState(true);

  const [PaymentCalculateBasedOnState, setPaymentCalculateBasedOnState] = useState({isChecked: false});
  const [PaymentCalculateBasedOnFlagState, setPaymentCalculateBasedOnFlagState] = useState({payment_deduction_flag: 1});
  const [PaymentCalculateBasedOnFlagBtnState, setPaymentCalculateBasedOnFlagBtnState] = useState([]);
  const [PaymentCalculateBasedOnIncluded, setPaymentCalculateBasedOnIncluded] = useState('not-include');
  const [PaymentCalculateBasedOnNotIncluded, setPaymentCalculateBasedOnNotIncluded] = useState('');
  const loadBasedOnSalary = useCallback(() => {

  }, []);

  const [fixedAmount, setFixedAmount] = useState(false);

  const [ rowCount , setRowCount ] = useState(); // for row count
  const classes = useStyles();

  const [PaidTypeState, setPaidTypeState] = useState({isChecked: false});
  const [PaidTypeIncluded, setPaidTypeIncluded] = useState('not-include');
  const [PaidTypeNotIncluded, setPaidTypeNotIncluded] = useState('');
  const [leaveTimeCount, setLeaveTimeCount] = useState(
    [{leave_count_id: 1, leave_count_name: 'In One Year', isChecked: true},
    {leave_count_id: 2, leave_count_name: 'In One Time', isChecked: false},
    {leave_count_id: 3, leave_count_name: 'None', isChecked: false}
    ]);




const basicChange = () => {
  $(".pay-basic").addClass('btnGroup2');
  $(".pay-total").removeClass('btnGroup2');
  $(".pay-fixed").removeClass('btnGroup2');
  setBasicSalary(true);
  setTotalSalary(false);
  setFixedAmount(false);
}
const totalChange = () => {
  $(".pay-basic").removeClass('btnGroup2');
  $(".pay-total").addClass('btnGroup2');
  $(".pay-fixed").removeClass('btnGroup2');
  setBasicSalary(false);
  setTotalSalary(true);
  setFixedAmount(false);
}
const fixedChange = () => {
  $(".pay-basic").removeClass('btnGroup2');
  $(".pay-total").removeClass('btnGroup2');
  $(".pay-fixed").addClass('btnGroup2');
  setBasicSalary(false);
  setTotalSalary(false);
  setFixedAmount(true);
}

  const [leaveName , setLeaveName] = useState('');
  const LeaveNameChange = (e) =>{
    setLeaveName(e.target.value);
  }

  const [totalMaximumAllow , setTotalMaximumAllow] = useState('');
  const TotalMaximumAllowChange = (e) =>{
    setTotalMaximumAllow(e.target.value);
  }
  const [oneTimeMaximumAllow , setOneTimeMaximumAllow] = useState('');
  const OneTimeMaximumAllowChange = (e) =>{
    setOneTimeMaximumAllow(e.target.value);
  }
  const [maximumCarryAllow , setMaximumCarryAllow] = useState('');
  const MaximumCarryAllowChange = (e) =>{
    setMaximumCarryAllow(e.target.value);
  }
  const [fixedAmountValue , setFixedAmountValue] = useState('');
  const FixedAmountChange = (e) =>{
    setFixedAmountValue(e.target.value);
  }

  /** Click Save Button */
  let saveAllData=(e)=> {
    setError([]);
    setSuccess('');
    let errMsg = [];
    let companyId = 2; // This is the login company ID from ERP
    let employeeId = 20005; // This is the login Employee ID from ERP

    if(isEmpty(leaveName)){ // Validate leave name text field
      let err =  t(message.JSE001).replace('%s',t('Leave Name'));
      errMsg.push(err);
    }else{
      if(!englishCharacterNumberOnly(leaveName)){
        let err =  t(message.JSE010);
        errMsg.push(err);
      }else{
        if(!greaterThanHundred(leaveName)){
          let err =  t(message.JSE011).replace('%s',t('Leave Name'));
          errMsg.push(err);
        }
      }
    }
    if(maxAllowDay){
      if(isEmpty(totalMaximumAllow)){ // Validate Total Maximum Allowed days text field
        let err =  t(message.JSE001).replace('%s',t('Total Maximum Allowed Days'));
        errMsg.push(err);
      }else{
        if(!isdigit(totalMaximumAllow)){
          let err =  t(message.JSE013).replace('%s',t('Total Maximum Allowed Days'));
          errMsg.push(err);
        }
      }
      if(isEmpty(oneTimeMaximumAllow)){ // Validate Total Maximum Allowed days text field
        let err =  t(message.JSE001).replace('%s',t('One Time Maximum Allowed Days'));
        errMsg.push(err);
      }else{
        if(!isdigit(oneTimeMaximumAllow)){
          let err =  t(message.JSE013).replace('%s',t('One Time Maximum Allowed Days'));
          errMsg.push(err);
        }
      }
      if(isEmpty(maximumCarryAllow)){ // Validate Total Maximum Allowed days text field
        let err =  t(message.JSE001).replace('%s',t('Maximum Carry Allowed Days'));
        errMsg.push(err);
      }else{
        if(!isdigit(maximumCarryAllow)){
          let err =  t(message.JSE013).replace('%s',t('Maximum Carry Allowed Days'));
          errMsg.push(err);
        }
      }
      /* both not empty */
      if(!isEmpty(oneTimeMaximumAllow) && !isEmpty(totalMaximumAllow)){
        if(oneTimeMaximumAllow>totalMaximumAllow){
          let err = t(message.JSE017).replace('%s', t('Total Maximum Allowed Days')).replace('%s',t('One Time Maximum Allowed Days'));
          errMsg.push(err);
        }
      }
      if(!isEmpty(maximumCarryAllow) && !isEmpty(totalMaximumAllow)){
        if(maximumCarryAllow>totalMaximumAllow){
          let err = t(message.JSE017).replace('%s', t('Total Maximum Allowed Days')).replace('%s',t('Maximum Carry Allowed Days'));
          errMsg.push(err);
        }
      }
      /* Fixed amount validate */
      if(fixedAmount == true){
        if(isEmpty(fixedAmountValue)){
          let err = t(message.JSE001).replace('%s',t('Fixed Amount'));
          errMsg.push(err);
        }else{
          if(!isdigit(totalMaximumAllow)){
            let err =  t(message.JSE013).replace('%s',t('Fixed Amount'));
            errMsg.push(err);
          }
        }
      }

      if(errMsg == null){

      }else{
      }
    }

    /* Payment calculate based on choose */
    if(PaymentCalculateBasedOnState.isChecked === true){
      if(isEmpty(deductionBasedOn)){
        let err = t(message.JSE002).replace('%s', t('Deduction Based On Method'));
        errMsg.push(err);
      }
    }

    if(errMsg != ""){
      setError([errMsg]);
      setSuccess("");
    }
  }

  /** Click TotalSalaryBasedOnMethod2 Textbox */
  let TotalSalaryBasedOnMethod2 = () =>{

  }
  /** Click TotalSalaryBasedOnMethod8 Textbox */
  let TotalSalaryBasedOnMethod8 = () =>{

  }
  /** Click BasicSalaryBasedOnMethod2 Textbox */
  let BasicSalaryBasedOnMethod2 = () =>{

  }
  /** Click BasicSalaryBasedOnMethod8 Textbox */
  let BasicSalaryBasedOnMethod8 = () =>{

  }

  const [deductionBasedOnSalary , setDeductionBasedOnSalary] = useState([]);
  const PaymentCalculateBasedOnChecked = () => {
    setPaymentCalculateBasedOnState( { isChecked: !PaymentCalculateBasedOnState.isChecked } );
    if(PaymentCalculateBasedOnState.isChecked === false ){
      setPaymentCalculateBasedOnFlagState({payment_deduction_flag: 2});
      setPaymentCalculateBasedOnIncluded('not-include');
      setPaymentCalculateBasedOnNotIncluded('');

    }else{
      setPaymentCalculateBasedOnFlagState({payment_deduction_flag: 1});
      setPaymentCalculateBasedOnIncluded('');
      setPaymentCalculateBasedOnNotIncluded('not-include');
    }
  }


  const PaidTypeChecked = () => {
    setPaidTypeState( { isChecked: !PaidTypeState.isChecked } );
    if(PaidTypeState.isChecked === true ){
      setPaidTypeIncluded('not-include');
      setPaidTypeNotIncluded('');
    }else{
      setPaidTypeIncluded('');
      setPaidTypeNotIncluded('not-include');
    }
  }

  /* CHECKBOX ACTION */
  const [AllCheck, setAllCheck] = useState(false);      // For select checkbox all or not
  const [deleteIdList, setDeleteIdList] = useState(''); // For delete data list
  const change_checkbox = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let data;
    let id_list  = [];
    if( value === "all-check" ){
      data = mainTable.map(item => ({ ...item, is_checked: checked }));
    }else{
        data = mainTable.map(item =>
        item.id == value ? { ...item, is_checked: checked } : item
      )
    }
    for(let i=0; i<data.length; i++){
      if(data[i].is_checked === true){
        id_list.push(data[i].id);
      }
    }
    var x = id_list.toString();
    setDeleteIdList(x);
    setAllCheck(data.every(item => item.is_checked));
    setMainTable(data);
  }

  const leaveTypeNone = () => {
    setMaxAllowDay(!maxAllowDay);
    // setLeaveTimeCount(leaveTimeCount[2].isChecked= true);
  }
  const leaveTypeOneYear = () => {
    setMaxAllowDay(true);
    // setLeaveTimeCount(leaveTimeCount[0].isChecked=true);
  }
  const leaveTypeOneTime = () => {
    setMaxAllowDay(true);
    // setLeaveTimeCount(leaveTimeCount[1].isChecked=true);
  }




   /* EDIT OVERTIME MODAL BOX */
   const [ editModalBox, setEditModalBox ] = useState(false); // Edit confirm box show or hide
   const [ editID, setEditID ] = useState('');
   const editToggleAlert = (e) => {
     setEditID(e['id']);
     setEditModalBox(!editModalBox);
   }
   const editOnClose = () => {
     setEditID('');
     setEditModalBox(!editModalBox);
   }
   const editOK = () =>{
     var array = [...mainTable];
     setEditModalBox(!editModalBox);
     editRow(editID);
   }
  /* DELETE OVERTIME MODAL BOX */
  const [ deleteModalBox, setDeleteModalBox ] = useState(false); // Delete confirm box show or hide
  const deleteToggleAlert = () => {
    setDeleteModalBox(!deleteModalBox);
  }
  const deleteOK = () =>{
    loadMainTable();
    let companyId = 2; // This is the login company ID from ERP
    let employeeId = 20005; // This is the login Employee ID from ERP
    var array = [...mainTable];
    setDeleteModalBox(!deleteModalBox);
    if(!isEmpty(deleteIdList)){

    }else{
      setSuccess('');
      let errorMsg = t(message.JSE004);
      setError([errorMsg]);
    }
  }

  /* EDIT LINK TO NEXT PAGE */
  const editRow = (id) => {
    localStorage.setItem('RETURN_OT_RATE_DATA', JSON.stringify(id));
    let LeaveTypeData = [];
    let companyId = 2; // This is the login company ID from ERP
    let employeeId = 20005; // This is the login Employee ID from ERP
    if(editID != ''){
     
    }
  }

  let refresh = () => {
    window.location.reload(false);
  }

  const [deductionBasedOn , setDeductionBasedOn] = useState('');
  const DeductionBasedOnChange = (e) => {
    setDeductionBasedOn(e.target.value);
  }

  return (
    <>
    <CRow>
    <CCol xs="12">
      {/* Error and success msg */}
      {
        error != "" &&
        <CCard className="custom-card error p-3 mt-4 mb-3">
          {
            error.map((data, index) => {
              return(
                <div key={index} className ="msg">{ data }</div>
              )
            })
          }
        </CCard>
      }
      {
        success !== "" &&
        <CCard className="custom-card success p-3 mt-4 mb-3">
          <div className = "msg">{ success }</div>
        </CCard>
      }

      <CCard>
        <CCardHeader>
          <h5>{t('Leave Type Registration')}</h5>
        </CCardHeader>
        <CCardBody>
          <CRow style={{display: 'flex'}}>
            <CCol lg='2'>
              <CImg src={'/avatars/list.png'} className="titleicon" alt="titleicon" style={{marginLeft:'5px', marginRight: '10px', marginBottom: '5px'}}/>
              <CLabel className="middle">{t('Leave Name')}</CLabel>
              <span style={{color: 'red'}}>*</span>
            </CCol>
            <CCol lg='3'>
              <TextField
                placeholder={t('Enter Leave Name')}
                onChange={LeaveNameChange}
              />
            </CCol>
          </CRow>
          <CRow className="leave-time-count">
            <CCol lg='2' className="leave-time-count-inner">
              <span>{t('In One Year')}</span>
              <input
                className="leave-time-count-radio"
                type="radio"
                align='right'
                name="leave-time-count"
                defaultChecked={leaveTimeCount[0].isChecked}
                // checked={leaveTimeCount[0].isChecked}
                // value={leaveTimeCount[0].id}
                onChange = {leaveTypeOneYear}
              />
            </CCol>
            <CCol lg='2' className="leave-time-count-inner">
              <span>{t('In One Time')}</span>
              <input
                className="leave-time-count-radio"
                type="radio"
                name="leave-time-count"
                // checked={leaveTimeCount[1].isChecked}
                // value={leaveTimeCount[1].id}
                onChange = {leaveTypeOneTime}
              />
            </CCol>
            <CCol lg='2' className="leave-time-count-inner">
              <span>{t('None')}</span>
              <input
                className="leave-time-count-radio"
                type="radio"
                name="leave-time-count"
                // checked={leaveTimeCount[2].isChecked}
                // value={leaveTimeCount[2].id}
                onChange = {leaveTypeNone}
              />
            </CCol>
          </CRow>
          { maxAllowDay === true &&
          <>
            <CRow style={{display: 'flex', marginTop: '15px'}}>
              <CCol lg='4'>
                <CImg src={'/avatars/list.png'} className="titleicon" alt="titleicon" style={{marginLeft:'5px', marginRight: '10px', marginBottom: '5px'}}/>
                <CLabel className="middle">{t('Total Maximum Allowed Days')}</CLabel>
              </CCol>
              <CCol lg='3'>
                <TextField
                  placeholder={t('example 5,10,15,etc...')}
                  className={clsx(classes.margin, classes.textField)}
                  onChange={TotalMaximumAllowChange}
                  inputProps={{ maxLength: 3 }}
                />
              </CCol>
            </CRow>
            <CRow style={{display: 'flex', marginTop: '15px'}}>
              <CCol lg='4'>
                <CImg src={'/avatars/list.png'} className="titleicon" alt="titleicon" style={{marginLeft:'5px', marginRight: '10px', marginBottom: '5px'}}/>
                <CLabel className="middle">{t('One Time Maximum Allowed Days')}</CLabel>
              </CCol>
              <CCol lg='3'>
                <TextField
                  placeholder={t('example 5,10,15,etc...')}
                  className={clsx(classes.margin, classes.textField)}
                  onChange={OneTimeMaximumAllowChange}
                  inputProps={{ maxLength: 3 }}
                />
              </CCol>
            </CRow>
            <CRow style={{display: 'flex', marginTop: '15px'}}>
              <CCol lg='4'>
                <CImg src={'/avatars/list.png'} className="titleicon" alt="titleicon" style={{marginLeft:'5px', marginRight: '10px', marginBottom: '5px'}}/>
                <CLabel className="middle">{t('Maximum Carry Allowed Days')}</CLabel>
              </CCol>
              <CCol lg='3'>
                <TextField
                  placeholder={t('example 5,10,15,etc...')}
                  className={clsx(classes.margin, classes.textField)}
                  onChange={MaximumCarryAllowChange}
                  inputProps={{ maxLength: 3 }}
                />
              </CCol>
            </CRow>
          </>
          }


          <CRow style={{paddingBottom: '15px', display:'flex', marginTop: '15px'}}>
            <CCol lg='6' style={{borderRight: '1px solid #E3E5F1'}}>
              <CImg src={'/avatars/list.png'} className="titleicon" alt="titleicon" style={{marginLeft:'5px', marginRight: '10px', marginBottom: '5px'}}/>
              <CLabel className="middle">{t('Payment Calculate Based On')}</CLabel>
              <span style={{color: 'red'}}>*</span>
              <br></br>
              <div style={{textAlign: 'center', margin: "10px"}}>
              <label className={`${PaymentCalculateBasedOnIncluded}`}>{t('Paid')}</label>
              <div className="leave-type-toggle-switch">
                <input
                type="checkbox"
                className="leave-type-toggle-switch-checkbox"
                name='Payment Calculate Based On'
                id='payment_calculate_based_on'
                checked={PaymentCalculateBasedOnState.isChecked}
                onChange={PaymentCalculateBasedOnChecked}
                />
                <label className="leave-type-toggle-switch-label" htmlFor='payment_calculate_based_on'>
                <span className='leave-type-toggle-switch-inner-1' />
                <span className="leave-type-toggle-switch-switch" />
                </label>
              </div>
              <label className={`${PaymentCalculateBasedOnNotIncluded}`}>{t('Not Paid')}
                <span style={{color: 'red', paddingLeft: '5px'}}>
                ({t('Deduction')})
                </span>
              </label>
            </div>
            </CCol>
            { PaymentCalculateBasedOnState.isChecked === false &&
          <>
            <CCol lg='6'>
              <CImg src={'/avatars/list.png'} className="titleicon" alt="titleicon" style={{marginLeft:'5px', marginRight: '10px', marginBottom: '5px'}}/>
              <CLabel className="middle">{t('Paid Type')}</CLabel>
              <span style={{color: 'red'}}>*</span>
              <br></br>
              <div style={{textAlign: 'center', margin: "10px"}}>
              <label className={`${PaidTypeIncluded}`}>{t('Basic Salary')}</label>
              <div className="leave-type-toggle-switch">
                <input
                type="checkbox"
                className="leave-type-toggle-switch-checkbox"
                name='Paid Type'
                id='paid_type'
                checked={PaidTypeState.isChecked}
                onChange={PaidTypeChecked}
                />
                <label className="leave-type-toggle-switch-label" htmlFor='paid_type'>
                <span className='leave-type-toggle-switch-inner-1' />
                <span className="leave-type-toggle-switch-switch" />
                </label>
              </div>
              <label className={`${PaidTypeNotIncluded}`}>{t('Total Salary')}
                <span style={{color: 'red', paddingLeft: '5px'}}>
                  ({t('Not include Daily Allowance')})
                </span></label>
            </div>
            </CCol>
            </>
            }
          </CRow>


          { PaymentCalculateBasedOnState.isChecked === true &&
          <>
          <CRow style={{display:'flex', marginTop: '15px'}}>
            <CCol>
              <CImg src={'/avatars/list.png'} className="titleicon" alt="titleicon" style={{marginLeft:'5px', marginRight: '10px'}}/>
              <CLabel className="middle">{t('Deduction Based On')}</CLabel>
              <span style={{color: 'red'}}>*</span>
            </CCol>
          </CRow>
          <div className="leave-time-count">
          <div className='deduction-based-on-method'>

            <CButtonGroup className="pay-basic-total-fixed">
            {/* { deductionBasedOnSalary != ""  &&
              deductionBasedOnSalary.map((i,index) => {
                return(
                  <CButton
                    value={i.id}
                    value={i.description}
                    onClick={BasedOnClick}>
                      {t(i.description)}
                    </CButton>
                )}
            } */}
              <CButton
                value="1"
                className="pay-basic btnGroup2"
                value='Basic Salary'
                onClick={basicChange}  >{t('Basic Salary')}</CButton>
              <CButton
                value="2"
                className="pay-total"
                value='Total Salary'
                onClick={totalChange}  >{t('Total Salary')}</CButton>
              <CButton
                value="3"
                className="pay-fixed"
                value='Fixed Amount'
                onClick={fixedChange}  >{t('Fixed Amount')}</CButton>
            </CButtonGroup>
          </div>
          { mainTable != ""  &&
          <div className = 'test container'>
          { totalSalary === true &&
            totalSalaryList.map((i,index) => {
              return(
              <div key = {index} >
                <CRow lg='12' style={{marginLeft: '10px', marginBottom: '10px'}} >
                  <CInputRadio
                    className="deduction-based-on-radio leave-deduction-based-on"
                    type="radio"
                    align='right'
                    name=""
                    value={i.id}
                    onChange={DeductionBasedOnChange}
                  />
                  <span>{i.description}</span>
                  {i.id == 2 &&
                    <CCol lg='1'>
                      <CInput type="text" onChange={TotalSalaryBasedOnMethod2} style={{position: 'absolute', height: '28px'}}/>
                    </CCol>
                  }
                  {i.id == 8 &&
                    <CCol lg='1'>
                      <CInput type="text" onChange={TotalSalaryBasedOnMethod8} style={{position: 'absolute', height: '28px'}}/>
                    </CCol>
                  }
                  <span>*</span>
                  {/* <CCol lg='4' className="" style={{textAlign:'right'}}>
                    <CLabel className="middle">{t('(one hour)')}</CLabel>
                  </CCol>  */}
                </CRow>
              </div>
              )
            })
          }
          { totalSalary === true &&
            <CRow>
              <CCol lg='2' style={{textAlign:'right'}}>
                <CLabel className="middle">{t('Multiply By')}</CLabel>
                <span>*</span>
              </CCol>
              <CCol lg='4' >
                <TextField
                  // placeholder={t('Enter Amount')}
                  // onChange={FixedAmountChange}
                />
              </CCol>
            </CRow>
          }

          { basicSalary === true &&
            basicSalaryList.map((i,index) => {
              return(
              <div key = {index} >
                <CRow lg='12' style={{marginLeft: '10px', marginBottom: '10px'}} >
                  <CInputRadio
                    className="deduction-based-on-radio leave-deduction-based-on"
                    type="radio"
                    align='right'
                    name=""
                    value={i.id}
                    onChange={DeductionBasedOnChange}
                  />
                  <span>{i.description}</span>
                  {i.id == 2 &&
                    <CCol lg='1'>
                      <CInput type="text" onChange={BasicSalaryBasedOnMethod2} style={{position: 'absolute', height: '28px'}}/>
                    </CCol>
                  }
                  {i.id == 8 &&
                    <CCol lg='1'>
                      <CInput type="text" onChange={BasicSalaryBasedOnMethod8} style={{position: 'absolute', height: '28px'}}/>
                    </CCol>
                  }
                  <span>*</span>
                  {/* <CCol lg='4' className="" style={{textAlign:'right'}}>
                    <CLabel className="middle">{t('(one hour)')}</CLabel>
                  </CCol>  */}
                </CRow>
              </div>
              )
            })
          }

          { basicSalary === true &&
            <CRow>
              <CCol lg='2' style={{textAlign:'right'}}>
                <CLabel className="middle">{t('Multiply By')}</CLabel>
                <span>*</span>
              </CCol>
              <CCol lg='4' >
                <TextField
                  // placeholder={t('Enter Amount')}
                  // onChange={FixedAmountChange}
                />
              </CCol>
            </CRow>
          }

          { fixedAmount === true &&
            <>
              <CRow style={{paddingRight: '10px'}}>
                <CCol lg='12' style={{textAlign:'center'}}>
                  <CLabel style={{paddingRight: '10px'}}>{t('Fixed Amount')}</CLabel>
                  <TextField
                    placeholder={t('Enter Amount')}
                    onChange={FixedAmountChange}
                  />
                </CCol>
              </CRow>
            </>
                }
              </div>
              }
            </div>
          </>
          }

          {/* Save/Cancel Buttom Start */}
          <CRow style={{display: 'flex', marginTop: '15px', marginBottom: '10px'}} className="" lg="12">
            <CCol style={{textAlign:"center"}}>
              <CButton className="form-btn" onClick={saveAllData}>Save</CButton>
            </CCol>
          </CRow>
          {/* Save/Cancel Buttom End */}
          {/* Table Panel Start */}
          {
          mainTable != ""  &&
          <CCard className='table-panel'>
            <CRow id="table">
              <CCol lg="12">
                <CCol lg="12">
                  <CRow alignHorizontal="end">
                    <div className="row-count-msg">{rowCount}</div>
                  </CRow>
                </CCol>
                <div className="table-responsive">
                  <table className="table">
                    <thead id="thead-id">
                      <tr width="100%">
                        <th width="" className="" style={{textAlign:'center'}}>
                          <input type="checkbox"
                            value="all-check"
                            checked={AllCheck === true}
                            onChange={change_checkbox}
                          />
                        </th>
                        <th width="" className="">
                          { t('Leave ID') }
                        </th>
                        <th width="" className="">
                          { t('Leave Name') }
                        </th>
                        <th width="" className="">
                          { t('Total Maximum Allowed Days') }
                        </th>
                        <th width="" className="">
                          { t('One Time Maximum Allowed Days') }
                        </th>
                        <th width="" className="">
                          { t('Maximum Carry Allowed Days') }
                        </th>
                        <th width="" className="">
                          { t('Calculate Based') }
                        </th>
                        <th width="" className="" colSpan='2'>
                          { t('Edit') }
                        </th>
                      </tr>
                    </thead>
                    <tbody >
                    {
                      mainTable != ""  &&
                      mainTable.map( (i,index) => {
                        return(
                          <tr key={index} width="100%">
                            <td className="td-num" style={{borderLeft:'3px solid #858BC3',textAlign:"right"}}>
                              <input type="checkbox"
                                value={i.id}
                                id={i.id}
                                checked={i.is_checked === true}
                                onChange={change_checkbox}/>
                            </td>
                            <td width="" className="t d-emp-id" style={{textAlign:"right"}}>
                            {i.id}
                            </td>
                            <td width="" style={{textAlign:"left"}}>
                            {i.leave_name}
                            </td>
                            <td width="" className="td-emp-name" style={{textAlign:"right"}}>
                            {i.total_max_day}
                            </td>
                            <td width="" className="td-dept" style={{textAlign:"right"}}>
                            {i.onetime_max_day}
                            </td>
                            <td width="" className="td-overtime-title" style={{textAlign:"right"}}>
                            {i.m_c_a_d}
                            {/* unknow */}
                            </td>
                            <td width="" className="td-o-t-m-a-d">
                            {i.basedonmethods.description}
                            </td>
                            <td width="" className="">
                            <CImg
                              id = {i.id}
                              src={'../avatars/edit.png'}
                              className="icon-clt"
                              alt="edit"
                              onClick={editToggleAlert.bind(this,i)}
                            />
                            </td>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
                </div>
              </CCol>
            </CRow><br/>
          </CCard>
          }
          {/* Table Panel End */}
          <CRow lg="12">
            <CCol style={{textAlign:"center"}}>
            {
              mainTable != ""  &&
              <CButton className="form-btn"
              id  = 'deleteBtn'
              name = 'deleteBtn'
              onClick={deleteToggleAlert}
              >{t('Delete')}</CButton>
            }
            {
              deleteModalBox === true &&
              <CModal centered closeOnBackdrop={false}
                className='deleteModal'
                htmlFor='deleteBtn'
                show={deleteModalBox}
                onClose={deleteToggleAlert}
              >
                <CModalHeader closeButton>
                  {t('Delete Confirmation')}!
                </CModalHeader>
                <CModalBody>
                <CRow className="confirm-header" alignHorizontal="center">
                <p>{t('Are you sure want to delete?')}</p>
                </CRow>
                <CButtonToolbar className="confirm-body" justify="center">
                <CButton className="confirm-btn" active onClick={deleteOK}>{t('Ok')}</CButton>
                <CButton className="cancel-btn" onClick={deleteToggleAlert}>{t('Cancel')}</CButton>
                </CButtonToolbar>
                </CModalBody>
              </CModal>
            }
            {
              editModalBox === true &&
              <CModal centered closeOnBackdrop={false}
                className='editModal'
                htmlFor='editBtn'
                show={editModalBox}
                onClose={editOnClose}
              >
                <CModalHeader closeButton>
                  {t('Update Confirmation')}!
                </CModalHeader>
                <CModalBody>
                <CRow className="confirm-header" alignHorizontal="center">
                <p>{t('Are you sure want to edit?')}</p>
                </CRow>
                <CButtonToolbar className="confirm-body" justify="center">
                <CButton className="confirm-btn" active onClick={editOK}>{t('Ok')}</CButton>
                <CButton className="cancel-btn" onClick={editOnClose}>{t('Cancel')}</CButton>
                </CButtonToolbar>
                </CModalBody>
              </CModal>
            }
          </CCol>
        </CRow>




        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FormData/>
  </>
  );

  }

const Welcome = withTranslation()(LegacyWelcomeClass);

const LeaveTypeRegistration = () => {
  return (
   <Welcome />
  )
}

export default LeaveTypeRegistration

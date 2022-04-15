/**
* Payment Name Register
*
* @author  Nay Zaw Linn
* @create  22/04/2021 (D/M/Y)
* @param
* @return
*/

import React, { lazy,useState,useEffect, useCallback } from 'react';
import { checkNullOrBlank, onlyAllowDecimalInteger } from '../../hr-common/common-validation/CommonValidation'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CImg, CLabel, CForm, CInput, CSelect, CTextarea, CModal, CModalHeader, CModalBody } from '@coreui/react';
import message from '../../hr-common/common-message/CommonMessage';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import FormData from './FormData';
import Loading from '../../../brycen-common/loading/Loading';
import { SelectCurrency } from '../../hr-common/select-currency/SelectCurrency';

function LegacyWelcomeClass ({t, i18n}) {
    const [error,setError]= useState([]);
    const [success,setSuccess]= useState([]);
    const [paybankName,setPayBankName]= useState(""); // use for payment/bank name
    const [currencyType,setCurrencyType]= useState([]); // use for currency type MMK, USD,..
    const [address,setAddress]= useState(""); // use for Address
    const [phoneNo,setPhoneNo]= useState(""); // use for Phone
    const [priority,setPriority]= useState(""); // use for Priority
    const [transferMethod,setTransferMethod]= useState({isChecked: false}); // use for Transfer Method
    const [directTextbox,setDirectTextbox]= useState(""); // use for System Direct Header Setting Textbox
    const [downloadTextbox,setDownloadTextbox]= useState(""); // use for Manual Download Header Setting Textbox
    const [systemDirect,setSystemDirect]= useState([]); // use for System Direct Header Setting
    const [manualDownload,setManualDownload]= useState([]); // use for Manual Download Header Setting
    const [saveModalBox, setSaveModalBox] = useState(false); // for Save button confirmation
    const [rowCount, setRowCount] = useState(""); // for row count
    const [mainTable,setMainTable]= useState([]); // use for Main Table for Payment Name List
    const [allChecked, setAllChecked] = useState(false);      // use for select checkbox all or not
    const [deleteDataList, setDeleteDataList] = useState(''); // use for delete data list
    const [deleteModalBox, setDeleteModalBox] = useState(false); // for Delete button confirmation
    const [editModalBox, setEditModalBox] = useState(false); // for Edit button confirmation
    const [editDataID, setEditDataID]= useState(""); // for Edit data
    const [companyID, setCompanyId]                 = useState(localStorage.getItem('COMPANY_ID'));
    
    const [currencyData,setCurrencyData]= useState([ // use for Currency Type from database
        // {id : 1, currency_name: "Kyat", currency_desc: "MMK", "main_flag": 1 },
        // {id : 2, currency_name: "Dollor", currency_desc: "USD","main_flag": 1 },
    ]);


    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);
    const [currencyFor, setCurrencyFor] = useState('currency');
    const [method, setMethod] = useState('transfer');
    const [loading, setLoading] = useState(false);

    /**
    * page load
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        loadCurrency();
        getPaymentList();
    }, []);

    const scrollTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }

    /**
    * get currency data from API
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadCurrency = async () => {
        let obj = { method: 'get', url: 'api/currencies' }
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setError([]); scrollTop();
        }else{
            setCurrencyData(response.data.data);
        }
    }

    /**
    * get payment list from API
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    const getPaymentList = async () => {
        setAllChecked(false); setDeleteDataList('');
        let obj = { method: 'get', url: 'api/payment-name-register' }
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setMainTable([]); scrollTop();
        }else{
            setRowCount(response.data.row_count); setMainTable(response.data.data);
        }
    }

    /**
    * change currency (MMK/USD)
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    let payrollTypeChange=(e)=>{
        let value = e.target.value;
        let checked = e.target.checked;
        let data, id_list  = [];
        data = currencyData.map(payment =>
            payment.id === parseInt(value) ? { ...payment, is_checked: checked } : payment
        )
        for(let i = 0; i < data.length; i++){
            if(data[i].is_checked === true){
                id_list.push(data[i].id);
            }
        }
        setCurrencyType(id_list); setCurrencyData(data);
    }

    /**
    * reset to default for currency
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    let resetCurrency = () => {
        let data = [];
        currencyData.forEach((item, i) => {
            data.push({ ...item, is_checked: false });
        });
        setCurrencyData(data);
    }

    /**
    * choose transfer method
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    let transferMethodChecked = () => {
        setTransferMethod( { isChecked: !transferMethod.isChecked } );
    }

    /**
    * add data in system direct header setting
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    let addSystemDirect =()=>{
        let temp = []; setError([]); setSuccess([]);
        if(checkNullOrBlank(directTextbox)){
            if(!checkNullOrBlank(systemDirect)){
                temp.push({
                    "id": 1,
                    "header_name": directTextbox
                })
                setSystemDirect(temp);
            }else{
                systemDirect.push({
                    "id": systemDirect.length +1,
                    "header_name": directTextbox
                })
                setSystemDirect(systemDirect);
            }
            setDirectTextbox("");
        }else{
            let errMsg = t(message.JSE005).replace('%s',t('System Direct Header Setting Textbox'));
            setError([errMsg]); scrollTop();
        }
    }

    /**
    * delete data from system direct header setting table
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    let directDeleteChanged=(e)=>{
        let id = e['id'];
        let value = systemDirect.filter(data=>data.id != id);
        setSystemDirect(value);
    }

    /**
    * add data in manual download header setting
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    let addManualDownload =()=>{
        let temp = []; setError([]); setSuccess([]);
        if(checkNullOrBlank(downloadTextbox)){
            if(!checkNullOrBlank(manualDownload)){
                temp.push({
                    "id": 1,
                    "header_name": downloadTextbox
                })
                setManualDownload(temp);
            }else{
                manualDownload.push({
                    "id": manualDownload.length + 1,
                    "header_name": downloadTextbox
                })
                setManualDownload(manualDownload);
            }
            setDownloadTextbox("");
        }else{
            let errMsg = t(message.JSE005).replace('%s',t('Manual Download Header Setting Textbox'));
            setError([errMsg]); scrollTop();
        }
    }

    /**
    * delete data from manual download header setting table
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    let downloadDeleteChanged=(e)=>{
        let id = e['id'];
        let value = manualDownload.filter(data=>data.id != id);
        setManualDownload(value);
    }

    /**
    * click save
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    let saveData = () => {
        let errMsg = []; setError([]); setSuccess([]);
        if(!checkNullOrBlank(paybankName)){
            let str = t(message.JSE005).replace('%s',t('Payment/Bank Name'));
            errMsg.push(str);
        }
        if(!checkNullOrBlank(currencyType)){
            let str = t(message.JSE001).replace('%s',t('Currency'));
            errMsg.push(str);
        }
        if(!checkNullOrBlank(address)){
            let str = t(message.JSE005).replace('%s',t('Address'));
            errMsg.push(str);
        }
        if(!checkNullOrBlank(phoneNo)){
            let str = t(message.JSE005).replace('%s',t('Phone'));
            errMsg.push(str);
        }
        if(checkNullOrBlank(phoneNo)){
            if(!onlyAllowDecimalInteger(phoneNo)){
                let str = t(message.JSE005).replace('%s',t('Phone Number Only'));
                errMsg.push(str);
            }
        }
        if(!checkNullOrBlank(systemDirect)){
            let str = t(message.JSE005).replace('%s',t('System Direct Header Setting'));
            errMsg.push(str);
        }
        if(!checkNullOrBlank(manualDownload)){
            let str = t(message.JSE005).replace('%s',t('Manual Download Header Setting'));
            errMsg.push(str);
        }
        if(checkNullOrBlank(errMsg)){
            setError(errMsg); scrollTop();
        }else{
            setType('save'); setContent(t('Are you sure want to save?')); setShow(!show);
        }
    }

    /**
    * confirm save
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    const saveOK = async () => {
        setShow(!show); setType(''); setContent(''); setLoading(true);
        let transfer_method = "";
        if(transferMethod.isChecked === false){
            transfer_method = 1; // System Direct
        }else{
            transfer_method = 2; // Manual Download
        }

        if(editDataID === ""){ // REGISTER MODE
            let obj = { method: 'post', url: 'api/payment-name-register', params: {
                "company_id": companyID, // session read from ERP
                "bank_name": paybankName,
                "currency": currencyType,
                "address": address,
                "phone": phoneNo,
                "parent_priority": priority,
                "transfer_method": transfer_method,
                "system_direct": systemDirect,
                "manual_download":manualDownload,
                "created_emp": 20000, // session read from ERP
                "updated_emp": 20000, // session read from ERP
            } }
            let response = await ApiRequest(obj);
            scrollTop(); setLoading(false);
            if(response.flag === false){
                setError(response.message); setSuccess([]);
            }else{
                setPayBankName(''); setCurrencyType([]); setAddress(''); setPhoneNo(''); setPriority(''); setTransferMethod({isChecked:false}); setDirectTextbox(''); setDownloadTextbox(''); setSystemDirect([]); setManualDownload([]); resetCurrency();
                setError([]); setSuccess([response.data.message]); getPaymentList();
            }
        }else{ // EDIT MODE
            let obj = { method: 'put', url: `api/payment-name-register/${editDataID}`, params: {
                "company_id": companyID, // session read from ERP
                "bank_name": paybankName,
                "currency": currencyType,
                "address": address,
                "phone": phoneNo,
                "parent_priority": priority,
                "transfer_method": transfer_method,
                "system_direct": systemDirect,
                "manual_download":manualDownload,
                "created_emp": 20000, // session read from ERP
                "updated_emp": 20000, // session read from ERP
            } }
            let response = await ApiRequest(obj);
            scrollTop(); setEditDataID(''); setLoading(false);
            if(response.flag === false){
                setError(response.message); setSuccess([]);
            }else{
                setPayBankName(''); setCurrencyType([]); setAddress(''); setPhoneNo(''); setPriority(''); setTransferMethod({isChecked:false}); setDirectTextbox(''); setDownloadTextbox(''); setSystemDirect([]); setManualDownload([]); resetCurrency();
                setError([]); setSuccess([response.data.message]); getPaymentList();
            }
        }
    }

    /**
    * checkbox function for payment table
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    const checkboxChanged = (i) => {
        let value = i.target.value;
        let checked = i.target.checked;
        let data;
        let id_list  = [];

        if( value === "allcheck" ){
            data = mainTable.map(item => ({ ...item, is_checked: checked }));
        }else{
            data = mainTable.map(item =>
                item.id === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }

        for(let i = 0; i < data.length; i++){
            if(data[i].is_checked === true){
                id_list.push(data[i].id);
            }
        }
        var x = id_list.toString();
        setDeleteDataList(x);

        setAllChecked(data.every(item => item.is_checked));
        setMainTable(data);
    }

    /**
    * click edit button in table
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    let editData = (e) => {
        setError([]); setSuccess([]);
        setEditDataID(e['id']); setType('edit'); setContent(t('Are you sure want to edit?')); setShow(!show);
    }

    /**
    * confirm edit
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    const editOK = async () =>{
        setShow(!show); setType(''); setContent(''); setLoading(true);

        let edit_id = editDataID;
        let payment_list = [];
        let obj = { method: 'get', url: `api/payment-name-register/${edit_id}`, params: {} }
        let response = await ApiRequest(obj);
        scrollTop(); setLoading(false);
        if(response.flag === false){
            setError(response.message); setEditDataID(""); setSuccess([]);
        }else{
            setPayBankName(response.data.data.bank_name);
            setAddress(response.data.data.address);
            setPhoneNo(response.data.data.phone);
            setPriority(response.data.data.parent_priority);
            let t_method = response.data.data.transfer_method;
            if(t_method === 2){
                setTransferMethod( { isChecked: !transferMethod.isChecked } );
            }
            setSystemDirect(response.data.data.bankexelheadersystemdirect);
            setManualDownload(response.data.data.bankexelheadermanualdownload);

            let curTemp = response.data.data.bankcurrencies;
            let curData = await SelectCurrency(curTemp, currencyData);
            setCurrencyType(curData.tempID); setCurrencyData(curData.tempArray);
        }
    }

    /**
    * click delete button
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    let deleteData=()=>{
        setSuccess([]); setError([]);
        if(!checkNullOrBlank(deleteDataList)){
            let errMsg = t(message.JSE001).replace('%s',t('the checkbox you want to delete'));
            setError([errMsg]); scrollTop();
        }else{
            setContent(t('Are you sure want to delete?')); setType('delete'); setShow(!show); setError([]); setSuccess([]);
        }
    }

    /**
    * confirm delete
    *
    * @author  Nay Zaw Linn
    * @create  22/04/2021 (D/M/Y)
    * @param
    * @return
    */
    const deleteOK = async () =>{
        setShow(!show); setContent(''); setType(''); setLoading(true);
        let obj = { method: 'delete', url: `api/payment-name-register`, params: {
            "company_id": companyID, // session read from ERP
            "bank_id": deleteDataList,
            "updated_emp": 20000, // session read from ERP
        } }
        let response = await ApiRequest(obj);
        scrollTop(); setLoading(false);
        if(response.flag === false){
            setError(response.message);
        }else{
            setSuccess([response.data.message]);
        }
        getPaymentList();
    }

    return (<>
        <Loading start={loading} />
        <Message success={success} error={error} error2={[]} />
        <Confirmation content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show} cancel={()=>setShow(!show)} saveOK={saveOK} editOK={editOK} deleteOK={deleteOK}/>
        <FormData
            paybankName={paybankName} changePayBankName={(e)=>setPayBankName(e.target.value)}
            currencyData={currencyData} changeCurrency={payrollTypeChange} currencyFor={currencyFor}
            address={address} changeAddress={(e)=>setAddress(e.target.value)} phone={phoneNo} changePhone={(e)=>setPhoneNo(e.target.value)}
            priority={priority} changePriority={(e)=>setPriority(e.target.value)}
            label1={t('System Direct')} label2={t('Manual Download')} methodCheck={transferMethod.isChecked} changeMethod={transferMethodChecked.bind(this)} transferMethod={transferMethod} method={method}
            changeDirectTextbox={(e)=>setDirectTextbox(e.target.value)} directTextbox={directTextbox} clickDirectTextbox={addSystemDirect} systemDirect={systemDirect} directDeleteChanged={directDeleteChanged} directLabel={t('System Direct Header Setting')}
            changeDownloadTextbox={(e)=>setDownloadTextbox(e.target.value)} downloadTextbox={downloadTextbox} addManualDownload={addManualDownload} manualDownload={manualDownload} downloadDeleteChanged={downloadDeleteChanged} manualLabel={t('Manual Download Header Setting')}
            saveData={saveData}
            mainTable={mainTable} rowCount={rowCount} allChecked={allChecked} checkboxChanged={checkboxChanged} editData={editData} deleteData={deleteData}
        />
    </>)
}

export default withTranslation()(LegacyWelcomeClass)

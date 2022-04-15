/* eslint-disable no-use-before-define */
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLabel,
    CRow
} from '@coreui/react';
import $ from "jquery";
import Moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { isEmpty, validateNumberOnly } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import HeaderBox from '../../hr-common/employee-personal-header-box/HeaderBox';
import EducationAttachFileTable from './EducationAttachFileTable';
import EducationBox from './EducationBox';
import EducationContractFileTable from './EducationContractFileTable';
import EmployeePersonalBox from './EmployeePersonalBox';
import ModalAccountRegister from './ModalAccountRegister';
import PersonalDetailsBox from './PersonalDetailsBox';
import PersonalDetailsDeparmentDataTable from './PersonalDetailsDeparmentDataTable';
import PersonalDetailsPaymentBox from './PersonalDetailsPaymentBox';
import PersonalDetailsPaymentSettingTable from './PersonalDetailsPaymentSettingTable';
import SaveEmployeePersonal from './SaveEmployeePersonal';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const history = useHistory(); // For edit link

    const [selectedFromDate, setSelectedFromDate] = useState(null); // For Joined Start Date
    const [selectedToDate, setSelectedToDate] = useState(null); // For Joined End Date
    const [selectedContractStartDate, setSelectedContractStartDate] = useState(null);
    const [selectedContractEndDate, setSelectedContractEndDate] = useState(null);
    const [mainTable, setMainTable] = useState([]);
    const [ profileShow, setProfileShow ] = useState(false);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);

    const [addModalBox, setAddModalBox] = useState(false);
    const [accountNumber, setAccountNumber] = useState(""); // value Account Number
    const [errorModal, setErrorModal] = useState([]);
    const [contractFile, setContractFile] = useState(false);
    const [listContractFile, setListContractFile] = useState([]);
    const [listAttachFile, setListAttachFile] = useState([]);
    const [editData, setEditData] = useState("");
    const [overWriteModalBox, setoverWriteModalBox] = useState(false); // for overwrite save button confirmation
    const [image, setImage] = useState("");
    const [saveModalBox, setSaveModalBox] = useState(false); // for save button confirmation
    const [avatar, setAvatar] = useState([]);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [isNew, setIsNew] = useState(false);


    // Loaded initially
    useEffect(() => {
        setLoading(true);

        let object = JSON.parse(sessionStorage.getItem("RETURN_EMP_LIST_ID_EDIT")); // return data from EMPLOYEE List Form
        // sessionStorage.removeItem("RETURN_EMP_LIST_ID_EDIT")

        let edit_Data
        if (!object) {
            history.push('./employee-list')
        }
        else if (object) {
            edit_Data = object.id;
            setIsNew(object.is_new);
            loadViewPermission();
            loadCurency();
        }

        if (edit_Data != null) {

            let edit_id = edit_Data;
            setEditData(edit_id);setProfileShow(true);
            editIndex(edit_id);
        }
    }, [loadCurency, loadBank, loadViewPermission]);


    let accountNumberChange = (e) => {
        setAccountNumber(e.target.value);
    };

    /* Show dropdown toggle */
    let handleFromDateChange = (e) => {
        if (e) {
            let formatDate = Moment(e).format('YYYY-MM-DD');
            setSelectedFromDate(formatDate);
        }
        else {
            setSelectedFromDate(e);
        }

    };
    let handleToDateChange = (e) => {
        if (e) {
            let formatDate = Moment(e).format('YYYY-MM-DD');
            setSelectedToDate(formatDate);
        }
        else {
            setSelectedToDate(e);
        }
    };
    let handleContractEndDateChange = (e) => {
        if (e) {
            let formatDate = Moment(e).format('YYYY-MM-DD');
            setSelectedContractEndDate(formatDate);
        }
        else {
            setSelectedContractEndDate(e);
        }
    };
    let handleContractStartDateChange = (e) => {
        if (e) {
            let formatDate = Moment(e).format('YYYY-MM-DD');
            setSelectedContractStartDate(formatDate);
        }
        else {
            setSelectedContractStartDate(e);
        }
    };
    let removeFromDate = () => {
        setSelectedFromDate(null);
    }
    let removeToDate = () => {
        setSelectedToDate(null);
    }
    let removeContractStartDate = () => {
        setSelectedContractStartDate(null);
    }
    let removeContractEndDate = () => {
        setSelectedContractEndDate(null);
    }

    /**Start Detail */
    /* GET CURRENCY */
    const [currencyAPI, setCurrencyAPI] = useState([]);
    const loadCurency = async () => {
        let obj = { package_name: 'hr', url: ApiPath.EmployeePersonalGetCurrency, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            let data = response.data.data;
            setCurrencyAPI(data);
            loadBank(data);
        }
    }

    const [currencyState, setCurrencyState] = useState("");
    let chooseCurrency = (e) => {
        let currency_ = {
            currency_desc: e.target.value,
            id: e.target.id
        }
        setCurrencyState(currency_);
    }

    /* GET VIEW PERMISSION */
    const [viewPermissionAPI, setViewPermissionAPI] = useState('');
    const loadViewPermission = async () => {
        let params = {
            login_employee_id: ApiPath.loginEmp
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            setViewPermissionAPI(parseInt(response.data.view_permission));
        }
    };

    /**GET BANK */
    const [bankAPI, setBankAPI] = useState([]);
    const loadBank = async (currency_data) => {
        let emp_id = JSON.parse(sessionStorage.getItem("RETURN_EMP_LIST_ID_EDIT"));
        let params = {
            company_id: ApiPath.companyID,
            employee_id: emp_id ? emp_id.id : ""
        }
        let obj = { package_name: 'hr', url: ApiPath.EmployeePersonalGetBank, method: 'get', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            let data = response.data.data;
            setBankAPI(data);
            let currency_after = [];
            currency_data.map(i => {
                data.bank_info.map(item => {
                    item.currency.map(it => {
                        if (i.id === it.currency_id) {
                            currency_after.push(i);
                        }
                    })
                })
            })
            if (currency_after.length > 0) {
                currency_after = currency_after.filter(onlyUnique)
                let currency = {
                    currency_desc: currency_after[0].currency_desc,
                    id: currency_after[0].id
                }
                setCurrencyState(currency);
            }
        }

    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const [bankState, setBankState] = useState('');
    let bankChange = (e) => {
        if (!isEmpty(e.target.value)) {
            let object = {
                id: e.target.value,
                bank_name: e.target.options[e.target.selectedIndex].attributes.bank_name.value
            }
            setBankState(object);
            getCurrencyByBankId(parseInt(e.target.value));
            clearChecked();
        } else setBankState("");
    }
    const clearChecked = () => {
        var ele = document.getElementsByName("currency");
        for (var i = 1; i < ele.length; i++) {
            ele[i].checked = false;
            ele[0].checked = true;
        }
    }

    const [checkbank, setCheckBank] = useState(true);
    const [currencyByBankId, setCurrencyByBankId] = useState([]);
    const getCurrencyByBankId = (id) => {
        setCurrencyByBankId([]);
        bankAPI.bank_info.map(item => {
            if (item.id === id) {
                item.currency.map(i => setCurrencyByBankId(currencyByBankId => [...currencyByBankId, i.currency_id]));
            }
        })
        if (bankAPI.bank_info[0].currency.length === 1) {
            setCheckBank(false);
        };
    }

    /**GET DETAIL */
    const [tableAttachFile, setTableAttachFile] = useState([]);
    const [tableContractFile, setTableContractFile] = useState([]);
    const [tablePaymentSetting, setTablePaymentSetting] = useState([]);
    const [tableDeparment, setTableDepartment] = useState([]);
    const [detailAPI, setDetailAPI] = useState([]);

    /**End Edit */
    const [currencySetting, setCurrencySetting] = useState([]);
    let editIndex = async (edit_id) => {

        let url = `${ApiPath.EmployeePersonalGetDetail}${edit_id}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        }
        else {
            let data = response.data.data;
            setDetailAPI([data]);
            setTableDepartment(data.employee_has_dept_position);
            let result_data = [];
            data.payment_transfer_list.forEach(item => {
                item.priority_list.forEach((sec, idx) => {
                    sec = { ...sec, employee_account_id: sec.employee_account_id, currency_desc: item.currency_desc, currency_id: item.currency_id }
                    result_data.push(sec)
                })
            })
            setTablePaymentSetting(result_data);
            setTableAttachFile(data.employee_has_upload_info.attach_file);
            setTableContractFile(data.employee_has_upload_info.contract_file)
            setSSBNumber(data.ssb_number);
            setEmployeeType(data.employee_type);
            setGender(data.gender);
            setMaritalStatus(data.marital_status);
            setEducation(data.education);
            setEligible(data.eligible_noneligible);
            setQualification(data.other_qualification);
            setAddress(data.addressess.address);
            setPhoneNumber(data.addressess.phone);
            setImage(data.avatar_path);
            setSelectedFromDate(data.join_date ? data.join_date.substring(0, 10) : null);
            setSelectedToDate(data.date_of_birth ? data.date_of_birth.substring(0, 10) : null);
            setSelectedContractStartDate(data.contract_start_date ? data.contract_start_date.substring(0, 10) : null);
            setSelectedContractEndDate(data.contract_end_date ? data.contract_end_date.substring(0, 10) : null);
            setCurrencySetting(data.payment_transfer_list);
        }
    }

    /**End Edit */


    /** Start Click remove function */
    const [listRemoveAttach, setListRemoveAttach] = useState([]);
    const [listRemoveContract, setListRemoveContract] = useState([]);

    const removeRowPayment = (e) => {

        let result_data = []; // to remove data by click icon
        result_data = tablePaymentSetting.filter((item) => item.employee_account_id != e["employee_account_id"]);
        setTablePaymentSetting(result_data);

    };

    const removeRowAttachFile = (e) => {

        let result_data = []; // to remove data by click icon
        result_data = tableAttachFile.filter((item) => item.employee_document_name != e["employee_document_name"]);

        let removeAttach = [];
        removeAttach = tableAttachFile.filter((item) => item.employee_document_name == e["employee_document_name"]);
        listRemoveAttach.push(removeAttach);
        setListRemoveAttach(listRemoveAttach);
        setTableAttachFile(result_data);
    };

    const removeRowContractFile = (e) => {

        let result_data = []; // to remove data by click icon
        result_data = tableContractFile.filter((item) => item.employee_document_name != e["employee_document_name"]);

        let removeContract = [];
        removeContract = tableContractFile.filter((item) => item.employee_document_name == e["employee_document_name"]);
        listRemoveContract.push(removeContract)
        setListRemoveContract(listRemoveContract);
        setTableContractFile(result_data);

    };

    /** End Click remove function */


    /**Start Download File */
    const downLoadAttachFile = async (e) => {

        let params = {
            company_id: ApiPath.companyID,
            file_id: e.id,
            employee_id: ApiPath.createdEmp,
            device_flag: 1
        }
        setLoading(true);
        let obj = { package_name: "hr", url: ApiPath.EmployeePersonalDownload, method: 'post', params, type: 'arraybuffer' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', e.employee_document_name); //or any other extension
            document.body.appendChild(link);
            link.click();
        }
    }

    const downLoadContractFile = async (e) => {
        let params = {
            company_id: ApiPath.companyID,
            file_id: e.id,
            employee_id: ApiPath.createdEmp,
            device_flag: 1
        }
        setLoading(true);
        let obj = { package_name: "hr", url: ApiPath.EmployeePersonalDownload, method: 'post', params, type: 'arraybuffer' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', e.employee_document_name); //or any other extension
            document.body.appendChild(link);
            link.click();
        }
    }
    /**End Download File */

    /* ADD ACCOUNT REGISTER MODAL BOX */
    const RegisterAccount = (e) => {
        setError([]);
        setSuccess([]);
        setAccountNumber("");
        if (isEmpty(bankState)) {
            setError([t('JSE126').replace('%s', t('Payment Name'))]);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else {
            setError("");
            setErrorModal("");
            setAddModalBox(!addModalBox);
        }
    };
    const addOnClose = () => {
        setAddModalBox(false);
    };
    const closeSaveAlert = () => {
        setSaveModalBox(false);
    }
    $(document).keydown(function (event) {
        if (event.keyCode == 27) {
            closeSaveAlert();
            addOnClose();
        }
    });
    const saveAccount = () => {
        let errorMsg = [];
        if (isEmpty(accountNumber)) {
            let errMsg = t('JSE124').replace('%s', t('Account Number'));
            errorMsg.push(errMsg);
        }
        else if (!isEmpty(accountNumber) && !validateNumberOnly(accountNumber)) {
            let errMsg = t('JSE005').replace('%s', t('Account Number'));
            errorMsg.push(errMsg);
        }
        if (errorMsg.length > 0) {
            setErrorModal(errorMsg);
            return;
        }
        else {
            let account = {
                acc_number: accountNumber,
                currency_desc: currencyState.currency_desc,
                bank_name: bankState.bank_name,
                bank_id: bankState.id,
                currency_id: currencyState.id,
                employee_account_id: tablePaymentSetting.length > 0 ? tablePaymentSetting[tablePaymentSetting.length - 1].employee_account_id + 10000 : 1
            }
            let isValid = 0;
            for (var i = 0; i < tablePaymentSetting.length; i++) {
                if (account.acc_number === tablePaymentSetting[i].acc_number &&
                    account.currency_desc === tablePaymentSetting[i].currency_desc &&
                    account.bank_name === tablePaymentSetting[i].bank_name) {
                    setError([accountNumber + t(' is already exists in Payment Setting!')]);
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    addOnClose();
                    isValid++;
                    break;
                }
            }
            if (isValid === 0) {
                tablePaymentSetting.push(account);
                addOnClose();
            }
        }
    }
    const removeMessageModal = () => {
        setErrorModal("");
    }

    //add Attach File
    var index = 0;
    const addAttachFile = () => {
        let attach = {
            browser_id: index,
            cancel_id: index,
            file_id: null,
            file_name: "",
        }
        setListAttachFile(listAttachFile => [...listAttachFile, attach]);
    }

    //add Contract File
    const addContractFile = () => {
        let contract = {
            browser_id: index,
            cancel_id: index,
            file_id: null,
            file_name: "",
        }
        setListContractFile(listContractFile => [...listContractFile, contract]);
    }

    //open Browser
    const [checkBrowser, setCheckBrowser] = useState("");
    const [browser, setBrowser] = useState([]);
    const inputFile = useRef([]);
    const openBrowser = (e) => {
        // inputFile.current.click();
        //let Brow = e.target.attributes.brow.value;
        //setCheckBrowser(Brow);
    };
    const handleFileUpload = (id, e) => {
        let filepath = e.target.value;
        const { files } = e.target;
        if (files && files.length) {
            let filename = files[0].name;

            if (filename.length > 21) {
                filename = filename.substring(0, 9).concat("...").concat(filename.substring(filename.length - 10, filename.length));
            }
            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            let attach = {
                browser_id: filepath,
                cancel_id: index,
                file_id: id,
                file_name: filename,
                file: files[0],
                size: files[0].size
            }
            listAttachFile[id] = attach;
            let newArr = [...listAttachFile]
            setListAttachFile(newArr);
        }
    };

    const onButtonClick = (id, e) => {
        // `current` points to the mounted file input element
        inputFile.current[id].click();
    };

    // Cancel Browser
    const cancel = (id, e) => {
        //check_browser(e.target.attributes.val_cancel.value);
        inputFile.current[id].value = "";
        let attach = {
            browser_id: index,
            cancel_id: index,
            file_id: id,
            file_name: "",
        }
        listAttachFile[id] = attach;
        let newArr = [...listAttachFile]
        setListAttachFile(newArr);
    }

    //check Browser_id
    const check_browser = (e) => {
        let a = e.target.attributes.val_cancel.value;
        setCheckBrowser(a);
    }

    //Contract File
    const inputFileContract = useRef([]);
    const handleFileUploadContract = (id, e) => {
        let filepath = e.target.value;
        const { files } = e.target;
        if (files && files.length) {
            let filename = files[0].name;

            if (filename.length > 21) {
                filename = filename.substring(0, 9).concat("...").concat(filename.substring(filename.length - 10, filename.length));
            }
            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            let contractFile = {
                browser_id: filepath,
                cancel_id: index,
                file_id: id,
                file_name: filename,
                file: files[0],
                size: files[0].size
            }
            listContractFile[id] = contractFile;
            let newArr = [...listContractFile]
            setListContractFile(newArr);
        }
    };

    const onButtonClickContract = (id, e) => {
        // `current` points to the mounted file input element
        inputFileContract.current[id].click();
    };

    // Cancel Browser
    const cancelContract = (id, e) => {
        //check_browser(e.target.attributes.val_cancel.value);
        inputFileContract.current[id].value = "";
        let contractFile = {
            browser_id: index,
            cancel_id: index,
            file_id: id,
            file_name: "",
        }
        listContractFile[id] = contractFile;
        let newArr = [...listContractFile]
        setListContractFile(newArr);
    }

    //Save Data
    let saveData = () => {
        setError('');
        setSuccess([]);
        let errorMsg = [];
        if (isEmpty(selectedFromDate)) {
            let errMsg = t('JSE001').replace('%s', t('Joined Date'));
            errorMsg.push(errMsg);
        }
        if (isEmpty(employeeType)) {
            let errMsg = t('JSE001').replace('%s', t('Employee Type'));
            errorMsg.push(errMsg);
        }
        if (isEmpty(gender)) {
            let errMsg = t('JSE001').replace('%s', t('Gender'));
            errorMsg.push(errMsg);
        }
        if (isEmpty(selectedToDate)) {
            let errMsg = t('JSE001').replace('%s', t('Date Of Birth'));
            errorMsg.push(errMsg);
        }
        for (let i = 0; i < listAttachFile.length; i++) {
            if (listAttachFile[i].file) {
                if (listAttachFile[i].size > 10485760) {
                    let errMsg = t('Attach File').concat(" ").concat(t('JSE10022').replace('%s', listAttachFile[i].file_name));
                    errorMsg.push(errMsg);
                }
            }
        }
        for (let j = 0; j < listContractFile.length; j++) {
            if (listContractFile[j].file) {
                if (listContractFile[j].size > 10485760) {
                    let errMsg = t('Contract File').concat(" ").concat(t('JSE10022').replace('%s', listContractFile[j].file_name));
                    errorMsg.push(errMsg);
                }
            }
        }
        if (isEmpty(SSBNumber)) {
            let errMsg = t('JSE124').replace('%s', t('SSB Number'));
            errorMsg.push(errMsg);
        }
        if (errorMsg.length > 0) {
            setError(errorMsg);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            setContent(t('Are you sure want to save?')); setType('save');
            setSaveModalBox(!saveModalBox);
            setError([]);
            setSuccess([]);
        }
    };

    //Save OK
    const saveOK = async () => {
        setSaveModalBox(!saveModalBox);
        setLoading(true);
        let formData = new FormData();
        formData.append("employee_id", editData);
        formData.append("company_id", ApiPath.companyID ? ApiPath.companyID : "");
        formData.append("created_emp", ApiPath.createdEmp ? ApiPath.createdEmp : "");
        formData.append("updated_emp", ApiPath.updatedEmp ? ApiPath.updatedEmp : "");
        formData.append("joined_date", selectedFromDate ? selectedFromDate : "");
        formData.append("employee_type", employeeType ? employeeType : "");
        formData.append("employee_gender", gender ? gender : "");
        formData.append("date_of_birth", selectedToDate ? selectedToDate : "");
        formData.append("_method", "PUT");
        formData.append("start_contract_date", selectedContractStartDate ? selectedContractStartDate : "");
        formData.append("end_contract_date", selectedContractEndDate ? selectedContractEndDate : "");
        formData.append("eligible", eligible ? eligible : "");
        formData.append("education", education ? education : "");
        formData.append("marital_status", maritalStatus);
        formData.append("other_qualification", qualification ? qualification : "");
        formData.append("ssb_number", SSBNumber ? SSBNumber : "");
        formData.append("add_photo_file", avatar ? avatar : "");
        for (let i = 0; i < listAttachFile.length; i++) {
            if (listAttachFile[i].file) {
                formData.append("add_attach_file[]", listAttachFile[i].file ? listAttachFile[i].file : "");
            }
        }
        for (let j = 0; j < listContractFile.length; j++) {
            if (listContractFile[j].file) {
                formData.append("add_contract_file[]", listContractFile[j].file ? listContractFile[j].file : "");
            }
        }
        if (tablePaymentSetting.length === 0) {
            formData.append("payment_setting", [null]);
        } else {
            for (let k = 0; k < tablePaymentSetting.length; k++) {
                formData.append("payment_setting[" + k + "][acc_number]", tablePaymentSetting[k].acc_number ? tablePaymentSetting[k].acc_number : "");
                formData.append("payment_setting[" + k + "][bank_id]", tablePaymentSetting[k].bank_id ? tablePaymentSetting[k].bank_id : "");
                formData.append("payment_setting[" + k + "][currency_id]", tablePaymentSetting[k].currency_id ? tablePaymentSetting[k].currency_id : "");
            }
        }
        for (let z = 0; z < listRemoveAttach.length; z++) {
            formData.append("deleted_attach_id[" + z + "]", parseInt(listRemoveAttach[z].lastItem.id) ? parseInt(listRemoveAttach[z].lastItem.id) : "");
        }
        for (let w = 0; w < listRemoveContract.length; w++) {
            formData.append("deleted_contract_id[" + w + "]", parseInt(listRemoveContract[w].lastItem.id) ? parseInt(listRemoveContract[w].lastItem.id) : "");
        }
        let params = formData;
        let url;
        if (!isNew) {
            url = `${ApiPath.EmployeePersonalUpdate}${editData}`;
        } else {
            url = `${ApiPath.EmployeePersonalSave}`;
        }
        let obj = { package_name: "hr", url: url, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.data.data && response.data.data.overwrite) {
            setoverWriteModalBox(!overWriteModalBox);
            setContent(t('Data is already exist! Are you sure want to overwrite?')); setType('owsave');
        }
        else if (response.flag === false) {
            setSuccess([]);
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else {
            let status = response.data.message;
            setSuccess([status])
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setTimeout(function () {
                editIndex(editData);
            }, 2500);
            setListAttachFile("");
            setListContractFile("");
            setBankState('');
            clearChecked();
            setIsNew(false);
            let item = {
                id: editData,
                is_new: false
            }
            sessionStorage.setItem('RETURN_EMP_LIST_ID_EDIT', JSON.stringify(item));
        }
    }

    /** Start Overwrite Save Function */
    const closeOWSaveAlert = () => {
        setoverWriteModalBox(!overWriteModalBox);
    };
    const owsaveOK = async () => {
        setoverWriteModalBox(!overWriteModalBox);
        setLoading(true);
        let formData = new FormData();
        formData.append("employee_id", editData);
        formData.append("company_id", ApiPath.companyID ? ApiPath.companyID : "");
        formData.append("created_emp", ApiPath.createdEmp ? ApiPath.createdEmp : "");
        formData.append("updated_emp", ApiPath.updatedEmp ? ApiPath.updatedEmp : "");
        formData.append("joined_date", selectedFromDate ? selectedFromDate : "");
        formData.append("employee_type", employeeType ? employeeType : "");
        formData.append("employee_gender", gender ? gender : "");
        formData.append("date_of_birth", selectedToDate ? selectedToDate : "");
        formData.append("_method", "PUT");
        formData.append("start_contract_date", selectedContractStartDate ? selectedContractStartDate : "");
        formData.append("end_contract_date", selectedContractEndDate ? selectedContractEndDate : "");
        formData.append("eligible", eligible ? eligible : "");
        formData.append("education", education ? education : "");
        formData.append("marital_status", maritalStatus);
        formData.append("other_qualification", qualification ? qualification : "");
        formData.append("ssb_number", SSBNumber ? SSBNumber : "");
        formData.append("add_photo_file", avatar ? avatar : "");
        for (let i = 0; i < listAttachFile.length; i++) {
            if (listAttachFile[i].file) {
                formData.append("add_attach_file[]", listAttachFile[i].file ? listAttachFile[i].file : "");
            }
        }
        for (let j = 0; j < listContractFile.length; j++) {
            if (listContractFile[j].file) {
                formData.append("add_contract_file[]", listContractFile[j].file ? listContractFile[j].file : "");
            }
        }
        if (tablePaymentSetting.length === 0) {
            formData.append("payment_setting", [null]);
        } else {
            for (let k = 0; k < tablePaymentSetting.length; k++) {
                formData.append("payment_setting[" + k + "][acc_number]", tablePaymentSetting[k].acc_number ? tablePaymentSetting[k].acc_number : "");
                formData.append("payment_setting[" + k + "][bank_id]", tablePaymentSetting[k].bank_id ? tablePaymentSetting[k].bank_id : "");
                formData.append("payment_setting[" + k + "][currency_id]", tablePaymentSetting[k].currency_id ? tablePaymentSetting[k].currency_id : "");
            }
        }
        for (let z = 0; z < listRemoveAttach.length; z++) {
            formData.append("deleted_attach_id[" + z + "]", parseInt(listRemoveAttach[z].lastItem.id) ? parseInt(listRemoveAttach[z].lastItem.id) : "");
        }
        for (let w = 0; w < listRemoveContract.length; w++) {
            formData.append("deleted_contract_id[" + w + "]", parseInt(listRemoveContract[w].lastItem.id) ? parseInt(listRemoveContract[w].lastItem.id) : "");
        }
        let params = formData;
        let url = `${ApiPath.EmployeePersonalSaveOvewrite}`;;
        let obj = { package_name: "hr", url: url, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess([]);
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else {
            let status = response.data.message;
            setSuccess([status])
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setTimeout(function () {
                editIndex(editData);
            }, 2500);
            setListAttachFile("");
            setListContractFile("");
            setBankState('');
            clearChecked();
            setIsNew(false);
            let item = {
                id: editData,
                is_new: false
            }
            sessionStorage.setItem('RETURN_EMP_LIST_ID_EDIT', JSON.stringify(item));
        }
    }
    /** End Overwrite Save Function */

    // next edit employee function
    const nextEmployee = async () => {
        {
            setLoading(true);
            let params = {
                company_id: ApiPath.companyID,
                index: 1
            }
            let url = `${ApiPath.EmployeePersonalGetDetail}${editData}`;
            let obj = { package_name: "hr", url: url, method: 'get', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
            else {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                let data = response.data.data;
                setDetailAPI([data]);
                setTableDepartment(data.employee_has_dept_position);
                let result_data = [];
                data.payment_transfer_list.forEach(item => {
                    item.priority_list.forEach((sec, idx) => {
                        sec = { ...sec, employee_account_id: sec.employee_account_id, currency_desc: item.currency_desc, currency_id: item.currency_id }
                        result_data.push(sec)
                    })
                })
                setTablePaymentSetting(result_data);
                setTableAttachFile(data.employee_has_upload_info.attach_file);
                setTableContractFile(data.employee_has_upload_info.contract_file)
                setSSBNumber(data.ssb_number);
                setEmployeeType(data.employee_type);
                setGender(data.gender);
                setMaritalStatus(data.marital_status);
                setEducation(data.education);
                setEligible(data.eligible_noneligible);
                setQualification(data.other_qualification);
                setAddress(data.addressess.address);
                setPhoneNumber(data.addressess.phone);
                setImage(data.avatar_path);
                setSelectedFromDate(data.join_date ? data.join_date.substring(0, 10) : null);
                setSelectedToDate(data.date_of_birth ? data.date_of_birth.substring(0, 10) : null);
                setSelectedContractStartDate(data.contract_start_date ? data.contract_start_date.substring(0, 10) : null);
                setSelectedContractEndDate(data.contract_end_date ? data.contract_end_date.substring(0, 10) : null);
                setCurrencySetting(data.payment_transfer_list);
                setEditData(data.employee_id);
                setIsNew(data.is_new);
                let item = {
                    id: data.employee_id,
                    is_new: data.is_new
                }
                sessionStorage.setItem('RETURN_EMP_LIST_ID_EDIT', JSON.stringify(item));
                setError([]);
                setSuccess([]);
                setListAttachFile("");
                setListContractFile("");
                setBankState('');
                clearChecked();
                loadBank(currencyAPI);
            }
        }
    }

    //Set Prev EMPLOYEE
    const prevEmployee = async () => {
        setLoading(true);
        let params = {
            company_id: ApiPath.companyID,
            index: (-1)
        }
        let url = `${ApiPath.EmployeePersonalGetDetail}${editData}`;
        let obj = { package_name: "hr", url: url, method: 'get', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            let data = response.data.data;
            setDetailAPI([data]);
            setTableDepartment(data.employee_has_dept_position);
            let result_data = [];
            data.payment_transfer_list.forEach(item => {
                item.priority_list.forEach((sec, idx) => {
                    sec = { ...sec, employee_account_id: sec.employee_account_id, currency_desc: item.currency_desc, currency_id: item.currency_id }
                    result_data.push(sec)
                })
            })
            setTablePaymentSetting(result_data);
            setTableAttachFile(data.employee_has_upload_info.attach_file);
            setTableContractFile(data.employee_has_upload_info.contract_file)
            setSSBNumber(data.ssb_number);
            setEmployeeType(data.employee_type);
            setGender(data.gender);
            setMaritalStatus(data.marital_status);
            setEducation(data.education);
            setEligible(data.eligible_noneligible);
            setQualification(data.other_qualification);
            setAddress(data.addressess.address);
            setPhoneNumber(data.addressess.phone);
            setImage(data.avatar_path);
            setSelectedFromDate(data.join_date ? data.join_date.substring(0, 10) : null);
            setSelectedToDate(data.date_of_birth ? data.date_of_birth.substring(0, 10) : null);
            setSelectedContractStartDate(data.contract_start_date ? data.contract_start_date.substring(0, 10) : null);
            setSelectedContractEndDate(data.contract_end_date ? data.contract_end_date.substring(0, 10) : null);
            setCurrencySetting(data.payment_transfer_list);
            setEditData(data.employee_id);
            setIsNew(data.is_new);
            let item = {
                id: data.employee_id,
                is_new: data.is_new
            }
            sessionStorage.setItem('RETURN_EMP_LIST_ID_EDIT', JSON.stringify(item));
            setError([]);
            setSuccess([]);
            setListAttachFile("");
            setListContractFile("");
            setBankState('');
            clearChecked();
            loadBank(currencyAPI);
        }
    }

    //CHECK RADIO
    const [employeeType, setEmployeeType] = useState("");
    let chooseEmployeeType = (e) => {
        setEmployeeType(parseInt(e.target.value));
    }
    const [gender, setGender] = useState("");
    let chooseGender = (e) => {
        setGender(e.target.value);
    }
    const [maritalStatus, setMaritalStatus] = useState("");
    let chooseMaritalStatus = (e) => {
        setMaritalStatus(parseInt(e.target.value));
    }
    const [education, setEducation] = useState("");
    let changeEducation = (e) => {
        setEducation(e.target.value);
    }
    const [eligible, setEligible] = useState("");
    let chooseEligible = (e) => {
        setEligible(parseInt(e.target.value));
    }
    const [qualification, setQualification] = useState("");
    let changeQualification = (e) => {
        setQualification(e.target.value);
    }
    const [adress, setAddress] = useState("");
    let changeAddress = (e) => {
        setAddress(e.target.value);
    }
    const [phoneNumber, setPhoneNumber] = useState("");
    let changePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }
    const [SSBNumber, setSSBNumber] = useState("");
    let changeSSBNumber = (e) => {
        setSSBNumber(e.target.value);
    }

    const cancelClick = () => {
        setSaveModalBox(false);
        setoverWriteModalBox(false);
    }

    return (
        <CRow>
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <CCard>
                    <HeaderBox
                        setIsNew={isNew}
                        setAvatar={setAvatar}
                        editData={editData}
                        image={image}
                        profileShow={profileShow}
                        setImage={setImage}
                        setActiveAvatar={true}
                        setEmployeePersonal={true}
                        setFamilyMember={false}
                        setLeaveSetting={false}
                        setSalaryCalculateSetting={false}
                        setSalaryTranferSetting={false}
                        PaymentSetting={currencySetting && currencySetting.length > 0 ? true : false} />
                    <CCardHeader>
                        <div className="d-flex justify-content-between">
                            <h5 className=""><CLabel>{t('Employee Personal')}</CLabel></h5>
                            {
                                isNew === false && <CButton type="button"
                                    className=""
                                    onClick={() => history.push("./family-member-register-list")}
                                    style={{ backgroundColor: "#F4F6FD" }}>
                                    {t("Next")}
                                    <i className="fa fa-step-forward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
                                </CButton>
                            }
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <EmployeePersonalBox
                            removeFromDate={removeFromDate}
                            employeeType={employeeType}
                            chooseEmployeeType={chooseEmployeeType}
                            selectedFromDate={selectedFromDate}
                            handleFromDateChange={handleFromDateChange}
                            detailAPI={detailAPI} />
                        <PersonalDetailsBox
                            removeToDate={removeToDate}
                            chooseEligible={chooseEligible}
                            eligible={eligible}
                            maritalStatus={maritalStatus}
                            gender={gender}
                            detailAPI={detailAPI}
                            handleToDateChange={handleToDateChange}
                            chooseGender={chooseGender}
                            chooseMaritalStatus={chooseMaritalStatus}
                            selectedToDate={selectedToDate} />
                        <PersonalDetailsDeparmentDataTable
                            tableDeparment={tableDeparment}
                            detailAPI={detailAPI}
                            mainTable={mainTable} />
                        {editData &&
                            <PersonalDetailsPaymentBox
                                checkbank={checkbank}
                                detailAPI={detailAPI}
                                bankChange={bankChange}
                                bankState={bankState}
                                bankAPI={bankAPI}
                                chooseCurrency={chooseCurrency}
                                currencyAPI={currencyAPI}
                                RegisterAccount={RegisterAccount}
                                currencyByBankId={currencyByBankId}
                                currencyState={currencyState} />
                        }
                        <PersonalDetailsPaymentSettingTable
                            removeRowPayment={removeRowPayment}
                            editData={editData}
                            tablePaymentSetting={tablePaymentSetting}
                            detailAPI={detailAPI}
                            mainTable={mainTable} />
                        <EducationBox
                            editData={editData}
                            education={education}
                            qualification={qualification}
                            detailAPI={detailAPI}
                            changeEducation={changeEducation}
                            changeQualification={changeQualification} />
                        <EducationAttachFileTable
                            removeContractStartDate={removeContractStartDate}
                            removeContractEndDate={removeContractEndDate}
                            downLoadAttachFile={downLoadAttachFile}
                            editData={editData}
                            removeRowAttachFile={removeRowAttachFile}
                            tableAttachFile={tableAttachFile}
                            handleContractStartDateChange={handleContractStartDateChange}
                            selectedContractStartDate={selectedContractStartDate}
                            selectedContractEndDate={selectedContractEndDate}
                            handleContractEndDateChange={handleContractEndDateChange}
                            detailAPI={detailAPI}
                            onButtonClick={onButtonClick}
                            cancel={cancel}
                            browser={browser}
                            openBrowser={openBrowser}
                            handleFileUpload={handleFileUpload}
                            inputFile={inputFile}
                            listAttachFile={listAttachFile}
                            addAttachFile={addAttachFile}
                            mainTable={mainTable} />
                        <EducationContractFileTable
                            onButtonClickContract={onButtonClickContract}
                            editData={editData}
                            SSBNumber={SSBNumber}
                            removeRowContractFile={removeRowContractFile}
                            downLoadContractFile={downLoadContractFile}
                            tableContractFile={tableContractFile}
                            changeAddress={changeAddress}
                            changePhoneNumber={changePhoneNumber}
                            changeSSBNumber={changeSSBNumber}
                            detailAPI={detailAPI}
                            checkBrowser={checkBrowser}
                            cancelContract={cancelContract}
                            browser={browser}
                            openBrowser={openBrowser}
                            handleFileUploadContract={handleFileUploadContract}
                            inputFileContract={inputFileContract}
                            listContractFile={listContractFile}
                            contractFile={contractFile}
                            addContractFile={addContractFile}
                            mainTable={mainTable} />
                        <SaveEmployeePersonal
                            setIsNew={isNew}
                            viewPermissionAPI={viewPermissionAPI}
                            nextEmployee={nextEmployee}
                            prevEmployee={prevEmployee}
                            detailAPI={detailAPI}
                            saveData={saveData} />
                        <Confirmation
                            content={content}
                            okButton={t('Ok')}
                            cancelButton={t('Cancel')}
                            type={type}
                            show={saveModalBox || overWriteModalBox}
                            cancel={cancelClick}
                            saveOK={saveOK}
                            overWriteModalBox={overWriteModalBox}
                            closeOWSaveAlert={closeOWSaveAlert}
                            owsaveOK={owsaveOK} />
                        <ModalAccountRegister
                            detailAPI={detailAPI}
                            setAccountNumber={setAccountNumber}
                            accountNumberChange={accountNumberChange}
                            removeMessage={removeMessageModal}
                            errorModal={errorModal}
                            addModalBox={addModalBox}
                            addOnClose={addOnClose}
                            saveAccount={saveAccount} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function EmployeePersonal() {
    return (
        <Welcome />
    )
}

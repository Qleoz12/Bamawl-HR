/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useCallback } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import { checkMaxLength, checkNullOrBlank, isEmpty, onlyAllow2DecimalPlace, validateNumberOnly,is2Decimal  } from '../../../hr/hr-common/common-validation/CommonValidation';
import apiPath from "../../../brycen-common/api-path/ApiPath";
import DeductionRegisterNameBox from './DeductionRegisterNameBox';
import DeductionRegisterTypeBox from './DeductionRegisterTypeBox';
import DeductionRegisterCountForBox from './DeductionRegisterCountForBox';
import DeductionRegisterSettingTimeBox from './DeductionRegisterSettingTimeBox';
import DeductionRegisterCategoryBox from './DeductionRegisterCategoryBox';
import DeductionRegisterBasedOnBox from './DeductionRegisterBasedOnBox';
import SaveDeductionRegister from './SaveDeductionRegister';
import DeductionCurrency from './DeductionCurrency';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import DeductionRegisterPeriodBox from './DeductionRegisterPeriodBox';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import Loading from '../../../brycen-common/loading/Loading';
import { useHistory } from "react-router-dom";

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState("");
    const defaultTime = "00:00";
    const [editData, setEditData] = useState([]); //for Edit data
    const [basedOn, setBasedOn] = useState(2);  // for ssb based on
    const [show, setShow] = useState(false);// For show/hide confirmation box
    const [fixedAmount, setFixedAmount] = useState(""); // for ssb paid fixed amount
    const [countDeduction, setCountDeduction] = useState(""); //for count deduction
    const [deductionName, setdeductionName] = useState(""); //for deduction name
    const [multipleBy, setMultipleBy] = useState(1); //for multipleby
    const [lateTime, setLateTime] = useState(defaultTime); //for late Time
    const [limitTime, setLimitTime] = useState(defaultTime); //for limit Time
    const [selectDeductionName, setSelectDeductionName] = useState(3); //select Deduction Name Data
    const [payment, setPayment] = useState(1);
    const [currenceChoose, setCurrenceChoose] = useState(1);
    const [addedBy, setAddedBy] = useState("0"); //for Added By
    const [divisionHour, setDivisionHour] = useState("");
    const [hideCurrencie, setHideCurrencie] = useState(false);
    const [flagHiden, setFlagHiden] = useState(0);
    /* State for Period Box */
    const [month, setMonth] = useState(""); // For mont text box
    const [deduction_period, setDeduction_Period] = useState(1);    // For button deduction period (1:customized, 2:every month)
    const [periodMethod, setPeriodMethod] = useState(true);    // For Switch button (false: Customized, true: Equal)
    const [deductForEqual, setDeductForEqual] = useState("");  // For text box when periodMethod = true 
    const [deductForEveryMonth, setDeductForEveryMonth] = useState(""); // For text box when deduction_period = 2
    const [monthTable, setMonthTable] = useState([
        { month: "First", deduction: "" }, { month: "Second", deduction: "" },
        { month: "Third", deduction: "" }, { month: "Fourth", deduction: "" },
        { month: "Fifth", deduction: "" }, { month: "Sixth", deduction: "" },
        { month: "Seventh", deduction: "" }, { month: "Eighth", deduction: "" },
        { month: "Ninth", deduction: "" }, { month: "Tenth", deduction: "" },
        { month: "Eleventh", deduction: "" }, { month: "Twelfth", deduction: "" },
    ]);
    /* State for Period Box  end*/
    const [typeDeduction, setTypeDeduction] = useState(1);
    const [selectTotalMethod, setSelectTotalMethod] = useState("");     // For Select Total Method
    const [selectBasicMethod, setSelectBasicMethod] = useState("");     // For Select Basic Method
    const [totalMethodValue, setTotalMethodValue] = useState("");    // For Total Divisor Value
    const [basicMethodValue, setBasicMethodValue] = useState("");    // For Basic Divisor Value
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const history = useHistory(); // For edit link
    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  v_hao
    * @create  07/08/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);

    /**
    * Page Load
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        setLoading(true);
        ApiViewPermission.loadViewPermission();
        loadCalculateBaseOnMethod();
        loadCurrency();
        loadBasedOn();
        loadDeductionName();
        let edit_Data = JSON.parse(localStorage.getItem('RETURN_DEDUCTION_DATA')); // return data DEDUCTION DATA List Form
        localStorage.removeItem('RETURN_DEDUCTION_DATA');
        if (edit_Data != null) {
            let edit_id = edit_Data;
            setEditData(edit_Data);
            editIndex(edit_id);
        }
    }, []);

    /**
    * Load Based On Methods
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const [basedOnMethod, setBasedOnMethod] = useState([]);
    const loadBasedOn = async () => {
        let obj = { package_name: 'hr', url: apiPath.deductionGetBasedOnMethods, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        } else {
            setBasedOnMethod(response.data.data);
        }
    }

    /**
    * Load Calculate Methods
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const [calCulateBaseOnMethodAPITotal, setCalCulateBaseOnMethodAPITotal] = useState([]);
    const [calCulateBaseOnMethodAPIBasic, setCalCulateBaseOnMethodAPIBasic] = useState([]);
    const loadCalculateBaseOnMethod = async () => {
        let arrayTotal = [];
        let arrayBasic = [];
        let obj = { package_name: 'hr', url: apiPath.deductionCalculateMethods, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSelectBasicMethod();
            setSelectTotalMethod();
            setError(response.message);
        } else {
            let data = response.data.data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].description.indexOf("Total Salary") != -1) {
                    data[i].description = data[i].description.trim();
                    arrayTotal.push(data[i]);
                } else if ((data[i].description.indexOf("Basic Salary") != -1)
                    || (data[i].description.indexOf("Daily Wages / Total Working Hour Per Days") != -1)
                    || (data[i].description.indexOf("Hourly Wages") != -1)
                    && (data[i].description.indexOf("Fixed Amount") == -1)) {
                    data[i].description = data[i].description.trim();
                    arrayBasic.push(data[i]);
                }
            }
            setCalCulateBaseOnMethodAPITotal(arrayTotal);
            setCalCulateBaseOnMethodAPIBasic(arrayBasic);
        }
    }

    /**
    * Load Currency
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const [allCurrency, setAllCurrency] = useState([]);
    const loadCurrency = async () => {
        let obj = { package_name: 'hr', url: apiPath.currencies, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        } else {
            let data = response.data.data;
            if (data.length > 1) {
                setHideCurrencie(true);
                setAllCurrency(data);
            }
        }
    }

    /**
    * Load Deduction Name
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const [deductionNameAPI, setDeductionNameAPI] = useState([]);
    const loadDeductionName = async () => {
        let obj = { package_name: 'hr', url: apiPath.deductionGetDeductions, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        } else {
            let data = response.data.data;
            setDeductionNameAPI(data);
        }
    }

    const basicSalaryChange = (e) => {
        setBasedOn(Number(e.target.value));
    }

    let fixedAmountChange = (e) => {
        let value = e.target.value;
        if (validateNumberOnly(value) || value === "") {
            setFixedAmount(value);
        }
    }

    let chooseDeductionName = (i) => {
        setSelectDeductionName(i.target.value);
        if (i.target.value == 3) {
            setDeduction_Period(1);
        }
    }

    let lateTimeChange = (value) => {
        setLateTime(value);
    }

    let limitTimeChange = (value) => {
        setLimitTime(value);
    }

    let multipleByChange = (e) => {
        let value = e.target.value;
        let res = is2Decimal(value);
        if(value != ""){
          if(res == true && value != "00"){
              if(value.length >1){
                let first = value.charAt(0);
                let second = value.charAt(1);
                if(first == 0 && second == "."){
                    setMultipleBy(value);
                }else if( first != 0){
                    setMultipleBy(value);
                }
              }else{
                setMultipleBy(value);
              }
          }
        }else{
            setMultipleBy("");
        }

    }

    let deductionNameChange = (e) => {
        setdeductionName(e.target.value);
    }

    let addedChange = (e) => {
        let value = e.target.value;
        if (validateNumberOnly(value) || value === "") {
            setAddedBy(value);
        }
    }

    let countDeductionChange = (e) => {
        if (validateNumberOnly(e.target.value) || e.target.value === "") {
            setCountDeduction(e.target.value);
        }
    }

    let changeDivisionHour = (e) => {
        let data = e.target.value;
        if (data != 2 && data != 8) {
            setDivisionHour("");
        }
        setDivisionHour(data);
    }

    let getPayment = (e) => {
        setPayment(e.target.value);
    }

    let getCurrenceChoose = (e) => {
        setCurrenceChoose(e.target.value);
    }

    let chooseTotalMethod = (e) => {
        setSelectTotalMethod(Number(e.target.value));
    }

    let chooseBasicMethod = (e) => {
        setSelectBasicMethod(Number(e.target.value));
    }

    let chooseDeductionType = (e) => {
        setTypeDeduction(e.target.value);
    }

    let getTotalMethodValue = (e) => {
        setTotalMethodValue(e.target.value);
    }

    let getBasicMethodValue = (e) => {
        setBasicMethodValue(e.target.value);
    }

    let changeDeduct = (e) => {
        let month = e.target.name;
        let value = e.target.value;
        if (validateNumberOnly(value) || value == "") {
            if (value == "") value = "";
            else if (value < 1) value = 1;
            let map;
            map = monthTable.map(ele =>
                ele.month === month ? { ...ele, deduction: value } : ele
            );
            setMonthTable(map);
        }
    }

    let changeMonth = (e) => {
        let value = e.target.value;
        if (validateNumberOnly(value)) {
            if (value < 1) value = 1;
            if (value > 12) value = 12;
            setMonth(value);
        }
        if (value === "") setMonth("");
    }
    let changePeriod = (e) => {
        setDeduction_Period(e.target.value)
    }
    let changePeriodMethod = (e) => {
        setPeriodMethod(!periodMethod);
    }
    let changeDeductionValueEqual = (e) => {
        let value = e.target.value;
        if (validateNumberOnly(value) || value === "") {
            if (value == "") value = "";
            else if (value < 1) value = 1;
            setDeductForEqual(value);
        }
    }
    let changeDeductionValueEveryMonth = (e) => {
        let value = e.target.value;
        if (validateNumberOnly(value) || value === "") {
            if (value == "") value = "";
            else if (value < 1) value = 1;
            setDeductForEveryMonth(value);
        }
    }

    let saveData = () => {
        if (!hideCurrencie && basedOn == 3) {
            setPayment(1);
        }

        let errMsgAll = [];

        /** Validate Deduction Category */
        if (!checkNullOrBlank(selectDeductionName)) {
            const errMsg = t('JSE126').replace('%s', t('Deduction Category'));
            errMsgAll.push(errMsg);
        }

        /** Validate Deduction Name */
        if (isEmpty(String(deductionName).trim())) {
            const errMsg = t('JSE124').replace('%s', t('Deduction Name'));
            errMsgAll.push(errMsg);
        } else if (!checkMaxLength(deductionName, 200)) {
            const errMsg = t('JSE016').replace('%s', t('Deduction Name')).replace('%s', t('200 characters'));
            errMsgAll.push(errMsg);
        }

        /** Validate Count For Deduction */
        if (!checkNullOrBlank(countDeduction)) {
            const errMsg = t('JSE124').replace('%s', t('Deduction Count'));
            errMsgAll.push(errMsg);
        }

        /** Validate Count For Deduction */
        if (checkNullOrBlank(countDeduction)) {
            if (!validateNumberOnly(countDeduction)) {
                const errMsg = t('JSE005').replace('%s', t('Deduction Count'))
                errMsgAll.push(errMsg);
            } else if (countDeduction == 0) {
                const errMsg = t("JSE032").replace('%s', t('Deduction Count'));
                errMsgAll.push(errMsg);
            }
        }

        /* Validate Deduction Period Box */
        if (deduction_period == 1) { // deduction period is customize
            if (!checkNullOrBlank(month)) {
                const errMsg = t('JSE124').replace('%s', t('Month'));
                errMsgAll.push(errMsg);
            }
            if (periodMethod == false) { // method is Customized
                for (let i = 0; i < month; i++) {
                    if (!checkNullOrBlank(monthTable[i].deduction)) {
                        const errMsg = t('JSE124').replace('%s', t(`${monthTable[i].month} Month in table`));
                        errMsgAll.push(errMsg);
                    }
                    else if (monthTable[i].deduction > 100 && typeDeduction == 1) { // deduction type is Percentage
                        const errMsg = t('JSE016').replace('%s', t(`${monthTable[i].month} Month in small table`)).replace('%s', '100%');
                        errMsgAll.push(errMsg);
                    }
                }
            }
            else {  // method is Equal
                if (!checkNullOrBlank(deductForEqual)) {
                    const errMsg = t('JSE124').replace('%s', t('Deduction Installment'));
                    errMsgAll.push(errMsg);
                }
                else {
                    if (deductForEqual > 100 && typeDeduction == 1) {
                        const errMsg = t('JSE016').replace('%s', t('Deduction Installment')).replace('%s', '100%');
                        errMsgAll.push(errMsg);
                    }
                }
            }
        }
        else {
            if (!checkNullOrBlank(deductForEveryMonth)) {
                const errMsg = t('JSE124').replace('%s', t('Deduction Installment'));
                errMsgAll.push(errMsg);
            }
            else {
                if (deductForEveryMonth > 100 && typeDeduction == 1) {
                    const errMsg = t('JSE016').replace('%s', t('Deduction Installment')).replace('%s', '100%');
                    errMsgAll.push(errMsg);
                }
            }
        }

        /** Validate Calculate Method Type */
        if (basedOn == 1 && basedOnMethod.length > 0) {
            if (!checkNullOrBlank(selectTotalMethod) && typeDeduction == 1) {
                const errMsg = t('JSE126').replace('%s', t('Calculate Method Type'))
                errMsgAll.push(errMsg);
            }
        } else if (basedOn == 2 && basedOnMethod.length > 0) {
            if (!checkNullOrBlank(selectBasicMethod) && typeDeduction == 1) {
                const errMsg = t('JSE126').replace('%s', t('Calculate Method Type'))
                errMsgAll.push(errMsg);
            }
        }
   
        /** Validate Deduction Time Limit */
        if (( limitTime == null) && selectDeductionName != 3) {
            const errMsg = t('JSE009').replace('%s', t('Deduction Time Limit'))
            errMsgAll.push(errMsg);
        }

        /** Validate Added By */
        if (!checkNullOrBlank(addedBy) && basedOn != 3 && typeDeduction == 1) {
            const errMsg = t('JSE124').replace('%s', t('Added By'));
            errMsgAll.push(errMsg);
        } else if (!validateNumberOnly(addedBy) && basedOn != 3 && typeDeduction == 1) {
            const errMsg = t('JSE005').replace('%s', t('Added By'));
            errMsgAll.push(errMsg);
        } else if (!onlyAllow2DecimalPlace(addedBy) && basedOn != 3 && typeDeduction == 1) {
            const errMsg = t("JSE120").replace('%s', t('Added By'));
            errMsgAll.push(errMsg);
        }

        /** Validate Division Hour */
        if (selectTotalMethod == 2 && basedOn == 1) {
            if (!checkNullOrBlank(totalMethodValue)) {
                const errMsg = t("JSE124").replace('%s', t('Division Hour'));
                errMsgAll.push(errMsg);
            } else if (!validateNumberOnly(totalMethodValue)) {
                const errMsg = t('JSE005').replace('%s', t('Division Hour'));
                errMsgAll.push(errMsg);
            } else if (totalMethodValue == 0) {
                const errMsg = t("JSE032").replace('%s', t('Division Hour'));
                errMsgAll.push(errMsg);
            }
        }

        /** Validate Division Hour */
        if (selectBasicMethod == 8 && basedOn == 2) {
            if (!checkNullOrBlank(basicMethodValue)) {
                const errMsg = t("JSE124").replace('%s', t('Division Hour'));
                errMsgAll.push(errMsg);
            } else if (!validateNumberOnly(basicMethodValue)) {
                const errMsg = t('JSE005').replace('%s', t('Division Hour'));
                errMsgAll.push(errMsg);
            } else if (basicMethodValue == 0) {
                const errMsg = t("JSE032").replace('%s', t('Division Hour'));
                errMsgAll.push(errMsg);
            }
        }

        /** Validate Multiply By */
        if (!checkNullOrBlank(multipleBy) && basedOn != 3 && typeDeduction == 1) {
            const errMsg = t('JSE124').replace('%s', t('Multiply By'));
            errMsgAll.push(errMsg);
        }
        //  else if (!validateNumberOnly(multipleBy) && basedOn != 3 && typeDeduction == 1) {
        //     const errMsg = t('JSE005').replace('%s', t('Multiply By'))
        //     errMsgAll.push(errMsg);
        // } 
        else if (multipleBy == 0 && basedOn != 3 && typeDeduction == 1) {
            const errMsg = t("JSE032").replace('%s', t('Multiply By'));
            errMsgAll.push(errMsg);
        }

        /** Validate Fixed Amount */
        if (!checkNullOrBlank(fixedAmount) && (basedOn == 3 && typeDeduction == 1)) {
            const errMsg = t('JSE124').replace('%s', t('Fixed Amount'));
            errMsgAll.push(errMsg);
        } else if (!validateNumberOnly(fixedAmount) && (basedOn == 3 && typeDeduction == 1)) {
            const errMsg = t('JSE005').replace('%s', t('Fixed Amount'))
            errMsgAll.push(errMsg);
        } else if (fixedAmount == 0 && (basedOn == 3 && typeDeduction == 1)) {
            const errMsg = t("JSE032").replace('%s', t('Fixed Amount'));
            errMsgAll.push(errMsg);
        }

        if (errMsgAll.length > 0) {
            setError([...errMsgAll]);
            setSuccess('');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else {
            setShow(!show);
            if(editData == ""){
                setContent(t("Are you sure want to save?"));setType("save");setError([]);
            }else{
                setContent(t("Are you sure want to update?"));setType("update");setError([]);
            }
        }
    }

    const cleanAfterSaveAndUpdate = () => {
        setSelectDeductionName(3);
        setBasedOn(2);
        setFixedAmount("");
        setCountDeduction("");
        setTotalMethodValue("");
        setBasicMethodValue("");
        setSelectBasicMethod();
        setSelectTotalMethod();
        setdeductionName("");
        setDivisionHour("");
        setMultipleBy(1);
        setAddedBy("0");
        setLimitTime(defaultTime);
        setLateTime(defaultTime);
        setDeductForEqual("");
        setDeductForEveryMonth("");
        setMonth("");
        setDeduction_Period(1);
        setPeriodMethod(true);
        setMonthTable([
            { month: "First", deduction: "" }, { month: "Second", deduction: "" },
            { month: "Third", deduction: "" }, { month: "Fourth", deduction: "" },
            { month: "Fifth", deduction: "" }, { month: "Sixth", deduction: "" },
            { month: "Seventh", deduction: "" }, { month: "Eighth", deduction: "" },
            { month: "Ninth", deduction: "" }, { month: "Tenth", deduction: "" },
            { month: "Eleventh", deduction: "" }, { month: "Twelfth", deduction: "" },
        ]);
        setError([]);
        setEditData("");
        setFlagHiden(0);
    }

    const saveOK = async () => {
        setShow(!show)
        //window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        let deduction = "";
        if (selectDeductionName == 3 && deduction_period == 1) {
            if (periodMethod == true)
                deduction = Number(deductForEqual);
            else {
                let data = monthTable.filter((ele, index) => ele.deduction != "" && index < month);
                deduction = data;
            }
        }
        else {
            deduction = Number(deductForEveryMonth);
        }

        if (Number(selectDeductionName) == 3) {
            setLateTime(defaultTime);
            setLimitTime(defaultTime);
        }

        if (Number(typeDeduction) == 2) {
            setSelectBasicMethod();
            setSelectTotalMethod();
            setBasicMethodValue("");
            setTotalMethodValue("");
            setAddedBy(0);
        }

        let params = {
            "company_id": apiPath.companyID, // login data from erp 
            "currency_id": (typeDeduction == 2) ? Number(payment) : Number(basedOn) == 3 ? Number(currenceChoose) : 0,
            "deduction_category_id": Number(selectDeductionName),
            "calculate_method_id": typeDeduction == 2 ? 0 : Number(basedOn) == 1 ? Number(selectTotalMethod) : Number(basedOn) == 2 ? Number(selectBasicMethod) : 0,
            "deduction_name": String(deductionName).trim(),
            "deduction_type": Number(typeDeduction),
            "deduction_count": Number(countDeduction),
            "deduction_month": deduction_period == 2 ? 1 : Number(month),
            "deduction_period": Number(deduction_period),
            "deduction_installment_type": deduction_period == 2 ? 2 : periodMethod === true ? 2 : 1,
            "deductions": deduction,
            "relief_late_time": (Number(selectDeductionName) != 3) ? lateTime : defaultTime,
            "deduction_time_limit": (Number(selectDeductionName) != 3) ? limitTime : defaultTime,
            "based_on_method_id": Number(basedOn) ? Number(basedOn) : 0, //note
            "m_factor": typeDeduction == 2 ? 1 : Number(basedOn) == 3 ? 1 : Number(multipleBy),
            "d_result": typeDeduction == 2 ? "" : Number(basedOn) == 3 ? Number(fixedAmount) : "",
            "f_divisor": typeDeduction == 2 ? "" : Number(basedOn) == 1 ? Number(totalMethodValue) : Number(basedOn) == 2 ? Number(basicMethodValue) : "",
            "e_addition": typeDeduction == 2 ? "0" : Number(basedOn) == 3 ? "0" : Number(addedBy),
            "language": apiPath.lang, // login data from erp 
            "employee_id": apiPath.loginEmp, // login data from erp 
            "updated_emp": apiPath.updatedEmp  // login data from erp 
        };

        let url = '', method = '';
        if (editData == "") {
            params = { ...params, "created_emp": apiPath.createdEmp };
            url = apiPath.deductionRegisterSave;
            method = 'post';
        } else {
            url = apiPath.deductionRegister + editData;
            method = 'put';
        };
        let obj = { package_name: 'hr', url: url, method: method, params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
        }
        else {
            cleanAfterSaveAndUpdate();
            setSuccess([response.data.message]);
        }
    }
    /** End Save/Update Function */

    /** Start Edit Function */
    let editIndex = async (edit_id) => {
        setLoading(true);
        let url = `${apiPath.deductionRegister}${edit_id}?language=${apiPath.lang}&company_id=${apiPath.companyID}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
            setFlagHiden(0);
        }
        else {
            let teampDeductionType = response.data.data['deduction_type'];
            let tempCalculateMethod = response.data.data['calculate_method_id'];
            let teampBasedOn = response.data.data['based_on_method_id'];
            setdeductionName(response.data.data['deduction_name']);
            setBasedOn(teampDeductionType == 2 ? 2 : response.data.data['based_on_method_id']);
            setTypeDeduction(response.data.data['deduction_type']);
            setFixedAmount(response.data.data['d_result']);
            setCountDeduction(response.data.data['deduction_count']);
            let teampDeductionCate = response.data.data['deduction_category_id'];
            let teampDeductionPeriod = response.data.data['deduction_period'];
            let teampdeductioninstallmenttype = response.data.data['deduction_installment_type'];
            if (teampDeductionCate == 3 && teampDeductionPeriod == 1) {
                if (teampdeductioninstallmenttype == 2)
                    setDeductForEqual(response.data.data['deductions']);
                else {
                    let data;
                    data = monthTable.map((ele, index) =>
                        response.data.data["deductions"][index] ?
                            { ...ele, deduction: response.data.data["deductions"][index] } : ele
                    )
                    setMonthTable(data);
                }
            }
            else {
                setDeductForEveryMonth(response.data.data['deductions']);
            }
            setMonth(response.data.data['deduction_month']);
            setDeduction_Period(response.data.data['deduction_period']);
            setPeriodMethod(response.data.data['deduction_installment_type'] == 1 ? false : true);
            if (teampDeductionType == 2) {
                setAddedBy("0");
                setMultipleBy(1);
            } else {
                setAddedBy(response.data.data['e_addition'] == 0 ? "0" : response.data.data['e_addition']);
                setMultipleBy(response.data.data['m_factor'] ? response.data.data['m_factor'] : 1);
            }
            if (teampBasedOn == 1) {
                setSelectTotalMethod(response.data.data['calculate_method_id']);
                setTotalMethodValue((tempCalculateMethod == 2) ? response.data.data['f_divisor'] : "");
            } else if (teampBasedOn == 2) {
                setSelectBasicMethod(response.data.data['calculate_method_id']);
                setBasicMethodValue((tempCalculateMethod == 8) ? response.data.data['f_divisor'] : "");
            }
            setLimitTime(response.data.data['deduction_time_limit']);
            setLateTime(response.data.data['relief_late_time']);
            setSelectDeductionName(response.data.data['deduction_category_id']);
            setPayment(response.data.data['currency_id'] == 0 ? 1 : response.data.data['currency_id']);
            setCurrenceChoose(response.data.data['currency_id'] == 0 ? 1 : response.data.data['currency_id']);
            setFlagHiden(response.data.flag);
        }
    }
    const removeMessage = () => {
        setError("");
        setSuccess("");
    }
    /** End Edit Function */
    return (
        <CRow className="deduction">
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
                    cancel={() => setShow(!show)} saveOK={saveOK} updateOK={saveOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5>{t('Deduction Register')}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <DeductionRegisterNameBox
                            deductionName={deductionName}
                            deductionNameChange={deductionNameChange}
                            flagHiden={flagHiden}
                        />
                        <DeductionRegisterCategoryBox
                            deductionNameAPI={deductionNameAPI}
                            chooseDeductionName={chooseDeductionName}
                            selectDeductionName={selectDeductionName}
                            flagHiden={flagHiden}
                        />
                        <DeductionRegisterTypeBox
                            typeDeduction={typeDeduction}
                            chooseDeductionType={chooseDeductionType}
                            flagHiden={flagHiden}
                        />
                        <DeductionCurrency
                            flagHiden={flagHiden}
                            selectDeductionName={selectDeductionName}
                            payment={payment}
                            getPayment={getPayment}
                            hideCurrencie={hideCurrencie}
                            allCurrency={allCurrency}
                            typeDeduction={typeDeduction}
                        />
                        <DeductionRegisterCountForBox
                            selectDeductionName={selectDeductionName}
                            countDeduction={countDeduction}
                            countDeductionChange={countDeductionChange}
                            flagHiden={flagHiden}
                        />
                        <DeductionRegisterPeriodBox
                            flagHiden={flagHiden}
                            selectDeductionName={selectDeductionName}
                            typeDeduction={typeDeduction}
                            month={month}
                            setMonth={setMonth}
                            periodMethod={periodMethod}
                            setPeriodMethod={setPeriodMethod}
                            deductForEqual={deductForEqual}
                            deductForEveryMonth={deductForEveryMonth}
                            monthTable={monthTable}
                            setMonthTable={setMonthTable}
                            deduction_period={deduction_period}
                            setDeduction_Period={setDeduction_Period}
                            changeDeduct={changeDeduct}
                            changeMonth={changeMonth}
                            changePeriod={changePeriod}
                            changePeriodMethod={changePeriodMethod}
                            changeDeductionValueEqual={changeDeductionValueEqual}
                            changeDeductionValueEveryMonth={changeDeductionValueEveryMonth}
                        />
                        <DeductionRegisterSettingTimeBox
                            selectDeductionName={selectDeductionName}
                            lateTimeChange={lateTimeChange}
                            limitTimeChange={limitTimeChange}
                            lateTime={lateTime}
                            limitTime={limitTime}
                            flagHiden={flagHiden}
                        />
                        <DeductionRegisterBasedOnBox
                            typeDeduction={typeDeduction}
                            hideCurrencie={hideCurrencie}
                            selectDeductionName={selectDeductionName}
                            basedOnMethod={basedOnMethod}
                            basicSalaryChange={basicSalaryChange}
                            basedOn={basedOn}
                            fixedAmount={fixedAmount}
                            fixedAmountChange={fixedAmountChange}
                            allCurrency={allCurrency}
                            calCulateBaseOnMethodAPIBasic={calCulateBaseOnMethodAPIBasic}
                            divisionHour={divisionHour}
                            changeDivisionHour={changeDivisionHour}
                            multipleBy={multipleBy}
                            multipleByChange={multipleByChange}
                            calCulateBaseOnMethodAPITotal={calCulateBaseOnMethodAPITotal}
                            getCurrenceChoose={getCurrenceChoose}
                            currenceChoose={currenceChoose}
                            addedChange={addedChange}
                            addedBy={addedBy}
                            flagHiden={flagHiden}
                            chooseTotalMethod={chooseTotalMethod} selectTotalMethod={selectTotalMethod}
                            totalMethodValue={totalMethodValue} getTotalMethodValue={getTotalMethodValue}
                            chooseBasicMethod={chooseBasicMethod} selectBasicMethod={selectBasicMethod}
                            basicMethodValue={basicMethodValue} getBasicMethodValue={getBasicMethodValue}
                        />
                        <SaveDeductionRegister
                            saveData={saveData}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function DeductionRegisterIndex() {
    return (
        <Welcome />
    )
}

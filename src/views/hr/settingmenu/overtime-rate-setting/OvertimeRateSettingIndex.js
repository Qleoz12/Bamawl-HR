/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { checkNullOrBlank, isEmpty, validateNumberOnly, checkMaxLength } from '../../../hr/hr-common/common-validation/CommonValidation'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import OvertimeRateSettingShiftNameBox from './OvertimeRateSettingShiftNameBox';
import OvertimeRateSettingOvertimeTitleBox from './OvertimeRateSettingOvertimeTitleBox';
import OvertimeRateSettingCalculateSettingBox from './OvertimeRateSettingCalculateSettingBox';
import OvertimeRateSettingFreeTimeLimitBox from './OvertimeRateSettingFreeTimeLimitBox';
import OvertimeRateSettingSetMinuteRangeBox from './OvertimeRateSettingSetMinuteRangeBox';
import SaveAndCancelOvertimeRateSetting from './SaveAndCancelOvertimeRateSetting';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Message from '../../../brycen-common/message/Message';
import { useHistory } from 'react-router-dom';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);    // For Error Message
    const [success, setSuccess] = useState("");    // For Success Message
    const [editData, setEditData] = useState("");    // For Edit Data
    const [usedFlag, setUsedFlag] = useState();    // For used Overtime Rate
    const [minuteRangeTable, setMinuteRangeTable] = useState([]);    // For Main Table
    const [selectShiftName, setSelectShiftName] = useState([]);    // For Select Shift Name Data
    const [accordion, setAccordion] = useState(true);  // For Colapse
    const [rate, setChooseRate] = useState("1");      // For Select Rate
    const [multiplyBy, setMultiplyBy] = useState("1");   // For Multiply By
    const [addedBy, setAddedBy] = useState("0");   // For Added By
    const [overtimeTitle, setOvertimeTitle] = useState("");    // For Input Overtime Title
    const [hourly, setHourly] = useState();      // For Hourly Rate
    const [daily, setDaily] = useState();      // For Daily Rate
    const [minuteRangeChange, setMinuteRangeChange] = useState();      // For Select Minute Range
    const [payWithSalary, setPayWithSalary] = useState(true);      // For Select Pay With Salary
    const [caculateSetting, setCaculateSetting] = useState(1);     // For Choose Caculate Setting
    const [freeTimeLimit, setFreeTimeLimit] = useState();      // For Select Free Time Limit
    const [basedOn, setBasedOn] = useState(true);  // For Select Based On Method
    const [currency, setCurrency] = useState(1);    // For Select Currency
    const [selectTotalMethod, setSelectTotalMethod] = useState(3);     // For Select Total Method
    const [selectBasicMethod, setSelectBasicMethod] = useState(9);     // For Select Basic Method
    const [totalMethodValue, setTotalMethodValue] = useState("");    // For Total Divisor Value
    const [basicMethodValue, setBasicMethodValue] = useState("");    // For Basic Divisor Value
    const [currencies, setCurrencies] = useState([]);
    const [shiftName, setShiftName] = useState([]);
    const [firstSN, setFirstSN] = useState([]);
    const [caculateMethodBasic, setCaculeMethodBasic] = useState([]);
    const [caculateMethodTotal, setCaculeMethodTotal] = useState([]);
    const [content, setContent] = useState('');
    const [show, setShow] = useState(false);// For show/hide confirmation box
    const [type, setType] = useState('');
    const history = useHistory();

    /** Start Form Load */
    useEffect(() => {
        setLoading(true);
        ApiViewPermission.loadViewPermission();
        loadShiftName();
        loadCurrencies();
        loadCaculateMethod();
        searchMinuteRange();
        let edit_Data = JSON.parse(localStorage.getItem('RETURN_OT_RATE_DATA')); // return data from OT Rate List Form
        localStorage.removeItem('RETURN_OT_RATE_DATA');
        if (edit_Data != null) {
            let edit_id = edit_Data;
            setEditData(edit_id);
            editIndex(edit_id);
        }
    }, []);
    /** End Form Load */

    /**
    * Load Shift name
    *
    * @author  c_dinh
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadShiftName = async () => {
        let params = {
            company_id: ApiPath.companyID,
            language: ApiPath.lang
        };
        let obj = { package_name: 'hr', url: ApiPath.overtimeRateGetShiftNormalRules, method: 'post', params };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            setShiftName([])
        }
        else {
            setShiftName(response.data.data);
            setFirstSN(response.data.data);
        }
    }
    /**

    /**
    * Load Currencies
    *
    * @author  c_dinh
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadCurrencies = async () => {
        let obj = { package_name: 'hr', url: ApiPath.currencies, method: 'get' };
        let response = await ApiRequest(obj);
        response.flag === false ? setCurrencies([]) : setCurrencies(response.data.data);
        setLoading(false);
    }
    /**

    /**
    * Load Caculate Method
    *
    * @author  c_dinh
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadCaculateMethod = async () => {
        let params = {
            company_id: ApiPath.companyID,
            language: ApiPath.lang
        };
        let obj = { package_name: 'hr', url: ApiPath.overtimeRateGetCalculateMethods, method: 'post', params };
        let response = await ApiRequest(obj);
        let arrayTotal = [];
        let arrayBasic = [];
        if (response.flag === false) {
            setCaculeMethodBasic([]);
            setCaculeMethodTotal([]);
        }
        else {
            let data = response.data.data;
            for (let i = 0; i < data.length; i++) {
                if ((data[i].description.indexOf("Total Salary") != -1)
                    || (data[i].description.indexOf("Daily Wages / Total Working Hour Per Days") != -1)
                    || (data[i].description.indexOf("Hourly Wages") != -1)) {
                    data[i].description = data[i].description.trim();
                    arrayTotal.push(data[i]);
                }
                if ((data[i].description.indexOf("Basic Salary") != -1)
                    || (data[i].description.indexOf("Daily Wages / Total Working Hour Per Days") != -1)
                    || (data[i].description.indexOf("Hourly Wages") != -1)) {
                    data[i].description = data[i].description.trim();
                    arrayBasic.push(data[i]);
                }
            }
            setCaculeMethodBasic(arrayBasic);
            setCaculeMethodTotal(arrayTotal);
        }
    }
    /**

    /**
    * Load Minute Range
    *
    * @author  c_dinh
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const searchMinuteRange = async () => {
        let params = {
            company_id: ApiPath.companyID,
            language: ApiPath.lang
        };
        let obj = { package_name: 'hr', url: ApiPath.overtimeRateGetMinuteRanges, method: 'post', params };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            setMinuteRangeTable([])
        }
        else {
            setMinuteRangeTable(response.data.data);
        }
    }

    let accordionChange = () => {
        setAccordion(!accordion);
    }
    // get Hourly or Daily
    let chooseRate = (e) => {
        let data = e.target.value;
        setChooseRate(data)
        if (data == "1") {
            setDaily()
        }
        if (data == "2") {
            setHourly()
        }
    }
    let freeTimeLimitChange = (e) => {
        setFreeTimeLimit(e);
    };
    let getMinuteRangeChange = (e) => {
        setMinuteRangeChange(!minuteRangeChange);
    }
    let getPayWithSalary = (e) => {
        setPayWithSalary(!payWithSalary);
    }
    const caculateSettingChange = (e) => {
        setCaculateSetting(e.target.value);
    }
    let multiplyChange = (e) => {
        setMultiplyBy(e.target.value);
    }
    let addedChange = (e) => {
        setAddedBy(e.target.value);
    }
    let overtimeTitleChange = (e) => {
        setOvertimeTitle(e.target.value);
    }
    let getHourly = (e) => {
        setHourly(e.target.value);
    }
    let getDaily = (e) => {
        setDaily(e.target.value);
    }
    let basedOnChange = () => {
        setBasedOn(!basedOn);
    }
    let getCurrency = (e) => {
        let data = e.target.value;
        setCurrency(data);
    }
    let getTotalMethodValue = (e) => {
        setTotalMethodValue(e.target.value);
    }
    let getBasicMethodValue = (e) => {
        setBasicMethodValue(e.target.value);
    }

    let chooseShiftName = (e) => {
        let value = e.target.value;
        let checked = e.target.checked;
        let list_shift_name = [];
        let data;
        data = shiftName.map(item =>
            item.id == value ? { ...item, is_checked: checked } : item
        );
        for (let i = 0; i < data.length; i++) {
            if (data[i].is_checked === true) {
                list_shift_name.push(data[i].id);
            }
        }
        setShiftName(data);
        setSelectShiftName(list_shift_name);
    }
    let chooseTotalMethod = (e) => {
        setSelectTotalMethod(Number(e.target.value));
    }
    let chooseBasicMethod = (e) => {
        setSelectBasicMethod(e.target.value);
    }

    /** Start Cancel All Data Function */
    let cancelData = () => {
        setEditData("");
        setShiftName(firstSN);
        setSelectShiftName([]);
        setBasedOn(true);
        setSelectBasicMethod(9);
        setSelectTotalMethod(3);
        setMultiplyBy("1");
        setAddedBy("0");
        setOvertimeTitle("");
        setCaculateSetting(1);
        setFreeTimeLimit("00:00");
        setMinuteRangeChange();
        setChooseRate();
        setCurrency();
        setHourly();
        setDaily();
        setPayWithSalary(true);
        setTotalMethodValue("");
        setBasicMethodValue("");
        setError([]);
        setSuccess('');
        setUsedFlag();
    }
    /** End Cancel All Data Function */
    let saveData = () => {
        let errMsgAll = [];
        /** Validate Shift Name */
        if (isEmpty(selectShiftName)) {
            const errMsg = t("JSE126").replace('%s', t('Shift Name'));
            errMsgAll.push(errMsg);
        }

        /** Validate Overtime Title */
        if (!checkNullOrBlank(overtimeTitle)) {
            const errMsg = t("JSE124").replace('%s', t('Overtime Title'));
            errMsgAll.push(errMsg);
        }
        else if (!checkMaxLength(overtimeTitle, 200)) {
            const errMsg = t('JSE016').replace('%s', t('Overtime Title')).replace('%s', t('200 characters'));
            errMsgAll.push(errMsg);
        }

        /** Validate Calculate Setting */
        if (caculateSetting == 1) {
            /** Validate Division Hour */
            if (basedOn == true && selectTotalMethod == 2) {
                if (!checkNullOrBlank(totalMethodValue)) {
                    const errMsg = t("JSE124").replace('%s', t('Division Hour'));
                    errMsgAll.push(errMsg);
                }
                else if (!validateNumberOnly(totalMethodValue)) {
                    const errMsg = t('JSE005').replace('%s', t('Division Hour'));
                    errMsgAll.push(errMsg);
                }
                else if (totalMethodValue == 0) {
                    const errMsg = t("JSE032").replace('%s', t('Division Hour'));
                    errMsgAll.push(errMsg);
                }
            }
            if (basedOn == false && selectBasicMethod == 8) {
                if (!checkNullOrBlank(basicMethodValue)) {
                    const errMsg = t("JSE124").replace('%s', t('Division Hour'));
                    errMsgAll.push(errMsg);
                }
                else if (!validateNumberOnly(basicMethodValue)) {
                    const errMsg = t('JSE005').replace('%s', t('Division Hour'));
                    errMsgAll.push(errMsg);
                }
                else if (basicMethodValue == 0) {
                    const errMsg = t("JSE032").replace('%s', t('Division Hour'));
                    errMsgAll.push(errMsg);
                }
            }

            /** Validate Multiply By */
            if (!checkNullOrBlank(multiplyBy)) {
                const errMsg = t("JSE124").replace('%s', t('Multiply By'));
                errMsgAll.push(errMsg);
            }
            else if (!validateNumberOnly(multiplyBy)) {
                const errMsg = t("JSE005").replace('%s', t('Multiply By'));
                errMsgAll.push(errMsg);
            }
            else if (multiplyBy == 0) {
                const errMsg = t("JSE032").replace('%s', t('Multiply By'));
                errMsgAll.push(errMsg);
            }

            /** Validate Added By */
            if (!checkNullOrBlank(addedBy)) {
                const errMsg = t("JSE124").replace('%s', t('Added By'));
                errMsgAll.push(errMsg);
            }
            else if (!validateNumberOnly(addedBy)) {
                const errMsg = t('JSE005').replace('%s', t('Added By'));
                errMsgAll.push(errMsg);
            }
        }
        if (caculateSetting == 2) {
            if (isEmpty(currency)) {
                const errMsg = t("JSE126").replace('%s', t('Payment Type'));
                errMsgAll.push(errMsg);
            }
            if (!checkNullOrBlank(rate)) {
                const errMsg = t("JSE126").replace('%s', t('User Defined OT Based On'));
                errMsgAll.push(errMsg);
            }

            /** Validate Hourly Rate */
            else if (rate == "1") {
                if (!checkNullOrBlank(hourly)) {
                    const errMsg = t("JSE124").replace('%s', t('Hourly Rate'));
                    errMsgAll.push(errMsg);
                }
                else if (!validateNumberOnly(hourly)) {
                    const errMsg = t("JSE005").replace('%s', t('Hourly Rate'));
                    errMsgAll.push(errMsg);
                }
                else if (hourly == 0) {
                    const errMsg = t("JSE032").replace('%s', t('Hourly Rate'));
                    errMsgAll.push(errMsg);
                }
            }

            /** Validate Daily Rate */
            else if (rate == "2") {
                if (!checkNullOrBlank(daily)) {
                    const errMsg = t("JSE124").replace('%s', t('Daily Rate'));
                    errMsgAll.push(errMsg);
                }
                else if (!validateNumberOnly(daily)) {
                    const errMsg = t("JSE005").replace('%s', t('Daily Rate'));
                    errMsgAll.push(errMsg);
                }
                else if (daily == 0) {
                    const errMsg = t("JSE032").replace('%s', t('Daily Rate'));
                    errMsgAll.push(errMsg);
                }
            }
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
    const saveOK = async () => {
        setShow(!show)
        let url;
        let method;
        if (editData == "") {
            url = ApiPath.overtimeRateSave;
            method = 'post';
        }
        else {
            url = ApiPath.overtimeRateUpdate + editData;
            method = 'put';
        }
        let params = {
            "shift_normal_rule_id": selectShiftName,
            "overtime_name": overtimeTitle,
            "setting_type": Number(caculateSetting),
            "based_on_method_id": basedOn ? 1 : 2,
            "calculate_method_id": basedOn ? selectTotalMethod : selectBasicMethod,
            "m_factor": Number(multiplyBy),
            "e_addition": Number(addedBy),
            "currency_id": currency,
            "user_hourly_rate": isEmpty(hourly) ? null : Number(hourly),
            "user_daily_rate": isEmpty(daily) ? null : Number(daily),
            "free_time_limit": freeTimeLimit == null ? "00:00" : freeTimeLimit,
            "set_minute_range_used": minuteRangeChange ? 1 : 2,
            "paid_with_salary": payWithSalary ? 1 : 0,
            "f_divisor": basedOn ? (isEmpty(totalMethodValue) ? null : Number(totalMethodValue)) : (isEmpty(basicMethodValue) ? null : Number(basicMethodValue)),
            "company_id": ApiPath.companyID,
            "language": ApiPath.lang,
            "created_emp": ApiPath.loginEmp,
            "updated_emp": ApiPath.loginEmp
        }
        let obj = { package_name: 'hr', url: url, method: method, params };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setSuccess("");
        }
        else {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setShiftName(firstSN);
            setSelectShiftName([]);
            setBasedOn(true);
            setSelectBasicMethod(9);
            setSelectTotalMethod(3);
            setMultiplyBy("1");
            setAddedBy("0");
            setOvertimeTitle("");
            setCaculateSetting(1);
            setFreeTimeLimit("00:00");
            setMinuteRangeChange();
            setCurrency();
            setChooseRate();
            setHourly();
            setDaily();
            setPayWithSalary(true);
            setTotalMethodValue("");
            setBasicMethodValue("");
            setError([]);
            setSuccess([response.data.message]);
            setEditData("");
        }
    }
    /** End Save/Update Function */
    /** Start Edit Function */
    let editIndex = async (edit_id) => {
        setLoading(true);
        let obj = { package_name: 'hr', url: ApiPath.overtimeRateUpdate + edit_id, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
        }
        else {
            let tempCalculateMethod = response.data.data['calculate_method_id'];
            let tempBasedOn = response.data.data['based_on_method_id'];
            let tempAddition = response.data.data['e_addition'];
            let tempMinuteRange = response.data.data['set_minute_range_used'];
            let tempHourlyRateCurrency = response.data.data['user_hourly_rate_currency'];
            let tempDailyRateCurrency = response.data.data['user_daily_rate_currency'];
            let tempHourlyRate = response.data.data['user_hourly_rate'];
            let tempDailyRate = response.data.data['user_daily_rate'];
            let tempSettingType = response.data.data['setting_type'];
            setUsedFlag(response.data.flag);
            setSelectShiftName(response.data.data['shift_normal_rule_id']);
            setOvertimeTitle(response.data.data['overtime_name']);
            setCaculateSetting(tempSettingType);
            setBasedOn(tempSettingType == 1 ? (tempBasedOn == 1 ? true : false) : true);
            if (tempBasedOn == 1) {
                setSelectTotalMethod(response.data.data['calculate_method_id']);
                setTotalMethodValue((tempCalculateMethod == 2) ? response.data.data['f_divisor'] : "");
            }
            else if (tempBasedOn == 2) {
                setSelectBasicMethod(response.data.data['calculate_method_id']);
                setBasicMethodValue((tempCalculateMethod == 8) ? response.data.data['f_divisor'] : "");
            }
            else {
                setSelectTotalMethod(3);
                setTotalMethodValue("");
                setSelectBasicMethod(9);
                setBasicMethodValue("");
            }
            setMultiplyBy(response.data.data['m_factor']);
            setAddedBy(tempAddition == 0 || tempAddition == null ? "0" : tempAddition);
            setCurrency(tempHourlyRateCurrency == null ? tempDailyRateCurrency : tempHourlyRateCurrency);
            setChooseRate(tempSettingType == 2 ? (tempHourlyRate == null ? "2" : "1") : "");
            setHourly(tempHourlyRate);
            setDaily(tempDailyRate);
            setFreeTimeLimit(response.data.data['free_time_limit']);
            setMinuteRangeChange(tempMinuteRange == 1 ? true : false);
            setPayWithSalary(response.data.data['paid_with_salary']);
            setError([]);
            setSuccess("");
        }
    }
    return (
        <CRow className="overtime-rate-setting">
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
                    cancel={() => setShow(!show)} saveOK={saveOK} updateOK={saveOK}
                />
                <CCard style={{ focus: true }}>
                    <CCardHeader>
                        <h5>{t('Overtime Rate Setting')}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <OvertimeRateSettingShiftNameBox
                            usedFlag={usedFlag}
                            shiftName={shiftName}
                            chooseShiftName={chooseShiftName}
                            selectShiftName={selectShiftName}
                            editData={editData} />
                        <OvertimeRateSettingOvertimeTitleBox
                            overtimeTitle={overtimeTitle}
                            overtimeTitleChange={overtimeTitleChange}
                            editData={editData}
                            usedFlag={usedFlag} />
                        <OvertimeRateSettingCalculateSettingBox
                            usedFlag={usedFlag}
                            accordionChange={accordionChange}
                            accordion={accordion}
                            caculateSetting={caculateSetting}
                            caculateSettingChange={caculateSettingChange}
                            basedOn={basedOn}
                            basedOnChange={basedOnChange}
                            caculateMethodTotal={caculateMethodTotal}
                            caculateMethodBasic={caculateMethodBasic}
                            chooseTotalMethod={chooseTotalMethod}
                            selectTotalMethod={selectTotalMethod}
                            totalMethodValue={totalMethodValue}
                            getTotalMethodValue={getTotalMethodValue}
                            chooseBasicMethod={chooseBasicMethod}
                            selectBasicMethod={selectBasicMethod}
                            basicMethodValue={basicMethodValue}
                            getBasicMethodValue={getBasicMethodValue}
                            multiplyChange={multiplyChange}
                            multiplyBy={multiplyBy}
                            addedChange={addedChange}
                            addedBy={addedBy}
                            currencies={currencies}
                            getCurrency={getCurrency}
                            currency={currency}
                            chooseRate={chooseRate}
                            rate={rate} hourly={hourly}
                            daily={daily} getHourly={getHourly}
                            getDaily={getDaily} editData={editData} />
                        <OvertimeRateSettingFreeTimeLimitBox
                            freeTimeLimit={freeTimeLimit}
                            freeTimeLimitChange={freeTimeLimitChange}
                            editData={editData} usedFlag={usedFlag} />
                        <OvertimeRateSettingSetMinuteRangeBox
                            usedFlag={usedFlag} minuteRangeChange={minuteRangeChange}
                            getMinuteRangeChange={getMinuteRangeChange}
                            searchMinuteRange={searchMinuteRange}
                            minuteRangeTable={minuteRangeTable}
                            payWithSalary={payWithSalary}
                            getPayWithSalary={getPayWithSalary}
                            editData={editData} />
                        <SaveAndCancelOvertimeRateSetting
                            saveData={saveData}
                            cancelData={cancelData}
                            usedFlag={usedFlag} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function OvertimeRateSetting() { return (<Welcome />) }
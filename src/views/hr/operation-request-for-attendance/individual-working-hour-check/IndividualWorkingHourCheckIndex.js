/* eslint-disable eqeqeq */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import Message from '../../../brycen-common/message/Message';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';
import SearchIndividualWorkingHourCheck from './SearchIndividualWorkingHourCheck';
import IndividualWorkingHourCheckTable from './IndividualWorkingHourCheckTable';
import ConfigTotalLeave from './ConfigTotalLeave';
import Moment from 'moment';

function LegacyWelcomeClass({ t }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);   // For Error Message
    const [success, setSuccess] = useState("");
    const [employeeName, setEmployeeName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [selectedFromDate, setSelectedFromDate] = useState(null); // For Joined Start Date
    const [selectedToDate, setSelectedToDate] = useState(null);     // For Joined End Date
    const [mainTable, setMainTable] = useState([]);  // for main table
    const [totalLeave, setTotalLeave] = useState([]);  // for total leave data
    const [clearData, setClearData] = useState('');
    const [viewPermissionAPI, setViewPermissionAPI] = useState();   // For View_Permission API
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
    * If clearData is changed, remove array in autocomplete
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        if (clearData !== '') {
            setIdArr([]); setNameArr([]); setCodeArr([]);
        }
    }, [clearData]);

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
        loadViewPermission();
    }, []);

    /**
    * GET VIEW PERMISSION
    *
    * @author  v_hao
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadViewPermission = async () => {
        let params = {
            login_employee_id: ApiPath.loginEmp
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            setViewPermissionAPI(response.data.view_permission);
            if (parseInt(response.data.view_permission) === 0) {
                setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
                setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
                setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
            }
        }
    };

    /**
    * change autocomplete
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const changeAutocomplete = async (type, i) => {
        setError([]); setSuccess([]); setClearData('');

        // type is id, show name in Employee ID and clear remain input
        if (type === 'id') {
            setEmployeeID(i.target.value); setEmployeeCode(''); setEmployeeName('');
        }
        // type is code, show name in Employee Code and clear remain input
        else if (type === 'code') {
            setEmployeeID(''); setEmployeeCode(i.target.value); setEmployeeName('');
        }
        // type is name, show name in Employee Name and clear remain input
        else {
            setEmployeeID(''); setEmployeeCode(''); setEmployeeName(i.target.value);
        }

        // if empty, remove data from autocomplete
        if (i.target.value === '') {
            setClearData('clear');
        } else {
            let obj = {
                package_name: 'erp',
                url: `api/${ApiPath.customerName}/employee/${type}-autocomplete-search`,
                method: 'post',
                params: { search_item: i.target.value, company_id: ApiPath.companyID }
            }
            let response = await ApiRequest(obj);
            if (response.flag === false) {
                setError(response.message); setClearData('clear');
            } else {
                (type === 'id') ? setIdArr(response.data.data) :
                    (type === 'code') ? setCodeArr(response.data.data) : setNameArr(response.data.data);
            }
        }
    }

    /**
    * select autocomplete
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const selectAutocomplete = async (val, obj) => {
        setClearData('clear');
        let object = {
            package_name: 'erp',
            url: ApiPath.employeeAutoCompleteResult,
            method: 'post',
            params: { id: obj.id, company_id: ApiPath.companyID }
        };
        let response = await ApiRequest(object);
        if (response.flag === false) {
            setError(response.message);
        } else {
            setEmployeeID(response.data.data[0].employee_id);
            setEmployeeName(response.data.data[0].name);
            setEmployeeCode(response.data.data[0].employee_code);
        }
    }

    let range1_start = null;
    let range1_end = null;
    let range2_start = null;
    let range2_end = null;
    async function getRangeDate(id) {
        let params = {
            "company_id": ApiPath.companyID,
            "employee_id": id,
            "language": ApiPath.lang,
        }
        let obj = { package_name: 'hr', url: ApiPath.GetDateRange, method: 'post', params };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        }
        else {
            if (response.data.date_range1_start != null) {
                range1_start = Moment(response.data.date_range1_start).format('YYYY-MM-DD');
                range1_end = Moment(response.data.date_range1_end).format('YYYY-MM-DD');
                if (response.data.date_range2_start != null) {
                    range2_start = Moment(response.data.date_range2_start).format('YYYY-MM-DD');
                    range2_end = Moment(response.data.date_range2_end).format('YYYY-MM-DD');
                }
            }
        }
    }

    async function searchAPI(request) {
        let fromDate = "";
        let toDate = "";
        const msgError = [];
        const msgErrorDate = [];
        if (isEmpty(employeeID)) {
            msgError.push(t("JSE126").replace("%s", t("Employee ID")));
        }

        if (!isEmpty(selectedFromDate)) {
            fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');
        } else {
            let errMsg = t('JSE126').replace('%s', t('From Date'));
            msgError.push(errMsg);
        }
        /* check to date is null */
        if (!isEmpty(selectedToDate)) {
            toDate = Moment(selectedToDate).format('YYYY-MM-DD');
        } else {
            let errMsg = t('JSE126').replace('%s', t('To Date'));
            msgError.push(errMsg);
        }
        /* check from date > to date */
        if (!isEmpty(fromDate) && !isEmpty(toDate) && fromDate > toDate) {
            let errMsg = t('JSE007').replace('%s', t('To Date')).replace('%s', t('From Date'));
            msgError.push(errMsg);
        }
        if (!isEmpty(fromDate) && !isEmpty(toDate) && fromDate <= toDate && !isEmpty(employeeID)) {
            await getRangeDate(employeeID);
            if (range1_start != null && range2_start == null) {
                if (fromDate < range1_start || toDate > range1_end) {
                    let errMsg = t("JSE146").replace('%s', range1_start).replace('%s', range1_end);
                    msgError.push(errMsg);
                }
            }
            else {
                if (fromDate < range1_start || (fromDate > range1_end && fromDate < range2_start) || fromDate > range2_end) {
                    let errMsg = t("JSE144").replace('%s', range1_start).replace('%s', range1_end).replace('%s', range2_start).replace('%s', range2_end);
                    msgError.push(errMsg);
                }
                else if (toDate < range1_start || (toDate > range1_end && toDate < range2_start) || toDate > range2_end) {
                    let errMsg = t("JSE144").replace('%s', range1_start).replace('%s', range1_end).replace('%s', range2_start).replace('%s', range2_end);
                    msgError.push(errMsg);
                }
                else if ((fromDate >= range1_start && fromDate <= range1_end) && (toDate >= range2_start && toDate <= range2_end)) {
                    let errMsg = t("JSE144").replace('%s', range1_start).replace('%s', range1_end).replace('%s', range2_start).replace('%s', range2_end);
                    msgError.push(errMsg);
                }
            }
        }
        if (!isEmpty(msgError)) {
            setError(msgError);
            setMainTable([]);
            setTotalLeave([]);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            // } else if (!isEmpty(msgErrorDate)) {
            //     setError(msgErrorDate);
            //     setMainTable([]);
            //     setTotalLeave([]);
            //     window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        else {
            setError([]);
            setSuccess('');
            let params = {
                "company_id": ApiPath.companyID,
                "language": ApiPath.lang,
                "employee_id": employeeID,
                "employee_code": employeeCode,
                "employee_name": employeeName,
                "from_date": fromDate,
                "to_date": toDate,
            }
            let obj = { package_name: 'hr', url: ApiPath.SearchWorkingHour, method: 'post', params };
            setLoading(true);
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setMainTable([]);
                setTotalLeave([]);
            }
            else {
                let data = response.data.individual_working_hour_check;
                data.employee_id = employeeID;
                setMainTable([data]);
                let leave = data.total_leaves;
                setTotalLeave(leave)
            }
        }
    }
    /** End Search Function */

    /** Start Date In FormSearch */
    let handleFromDateChange = (e) => {
        setSelectedFromDate(e);
    };
    let handleToDateChange = (e) => {
        setSelectedToDate(e);
    };
    /** End Date In FormSearch */

    /** Edit Function */
    const removeMessage = () => {
        setError("");
    }
    return (
        <CRow className="individual-working">
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <CCard>
                    <CCardHeader>
                        <h5 id="cardTitle">{t('Individual Working Hour Check')}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchIndividualWorkingHourCheck
                            viewPermissionAPI={viewPermissionAPI}
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            handleToDateChange={handleToDateChange}
                            handleFromDateChange={handleFromDateChange}
                            selectedFromDate={selectedFromDate}
                            selectedToDate={selectedToDate}
                            searchAPI={searchAPI}
                        />
                        <IndividualWorkingHourCheckTable
                            mainTable={mainTable}
                        />
                        <ConfigTotalLeave
                            mainTable={mainTable}
                            totalLeave={totalLeave}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function IndividualWorkingHourCheckIndex() { return (<Welcome />) }

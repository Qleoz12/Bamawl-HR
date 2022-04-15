/**
* Allowance register
*
* @author  ht_nguyen
* @create  02/06/2021 (D/M/Y)
* @param
* @return
*/
import React, { useState, useCallback, useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol,
    CAlert
} from "@coreui/react";

import { checkNullOrBlank, englishCharacterNumberOnly } from "../../../hr/hr-common/common-validation/CommonValidation";
import { withTranslation } from 'react-i18next';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import AllowanceRegisterForm from "./AllowanceRegisterForm";
import SaveAndCancelAllowanceRegister from "./SaveAndCancelAllowanceRegister";
import Confirmation from "./../../../brycen-common/confirmation/Confirmation";
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

function AllowanceRegisterIndex({ t, i18n }) {

    /** Start Assign label  */
    const title = t("Allowance Register");

    /** End Assign label  */

    const [error, setError]                              = useState([]);           // for show error when submit form
    const [success, setSuccess]                          = useState([]);           // for show status when submit form
    const [allowanceIDToEdit, setAllowanceIDToEdit]      = useState(null);           // for edit form when received from another page

    /** Value  of Form */
    const [shiftNormalRuleId, setShiftNormalRuleId]      = useState([]);           // for seleted shift normal rule id
    const [allowanceName, setAllowanceName]              = useState("");           // for selected allowance name
    const [allowanceCategory, setAllowanceCategory]      = useState(2);            // for selected allowance category
    const [allowanceType, setAllowanceType]              = useState(1);            // for selected allowance type
    const [basicSalaryInclude, setBasicSalaryInclude]    = useState(true);         // for switch basic salary include
    const [totalCalculateInclude, setTotalSalaryInclude] = useState(true);         // for switch total salary include
    const [taxCalculateInclude, setTaxCalculateInclude]  = useState(true);         // for switch tax calculate include
    const [loading,setLoading]                               = useState(false);//for loading page
    const [content, setContent]                              = useState('');// for content
    const [type, setType]                                    = useState('');// for type
    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  lq_don
    * @create  30/07/2021 (D/M/Y)
    * @param
    * @return
    */
         useEffect(() => {
            if (error.length > 0 || success.length > 0) {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }
        }, [error, success]);
    /** End Value  of Form*/
    useEffect(() => {
        setLoading(true);
        ApiViewPermission.loadViewPermission();
        loadShiftNameAPI();
        formLoad();
    }, [])


    /** Start API for ShiftName */
    const [shiftNameAPI, setShiftNameAPI] = useState('');
    const loadShiftNameAPI = async() => {
        let url = `${ApiPath.AllowanceRegisterGetShiftName}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setShiftNameAPI([]);
        }else{
            let data = response.data.data;
            data && setShiftNameAPI(data);
        }
        setLoading(false);
    }
    /** End API for ShiftName */


    /** Form load Start*/
    const [formLoadCase, setFormLoadCase] = useState('');
    const [isNullAllowance, setNullAllowance] = useState(false);
    const formLoad =async()=> {
        // 3 case of formload: normal load, normal edit and onlyshow data.
        // Normal edit when don't have localStorage : RETURN_OF_AR_DATA
        // Normal edit when have localstorage : RETURN_OF_AR_DATA, and flag_edit is true
        // Only Show when have localstorage: RETURN_OF_AR_DATA, and flag_edit is false
        function normalLoad() {
            setFormLoadCase('normalLoad');
            setShiftNormalRuleId([]);
            setAllowanceName("");
            setAllowanceCategory(2);
            setAllowanceType(1);
            setBasicSalaryInclude(true);
            setTotalSalaryInclude(true);
            setTaxCalculateInclude(true)
        }
        function normalEdit(data) {
            setFormLoadCase('normalEdit');
            setAllowanceName(data.allowance_name);
            setAllowanceCategory(data.allowance_category);
            setAllowanceType(data.allowance_type);
            setBasicSalaryInclude(data.basic_salary_include === 1 ? true : false);
            setTotalSalaryInclude(data.total_calculate_include === 1 ? true : false);
            setTaxCalculateInclude(data.tax_calculate_include === 1 ? true : false);
            setShiftNormalRuleId(toArray(data.shift_normal_rule_id));
        }
        function onlyShow(data) {
            setFormLoadCase('onlyShow');
            setAllowanceName(data.allowance_name);
            setAllowanceCategory(data.allowance_category);
            setAllowanceType(data.allowance_type);
            setBasicSalaryInclude(data.basic_salary_include === 1 ? true : false);
            setTotalSalaryInclude(data.total_calculate_include === 1 ? true : false);
            setTaxCalculateInclude(data.tax_calculate_include === 1 ? true : false);
            setShiftNormalRuleId(toArray(data.shift_normal_rule_id));
        }
        let edit_Data = JSON.parse(sessionStorage.getItem("RETURN_OF_AR_DATA"));
        sessionStorage.removeItem("RETURN_OF_AR_DATA");
        if (edit_Data !== null) {
            const allowanceIDToEdit = edit_Data;
            setAllowanceIDToEdit(allowanceIDToEdit);
            let url = `${ApiPath.AllowanceRegisterEditAllowanceID}${allowanceIDToEdit}?language=${ApiPath.lang}`;
            let obj = { package_name: 'hr', url: url, method: 'get' };
            let response = await ApiRequest(obj);
            const { status, flag_edit, data } = response.data;
            if(response.flag === false){
                setError(response.message);
            }else{
                if(flag_edit)
                    normalEdit(data);
                else if(!flag_edit)
                    onlyShow(data);
                else
                setNullAllowance(true); 
            }
            setLoading(false);
        } else {
            normalLoad();
        }
    }
    function toArray(number) {
        if (typeof (number) === 'number') {
            let arr = [];
            arr.push(number);
            return arr;
        }
        if (typeof (number) === 'object') {
            return Array.from(number, Number);
        }
    }
    /** Form load End*/


    /** Start get Shiftname, Allowance Category, Allowance Type value funcion */
    function handleTick(e) {
        let name = e.target.name;
        let value = +e.target.value;
        switch (name) {
            case 'shift-name':
                if (!shiftNormalRuleId.includes(value)) {
                    setShiftNormalRuleId(oldArray => [...oldArray, value]);
                } else {
                    setShiftNormalRuleId(shiftNormalRuleId.filter(item => item !== value));
                }
                break;

            case 'allowance-category':
                setAllowanceCategory(value);
                break;

            case 'allowance-type':
                setAllowanceType(value);
                break;

            default:
                break;
        }
    }
    /** End get Shiftname, Allowance Category, Allowance Type value funcion */


    /** Start get allowance_name value function */
    function onAllowanceTitleChange(e) {
        let value = e.target.value;
        let inputString = value.substring(0,200);
        setAllowanceName(inputString);
    }
    /** End get allowance_name value function */


    /** Start get allowance_setting value function */
    function handleSwitch(e) {
        let name = e.target.name;
        switch (name) {
            case 'swBasicSalary':
                setBasicSalaryInclude(!basicSalaryInclude);
                break;
            case "swTotalSalary":
                setTotalSalaryInclude(!totalCalculateInclude);
                break;
            case "swIncomeTax":
                setTaxCalculateInclude(!taxCalculateInclude);
                break;
            default:
                break;
        }
    }
    /** End get allowance_setting value function */


    /** Start validate before save function */
    function isValidate(data) {
        const dataClone = JSON.parse(JSON.stringify(data))
        setError([]);
        setSuccess("");
        let allError = [];

        function checkNull(state, nameErr) {
            if (!checkNullOrBlank(state)) {
                let errMsg = t('JSE124').replace('%s', nameErr)
                allError.push(errMsg);
            }
        }
        function checkOutRange(state, range, nameErr) {
            if (checkNullOrBlank(state) && !range.includes(state)) {
                let errMsg = t('JSE009').replace("%s", nameErr);
                allError.push(errMsg);
            }
        }
        function checkEngNumChar(state, nameErr) {
            if (!englishCharacterNumberOnly(state)) {
                let errMsg = t('JSE10019').replace("%s", nameErr);
                allError.push(errMsg);
            }
        }

        // check ShiftName
        if (typeof (shiftNameAPI) === 'string') return;
        const shiftNameRange = shiftNameAPI.map(i => i.id);
        const listChekecedID = dataClone.shift_normal_rule_id;
        const shiftNameErr = t('Shift Name');
        checkNull(listChekecedID, shiftNameErr);
        listChekecedID.forEach(item => {
            checkOutRange(item, shiftNameRange, shiftNameErr);
        })

        // check AllowanceTitle
        const allowanceName = dataClone.allowance_name;
        const allowanceTitleErr = t('Allowance Title');
        if (!checkNullOrBlank(allowanceName)) {
            checkNull(allowanceName, allowanceTitleErr);
        } else {
            checkEngNumChar(allowanceName, allowanceTitleErr);
        }

        // check Allowance Category
        const allowanceCategoryRange = [1, 2, 3]   // from AllowanceRegisterForm.js 
        const allowanceCategoryErr = t('Allowance Category');
        const checkedAllowanceCategory = dataClone.allowance_category;
        checkNull(checkedAllowanceCategory, allowanceCategoryErr);
        checkOutRange(checkedAllowanceCategory, allowanceCategoryRange, allowanceCategoryErr);

        // check Allowance Type
        const allowanceTypeRange = [1, 2, 3, 4]   // from AllowanceRegiserForm.js 
        const allowanceTypeErr = t('Allowance Type');
        const selectedAllowanceType = dataClone.allowance_type;
        checkNull(selectedAllowanceType, allowanceTypeErr);
        checkOutRange(selectedAllowanceType, allowanceTypeRange, allowanceTypeErr);

        // Return
        if (checkNullOrBlank(allError)) {
            setError(allError);
            return false;
        } else {
            return true;
        }
    }
    /** End validate before save function */

    /** Start Click Save form function */
    const [saveModalBox, setSaveModalBox] = useState(false);
    function saveData() {

        const dataToSend = {
            "company_id": ApiPath.companyID,
            "shift_normal_rule_id": shiftNormalRuleId,
            "allowance_name": allowanceName.trim(),
            "allowance_category": allowanceCategory,
            "allowance_type": allowanceType,
            "basic_salary_include": basicSalaryInclude ? 1 : 2,
            "tax_calculate_include": taxCalculateInclude ? 1 : 2,
            "total_calculate_include": totalCalculateInclude ? 1 : 2,
            "updated_emp": ApiPath.updatedEmp,
            "language": ApiPath.lang
        }
        if (!isValidate(dataToSend)) return;

        switch (formLoadCase) {
            case 'normalLoad':
                createNew(
                    {...dataToSend, 
                        "created_emp": ApiPath.createdEmp
                    });
                break;
            case 'normalEdit':
                editAllowance(dataToSend);
                break;
            case 'onlyShow':
                editAllowance(dataToSend);
                break;
            default:
                break;
        }
    }

    const createNew  =async(data)=> {
        let params = data;
        let obj = { package_name: 'hr', url: ApiPath.AllowanceRegisterSave, method: 'post', params };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            response.message && setError(response.message)
            setSuccess("");
        } else {
            setError([]);
            response.data.message && setSuccess([response.data.message]);
            // handleClear();
            setFormLoadCase("normalLoad");
            formLoad();
        }
    }
    const editAllowance=async(data)=> {
        const allowanceIdToEdit = allowanceIDToEdit;
        let params=data;
        let obj = { package_name: 'hr', url: `${ApiPath.AllowanceRegisterEdit}${allowanceIdToEdit}`, method: 'put', params };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            response.message && setError(response.message)
            setSuccess("");
        } else {
            setError([]);
            response.data.message && setSuccess([response.data.message]);
            setFormLoadCase("normalLoad");
            formLoad();
        }
    }
    function saveOK() {
        setSaveModalBox(!saveModalBox);
        saveData();
    }
    function saveAlert() {
        const dataToSend = {
            "company_id": ApiPath.companyID,
            "shift_normal_rule_id": shiftNormalRuleId,
            "allowance_name": allowanceName.trim(),
            "allowance_category": allowanceCategory,
            "allowance_type": allowanceType,
            "basic_salary_include": basicSalaryInclude ? 1 : 2,
            "tax_calculate_include": taxCalculateInclude ? 1 : 2,
            "total_calculate_include": totalCalculateInclude ? 1 : 2,
            "created_emp": ApiPath.createdEmp,
            "updated_emp": ApiPath.updatedEmp,
            "language": ApiPath.lang
        }
        if(!isValidate(dataToSend)) return;

        setSaveModalBox(!saveModalBox);
        setContent(t('Are you sure want to save?')); setType('save');
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    /** End Click Save form function */


    /** Start Cancel All Data function */
    function handleClear() {
        setError([]);
        setSuccess([]);
        setFormLoadCase("normalLoad");
        formLoad();
    }
    /** End Cancel All Data function */
    return (
        <CRow className="allowance-register">
            <CCol xs="12">
                {/* Error and success msg */}
                <Loading start={loading} />
                <Message success={success} error={error} />
                
                {/* <Confirmation id='lblConfirmation'
                    saveModalBox={saveModalBox}
                    closeSaveAlert={saveAlert}
                    saveOK={saveOK}
                /> */}
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                    show={saveModalBox}
                    cancel={saveAlert}
                    saveOK={saveOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5><label>{title}</label></h5>
                    </CCardHeader>
                    <CCardBody>
                        {
                            formLoadCase === '' && !isNullAllowance &&
                            <CAlert color='secondary'>{t('JSE022')}</CAlert>
                        }
                        {
                            formLoadCase === '' && isNullAllowance &&
                            <CAlert color='secondary'>{t('JSE009').replace('%s', t('Allowance'))}</CAlert>

                        }
                        {
                            formLoadCase === ('normalLoad') &&
                            <AllowanceRegisterForm
                                shiftNameAPI={shiftNameAPI}
                                shiftNormalRuleId={shiftNormalRuleId}
                                allowanceName={allowanceName}
                                onAllowanceTitleChange={onAllowanceTitleChange}
                                allowanceCategory={allowanceCategory}
                                allowanceType={allowanceType}
                                handleTick={handleTick}
                                handleSwitch={handleSwitch}
                                basicSalaryInclude={basicSalaryInclude}
                                totalCalculateInclude={totalCalculateInclude}
                                taxCalculateInclude={taxCalculateInclude}
                                shiftNameDisabled={false}
                                allowanceTitleDisabled={false}
                                allowanceCategoryDisabled={false}
                                allowanceTypeDisabled={false}
                                allowanceSettingDisabled={false}
                            />
                        }
                        {
                            formLoadCase === 'normalEdit' &&
                            <AllowanceRegisterForm
                                shiftNameAPI={shiftNameAPI}
                                shiftNormalRuleId={shiftNormalRuleId}
                                allowanceName={allowanceName}
                                onAllowanceTitleChange={onAllowanceTitleChange}
                                allowanceCategory={allowanceCategory}
                                allowanceType={allowanceType}
                                handleTick={handleTick}
                                handleSwitch={handleSwitch}
                                basicSalaryInclude={basicSalaryInclude}
                                totalCalculateInclude={totalCalculateInclude}
                                taxCalculateInclude={taxCalculateInclude}
                                shiftNameDisabled={true}
                                allowanceTitleDisabled={false}
                                allowanceCategoryDisabled={false}
                                allowanceTypeDisabled={false}
                                allowanceSettingDisabled={false}
                            />
                        }
                        {
                            formLoadCase === 'onlyShow' &&
                            <AllowanceRegisterForm
                                shiftNameAPI={shiftNameAPI}
                                shiftNormalRuleId={shiftNormalRuleId}
                                allowanceName={allowanceName}
                                onAllowanceTitleChange={onAllowanceTitleChange}
                                allowanceCategory={allowanceCategory}
                                allowanceType={allowanceType}
                                handleTick={handleTick}
                                handleSwitch={handleSwitch}
                                basicSalaryInclude={basicSalaryInclude}
                                totalCalculateInclude={totalCalculateInclude}
                                taxCalculateInclude={taxCalculateInclude}
                                shiftNameDisabled={true}
                                allowanceTitleDisabled={true}
                                allowanceCategoryDisabled={true}
                                allowanceTypeDisabled={true}
                                allowanceSettingDisabled={true}
                            />
                        }
                        <SaveAndCancelAllowanceRegister
                            disableSave={formLoadCase==="onlyShow"}
                            saveAlert={saveAlert}
                            handleClear={handleClear}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}


const AllowanceForm = withTranslation()(AllowanceRegisterIndex);

export default function AllowanceRegister() {
    return (
        <AllowanceForm />
    )
};
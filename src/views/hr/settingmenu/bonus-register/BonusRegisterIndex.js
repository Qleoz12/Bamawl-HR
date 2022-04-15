/* eslint-disable no-use-before-define */
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLabel,
    CRow
} from '@coreui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import message from "../../../../common-message/commonMessage";
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import {
    checkNullOrBlankString,
    validateIntegerOnly,
    validateNumberOnly,is1Decimal
} from "../../../hr/hr-common/common-validation/CommonValidation";
import BonusRegisterBonusTitleBox from './BonusRegisterBonusTitleBox';
import BonusRegisterExperienceBox from './BonusRegisterExperienceBox';
import BonusRegisterPayWithSalaryBox from './BonusRegisterPayWithSalaryBox';
import BonusRegisterSalaryBox from './BonusRegisterSalaryBox';
import SaveBonusRegister from './SaveBonusRegister';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);

    const [yearData, setYearData] = useState("");
    const [selectYearData, setSelectYearData] = useState("");

    const [monthData, setMonthData] = useState("");
    const [selectMonthData, setSelectMonthData] = useState("");

    const [limitData, setLimitData] = useState("");
    const [selectLimitData, setSelectLimitData] = useState("");

    const [valueBonusTitle, setValueBonusTitle] = useState("");
    const [bonusTitleState, setBonusTitleState] = useState("");

    const [multiplyBy, setMultiplyBy] = useState(1);
    const [addedBy, setAddedBy] = useState(0);

    const [payWithSalary, setPayWithSalary] = useState(false);

    const [saveModalBox, setSaveModalBox] = useState(false);

    const [percentBasic, setPercentBasic] = useState("");
    const [percentTotal, setPercentTotal] = useState("");

    const [editData, setEditData] = useState(null); // for Edit data
    const [radioCheck, setRadioCheck] = useState(2);
    const [fixedAmount, setFixedAmount] = useState("");

    const [basic, setBasic] = useState(false);
    const [tax, setTax] = useState(false);
    const [total, setTotal] = useState(false);

    const [content, setContent] = useState('');
    const [type, setType] = useState('');

    /* RADIO ACTION */
    const [Check1, setCheck1] = useState(false);      // For select checkbox all or not
    const [Check2, setCheck2] = useState(true);
    const [Check3, setCheck3] = useState(false);
    const [Check4, setCheck4] = useState(false);
    const [Check5, setCheck5] = useState(false);
    const [Check6, setCheck6] = useState(false);
    const [Check7, setCheck7] = useState(false);

    const [includeBasic1, setIncludeBasic1] = useState(false);
    const [includeBasic2, setIncludeBasic2] = useState(false);
    const [includeBasic3, setIncludeBasic3] = useState(false);
    const [includeBasic4, setIncludeBasic4] = useState(false);
    const [includeBasic5, setIncludeBasic5] = useState(false);
    const [includeBasic6, setIncludeBasic6] = useState(false);
    const [includeBasic7, setIncludeBasic7] = useState(false);
    const [includeTotal4, setIncludeTotal4] = useState(false);
    const [includeTotal5, setIncludeTotal5] = useState(false);
    const [includeTotal6, setIncludeTotal6] = useState(false);

    const [includeTax1, setIncludeTax1] = useState(false);
    const [includeTax2, setIncludeTax2] = useState(false);
    const [includeTax3, setIncludeTax3] = useState(false);
    const [includeTax4, setIncludeTax4] = useState(false);
    const [includeTax5, setIncludeTax5] = useState(false);
    const [includeTax6, setIncludeTax6] = useState(false);
    const [includeTax7, setIncludeTax7] = useState(false);

    const [selectedCurrencies, setSelectedCurrencies] = useState("");
    const [currencies, setCurrencies] = useState("");


    /** Start Form Load */
    useEffect(() => {
        setLoading(true);
        ApiViewPermission.loadViewPermission();
        loadCurrency();
        MockYearData();
        MockMonthData();
        MockLimitData();

        let edit_Data = JSON.parse(localStorage.getItem("RETURN_BONUS_ID"));
        localStorage.removeItem("RETURN_BONUS_ID");
        if (edit_Data != null) {
            if (!validateIntegerOnly(edit_Data)) {
                let errMsg = t(message.JSE005).replace('%s', t('RETURN_BONUS_ID'))
                setError([errMsg]);
            }
            else {
                let edit_id = edit_Data;
                setEditData(edit_id);
                editIndex(edit_id);
            }
        }

    }, [loadCurrency, t, MockLimitData]);
    /** End Form Load */


    /** start monthChange */

    const monthChange = (e) => {
        setSelectMonthData(e.target.value);

    }
    /** end monthChange */

    /** start yearChange */
    const yearChange = (e) => {
        setSelectYearData(e.target.value);
    }
    /** end yearChange */

    /** start limitChange */
    const limitChange = (e) => {
        setSelectLimitData(e.target.value);
    }
    /** end limitChange */

    /** start API for Currency */
    const [currencyAPI, setCurrencyAPI] = useState([]);
    const loadCurrency = useCallback(async () => {
        let data = {
            package_name: 'hr',
            url: ApiPath.currencies,
            method: 'get',
        }
        let response = await ApiRequest(data);
        setLoading(false);
        if (response.flag !== false) {
            setCurrencyAPI(response.data.data);
        }
    }, []);

    /** end API for Currency */

    /* MOCK DATA SELECT BOX */
    const MockYearData = () => {
        let data = []
        for (let i = 0; i <= 15; i++) {
            data.push({
                year: i.toString(),
            });
        }
        setYearData(data);
    }
    const MockMonthData = () => {
        let data = []
        for (let i = 0; i <= 11; i++) {
            data.push({
                month: i.toString(),
            });
        }
        setMonthData(data);
    }
    const MockLimitData = () => {
        let data = [
            {
                id: 1,
                value: t("below")
            },
            {
                id: 2,
                value: t("equal")
            },
            {
                id: 3,
                value: t("above")
            },
            {
                id: 4,
                value: t("and above")
            },
            {
                id: 5,
                value: t("and below")
            },
        ]
        setLimitData(data);
    }

    /* Get Data  */
    let getValueBonusTitle = (e) => {
        setValueBonusTitle(e.target.value.trim());
        setBonusTitleState(e.target.value);
    }
    let getMultiplyBy = (e) => {
        let value = e.target.value;
        let res = is1Decimal(value);
        if(value != "" ){
        if(res == true && value != "00"){
            if(value.length >1){
                let first = value.charAt(0);
                let second = value.charAt(1);
                if(first == 0 && second == "."){
                    setMultiplyBy(value);
                }else if( first != 0){
                    setMultiplyBy(value);
                }
            }else{
                setMultiplyBy(value);
            }
        }
        }else{
            setMultiplyBy("");
        }
    }
    let getAddedBy = (e) => {
        if (isDecimal(e.target.value)) {
            setAddedBy(e.target.value);
        }
    }
    let getPercentBasic = (e) => {
        if (isDecimal(e.target.value)) {
            setPercentBasic(e.target.value);
        }
    }
    let getPercentTotal = (e) => {
        if (isDecimal(e.target.value)) {
            setPercentTotal(e.target.value);
        }
    }
    let getPayWithSalary = (e) => {
        setPayWithSalary(e.target.checked);
    }
    let getCheck1 = (e) => {
        setCheck1(e.target.checked);
        setRadioCheck(1)
        refreshCardSalary();
        setAddedBy("");
        setMultiplyBy("");
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
        setCheck5(false);
        setCheck6(false);
        setCheck7(false);
    }
    let getCheck2 = (e) => {
        setCheck2(e.target.checked);
        setRadioCheck(2)
        refreshCardSalary();
        setAddedBy("");
        setMultiplyBy("");
        setCheck1(false);
        setCheck3(false);
        setCheck4(false);
        setCheck5(false);
        setCheck6(false);
        setCheck7(false);
    }
    let getCheck3 = (e) => {
        setCheck3(e.target.checked);
        setRadioCheck(3)
        refreshCardSalary();
        setAddedBy("");
        setMultiplyBy("");
        setCheck2(false);
        setCheck1(false);
        setCheck4(false);
        setCheck5(false);
        setCheck6(false);
        setCheck7(false);
    }
    let getCheck4 = (e) => {
        setCheck4(e.target.checked);
        setRadioCheck(7)
        // setCurrencies(1);
        // setSelectedCurrencies(1);
        refreshCardSalary();
        setAddedBy("");
        setMultiplyBy("");
        setAddedBy("0");
        setMultiplyBy("1");
        setCheck2(false);
        setCheck3(false);
        setCheck1(false);
        setCheck5(false);
        setCheck6(false);
        setCheck7(false);
    }
    let getCheck5 = (e) => {
        setCheck5(e.target.checked);
        setRadioCheck(5)
        refreshCardSalary();
        setAddedBy("");
        setMultiplyBy("");
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
        setCheck1(false);
        setCheck6(false);
        setCheck7(false);
    }
    let getCheck6 = (e) => {
        setCheck6(e.target.checked);
        setRadioCheck(6)
        refreshCardSalary();
        setAddedBy("");
        setMultiplyBy("");
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
        setCheck5(false);
        setCheck1(false);
        setCheck7(false);
    }
    let getCheck7 = (e) => {
        setCheck7(e.target.checked);
        setRadioCheck(4)
        refreshCardSalary();
        setAddedBy("");
        setMultiplyBy("");
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
        setCheck5(false);
        setCheck6(false);
        setCheck1(false);
    }
    let getIncludeBasic1 = (e) => {
        setIncludeBasic1(e.target.checked);
    }
    let getIncludeBasic2 = (e) => {
        setIncludeBasic2(e.target.checked);
    }
    let getIncludeBasic3 = (e) => {
        setIncludeBasic3(e.target.checked);
    }
    let getIncludeBasic4 = (e) => {
        setIncludeBasic4(e.target.checked);
    }
    let getIncludeBasic5 = (e) => {
        setIncludeBasic5(e.target.checked);
    }
    let getIncludeBasic6 = (e) => {
        setIncludeBasic6(e.target.checked);
    }
    let getIncludeBasic7 = (e) => {
        setIncludeBasic7(e.target.checked);
    }
    let getIncludeTax1 = (e) => {
        setIncludeTax1(e.target.checked);
    }
    let getIncludeTax2 = (e) => {
        setIncludeTax2(e.target.checked);
    }
    let getIncludeTax3 = (e) => {
        setIncludeTax3(e.target.checked);
    }
    let getIncludeTax4 = (e) => {
        setIncludeTax4(e.target.checked);
    }
    let getIncludeTax5 = (e) => {
        setIncludeTax5(e.target.checked);
    }
    let getIncludeTax6 = (e) => {
        setIncludeTax6(e.target.checked);
    }
    let getIncludeTax7 = (e) => {
        setIncludeTax7(e.target.checked);
    }
    let getIncludeTotal4 = (e) => {
        setIncludeTotal4(e.target.checked);
    }
    let getIncludeTotal5 = (e) => {
        setIncludeTotal5(e.target.checked);
    }
    let getIncludeTotal6 = (e) => {
        setIncludeTotal6(e.target.checked);
    }
    let selectedCurrentChange = (e) => {
        setSelectedCurrencies(parseInt(e.target.value));
        setCurrencies(parseInt(e.target.value));
    };
    let saveData = () => {
        if (Check1) {
            if (includeBasic1) setBasic(true);
            if (includeTax1) setTax(true);
        }
        if (Check2) {
            if (includeBasic2) setBasic(true);
            if (includeTax2) setTax(true);
        }
        if (Check3) {
            if (includeBasic3) setBasic(true);
            if (includeTax3) setTax(true);
        }
        if (Check4) {
            if (includeBasic4) setBasic(true);
            if (includeTax4) setTax(true);
            if (includeTotal4) setTotal(true);
        }
        if (Check5) {
            setPercentTotal("")
            if (includeBasic5) setBasic(true);
            if (includeTax5) setTax(true);
            if (includeTotal5) setTotal(true);
        }
        if (Check6) {
            setPercentBasic("")
            if (includeBasic6) setBasic(true);
            if (includeTax6) setTax(true);
            if (includeTotal6) setTotal(true);
        }
        if (Check7) {
            if (includeBasic7) setBasic(true);
            if (includeTax7) setTax(true);
        }
        if (isValidate()) {
            setSaveModalBox(!saveModalBox);
            if (editData) {
                setContent(t('Are you sure want to update?'));
                setType('update');
            } else {
                setContent(t('Are you sure want to save?'));
                setType('save');
            }
        }
        else {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }
    const getFixedAmount = (e) => {
        if (isDecimal(e.target.value)) {
            setFixedAmount(e.target.value);
        }
    }


    const refreshCardSalary = () => {
        setIncludeBasic1(false)
        setIncludeBasic2(false)
        setIncludeBasic3(false)
        setIncludeBasic4(false)
        setIncludeBasic5(false)
        setIncludeBasic6(false)
        setIncludeBasic7(false)
        setIncludeTax1(false)
        setIncludeTax2(false)
        setIncludeTax3(false)
        setIncludeTax4(false)
        setIncludeTax5(false)
        setIncludeTax6(false)
        setIncludeTax7(false)
        setIncludeTotal4(false)
        setIncludeTotal5(false)
        setIncludeTotal6(false)
        setFixedAmount("")
        setSelectedCurrencies("")
        setCurrencies("")
        setPercentBasic("")
        setPercentTotal("")
    }

    const refresh = () => {
        setBonusTitleState("");
        setValueBonusTitle("");
        setSelectYearData("");
        setSelectMonthData("");
        setSelectLimitData("");
        setPayWithSalary(false);
        setRadioCheck(2);
        setCheck2(true);
        setAddedBy(0);
        setMultiplyBy(1)
        setIncludeBasic1(false)
        setIncludeBasic2(false)
        setIncludeBasic3(false)
        setIncludeBasic4(false)
        setIncludeBasic5(false)
        setIncludeBasic6(false)
        setIncludeBasic7(false)
        setIncludeTax1(false)
        setIncludeTax2(false)
        setIncludeTax3(false)
        setIncludeTax4(false)
        setIncludeTax5(false)
        setIncludeTax6(false)
        setIncludeTax7(false)
        setIncludeTotal4(false)
        setIncludeTotal5(false)
        setIncludeTotal6(false)
        setFixedAmount("")
        setSelectedCurrencies("")
        setCurrencies("")
        setPercentBasic("")
        setPercentTotal("")
    }

    /**Check Validation */

    const isDecimal = (value) => {
        var decimalOnly = /^[]*?(\d{0,10})(\.\d{0,10})?$/;
        if (decimalOnly.test(value) && value.substring(0, 1) != ".") {
            return true;
        }
        return false;
    }

    function isValidate() {
        setError([]);
        setSuccess("");
        let allError = [];
        let check = true;
        if (!checkNullOrBlankString(valueBonusTitle)) {
            let errMsg = t("JSE001").replace("%s", t("Bonus Title"))
            allError.push(errMsg);
            check = false;
        }

        if (!validateNumberOnly(selectYearData)) {
            let errMsg = t("JSE005").replace('%s', t('Year'))
            allError.push(errMsg);
            check = false;
        }
        if (!validateNumberOnly(selectMonthData)) {
            let errMsg = t("JSE005").replace('%s', t('Month'))
            allError.push(errMsg);
            check = false;
        }
        if (!validateNumberOnly(selectLimitData)) {
            let errMsg = t("JSE005").replace('%s', t('Limit'))
            allError.push(errMsg);
            check = false;
        }

        if (typeof payWithSalary !== "boolean") {
            let errMsg = t("JSE009").replace('%s', t('Pay with salary'))
            allError.push(errMsg);
            check = false;
        }
        if (Check5 && !checkNullOrBlankString(percentBasic)) {
            let errMsg = t("JSE001").replace('%s', t('Type Percentage Basic Salary'))
            allError.push(errMsg);
            check = false;
        }
        else if (Check5 && !validateIntegerOnly(percentBasic)) {
            let errMsg = t("JSE005").replace('%s', t('Type Percentage Basic Salary'))
            allError.push(errMsg);
            check = false;
        }
        else if (Check5 && (parseInt(percentBasic) < 0 || parseInt(percentBasic) > 100)) {
            let errMsg = t("JSE009").replace('%s', t('Type Percentage Basic Salary'))
            allError.push(errMsg);
            check = false;
        }

        if (Check6 && !checkNullOrBlankString(percentTotal)) {
            let errMsg = t("JSE001").replace('%s', t('Type Percentage Total Salary'))
            allError.push(errMsg);
            check = false;
        }
        else if (Check6 && !validateIntegerOnly(percentTotal)) {
            let errMsg = t("JSE005").replace('%s', t('Type Percentage Total Salary'))
            allError.push(errMsg);
            check = false;
        }
        else if (Check6 && (parseInt(percentTotal) < 0 || parseInt(percentTotal) > 100)) {
            let errMsg = t("JSE009").replace('%s', t('Type Percentage Total Salary'))
            allError.push(errMsg);
            check = false;
        }

        if (Check4 && !checkNullOrBlankString(fixedAmount)) {
            let errMsg = t("JSE001").replace('%s', t('Type Amount'))
            allError.push(errMsg);
            check = false;
        }
        else if (Check4 && !validateIntegerOnly(fixedAmount)) {
            let errMsg = t("JSE005").replace('%s', t('Type Amount'))
            allError.push(errMsg);
            check = false;
        } else if (Check4 && fixedAmount > 2147483647) {
            let errMsg = t('JSE007').replace('%s', t('Type Amount')).replace('%s', t('2147483647'));
            allError.push(errMsg);
            check = false;
        }
        if (Check4 && !checkNullOrBlankString(selectedCurrencies)) {
            let errMsg = t("JSE001").replace('%s', t('Currency ID'))
            allError.push(errMsg);
            check = false;
        } else if (Check4 && !validateIntegerOnly(selectedCurrencies)) {
            let errMsg = t("JSE005").replace('%s', t('Currency ID'))
            allError.push(errMsg);
            check = false;
        }
        if (!checkNullOrBlankString(multiplyBy)) {
            let errMsg = t("JSE001").replace('%s', t('Multiply By'))
            allError.push(errMsg);
            check = false;
        }
        else if (multiplyBy == 0 ) {
            const errMsg = t("JSE032").replace('%s', t('Multiply By'));
            allError.push(errMsg);
            check = false;
        }
        if (!checkNullOrBlankString(addedBy)) {
            let errMsg = t("JSE001").replace('%s', t('Added By'))
            allError.push(errMsg);
            check = false;
        }
        else if (!validateIntegerOnly(addedBy)) {
            let errMsg = t("JSE005").replace('%s', t('Add By'));
            allError.push(errMsg);
            check = false;
        }
        if (!checkNullOrBlankString(radioCheck)) {
            let errMsg = t("JSE001").replace('%s', t('Method'))
            allError.push(errMsg);
            check = false;
        }
        else if (!validateIntegerOnly(radioCheck)) {
            let errMsg = t("JSE005").replace('%s', t('Method'))
            allError.push(errMsg);
            check = false;
        }
        if (typeof basic !== "boolean") {
            let errMsg = t("JSE009").replace('%s', t('Include Basic Salary'))
            allError.push(errMsg);
            check = false;
        }
        if (typeof total !== "boolean") {
            let errMsg = t("JSE009").replace('%s', t('Include Total Salary'))
            allError.push(errMsg);
            check = false;
        }
        if (typeof tax !== "boolean") {
            let errMsg = t("JSE009").replace('%s', t('Include Tax'))
            allError.push(errMsg);
            check = false;
        }
        setError(allError);
        if (check)
            return true;
    }
    /**Check Validation */

    /**Save Function */
    let saveOK = async () => {
        setSaveModalBox(!saveModalBox);
        setLoading(true);
        if (!editData) {
            let params = {
                m_factor: parseInt(multiplyBy),
                b_multiplier: percentBasic!=="" ? parseInt(percentBasic) : ((percentTotal!=="") ? parseInt(percentTotal) : null),
                e_addition: parseInt(addedBy),
                d_result: parseInt(fixedAmount),
                bonus_title: valueBonusTitle,
                bonus_year: selectYearData,
                bonus_month: selectMonthData,
                bonus_limit: selectLimitData,
                basic_salary_include: basic,
                tax_calculate_include: tax,
                total_calculate_include: total,
                paid_with_salary: payWithSalary,
                currency_id: selectedCurrencies,
                method_id: radioCheck,
                login_id: ApiPath.loginEmp,
                company_id: ApiPath.companyID,
                language: ApiPath.lang
            }
            let obj = { package_name: 'hr', url: ApiPath.employeeBonusRateSettingSave, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            } else {
                setSuccess([response.data.message]);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                refresh();
            }

        } else {
            let params = {
                m_factor: parseInt(multiplyBy),
                b_multiplier: percentBasic!=="" ? parseInt(percentBasic) : ((percentTotal!=="") ? parseInt(percentTotal) : null),
                e_addition: parseInt(addedBy),
                d_result: parseInt(fixedAmount),
                bonus_title: valueBonusTitle,
                bonus_year: selectYearData,
                bonus_month: selectMonthData,
                bonus_limit: selectLimitData,
                basic_salary_include: basic,
                tax_calculate_include: tax,
                total_calculate_include: total,
                paid_with_salary: payWithSalary,
                currency_id: selectedCurrencies,
                method_id: radioCheck,
                login_id: ApiPath.updatedEmp,
                company_id: ApiPath.companyID,
                language: ApiPath.lang
            }
            let obj = {
                package_name: 'hr',
                url: ApiPath.employeeBonusRateSettingUpdate + editData,
                method: 'put', params
            };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            } else {
                setSuccess([response.data.message]);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                refresh();
            }
        }
    }
    /**Save Function */


    /* RADIO ACTION */

    /** Start Edit Function */
    let editIndex = async (edit_id) => {
        setLoading(true);
        let obj = {
            package_name: 'hr',
            url: ApiPath.employeeBonusRateSettingGetDetail + edit_id + "?company_id=" + ApiPath.companyID + "&language=" + ApiPath.lang,
            method: 'get',
        };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setEditData("");
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else {
            setError([]);
            setSuccess("");
            setBonusTitleState(response.data.data.bonus_title);
            setValueBonusTitle(response.data.data.bonus_title);

            setSelectYearData(response.data.data.bonus_year);
            setSelectMonthData(response.data.data.bonus_month);
            setSelectLimitData(response.data.data.bonus_limit);

            setRadioCheck(parseInt(response.data.data.method_id));
            setPayWithSalary(response.data.data.paid_with_salary);

            setMultiplyBy(response.data.data.m_factor);
            setAddedBy(response.data.data.e_addition);

            switch (parseInt(response.data.data.method_id)) {
                case 1: {
                    setCheck1(true)
                    setIncludeBasic1(response.data.data.basic_salary_include);
                    setIncludeTax1(response.data.data.tax_calculate_include);
                    break;
                }
                case 2: {
                    setCheck2(true)
                    setIncludeBasic2(response.data.data.basic_salary_include);
                    setIncludeTax2(response.data.data.tax_calculate_include);
                    break;
                }
                case 3: {
                    setCheck3(true)
                    setIncludeBasic3(response.data.data.basic_salary_include);
                    setIncludeTax3(response.data.data.tax_calculate_include);
                    break;
                }
                case 4: {
                    setCheck7(true)
                    setIncludeBasic7(response.data.data.basic_salary_include);
                    setIncludeTax7(response.data.data.tax_calculate_include);
                    break;
                }
                case 5: {
                    setCheck5(true)
                    setPercentBasic(response.data.data.b_multiplier)
                    setIncludeBasic5(response.data.data.basic_salary_include);
                    setIncludeTax5(response.data.data.tax_calculate_include);
                    setIncludeTotal5(response.data.data.total_calculate_include)
                    break;
                }
                case 6: {
                    setCheck6(true)
                    setPercentTotal(response.data.data.b_multiplier)
                    setIncludeBasic6(response.data.data.basic_salary_include);
                    setIncludeTax6(response.data.data.tax_calculate_include);
                    setIncludeTotal6(response.data.data.total_calculate_include)
                    break;
                }
                default: {
                    setCheck4(true)

                    setIncludeBasic4(response.data.data.basic_salary_include);
                    setIncludeTax4(response.data.data.tax_calculate_include);
                    setIncludeTotal4(response.data.data.total_calculate_include)

                    setCurrencies(response.data.data.currency_id);
                    setSelectedCurrencies(response.data.data.currency_id);
                    setFixedAmount(response.data.data.d_result);
                }
            }
        }
    };

    /** End Edit Function */

    return (
        <CRow>
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <CCard>
                    <CCardHeader>
                        <h5 id="cardTitle"><CLabel>{t('Bonus Register')}</CLabel></h5>
                    </CCardHeader>
                    <CCardBody>
                        <BonusRegisterBonusTitleBox bonusTitleState={bonusTitleState} getValueBonusTitle={getValueBonusTitle} />
                        <br></br>
                        <BonusRegisterExperienceBox
                            setSelectYearData={setSelectYearData}
                            selectYearData={selectYearData}
                            setSelectMonthData={setSelectMonthData}
                            selectMonthData={selectMonthData}
                            setSelectLimitData={setSelectLimitData}
                            selectLimitData={selectLimitData}
                            yearData={yearData}
                            monthData={monthData}
                            limitData={limitData}
                            yearChange={yearChange}
                            monthChange={monthChange}
                            limitChange={limitChange}
                        />
                        <br></br>
                        <BonusRegisterPayWithSalaryBox payWithSalary={payWithSalary} getPayWithSalary={getPayWithSalary} />
                        <BonusRegisterSalaryBox
                            getCheck1={getCheck1}
                            includeBasic1={includeBasic1}
                            includeTax1={includeTax1}
                            getIncludeBasic1={getIncludeBasic1}
                            getIncludeTax1={getIncludeTax1}

                            getCheck2={getCheck2}
                            includeBasic2={includeBasic2}
                            includeTax2={includeTax2}
                            getIncludeBasic2={getIncludeBasic2}
                            getIncludeTax2={getIncludeTax2}

                            getCheck3={getCheck3}
                            includeBasic3={includeBasic3}
                            includeTax3={includeTax3}
                            getIncludeBasic3={getIncludeBasic3}
                            getIncludeTax3={getIncludeTax3}

                            getCheck4={getCheck4}
                            includeBasic4={includeBasic4}
                            includeTax4={includeTax4}
                            includeTotal4={includeTotal4}
                            getIncludeBasic4={getIncludeBasic4}
                            getIncludeTotal4={getIncludeTotal4}
                            getIncludeTax4={getIncludeTax4}
                            fixedAmount={fixedAmount}

                            getCheck5={getCheck5}
                            includeBasic5={includeBasic5}
                            includeTax5={includeTax5}
                            includeTotal5={includeTotal5}
                            percentBasic={percentBasic}
                            getPercentBasic={getPercentBasic}
                            getIncludeBasic5={getIncludeBasic5}
                            getIncludeTotal5={getIncludeTotal5}
                            getIncludeTax5={getIncludeTax5}

                            getCheck6={getCheck6}
                            includeBasic6={includeBasic6}
                            includeTax6={includeTax6}
                            includeTotal6={includeTotal6}
                            percentTotal={percentTotal}
                            getPercentTotal={getPercentTotal}
                            getIncludeBasic6={getIncludeBasic6}
                            getIncludeTotal6={getIncludeTotal6}
                            getIncludeTax6={getIncludeTax6}

                            getCheck7={getCheck7}
                            includeBasic7={includeBasic7}
                            includeTax7={includeTax7}
                            getIncludeBasic7={getIncludeBasic7}
                            getIncludeTax7={getIncludeTax7}

                            multiplyBy={multiplyBy}
                            getMultiplyBy={getMultiplyBy}
                            addedBy={addedBy}
                            getAddedBy={getAddedBy}
                            getFixedAmount={getFixedAmount}

                            radioCheck={radioCheck}
                            currencies={currencies}

                            currencyAPI={currencyAPI}
                            selectedCurrentChange={selectedCurrentChange}
                        />
                        <SaveBonusRegister
                            saveData={saveData}
                            saveOK={saveOK}
                            saveModalBox={saveModalBox}
                            setSaveModalBox={setSaveModalBox}
                            content={content}
                            type={type}
                        />
                        <br />
                    </CCardBody>
                </CCard >
            </CCol >
        </CRow >
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function BonusRegisterIndex() {
    return (
        <Welcome />
    )
}
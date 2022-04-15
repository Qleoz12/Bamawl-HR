/**
* Company leave setting
*
* @author  lq_don
* @create  29/07/2021 (D/M/Y)
* @param
* @return
*/
import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { withTranslation } from "react-i18next";
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import CompanyLeaveSettingChooseLeaveType from "./CompanyLeaveSettingChooseLeaveType";
import CompanyLeaveSettingConfirmLeaveType from "./CompanyLeaveSettingConfirmLeaveType";
import Confirmation from "./../../../brycen-common/confirmation/Confirmation";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import httpStatus from '../../../../common-const/commonStatusCode';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

function LegacyWelcomeClass({ t, i18n }) {
    //create useState hook
    const [durationModalBox, setDurationModalBox]               = useState(false); //for model duration
    const [duration, setDuration]                               = useState(""); //for duration month
    const [defaultValueDuration, setDefaultValueDuration]       = useState("");//for value dropdown duration
    const [companyLeavesOverwrite,setCompanyLeavesOverwrite]    =useState([]);// for overwrite companyleave
    const [leaveTypesConfirm, setLeaveTypesConfirm]             = useState([]); //for set array choose leavetype
    const [carryOption, setCarryOption]                         = useState(2); //for switch carry
    const [chooseLeaveType, setChooseLeaveType]                 = useState(0); // for success message
    const [leaveType, setLeaveType]                             = useState([]); //for leave type
    const [showChooseLeaveScreen, setShowChooseLeaveTypeScreen] = useState(false); //for screen switching Confirm Leave Type you selected
    const [settingAuto, setSettingAuto]                         = useState(1); //for show hide auto leave setting
    const [listLeaveType, setListLeaveType]                     = useState([]); // for List leave type
    const [pageLeaveType, setpageLeaveType]                     = useState(0); // for List leave type
    const [totalLeaveType, setTotalLeaveType]                   = useState(0); // for total leavetype
    const [error, setError]                                     = useState([]); // for error message
    const [success, setSuccess]                                 = useState([]); // for success message
    const [fisCalYearStartMonth, setFisCalYearStartMonth]       = useState(""); //for fis Cal Year Start Month
    const [fisCalYearEndMonth, setFisCalYearEndMonth]           = useState(""); // for fis Cal Year End Month
    const [joinOrFiscal, setJoinOrFiscal]                       = useState(1);//for join date and fiscal year
    const [saveModelBox, setSaveModalBox]                       = useState(false); //for show and hide model confirm insert
    const [hourlyOrHalfDeduct, setHourlyOrHalfDeduct]           = useState(1);//for deduct and half deduct
    const [previousDuration, setPreviousDuration]               = useState("");//for Duration previous
    const [loading,setLoading]                                  = useState(false);//for loading page
    const [content, setContent]                                 = useState('');// for content
    const [type, setType]                                       = useState('');// for type
    const [leaveAssignFlag, setLeaveAssignFlag]                 = useState(false);// for leave assign flag

    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
     useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);
    // Loaded initially
    useEffect(() => {
        setLoading(true);
        ApiViewPermission.loadViewPermission();
        loadLeaveType();
    }, []);
    /**
    * show laeve type when load page
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadLeaveType = async() => {
        let url = `${ApiPath.CompanyLeaveSettingGetListLeaveType}?language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };            
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setLeaveType([]);
            setListLeaveType([]);
        }else{
            if(response.data.total != 0){
                setpageLeaveType(1);
                setTotalLeaveType(response.data.total);
                setLeaveType(response.data.data[0]);
                setListLeaveType(response.data.data);
                //set default chooseLeaveType ,carryOption, duration
                setChooseLeaveType(response.data.data[0].chosen_leave);
                setCarryOption(response.data.data[0].carry_option);
                setDuration(response.data.data[0].entitle_month);
                setDefaultValueDuration(response.data.data[0].entitle_month);
                setLeaveAssignFlag(response.data.data[0].leave_assign_flag);
            }
        }
        setLoading(false);
    };
    /**
    * event select switch leave setting
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const switchLeaveSetting = () => {
        setJoinOrFiscal(settingAuto == 1?0:joinOrFiscal);
        setSettingAuto(settingAuto == 1 ? 2 : 1);
    };
    /**
    * event select switch leave type
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const switchChooseLeaveType = () => {
        setChooseLeaveType(chooseLeaveType == 1 ? 0 : 1);
    };
        /**
    * event select switch carry
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const switchCarry = () => {
        setCarryOption(carryOption == 2 ? 1 : 2);
    };
    /**
    * screen switching Confirm Leave Type you selected
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const showScreenChooseLeaveType = () => {
        // closeModel();
        setShowChooseLeaveTypeScreen(!showChooseLeaveScreen);
        setSettingAuto(1);
        setHourlyOrHalfDeduct(1);
        setJoinOrFiscal(1);
        setSuccess([]);
        setError([]);
        firstPage();
        setDurationModalBox(false);
    };
    /**
    * when click next on screen
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const nextEvent = () => {
        setError([]);
        setSuccess([]);
        //validation duration
        if (duration === "" && chooseLeaveType == 1) {
            setError([t('JSE001').replace('%s', t('Duration'))]);
        } else {
            if (pageLeaveType < totalLeaveType) {
                    //add leave type to choose leave type array
                    let templateLeaveType = {
                        "leave_type_id": leaveType.id,
                        "leave_name": leaveType.leave_name,
                        "entitle_month": parseInt(duration),
                        "choose_leave_type": chooseLeaveType,
                        "carry_option": carryOption,
                        "leave_assign_flag": leaveAssignFlag
                    };
                    if(templateLeaveType.choose_leave_type == 1)
                        setLeaveTypesConfirm([...leaveTypesConfirm, templateLeaveType]);
                    //set default chooseLeaveType ,carryOption, duration
                    setChooseLeaveType(listLeaveType[pageLeaveType].chosen_leave);
                    setCarryOption(listLeaveType[pageLeaveType].carry_option);
                    setDuration(listLeaveType[pageLeaveType].entitle_month);
                    setDefaultValueDuration(listLeaveType[pageLeaveType].entitle_month);
                    setLeaveAssignFlag(listLeaveType[pageLeaveType].leave_assign_flag);
                // show leavetype on screen
                setLeaveType(listLeaveType[pageLeaveType]);
                //set page +1
                setpageLeaveType(pageLeaveType + 1);
            } else {
                let templateLeaveType={choose_leave_type:0};
                    //add leave type to choose leave type array
                    templateLeaveType = {
                        "leave_type_id": leaveType.id,
                        "leave_name": leaveType.leave_name,
                        "entitle_month": parseInt(duration),
                        "choose_leave_type": chooseLeaveType,
                        "carry_option": carryOption,
                        "leave_assign_flag": leaveAssignFlag
                    };
                    if(templateLeaveType.choose_leave_type == 1)
                        setLeaveTypesConfirm([...leaveTypesConfirm, templateLeaveType]);
                        // if last page and already selected leave type show Confirm Leave Type you selected screen
                if (totalLeaveType != 0 && [...leaveTypesConfirm, templateLeaveType].filter(type=>type.choose_leave_type == 1 && type.leave_assign_flag == 0).length != 0) 
                {
                    fiscalYear();
                    setShowChooseLeaveTypeScreen(!showChooseLeaveScreen);
                }
                else
                {             
                    firstPage()
                }
            }
        }
    };
    /**
    * show page when load screen
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const firstPage=()=>{
        setLeaveTypesConfirm([]);
        setpageLeaveType(0);
        if (0 < totalLeaveType) {
            //set default chooseLeaveType ,carryOption, duration
            setLeaveType(listLeaveType[0]);
            loadLeaveType();
        }
    }
    /**
    * load fiscal year when load page
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const fiscalYear = async() => {
        let url = `${ApiPath.CompanyLeaveSettingGetFiscalYear}?language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        if(response.flag === false){
        }else{
            setFisCalYearStartMonth(response.data.data.fiscal_year_start_month)
            setFisCalYearEndMonth(response.data.data.fiscal_year_end_month)
        }
        setLoading(false);
    };
    /**
    * select Fiscal Year or Joined Date
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const switchJoinOrFiscal = () => {
        setJoinOrFiscal(joinOrFiscal === 1 ? 0 : 1);
    };
    /**
    * select deduct hourly or half deduct
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const selectHourlyOrHalfDeduct = (event) => {
        setHourlyOrHalfDeduct(parseInt(event.currentTarget.id));
    };
    /**
    * show form confirm insert company leave
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const formInsertCompanyLeave = () => {
        setSaveModalBox(true);
        setContent(t('Are you sure want to save?')); setType('save');
    };
    /**
    * convert leavename to hex color
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const convertLeaveNameToColor = (leaveName) => {
        var hash = 0;
        if (leaveName !== undefined) {
            for (var i = 0; i < leaveName.length; i++) {
                hash = leaveName.charCodeAt(i) + ((hash << 5) - hash);
            }
            var colour = "#";
            for (var i = 0; i < 3; i++) {
                var value = (hash >> (i * 8)) & 0xff;
                colour += ("00" + value.toString(16)).substr(-2);
            }
            return colour;
        }
    };
    /**
    * confirm Overwrite Company leave if alrealy company leave
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const owsaveOK = async() => {
        setSaveModalBox(!saveModelBox);
        let params = companyLeavesOverwrite;
        let obj = { package_name: 'hr', url: ApiPath.CompanyLeaveSettingOverwrite, method: 'post', params };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        } else {
            setSuccess([response.data.message]);
            setShowChooseLeaveTypeScreen(!showChooseLeaveScreen);
            setSettingAuto(1);
            setHourlyOrHalfDeduct(1);
            setJoinOrFiscal(1);
            setError([]);
            firstPage();
            setDurationModalBox(false);
        }
    };
    /**
    * confirm Save Company leave
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const saveOK = async() => {
        let tempalateCompanyLeave = {
            "company_id": ApiPath.companyID,
            "unpaid_half_day_leave_flag": hourlyOrHalfDeduct,
            "setting_auto": settingAuto,
            "Join_or_Fiscal": joinOrFiscal,
            "created_emp": ApiPath.createdEmp,
            "updated_emp": ApiPath.updatedEmp,
            "leave_types": leaveTypesConfirm,
            "language"   : ApiPath.lang
        };
        setCompanyLeavesOverwrite(tempalateCompanyLeave)
        let params = tempalateCompanyLeave;
        let obj = { package_name: 'hr', url: ApiPath.CompanyLeaveSettingInsertCompanyLeave, method: 'post', params };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
        if(response?.data?.status==httpStatus.UNPROCESSABLE_ENTITY)
        {
            setSaveModalBox(!saveModelBox);
            setError(response.message);
        }
        else{
            setContent(t('Data is already exist! Are you sure want to overwrite?')); setType('owsave');
        }
        } else {
            setSaveModalBox(!saveModelBox);
            setSuccess([response.data.message]);
            setShowChooseLeaveTypeScreen(!showChooseLeaveScreen);
            setSettingAuto(1);
            setHourlyOrHalfDeduct(1);
            setJoinOrFiscal(1);
            setError([]);
            firstPage();
            setDurationModalBox(false);
        }
    };
    /**
    * close model form
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    // const closeModel = () => {
    //     setSaveModalBox(false);
    // };
    /**
    * click ok duration
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const durationOK = () => {
        setDurationModalBox(false);
    };
    /**
    * close model duration
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const durationClose = () => {
        setDefaultValueDuration(previousDuration);
        setDurationModalBox(false);
        setDuration(previousDuration);
    };
    /**
    * show duration form
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const showDurationForm = () => {
        if(!leaveAssignFlag) {
            setPreviousDuration(duration)
            setDurationModalBox(true);
        }
    };
    /**
    * event  select duration in dropdown
    *
    * @author  lq_don
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const selectDuration = (event) => {
        setDuration(event.target.value);
        setDefaultValueDuration(event.target.value);
    };
    return (
        <CRow className="company-leave-setting">
            <CCol xs="12">
                {/* Error and success msg */}
                <Loading start={loading} />
                <Message success={success} error={error} />
                {/* show model confirm */}
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                    show={saveModelBox}
                    cancel={()=>setSaveModalBox(!saveModelBox)}
                    owsaveOK={owsaveOK}
                    saveOK={saveOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5 id="lblCompanyLeaveSetting">{t("Company Leave Setting")}</h5>
                    </CCardHeader>
                    <CCardBody className="container">
                        {(showChooseLeaveScreen === false && (
                            // Choose Leave Type for you screen
                            <CompanyLeaveSettingChooseLeaveType
                                leaveType={leaveType}
                                convertLeaveNameToColor={convertLeaveNameToColor}
                                switchCarry={switchCarry}
                                carryOption={carryOption}
                                nextEvent={nextEvent}
                                switchChooseLeaveType={switchChooseLeaveType}
                                chooseLeaveType={chooseLeaveType}
                                totalLeaveType={totalLeaveType}
                                pageLeaveType={pageLeaveType}
                                durationOK={durationOK}
                                durationModalBox={durationModalBox}
                                durationClose={durationClose}
                                showDurationForm={showDurationForm}
                                duration={duration}
                                selectDuration={selectDuration}
                                defaultValueDuration={defaultValueDuration}
                                leaveAssignFlag={leaveAssignFlag}
                            ></CompanyLeaveSettingChooseLeaveType>
                        )) ||
                            (showChooseLeaveScreen === true && (
                                // Confirm Leave Type you selected screen
                                <CompanyLeaveSettingConfirmLeaveType
                                    listLeaveType={listLeaveType}
                                    convertLeaveNameToColor={convertLeaveNameToColor}
                                    settingAuto={settingAuto}
                                    switchLeaveSetting={switchLeaveSetting}
                                    selectHourlyOrHalfDeduct={selectHourlyOrHalfDeduct}
                                    hourlyOrHalfDeduct={hourlyOrHalfDeduct}
                                    formInsertCompanyLeave={formInsertCompanyLeave}
                                    showScreenChooseLeaveType={showScreenChooseLeaveType}
                                    joinOrFiscal={joinOrFiscal}
                                    switchJoinOrFiscal={switchJoinOrFiscal}
                                    leaveTypesConfirm={leaveTypesConfirm}
                                    fisCalYearStartMonth={fisCalYearStartMonth}
                                    fisCalYearEndMonth={fisCalYearEndMonth}
                                ></CompanyLeaveSettingConfirmLeaveType>
                            ))}
                        <CRow lg="12">
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
const Welcome = withTranslation()(LegacyWelcomeClass);

export default function companyLeaveSettingIndex() {
    return <Welcome />;
}

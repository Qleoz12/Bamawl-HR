import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol, CRow
} from '@coreui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import ShiftNormalRuleRegisterForm from './ShiftNormalRuleRegisterForm';
import SaveShiftNormalRuleRegister from './SaveShiftNormalRuleRegister';
import $ from 'jquery'
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';

function LegacyWelcomeClass({ t, i18n }) {
    const defaultTime = "00:00";                  // default time
    const [error, setError] = useState([]);             // for error messenge
    const [success, setSuccess] = useState([]);             // for success messenge
    const [loading, setLoading] = useState(false);
    const [saveModalBox, setSaveModalBox] = useState(false);          // for save button confirmation
    const [collapseFullDay, setCollapseFullDay] = useState(false);          // for collapse Full day
    const [collapseHalfDay, setCollapseHalfDay] = useState(false);          // for collapse Half day
    const [shiftName, setShiftName] = useState("");             // for save Shift name
    const [lateEarlyCalculate, setLateEarlyCalculate] = useState(true);           // for swtich Late Early Calculate
    const [fullOTFlag, setFullOTFlag] = useState(true);           // for switch Pay OT for all working hours
    const [breakingTimeUseFlag, setBreakingTimeUseFlag] = useState(null);           // for radio 1 hour, break
    const [deductOverTime, setDeductOvertime] = useState(false);          // for switch deduct Overtime hour for break time
    const [dayWorks, setDayWorks] = useState([]);             // for list day work
    const [workingHalfTime1Start, setWorkingHalfTime1Start] = useState(defaultTime);    // for Half Time Attendance Hour 1 From
    const [workingHalfTime2Start, setWorkingHalfTime2Start] = useState(defaultTime);    // for Half Time Attendance Hour 1 To
    const [workingHalfTime1End, setWorkingHalfTime1End] = useState(defaultTime);    // for Half Time Attendance Hour 2 From
    const [workingHalfTime2End, setWorkingHalfTime2End] = useState(defaultTime);    // for Half Time Attendance Hour 2 To
    const [halfTimeStart, setHalftTimeStart] = useState(defaultTime);    // for Half Time From
    const [halfTimeEnd, setHalfTimeEnd] = useState(defaultTime);    // for Half Time To
    const [fulltimeStart, setFullTimeStart] = useState(defaultTime);    // for Full Time From
    const [fulltimeEnd, setFullTimeEnd] = useState(defaultTime);    // for Full Time To
    const [fullTimeTotalBreakTimeStart, setFullTimeTotalBreakTimeStart] = useState(defaultTime);    // for Full Day Total Break Time
    const [activeDayWork, setActiveDayWork] = useState([]);             // for list day work active
    const [activeFullHalf, setActiveFullHalf] = useState([]);             // for list day work choose Half day
    const [editData, setEditData] = useState(null);           // for Edit data
    const [firstHalfEndTimeDateFlag, setFirstHalfEndTimeDateFlag] = useState(1);              // for radio Current assign date/Next day 1
    const [secondHalfStartTimeDateFlag, setSecondHalfStartTimeDateFlag] = useState(1);              // for radio Current assign date/Next day 2
    const [content, setContent] = useState('');
    const [type, setType] = useState('');

    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  dh_khanh
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);

    /** Start Form Load */
    useEffect(() => {
        setLoading(true);
        ApiViewPermission.loadViewPermission();
        loadDayWorks();
        let edit_Data = JSON.parse(sessionStorage.getItem('RETURN_SNRR_DATA')); // return data from Shift Normal List
        sessionStorage.removeItem('RETURN_SNRR_DATA');
        if (edit_Data != null) {
            let edit_id = edit_Data;
            setEditData(edit_id);
            editIndex(edit_id);
        }
    }, []);
    /** End Form Load */

    /** start API for day works */
    const loadDayWorks = useCallback(async () => {
        let url = `${ApiPath.ShiftNormalRuleRegisterDetailGetWorkDay}?language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setDayWorks([]);
        } else {
            let data = response.data?.data;
            let listDayWork = [];
            data && data.map(item => {
                return listDayWork.push({ ...item, work_day_name: converDayWorkName(item.work_day_name) })
            });
            setDayWorks(listDayWork);
        };
    }, []);

    /** use popup days in week */
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        if (editData) return;
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    /** End use popup days in week */

    let handleChosseDayWork = (e) => {
        let id = Number(e.target.id);
        let newActiceDayWords = [...activeDayWork];
        if (e.target.checked) {
            newActiceDayWords.push(id);
        } else {
            const position = newActiceDayWords.findIndex(item => item === id);
            newActiceDayWords.splice(position, 1);
        }
        setActiveDayWork(newActiceDayWords);
    }

    let handleChangeSwitchDayWork = (e) => {
        let id = Number(e.target.name);
        let newActiveFullHalf = [...activeFullHalf];
        if (e.target.checked) {
            newActiveFullHalf.push(id);
        } else {
            const position = newActiveFullHalf.findIndex(item => item === id);
            newActiveFullHalf.splice(position, 1);
        }
        setActiveFullHalf(newActiveFullHalf);
    }

    let handleChangeSwitchOut = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        switch (name) {
            case "swithLateEarlyCalculate":
                setLateEarlyCalculate(checked);
                break;
            case "swithFullOTFlag":
                setFullOTFlag(checked);
                break;
            case "switchDeductOvertime":
                setDeductOvertime(checked);
                checked ? setBreakingTimeUseFlag(1) : setBreakingTimeUseFlag(null);
                break;
            default:
            // code block
        }
    }

    let handleUseDeductOTChange = (e) => {
        switch (e.target.id) {
            case "radOneHour":
                setBreakingTimeUseFlag(1);
                break;
            case "radBreakTime":
                setBreakingTimeUseFlag(2);
                break;
            default:
            // code block
        }
    }

    let handleChangeShiftName = (e) => {
        setShiftName(e.target.value);
    }

    let converDayWorkName = (name) => {
        return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    }

    const englishCharacterNumberOnly = (value) => {
        var engstr = /^[a-zA-Z0-9-()!=.'"\/:;& _]*$/;
        if (engstr.test(value)) {
            return true;
        }
        return false;
    }

    let saveData = () => {
        let errMsgAll = [];
        let focusShiftName = false;
        if (shiftName === "") {
            const errMsg = t('JSE10010').replace('%s', t('Shift Name'));
            errMsgAll.push(errMsg);
            focusShiftName = true;
        }
        if (!englishCharacterNumberOnly(shiftName)) {
            const errMsg = t('JSE10019').replace('%s', t('Shift Name'));
            errMsgAll.push(errMsg);
            focusShiftName = true;
        }
        if (activeDayWork.length === 0) {
            const errMsg = t('JSE001').replace('%s', t('Working Day and Shift'));
            errMsgAll.push(errMsg);
        }

        let fullTimeValidate = false;
        if ((activeDayWork.length > 0 && !checkExistTwoArr(activeDayWork, activeFullHalf))
            || (activeDayWork.length > activeFullHalf.length)
            || getExistTwoArr(activeDayWork, activeFullHalf).length < activeDayWork.length) {
            if (fulltimeStart === defaultTime  && fulltimeEnd === defaultTime) {
                const errMsg = t('Please fill %s!').replace('%s', t('Full Time'));
                errMsgAll.push(errMsg);
                fullTimeValidate = true;
            }
            if (fullTimeTotalBreakTimeStart === defaultTime) {
                const errMsg = t('Please fill %s!').replace('%s', t('Full Day Total Break Time'));
                errMsgAll.push(errMsg);
            }
        }

        if (!fullTimeValidate && ((activeDayWork.length > 0 && !checkExistTwoArr(activeDayWork, activeFullHalf))
            || activeDayWork.length > activeFullHalf.length)) {
            if (fulltimeStart !== workingHalfTime1Start) {
                const errMsg = t('JSE028').replace('%s', t('Full Time From')).replace('%s', t('Half Time Attendance Hours 1 From'));
                errMsgAll.push(errMsg);
            }
            let error1 , error2;
            if (convertToTime(fulltimeStart) < convertToTime(fulltimeEnd) && firstHalfEndTimeDateFlag === 2) {
                const errMsg = t('JSE176').replace('%s', t('Half Time Attendance Hours 1')).replace('%s', t('Current assign date'));
                errMsgAll.push(errMsg);
                error1 = true;
            }
            if (!error1 && firstHalfEndTimeDateFlag === 1 &&
                convertToTime(workingHalfTime1Start) > convertToTime(workingHalfTime1End)) {
                const errMsg = t('JSE130').replace('%s', t('Half Time Attendance Hours 1 From')).replace('%s', t('Half Time Attendance Hours 1 To'));
                errMsgAll.push(errMsg);
            }
            if(convertToTime(fulltimeStart) < convertToTime(fulltimeEnd) && secondHalfStartTimeDateFlag === 2) {
                const errMsg = t('JSE176').replace('%s', t('Half Time Attendance Hours 2')).replace('%s', t('Current assign date'));
                errMsgAll.push(errMsg);
                // error3 = true;
            }
            if (!error1 && firstHalfEndTimeDateFlag === 2 &&
                convertToTime(workingHalfTime1Start) < convertToTime(workingHalfTime1End)) {
                const errMsg = t('JSE131').replace('%s', t('Half Time Attendance Hours 1 To')).replace('%s', t('Half Time Attendance Hours 1 From'));
                errMsgAll.push(errMsg);
            }
            if (fulltimeEnd !== workingHalfTime2End) {
                const errMsg = t('JSE028').replace('%s', t('Full Time To')).replace('%s', t('Half Time Attendance Hours 2 To'));
                errMsgAll.push(errMsg);
            }
            if (convertToTime(fulltimeStart) > convertToTime(fulltimeEnd)) {
                if(secondHalfStartTimeDateFlag === 1){
                    const errMsg = t('JSE176').replace('%s', t('Half Time Attendance Hours 2')).replace('%s', t('Next day'));
                    errMsgAll.push(errMsg);
                    error2 = true;
                }
                // if (secondHalfStartTimeDateFlag === 1 &&
                //     convertToTime(workingHalfTime2Start) > convertToTime(workingHalfTime2End)) {
                //     const errMsg = t('JSE130').replace('%s', t('Half Time Attendance Hours 2 From')).replace('%s', t('Half Time Attendance Hours 2 To'));
                //     errMsgAll.push(errMsg);
                // }
            }

            if (!error2 && secondHalfStartTimeDateFlag === 1 &&
                convertToTime(workingHalfTime2Start) > convertToTime(workingHalfTime2End)) {
                const errMsg = t('JSE130').replace('%s', t('Half Time Attendance Hours 2 From')).replace('%s', t('Half Time Attendance Hours 2 To'));
                errMsgAll.push(errMsg);
            }
            // if (!error1 && !error3 && convertToTime(fulltimeStart) > convertToTime(fulltimeEnd) && secondHalfStartTimeDateFlag === 2 &&
            //     convertToTime(workingHalfTime2Start) > convertToTime(workingHalfTime2End)) {
            //     const errMsg = t('JSE131').replace('%s', t('Half Time Attendance Hours 2 To')).replace('%s', t('Half Time Attendance Hours 2 From'));
            //     errMsgAll.push(errMsg);
            // }
        }
        if (activeDayWork.length > 0 && checkExistTwoArr(activeDayWork, activeFullHalf)) {
            if (halfTimeStart === defaultTime && halfTimeEnd === defaultTime) {
                const errMsg = t('Please fill %s!').replace('%s', t('Half Time'));
                errMsgAll.push(errMsg);
            }
        }
        if (errMsgAll.length > 0) {
            setError([...errMsgAll]);
            setSuccess('');
            focusShiftName && $("#txtShiftName").focus();
        }
        else {
            setContent(t('Are you sure want to save?')); setType('save');
            setSaveModalBox(!saveModalBox);
            setError([]);
            setSuccess('');
        }
    }

    let setDefaultForm = (message = "") => {
        setError([]);
        setSuccess([message]);
        setShiftName("");
        setLateEarlyCalculate(true);
        setFullOTFlag(true);
        setActiveDayWork([]);
        setActiveFullHalf([]);
        setWorkingHalfTime1Start(defaultTime);
        setWorkingHalfTime2Start(defaultTime);
        setWorkingHalfTime1End(defaultTime);
        setWorkingHalfTime2End(defaultTime);
        setHalftTimeStart(defaultTime);
        setHalfTimeEnd(defaultTime);
        setFullTimeStart(defaultTime);
        setFullTimeEnd(defaultTime);
        setFullTimeTotalBreakTimeStart(defaultTime);
        setDeductOvertime(false);
        setBreakingTimeUseFlag(null);
        setFirstHalfEndTimeDateFlag(1);
        setSecondHalfStartTimeDateFlag(1);
        setEditData(null);
    }

    const saveOK = async () => {
        setSaveModalBox(!saveModalBox);
        let workDays = [];
        activeDayWork.map(id => {
            return workDays.push({
                work_day_id: id,
                full_half_flag: Number(!activeFullHalf.includes(id))
            });
        });
        //check exist Working day Full Day
        const existFullDay = workDays.find(item => item['full_half_flag'] === 1) ? true : false;
        if (!editData) {
            let params = {
                "shift_name": shiftName,
                "late_early_calculate": Number(lateEarlyCalculate),
                "full_OT_flag": Number(fullOTFlag),
                "break_time_use_flag": deductOverTime ? breakingTimeUseFlag : 0,
                "full_time_start": existFullDay ? fulltimeStart : defaultTime,
                "full_time_end": existFullDay ? fulltimeEnd : defaultTime,
                "working_half_time1_start": existFullDay ? workingHalfTime1Start : defaultTime,
                "working_half_time2_start": existFullDay ? workingHalfTime2Start : defaultTime,
                "working_half_time1_end": existFullDay ? workingHalfTime1End : defaultTime,
                "working_half_time2_end": existFullDay ? workingHalfTime2End : defaultTime,
                "break_time_limit": fullTimeTotalBreakTimeStart,
                "half_time_start": halfTimeStart,
                "half_time_end": halfTimeEnd,
                "first_half_end_time_date_flag": firstHalfEndTimeDateFlag,
                "second_half_start_time_date_flag": secondHalfStartTimeDateFlag,
                "work_days": workDays,
                "created_emp": ApiPath.createdEmp,
                "updated_emp": ApiPath.updatedEmp,
                "company_id": ApiPath.companyID,
                "language": ApiPath.lang
            };
            let obj = { package_name: 'hr', url: ApiPath.ShiftNormalRuleRegisterDetailSave, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setSuccess([]);
            } else {
                setDefaultForm(response.data.message);
            }
        } else {
            let params = {
                "shift_name": shiftName,
                "late_early_calculate": Number(lateEarlyCalculate),
                "updated_emp": ApiPath.updatedEmp,
                "company_id": ApiPath.companyID,
                "language": ApiPath.lang
            };
            let obj = { package_name: 'hr', url: ApiPath.ShiftNormalRuleRegister + editData, method: 'put', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setSuccess([]);
            } else {
                setDefaultForm(response.data.message);
            }
        }
    }

    const convertToTime = (stringTime) => {
        const arrTime = stringTime.split(":");
        return new Date("2021", "01", "01", arrTime[0], arrTime[1]);
    }

    let checkExistTwoArr = (arr1, arr2) => {
        return arr1.some(item => arr2.includes(item));
    }

    let getExistTwoArr = (arr1, arr2) => {
        let arrExist = [];
        arr1.forEach(item => {
            if(arr2.includes(item)) arrExist.push(item);
        })
        return arrExist;
    }

    /** Start Edit Function */
    let editIndex = async (edit_id) => {
        let url = `${ApiPath.ShiftNormalRuleRegister}${edit_id}?language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            setError(response.message);
            setSuccess([]);
        } else {
            const data = response.data?.data;
            if (data) {
                setCollapseFullDay(true);
                setCollapseHalfDay(true);
                setShiftName(data.shift_name);
                setLateEarlyCalculate(data.late_early_calculate);
                setFullOTFlag(data.full_OT_flag);
                if (data.break_time_use_flag !== 0) {
                    setDeductOvertime(true);
                    setBreakingTimeUseFlag(data.break_time_use_flag);
                } else {
                    setDeductOvertime(false);
                    setBreakingTimeUseFlag(null);
                }
                setWorkingHalfTime1Start(data.working_half_time1_start);
                setWorkingHalfTime1End(data.working_half_time1_end);
                setWorkingHalfTime2Start(data.working_half_time2_start);
                setWorkingHalfTime2End(data.working_half_time2_end);
                if (data['work_days']) {
                    let arrActiveWorkDay = [];
                    let arrActiveFullHalf = [];
                    data['work_days'].forEach(item => {
                        arrActiveWorkDay.push(item.id);
                        !item.full_half_flag && arrActiveFullHalf.push(item.id);
                    });
                    setActiveDayWork(arrActiveWorkDay);
                    setActiveFullHalf(arrActiveFullHalf);
                    const workDayFullTime = data['work_days'].find(item => item.full_half_flag === 1);
                    if (workDayFullTime) {
                        setFullTimeStart(workDayFullTime['working_hr_start']);
                        setFullTimeEnd(workDayFullTime['working_hr_end']);
                        setFirstHalfEndTimeDateFlag(workDayFullTime['first_half_end_time_date_flag']);
                        setSecondHalfStartTimeDateFlag(workDayFullTime['second_half_start_time_date_flag']);
                        setFullTimeTotalBreakTimeStart(workDayFullTime['break_time_limit']);
                    }
                    const workDayHaflTime = data['work_days'].find(item => item.full_half_flag === 0);
                    if (workDayHaflTime) {
                        setHalftTimeStart(workDayHaflTime['working_hr_start']);
                        setHalfTimeEnd(workDayHaflTime['working_hr_end']);
                    }
                }
            }
        }
    }

    let handleWorkingHalfTime1StartChange = (val) => {
        setWorkingHalfTime1Start(val);
    }

    let handleWorkingHalfTime1EndChange = (val) => {
        setWorkingHalfTime1End(val);
    }

    let handleWorkingHalfTime2StartChange = (val) => {
        setWorkingHalfTime2Start(val);
    }

    let handleWorkingHalfTime2EndChange = (val) => {
        setWorkingHalfTime2End(val);
    }

    let handleFullTimeToTalBTStartChange = (val) => {
        setFullTimeTotalBreakTimeStart(val);
    }

    let handleFullTimeStartChange = (val) => {
        setFullTimeStart(val);
    }

    let handleFullTimeEndChange = (val) => {
        setFullTimeEnd(val);
    }

    let handleHalfTimeStartChange = (val) => {
        setHalftTimeStart(val);
    }

    let handleHalfTimeEndChange = (val) => {
        setHalfTimeEnd(val);
    }

    let closeSaveAlert = () => {
        setSaveModalBox(!saveModalBox);
    }

    let handleChangeCollapseFullDay = () => {
        setCollapseFullDay(!collapseFullDay);
    }

    let handleChangeCollapseHalfDay = () => {
        setCollapseHalfDay(!collapseHalfDay);
    }

    let handleFirstHalfEndTimeDateFlag = (e) => {
        setFirstHalfEndTimeDateFlag(Number(e.target.value));
    }

    let handleSecondHalfStartTimeDateFlag = (e) => {
        setSecondHalfStartTimeDateFlag(Number(e.target.value));
    }

    let handleWKASKeyDown = (e) => {
        if (editData) return;
        //event press Space or Enter
        if (e.keyCode === 13 || e.keyCode === 32) {
            setAnchorEl(e.currentTarget);
        }
    }
    /** End Edit Function */

    return (
        <CRow className="shiftNormalRuleRegister">
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                    show={saveModalBox}
                    cancel={closeSaveAlert}
                    saveOK={saveOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5 id="pageTitle"><label>{t('Shift/Normal Rule Register')}</label></h5>
                    </CCardHeader>
                    <CCardBody>
                        <ShiftNormalRuleRegisterForm
                            collapseFullDay={collapseFullDay}
                            collapseHalfDay={collapseHalfDay}
                            shiftName={shiftName}
                            lateEarlyCalculate={lateEarlyCalculate}
                            fullOTFlag={fullOTFlag}
                            breakingTimeUseFlag={breakingTimeUseFlag}
                            deductOverTime={deductOverTime}
                            workingHalfTime1Start={workingHalfTime1Start}
                            workingHalfTime2Start={workingHalfTime2Start}
                            workingHalfTime1End={workingHalfTime1End}
                            workingHalfTime2End={workingHalfTime2End}
                            halfTimeStart={halfTimeStart}
                            halfTimeEnd={halfTimeEnd}
                            fulltimeStart={fulltimeStart}
                            fulltimeEnd={fulltimeEnd}
                            fullTimeTotalBreakTimeStart={fullTimeTotalBreakTimeStart}
                            activeDayWork={activeDayWork}
                            activeFullHalf={activeFullHalf}
                            editData={editData}
                            dayWorks={dayWorks}
                            firstHalfEndTimeDateFlag={firstHalfEndTimeDateFlag}
                            secondHalfStartTimeDateFlag={secondHalfStartTimeDateFlag}
                            handleChangeShiftName={handleChangeShiftName}
                            handleChangeSwitchOut={handleChangeSwitchOut}
                            open={open}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            handleClick={handleClick}
                            handleChosseDayWork={handleChosseDayWork}
                            handleChangeSwitchDayWork={handleChangeSwitchDayWork}
                            handleChangeCollapseFullDay={handleChangeCollapseFullDay}
                            handleChangeCollapseHalfDay={handleChangeCollapseHalfDay}
                            handleFullTimeStartChange={handleFullTimeStartChange}
                            handleFullTimeEndChange={handleFullTimeEndChange}
                            handleWorkingHalfTime1StartChange={handleWorkingHalfTime1StartChange}
                            handleWorkingHalfTime1EndChange={handleWorkingHalfTime1EndChange}
                            handleWorkingHalfTime2StartChange={handleWorkingHalfTime2StartChange}
                            handleWorkingHalfTime2EndChange={handleWorkingHalfTime2EndChange}
                            handleFullTimeToTalBTStartChange={handleFullTimeToTalBTStartChange}
                            handleHalfTimeStartChange={handleHalfTimeStartChange}
                            handleHalfTimeEndChange={handleHalfTimeEndChange}
                            handleUseDeductOTChange={handleUseDeductOTChange}
                            handleFirstHalfEndTimeDateFlag={handleFirstHalfEndTimeDateFlag}
                            handleSecondHalfStartTimeDateFlag={handleSecondHalfStartTimeDateFlag}
                            handleWKASKeyDown={handleWKASKeyDown}
                        />
                        <SaveShiftNormalRuleRegister
                            saveData={saveData}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function ShiftNormalRuleRegister() {
    return (
        <Welcome />
    )
}
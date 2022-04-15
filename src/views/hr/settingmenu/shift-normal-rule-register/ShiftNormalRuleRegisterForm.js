import {
    CCol,
    CCollapse, CFormGroup, CImg,
    CInputCheckbox, CLabel, CRow,
    CSwitch, CInputRadio
} from '@coreui/react';
import { TextField } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import classNames from 'classnames';
import React, { Fragment, useEffect } from 'react';
import TimePicker from '../../hr-common/time-picker/Timepicker';
import { useTranslation } from 'react-i18next';

const ShiftNormalRuleRegisterForm = props => {
    let {
        collapseFullDay,
        collapseHalfDay,
        shiftName,
        lateEarlyCalculate,
        fullOTFlag,
        breakingTimeUseFlag,
        deductOverTime,
        workingHalfTime1Start,
        workingHalfTime2Start,
        workingHalfTime1End,
        workingHalfTime2End,
        halfTimeStart,
        halfTimeEnd,
        fulltimeStart,
        fulltimeEnd,
        fullTimeTotalBreakTimeStart,
        activeDayWork,
        activeFullHalf,
        editData,
        handleChangeShiftName,
        handleChangeSwitchOut,
        dayWorks,
        open,
        anchorEl,
        handleClose,
        handleClick,
        handleChosseDayWork,
        handleChangeSwitchDayWork,
        handleChangeCollapseFullDay,
        handleChangeCollapseHalfDay,
        handleFullTimeStartChange,
        handleFullTimeEndChange,
        handleWorkingHalfTime1StartChange,
        handleWorkingHalfTime1EndChange,
        handleWorkingHalfTime2StartChange,
        handleWorkingHalfTime2EndChange,
        handleFullTimeToTalBTStartChange,
        handleHalfTimeStartChange,
        handleHalfTimeEndChange,
        handleUseDeductOTChange,
        handleFirstHalfEndTimeDateFlag,
        handleSecondHalfStartTimeDateFlag,
        firstHalfEndTimeDateFlag,
        secondHalfStartTimeDateFlag,
        handleWKASKeyDown
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });
    const classesDisable = classNames(editData ? 'label-disable' : 'cursor-pointer');
    return (<>
        <CRow className="expense-request-text-field">
            <CCol className="shift-normal-rule-register-content-secondary">
                <div className="d-flex align-items-center" >
                    <CImg src={'avatars/list.png'} alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                    <CLabel className="required" id="lblShiftName" style={{ fontWeight: 'bold', margin: "0 10px" }}>{t('Shift Name')}</CLabel>
                    <TextField
                        id="txtShiftName"
                        type="text"
                        placeholder={t('Type Shift Name')}
                        value={shiftName}
                        onChange={handleChangeShiftName}
                        autoFocus
                        style={{ width: "200px", maxWidth: "400px" }}
                        inputProps={{
                            maxLength: 200,
                        }}
                    />
                </div>
            </CCol>
        </CRow>
        <CRow >
            <CCol lg="6" className="mt-4 border-right">
                <div className="d-flex">
                    <CImg src={'avatars/list.png'} alt="titleicon" style={{ width: '5px', height: '12px', marginTop: '4px' }} />
                    <CLabel id="lbLateEarly" style={{ fontWeight: 'bold', margin: "0 20px 0 10px" }}>{t('Late/Early Calculate include in Shift')}</CLabel>
                    <CLabel id="lbInclude" >{t('Include')}</CLabel>
                    <CSwitch id="swithLateEarlyCalculate" name="swithLateEarlyCalculate" className="mx-3 toggle-switch" shape={'pill'} color={'info'} size={'sm'}
                        checked={lateEarlyCalculate} onChange={handleChangeSwitchOut}
                    />
                </div>
            </CCol>
            <CCol lg="6" className="mt-4">
                <div className="d-flex">
                    <CImg src={'avatars/list.png'} alt="titleicon" style={{ width: '5px', height: '12px', marginTop: '4px' }} />
                    <CLabel id="lbPayOT" style={{ fontWeight: 'bold', margin: "0 20px 0 10px" }}>{t('Pay OT for all working hours')}</CLabel>
                    <CSwitch id="swPayOT" name="swithFullOTFlag" className="mx-3 toggle-switch" shape={'pill'} color={'success'} size={'sm'} labelOn="Yes" labelOff="No"
                        checked={fullOTFlag} onChange={handleChangeSwitchOut} disabled={editData}
                    />
                </div>
            </CCol>
        </CRow>
        <CRow >
            <CCol className="mt-4">
                <CImg src={'avatars/list.png'} alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                <CLabel id="lblWorkingDay" style={{ fontWeight: 'bold', margin: "0 20px 0 10px" }}>{t('Working Day')}</CLabel>
            </CCol>
        </CRow>
        <CRow className="mt-2 pl-3">
            <CCol>
                <div className="content-secondary pl-4 pr-4">
                    <CRow className="mb-3">
                        <CCol>
                            <CRow className="d-flex flex-column">
                                <div className="d-flex flex-wrap">
                                    {
                                        dayWorks.map((item, idx) => {
                                            return (
                                                <Fragment key={idx}>
                                                    {
                                                        activeDayWork.includes(item.id) &&
                                                        <div className="d-flex p-2 mr-2 mb-1 boder boder-radius bgroud-white">
                                                            {item.work_day_name} : {activeFullHalf.includes(item.id) ? t('Half Day') : t('Full Day')}
                                                        </div>
                                                    }
                                                </Fragment>
                                            )
                                        })
                                    }
                                    <div aria-describedby={open ? 'simple-popover' : undefined} variant="contained" color="primary"
                                        onClick={handleClick}
                                        className={classesDisable + ' d-flex align-items-center'}
                                        tabIndex={editData ? -1 : 0}
                                        onKeyDown={handleWKASKeyDown}
                                    >
                                        <CImg id="btnAddWorkingDayAndShift" src={'avatars/Add Working Day and Shift.png'} alt="remove" height={30} />
                                        <CLabel id="lblAddWorkingDayAndShift" className={'mt-1 ml-2 ' + classesDisable} >{t('Add Working Day and Shift')}</CLabel>
                                    </div>
                                    <Popover
                                        id={open ? 'simple-popover' : undefined}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <div className="shiftNormalRuleRegister popup-day-in-week pl-3 pt-2 pb-2 pr-2">
                                            {
                                                dayWorks.map(item => {
                                                    return (
                                                        <CRow key={item.id}>
                                                            <CCol>
                                                                <div className="d-flex day pt-2 pr-2">
                                                                    <CFormGroup variant="custom-checkbox" inline>
                                                                        <CInputCheckbox
                                                                            className="chkDaysOfWeek"
                                                                            custom id={item.id}
                                                                            name={item.work_day_name}
                                                                            checked={activeDayWork.includes(item.id)}
                                                                            onChange={handleChosseDayWork}
                                                                            disabled={editData}
                                                                        />
                                                                        <CLabel className="day-in-week" variant="custom-checkbox" htmlFor={item.id}>{item.work_day_name}</CLabel>
                                                                    </CFormGroup>
                                                                    <CLabel className={classNames("lbFullDayWorkDay", "ml-5", { textshadow: activeFullHalf.includes(item.id) })}>{t('Full Day')}</CLabel>
                                                                    <CSwitch id={'switch' + item.id} name={item.id} shape={'pill'} color={'primary'} size={'sm'}
                                                                        checked={activeFullHalf.includes(item.id)}
                                                                        onChange={handleChangeSwitchDayWork}
                                                                        disabled={editData}
                                                                        className="swItemFH mx-3"
                                                                    />
                                                                    <CLabel className={classNames("lbHalfDayWorkDay", { textshadow: !activeFullHalf.includes(item.id) })}>{t('Half Day')}</CLabel>
                                                                </div>
                                                            </CCol>
                                                        </CRow>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Popover>
                                </div>
                                <div className="d-flex mt-1">
                                    {/* popup work day may in here */}
                                </div>
                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CCol className="p-0">
                            <div className="d-inline-flex">
                                <CImg src={'avatars/list.png'} className="mt-1" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                <details onClick={handleChangeCollapseFullDay} open={editData !== null}>
                                    <summary id="lblFullDay" className="ml-2">{t('Full Day')}</summary>
                                </details>
                            </div>
                            <div className="pl-3 mt-3">
                                <CCollapse show={collapseFullDay} >
                                    {/* <CRow>
                                        <CCol lg="9" sm="10"> */}
                                    <div className="d-flex boder boder-radius" style={{ maxWidth: "1100px" }}>
                                        <div className="d-flex align-items-center" style={{ width: "250px", maxWidth: "300px", minWidth: "90px", backgroundColor: "#e6e4f9", padding: "0.5rem", borderRadius: "0.7rem 0 0 0.7rem" }}>
                                            <CLabel id="lblFullTime" className="required mt-2 ml-2">{t('Full Time')}</CLabel>
                                        </div>
                                        <div className="d-flex align-items-center pl-2 pr-2 pb-2" style={{ width: "600px" }} >
                                            <CRow >
                                                <CCol xl="6" className="d-inline-flex align-items-center border-right mt-2">
                                                    <CImg className="ml-3 mr-3" src={'avatars/intime.png'} alt="intime" height={17} />
                                                    <TimePicker
                                                        id="txtFullTimeFrom"
                                                        name="fulltimeStart"
                                                        value={fulltimeStart}
                                                        onChangeTime={handleFullTimeStartChange}
                                                        disabled={editData}
                                                    ></TimePicker>
                                                </CCol>
                                                <CCol xl="6" className="d-inline-flex align-items-center mt-2">
                                                    <CImg className="ml-3 mr-3" src={'avatars/ontime.png'} alt="ontime" height={17} />
                                                    <TimePicker
                                                        id="txtFullTimeTo"
                                                        name="fulltimeEnd"
                                                        value={fulltimeEnd}
                                                        onChangeTime={handleFullTimeEndChange}
                                                        disabled={editData}
                                                    ></TimePicker>
                                                </CCol>

                                            </CRow>
                                        </div>
                                    </div>
                                    {/* </CCol>
                                    </CRow> */}
                                    {/* <CRow>
                                        <CCol lg="9" sm="10"> */}
                                    <div className="d-flex boder boder-radius mt-3" style={{ maxWidth: "1100px" }}>
                                        <div className="d-flex align-items-center" style={{ width: "250px", maxWidth: "300px", minWidth: "90px", backgroundColor: "#fff5db", padding: "0.5rem", borderRadius: "0.7rem 0 0 0.7rem" }}>
                                            <CLabel id="lblHalfTimeAttendanceHour1" className="required mt-2 ml-2">{t('Half Time Attendance Hour 1')}</CLabel>
                                        </div>
                                        <div className="d-flex align-items-center pl-2 pr-2 pb-2 content-time">
                                            <CRow >
                                                <CCol xl="4" className="d-inline-flex align-items-center border-right mt-2">
                                                    <CImg className="ml-3 mr-3" src={'avatars/intime.png'} alt="intime" height={17} />
                                                    <TimePicker
                                                        id="txtHalfTimeAttendanceHour1From"
                                                        name="workingHalfTime1Start"
                                                        value={workingHalfTime1Start}
                                                        onChangeTime={handleWorkingHalfTime1StartChange}
                                                        disabled={editData}
                                                    ></TimePicker>
                                                </CCol>
                                                <CCol xl="4" className="d-inline-flex align-items-center mt-2">
                                                    <CImg className="ml-3 mr-3" src={'avatars/ontime.png'} alt="ontime" height={17} />
                                                    <TimePicker
                                                        id="txtHalfTimeAttendanceHour1To"
                                                        name="workingHalfTime1End"
                                                        value={workingHalfTime1End}
                                                        onChangeTime={handleWorkingHalfTime1EndChange}
                                                        disabled={editData}
                                                    ></TimePicker>
                                                </CCol>
                                                <CCol xl="4">
                                                    <div className="d-flex flex-wrap align-items-center mt-2">
                                                        <CFormGroup style={{ marginLeft: "36px" }} variant="checkbox" >
                                                            <CInputRadio
                                                                className="form-check-input" id="radCurrentDate1" name="hour1" value="1"
                                                                onChange={handleFirstHalfEndTimeDateFlag}
                                                                disabled={editData}
                                                                checked={firstHalfEndTimeDateFlag === 1}
                                                            />
                                                            <CLabel style={{ marginTop: "2px" }} variant="checkbox" htmlFor="radCurrentDate1">{t('Current assign date')}</CLabel>
                                                        </CFormGroup>
                                                        <CFormGroup style={{ marginLeft: "36px" }} variant="checkbox" >
                                                            <CInputRadio className="form-check-input" id="radNextDay1" name="hour1" value="2"
                                                                onChange={handleFirstHalfEndTimeDateFlag}
                                                                disabled={editData}
                                                                checked={firstHalfEndTimeDateFlag === 2}
                                                            />
                                                            <CLabel style={{ marginTop: "2px" }} variant="checkbox" htmlFor="radNextDay1">{t('Next day')}</CLabel>
                                                        </CFormGroup>
                                                    </div>
                                                </CCol>
                                            </CRow>
                                        </div>
                                    </div>
                                    {/* </CCol>
                                    </CRow> */}
                                    {/* <CRow>
                                        <CCol lg="9" sm="10"> */}
                                    <div className="d-flex boder boder-radius mt-3" style={{ maxWidth: "1100px" }}>
                                        <div className="d-flex align-items-center" style={{ width: "250px", maxWidth: "300px", minWidth: "90px", backgroundColor: "#fdd2ce", padding: "0.5rem", borderRadius: "0.7rem 0 0 0.7rem" }}>
                                            <CLabel id="lblHalfTimeAttendanceHour2" className="required mt-2 ml-2">{t('Half Time Attendance Hour 2')}</CLabel>
                                        </div>
                                        <div className="d-flex align-items-center pl-2 pr-2 pb-2 content-time">
                                            <CRow >
                                                <CCol xl="4" className="d-inline-flex align-items-center border-right mt-2">
                                                    <CImg className="ml-3 mr-3" src={'avatars/intime.png'} alt="intime" height={17} />
                                                    <TimePicker
                                                        id="txtHalfTimeAttendanceHour2From"
                                                        name="workingHalfTime2Start"
                                                        value={workingHalfTime2Start}
                                                        onChangeTime={handleWorkingHalfTime2StartChange}
                                                        disabled={editData}

                                                    ></TimePicker>
                                                </CCol>
                                                <CCol xl="4" className="d-inline-flex align-items-center mt-2">
                                                    <CImg className="ml-3 mr-3" src={'avatars/ontime.png'} alt="ontime" height={17} />
                                                    <TimePicker
                                                        id="txtHalfTimeAttendanceHour2To"
                                                        name="workingHalfTime2End"
                                                        value={workingHalfTime2End}
                                                        onChangeTime={handleWorkingHalfTime2EndChange}
                                                        disabled={editData}
                                                    ></TimePicker>
                                                </CCol>
                                                <CCol xl="4">
                                                    <div className="d-flex flex-wrap align-items-center mt-2">
                                                        <CFormGroup style={{ marginLeft: "36px" }} variant="checkbox">
                                                            <CInputRadio className="form-check-input" id="radCurrentDate2" name="hour2" value="1"
                                                                onChange={handleSecondHalfStartTimeDateFlag}
                                                                disabled={editData}
                                                                checked={secondHalfStartTimeDateFlag === 1}
                                                            />
                                                            <CLabel style={{ marginTop: "2px" }} variant="checkbox" htmlFor="radCurrentDate2">{t('Current assign date')}</CLabel>
                                                        </CFormGroup>
                                                        <CFormGroup style={{ marginLeft: "36px" }} variant="checkbox">
                                                            <CInputRadio className="form-check-input" id="radNextDay2" name="hour2" value="2"
                                                                onChange={handleSecondHalfStartTimeDateFlag}
                                                                disabled={editData}
                                                                checked={secondHalfStartTimeDateFlag === 2}
                                                            />
                                                            <CLabel style={{ marginTop: "2px" }} variant="checkbox" htmlFor="radNextDay2">{t('Next day')}</CLabel>
                                                        </CFormGroup>
                                                    </div>
                                                </CCol>                                                
                                            </CRow>
                                        </div>
                                    </div>
                                    <div className="d-flex boder boder-radius mt-3 mb-4" style={{ maxWidth: "1100px" }}>
                                        <div className="d-flex align-items-center" style={{ width: "250px", maxWidth: "300px", minWidth: "90px", backgroundColor: "#d8f6fe", padding: "0.5rem", borderRadius: "0.7rem 0 0 0.7rem" }}>
                                            <CLabel id="lblHalfTimeAttendanceHour2" className="required mt-2 ml-2">{t('Full Day Total Break Time')}</CLabel>
                                        </div>
                                        <div className="d-flex align-items-center pl-2 pb-2 padding-right-74" style={{ width: "600px"}}>
                                            <CRow className="flex-grow-1">
                                                <CCol xl="6" className="d-inline-flex align-items-center mt-2">
                                                    <CImg className="ml-3 mr-3" src={'avatars/intime.png'} alt="intime" height={17} />
                                                    <TimePicker
                                                        id="txtFullDayTotalBreakTimeFrom"
                                                        name="fullTimeTotalBreakTimeStart"
                                                        value={fullTimeTotalBreakTimeStart}
                                                        onChangeTime={handleFullTimeToTalBTStartChange}
                                                        disabled={editData}
                                                    ></TimePicker>
                                                </CCol>
                                            </CRow>
                                        </div>
                                    </div>
                                    {/* </CCol>
                                    </CRow> */}
                                </CCollapse>
                            </div>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CCol className="p-0">
                            <div className="d-inline-flex">
                                <CImg src={'avatars/list.png'} className="mt-1" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                <details onClick={handleChangeCollapseHalfDay} open={editData !== null}>
                                    <summary id="lblHalfDay" className="ml-2">{t('Half Day')}</summary>
                                </details>
                            </div>
                            <div className="pl-3 mt-3">
                                <CCollapse show={collapseHalfDay} >
                                    {/* <CRow>
                                        <CCol lg="9" sm="10"> */}
                                    <div className="d-flex boder boder-radius" style={{ maxWidth: "1100px" }}>
                                        <div className="d-flex align-items-center" style={{ width: "250px", minWidth: "90px", backgroundColor: "#fafcc6", padding: "0.5rem", borderRadius: "0.7rem 0 0 0.7rem" }}>
                                            <CLabel id="lblHalfTime" className="required mt-2 ml-2">{t('Half Time')}</CLabel>
                                        </div>
                                        <div className="d-flex align-items-center pl-2 pr-2 pb-2" style={{ width: "600px" }}>
                                            <CRow >
                                                <CCol xl="6" className="d-inline-flex border-right mt-2">
                                                    <CImg className="mt-2 ml-3 mr-3" src={'avatars/intime.png'} alt="intime" height={17} />
                                                    <TimePicker
                                                        id="txtHalfTimeFrom"
                                                        name="halfTimeStart"
                                                        value={halfTimeStart}
                                                        onChangeTime={handleHalfTimeStartChange}
                                                        disabled={editData}
                                                    ></TimePicker>
                                                </CCol>
                                                <CCol xl="6" className="d-inline-flex mt-2">
                                                    <CImg className="mt-2 ml-3 mr-3" src={'avatars/ontime.png'} alt="ontime" height={17} />
                                                    <TimePicker
                                                        id="txtHalfTimeTo"
                                                        name="halfTimeEnd"
                                                        value={halfTimeEnd}
                                                        onChangeTime={handleHalfTimeEndChange}
                                                        disabled={editData}
                                                    ></TimePicker>
                                                </CCol>
                                            </CRow>
                                        </div>
                                    </div>
                                    {/* </CCol>
                                    </CRow> */}
                                </CCollapse>
                            </div>
                        </CCol>
                    </CRow>
                </div>
            </CCol>
        </CRow>
        <CRow className="mt-2 pl-3">
            <CCol >
                <div className="d-flex" >
                    <CLabel id="lbldeductOverTime">{t('Do you want to deduct Overtime hour for break time?')}</CLabel>
                    <CSwitch id="swItemDO" name="switchDeductOvertime" className={'mx-5'} shape={'pill'} color={'success'} size={'sm'} labelOn="Yes" labelOff="No"
                        checked={deductOverTime}
                        onChange={handleChangeSwitchOut}
                        disabled={editData}
                    />
                </div>

            </CCol>
        </CRow>
        <CRow className="pl-3">
            <CCol >
                <div className="d-flex">
                    <CFormGroup style={{ marginLeft: "20px" }} variant="checkbox">
                        <CInputRadio className="form-check-input" id="radOneHour" name="breakTime"
                            onChange={handleUseDeductOTChange}
                            checked={breakingTimeUseFlag === 1}
                            disabled={editData ? true : !deductOverTime}
                        />
                        <CLabel style={{ marginTop: "2px" }} variant="checkbox" htmlFor="radOneHour">{t('1 hour')}</CLabel>
                    </CFormGroup>
                    <CFormGroup style={{ marginLeft: "50px" }} variant="checkbox">
                        <CInputRadio className="form-check-input" id="radBreakTime" name="breakTime"
                            onChange={handleUseDeductOTChange}
                            checked={breakingTimeUseFlag === 2}
                            disabled={editData ? true : !deductOverTime}
                        />
                        <CLabel style={{ marginTop: "2px" }} variant="checkbox" htmlFor="radBreakTime">{t('Break Time')}</CLabel>
                    </CFormGroup>
                </div>
            </CCol>
        </CRow>
    </>
    )
}

export default ShiftNormalRuleRegisterForm;
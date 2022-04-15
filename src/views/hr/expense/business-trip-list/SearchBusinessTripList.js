import { CButton, CCard, CCol, CFormGroup, CImg, CInputRadio, CLabel, CRow, CSelect } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const SearchBusinessTripList = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12">
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel id="lbEmployeeID">{t('Employee ID')}</CLabel>
                <div className="basic-autocomplete">
                    <Autocomplete
                        id="txtEmployeeID"
                        onChange={(i) => props.changeAutocomplete('id', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.idArr}
                        name={props.empID}
                        autoFocus={true}
                        disabled={props.viewPermissionAPI ? false : true}
                    />
                </div>
            </CCol>
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel id="lbEmployeeCode">{t('Employee Code')}</CLabel>
                <div className="basic-autocomplete">
                    <Autocomplete
                        id="txtEmployeeCode"
                        onChange={(i) => props.changeAutocomplete('code', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.codeArr}
                        name={props.empCode}
                        disabled={props.viewPermissionAPI ? false : true}
                    />
                </div>
            </CCol>
            <CCol className="mb-4" lg="4">
                <CLabel id="lbEmployeeName" >{t('Employee Name')}</CLabel>
                <div className="basic-autocomplete">
                    <Autocomplete
                        id="txtEmployeeName"
                        onChange={(i) => props.changeAutocomplete('name', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.nameArr}
                        name={props.empName}
                        disabled={props.viewPermissionAPI ? false : true}
                    />
                </div>
            </CCol>
        </CRow>

        { /* From Date To Date */}
        <CRow>
            <CCol lg="5" className="mb-4">
                <CLabel >{t('Business Trip Period (From Date)')}</CLabel>
                <DatePicker id="calPeriodTo" value={props.selectedFromDate} change={props.handleFromDateChange} />
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel >{t('Business Trip Period (To Date)')}</CLabel>
                <DatePicker id="calPeriodFrom" value={props.selectedToDate} change={props.handleToDateChange} />
            </CCol>
        </CRow>
        <CRow>
            <CCol lg="5" className="mb-4">
                <CLabel>{t('Expense Department')}</CLabel>
                <CSelect className="bamawl-select" id="dropExpenseDepartment" value={props.expenseDepartment} onChange={props.chooseExpenseDepartment} custom>
                    <option key="" value="">{t('---Select Expense Department---')}</option>
                    {props.departmentAPI &&
                        props.departmentAPI.map(i => {
                            return (<option key={i.id} value={i.id}> {i.department_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel>{t('Department')}</CLabel>
                <CSelect className="bamawl-select" id="dropDepartment" value={props.department} onChange={props.chooseDepartment} custom>
                    <option key="" value="">{t('---Select Department---')}</option>
                    {props.departmentAPI &&
                        props.departmentAPI.map(i => {
                            return (<option key={i.id} value={i.id}> {i.department_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>
        <CRow>
            <CCol lg="5" className="mb-4">
                <CLabel>{t('Position')}</CLabel>
                <CSelect className="bamawl-select" id="dropPositon" value={props.position} onChange={props.choosePosition} custom>
                    <option key="" value="">{t('---Select Position---')}</option>
                    {props.positionAPI &&
                        props.positionAPI.map(i => {
                            return (<option key={i.id} value={i.id}> {i.position_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel>{t('Trip Type')}</CLabel>
                <CSelect className="bamawl-select" id="dropTripType" value={props.tripType} onChange={props.chooseTripType} custom>
                    <option key="" value="">{t('---Select Trip Type---')}</option>
                    <option key="1" value="1">{t('Domestic')}</option>
                    <option key="2" value="2">{t('Oversea')}</option>
                </CSelect>
            </CCol>
        </CRow>
        <CRow>
            <CCol lg="5" className="mb-4">
                <CLabel>{t('Approver Status')}</CLabel>
                <CSelect className="bamawl-select" id="dropApproverStatus" value={props.approverStatus} onChange={props.chooseApproverStatus} custom>
                    <option key="" value="">{t('---Select Approver Status---')}</option>
                    {props.approverStatusAPI &&
                        props.approverStatusAPI.map(i => {
                            return (<option key={i.id} value={i.id}> {i.status_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>
        <CRow lg="12" className="mb-4 mt-0">
            <div className="pl-3 mt-4">
                <CImg src={'avatars/list.png'} alt="titleicon" className="businessTripList imgList" /><label id="lbBusinessTrip">{t('Business Trip')}</label>
            </div>
        </CRow>
        <CRow lg="12">
            <CCol>
                <CCard className="expense-list-card-detail" style={{ backgroundColor: "#fafbfc" }}>
                    <CRow lg="12" className="mt-4 mb-0 emp-role-regis-col-title ml-2 mr-2">
                        <CCol lg="6" className="business-background-color px-lg-5 verticle-line mb-4" >
                            <CLabel >{t('Applied Date (From)')}</CLabel>
                            <DatePicker id="calAppliedDateFrom" value={props.selectedTripAppliedFromDate} change={props.handleTripAppliedFromDateChange} />
                        </CCol>
                        <CCol lg="6" className="px-lg-5 mb-4 business-background-color" >
                            <CLabel >{t('Applied Date (To)')}</CLabel>
                            <DatePicker id="calAppliedDateTo" value={props.selectedTripAppliedToDate} change={props.handleTripAppliedToDateChange} />
                        </CCol>
                    </CRow>
                    <CRow lg="12" className="mt-2 mb-2 emp-role-regis-col-title ml-2 mr-2">
                        <CCol lg="6" className="business-background-color px-lg-5 verticle-line mb-4" >
                            <CLabel >{t('Due Date (From)')}</CLabel>
                            <DatePicker id="calDuaDateFrom" value={props.selectedTripDueFromDate} change={props.handleTripDueFromDateChange} />
                        </CCol>
                        <CCol lg="6" className="px-lg-5 mb-4 business-background-color" >
                            <CLabel >{t('Due Date (To)')}</CLabel>
                            <DatePicker id="calDuaDateTo" value={props.selectedTripDueToDate} change={props.handleTripDueToDateChange} />
                        </CCol>
                    </CRow>
                </CCard>
            </CCol>
        </CRow>
        <CRow lg="12" className="mt-0 mb-4">
            <div className="pl-3 mt-4">
                <CImg src={'avatars/list.png'} alt="titleicon" className="businessTripList imgList" /><label id="lbBusinessTripAdjustment">{t('Business Trip Adjustment')}</label>
            </div>
        </CRow>
        <CRow lg="12">
            <CCol>
                <CCard className="expense-list-card-detail" style={{ backgroundColor: "#fafbfc" }}>
                    <CRow lg="12" className="mt-4 mb-0 emp-role-regis-col-title ml-2 mr-2">
                        <CCol lg="6" className="px-lg-5 verticle-line mb-4 business-background-color" >
                            <CLabel >{t('Applied Date (From)')}</CLabel>
                            <DatePicker id="calAdjustmentAppliedDateFrom" value={props.selectedAdjustmentAppliedFromDate} change={props.handleAdjustmentAppliedFromDateChange} />
                        </CCol>
                        <CCol lg="6" className="px-lg-5 mb-4 business-background-color" >
                            <CLabel >{t('Applied Date (To)')}</CLabel>
                            <DatePicker id="calAdjustmentAppliedDateTo" value={props.selectedAdjustmentAppliedToDate} change={props.handleAdjustmentAppliedToDateChange} />
                        </CCol>
                    </CRow>
                    <CRow lg="12" className="mt-2 mb-2 emp-role-regis-col-title ml-2 mr-2">
                        <CCol lg="6" className="business-background-color px-lg-5 verticle-line mb-4" >
                            <CLabel >{t('Due Date (From)')}</CLabel>
                            <DatePicker id="calAdjustmentDueDateFrom" value={props.selectedAdjustmentDueFromDate} change={props.handleAdjustmentDueFromDateChange} />
                        </CCol>
                        <CCol lg="6" className="px-lg-5 mb-4 business-background-color" >
                            <CLabel >{t('Due Date (To)')}</CLabel>
                            <DatePicker id="calAdjustmentDueDateTo" value={props.selectedAdjustmentDueToDate} change={props.handleAdjustmentDueToDateChange} />
                        </CCol>
                    </CRow>
                </CCard>
            </CCol>
        </CRow>
        <br />
        <CRow lg="12">
            <CCol style={{ textAlign: "center" }}>
                <CButton className="form-btn" onClick={props.searchAPI} id="btnSearch">{t('Search')}</CButton>
            </CCol>
        </CRow>

        <CRow lg="12" className="my-4">
            <div className="pl-3 mt-4">
                <CImg src={'avatars/list.png'} alt="titleicon" className="businessTripList imgList" /><label id="lbConfirmationRejection">{t('Confirmation / Rejection')}</label>
            </div>
        </CRow>
        <CRow lg="12">
            <CCol>
                <CCard className="expense-list-card-detail" style={{ backgroundColor: "#fafbfc" }}>
                    <CRow lg="12">
                        <CCol lg="12" className="px-lg-5">
                            <label id="lbJoinedDateTo"></label>
                            <CRow className="panel-border">
                                <div className="item-select" >
                                    <label className="card" style={{ padding: "10px", marginLeft: "20px", border: "1px solid #c8ccd0" }}>
                                        <CFormGroup variant="custom-radio">
                                            <CLabel className="form-check-label" variant="checkbox">{t('Business Trip')}</CLabel>
                                            <div className="float-right" style={{ marginLeft: "50px" }} >
                                                <CInputRadio id="radBusinessTrip" name="isAdjustment" value={false} onChange={props.chooseIsAdjustment} checked={props.isAdjustment === false} className="form-check-input"
                                                />
                                            </div>
                                        </CFormGroup>
                                    </label>
                                </div>&nbsp;
                                <div className="item-select" >
                                    <label className="card" style={{ padding: "10px", marginLeft: "20px", border: "1px solid #c8ccd0" }}>
                                        <CFormGroup variant="custom-radio">
                                            <CLabel className="form-check-label" variant="checkbox">{t('Business Trip Adjustment')}</CLabel>
                                            <div className="float-right" style={{ marginLeft: "50px" }} >
                                                <CInputRadio id="radBusinessTripAdjustment" name="isAdjustment" value={true} onChange={props.chooseIsAdjustment} checked={props.isAdjustment === true} className="form-check-input"
                                                />
                                            </div>
                                        </CFormGroup>
                                    </label>
                                </div>
                            </CRow>
                            {/* </CCol> */}
                        </CCol>
                    </CRow>
                </CCard>
            </CCol>
        </CRow>
    </>
    );
}
export default SearchBusinessTripList;
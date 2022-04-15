import React, { useEffect } from 'react';
import { CCol, CRow, CInput, CLink, CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import TextField from '@material-ui/core/TextField';

const BusinessTripAdjustmentRequestInit = props => {
    const { t } = useTranslation();

    useEffect(() => { });

    let {
        mainData,
        downloadFile,
        flagHistory,
    } = props

    let getDepartment = () =>{
        let result = {departments:"",positions:""};
        let data =mainData?.employee_has_dept_position?.map((ele,index) =>{
            result.departments = result.departments + ele.departments.department_name + (index===mainData?.employee_has_dept_position.length-1?"":", ");
            result.positions = result.positions + ele.positions.position_name + (index===mainData?.employee_has_dept_position.length-1?"":", ");
        })
        return result;
    }

    return (<>
        <CRow lg="12" className="pb-4">
            <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
                <label id="lblEmployeeID">{t('Employee ID')}<span className="required"></span></label>
                <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
                    <CInput className="mb-1" value={mainData?.employee_id || ""} disabled />
                </div>
            </CCol>
            <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
                <label id="lblEmployeeCode" >{t('Employee Code')}</label>
                <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
                    <CInput className="mb-1" value={mainData?.employee_code || ""} disabled />
                </div>
            </CCol>
            <CCol lg="4">
                <label id="lblEmployeeName">{t('Employee Name')}</label>
                <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
                    <CInput className="mb-1" value={mainData?.employee_name || ""} disabled />
                </div>
            </CCol>
        </CRow>
        <CRow lg="12" className="pb-4">
            <CCol lg="6" style={{ borderRight: "1px solid #E3E5F1" }}>
                <label id="lblBusinessTripPeriodFromDate">{t('Business Trip Period')}<span className="required"></span> ({t('From Date')})</label>
                <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
                    <DatePicker value={Moment(mainData?.trip_period_from_date).format('YYYY-MM-DD') || ""} disabled={true} />
                </div>
            </CCol>
            <CCol lg="6">
                <label id="lblBusinessTripPeriodToDate">{t('Business Trip Period')}<span className="required"></span> ({t('To Date')})</label>
                <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
                    <DatePicker value={Moment(mainData?.trip_period_to_date).format('YYYY-MM-DD') || ""} disabled={true} />
                </div>
            </CCol>
        </CRow>
        <CRow lg="12" className="pb-4">
            <CCol lg="6" style={{ borderRight: "1px solid #E3E5F1" }}>
                <label id="lblExpenseDepartment">{t('Expense Department')}</label>
                <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
                    <CInput className="mb-1" id="dropExpenseDepartment" value={mainData?.expense_department || ""} disabled />
                </div>
            </CCol>
            <CCol lg="6">
                <label id="lblDepartment" >{t('Department')}</label>
                <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
                    <CInput className="mb-1" value={getDepartment().departments} disabled />
                </div>
            </CCol>
        </CRow>
        <CRow lg="12" className="pb-4">
            <CCol lg="6" style={{ borderRight: "1px solid #E3E5F1" }}>
                <label id="lblDestination" >{t('Destination')}<span className="required"></span></label>
                <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
                    <CInput className="mb-1" value={mainData?.destination || ""} disabled />
                </div>
            </CCol>
            <CCol lg="6">
                <label id="lbPosition" >{t('Position')}<span className="required"></span></label>
                <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
                    <CInput className="mb-1" value={getDepartment().positions} disabled />
                </div>
            </CCol>
        </CRow>
        <CRow lg="12" className="pb-4">
            <CCol lg="6" style={{ borderRight: "1px solid #E3E5F1" }}>
                <label id="lblTripType" >{t('Trip Type')}</label>
                <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
                    <CInput className="mb-1" id="dropTripType" disabled value={mainData?.trip_type === 1 ? "Domestic" : "Oversea" || ""} />
                </div>
            </CCol>
            <CCol lg="6">
                <label id="lblExchangeRate" >{t('Exchange Rate')}<span className="required"></span></label>
                <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
                    <CInput className="mb-1" value={mainData?.exchange_rate || ""} disabled />
                </div>
            </CCol>
        </CRow>
        <CRow lg="12" className="pb-4">
            <CCol lg="12">
                <label id="lblPurpose" >{t('Purpose')}<span className="required"></span></label>
                <TextField multiline disabled rowsMax={2} value={mainData?.purpose || ""} />
            </CCol>
        </CRow>
        <CRow lg="12" className="pb-4">
            <CCol lg="6" >
                <label id="lblAppliedDate" >{t('Applied Date')}<span className="required"></span></label>
                <DatePicker value={Moment(mainData?.requested_date).format('YYYY-MM-DD') || ""} disabled={true} />
            </CCol>
            <CCol lg="6" >
                <label id="lblDueDate" >{t('Due Date')}<span className="required"></span></label>
                <DatePicker value={Moment(mainData?.due_date).format('YYYY-MM-DD') || ""} disabled={true} />
            </CCol>
        </CRow>
        <br />
        <CRow className="justify-content-start">
            <CCol lg="3" md="9">
                <label>{t('Business Trip Other Attachement')}</label>
            </CCol>
            <CCol lg="9" md="9">
                {
                    mainData?.business_trip_other_attach?.map((ele, index) => {
                        return (
                            <label key={index} style={{ cursor: flagHistory ? "pointer" : "not-allowed" }} onClick={(e) => flagHistory && downloadFile(e, ele, false, ele.file_name.slice(ele.file_name.lastIndexOf("/") + 1))}>
                                <i className="fas fa-file-alt icon-btn pr-1"></i>
                                <CLink>&nbsp;{ele.file_name.slice(ele.file_name.lastIndexOf("/") + 1)}&nbsp;&nbsp;&nbsp;&nbsp;</CLink>
                            </label>
                        )
                    })
                }
            </CCol>
        </CRow>
        <br />
        <CRow lg="12" className="pb-3">
            <CCol lg="12">
                <label id="lblPurpose" style={{ color: "red" }} >{`#${t('Arrange By Admin')} :${t('You cannot get this amount because of admin or company arrange/buy for you.')}`}</label>
            </CCol>
        </CRow>
    </>);
}
export default BusinessTripAdjustmentRequestInit;
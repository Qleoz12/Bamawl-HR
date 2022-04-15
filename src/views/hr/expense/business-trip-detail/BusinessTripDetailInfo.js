import React, { useEffect } from "react";
import { CCol, CRow, CLabel, CLink } from "@coreui/react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { TextField } from "@material-ui/core";
import DatePicker from '../../hr-common/datepicker/DatePicker';

const  BusinessTripDetailInfo = (props) => {
    const { t } = useTranslation();
    useEffect(() => {});
    let { mainTable,
          department,
          exportFile
    } = props;
    let exdpt="";
    //get Expense Department
    let exDepartment=(value)=>{
       department.map((i)=>{
           if( i.id == value)
             exdpt=i.department_name;
       })
       return exdpt;
    }
    return (
        <>
            {mainTable !== "" && (
                <>
                 <CRow lg="12" className="move_from_bottom disabled-form">
                    <CCol className="mb-4 verticle-line" lg="4">
                        <CLabel id="lblEmployeeID" className="required" >{t('Employee ID')}</CLabel>
                        <TextField id="txtEmployeeID" value={mainTable.employee_id} disabled></TextField>
                    </CCol>
                    <CCol className="mb-4 verticle-line" lg="4">
                        <CLabel id="lblEmployeeCode">{t('Employee Code')}</CLabel>
                        <TextField id="txtEmployeeCode" value={mainTable.emp_code} disabled></TextField>
                    </CCol>
                    <CCol className="mb-4" lg="4">
                        <CLabel id="lblEmployeeName" >{t('Employee Name')}</CLabel>
                        <TextField id="txtEmployeeName" value={mainTable.emp_name} disabled></TextField>
                    </CCol>
                </CRow>
                <CRow lg="12"className="disabled-form mb-4">
                    <CCol  lg="5">
                        <CLabel id="lblTripPeriodFromDate">
                            {t('Business Trip Period* (From Date)')} {}
                        </CLabel>
                        <DatePicker id="txtFromDetail" value={mainTable.trip_period_from_date?.split(" ")[0]} disabled={true}/>
                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg="5">
                        <CLabel id="lblTripPeriodToDate">
                            {t('Business Trip Period* (To Date)')}
                        </CLabel>
                          <DatePicker id="txtToDetail" value={mainTable.trip_period_to_date?.split(" ")[0]} disabled={true}/>
                    </CCol>
                </CRow>
                <CRow lg="12"className="disabled-form mb-4">
                    <CCol lg="5">
                        <CLabel id="lblExpenseDepartment" className="required">
                            {t('Expense Department')}
                        </CLabel>
                        <TextField id="txtExpenseDepartment" value={exDepartment(mainTable.expense_department_id)} disabled></TextField>
                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg="5">
                        <CLabel id="lblDepartment" className="required">
                            {t('Department')}
                        </CLabel>
                        <TextField id="txtDepartment" value={mainTable.department} disabled></TextField>
                    </CCol>
                </CRow>
                <CRow lg="12"className="disabled-form mb-4">
                    <CCol lg="5">
                        <CLabel id="lblDestination" className="required">
                            {t('Destination')}
                        </CLabel>
                        <TextField id="txtDestination" value={mainTable.destination} disabled></TextField>
                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg="5">
                        <CLabel id="lblPosition" className="required">
                            {t('Position')}
                        </CLabel>
                        <TextField id="txtPosition" value={mainTable.position} disabled></TextField>
                    </CCol>
                </CRow>
                <CRow lg="12"className="disabled-form mb-4">
                    <CCol lg="5">
                        <CLabel id="lblTripType" className="required">
                            {t('Trip Type')}
                        </CLabel>
                        <TextField id="txtTripType" value={ mainTable.trip_type == 1? "Domestic": "Oversea"} disabled></TextField>
                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg="5">
                        <CLabel id="lblExchangeRate" className="required">
                            {t('Exchange Rate')}
                        </CLabel>
                        <TextField id="txtExchangeRate" value={parseFloat(mainTable.exchange_rate)} disabled></TextField>
                    </CCol>
                </CRow>
                <CRow lg="12"className="disabled-form">
                    <CCol className="mb-4">
                        <CLabel id="lblPurpose">
                            {t('Purpose')}
                        </CLabel>
                        <TextField id="txtareaPurpose" value={mainTable.purpose || ""} disabled></TextField>
                    </CCol>
                </CRow>
                <CRow lg="12"className="disabled-form mb-4">
                    <CCol lg="5">
                        <CLabel id="lblAppliedDate" className="required">
                            {t('Applied Date')}
                        </CLabel>
                        <DatePicker id="txtAppliedDateDetail"
                         value={mainTable.applied_date?.split(" ")[0]} disabled={true} />
                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg="5">
                        <CLabel id="lblDueDate" className="required">
                            {t('Due Date')}
                        </CLabel>
                        <DatePicker id="txtDueDateDetail" value={mainTable.due_date?.split(" ")[0]} disabled={true} />
                    </CCol>
                </CRow>
                    <CRow lg="12" >
                        <CCol className="pb-2">
                            <CLabel id="lblBusinessTripOtherAttachement">
                                {t("Business Trip Other Attachement")}
                            </CLabel>
                            <CRow>
                                <CCol lg="3" md="6" className="disabled-form">
                                    <i className="fas fa-paperclip mr-3" style={{color:"#b0b0b0"}}></i>
                                    <label>{t("Drag & Drop files to attach or")}</label>
                                    &nbsp;
                                    <label style={{color:"#0000ff59"}}>
                                        {t('Browse')}
                                    </label>
                                </CCol>
                                <CCol className="d-flex flex-wrap" >
                                    {
                                        mainTable.business_trip_other_attachement.map((ele, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <div className="d-flex flex-nowrap">
                                                        <i className="file ml-4 fas fa-file icon-btn mr-2"
                                                        ></i>
                                                        <CLink  id="hylBusinessTripOtherAttachementFileAttach" className="pe-auto" type="button" onClick={exportFile.bind(this,ele,ele.business_trip_document_name)}>{ele.business_trip_document_name?.split("/")[ele.business_trip_document_name?.split("/").length-1]}</CLink>
                                                    </div>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </>
            )}
        </>
    );
};
export default BusinessTripDetailInfo;

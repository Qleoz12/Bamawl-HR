import { CButton, CCol, CInput, CRow } from '@coreui/react';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ExpenseDetailEmployeeBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            props.mainTable.map((i, index) => {
                return (
                    <Fragment key={index} >
                        <CRow lg="12" style={{ marginBottom: '10px' }}>
                            <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1", color: "#ababab" }}>
                                <label id="lbEmployeeId" className="">{t('Employee ID')}</label><br />
                                <CInput id="txtEmployeeId" className="bamawl-input" value={i.employee_id} disabled />
                            </CCol>
                            <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1", color: "#ababab" }}>
                                <label id="lbEmployeeCode" className="">{t('Employee Code')}</label><br />
                                <CInput id="txtEmployeeCode" className="bamawl-input" value={i.employee_code ? i.employee_code : ""} disabled />
                            </CCol>
                            <CCol lg="4" style={{ color: "#ababab" }}>
                                <label id="lbEmployeeName" className="">{t('Employee Name')}</label><br />
                                <CInput id="txtEmployeeName" className="bamawl-input" value={i.employee_name} disabled />
                            </CCol>
                        </CRow>
                        <br />
                        <CRow lg="12" style={{ marginBottom: '10px' }}>
                            <CCol lg="5" style={{ color: "#ababab" }}>
                                <label id="lbDepartment" className="">{t('Department')}</label><br />
                           
                                    
                                        <CInput id="txtDepartment" className="bamawl-input" value={props.department} disabled />
                                   
                             
                                
                            </CCol>
                            <CCol lg="1" className="verticle-line" />
                            <CCol lg="1" />
                            <CCol lg="5" style={{ color: "#ababab" }}>
                                <label className="">{t('Position')}</label><br />
                                        <CInput className="bamawl-input" value={props.position} disabled />              
                            </CCol>
                        </CRow>
                        <CRow lg="12" style={{ marginBottom: '10px' }}>
                            <CCol lg="5" style={{ color: "#ababab" }}>
                                <label id="lbExpenseDepartment" className="">{t('Expense Department')}</label><br />
                                <CInput id="txtExpenseDepartment" className="bamawl-input" value={i.expense_department ? i.expense_department : ""} disabled />
                            </CCol>
                            <CCol lg="1" className="verticle-line" />
                            <CCol lg="1" />
                            <CCol lg="5" style={{ color: "#ababab" }}>
                                <label id="lbPoNo" className="">{t('P.O No')}</label><br />
                                <CInput id="txtPoNo" className="bamawl-input" value={i.po_number ? i.po_number : ""} disabled />
                            </CCol>
                        </CRow>
                        <CRow lg="12" style={{ marginBottom: '10px' }}>
                            <CCol lg="5" style={{ color: "#ababab" }}>
                                <label id="lbVendorCompany" className="">{t('Vendor Conpany')}</label><br />
                                <CInput id="txtVendorCompany" className="bamawl-input" value={i.vendor_company ? i.vendor_company : ""} disabled />
                            </CCol>
                            <CCol lg="1" className="verticle-line" />
                            <CCol lg="1" />
                            <CCol lg="5" style={{ color: "#ababab" }}>
                                <label id="lbVendorName" className="">{t('Vendor Name')}</label><br />
                                <CInput id="txtVendorName" className="bamawl-input" value={i.vendor_name ? i.vendor_name : ""} disabled />
                            </CCol>
                        </CRow>
                        <CRow lg="12" style={{ marginBottom: '10px' }}>
                            <CCol lg="5" style={{ color: "#ababab" }}>
                                <label id="lbExchangeRate" className="">{t('Exchange Rate')}</label><br />
                                <CInput id="txtExchangeRate" className="bamawl-input" value={parseFloat(i.exchange_rate)} disabled />
                            </CCol>
                            <CCol lg="1" className="verticle-line" />
                            <CCol lg="1" />
                            <CCol lg="5" style={{ color: "#ababab" }}>
                                <label id="lbPhoneEmail" className="">{t('Phone/Email')}</label><br />
                                <CInput id="txtPhoneEmail" className="bamawl-input" value={i.contact_ph_email ? i.contact_ph_email : ""} disabled />
                            </CCol>
                        </CRow>
                        <CRow lg="12" style={{ marginBottom: '10px' }}>
                            <CCol lg="12" style={{ color: "#ababab" }}>
                                <label id="lbSubject" className="">{t('Subject')}</label><br />
                                <CInput id="txtSubject" className="bamawl-input" value={i.subject ? i.subject : ""} disabled />
                            </CCol>
                        </CRow>
                        <br />
                        <CRow lg="12" style={{ marginBottom: '10px' }} >
                            <CCol lg="5" style={{ color: "#ababab" }}>
                                <label className="">{t('Applied Date')}</label>
                                <DatePicker  name="dropApplieDate" id="txtAppliedDate" value={i.requested_date} disabled/>
                            </CCol>
                            <CCol lg="1" className="verticle-line" />
                            <CCol lg="1" />
                            <CCol lg="5" style={{ color: "#ababab" }} >
                                <label className="">{t('Due Date')}</label><br />
                                <DatePicker  name="dropDueDate" id="txtDueDate" value={i.due_date} disabled/>
                            </CCol>
                        </CRow>
                        <CRow lg="12">
                            <CCol lg="12">
                                <label id="lbExpenseOtherAttachment" className="">{t('Expense Other Attachment')}</label><br />
                                {i.other_attach.map((sec, idx) => {
                                    return (
                                        <CButton id="ExpenseOtherAttachment" onClick={props.downloadFile.bind(this, sec, sec.name)} className="mr-3" style={{ color: "black" }} key={idx}>
                                            <i className="fa fa-file icon-btn pr-1" style={{ color: "#01a3f8" }}></i>
                                            {sec.name}
                                        </CButton>
                                    )
                                })}
                            </CCol>
                        </CRow>
                    </Fragment>
                )
            })
        }
    </>
    );
}
export default ExpenseDetailEmployeeBox;
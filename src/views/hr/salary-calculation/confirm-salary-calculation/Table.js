import React from 'react';
import { useTranslation } from 'react-i18next';
import { CRow, CCol, CImg, CButton, CInput, CTooltip, CLabel, CFormGroup, CLink } from '@coreui/react';

const Table = props => {
    const {t} = useTranslation();
    return(<>
        {
            props.data.length > 0 &&
            <CFormGroup className="m-0 mt-5">
                <CLabel>
                    <CImg className="mr-1" src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                    {t('Confirm For Salary Pay')}
                </CLabel>

                <div className="mb-4" style={{border:'1px solid #E6E6E6',borderRadius:'20px'}}>
                    <CRow className="mt-5 mb-4 ml-2 mr-2">
                        <CCol lg="12">
                            <CCol lg="12">
                                <CRow alignHorizontal="end">
                                    <div className="row-count-msg">{props.rowCount}</div>
                                </CRow>
                            </CCol>

                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            {
                                                (props.checkboxColumn === true && props.checkApplicantApprover === 'approver') &&
                                                <th rowSpan="2">
                                                    <input type="checkbox" value="allcheck" checked={props.allChecked} onChange={props.changeCheckbox} />
                                                </th>
                                            }
                                            <th rowSpan="2" style={{ minWidth: '100px' }}>
                                                { t('Department Name') }
                                            </th>
                                            <th rowSpan="2" style={{ minWidth: '110px' }}>
                                                { t('Total Employees') }
                                            </th>
                                            <th colSpan={props.totalColumn} style={{ minWidth: '110px' }}>
                                                { t('Total Net Salary') }
                                            </th>
                                            <th rowSpan="2" style={{ minWidth: '110px' }}>
                                                { t('Status') }
                                            </th>
                                            {
                                                props.checkApplicantApprover === 'approver' &&
                                                <th rowSpan="2" style={{ minWidth: '70px' }}>
                                                    { t('Action') }
                                                </th>
                                            }
                                        </tr>
                                        <tr>
                                            {
                                                props.currency.map((i,index) => {
                                                    return(
                                                        <th rowSpan="2" className="top-border">{ t(i) }</th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.data.map( (i,index) => {
                                                return(
                                                    <tr key={index} width="100%">
                                                        {
                                                            (props.checkboxColumn === true && props.checkApplicantApprover === 'approver') &&
                                                            <td className="td-no">
                                                                {
                                                                    i.checkbox_row === true &&
                                                                    <input type="checkbox" value={i.id} checked={i.is_checked} onChange={props.changeCheckbox} />
                                                                }
                                                            </td>
                                                        }

                                                        <td className={props.checkApplicantApprover === 'approver' ? 'text-left' : 'td-no text-left'} style={{ minWidth: '100px' }}>
                                                            <CLink onClick={props.depModal.bind(this,i)}>{i.department_name}</CLink>
                                                        </td>
                                                        <td className="text-left" style={{ minWidth: '110px' }}>
                                                            {i.total_employee}
                                                        </td>
                                                        {
                                                            i.total_salary.map((ii,indexII) => {
                                                                return(
                                                                    <td className="text-right bg-pink" style={{ minWidth: '110px' }}>
                                                                        {ii}
                                                                    </td>
                                                                )
                                                            })
                                                        }

                                                        <td className="text-center bg-pink" style={{ minWidth: '110px' }}>
                                                            {i.status}
                                                        </td>
                                                        {
                                                            props.checkApplicantApprover === 'approver' &&
                                                            <td className="text-center" style={{ minWidth: '70px' }}>
                                                                {
                                                                    i.checkbox_row === false &&
                                                                    <CTooltip content={t('Delete')}>
                                                                        <CButton onClick={props.delete.bind(this,i)}><img alt="delete" className="span-icon" src="/avatars/delete.png" width="25px"/></CButton>
                                                                    </CTooltip>
                                                                }
                                                                {
                                                                    i.checkbox_row === true && '-'
                                                                }
                                                            </td>
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            {
                                (props.checkApplicantApprover === 'approver' && props.checkboxColumn === true) &&
                                <CRow alignHorizontal="center" className="mt-4 mb-2">
                                    <CButton className="form-btn m-2" onClick={props.confirm}>{t('Confirm')}</CButton>
                                    <CButton className="form-btn m-2" onClick={props.reject}>{t('Reject')}</CButton>
                                </CRow>
                            }
                            {
                                (props.checkApplicantApprover === 'applicant' && props.totalConfirmAmountShow === true) &&
                                <CRow alignHorizontal="center" className="mt-4 mb-2">
                                    <CButton className="form-btn m-2" onClick={props.payslipDownload} >
                                        <CImg className="icon-download" src='/avatars/download.png' style={{marginRight:'10px'}} />
                                        {t('Download Payslip')}
                                    </CButton>
                                    <CButton className="admin-btn form-btn m-2" onClick={props.payBank}>{t('Ready to Bank Pay')}</CButton>
                                </CRow>
                            }
                        </CCol>
                    </CRow>
                </div>
            </CFormGroup>
        }
    </>)
}

export default Table

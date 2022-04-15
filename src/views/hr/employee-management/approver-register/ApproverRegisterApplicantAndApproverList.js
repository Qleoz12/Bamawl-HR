import React, { useEffect, Fragment } from 'react';
import { CCol, CRow, CButton, CInputRadio, CImg, CLabel, CCard } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const ApproverRegisterApplicantAndApproverList = props => {
    let {
        applicantAndApproverListTable,
        chooseSend,
        emailFlag,
        saveData,
        cancelData
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CCol lg="12">
            <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
            <CLabel id="lblApplicantAndApproverList" className="title-lbl">{t('Applicant and Approver List')}</CLabel>
        </CCol>
        
            <CCard className="panel" style={{ padding: '15px' }}>
                <CCard className='table-panel' style={{ paddingTop: '20px', paddingBottom: "20px", margin: "10px" }}>
                {applicantAndApproverListTable != "" &&
                    <CRow id="table">
                        <CCol lg="12">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead id="thead-id">
                                        <tr>
                                            <th id="lblApplicant" style={{ textAlign: 'center', verticalAlign: "middle", backgroundColor: "#ebedef", color: "#3c4b64" }} colSpan={6}>
                                                {t('Applicant')}
                                            </th>
                                            <th id="lblApprover" style={{ textAlign: 'center', verticalAlign: "middle", backgroundColor: "#ebedef", color: "#3c4b64" }} colSpan={5}>
                                                {t('Approver')}
                                            </th>
                                        </tr>
                                        <tr width="100%">
                                            <th id="tblNo" width="" className="no-border-radius" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('No')}
                                                </div>
                                            </th>
                                            <th id="tblEmplyeeApplicantID" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Employee ID')}
                                                </div>
                                            </th>
                                            <th id="tblEmployeeApplicantCode" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Employee Code')}
                                                </div>
                                            </th>
                                            <th id="tblEmployeeApplicantName" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Employee Name')}
                                                </div>
                                            </th>
                                            <th id="tblPositionApplicant" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Position')}
                                                </div>
                                            </th>
                                            <th id="tblDepartmentApplicant" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Department')}
                                                </div>
                                            </th>
                                            <th id="tblEmplyeeApproverID" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Employee ID')}
                                                </div>
                                            </th>
                                            <th id="tblEmployeeApproverName" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Employee Name')}
                                                </div>
                                            </th>
                                            <th id="tblPositionApprover" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Position')}
                                                </div>
                                            </th>
                                            <th id="tblDepartmentApprover" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Department')}
                                                </div>
                                            </th>
                                            <th id="tblStatus" className="no-border-radius" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Status')}
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            applicantAndApproverListTable.map((i, index) => {
                                                return (<Fragment key={index}>
                                                    {
                                                        i.approver.map((approver, app) => {
                                                            return (<Fragment key={app}>
                                                                <tr width="100%">
                                                                    { app == 0 && <>
                                                                        <td className="td-no" style={{ textAlign: "right", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan = {i.approver.length}>
                                                                            {index + 1}
                                                                        </td>
                                                                        <td className="td-emp-id" style={{ textAlign: "right", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan = {i.approver.length}>
                                                                            {i.applicant.employee_id}
                                                                        </td>
                                                                        <td className="td-emp-id" style={{ textAlign: "left", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan = {i.approver.length}>
                                                                            {i.applicant.employee_code}
                                                                        </td>
                                                                        <td  className="td-emp-id" style={{maxWidth: "250px", textAlign: "left", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan = {i.approver.length}>
                                                                            {i.applicant.employee_name}
                                                                        </td>
                                                                        <td className="td-pink" style={{ textAlign: "left", padding: "0px"}} rowSpan = {i.approver.length}>
                                                                            <table>
                                                                                <tbody>
                                                                                    {
                                                                                        i.applicant.employee_has_dept_position.map((applicant_pos, temp) => {
                                                                                            return (<Fragment key={temp}>
                                                                                                <tr>
                                                                                                    <td className="td-pink" style={{ textAlign: "left", border: "none"}} >
                                                                                                        {applicant_pos.positions.position_name}
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </Fragment>)
                                                                                        })
                                                                                    }
                                                                                </tbody>
                                                                            </table>
                                                                            
                                                                        </td>
                                                                        <td className="" style={{ textAlign: "left", padding: "0px", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan = {i.approver.length}>
                                                                            <table>
                                                                                <tbody>
                                                                                    {
                                                                                        i.applicant.employee_has_dept_position.map((applicant_dep, idx) => {
                                                                                            return (<Fragment key={idx}>
                                                                                                <tr>
                                                                                                    <td className="" style={{ maxWidth: "250px",textAlign: "left", border: "none", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                                        {applicant_dep.departments.department_name}
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </Fragment>)
                                                                                        })
                                                                                    }
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                        </>
                                                                    }
                                                                    {
                                                                        <>
                                                                            <td width="" className="" style={{ textAlign: "right", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {approver.employee_id}
                                                                            </td>
                                                                            <td width="" className="td-overtime-title" style={{ maxWidth: "250px", textAlign: "left"}}>
                                                                                {approver.employee_name}
                                                                            </td>
                                                                        </>
                                                                    }
                                                                    <td className="" style={{ textAlign: "left", padding: "0px", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                        <table>
                                                                            <tbody>
                                                                                {
                                                                                    approver.employee_has_dept_position.map((approver_pos, temp) => {
                                                                                        return (<Fragment key={temp}>
                                                                                            <tr>
                                                                                                <td className="" style={{ textAlign: "left", border: "none", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF'  }}>
                                                                                                    {approver_pos.positions.position_name}
                                                                                                </td>
                                                                                            </tr>
                                                                                        </Fragment>)
                                                                                    })
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td className="" style={{ textAlign: "left", padding: "0px", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                        <table>
                                                                            <tbody>
                                                                                {
                                                                                    approver.employee_has_dept_position.map((approver_dep, idx) => {
                                                                                        return (<Fragment key={idx}>
                                                                                            <tr>
                                                                                                <td className="" style={{ maxWidth: "250px", textAlign: "left", border: "none", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }} >
                                                                                                    {approver_dep.departments.department_name}
                                                                                                </td>
                                                                                            </tr>
                                                                                        </Fragment>)
                                                                                    })
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    {
                                                                        <>
                                                                            <td width="" className="" style={{ maxWidth: "200px", textAlign: "left", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {approver.status}
                                                                            </td>
                                                                        </>
                                                                    }
                                                                </tr>
                                                            </Fragment>)
                                                        })
                                                    }
                                                </Fragment>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </CCol>
                    </CRow>
                    }
                </CCard>
            </CCard>
        {applicantAndApproverListTable != "" && 
        <>
            <CCol>
                <CRow style={{ marginLeft: "2%", fontWeight: 'bold' }}>
                    <CLabel id="lblMailSendForAcknowledged">{t('Mail sent for Acknowledged')}</CLabel>
                    <CLabel id="lblDefault" style={{ marginLeft: "30px" }}>{t('(Default)')}</CLabel>
                </CRow>
                <CRow style={{ marginLeft: "270px", fontWeight: 'bold' }}>
                    <div className="input-lbl">
                        <CInputRadio style={{ cursor: "pointer" }}  className="form-check-input" onChange={chooseSend} checked={emailFlag == "1"} name="Send" value="1" id="radioSend" />
                        <CLabel htmlFor={"radioSend"}>{t("Send")}</CLabel>
                    </div>
                    <div className="input-lbl" style={{ marginLeft: "10%" }}>
                        <CInputRadio style={{ cursor: "pointer" }} className="form-check-input" onChange={chooseSend} checked={emailFlag == "2"} name="Not Send" value="2" id="radioNotSend" />
                        <CLabel htmlFor={"radioNotSend"}>{t("Not Send")}</CLabel>
                    </div>
                </CRow>
            </CCol>
        <CRow lg="12">
            <CCol style={{ textAlign: "center" }}>
                <CButton className="form-btn" id='btnSave' onClick={saveData}>{t('Save')}</CButton>
                <CButton className="form-btn" id='btnCancel' style={{ marginLeft: "20px" }} onClick={cancelData}>{t('Cancel')}</CButton>
            </CCol>
        </CRow>
        </>}
    </>
    );
}
export default ApproverRegisterApplicantAndApproverList;
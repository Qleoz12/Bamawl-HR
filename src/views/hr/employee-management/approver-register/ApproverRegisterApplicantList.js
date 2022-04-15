/* eslint-disable eqeqeq */
import React, { useEffect, Fragment } from 'react';
import { CCol, CRow, CButton, CSelect, CImg, CLabel, CCard } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const ApproverRegisterApplicantList = props => {
    let {
        applicantRankChange,
        applicantRankState,
        positionRankAPI,
        deptApplicantChange,
        deptApplicantState,
        departmentAPI,
        searchApplicantClick,
        applicantTable,
        AllApplicantCheck,
        change_applicant_checkbox,
        editData
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CCol lg="12">
            <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
            <CLabel id="lblApplicantList" className="title-lbl">{t('Applicant List')}</CLabel>
        </CCol>
        <CCard className="panel" style={{ padding: '15px' }}>
            <CRow lg="12" style={{ marginBottom: '10px' }}>
                <CCol lg="5" className="mb-4">
                    <CLabel id="lblApplicantRank" className="required">{t('Applicant Rank')}</CLabel>
                    <CSelect className="bamawl-select" disabled={editData != ""} value={applicantRankState} onChange={applicantRankChange} custom>
                        <option key="" value="">{t("---Select Rank---")}</option>
                        {positionRankAPI !== "" &&
                            positionRankAPI.map((item, index) => {
                                return (<option key={index} value={item.id}> {t('Rank')} {item.position_rank} </option>)
                            })
                        }
                    </CSelect>
                </CCol>
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol lg="5" className="mb-4">
                    <CLabel id="lbApplicantlDepartment">{t('Applicant Department')}</CLabel>
                    <CSelect className="bamawl-select" disabled={editData != ""} value={deptApplicantState} onChange={deptApplicantChange} custom>
                        <option key="" value="">{t("---Select Department---")}</option>
                        {departmentAPI !== "" &&
                            departmentAPI.map((item, index) => {
                                return (<option key={index} name={item.department_name} value={item.id}> {item.department_name} </option>)
                            })
                        }
                    </CSelect>
                </CCol>
            </CRow>
            <br />
            <CRow lg="12">
                <CCol style={{ textAlign: "center" }}>
                    <CButton id="btnSearchApplicant" hidden={props?.editData != ""} className="form-btn" onClick={searchApplicantClick}>{t('Search')}</CButton>
                </CCol>
            </CRow><br />
            {
                applicantTable != "" &&
                <CCard className='table-panel'>
                    <CRow id="table">
                        <CCol lg="12">
                            <CCol lg="12">
                                <CRow alignHorizontal="end">
                                    <div id="lblApplicantTotalRows" className="row-count-msg">{t('Total Rows').replace("%s", applicantTable.length)}</div>
                                </CRow>
                            </CCol>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead id="thead-id">
                                        <tr width="100%">
                                            <th width="" className="" style={{ textAlign: 'center' }}>
                                                <input type="checkbox"
                                                    value="all-check"
                                                    checked={AllApplicantCheck === true}
                                                    onChange={change_applicant_checkbox}
                                                    disabled={editData != ""} />
                                            </th>
                                            <th id="tblApplicantID" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Applicant ID')}
                                                </div>
                                            </th>
                                            <th id="tblApplicantName" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Applicant Name')}
                                                </div>
                                            </th>
                                            <th id="tblApplicantDepartment" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Department')}
                                                </div>
                                            </th>
                                            <th id="tblApplicantPosition" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Position')}
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            applicantTable.map((i, index) => {
                                                return (<Fragment key={index}>
                                                    <>
                                                        {i.employee_has_dept_position.map((sec, idx) => {
                                                            return (<Fragment key={idx}>
                                                                <tr key={index} width="100%">
                                                                    {idx == 0 && <>
                                                                        <td className={applicantTable.length - 1 === index
                                                                            ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"} style={{ borderLeft: '3px solid #858BC3', textAlign: "center", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employee_has_dept_position.length}>
                                                                            <input type="checkbox"
                                                                                style={{ marginLeft: "-3px" }}
                                                                                value={i.employee_id}
                                                                                id={i.employee_id}
                                                                                checked={editData != "" ? true : i.is_checked === true}
                                                                                onChange={change_applicant_checkbox}
                                                                                disabled={editData != ""}
                                                                            />
                                                                        </td>
                                                                        <td width="" className="" style={{ textAlign: "right", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employee_has_dept_position.length}>
                                                                            {i.employee_id}
                                                                        </td>
                                                                        <td width="" className="td-emp-id td-green" style={{ maxWidth: "300px", textAlign: "left" }} rowSpan={i.employee_has_dept_position.length}>
                                                                            {i.employee_name}
                                                                        </td>
                                                                    </>
                                                                    }
                                                                    <td width="" className="td-dept td-pink no-border-radius" style={{ maxWidth: "300px", textAlign: "left" }}>
                                                                        {sec.departments.department_name}
                                                                    </td>
                                                                    <td width="" className={applicantTable.length - 1 === index ? "border-bottom-right-radius" : "td-role-name"} style={{ textAlign: "left", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                        {sec.positions.position_name}
                                                                    </td>
                                                                </tr>
                                                            </Fragment>
                                                            )
                                                        })
                                                        }
                                                    </>
                                                </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </CCol>
                    </CRow>
                </CCard>
            }
        </CCard>
    </>
    );
}
export default ApproverRegisterApplicantList;
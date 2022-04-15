import { CCard, CCol, CImg, CPagination, CRow } from '@coreui/react';
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
/**
 * ApproverListTable
 * 
 * @author  v_hao
 * @create_date  2021-05-06
 */
const ApproverListTable = props => {
  let {
    mainTableApplicantApprover,
    rowCount,
    totalPage,
    currentPage,
    pageChange,
    showModelEdit,
    showModelDelete
  } = props;
  const { t } = useTranslation();

  return (
    <>
      {
        mainTableApplicantApprover != "" &&
        <CCard className='table-panel'>
          <CRow id="table">
            <CCol lg="12">
              <CCol lg="12">
                <CRow alignHorizontal="end">
                  <div className="row-count-msg">{t('Total Rows').replace("%s", rowCount)}</div>
                </CRow>
              </CCol>
              <div className="table-responsive">
                <table className="table purchase-order-list" aria-label="simple table">
                  <thead id="thead-id">
                    <tr>
                      <th id="tblApplicant" style={{ textAlign: 'center', verticalAlign: "middle", backgroundColor: "#ebedef", color: "#3c4b64" }} colSpan={4} >
                        {t('Applicant')}
                      </th>
                      <th id="tblApprover" style={{ textAlign: 'center', verticalAlign: "middle", backgroundColor: "#ebedef", color: "#3c4b64" }} colSpan={7}>
                        {t('Approver')}
                      </th>
                    </tr>
                    <tr width="100%">
                      {/* Applicant */}
                      <th id="tblEmployeeID" className="basicSalaryList tableTh no-border-radius" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('Employee ID')}
                      </th>
                      <th id="tblName" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('Name')}
                      </th>
                      <th id="tblPosition" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('Position')}
                      </th>
                      <th id="tblDepartment" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('Department')}
                      </th>

                      {/* Approver */}
                      <th id="tblEmployeeID" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('Employee ID')}
                      </th>
                      <th id="tblName" width="" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('Name')}
                      </th>
                      <th id="tblPosition" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('Position')}
                      </th>
                      <th id="tblDepartment" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('Department')}
                      </th>
                      <th id="tblStatus" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('Status')}
                      </th>
                      <th id="tblEdit" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('Edit')}
                      </th>
                      <th id="tblRemove" className="basicSalaryList tableTh no-border-radius" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('Remove')}
                      </th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      mainTableApplicantApprover.map((i, index) => {
                        return (<Fragment key={index}>
                          {
                            i.approvers.map((approver, app) => {
                              return (<Fragment key={app}>
                                <tr width="100%">
                                  {app == 0 && <>
                                    <td className={mainTableApplicantApprover.length - 1 === index
                                            ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"} style={{ verticalAlign: "baseline", borderLeft: '3px solid #858BC3', textAlign: "right", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.approvers.length}>
                                      {i.applicant_id}
                                    </td>
                                    <td width="" className="td-emp-id" style={{ maxWidth: "250px", verticalAlign: "baseline", textAlign: "left", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.approvers.length}>
                                      {i.applicant_name}
                                    </td>

                                    <td className="td-pink" style={{ verticalAlign: "baseline", textAlign: "left", padding: "0px" }} rowSpan={i.approvers.length}>
                                      <table width="100%">
                                        <tbody>
                                          {
                                            i.applicant_position.map((applicant_position, temp) => {
                                              return (<Fragment key={temp}>
                                                <tr>
                                                  <td className="td-pink" style={{ maxWidth: "150px", verticalAlign: "baseline", textAlign: "left", border: "none" }} >
                                                    {applicant_position.position_name}
                                                  </td>
                                                </tr>
                                              </Fragment>)
                                            })
                                          }
                                        </tbody>
                                      </table>

                                    </td>
                                    <td className="" style={{ verticalAlign: "baseline", textAlign: "left", padding: "0px", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.approvers.length}>
                                      <table width="100%">
                                        <tbody>
                                          {
                                            i.applicant_department.map((applicant_department, idx) => {
                                              return (<Fragment key={idx}>
                                                <tr>
                                                  <td className="" style={{ maxWidth: "150px", verticalAlign: "baseline", textAlign: "left", border: "none", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                    {applicant_department.department_name}
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
                                  {<>
                                    <td width="" className="" style={{ textAlign: "right", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                      {approver.approver_id}
                                    </td>
                                    <td width="" className="td-overtime-title" style={{ maxWidth: "250px", textAlign: "left" }}>
                                      {approver.approver_name}
                                    </td>
                                  </>
                                  }
                                  <td className="" style={{ textAlign: "left", padding: "0px", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                    <table width="100%">
                                      <tbody>
                                        {
                                          approver.approver_position.map((approver_position, temp) => {
                                            return (<Fragment key={temp}>
                                              <tr>
                                                <td className="" style={{ maxWidth: "150px", textAlign: "left", border: "none", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                  {approver_position.position_name}
                                                </td>
                                              </tr>
                                            </Fragment>)
                                          })
                                        }
                                      </tbody>
                                    </table>

                                  </td>
                                  <td className="" style={{ textAlign: "left", padding: "0px", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                    <table width="100%">
                                      <tbody>
                                        {
                                          approver.approver_department.map((approver_department, idx) => {
                                            return (<Fragment key={idx}>
                                              <tr>
                                                <td className="" style={{ maxWidth: "150px", textAlign: "left", border: "none", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} >
                                                  {approver_department.department_name}
                                                </td>
                                              </tr>
                                            </Fragment>)
                                          })
                                        }
                                      </tbody>
                                    </table>

                                  </td>
                                  <td width="" className="" style={{ textAlign: "left", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                    {approver.status == 1 ? "Approver" : "Acknowledged By"}
                                  </td>
                                  {app == 0 && <>
                                    <td style={{ verticalAlign: "baseline", textAlign: "center", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} width="" id="tblEdit" rowSpan={i.approvers.length}>
                                      {
                                        <input
                                          id="btnEdit"
                                          type="image"
                                          src={"avatars/edit.png"}
                                          className="icon-clt"
                                          alt="edit"
                                          onClick={showModelEdit.bind(this, i)}
                                        />
                                      }
                                    </td>
                                  </>
                                  }
                                  <td style={{ verticalAlign: "baseline", textAlign: "center", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} width="" id="tblDelete">
                                    <input
                                      id="btnDelete"
                                      type="image"
                                      src={"avatars/remove.png"}
                                      className="icon-clt"
                                      alt="delete"
                                      onClick={showModelDelete.bind(this, { "applicant_id": i.applicant_id, "approverLength": i.approvers.length, "approver": approver })}
                                    />
                                  </td>

                                </tr>
                              </Fragment>)
                            })
                          }
                        </Fragment>)
                      })
                    }
                  </tbody>
                </table>
                {
                  mainTableApplicantApprover != "" && totalPage > 1 &&
                  <CPagination
                    dots={false}
                    arrows={false}
                    align="center"
                    firstButton="First page"
                    lastButton="Last page"
                    activePage={currentPage}
                    pages={totalPage}
                    onActivePageChange={(i) => pageChange(i)}
                  />
                }
              </div>
            </CCol>
          </CRow><br />
        </CCard>
      }
    </>
  )
}

export default ApproverListTable

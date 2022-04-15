import { CCard, CCol, CImg, CRow, } from '@coreui/react';
import React, { useEffect, Fragment } from 'react'
import { useTranslation } from 'react-i18next';
/**
 * EmployeeDeductionTable
 * 
 * @author  v_hao
 * @create_date  2021-05-31
 */
const EmployeeDeductionTable = props => {
  let {
    rowCount,
    mainTable,
    calMethod,
    removeRow
  } = props;

  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {calMethod == true && mainTable != "" &&
      <CCard className='table-panel ratelist' style={{ marginTop: "25px" }} >
        <CRow id="table">
          <CCol lg="12">
            <CCol lg="12">
              <CRow alignHorizontal="end">
                <div id="lbTotalRows" className="row-count-msg">{rowCount}</div>
              </CRow>
            </CCol>
            <div className="table-responsive">
              <table className="table purchase-order-list" aria-label="simple table">
                <thead id="thead-id">
                  {
                    <tr width="100%">
                      <th id="tblNo" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                        {t('No')}
                      </th>
                      <th id="tblEmployeeID" className="basicSalaryList tableTh" style={{ textAlign: 'rigth', verticalAlign: "middle" }} rowSpan="2">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                          {t('Employee ID')}
                        </div>
                      </th>
                      <th id="tblEmployeeCode" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                          {t('Employee Code')}
                        </div>
                      </th>
                      <th id="tblEmployeeName" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                          {t('Employee Name')}
                        </div>
                      </th>
                      <th id="tblDepartment" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" style={{ cursor: "pointer" }} className="basicSalaryList imgList" />
                          {t('Department')}
                        </div>
                      </th>
                      <th id="tblJoinedDate" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                          {t('Joined Date')}
                        </div>
                      </th>
                      <th id="tblRemove" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" style={{ cursor: "pointer" }} className="basicSalaryList imgList" />
                          {t('Remove')}
                        </div>
                      </th>
                    </tr>
                  }
                </thead>
                <tbody >
                  {
                    mainTable.map((i, index) => {
                      return (<Fragment key={index}>
                        <>
                          {i.departments.map((sec, idx) => {
                            return (<Fragment key={idx}>
                              <tr key={index} width="100%">
                                {idx == 0 && <>
                                  <td width="" className={mainTable.length - 1 === index
                                    ? "td-num td-no text-right border-bottom-left-radius" : "td-num td-no text-right"} style={{ textAlign: "right" }} rowSpan={i.departments.length}>
                                    {index + 1}
                                  </td>
                                  <td width="" className="td-emp-id" style={{ textAlign: "right" }} rowSpan={i.departments.length}>
                                    {i.employee_id}
                                  </td>
                                  <td width="" className="td-emp-code" style={{ textAlign: "left" }} rowSpan={i.departments.length}>
                                    {i.employee_code}
                                  </td>
                                  <td width="" className="td-emp-name td-green" style={{ textAlign: "left", maxWidth: "300px" }} rowSpan={i.departments.length}>
                                    {i.employee_name}
                                  </td>
                                </>
                                }
                                <td width="" className="td-dept td-pink no-border-radius" style={{ textAlign: "left" }}>
                                  {sec.department_name}
                                </td>

                                {idx == 0 && <>
                                  <td width="" className="td-joined-date" rowSpan={i.departments.length}>
                                    {i.joined_date.substring(0, 10)}
                                  </td>
                                  {
                                    <td width="" id="removeData" className={mainTable.length - 1 === index ? "border-bottom-right-radius" : "td-role-name"} rowSpan={i.departments.length}>
                                      <input
                                        type="image"
                                        id="lblRemove"
                                        src={'avatars/remove.png'}
                                        className="icon-clt"
                                        alt="remove"
                                        onClick={removeRow.bind(this, i)}
                                      />
                                    </td>
                                  }
                                </>
                                }
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
        </CRow><br />
      </CCard>
    }
  </>
  );
}

export default EmployeeDeductionTable;
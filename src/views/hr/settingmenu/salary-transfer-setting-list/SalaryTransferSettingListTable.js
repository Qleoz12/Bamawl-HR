/* eslint-disable no-use-before-define */
import { CCard, CCol, CImg, CPagination, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';

const SalaryTransferSettingListTable = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {
      !isEmpty(props.mainTable) &&
      <CCard className='table-panel' style={{ backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
        <CRow id="table">
          <CCol lg="12">
            <CCol lg="12">
              <CRow alignHorizontal="end">
                <div className="row-count-msg">{props.rowCount}</div>
              </CRow>
            </CCol>
            <div className="table-responsive">
              <table className="table purchase-order-list" aria-label="simple table">
                <thead id="thead-id">
                  {
                    props.mainTable !== "" &&
                    <tr width="100%">
                      <th width="20" className="basicSalaryList tableTh">
                        <input type="checkbox"
                          value="all-check"
                          checked={props.AllCheck === true}
                          onChange={props.change_checkbox} />
                      </th>
                      <th width="" className="basicSalaryList tableTh">
                        <CImg className="mr-2 title-Icon" src="avatars/titleicon.png" alt="include-salary" />
                        {t('No')}
                      </th>
                      <th width="" className="basicSalaryList tableTh" >
                        <CImg className="mr-2 title-Icon" src="avatars/titleicon.png" alt="include-salary" />
                        {t('Employee ID')}
                      </th>
                      <th width="" className="basicSalaryList tableTh" >
                        <CImg className="mr-2 title-Icon" src="avatars/titleicon.png" alt="include-salary" />
                        {t('Employee Code')}
                      </th>
                      <th width="" className="basicSalaryList tableTh" >
                        <CImg className="mr-2 title-Icon" src="avatars/titleicon.png" alt="include-salary" />
                        {t('Employee Name')}
                      </th>
                      <th width="" className="basicSalaryList tableTh" >
                        <CImg className="mr-2 title-Icon" src="avatars/titleicon.png" alt="include-salary" />
                        {t('Department')}
                      </th>
                      <th width="" className="basicSalaryList tableTh" >
                        <CImg className="mr-2 title-Icon" src="avatars/titleicon.png" alt="include-salary" />
                        {t('Position')}
                      </th>
                      {
                        props.mainTable[0].transfer_info && props.mainTable[0].transfer_info != "" &&
                        props.mainTable[0].transfer_info.map((index, it) => {
                          return (<Fragment key={it}>
                            <th width="" className="basicSalaryList tableTh" style={{ textAlign: "center", display: "revert" }} >
                              <div style={{ display: "flex" }}>
                                <div style={{ margin: "auto 0" }}><CImg className="mr-2 title-Icon" src="avatars/titleicon.png" alt="include-salary" /></div>
                                <div><span>{index.bank_name}</span><br />
                                  <span>{index.priority_name}</span></div>
                              </div>
                            </th>
                          </Fragment>)
                        })
                      }
                      <th width="" className="basicSalaryList tableTh">
                        <CImg className="mr-2 title-Icon" src="avatars/titleicon.png" alt="include-salary" />
                        {t('Edit')}
                      </th>
                    </tr>
                  }
                </thead>
                <tbody >
                  {
                    props.mainTable && props.mainTable !== "" &&
                    props.mainTable.map((i, index) => {
                      return (
                        <Fragment key={index}>
                          {i.departments && i.departments.map((sec, idx) => {
                            return (<Fragment key={idx}>
                              <tr width="100%">
                                {idx == 0 &&
                                  <>
                                    <td className={props.mainTable.length - 1 === index ? "td-num border-bottom-left-radius" : "td-num"} style={{ borderLeft: '3px solid #858BC3', textAlign: "center" }} rowSpan={i.departments.length}>
                                      <input type="checkbox"
                                        value={i.employee_id}
                                        id={i.id}
                                        checked={i.is_checked === true}
                                        onChange={props.change_checkbox}
                                      />
                                    </td>
                                    <td className="td-num textAlignRight" rowSpan={i.departments.length}>
                                      {(props.currentPage - 1) * props.perPage + index + 1}
                                    </td>
                                    <td width="" className="td-emp-id textAlignRight" rowSpan={i.departments.length}>
                                      {i.employee_id}
                                    </td>
                                    <td width="" className="td-emp-code" style={{ textAlign: "left" }} rowSpan={i.departments.length}>
                                      {i.employee_code}
                                    </td>
                                    <td width="" className="td-emp-name textAlignLeft" rowSpan={i.departments.length}>
                                      {i.employee_name}
                                    </td>
                                  </>
                                }
                                <td width="" className="textAlignLeft no-border-radius">
                                  {sec.department_name}
                                </td>
                                {idx == 0 && <>
                                  <td width="" className="td-overtime-title textAlignLeft" rowSpan={i.departments.length}>
                                    {i.positions[0].position_name}
                                  </td>
                                  {
                                    props.paymentTable && props.paymentTable != "" &&
                                    i.transfer_info.map((index, ix) => {
                                      return (<Fragment key={ix}>
                                        <td width="" className="textAlignRight" rowSpan={i.departments.length}>
                                          {index.amount}
                                        </td>
                                      </Fragment>)
                                    })
                                  }
                                  <td width="" className={props.mainTable.length - 1 === index ? "border-bottom-right-radius" : ""} rowSpan={i.departments.length}>
                                    <input
                                      type="image"
                                      id="tblEdit"
                                      src={'avatars/edit.png'}
                                      className="icon-clt"
                                      alt="edit"
                                      onClick={props.editToggleAlert.bind(this, i)}
                                    />
                                  </td>
                                </>
                                }
                              </tr>
                            </Fragment>)
                          })
                          }
                        </Fragment>
                      )
                    })}


                </tbody>
              </table>
            </div>
          </CCol>
        </CRow>
        {props.mainTable != "" && props.totalPage > 1 &&
          <CRow alignHorizontal="center" className="mt-3">
            <CPagination
              activePage={props.currentPage}
              pages={props.totalPage}
              dots={false}
              arrows={false}
              align="center"
              firstButton="First page"
              lastButton="Last page"
              onActivePageChange={(i) => props.pagination(i)}
            ></CPagination>
          </CRow>
        }
      </CCard>
    }
  </>
  );
}
export default SalaryTransferSettingListTable;

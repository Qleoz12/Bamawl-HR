import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';
import AddAndCloseSalaryTransferSettingByGroup from './AddAndCloseSalaryTransferSettingByGroup';

const SalaryTransferSettingByGroupTable = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {!isEmpty(props.mainTable) &&
      props.mainTableSH === true &&
      <CCard className='table-panel' style={{ border: "1px solid #d8dbe0" }}>
        <CRow id="table">
          <CCol lg="12">
            <CCol lg="12">
              <CRow alignHorizontal="end">
                <div className="row-count-msg">{props.rowCount}</div>
              </CRow>
            </CCol>
            <div className="table-responsive">
              <table className="table" aria-label="simple table">
                <thead id="thead-id">
                  <tr width="100%">
                    <th width="20" className="" style={{ textAlign: 'center' }}>
                      <input type="checkbox"
                        value="all-check"
                        checked={props.AllCheck === true}
                        onChange={props.change_checkbox} />
                    </th>
                    <th width="200px" className="responsive-tableTh" style={{ textAlign: 'left' }} >
                      <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                      {t('Employee ID')}
                    </th>
                    <th width="200px" className="responsive-tableTh" style={{ textAlign: 'left' }} >
                      <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                      {t('Employee Code')}
                    </th>
                    <th width="200px" className="responsive-tableTh" style={{ textAlign: 'left' }} >
                      <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                      {t('Employee Name')}
                    </th>
                    <th width="500px" className="responsive-tableTh" style={{ textAlign: 'left' }} >
                      <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                      {t('Department')}
                    </th>
                    <th width="" className="responsive-tableTh" style={{ textAlign: 'left' }} >
                      <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                      {t('Position')}
                    </th>
                  </tr>

                </thead>
                <tbody >
                  {
                    props.mainTable.map((i, index) => {
                      return (<Fragment key={index}>
                        {(i.employee_has_dept_position).map((sec, idx) => {
                          return (
                            <tr key={idx} width="100%">
                              {idx === 0 &&
                                <>
                                  <td className={props.mainTable.length - 1 === index
                                    ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"}
                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                    rowSpan={i.employee_has_dept_position.length}
                                  >
                                    <input type="checkbox"
                                      value={i.employee_id}
                                      id={i.index}
                                      checked={i.is_checked === true}
                                      onChange={props.change_checkbox} />
                                  </td>
                                  <td
                                    width=""
                                    className="td-emp-id t-align-right"
                                    rowSpan={i.employee_has_dept_position.length}
                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                  >
                                    {i.employee_id}
                                  </td>
                                  <td
                                    width=""
                                    className="td-emp-code t-align-left"
                                    rowSpan={i.employee_has_dept_position.length}
                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                  >
                                    {i.emp_code}
                                  </td>
                                  <td
                                    width=""
                                    className="td-emp-name td-green t-align-left"
                                    rowSpan={i.employee_has_dept_position.length}
                                  >
                                    {i.emp_name}
                                  </td>
                                </>
                              }
                              <td
                                width=""
                                className="td-dept td-pink t-align-left no-border-radius"
                              >
                                {sec.departments.department_name}
                              </td>
                              <td
                                width=""
                                className="td-position t-align-left td-overtime-title text-nowrap"
                              >
                                {sec.positions.position_name}
                              </td>
                            </tr>
                          )
                        })}
                      </Fragment>);
                    })}
                </tbody>
              </table>
            </div>
          </CCol>
        </CRow><br />

        <CRow lg="12">
          <CCol style={{ textAlign: "center" }}>
            <AddAndCloseSalaryTransferSettingByGroup mainTable={props.mainTable} currencyList={props.currencyList} cancelData={props.cancelData} />
          </CCol>
        </CRow>
      </CCard>
    }
  </>
  );

}
export default SalaryTransferSettingByGroupTable;
import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const SalaryTransferSettingByGroupTableAdd = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {
      props.mainCurrency === true &&
      <CCard className='table-panel' style={{ border: "1px solid #d8dbe0" }}>
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
                      <th width="" className="responsive-tableTh" style={{ textAlign: 'left' }} >
                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                        {t('No')}
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
                      {props.editData && props.editData == "" &&
                        <th width="" className="responsive-tableTh" id="deleteData">
                          <CImg className="mr-2" src="avatars/titleicon.png" alt="titleicon" style={{ width: '6px', height: '11px', marginBottom: "2px" }} />
                          {t('Delete')}
                        </th>
                      }
                    </tr>
                  }
                </thead>
                <tbody >
                  {
                    props.mainTable && props.mainTable != "" &&
                    props.mainTable.map((i, index) => {
                      return (<Fragment key={index}>
                        {i.employee_has_dept_position.map((sec, idx) => {
                          return (
                            <tr key={idx} width="100%">
                              {idx == 0 &&
                                <>
                                  <td
                                    width=""
                                    className={props.mainTable.length - 1 === index
                                      ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"}
                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                    rowSpan={i.employee_has_dept_position.length}
                                  >
                                    {index + 1}
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
                                className={props.editData && props.editData == "" ? "td-position t-align-left td-overtime-title text-nowrap no-border-radius" : "td-position t-align-left td-overtime-title text-nowrap"}
                              >
                                {sec.positions.position_name}
                              </td>
                              {idx == 0 &&
                                <>
                                  {props.editData && props.editData == "" &&
                                    <td
                                      width=""
                                      id="removeData"
                                      className={props.mainTable.length - 1 === index
                                        ? "border-bottom-right-radius" : ""}
                                      rowSpan={i.employee_has_dept_position.length}
                                    >
                                      <CImg
                                        src={"avatars/remove.png"}
                                        className="icon-clt"
                                        alt="remove"
                                        onClick={props.removeRow.bind(this, i)}
                                      />
                                    </td>
                                  }
                                </>}
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
      </CCard>
    }
  </>
  );
}

export default SalaryTransferSettingByGroupTableAdd;
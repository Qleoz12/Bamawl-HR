import React ,{useEffect} from 'react';
import {CCol, CRow,CImg,CCard} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const BonusPayslipMailSentTable=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);
    let {
      listEmployee,
      deleteRow
    }=props
    return (<>
        {listEmployee != "" && (
              <div className="table-panel add-employee pt-4 pb-3 box box-white">
                <CRow id="table">
                  <CCol lg="12">
                    <div className="table-responsive">
                      <table
                        id='tbEmployeeList'
                        className="table purchase-order-list"
                        aria-label="simple table"
                      >
                        <thead id="thead-id">
                          <tr width="100%">
                            <th className='text-left text-nowrap' id='tblNo'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("No")}
                            </th>
                            <th className='text-left text-nowrap' id='tblEmployeeID'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Employee ID")}
                            </th>
                            <th className='text-left text-nowrap' id='tblEmployeeCode'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Employee Code")}
                            </th>
                            <th className='text-left text-nowrap' id='tblEmployeeName'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Employee Name")}
                            </th>
                            <th className='text-left text-nowrap'id='tblEmployeeEmail'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Employee Email")}
                            </th>
                            <th className='text-left text-nowrap' id='tblRemove'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Delete")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          { listEmployee.map((i, index) => {
                              return (
                                  <tr width="100%" key={index}>
                                      <td className="td-num text-right text-wrap"
                                        style={{
                                          borderLeft: "3px solid #858BC3",
                                        }} >
                                        {index+1}
                                      </td>
                                      <td className="td-num text-right text-wrap">
                                        {i.employee_id}
                                      </td>
                                      <td
                                        className="text-left text-wrap"
                                      >
                                        {i.code}
                                      </td>
                                      <td
                                        className="text-wrap text-left">
                                        {i.employee_name}
                                      </td>
                                      <td width="other" className="text-wrap text-left">
                                        {i.email}
                                      </td>
                                      <td >
                                        <input
                                          type="image"
                                          id={i.employee_id}
                                          src={"avatars/remove.png"}
                                          className="icon-clt"
                                          alt="remove"
                                          onClick={deleteRow.bind(this, i.employee_id)}
                                        />
                                      </td>
                                  </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </CCol>
                </CRow>
              </div>
            )}
    </>
    );
}
export default BonusPayslipMailSentTable;

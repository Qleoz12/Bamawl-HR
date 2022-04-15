import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const ExpenseDetailApproverTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CImg className="" src="avatars/list.png" alt="titleicon" style={{ width: '6px', height: '12px' }} />
        <label className="ml-3 mt-2">{t('Approver')} </label>
        <CCard className='table-panel' style={{ border: "1px solid #d8dbe0" }}>
            <CRow id="table">
                <CCol lg="12">
                    <CCol lg="12 mt-2">
                        <CRow alignHorizontal="end">
                            {/* <div className="row-count-msg">{props.rowCount}</div> */}
                        </CRow>
                    </CCol>
                    <div className="table-responsive">
                        <table className="table" aria-label="simple table">
                            <thead id="thead-id">
                                <tr width="100%">
                                    <th id="tblNo" width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('No')}
                                    </th>
                                    <th id="tblApproverId" width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Approver ID')}
                                    </th>
                                    <th id="tblApproverName" width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Approver Name')}
                                    </th>
                                    <th id="tblApproverStatus" width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Approver Status')}
                                    </th>
                                    <th id="tblDeniedReason" width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Denied Reason')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    props.approverTable.map((i, index) => {
                                        return (
                                            <tr width="100%" key={index} >
                                                <td
                                                    width=""
                                                    className="td-no t-align-right"
                                                >
                                                    {index + 1}
                                                </td>
                                                <td
                                                    width=""
                                                    className="td-emp-id t-align-right"
                                                >
                                                    {i.employee_id}
                                                </td>
                                                <td
                                                    width=""
                                                    className="td-emp-code t-align-left"
                                                >
                                                    {i.employee_name}
                                                </td>
                                                <td
                                                    width=""
                                                    className="t-align-left  col-color-blue"
                                                >
                                                    {(() => {
                                                        switch (parseInt(i.approve_flag)) {
                                                            case 1: return t("Pending");
                                                            case 2: return t("Confirmed");
                                                            case 3: return t("Rejected");
                                                        }
                                                    })()}
                                                </td>
                                                <td
                                                    width=""
                                                    className="td-emp-code t-align-left td-orange"
                                                >
                                                    {parseInt(i.approve_flag) === 3 ? props.mainTable.map((sec) => sec.denied_reason) : null}
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </CCol>
            </CRow>
        </CCard>

    </>
    );

}
export default ExpenseDetailApproverTable;
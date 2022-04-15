import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const CheckinCheckoutDetailInformationTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CCard className='table-panel' style = {{ border : "1px solid #d8dbe0" }} >
            <CRow id="table">
                <CCol className="" lg="12">
                    <div className="table-responsive">
                        <table className="table" aria-label="simple table">
                            <thead id="thead-id">
                                <tr width="100%">
                                    <th width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('No')}
                                    </th>
                                    <th width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Approver ID')}
                                    </th>
                                    <th width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Approver Name')}
                                    </th>
                                    <th width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Approver Status')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    props.approverTable.map((i, index) => {
                                        return (
                                            <tr width="100%" key={index}>
                                                <td
                                                    width=""
                                                    className="td-no t-align-right"
                                                >
                                                    {index + 1}
                                                </td>
                                                <td
                                                    width=""
                                                    className="td-emp-id td-green t-align-left"
                                                >
                                                    {i.employee_id}
                                                </td>
                                                <td
                                                    width=""
                                                    className="td-emp-code td-overtime-type t-align-left"
                                                >
                                                    {i.name_eng}
                                                </td>
                                                <td
                                                    width=""
                                                    className="t-align-left"
                                                >
                                                    {(() => {
                                                        switch (parseInt(i.approve_flag)) {
                                                            case 1: return t("Pending");
                                                            case 2: return t("Confirmed");
                                                            case 3: return t("Rejected");
                                                        }
                                                    })()}
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
export default CheckinCheckoutDetailInformationTable;
/* eslint-disable no-use-before-define */
import { CCard, CCol, CImg, CLabel, CRow, } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BusinessTripAdjustmentDetailApprover = props => {
    const { t } = useTranslation();

    useEffect(() => {
    });

    let {
        mainData,
        mainTable,
    } = props;

    let approveStatus = (approve_flag) => {
        switch (approve_flag) {
            case 1:
                return t("Pending");
            case 2:
                return t("Approved");
            default:
                return t("Denied");
        }
    }

    return (<>
        {
            <>
                <CRow lg="12" className="custom-autocomplete">
                    <CCol>
                        <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon" />
                        <CLabel id="lbApprover" className="label">{t('Approver')}</CLabel>
                    </CCol>
                </CRow>
                <CCard className="table-panel">
                    {
                        mainTable != "" &&
                            <CRow id="table">
                                <CCol lg="12">
                                    <div className="table-responsive">
                                        {
                                            mainTable && mainTable.length > 0 &&
                                            <table className="table">
                                                <thead id="thead-id">
                                                    <tr width="100%">
                                                        <th id="tblNo" width="" className="responsive-tableTh text-left">
                                                            <div >
                                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                                                                {t("No")}
                                                            </div>
                                                        </th>
                                                        <th id="tblApproverID" width="" className="responsive-tableTh text-left">
                                                            <div >
                                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                                                                {t("Approver ID")}
                                                            </div>
                                                        </th>
                                                        <th id="tblApproverName" width="" className="responsive-tableTh text-left">
                                                            <div >
                                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                                                                {t("Approver Name")}
                                                            </div>
                                                        </th>
                                                        <th id="tblEmail" width="" className="responsive-tableTh text-left">
                                                            <div >
                                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                                                                {t("Approver Status")}
                                                            </div>
                                                        </th>
                                                        <th id="tblDepartment" width="" className="responsive-tableTh text-left">
                                                            <div >
                                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                                                                {t("Denied Reason")}
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {mainTable.map((i, index) => {
                                                        return (
                                                            <tr width="100%" key={index}>
                                                                <td id="tblNo" width="" className="text-right checkIO-request-vertical-line">
                                                                    {index + 1}
                                                                </td>
                                                                <td id="tblApproverID" width="" className="text-right">
                                                                    {i.employee_id}
                                                                </td>
                                                                <td id="tblApproverName" width="" className="text-left">
                                                                    {i.emp_name}
                                                                </td>
                                                                <td id="tblApproverStatus" width="" className="text-left">
                                                                    {approveStatus(i.approve_flag)}
                                                                </td>
                                                                <td id="tblDeniedReason" width="" className="td-pink text-left">
                                                                    {i.approve_flag === 3 && mainData.denied_reason}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        }
                                    </div>
                                </CCol>
                            </CRow>
                    }
                </CCard>
            </>
        }
    </>
    );
}
export default BusinessTripAdjustmentDetailApprover;

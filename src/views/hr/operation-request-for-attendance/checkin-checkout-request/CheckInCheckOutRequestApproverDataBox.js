import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CheckInCheckOutRequestApproverDataBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {props.mainTable && props.mainTable.length > 0 && (
                <Fragment>
                    <CRow lg="12" className="checkIO-request-title-row">
                        <CImg
                            className="checkIO-request-title-img"
                            src="avatars/list.png" alt="list" />
                        <label
                            id="lbApproverData"
                            className="ml-3 mt-2">{t('Approver Data')}
                        </label>
                    </CRow>

                    <CCard className='card-bonus table-panel mt-2 checkIO-request-card-color'>
                        <CCard className="table-panel mt-5 ml-2 mr-2 checkIO-request-border-color">
                            <CRow id="table">
                                <CCol lg="12" className="mb-4 mt-4">
                                    <div className="row-count-msg" style={{ float: "right" }}>{t('Total Rows').replace('%s',props.rowCountApproverData)}</div>
                                    <div className="table-responsive">
                                        <table className="table mb-4">
                                            <thead id="thead-id">
                                                <tr width="100%">
                                                    <th id="tblEmployeeID" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 checkIO-request-title-icon-img-col-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Employee ID")}
                                                    </th>
                                                    <th id="tblApproverID" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 checkIO-request-title-icon-img-col-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Approver ID")}
                                                    </th>
                                                    <th id="tblApproverName" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 checkIO-request-title-icon-img-col-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Approver Name")}
                                                    </th>
                                                    <th id="tblEmail" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 checkIO-request-title-icon-img-col-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Email")}
                                                    </th>
                                                    <th id="tblDepartment" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 checkIO-request-title-icon-img-col-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Department")}
                                                    </th>
                                                    <th id="tblPosition" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 checkIO-request-title-icon-img-col-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Position")}
                                                    </th>
                                                    <th id="tblDelete" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 checkIO-request-title-icon-img-col-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Delete")}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.mainTable.map((i, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <tr width="100%" key={index}>
                                                                <td id="tblEmployeeID" width=""
                                                                    className={props.mainTable.length - 1 === index
                                                                        ? "text-right text-nowrap border-bottom-left-radius"
                                                                        : "text-right text-nowrap"}
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                >
                                                                    {props.empId}
                                                                </td>
                                                                <td id="tblApproverID" width="" className="text-right td-green text-nowrap"
                                                                   >
                                                                    {i.approver_id}
                                                                </td>
                                                                <td id="tblApproverName" width="" className="text-left text-nowrap"
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                >
                                                                    {i.approver_name}
                                                                </td>
                                                                <td id="tblEmployeeEmail" width="" className="text-left text-nowrap"
                                                                    style={{background: "#d6f7df"}}
                                                                >
                                                                    {i.email}
                                                                </td>

                                                                <td id="tblDepartment" width="" className="text-left no-border-radius text-nowrap">
                                                                    {i.department}
                                                                </td>
                                                                <td id="tblPosition" width="" className="text-left no-border-radius text-nowrap">
                                                                    {i.position}
                                                                </td>

                                                                <td id="tblDelete" width=""
                                                                    className={props.mainTable.length - 1 === index
                                                                        ? "text-center align-self-center border-bottom-right-radius"
                                                                        : "text-center align-self-center"}
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                >
                                                                    <input
                                                                        type="image"
                                                                        src={"avatars/remove.png"}
                                                                        className="icon-clt checkIO-request-delete-img"
                                                                        alt="delete"
                                                                        disabled={props.loading}
                                                                        onClick={props.deleteApprover.bind(this, i)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </Fragment>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </CCol>
                            </CRow>
                        </CCard>
                    </CCard>
                </Fragment>
            )}
        </>
    )
}
export default CheckInCheckOutRequestApproverDataBox;
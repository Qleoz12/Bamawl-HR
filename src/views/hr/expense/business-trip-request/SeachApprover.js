/* eslint-disable no-use-before-define */
import { CButton, CCard, CCol, CImg,CRow, CSelect } from '@coreui/react';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
const SeachApprover = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });
    let {
        positionRank,
        approverState,
        approverChange,
        approverData,
        searchApproverAPI,
        mainTable,
        deleteApprover,
        approverSetting,
        employeeID
    } = props;
    return (<>
        {positionRank==false&&
            <>
                <CRow lg="12" className="custom-autocomplete">
                    <CCol>
                        <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon" />
                        <label id="lbApprover">{t('Approver')}</label>
                    </CCol>
                </CRow>
                <CCard className="cards table-panel-businesstrip">
                    {
                        [1,4,5].includes(approverSetting)&&
                        <CRow className="align-items-end m-3">
                        <CCol lg="4">
                        <label name="lbApprover" className={positionRank==false?'required':''} style={{ marginLeft:"0px" }}>{t('Approver')}</label>
                        <div>
                            <CSelect
                                className="mr-xl-5 bamawl-select"
                                id="dropExpenseDepartment"
                                value={approverState}
                                onChange={approverChange}
                                custom
                            >
                                    <option key="" value="">---{t('Select Approvers')}---</option>
                                    {approverData?.position && approverData?.position.map((item, index) => {
                                            return (
                                                <option key={index} value={"pos" + item.id} position={item.id}>
                                                    {item.position_name}
                                                </option>
                                            )
                                        })}
                                        {approverData?.department && approverData?.department.map((item, index) => {
                                            return (
                                                <option key={index} value={"dep" + item.id} department={item.id}>
                                                    {item.department_name}
                                                </option>
                                            )
                                        })}
                            </CSelect>
                            </div>
                        </CCol>
                        <CCol lg="1" className="mt-1">
                            <CButton
                                id="btnSearch"
                                className="form-btn mb-0"
                                onClick={searchApproverAPI}
                            >
                                {t('Search')}
                            </CButton>
                        </CCol>

                    </CRow>
                    }
                    {
                        mainTable.length>0&&
                        <CCard className='card-bonus table-panel mt-2 checkIO-request-card-color table-panel-businesstrip-white'>
                            <CRow alignHorizontal="end">
                                {mainTable.length > 0 && (
                                    <div className="row-count-msg" id="lblTotalRows">{t('Total Rows').replace('%s',mainTable.length)}</div>
                                )}
                            </CRow>
                            <CRow id="table">
                                <CCol lg="12">
                                    <div className="table-responsive">
                                        {mainTable && mainTable.length > 0 && (
                                            <table className="table">
                                                <thead id="thead-id">
                                                    <tr width="100%">
                                                        <th id="tblNo" width="" className="responsive-tableTh">
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
                                                    {mainTable.map((i, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                        <tr width="100%" >
                                                                        <td id="tblNo" width="" className={mainTable.length-1 === index ? "border-bottom-left-radius text-right" :"text-right"}
                                                                            style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                            >
                                                                            {employeeID}
                                                                        </td>
                                                                        <td id="tblApproverID" width="" className="text-right td-green"
                                                                            style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                            >
                                                                            {i.approver_id}
                                                                        </td>
                                                                        <td id="tblApproverName" width="" className="text-left"
                                                                            style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                            >
                                                                            {i.approver_name}
                                                                        </td>
                                                                        <td id="tblEmployeeEmail" width="" className="text-left td-blue"
                                                                            style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                            >
                                                                            {i.email}
                                                                        </td>
                                                                        <td id="tblDepartment" width="" className="text-left no-border-radius">
                                                                            {i.department}
                                                                        </td>
                                                                        <td id="tblPosition" width="" className="text-left no-border-radius">
                                                                            {i.position}
                                                                        </td>
                                                                        <td id="tblDelete" width="" className= {mainTable.length-1 === index ? "border-bottom-right-radius td-include-tax text-center align-self-center " : "td-include-tax text-center align-self-center" }
                                                                            style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                            >
                                                                            <input
                                                                                style={{width:"20px"}}
                                                                                type="image"
                                                                                src={"avatars/remove.png"}
                                                                                alt="delete"
                                                                                onClick={deleteApprover.bind(this, i)}
                                                                            />
                                                                        </td>
                                                                        </tr>
                                                            </Fragment>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </CCol>
                            </CRow>
                        </CCard>
                    }
                </CCard>
            </>
        }
    </>
    );
}
export default SeachApprover;

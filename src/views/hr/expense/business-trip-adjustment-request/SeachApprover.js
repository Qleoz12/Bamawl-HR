/* eslint-disable no-use-before-define */
import { CButton, CCard, CCol, CImg, CLabel, CRow, CSelect, } from '@coreui/react';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const SeachApprover = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        approverState,
        approverChange,
        approverData,
        searchApproverAPI,
        deleteApprover,
        mainTable,
        approverSetting,
        positionRank
    } = props;

    return (<>
        {
            <>
                {positionRank==false&&
                    <>
                        <CRow lg="12">
                            <CCol className="mb-3" lg="5" >
                                <CImg
                                    className="mr-2 checkIO-request-title-icon-img-col-table"
                                    src="/avatars/list.png"
                                    alt="titleicon"
                                />
                                <CLabel id="lblApprover" style={{ fontWeight: "bold" }}>
                                    {t("Approver")}<span className={positionRank==false?'required':''}></span>
                                </CLabel>
                            </CCol>
                        </CRow>
                        <CRow lg="12">
                            <CCol className="">
                                <CCard className="expense-request-card-detail" style={{ backgroundColor: "#fafbfc" }}>
                                    <CRow lg="12" className="move_from_bottom">
                                        <CCol className="pl-lg-5 expense-request-approver-search-item" lg="5" xs="6">
                                            <CSelect id="dropApprover" className="bamawl-select"
                                                value={approverState} onChange={approverChange} custom>
                                                <option key="" value="">{t('---Select Approvers---')}</option>
                                                {approverData && approverData.position && approverData.position.map((item, index) => {
                                                    return (
                                                        <option key={index} value={"pos" + item.id} position={item.id}>
                                                            {item.position_name}
                                                        </option>
                                                    )
                                                })}
                                                {approverData && approverData.department && approverData.department.map((item, index) => {
                                                    return (
                                                        <option key={index} value={"dep" + item.id} department={item.id}>
                                                            {item.department_name}
                                                        </option>
                                                    )
                                                })}
                                            </CSelect>
                                        </CCol>
                                        <CCol lg="2" xs="5" >
                                            <CButton id="btnSearchApprover" className="form-btn mr-5" onClick={searchApproverAPI} >{t('Search')}</CButton>
                                        </CCol>
                                    </CRow>
                                </CCard>
                            </CCol>
                        </CRow>
                    </>
                }
                {mainTable && mainTable.length > 0 && 
                    <CRow lg="12">
                        <CCol className="">
                            <CCard className="expense-request-card-detail">
                                <CRow id="table" className="mt-3">
                                    <CCol lg="12">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead id="thead-id">
                                                    <tr width="100%">
                                                        <th id="tblNo" width="" className="responsive-tableTh">
                                                            <CImg
                                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                src="/avatars/titleicon.png"
                                                                alt="titleicon"
                                                            />
                                                            {t("No")}
                                                        </th>
                                                        <th id="tblApproverID" width="" className="responsive-tableTh">
                                                            <CImg
                                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                src="/avatars/titleicon.png"
                                                                alt="titleicon"
                                                            />
                                                            {t("Approver ID")}
                                                        </th>
                                                        <th id="tblApproverName" width="" className="responsive-tableTh">
                                                            <CImg
                                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                src="/avatars/titleicon.png"
                                                                alt="titleicon"
                                                            />
                                                            {t("Approver Name")}
                                                        </th>
                                                        <th id="tblEmail" width="" className="responsive-tableTh">
                                                            <CImg
                                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                src="/avatars/titleicon.png"
                                                                alt="titleicon"
                                                            />
                                                            {t("Email")}
                                                        </th>
                                                        <th id="tblDepartment" width="" className="responsive-tableTh">
                                                            <CImg
                                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                src="/avatars/titleicon.png"
                                                                alt="titleicon"
                                                            />
                                                            {t("Department")}
                                                        </th>
                                                        <th id="tblPosition" width="" className="responsive-tableTh">
                                                            <CImg
                                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                src="/avatars/titleicon.png"
                                                                alt="titleicon"
                                                            />
                                                            {t("Position")}
                                                        </th>
                                                        <th id="tblDelete" width="" className="responsive-tableTh">
                                                            <CImg
                                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                src="/avatars/titleicon.png"
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
                                                                {i.employee_has_dept_position.map((sec, idx) => {
                                                                    return (
                                                                        <tr width="100%" key={idx}>
                                                                            {idx === 0 && <>
                                                                                <td id="tblNo" width="" className={mainTable.length - 1 === index
                                                                                    ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"}
                                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                    rowSpan={i.employee_has_dept_position.length}>
                                                                                    {index + 1}
                                                                                </td>
                                                                                <td id="tblApproverID" width="" className="text-right"
                                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                    rowSpan={i.employee_has_dept_position.length}>
                                                                                    {i.employee_id}
                                                                                </td>
                                                                                <td id="tblApproverName" width="" className="text-left"
                                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                    rowSpan={i.employee_has_dept_position.length}>
                                                                                    {i.employee_name}
                                                                                </td>
                                                                                <td id="tblEmployeeEmail" width="" className="text-left col-color-blue"
                                                                                    rowSpan={i.employee_has_dept_position.length}>
                                                                                    {i.email}
                                                                                </td>
                                                                            </>
                                                                            }
                                                                            <td id="tblDepartment" width="" className="td-pink text-left no-border-radius">
                                                                                {i.employee_has_dept_position[idx].departments.department_name}
                                                                            </td>
                                                                            <td id="tblPosition" width="" className="td-orange text-left no-border-radius">
                                                                                {i.employee_has_dept_position[idx].positions.position_name}
                                                                            </td>
                                                                            {idx === 0 && <>
                                                                                <td id="tblDelete" width="" className={mainTable.length - 1 === index ? "border-bottom-right-radius" : "td-include-tax text-center align-self-center"}
                                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                    rowSpan={i.employee_has_dept_position.length}>
                                                                                    <input
                                                                                        style={{ width: "20px" }}
                                                                                        type="image"
                                                                                        src={"avatars/remove.png"}
                                                                                        alt="delete"
                                                                                        onClick={deleteApprover.bind(this, i)}
                                                                                    />
                                                                                </td>
                                                                            </>}
                                                                        </tr>
                                                                    )
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
                            </CCard>
                        </CCol>
                    </CRow>
                }
            </>
        }
    </>
    );
}
export default SeachApprover;

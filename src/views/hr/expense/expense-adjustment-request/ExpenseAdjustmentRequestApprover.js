import { CButton, CCard, CCol, CImg, CLabel, CRow ,CSelect} from "@coreui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ExpenseAdjustmentRequestApprover = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
        { props.showSearch ==true && props.checkPosition==false &&(<>
            <CRow lg="12">
                <CCol className="mb-3" lg="5" >
                    <CImg
                        className="mr-2 checkIO-request-title-icon-img-col-table"
                        src="/avatars/list.png"
                        alt="titleicon"
                    />
                    <CLabel id="lblApprover">
                        {t("Approver")}
                    </CLabel>
                </CCol>
            </CRow>
            <CRow lg="12">
                <CCol>
                    <CCard className="card">
                        <CRow>
                            <CCol>
                                <label className="required">{t("Approver")}</label>
                            </CCol>
                        </CRow>
                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="mb-4" lg="5" xs="7">
                                <div className="d-flex">
                                    <CSelect className="bamawl-select"  value={props.approverState} onChange={props.approverChange} custom  id="dropApprover">
                                        <option key="" value="">---{t("Select Approvers")}---</option>
                                        {props.approverData.position && props.approverData.position.map((item, index) => {
                                            return (
                                                <option key={index} value={"pos" + item.id} position={item.id}>
                                                    {item.position_name}
                                                </option>
                                            )
                                        })}
                                        {props.approverData.department && props.approverData.department.map((item, index) => {
                                            return (
                                                <option key={index} value={"dep" + item.id} department={item.id}>
                                                    {item.department_name}
                                                </option>
                                            )
                                        })}
                                    </CSelect>
                                </div>
                            </CCol>
                            <CCol lg="2" xs="5" >
                                <CButton id="btnSearch" className="form-btn mr-5" onClick={props.searchApproverAPI} >{t('Search')}</CButton>
                            </CCol>
                        </CRow>
                    </CCard>
                </CCol>
            </CRow>
            </>
        )}
        </>
    )

}
export default ExpenseAdjustmentRequestApprover;

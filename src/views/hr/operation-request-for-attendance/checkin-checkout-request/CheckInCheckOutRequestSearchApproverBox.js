import { CButton, CCol, CRow, CSelect } from "@coreui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const CheckInCheckOutRequestSearchApproverBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => {
    })

    return (
        <> {
            (props.approverSetting == 1 || props.approverSetting == 4 || props.approverSetting == 5) && props.rank == false && (
                <CRow lg="12" className="mb-5">
                    <CCol xl="4" lg="3"></CCol>
                    <CCol xl="4" lg="6">
                        <div className="mt-3">
                            <div>
                                <label id="lbApprover">{t('Approver')}
                                    {props.rank !== true && (
                                        <span className="checkIO-request-label-require">*</span>
                                    )}
                                </label>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <CSelect id="dropApprover" className="bamawl-select"
                                    value={props.approverState} onChange={props.approverChange} custom>
                                    <option key="" value="">{t('---Select Approvers---')}</option>
                                    {props.approverData && props.approverData.position && props.approverData.position.map((item, index) => {
                                        return (
                                            <option key={index} value={"pos" + item.id} position={item.id}>
                                                {item.position_name}
                                            </option>
                                        )
                                    })}  
                                    {props.approverData && props.approverData.department && props.approverData.department.map((item, index) => {
                                        return (
                                            <option key={index} value={"dep" + item.id} department={item.id}>
                                                {item.department_name}
                                            </option>
                                        )
                                    })}
                                </CSelect>
                                <CButton
                                    id="btnSearch"
                                    className="form-btn mb-0 ml-2"
                                    onClick={props.searchApproverAPI}
                                    disabled={props.loading}
                                >
                                    {t('Search')}
                                </CButton>
                            </div>
                        </div>
                    </CCol>
                    <CCol xl="4" lg="3" className=""></CCol>
                </CRow>
            )
        }
        </>
    )
}
export default CheckInCheckOutRequestSearchApproverBox;
import { CButton, CCard, CCardBody, CCol, CLabel, CModal, CModalBody, CModalHeader, CRow } from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Message from '../../../brycen-common/message/Message';

const ItemNameRegistrationModalExpenseRequestBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            <div>
                <CModal
                    size=""
                    centered
                    closeOnBackdrop={false}
                    className="addModal"
                    htmlFor="addBtn"
                    show={props.itemModal}
                >
                    <CModalHeader>
                        <h5>{t('Item Name Registration')}</h5>
                    </CModalHeader>
                    <CModalBody>
                        <Message success={[]} error={props.popupError} />
                        <CCard>
                            <CCardBody>
                                <CRow>
                                    <CCol lg="12" className="expense-request-text-field">
                                        <CLabel id="lbExpenseCategoryCardDetail" className="required">
                                            {t('Item Name')}
                                        </CLabel>
                                        <TextField
                                            id=""
                                            className=""
                                            fullWidth
                                            value={props.itemName}
                                            onChange={props.changeItemName}>
                                        </TextField>
                                    </CCol>
                                </CRow>
                                <CRow className="" lg="12" >
                                    <CCol style={{ textAlign: "center" }}>
                                        <CButton id="btnSave" className="form-btn mr-lg-3 m-1 mt-5" onClick={props.createItemAPI}>{t('Save')}</CButton>
                                        <CButton id="btnClose" className="form-btn ml-lg-3 m-1 mt-5" onClick={props.closeItemModal}>{t('Close')}</CButton>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CModalBody>
                </CModal>
            </div>
        </>
    )
}
export default ItemNameRegistrationModalExpenseRequestBox;
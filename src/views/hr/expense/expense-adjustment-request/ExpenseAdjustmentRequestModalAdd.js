import { CButton, CCard, CCardBody, CCol, CLabel, CModal, CModalBody, CModalHeader, CRow } from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ExpenseAdjustmentRequestModalAdd = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });
    let {
        itemModal,
        closeItemModal,
        popupError,
        addItem,
        saveItem,
        handleAddItemChange
    }=props
    return (
        <>
            <div className="modal-header-custom">
                <CModal
                    centered
                    closeOnBackdrop={false}
                    className="addModal"
                    htmlFor="addBtn"
                    show={itemModal}
                    onClose={closeItemModal}
                >
                    <CModalHeader>
                        <h5>{t('Item Name Registration')}</h5>
                    </CModalHeader>
                    <CModalBody>
                        {popupError && popupError.length > 0 &&
                            <CCard className="custom-card error p-2 mb-3" style={{backgroundColor:"#e55353"}}>
                                {
                                    popupError.map((data, index) => {
                                        return (
                                            <div key={index} className="msg pl-2">
                                                {data}
                                            </div>
                                        )
                                    })}
                            </CCard>
                        }
                        <CCardBody>
                            <CRow>
                                <CCol lg="12">
                                    <CLabel id="lblItemName" className="required">
                                        {t('Item Name')}
                                    </CLabel>
                                    <TextField id="txtItemName" className="expense-request-text-field" value={addItem} onChange={handleAddItemChange}></TextField>
                                </CCol>
                            </CRow>
                            <CRow className="text-center" lg="12" >
                                <CCol>
                                    <CButton id="btnSave" className="form-btn mt-5 mr-3" onClick={saveItem}>{t('Save')}</CButton>
                                    <CButton id="btnClose" className="form-btn mt-5" onClick={closeItemModal}>{t('Close')}</CButton>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CModalBody>
                </CModal>
            </div>
        </>
    )
}
export default ExpenseAdjustmentRequestModalAdd;

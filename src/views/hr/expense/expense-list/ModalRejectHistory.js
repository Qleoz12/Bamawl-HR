import { CButton, CCard, CCardBody, CCol, CImg, CModal, CModalBody, CModalHeader, CRow } from "@coreui/react";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ModalRejectHistory = (props) => {
    const { t } = useTranslation();
    useEffect(() => {
        props.rejectHistoryBox ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
    });

    return (
        <>
            {props.rejectHistoryBox === true && (
                <div>
                    <CModal
                        size="xl"
                        centered
                        closeOnBackdrop={false}
                        className="addModal"
                        htmlFor="addBtn"
                        show={props.rejectHistoryBox}
                        onClose={props.closeRejectHistoryModal}
                    >
                        <CModalHeader>
                            <h5>{t('Reject History')}</h5>
                        </CModalHeader>
                        <CModalBody>
                            {props.popupError && props.popupError.length > 0 &&
                                <CCard className="custom-card emp-list-card-border error p-2  mb-3">
                                    {
                                        props.popupError.map((data, index) => {
                                            return (
                                                <div key={index} className="msg pl-2">
                                                    {data}
                                                    <span>
                                                        {/* <CButton
                                                            className="btn btn-danger emp-list-remove-icon-popup"
                                                            onClick={props.removeMessagePopup}>X</CButton> */}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                </CCard>
                            }
                            <CCard>
                                <CCardBody>
                                    <CRow id="table" className="mt-3">
                                        <CCol lg="12">
                                            {/* <div className="row-count-msg" style={{ float: "right" }}>{props.rowCount}</div> */}
                                            <div className="table-responsive tableFixHead">
                                                <table className="table">
                                                    <thead id="thead-id">
                                                        <tr width="100%">
                                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                {t('Subject')}
                                                            </th>
                                                            <th width="" className="basicSalaryList tableTh textAlignCenter" colSpan={props.numCurrencies} scope="colgroup">
                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                {t('Actual Total')}
                                                            </th>
                                                            <th width="" className="basicSalaryList tableTh textAlignCenter" colSpan={props.numCurrencies} scope="colgroup">
                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                {t('Adjustment Amt')}
                                                            </th>
                                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                {t('Applied Date')}
                                                            </th>
                                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                {t('Due Date')}
                                                            </th>
                                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                {t('Reject Reason')}
                                                            </th>
                                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                {t('Detail')}
                                                            </th>
                                                        </tr>
                                                        <tr width="100%">
                                                            {
                                                                props.currencies && props.currencies !== "" &&
                                                                props.currencies.map((i, index) => {
                                                                    return (<Fragment key={index}>
                                                                        {
                                                                            <th className="basicSalaryList year-month no-border-radius">
                                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                                {i.currency_desc}
                                                                            </th>
                                                                        }
                                                                    </Fragment>)
                                                                })
                                                            }
                                                            {
                                                                props.currencies && props.currencies !== "" &&
                                                                props.currencies.map((i, index) => {
                                                                    return (<Fragment key={index}>
                                                                        {
                                                                            <th className="basicSalaryList year-month no-border-radius">
                                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                                {i.currency_desc}
                                                                            </th>
                                                                        }
                                                                    </Fragment>)
                                                                })
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            props.tableBzTripHistory && props.tableBzTripHistory !== "" &&
                                                            props.tableBzTripHistory.map((i, index) => {
                                                                return (<Fragment key={index}>
                                                                    <tr width="100%">
                                                                        <td width="" className="td-emp-id textAlignLeft td-blue td-no" >
                                                                            {i.subject}
                                                                        </td>
                                                                        {props.currencies && props.currencies.map((item, ix) => {
                                                                            return (
                                                                                <td key={ix} width="" className="textAlignRight td-blue" >
                                                                                    {i.actual_total && i.actual_total.map((val, k) => {
                                                                                        if (val.actual_currency_id === item.id) {
                                                                                            return (<Fragment key={k}>
                                                                                                {val.value}
                                                                                            </Fragment>)
                                                                                        }
                                                                                    })}

                                                                                </td>
                                                                            )
                                                                        })}
                                                                        {props.currencies && props.currencies.map((item, ix) => {
                                                                            return (
                                                                                <td key={ix} width="" className="textAlignRight td-blue" >
                                                                                    {i.adjustment_amt && i.adjustment_amt.map((val, k) => {
                                                                                        if (val.adjustment_currency_id === item.id) {
                                                                                            return (<Fragment key={k}>
                                                                                                {val.value}
                                                                                            </Fragment>)
                                                                                        }
                                                                                    })}

                                                                                </td>
                                                                            )
                                                                        })}
                                                                        <td width="" className="textAlignCenter td-blue" >
                                                                            {i.applied_date ? i.applied_date.substring(0, 10) : ""}
                                                                        </td>
                                                                        <td width="" className="textAlignCenter td-blue" style={{ whiteSpace: "nowrap" }} >
                                                                            {i.due_date ? i.due_date.substring(0, 10) : ""}
                                                                        </td>
                                                                        <td width="" className="textAlignLeft td-blue" >
                                                                            {i.denied_reason}
                                                                        </td>
                                                                        <td width="" className="td-blue">
                                                                            <input
                                                                                type="image"
                                                                                id="tblDetail"
                                                                                src={'avatars/detail-user.png'}
                                                                                className="icon-clt epm-list-img"
                                                                                alt="detail"
                                                                                onClick={props.getDetailsExpenseAdjusmentHistory.bind(this, i)}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </Fragment>)
                                                            })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CCol>
                                    </CRow>
                                    <CRow lg="12" className="mt-3">
                                        <CCol style={{ textAlign: "center" }}>
                                            <CButton
                                                className="form-btn ml-3"
                                                id='btnCloseModal'
                                                name='btnCloseModal'
                                                onClick={props.closeRejectHistoryModal}
                                            >{t('Close')}
                                            </CButton>
                                        </CCol>
                                    </CRow>

                                </CCardBody>
                            </CCard>

                        </CModalBody>
                    </CModal>
                </div>
            )}
        </>
    )
}
export default ModalRejectHistory;
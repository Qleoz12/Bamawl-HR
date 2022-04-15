/* eslint-disable no-use-before-define */
import { CButton, CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { isEmpty } from '../../../../common-validation/commonValidation';

const ExpenseDetailTotalAmountTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <h6 id="lblArrangeByAdmin" className="" style={{ color: "red" }}>{t('#Arrange By Admin')} : {t('You cannot get this amount because of admin or company arrange/buy for you.')}</h6>
        <h6 id="tbSelectCheckbox" className="mt-4">{t('(If you select the checkbox, you will get xx% extra addition or target items)')}</h6>
        <CCard className='table-panel mt-2 p-0'>
            <CRow id="table">
                <CCol lg="12">
                    {/* <CCol lg="12">
                                <CRow alignHorizontal="end">
                                    <div className="row-count-msg">{props.rowCount}</div>
                                </CRow>
                            </CCol> */}
                    <div className="table-responsive">
                        <table className="table purchase-order-list" aria-label="simple table">
                            <thead id="thead-id">
                                <tr width="100%">
                                    <th width="" className="basicSalaryList theadcheckbox" rowSpan="3" >
                                        <input type="checkbox"
                                            value="all-check"
                                            id="tbcheckbox"
                                            checked={props.allCheck === true}
                                            readOnly />
                                    </th>
                                    <th id="tblNo" width="" className="basicSalaryList tableTh" rowSpan="3">
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('No')}
                                    </th>
                                    <th id="tblItem" width="" className="basicSalaryList tableTh" rowSpan="3">
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('Item')}
                                    </th>
                                    <th id="tblExpenseCategory" width="" className="basicSalaryList tableTh" rowSpan="3">
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('Expense Category')}
                                    </th>
                                    <th id="tblAttachement" width="" className="basicSalaryList tableTh" rowSpan="3">
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('Attachment')}
                                    </th>
                                    <th id="tblBugetCost" width="" colSpan="7" scope="colgroup" className="basicSalaryList tableTh textAlignCenter">
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('Budget Cost')}
                                    </th>
                                    <th id="tblDescription" width="" className="basicSalaryList tableTh" rowSpan="3">
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('Description')}
                                    </th>
                                </tr>
                                <tr width="100%">
                                    <th id="tblUnitPrice" colSpan={props.numCurrencies} scope="colgroup" className="basicSalaryList year-month no-border-radius" >
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('Unit Price')}
                                    </th>
                                    <th id="tblQuality" colSpan={props.numCurrencies} scope="colgroup" className="basicSalaryList year-month" >
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('Qty')}
                                    </th>
                                    <th id="tblTotal" colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('Total')}
                                    </th>
                                    <th id="tblPriceCurrency" colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('Price Currency')}
                                    </th>
                                    <th id="tblFxRate" colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('FX Rate')}
                                    </th>
                                    <th id="tblAcceptCurrency" colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('Accept Currency')}
                                    </th>
                                    <th id="tblAmount" colSpan={props.numCurrencies} scope="colgroup" className="basicSalaryList year-month no-border-radius" >
                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                        {t('Amount')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.detail && props.detail.length > 0 &&
                                    props.detail.map((i, index) => {
                                        return (<Fragment key={index}>
                                            {i.attach_file.length > 0 &&
                                                i.attach_file.map((sec, idx) => {
                                                    return (
                                                        <tr width="100%" key={idx}>
                                                            {idx == 0 &&
                                                                <>
                                                                    <td className="td-num basicSalaryList tbodyCheckbox" rowSpan={i.attach_file.length}>
                                                                        <input type="checkbox"
                                                                            checked={i.additional_advance_item === 1}
                                                                            readOnly
                                                                        />
                                                                    </td>
                                                                    <td className="td-num textAlignRight" rowSpan={i.attach_file.length}>
                                                                        {index + 1}
                                                                    </td>
                                                                    <td width="" className="td-emp-id textAlignLeft basicSalaryList tableTh" rowSpan={i.attach_file.length}>
                                                                    {i.expense_item}<br/>{parseInt(i.arrange_by_admin) === 1 ? 'arrange_by_admin' : null}
                                                                    </td>
                                                                    <td width="" className="td-emp-id textAlignLeft col-color-blue" rowSpan={i.attach_file.length}>
                                                                        {i.expense_category}
                                                                    </td>
                                                                </>}

                                                            <td id="tblAttachfileTable" width="" className="text-nowrap col-color-pink text-left">
                                                                <CButton detail="true" onClick={props.downloadFile.bind(this, sec, sec.name)} style={{ color: "black" }}>
                                                                    <i className="fa fa-file icon-btn pr-1" style={{ color: "#01a3f8" }}></i>{sec.name}
                                                                </CButton>
                                                            </td>
                                                            {idx == 0 &&
                                                                <>
                                                                    <td width="" className="t-align-right col-color-pink" rowSpan={i.attach_file.length} >
                                                                        {parseFloat(i.unit_price)}
                                                                    </td>
                                                                    <td width="" className="textAlignRight col-color-pink" rowSpan={i.attach_file.length}>
                                                                        {parseFloat(i.qty)}
                                                                    </td>
                                                                    <td width="" className="textAlignRight col-color-pink" rowSpan={i.attach_file.length}>
                                                                        {i.unit_price * i.qty}
                                                                    </td>
                                                                    <td width="" className="textAlignLeft col-color-pink" rowSpan={i.attach_file.length}>
                                                                        {props.currency.map((sec, idx) => {
                                                                            return (<Fragment key={idx}>
                                                                                {parseInt(sec.id) === parseInt(i.currency_id) ? sec.currency_desc : null}
                                                                            </Fragment>
                                                                            )
                                                                        })}
                                                                    </td>
                                                                    <td width="" className="textAlignRight col-color-pink" rowSpan={i.attach_file.length}>
                                                                        {parseFloat(i.fx_rate)}
                                                                    </td>

                                                                    <td width="" className="textAlignLeft col-color-pink" rowSpan={i.attach_file.length}>
                                                                        {props.currency.map((sec, idx) => {
                                                                            return (<Fragment key={idx}>
                                                                                {parseInt(sec.id) === parseInt(i.accept_currency_id) ? sec.currency_desc : null}
                                                                            </Fragment>
                                                                            )
                                                                        })}
                                                                    </td>
                                                                    <td width="" className="textAlignRight col-color-pink" rowSpan={i.attach_file.length}>
                                                                        {parseFloat(i.cost)}
                                                                    </td>
                                                                    <td width="" className="textAlignLeft" rowSpan={i.attach_file.length}>
                                                                        {i.description}
                                                                    </td>
                                                                </>
                                                            }

                                                        </tr>
                                                    )
                                                })}
                                            {i.attach_file.length == 0 && (
                                                <tr width="100%">
                                                    <td className="td-num basicSalaryList tbodyCheckbox" >
                                                        <input type="checkbox"
                                                            checked={i.additional_advance_item === 1}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td className="td-num textAlignRight">
                                                        {index + 1}
                                                    </td>
                                                    <td width="" className="td-emp-id textAlignLeft basicSalaryList tableTh">
                                                        {i.expense_item}<br/>
                                                        {parseInt(i.arrange_by_admin) === 1 ? '(arrange by admin)' : null}
                                                    </td>
                                                    <td width="" className="td-emp-id textAlignLeft col-color-blue">

                                                        {i.expense_category}
                                                    </td>
                                                    <td id="tblAttachfileTable" width="" className="text-nowrap">
                                                    </td>
                                                    <td width="" className="td-emp-code t-align-right col-color-pink">
                                                        {parseFloat(i.unit_price)}
                                                    </td>
                                                    <td width="" className="textAlignRight col-color-pink">
                                                        {parseFloat(i.qty)}
                                                    </td>
                                                    <td width="" className="textAlignRight col-color-pink">
                                                        {isNaN(i.unit_price * i.qty) ? "_" : i.unit_price * i.qty}
                                                    </td>
                                                    <td width="" className="textAlignLeft col-color-pink">
                                                        {props.currency.map((sec, idx) => {
                                                            return (<Fragment key={idx}>
                                                                {parseInt(sec.id) === parseInt(i.currency_id) ? sec.currency_desc : null}
                                                            </Fragment>
                                                            )
                                                        })}
                                                    </td>
                                                    <td width="" className="textAlignRight col-color-pink">
                                                        {parseFloat(i.fx_rate)}
                                                    </td>

                                                    <td width="" className="textAlignLeft col-color-pink">
                                                        {props.currency.map((sec, idx) => {
                                                            return (<Fragment key={idx}>
                                                                {parseInt(sec.id) === parseInt(i.accept_currency_id) ? sec.currency_desc : null}
                                                            </Fragment>
                                                            )
                                                        })}
                                                    </td>
                                                    <td width="" className="textAlignRight col-color-pink">
                                                        {parseFloat(i.cost)}
                                                    </td>
                                                    <td width="" className="textAlignLeft" >
                                                        {i.description}
                                                    </td>
                                                </tr>
                                            )
                                            }
                                        </Fragment>)
                                    })}
                                <tr width="100%">
                                    <td rowcount="2" colSpan="5" rowSpan={props.budgetTotal.length + 1} className="td-num textAlignCenter border-bottom-left-radius" >
                                        {t('Total')}
                                    </td>
                                </tr>
                                {props.budgetTotal.map((i, index) => {
                                    return (
                                        <tr width="100%" key={index}>
                                            <td rowcount="1" colSpan="4" rowSpan="1" className="td-num textAlignCenter col-color-green no-border-radius" >
                                                {props.currency.map((sec, idx) => {
                                                    return (<Fragment key={idx}>
                                                        {parseInt(sec.id) === parseInt(i.currency_id) ? sec.currency_desc : null}
                                                    </Fragment>
                                                    )
                                                })}
                                            </td>
                                            <td rowcount="1" colSpan="3" rowSpan="1" className="td-num textAlignRight col-color-green no-border-radius" >
                                                {parseFloat(i.amount)}
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
export default ExpenseDetailTotalAmountTable;

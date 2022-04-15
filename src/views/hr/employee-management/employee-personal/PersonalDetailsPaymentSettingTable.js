/* eslint-disable no-use-before-define */
import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';

const PersonalDetailsPaymentSettingTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            // !isEmpty(props.mainTable)  &&
            <>
                <CRow lg="12">
                    <div className="pl-3">
                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" /><label>{t('Payment Setting')}</label>
                    </div>
                </CRow>
                <CCard className='table-panel mt-2' style={{ backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                    <CRow id="table" style={{ padding: "20px" }}>
                        <CCol lg="12">
                            <CCol lg="12">
                                <CRow alignHorizontal="end">
                                    <div className="row-count-msg">{props.rowCount}</div>
                                </CRow>
                            </CCol>

                            <div className="table-responsive">
                                <table className="table purchase-order-list" aria-label="simple table">
                                    <thead id="thead-id">
                                        {
                                            props.mainTable !== "" &&
                                            <tr width="100%">
                                                <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                    <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                    {t('No')}
                                                </th>
                                                <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                    <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                    {t('Payment Name')}
                                                </th>
                                                <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                    <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                    {t('Account Number')}
                                                </th>
                                                <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                    <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                    {t('Currency')}
                                                </th>
                                                {!isEmpty(props.editData) &&
                                                    <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                        {t('Delete')}
                                                    </th>
                                                }
                                            </tr>
                                        }
                                    </thead>
                                    <tbody >
                                        {
                                            props.tablePaymentSetting !== "" &&
                                            props.tablePaymentSetting.map((i, index) => {
                                                return (<Fragment key={index}>
                                                    {
                                                        <tr width="100%">
                                                            <td className="td-num textAlignRight td-no" >
                                                                {index + 1}
                                                            </td>
                                                            <td width="" className="td-emp-id td-green textAlignLeft" >
                                                                {i.bank_name}
                                                            </td>
                                                            <td width="" className="td-emp-code td-blue textAlignRight" >
                                                                {i.acc_number}
                                                            </td>
                                                            <td width="" className="td-dept td-pink textAlignLeft" >
                                                                {i.currency_desc}
                                                            </td>
                                                            {!isEmpty(props.editData) &&
                                                                <td width="" >
                                                                    <input
                                                                        type="image"
                                                                        id="tblDelete"
                                                                        src={'avatars/remove.png'}
                                                                        className="icon-clt"
                                                                        alt="edit"
                                                                        onClick={props.removeRowPayment.bind(this, i)}
                                                                    />
                                                                </td>
                                                            }
                                                        </tr>
                                                    }
                                                </Fragment>)
                                            })}
                                    </tbody>
                                </table>

                            </div>
                        </CCol>
                    </CRow>
                </CCard>
            </>
        }
    </>
    );
}
export default PersonalDetailsPaymentSettingTable;

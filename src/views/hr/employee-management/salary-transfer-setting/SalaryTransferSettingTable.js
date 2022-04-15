import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const SalaryTransferSettingTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CCard className='table-panel' style = {{ border : "1px solid #d8dbe0" }}>
            <CRow id="table">
                <CCol lg="12">
                    <CCol lg="12 mt-2">
                        <CRow alignHorizontal="end">
                            <div className="row-count-msg">{props.rowCount}</div>
                        </CRow>
                    </CCol>
                    <div className="table-responsive">
                        <table className={props.currencyTable.length === 1 ? "table" : "table salary-transfer-table"} aria-label="simple table">
                            <thead id="thead-id">
                                <tr width="100%">
                                    <th id="tblNo" width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('No')}
                                    </th>
                                    <th id="tblPaymentName" width="200px" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Payment Name')}
                                    </th>
                                    <th id="tblAccountNumber" width="200px" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Account Number')}
                                    </th>
                                    <th id="tblCurrency" width="200px" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Currency')}
                                    </th>
                                    <th id="tblType" width="200px" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Type')}
                                    </th>
                                    <th id="tblAmount" width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                        <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                        {t('Amount')}
                                    </th>
                                    {props.detailData && props.detailData == "" &&
                                        <>
                                            <th id="tblEdit" width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                                <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                                {t('Edit')}
                                            </th>
                                            <th id="tblRemove" width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                                <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                                {t('Remove')}
                                            </th>
                                        </>
                                    }
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    props.currencyTable.map((i, index) => {
                                        return (
                                            <tr key={index} width="100%">
                                                <td
                                                    width=""
                                                    className="td-no t-align-right"
                                                >
                                                    {index + 1}
                                                </td>
                                                <td
                                                    width=""
                                                    className="td-emp-id td-green t-align-left"
                                                >
                                                    {i.bank_name}
                                                </td>
                                                <td
                                                    width=""
                                                    className="td-emp-code td-pink t-align-right"
                                                >
                                                    {i.acc_number}
                                                </td>
                                                <td
                                                    width=""
                                                    className=" t-align-left"
                                                >
                                                    {i.currency_desc}
                                                </td>
                                                <td
                                                    width=""
                                                    className="t-align-left"
                                                >
                                                    {(() => {
                                                        switch (i.amount_type) {
                                                            case 1: return t("Percentage");
                                                            case 2: return t("Amount");
                                                            default: return null;
                                                        }
                                                    })()}
                                                </td>
                                                <td
                                                    width=""
                                                    className="td-orange t-align-right"
                                                >
                                                    {i.amount}
                                                </td>

                                                {index === 0 &&
                                                    <>
                                                        {props.detailData && props.detailData == "" &&
                                                            <>
                                                                <td width="" id="editData" className="" rowSpan={index}>
                                                                    <input
                                                                        type="image"
                                                                        id="tblEdit"
                                                                        src={'avatars/edit.png'}
                                                                        className="icon-clt ava-edit"
                                                                        alt="edit"
                                                                        onClick={props.setAmountChange}
                                                                    />
                                                                </td>
                                                                <td
                                                                    width=""
                                                                    id="removeData"
                                                                    className=""
                                                                    rowSpan={index}
                                                                >
                                                                    <input
                                                                        type="image"
                                                                        id="tblRemove"
                                                                        src={"avatars/remove.png"}
                                                                        className="icon-clt ava-remove"
                                                                        alt="remove"
                                                                        // onClick={props.deleteToggleAlert.bind(this, i)}
                                                                        onClick={props.deleteToggleAlert}
                                                                    />
                                                                </td>
                                                            </>
                                                        }

                                                    </>
                                                }
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
export default SalaryTransferSettingTable;
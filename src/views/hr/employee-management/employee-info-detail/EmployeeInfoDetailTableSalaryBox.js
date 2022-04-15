import { CCol, CImg, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeInfoDetailTableSalaryBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });
    let constIndex = 1;

    return (
        <>
            { props.payment && props.payment.length > 0 && (
                <CRow id="table" className="mt-3">
                    <CCol lg="1" className=""></CCol>
                    <CCol lg="10" className="">
                        <div className="table-responsive" >
                            <table className="table mb-4 mt-4">
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th id="tblNoSalary" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("No")}
                                        </th>
                                        <th id="tblPaymentName" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Payment Name")}
                                        </th>
                                        <th id="tblAccountNumber" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Account Number")}
                                        </th>
                                        <th id="tblCurrency" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Currency")}
                                        </th>
                                        <th id="tblType" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Type")}
                                        </th>
                                        <th id="tblAmount" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Amount")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.payment.map((i, index) => {
                                        return (
                                            i.priority_list.map((item, idx) => {
                                                return (
                                                    <tr key={constIndex} width="100%">
                                                        <td id="tblNo" width="" className="text-right td-no" >
                                                            {constIndex++}
                                                        </td>
                                                        <td id="tblPaymentName" width="" className="td-green text-left">
                                                            {item.bank_name}
                                                        </td>
                                                        <td id="tblAccountNumber" width="" className="td-pink text-right">
                                                            {item.acc_number}
                                                        </td>
                                                        <td id="tblCurrency" width="" className="text-left">
                                                            {i.currency_desc}
                                                        </td>
                                                        <td id="tblType" width="" className="text-left">
                                                            {(() => {
                                                                switch (item.amount_type) {
                                                                    case 1: return t("Percentage");
                                                                    case 2: return t("Amount");
                                                                    default: return null;
                                                                }
                                                            })()}
                                                        </td>
                                                        <td id="tblAmount" width="" className="td-orange text-right">
                                                            {item.amount !== "" ? item.amount : ""}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                    <CCol lg="1" className=""></CCol>
                </CRow>
            )}
        </>
    )
}
export default EmployeeInfoDetailTableSalaryBox
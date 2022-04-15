import React, {useEffect } from "react";
import { CCol, CRow, CImg} from "@coreui/react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";

const BusinessTripDetailApprover = (props) => {
    const { t } = useTranslation();
    useEffect(() => {});
    let {mainTable}= props;
    let approverSTT="";
     //Approver status:1:Pending,2:Approved,3:Denied
    let approveStatus=(approve_status)=>{
      switch(approve_status){
        case 1: approverSTT=t("Pending");break;
        case 2: approverSTT=t("Approved");break
        default: approverSTT=t("Denied");
      }
      return approverSTT;
    }
    return (
        <>
        {mainTable !==""  && ( <>
            <CRow lg="12" className="">
                <CCol className="d-flex flex-nowrap align-items-center">
                    <CImg
                        className="img-title"
                        src="avatars/list.png"
                        alt="titleicon"
                    />
                    <label id="lblApprover" className="ml-3 mt-2">
                        {t("Approver")}
                    </label>
                </CCol>
            </CRow>
            <div className="box box-white">
                <CRow className="m-2">
                    <CCol lg="12" className="mt-2">
                        <div className="table-responsive">
                            <table
                                id="tbApprover"
                                className="table"
                                aria-label="simple table"
                            >
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th
                                            className="text-left text-nowrap"
                                            id="tblNo"
                                        >
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("No")}
                                        </th>
                                        <th
                                            className="text-left text-nowrap"
                                            id="tblApproverID"
                                        >
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("Approver ID")}
                                        </th>
                                        <th className="text-left text-nowrap"
                                            id="tblApproverName"
                                        >
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("Approver Name")}
                                        </th>
                                        <th
                                            className="text-left text-nowrap"
                                            id="tblApproverStatus"
                                        >
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("Approver Status")}
                                        </th>
                                        <th
                                            className="text-left text-nowrap"
                                            id="tblDeniedReason"
                                        >
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("Denied Reason")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {mainTable.approver.map((i, index) => {
                                    return (
                                    < Fragment key={index}>
                                        <tr width="100%">
                                            <td className="td-approver text-right text-nowrap"
                                                style={{
                                                borderLeft: "3px solid #858BC3",
                                                }} >
                                                {index+1}
                                            </td>
                                            <td className="td-approver text-right text-nowrap">
                                                {i.employee_id}
                                            </td>
                                            <td
                                                className="col-color-blue text-left text-nowrap"
                                            >
                                                {i.emp_name}
                                            </td>
                                            <td className="text-left text-nowrap td-dept">
                                                {approveStatus(parseInt(i.approve_status))}
                                            </td>
                                            <td className="text-left text-nowrap td-approver">
                                                {i.denied_reason}
                                            </td>
                                        </tr>
                                    </ Fragment>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </div>
            </>
         )}
        </>
    );
};
export default BusinessTripDetailApprover;

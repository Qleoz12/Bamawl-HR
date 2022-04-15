import React, { useEffect } from "react";
import { CCol, CRow, CImg} from "@coreui/react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";


const RegisterListTable = (props) => {
    const { t } = useTranslation();
    useEffect(() => {});
  let{
     mainTable,
     deleteFamily,
     checkAction,
  }= props
    return (
        <>
          { mainTable.length > 0 && (
            <div className="box box-white">
                <CRow className="m-2">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg" id="lblTotalRows">{t('Total Rows').replace('%s',mainTable.length)}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table
                                id="tbSubAllowanceRegisterList"
                                className="table purchase-order-list"
                                aria-label="simple table"
                            >
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th className="text-left text-nowrap" id="tblNo">
                                            <CImg src={"avatars/titleicon.png"} className="imgTitle" alt="titleicon" />
                                            {t("No")}
                                        </th>
                                        <th className="text-left text-nowrap" id="tblFamilyMember'sName">
                                            <CImg src={"avatars/titleicon.png"} className="imgTitle" alt="titleicon" />
                                            {t("Family Member's Name")}
                                        </th>
                                        <th className="text-left text-nowrap" id="tblRelationship">
                                            <CImg src={"avatars/titleicon.png"} className="imgTitle" alt="titleicon" />
                                            {t("Relationship")}
                                        </th>
                                        <th className="text-left text-nowrap" id="tblNRCNumber">
                                            <CImg src={"avatars/titleicon.png"} className="imgTitle" alt="titleicon" />
                                            {t("NRC Number")}
                                        </th>
                                        <th className="text-left text-nowrap" id="tblOccupation">
                                            <CImg src={"avatars/titleicon.png"} className="imgTitle" alt="titleicon" />
                                            {t("Occupation")}
                                        </th>
                                        <th className="text-left text-nowrap" id="tblIncomeTaxRelief">
                                            <CImg src={"avatars/titleicon.png"} className="imgTitle" alt="titleicon" />
                                            {t("IncomeTaxRelief")}
                                        </th>
                                        <th className="text-left text-nowrap" id="tblLivingDeceased">
                                            <CImg src={"avatars/titleicon.png"} className="imgTitle" alt="titleicon" />
                                            {t("Living/Deceased")}
                                        </th>
                                        <th className="text-left text-nowrap" id="tblRemove">
                                            <CImg src={"avatars/titleicon.png"} className="imgTitle" alt="titleicon" />
                                            {t("Remove")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        mainTable.map((i,index) => {
                                            return (<Fragment key={index}>
                                                <tr width="100%">
                                                    <td className="td-no text-right">
                                                        {index + 1}
                                                    </td>
                                                    <td className="td-emp-id text-left">
                                                        {i.family_member_name}
                                                    </td>
                                                    <td className="td-green text-left">
                                                        {i.relationship}
                                                    </td>
                                                    <td className="td-pink text-left">
                                                        {i.nrc_number}
                                                    </td>
                                                    <td className="text-left" >
                                                        {i.occupation}
                                                    </td>
                                                    <td className="text-left">
                                                        {i.already_tax_relief == 1 ? "Yes" : "No"}
                                                    </td>
                                                    <td className="text-left">
                                                        {i.alive == 1 ? "Living" : "Deceased"}
                                                    </td>
                                                    <td id="removeData" className={checkAction == 1 ? "disable" :""}>
                                                        <input type="image" src="avatars/remove.png" className="icon-clt" alt="remove" id={index} onClick={checkAction == 1? deleteFamily.bind(this, index) : ""}></input>
                                                    </td>
                                                </tr>
                                            </Fragment>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </div>
          )}
        </>
    );
};
export default RegisterListTable;

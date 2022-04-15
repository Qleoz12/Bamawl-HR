import React ,{useEffect} from 'react';
import {CCol, CRow,CImg} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import PaginationRegisterList from './SubAllowanceRegisterListPagination';
import ViewPermision from '../../../brycen-common/constant/ViewPermission';

const RegisterListTable=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        {props.mainTable != "" && (
            <div className="box box-white">
                <CRow className="m-4">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg" id="lblTotalRows">{t('Total Rows').replace('%s',props.rowCount)}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table
                                id='tbSubAllowanceRegisterList'
                                className="table purchase-order-list"
                                aria-label="simple table"
                            >
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th className='text-left text-nowrap' id='tblSubAllowanceID'>
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("Sub Allowance ID")}
                                        </th>
                                        <th className='text-left text-nowrap' id='tblAllowaceTitle'>
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("Allowance Title")}
                                        </th>
                                        <th className="text-left text-nowrap" id='tblExperience'>
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("Experience")}
                                        </th>
                                        <th className='text-left text-nowrap' id='tblQualification'>
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("Qualification")}
                                        </th>
                                        <th className='text-left text-nowrap'id='tblUserDefined'>
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("User Defined")}
                                        </th>
                                        <th style={{ textAlign: "left", whiteSpace:"nowrap"}} id='tblAmount'>
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("Amount")}
                                        </th>
                                        <th className='text-left text-nowrap' id='tblEdit'>
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("Edit")}
                                        </th>
                                        <th className='text-left text-nowrap' id='tblRemove'>
                                            <CImg
                                                src={"avatars/titleicon.png"}
                                                className="imgTitle"
                                                alt="titleicon"
                                            />
                                            {t("Remove")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { props.mainTable.map((i, index) => {
                                        return (
                                        < Fragment key={index}>
                                            <tr width="100%" className={props.mainTable.length-1 === index ? "border-bottom-right-radius" : ""}>
                                                <>
                                                    <td className="td-num text-right"
                                                        style={{
                                                            borderLeft: "3px solid #858BC3",
                                                        }} >
                                                        {i.id}
                                                    </td>
                                                    <td className="td-num td-pink text-left text-nowrap">
                                                        {i.allowances && i.allowances.allowance_name}
                                                    </td>
                                                    <td
                                                        className="td-emp-name text-left text-nowrap"
                                                    >
                                                        {props.editTest(i.experience_allowance_year, i.experience_allowance_month, i.experience_limit)}
                                                    </td>
                                                    <td className="text-left text-nowrap">
                                                        {i.qualification_allowance}
                                                    </td>
                                                </>
                                                <td className="text-left text-nowrap"
                                                >
                                                    {i.others_allowance}
                                                </td>
                                                <>
                                                    <td className={props.viewPermission == ViewPermision.ALL_NOT_MONEY? "td-overtime-title text-center": "td-overtime-title text-right"}>
                                                        { props.viewPermission == ViewPermision.ALL_NOT_MONEY ?"-":  i.allowance_amount +" "+ i.currencys?.currency_name}
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="image"
                                                            id={i.id}
                                                            src={"avatars/edit.png"}
                                                            className="icon-clt"
                                                            alt="edit"
                                                            onClick={props.editToggleAlert.bind(this, i)}
                                                        />
                                                    </td>
                                                    <td >
                                                        <input
                                                            type="image"
                                                            id={i.id}
                                                            src={"avatars/remove.png"}
                                                            className="icon-clt"
                                                            alt="remove"
                                                            onClick={props.deleteRow.bind(this, i)}
                                                        />
                                                    </td>
                                                </>
                                            </tr>
                                        </ Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
                <PaginationRegisterList
                    rowCount={props.rowCount}
                    defaultPerPage={props.defaultPerPage}
                    totalPage={props.totalPage}
                    currentPage={props.currentPage}
                    changePage={props.changePage} />
            </div>
          )}
    </>
    );
}
export default RegisterListTable;

import React, { useEffect } from 'react';
import { CCol, CRow, CImg } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import PayrollCalculationListPagination from './PayrollCalculationListPagination';
import DeleteCalculationList from './DeletePayrollCalculationList';
import Moment from "moment";
const CalculationListTable = props => {

  const { t } = useTranslation();
  useEffect(() => {
  });

  return (
    <>
      { props.mainTable.length > 0 && (
        <div className="table-panel box box-white">
            <CRow >
                <CCol lg="12">
                    <CCol lg="12">
                        <CRow alignHorizontal="end">
                        <div className="row-count-msg" id='lbTotalRows'>{t('Total Rows').replace('%s', props.rowCount)}</div>
                        </CRow>
                    </CCol>
                    <div className="table-responsive">
                        <table
                        id='gribTable'
                        className="table purchase-order-list"
                        aria-label="simple table"
                        >
                        <thead id="thead-id">
                            <tr width="100%">
                            <th
                                id="chkCheckBox"
                                style={{ textAlign: "center", whiteSpace: "nowrap" }}
                            >
                                <input
                                type="checkbox"
                                value="all-check"
                                checked={props.AllCheck === true}
                                onChange={props.changeCheckbox}
                                />
                            </th>
                            <th style={{ textAlign: "left", whiteSpace: "nowrap" }} id="tblNo">
                                <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                                />
                                {t("No")}
                            </th>
                            <th style={{ textAlign: "left", whiteSpace: "nowrap" }} id="tblEmplyeeID">
                                <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                                />
                                {t("Employee ID")}
                            </th>
                            <th style={{ textAlign: "left", whiteSpace: "nowrap" }} id="tblEmplyeeCode">
                                <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                                />
                                {t('Employee Code')}
                            </th>
                            <th style={{ textAlign: "left", whiteSpace: "nowrap" }} id="tblEmployeeName ">
                                <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                                />
                                {t("Employee Name")}
                            </th>
                            <th style={{ textAlign: "left", whiteSpace: "nowrap" }} id="tblDepartment ">
                                <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                                />
                                {t("Department")}
                            </th>
                            <th style={{ textAlign: "left", whiteSpace: "nowrap" }} id="tblJoinDate">
                                <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                                />
                                {t("Joined Date")}
                            </th>
                            <th style={{ textAlign: "left", whiteSpace: "nowrap" }} id="tblMethods">
                                <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                                />
                                {t("Methods")}
                            </th>
                            <th style={{ textAlign: "left", whiteSpace: "nowrap" }} id="lbEdit">
                                <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                                />
                                {t("Edit")}
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.mainTable.map((i, index) => {
                            return (
                                <Fragment key={index}>
                                {i.department_name.map((sec, idx) => {
                                    return (
                                    <tr width="100%" key={idx}>
                                        {idx == 0 && (
                                        <>
                                            <td
                                            className={index==props.mainTable.length-1?"td-num border-bottom-left-radius":"td-num"}
                                            style={{
                                                borderLeft: "3px solid #858BC3",
                                                textAlign: "center",
                                            }}
                                            rowSpan={i.department_name.length}
                                            >
                                            <input
                                                type="checkbox"
                                                value={i.id}
                                                id={i.id}
                                                checked={i.is_checked === true}
                                                onChange={props.changeCheckbox}
                                            />
                                            </td>
                                            <td
                                            className="td-num text-right"
                                            rowSpan={i.department_name.length}
                                            >
                                            {(props.currentPage - 1) * props.defaultPerPage + index + 1}
                                            </td>
                                            <td
                                            className="td-emp-id text-right"
                                            rowSpan={i.department_name.length}
                                            >
                                            {i.employee_id}
                                            </td>
                                            <td
                                            className="td-emp-code text-left"
                                            rowSpan={i.department_name.length}
                                            >
                                            {i.employee_code}
                                            </td>
                                            <td
                                            className="td-emp-name text-left"
                                            rowSpan={i.department_name.length}
                                            >
                                            {i.employee_name}
                                            </td>
                                        </>
                                        )}
                                        <td
                                        className="td-dept td-pink text-left no-border-radius"
                                        >
                                        {sec.department_name}
                                        </td>
                                        {idx == 0 && (
                                        <>
                                            <td
                                            className="td-joined-date text-center"
                                            rowSpan={i.department_name.length}
                                            >
                                            {Moment(i.joined_date).format('YYYY-MM-DD')}
                                            </td>
                                            <td
                                            className="td-overtime-title text-left"
                                            rowSpan={i.department_name.length}
                                            >
                                            {i.calculate_method_description}
                                            </td>
                                            <td
                                            rowSpan={i.department_name.length}
                                            className={index==props.mainTable.length-1?"border-bottom-right-radius":""}
                                            >
                                            <CImg
                                                name='imgIconEdit'
                                                id={i.id}
                                                src={"avatars/edit.png"}
                                                className="icon-clt"
                                                alt="edit"
                                                onClick={props.editToggleAlert.bind(
                                                this,
                                                i
                                                )}
                                            />
                                            </td>
                                        </>
                                        )}
                                    </tr>
                                    );
                                })}
                                </Fragment>
                            );
                            })}
                        </tbody>
                        </table>
                    </div>

                    <PayrollCalculationListPagination
                        rowCount={props.rowCount}
                        totalPage={props.totalPage}
                        currentPage={props.currentPage}
                        changePage={props.changePage}
                        defaultPerPage={props.defaultPerPage}
                    />
                    <DeleteCalculationList
                        mainTable={props.mainTable}
                        deleteToggleAlert={props.deleteToggleAlert}
                    />
                </CCol>
            </CRow>
        </div>
      )}
    </>
  );
}
export default CalculationListTable;

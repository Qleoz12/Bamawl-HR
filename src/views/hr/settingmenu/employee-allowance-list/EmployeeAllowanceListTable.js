import React, { } from 'react';
import {
    CRow,
    CCol,
    CImg,
    CCard
} from "@coreui/react";
import { useTranslation } from 'react-i18next';
import EmployeeAllowanceListPagination from "./EmployeeAllowanceListPagination";
import DeleteEmployeeAllowanceList from "./DeleteEmployeeAllowanceList";
const EmployeeAllowanceListTable = props => {
    const { t } = useTranslation();
    let {
        mainTable,
        rowCount,
        handleTblCheckboxes,
        editToggleAlert,
        currentPage,
        defaultPerPage,
        allCheck,
        totalPage,
        changePage,
        cancelModel,
        ViewPermision,
        viewPermissionAPI
    } = props;
    const tableHeader = [
        { id: 1, name: t('No'), physicalName: 'tblNo' },
        { id: 2, name: t('Employee Id'), physicalName: 'tblEmplyeeID' },
        { id: 3, name: t('Employee Code'), physicalName: 'tblEmployeeCode' },
        { id: 4, name: t('Employee Name'), physicalName: 'tblEmployeeName' },
        { id: 5, name: t('Department'), physicalName: 'tblDepartment' },
        { id: 6, name: t('Joined Date'), physicalName: 'tblJoinDate' },
        { id: 7, name: t('Allowance Title'), physicalName: 'tlbAllowanceTitle' },
        { id: 8, name: t('Sub-Allowance Title'), physicalName: 'tblSubAllowanceTitle' },
        { id: 9, name: t('Amount'), physicalName: 'tblAmount' }
    ]
    return (
        mainTable.length > 0 &&
        <CCard className="table-panel box box-white">
            <CRow id="table">
                <CCol lg='12'>
                    <CCol lg="12">
                        <CRow alignHorizontal="end">
                            <div className="row-count-msg" id='lblTotalRows'>{t('Total Rows').replace('%s', rowCount)}</div>
                        </CRow>
                    </CCol>
                    <div className="table-responsive">
                        <table className='table ' >
                            <thead id="thead-id">
                                <tr width="100%">
                                    <th width="" style={{ textAlign: "center" }}>
                                        <input type="checkbox"
                                            onChange={handleTblCheckboxes}
                                            value="all-check"
                                            id='chkboxCheckAll'
                                            checked={allCheck}
                                        />
                                    </th>
                                    {
                                        tableHeader.map(item => {
                                            return (
                                                <th key={item.id}
                                                    width=""
                                                    id={item.physicalName}
                                                >
                                                    <div className="text-nowrap d-flex align-items-baseline"  >
                                                        <IconThreeDot />
                                                        {item.name}
                                                    </div>

                                                </th>
                                            )
                                        })
                                    }
                                    <th className="d-flex align-items-baseline text-nowrap">
                                    <IconThreeDot />
                                         {t('Edit')}</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    mainTable.map((i, index) => {
                                        return (<React.Fragment key={index}>
                                            {i.department_name.map((sec, idx) => {
                                                return (
                                                    <tr key={idx} width="100%">
                                                        {idx === 0 && <>
                                                            <td width="" className={mainTable.length-1 === index ? "td-no t-align-center border-bottom-left-radius" : "td-no t-align-center"} rowSpan={i.department_name.length} >
                                                                <input type="checkbox"
                                                                    checked={i.isChecked === true}
                                                                    onChange={handleTblCheckboxes}
                                                                    value={i.id}
                                                                >
                                                                </input>
                                                            </td>
                                                            <td width="" className="text-right" rowSpan={i.department_name.length}>
                                                                {(currentPage - 1) * defaultPerPage + index + 1}
                                                            </td>
                                                            <td width="" className="td-emp-id text-right" rowSpan={i.department_name.length}>
                                                                {i.employee_id}
                                                            </td>
                                                            <td width="" className="td-emp-code text-left" rowSpan={i.department_name.length}>
                                                                {i.employee_code}
                                                            </td>
                                                            <td width="" className="td-emp-name td-green text-left"  rowSpan={i.department_name.length}>
                                                                {i.employee_name}
                                                            </td>
                                                        </>
                                                        }
                                                        <td width="" className="td-dept td-pink no-border-radius text-left" >
                                                            {sec.department_name}
                                                        </td>

                                                        {idx === 0 && <>
                                                            <td width="" className="td-joined-date" rowSpan={i.department_name.length}>
                                                                {i.joined_date.split(' ')[0]}
                                                            </td>
                                                            <td width="" className="text-left" rowSpan={i.department_name.length}>
                                                                {i.allowance_name}
                                                            </td>
                                                            <td width="" className="text-left" rowSpan={i.department_name.length}>
                                                                {i.sub_allowance_title}
                                                            </td>
                                                            <td width="" className= {viewPermissionAPI == ViewPermision.ALL_NOT_MONEY?"td-blue text-center":"td-blue text-right"} rowSpan={i.department_name.length}>
                                                                {i.allowance_amount} {i.currency_name}
                                                            </td>
                                                            <td width=""className={mainTable.length-1 === index ? "border-bottom-right-radius" : ""} rowSpan={i.department_name.length} >
                                                                <input type='image' src='avatars/edit.png' className='add-icon' style={{margin:"0"}}
                                                                    onClick={editToggleAlert}
                                                                    id={i.id}
                                                                    alt="edit"
                                                                />
                                                            </td>
                                                        </>
                                                        }
                                                    </tr>
                                                )
                                            })
                                            }
                                        </React.Fragment>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </CCol>

            </CRow>
            <EmployeeAllowanceListPagination
                rowCount={rowCount}
                totalPage={totalPage}
                currentPage={currentPage}
                changePage={changePage}
                defaultPerPage={defaultPerPage}
            />
            <DeleteEmployeeAllowanceList
                mainTableLenght={mainTable.length}
                cancelModel={cancelModel}
            />

        </CCard>

    )
}

const IconThreeDot = () => {
    return (
        <CImg
            src={'avatars/titleicon.png'}
            className='title-icon'
        />
    )
}
export default EmployeeAllowanceListTable;

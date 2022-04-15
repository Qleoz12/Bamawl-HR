import React from "react";
import { useTranslation } from 'react-i18next';
import {
    CRow,
    CCol,
    CImg,
    CCard,
} from "@coreui/react";
import EmployeeDataEntryPagination from "./EmployeeDataEntryPagination";

const EmployeeDataEntryResultTable = props => {
    let {
        mainTable,
        rowCount,
        currentPage,
        defaultPerPage,
        totalPage,
        changePage,
    } = props;
    const { t } = useTranslation();
    const tableHeader = [
        { id: 1, name: t('Employee ID'), physicalName:'tblEmployeeID' },
        { id: 2, name: t('Employee Code'), physicalName:'tblEmployeeCode' },
        { id: 3, name: t('Employee Name'), physicalName:'tblEmployeeName' },
        { id: 4, name: t('Department'), physicalName:'tblDepartment' },
    ];
    return (
        typeof (mainTable) === 'object' && mainTable.length > 0 &&
        <CCard className="table-panel box box-white">
            <CRow id="table">
                <CCol lg='12' >
                    <CCol lg="12" className="tableContainer">
                        <CRow alignHorizontal="end">
                            <div className="row-count-msg" id='lblTotalRows'>{t('Total Rows').replace('%s', rowCount)}</div>
                        </CRow>
                    </CCol>
                    <div className="table-responsive tableWidth" >
                        <table className='table '>
                            <thead id="thead-id">
                                <tr width="100%">
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mainTable.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <MultipleDepartmentRowData
                                                    employeeID={item.employee_id}
                                                    employeeCode={item.code}
                                                    employeeName={item.employee_name}
                                                    listDepartment={item.department}
                                                    mainTable={mainTable}
                                                />
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </CCol>
            </CRow>
            <div className="paginationContainer">
                <EmployeeDataEntryPagination
                    rowCount={rowCount}
                    defaultPerPage={defaultPerPage}
                    currentPage={currentPage}
                    totalPage={totalPage}
                    changePage={changePage}
                />
            </div>
        </CCard>
    );
};


// Case have multiple Deparment
const MultipleDepartmentRowData = props => {
    let {
        employeeID,
        employeeCode,
        employeeName,
        listDepartment,
        mainTable
    } = props;
    return (
        <>
            {
                typeof (listDepartment) == 'object' && listDepartment.length == 0 &&
                <tr>
                    <td className="td-no text-right" >{employeeID}</td>
                    <td className="text-left" >{employeeCode}</td>
                    <td className='td-pink text-left'>{employeeName}</td>
                    <td className='text-left'></td>
                </tr>
            }
            {   typeof (listDepartment) === 'object' && listDepartment.length > 0 &&
                listDepartment.map((item, index) => {
                    const rowSpan = listDepartment.length;
                    return (
                        <React.Fragment key={index}>
                            {
                                index === 0 &&
                                <tr key={index}>
                                    <td className={index==mainTable.length-1?"td-no text-right border-bottom-left-radius":"td-no text-right"}  rowSpan={rowSpan}>{employeeID}</td>
                                    <td className="text-left" rowSpan={rowSpan}>{employeeCode}</td>
                                    <td className='td-pink text-left' rowSpan={rowSpan}>{employeeName}</td>
                                    <td className={index==props.mainTable.length-1?"border-bottom-right-radius text-left":" text-left"}>{item.department_name}</td>
                                </tr>
                            }
                            {
                                index !== 0 &&
                                <tr>
                                    <td className="text-left">{item.department_name}</td>
                                </tr>
                            }
                        </React.Fragment>
                    )
                })
            }
        </>
    );
};

const IconThreeDot = () => {
    return (
        <CImg
            src={'avatars/titleicon.png'}
            className='title-icon'
            alt="Title icon"
        />
    );
};

export default EmployeeDataEntryResultTable;

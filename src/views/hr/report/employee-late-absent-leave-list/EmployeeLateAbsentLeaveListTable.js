/* eslint-disable no-use-before-define */
import React from 'react';
import { CCard, CCol, CRow, CImg, CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';
const EmployeeLateAbsentLeaveListTable = props => {
    let {
        mainTable,
        rowCount,
        listTitle,
        listFromToDate,
        searchAPI
    } = props;
    const { t } = useTranslation();
    const exportCSV = () => {
        searchAPI('export');
    }
    return (<>
        {
            mainTable.length > 0 &&
            <CCard className='table-panel box box-white'>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">
                                    <p id="lbTotalRows" className="mb-1">
                                        {t('Total Rows').replace('%s', rowCount)}
                                    </p>
                                </div>
                            </CRow>
                        </CCol>
                        <div className={'table-responsive'}>
                            <table className="table purchase-order-list " aria-label="simple table">
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th id="tblEmployeeID" rowSpan="2" className="text-left">
                                            <div className="d-flex align-items-baseline " >
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                {t('Employee ID')}
                                            </div>
                                        </th>
                                        <th id="tblEmplyeeCode" rowSpan="2" className="text-left" >
                                            <div className="d-flex align-items-baseline " >
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                {t('Employee Code')}
                                            </div>
                                        </th>
                                        <th id="tblEmployeeName" rowSpan="2" className="text-left" >
                                            <div className="d-flex align-items-baseline " >
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                {t('Employee Name')}
                                            </div>
                                        </th>
                                        {
                                            listFromToDate.length > 0 && listTitle.length > 0 &&
                                            listFromToDate.map((val, idx) => {
                                                return (
                                                    <th key={idx}  colSpan={listTitle.length} className="tblRangeDate text-center text-nowrap align-middle"
                                                        style={{ borderBottom: "1px solid #FFFFFF" }}>
                                                        <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                        {val.date_start} ~ {val.date_end}
                                                    </th>
                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%">
                                        {
                                            listFromToDate.length > 0 && listTitle.length > 0 &&
                                            listFromToDate.map((fromTo) => {
                                                return (listTitle.map((val, index) => {
                                                    return (
                                                        <th key={index} className="tblListCompanyLeave text-left no-border-radius">
                                                            <div>
                                                                {val.title}
                                                            </div>
                                                        </th>
                                                    )
                                                })
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        mainTable.map((e, index) => {
                                            return (
                                                <tr key={index} width="100%">
                                                    <td width="" className="td-emp-id text-right td-first-col">
                                                        {e.employee_id}
                                                    </td>
                                                    <td width="" className="td-emp-code text-left">
                                                        {e.employee_code}
                                                    </td>
                                                    <td width="" className="text-left text-nowrap">
                                                        {e.employee_name}
                                                    </td>
                                                    {
                                                        listFromToDate.length > 0 && listTitle.length > 0 && e.range_list.length > 0 &&
                                                        listFromToDate.map((fromTo, idxFT) => {
                                                            return (
                                                                listTitle.map((val, idx) => {
                                                                    return (
                                                                        <td key={idx} className="td-actual text-left">
                                                                            {
                                                                                e.range_list[idxFT].list && e.range_list[idxFT].list.find(item => item.id === val.id) ? e.range_list[idxFT].list.find(item => item.id === val.id).value : '-'
                                                                            }
                                                                        </td>
                                                                    )
                                                                })
                                                            )
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
                <br />
                <CRow lg="12">
                    <CCol className="text-center">
                        <CButton id="btnExport" className="form-btn" onClick={exportCSV}>{t('Export CSV')}</CButton>
                    </CCol>
                </CRow>
                <br />
            </CCard>
        }
    </>
    );
}
export default EmployeeLateAbsentLeaveListTable;

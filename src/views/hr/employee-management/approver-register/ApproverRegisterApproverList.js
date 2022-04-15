/* eslint-disable eqeqeq */
import React, { useEffect, Fragment } from 'react';
import { CCol, CRow, CButton, CSelect, CImg, CLabel, CCard, CModal, CModalBody, CCardBody, CModalHeader, CPagination } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';

const ApproverRegisterApproverList = props => {
    let {
        searchByChange,
        searchByState,
        openSearchEmp,
        closeSearchEmp,
        searchEmpModalBox,
        errorModal,
        successModal,
        deptEmpChange,
        deptEmpState,
        departmentAPI,
        positionChange,
        positionState,
        positionAPI,
        positionRankChange,
        positionRankState,
        positionRankAPI,
        searchEmpListClick,
        empListTable,
        change_emp_checkbox,
        totalPage,
        currentPage,
        pageChange,
        approverTable,
        removeRow,
        rowEmpCount,
        add,
        AllEmpCheck,
        addApprover
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CCol lg="12">
            <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
            <CLabel id="lblApproverList" className="title-lbl">{t('Approver List')}</CLabel>
        </CCol>
        <CCard className="panel" style={{ padding: '15px' }}>
            <CRow lg="12" style={{ marginBottom: '10px' }}>
                <CCol lg="5" className="mb-4">
                    <CLabel id="lblSearchBy">{t('Search By')}</CLabel>
                    <CSelect className="bamawl-select" value={searchByState} onChange={searchByChange} custom>
                        <option key="Approver" value="Approver">{t("Approver")}</option>
                        <option key="Acknowledged By" value="Acknowledged By">{t("Acknowledged By")}</option>
                    </CSelect>
                </CCol>
                <CCol lg="6" >
                    <CButton style={{ marginTop: "25px" }} id="btnApproverSearch" className="form-btn" onClick={openSearchEmp}>{t('Search')}</CButton>
                </CCol>
            </CRow>
            <br />
            {searchEmpModalBox === true && (
                <div>
                    <CModal size="xl" centered closeOnBackdrop={false} show={searchEmpModalBox}>
                        <CModalHeader>
                            <CLabel style={{ fontSize: "18px" }} id="lblEmployeeList">{t("Employee List")}</CLabel><br />
                        </CModalHeader>
                        <CModalBody>
                            <CCardBody style={{ padding: "0rem" }}>
                                {/* Error */}
                                {errorModal && errorModal.length > 0 &&
                                    <CCard className="custom-card error p-3 mb-5">
                                        {
                                            errorModal.map((data, index) => {
                                                return (
                                                    <div key={index} className="msg">
                                                        {data}
                                                    </div>
                                                )
                                            })}
                                    </CCard>
                                }
                                {successModal && successModal.length > 0 &&
                                    <CCard className="custom-card success p-3 mb-5">
                                        <div className="msg">
                                            {successModal}
                                        </div>
                                    </CCard>
                                }
                                <CRow lg="12" style={{ marginBottom: '10px' }} className="">
                                    <CCol className="mb-4" lg="5">
                                        <CLabel className="">{t('Employee ID')}</CLabel>
                                        <div className="autocomplete-wrapper">
                                            <Autocomplete
                                                onChange={(i) => props.changeAutocomplete('id', i)}
                                                onSelect={props.selectAutocomplete}
                                                items={props.idArr}
                                                name={props.empID}
                                            />
                                        </div>
                                    </CCol>
                                    <CCol lg="2">
                                        <div className="line"></div>
                                    </CCol>
                                    <CCol className="mb-4" lg="5">
                                        <CLabel className="">{t('Employee Name')}</CLabel>
                                        <div className="autocomplete-wrapper">
                                            <Autocomplete
                                                onChange={(i) => props.changeAutocomplete('name', i)}
                                                onSelect={props.selectAutocomplete}
                                                items={props.nameArr}
                                                name={props.empName}
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                                <CRow lg="12" className="mar-search">
                                    <CCol lg="5" className="mb-4">
                                        <CLabel id="lblDepartmentName">{t('Department')}</CLabel>
                                        <CSelect className="bamawl-select" value={deptEmpState} onChange={deptEmpChange} custom>
                                            <option key="" value="">{t("---Select Department---")}</option>
                                            {departmentAPI !== "" &&
                                                departmentAPI.map((item, index) => {
                                                    return (<option key={index} name={item.department_name} value={item.id}> {item.department_name} </option>)
                                                })
                                            }
                                        </CSelect>
                                    </CCol>
                                    <CCol lg="2">
                                        <div className="line"></div>
                                    </CCol>
                                    <CCol lg="5" className="mb-4">
                                        <CLabel id="lblPosition">{t('Position')}</CLabel>
                                        <CSelect className="bamawl-select" value={positionState} onChange={positionChange} custom>
                                            <option key="" value="">{t("---Select Position---")}</option>
                                            {positionAPI !== "" &&
                                                positionAPI.map((item, index) => {
                                                    return (<option key={index} name={item.position_name} value={item.id}> {item.position_name} </option>)
                                                })
                                            }
                                        </CSelect>
                                    </CCol>
                                    <CCol lg="5" className="mb-4">
                                        <CLabel id="lblPositionRank">{t('Position Rank')}</CLabel>
                                        <CSelect className="bamawl-select" value={positionRankState} onChange={positionRankChange} custom>
                                            <option key="" value="">{t("---Select Rank---")}</option>
                                            {positionRankAPI !== "" &&
                                                positionRankAPI.map((item, index) => {
                                                    return (<option key={index} name={item.position_rank} value={item.id}>{t('Rank')} {item.position_rank} </option>)
                                                })
                                            }
                                        </CSelect>
                                    </CCol>
                                </CRow>
                                <br />
                                <CRow lg="12">
                                    <CCol style={{ textAlign: "center" }}>
                                        <CButton id="btnSearch" className="form-btn" onClick={searchEmpListClick}>{t('Search')}</CButton>
                                        {empListTable.length == 0 &&
                                            <CButton className="form-btn ml-3" id='btnClose' name='btnClose' onClick={closeSearchEmp}>{t('Close')}</CButton>
                                        }
                                    </CCol>
                                </CRow><br />
                                {
                                    empListTable != "" &&
                                    <CCard className='table-panel'>
                                        <CRow alignHorizontal="end">
                                            <div style={{ marginRight: "15px" }} id="lblEmpTotalRows" className="row-count-msg">{t('Total Rows').replace("%s", rowEmpCount)}</div>
                                        </CRow>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead id="thead-id">
                                                    {
                                                        <tr width="100%">
                                                            <th width="" className="" style={{ textAlign: 'center', verticalAlign: "middle" }}>
                                                                <input name="chkboxCheckAll" type="checkbox"
                                                                    id="chkEmpCheckBox"
                                                                    value="all-check"
                                                                    checked={AllEmpCheck === true}
                                                                    onChange={change_emp_checkbox}
                                                                    style={{ cursor: "pointer" }} />
                                                            </th>
                                                            <th id="tblEmpID" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                                    {t('Employee ID')}
                                                                </div>
                                                            </th>
                                                            <th id="tblEmpName" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                                    {t('Employee Name')}
                                                                </div>
                                                            </th>
                                                            <th id="tblEmail" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                                    {t('Email')}
                                                                </div>
                                                            </th>
                                                            <th id="tblEmpDepartment" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                                    {t('Department')}
                                                                </div>
                                                            </th>
                                                            <th id="tblEmpPosition" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                                    {t('Position')}
                                                                </div>
                                                            </th>
                                                            <th id="tblPositionRank" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                                    {t('Position Rank')}
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    }
                                                </thead>
                                                <tbody >
                                                    {
                                                        empListTable.map((i, index) => {
                                                            return (<Fragment key={index}>
                                                                <>
                                                                    {i.employee_has_dept_position.map((sec, idx) => {
                                                                        return (<Fragment key={idx}>
                                                                            <tr key={index} width="100%">
                                                                                {idx == 0 && <>
                                                                                    <td className={empListTable.length - 1 === index
                                                                                        ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"} style={{ borderLeft: '3px solid #858BC3', textAlign: "center", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employee_has_dept_position.length}>
                                                                                        <input type="checkbox"
                                                                                            style={{ marginLeft: "-3px" }}
                                                                                            value={i.employee_id}
                                                                                            id={i.employee_id}
                                                                                            checked={i.is_checked === true}
                                                                                            onChange={change_emp_checkbox}
                                                                                        />
                                                                                    </td>
                                                                                    <td className="" style={{ textAlign: "right", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employee_has_dept_position.length}>
                                                                                        {i.employee_id}
                                                                                    </td>
                                                                                    <td className="td-emp-id td-green" style={{ maxWidth: "300px", textAlign: "left" }} rowSpan={i.employee_has_dept_position.length}>
                                                                                        {i.employee_name}
                                                                                    </td>
                                                                                    <td className="td-emp-id" style={{ maxWidth: "300px", textAlign: "left", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employee_has_dept_position.length}>
                                                                                        {i.email}
                                                                                    </td>
                                                                                </>
                                                                                }
                                                                                <td className="td-dept td-pink no-border-radius" style={{ maxWidth: "200px", textAlign: "left" }}>
                                                                                    {sec.departments.department_name}
                                                                                </td>
                                                                                {<>
                                                                                    <td className="" style={{ textAlign: "left", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                        {sec.positions.position_name}
                                                                                    </td>
                                                                                    <td className="" style={{ textAlign: "right", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                        {sec.positions.position_rank}
                                                                                    </td>
                                                                                </>
                                                                                }
                                                                            </tr>
                                                                        </Fragment>
                                                                        )
                                                                    })
                                                                    }
                                                                </>
                                                            </Fragment>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            {
                                                empListTable != "" && totalPage > 1 &&
                                                <CPagination
                                                    activePage={currentPage}
                                                    pages={totalPage}
                                                    onActivePageChange={(i) => pageChange(i)}
                                                    dots={false}
                                                    arrows={false}
                                                    align="center"
                                                    firstButton="First page"
                                                    lastButton="Last page"
                                                />
                                            }
                                        </div>
                                    </CCard>
                                }
                            </CCardBody>
                            {
                                empListTable != "" &&
                                <CCol style={{ textAlign: "center" }}>
                                    <CButton className="form-btn mr-3" id='btnAddEmpList' name='btnAddEmpList' onClick={addApprover}>{t('Add')} </CButton>
                                    <CButton className="form-btn ml-3" id='btnClose' name='btnClose' onClick={closeSearchEmp}>{t('Close')}</CButton>
                                </CCol>
                            }
                        </CModalBody>
                    </CModal>
                </div>
            )}
            {approverTable != "" &&
                <CCard className='table-panel'>
                    <CRow id="table">
                        <CCol lg="12">
                            <CCol lg="12">
                                <CRow alignHorizontal="end">
                                    <div id="lblApproverTotalRows" className="row-count-msg">{t('Total Rows').replace("%s", approverTable.length)}</div>
                                </CRow>
                            </CCol>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead id="thead-id">
                                        <tr width="100%">
                                            <th id="tblApproverNo" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('No')}
                                                </div>
                                            </th>
                                            <th id="tblApproverID" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Employee ID')}
                                                </div>
                                            </th>
                                            <th id="tblApproverName" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Employee Name')}
                                                </div>
                                            </th>
                                            <th id="tblApproverDepartment" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Department')}
                                                </div>
                                            </th>
                                            <th id="tblApproverPosition" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Position')}
                                                </div>
                                            </th>
                                            <th id="tblApproverStatus" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                    {t('Status')}
                                                </div>
                                            </th>
                                            <th id="tblRemove" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                <div style={{ display: "flex", alignItems: "center" }} className="text-nowrap text-left align-middle">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" style={{ cursor: "pointer" }} />
                                                    {t('Remove')}
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            approverTable.map((i, index) => {
                                                return (<Fragment key={index}>
                                                    <>
                                                        {i.employee_has_dept_position.map((sec, idx) => {
                                                            return (<Fragment key={idx}>
                                                                <tr key={index} width="100%">
                                                                    {idx == 0 && <>
                                                                        <td width="" className={approverTable.length - 1 === index
                                                                            ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"} style={{ textAlign: "right", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employee_has_dept_position.length}>
                                                                            {index + 1}
                                                                        </td>
                                                                        <td width="" className="" style={{ textAlign: "right", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employee_has_dept_position.length}>
                                                                            {i.employee_id}
                                                                        </td>
                                                                        <td width="" className="td-emp-id td-green" style={{ maxWidth: "300px", textAlign: "left" }} rowSpan={i.employee_has_dept_position.length}>
                                                                            {i.employee_name}
                                                                        </td>
                                                                    </>
                                                                    }
                                                                    <td width="" className="td-dept td-pink no-border-radius" style={{ maxWidth: "300px", textAlign: "left" }}>
                                                                        {sec.departments.department_name}
                                                                    </td>

                                                                    <td width="" className="" style={{ textAlign: "left", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                        {sec.positions.position_name}
                                                                    </td>
                                                                    {idx == 0 && <>
                                                                        <td width="" className="" style={{ textAlign: "left", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employee_has_dept_position.length}>
                                                                            {i.status}
                                                                        </td>
                                                                        {
                                                                            <td width="" id="removeData" className={approverTable.length - 1 === index ? "border-bottom-right-radius" : "td-role-name"} style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employee_has_dept_position.length}>
                                                                                <input
                                                                                    type="image"
                                                                                    id="removeData"
                                                                                    src={'avatars/remove.png'}
                                                                                    className="icon-clt"
                                                                                    alt="remove"
                                                                                    onClick={removeRow.bind(this, i)}
                                                                                />
                                                                            </td>
                                                                        }
                                                                    </>
                                                                    }
                                                                </tr>
                                                            </Fragment>
                                                            )
                                                        })
                                                        }
                                                    </>
                                                </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </CCol>
                    </CRow>
                    <br/>
                    <CRow lg="12">
                        <CCol style={{ textAlign: "center" }}>
                            <CButton className="form-btn" id='btnAdd' onClick={add}>{t('Add')}</CButton>
                        </CCol>
                    </CRow>
                </CCard>
            }
        </CCard>
    </>
    );
}
export default ApproverRegisterApproverList;
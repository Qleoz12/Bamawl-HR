
import React, { useEffect } from 'react';
import { CPagination, CModal, CModalBody, CRow, CButton, CCardBody, CCol, CImg, CLabel, CSelect, CCard, CModalHeader } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
/**
 * ApproverListConfirmation
 * 
 * @author  v_hao
 * @create_date  2021-05-06
 */
const ApproverListConfirmation = props => {
    let {
        addModalBox,
        addOnClose,
        successModal,
        removeMessage,
        errorModal,
        departmentAPI,
        deptState,
        deptChange,
        positionAPI,
        positionChange,
        positionState,
        positionRankAPI,
        positionRankChange,
        positionRankState,
        searchEmployeeAPI,
        rowCountEmployee,
        mainTableEmployee,
        AllCheck,
        change_checkbox,
        currentPageEmployee,
        totalPageEmployee,
        pageChangeEmployee,
        addToggleAlert,
        flagCount,
        viewPermissionAPI
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });
    return (
        <>
            {addModalBox === true && (
                <div>
                    <CModal size="xl" centered closeOnBackdrop={false} show={addModalBox}>
                        <CModalHeader>
                            <div>
                                <CLabel style={{ marginBottom: '0px', fontSize: "18px" }} id="lblEmployeeList">
                                    {t("Employee List")}
                                </CLabel><br />
                                {flagCount == true &&
                                    <CLabel style={{ marginBottom: '0px', color: "red" }}>
                                        {t("※ Please choose approver. Must have at least one approver!")}
                                    </CLabel>
                                }
                            </div>
                        </CModalHeader>
                        {
                            <CModalBody style={{ padding: "0rem" }}>
                                <CCardBody>
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
                                                    autoFocus={true}
                                                    disabled={viewPermissionAPI === false ? true : false}
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
                                                    disabled={viewPermissionAPI === false ? true : false}
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
                                            <CSelect className="bamawl-select" value={deptState} onChange={deptChange} custom>
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
                                                        return (<option key={index} name={item.position_rank} value={item.id}>{"Rank" + " " + item.position_rank} </option>)
                                                    })
                                                }
                                            </CSelect>
                                        </CCol>
                                    </CRow>
                                    <br />
                                    <CRow lg="12">
                                        <CCol style={{ textAlign: "center" }}>
                                            <CButton id="btnSearch" className="form-btn" onClick={searchEmployeeAPI}>{t('Search')}</CButton>
                                            {mainTableEmployee.length == 0 &&
                                                <CButton className="form-btn ml-3" id='btnClose' name='btnClose' onClick={addOnClose}>{t('Close')}
                                                </CButton>
                                            }
                                        </CCol>
                                    </CRow><br />
                                </CCardBody>
                                {mainTableEmployee != "" &&
                                    <CCard className='table-panel' style={{ margin: "18px" }}>
                                        <CRow alignHorizontal="end">
                                            <div style={{ marginRight: "15px" }} id="lblEmpTotalRows" className="row-count-msg">{t('Total Rows').replace("%s", rowCountEmployee)}</div>
                                        </CRow>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead id="thead-id">
                                                    {
                                                        <tr width="100%">
                                                            <th width="" className="" className="basicSalaryList tableTh" style={{ textAlign: 'center', verticalAlign: "middle" }}>
                                                                <input name="chkboxCheckAll" type="checkbox"
                                                                    id="chkboxCheckAll"
                                                                    value="all-check"
                                                                    checked={AllCheck === true}
                                                                    onChange={change_checkbox}
                                                                    style={{ cursor: "pointer" }} />
                                                            </th>
                                                            <th id="tblEmplyeeID" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                                                                    {t('Employee ID')}
                                                                </div>
                                                            </th>
                                                            <th id="tblEmployeeName" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                                                                    {t('Employee Name')}
                                                                </div>
                                                            </th>
                                                            <th id="tblEmail" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                                                                    {t('Email')}
                                                                </div>
                                                            </th>
                                                            <th id="tblDepartment" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                                                                    {t('Department')}
                                                                </div>
                                                            </th>
                                                            <th id="tblPositon" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                                                                    {t('Position')}
                                                                </div>
                                                            </th>
                                                            <th id="tblPositionRank" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }} >
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" className="basicSalaryList imgList" />
                                                                    {t('Position Rank')}
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    }
                                                </thead>
                                                <tbody >
                                                    {mainTableEmployee != "" &&
                                                        mainTableEmployee.map((i, index) => {
                                                            return (<Fragment key={index}>
                                                                <>
                                                                    {
                                                                        i.employee_has_dept_position.map((dec, idep) => {
                                                                            return (<Fragment key={idep}>
                                                                                <>
                                                                                    {
                                                                                        <tr width="100%">
                                                                                            {idep == 0 && <>
                                                                                                <td className={mainTableEmployee.length - 1 === index
                                                                                                    ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"} style={{ borderLeft: '3px solid #858BC3', textAlign: "center" }} rowSpan={i.employee_has_dept_position.length} >
                                                                                                    <input type="checkbox"
                                                                                                        value={i.employee_id}
                                                                                                        id={i.employee_id}
                                                                                                        checked={i.is_checked === true}
                                                                                                        onChange={change_checkbox}
                                                                                                    />
                                                                                                </td>
                                                                                                <td width="" className="td-emp-id" style={{ textAlign: "right" }} rowSpan={i.employee_has_dept_position.length}>
                                                                                                    {i.employee_id}
                                                                                                </td>
                                                                                                <td width="" className="td-emp-name" style={{ maxWidth: "300px", textAlign: "left" }} rowSpan={i.employee_has_dept_position.length}>
                                                                                                    {i.employee_name}
                                                                                                </td>
                                                                                                <td width="" className="td-emp-email" style={{ textAlign: "left" }} rowSpan={i.employee_has_dept_position.length}>
                                                                                                    {i.email}
                                                                                                </td>
                                                                                            </>
                                                                                            }
                                                                                            <td width="" className="td-dept td-pink no-border-radius" style={{ maxWidth: "150px", textAlign: "left" }}>
                                                                                                {dec.departments.department_name}
                                                                                            </td>
                                                                                            {<>
                                                                                                <td width="" className="td-emp-position no-border-radius" style={{ maxWidth: "150px", textAlign: "left" }}>
                                                                                                    {dec.positions.position_name}
                                                                                                </td>
                                                                                                <td width="" className={mainTableEmployee.length - 1 === index ? "border-bottom-right-radius" : "td-role-name"} style={{ textAlign: "right" }}>
                                                                                                    {dec.positions.position_rank}
                                                                                                </td>
                                                                                            </>
                                                                                            }
                                                                                        </tr>
                                                                                    }
                                                                                </>
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
                                                mainTableEmployee != "" && totalPageEmployee > 1 &&
                                                <CPagination
                                                    activePage={currentPageEmployee}
                                                    pages={totalPageEmployee}
                                                    onActivePageChange={(i) => pageChangeEmployee(i)}
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
                                <CRow lg="12">
                                    <CCol style={{ textAlign: "center", marginBottom: "17px" }}>
                                        {mainTableEmployee != "" &&
                                            <>
                                                <CButton className="form-btn mr-3" id='btnAdd' name='btnAdd' onClick={addToggleAlert}>{t('Add')}
                                                </CButton>
                                                <CButton className="form-btn ml-3" id='btnClose' name='btnClose' onClick={addOnClose}>{t('Close')}
                                                </CButton>
                                            </>
                                        }
                                    </CCol>
                                </CRow>
                            </CModalBody>
                        }

                    </CModal>
                </div>
            )}
        </>
    );
}
export default ApproverListConfirmation;

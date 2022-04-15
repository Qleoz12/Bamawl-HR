import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import DeleteEmployeeRoleRegistration from './DeleteEmployeeRoleRegistration';
import EmployeeRoleRegistrationSetRoleNameBox from './EmployeeRoleRegistrationSetRoleNameBox';
import SaveEmployeeRoleRegistration from './SaveEmployeeRoleRegistration';

const EmployeeRoleRegistrationTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {props.mainTable && props.mainTable.length > 0 &&
            <CCard className='table-panel emp-role-regis-card-border'>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12 pt-3">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{props.rowCount}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table purchase-order-list" aria-label="simple table">
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th id="chkCheckBox" width="" className="text-center emp-role-regis-tableTh">
                                            <input type="checkbox"
                                                value="all-check"
                                                checked={props.AllCheck === true}
                                                onChange={props.change_checkbox} />
                                        </th>
                                        <th id="tblNo" width="" className="text-left emp-role-regis-tableTh" >
                                            <CImg className="mr-2 emp-role-regis-img-title" src="avatars/titleicon.png" alt="titleicon" />
                                            {t('No')}
                                        </th>
                                        <th id="tblEmployeeID" width="" className="text-left emp-role-regis-tableTh" >
                                            <CImg className="mr-2 emp-role-regis-img-title" src="avatars/titleicon.png" alt="titleicon" />
                                            {t('Employee ID')}
                                        </th>
                                        <th id="tblEmployeeCode" width="" className="text-left emp-role-regis-tableTh" >
                                            <CImg className="mr-2 emp-role-regis-img-title" src="avatars/titleicon.png" alt="titleicon" />
                                            {t('Employee Code')}
                                        </th>
                                        <th id="tblEmployeeName" width="" className="text-left emp-role-regis-tableTh" >
                                            <CImg className="mr-2 emp-role-regis-img-title" src="avatars/titleicon.png" alt="titleicon" />
                                            {t('Employee Name')}
                                        </th>
                                        <th id="tblDepartment" width="" className="text-left emp-role-regis-tableTh" >
                                            <CImg className="mr-2 emp-role-regis-img-title" src="avatars/titleicon.png" alt="titleicon" />
                                            {t('Department')}
                                        </th>
                                        <th id="tblJoinedDate" width="" className="text-left emp-role-regis-tableTh" >
                                            <CImg className="mr-2 emp-role-regis-img-title" src="avatars/titleicon.png" alt="titleicon" />
                                            {t('Joined Date')}
                                        </th>
                                        <th id="tblRoleName" width="" className="text-left emp-role-regis-tableTh" >
                                            <CImg className="mr-2 emp-role-regis-img-title" src="avatars/titleicon.png" alt="titleicon" />
                                            {t('Role Name')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.mainTable.map((i, index) => {
                                            return (<Fragment key={index}>
                                                {i.departments.map((sec, idx) => {
                                                    return (
                                                        <tr key={idx} width="100%">
                                                            {idx === 0 && <>
                                                                <td id="chkCheckBox"
                                                                    className={props.mainTable.length - 1 === index
                                                                        ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"}
                                                                    rowSpan={i.departments.length}
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                    <input type="checkbox"
                                                                        value={i.employee_id}
                                                                        id={i.employee_id}
                                                                        checked={i.is_checked === true}
                                                                        onChange={props.change_checkbox}
                                                                    />
                                                                </td>
                                                                <td id="tblNo" className="td-num text-right" rowSpan={i.departments.length}
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                    {index + 1}
                                                                </td>
                                                                <td id="tblEmployeeID" width="" className="td-emp-id text-right" rowSpan={i.departments.length}
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                    {i.employee_id}
                                                                </td>
                                                                <td id="tblEmployeeCode" width="" className="td-emp-code text-left" rowSpan={i.departments.length}
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                    {i.employee_code}
                                                                </td>
                                                                <td id="tblEmployeeName" width="" className="td-green td-emp-name text-left" rowSpan={i.departments.length}
                                                                    >
                                                                    {i.employee_name}
                                                                </td>
                                                            </>}
                                                            <td id="tblDepartment" width="" className="td-dept td-pink text-left no-border-radius">
                                                                {sec.department_name}
                                                            </td>
                                                            {idx === 0 && <>
                                                                <td id="tblJoinedDate" width="" className="td-joined-date text-center" rowSpan={i.departments.length}
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                    {i.joined_date ? i.joined_date.substring(0,10) : ""}
                                                                </td>
                                                                <td id="tblRoleName" width=""
                                                                    className={props.mainTable.length - 1 === index
                                                                        ? "td-role-name text-left border-bottom-right-radius" : "td-role-name text-left"}
                                                                    rowSpan={i.departments.length}
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                    {i.role_name}
                                                                </td>
                                                            </>}
                                                        </tr>
                                                    )
                                                })}
                                            </Fragment>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
                <EmployeeRoleRegistrationSetRoleNameBox
                    roleAPI={props.roleAPI}
                    roleNameChange={props.roleNameChange}
                    roleNameState={props.roleNameState}
                />
                <CRow lg="12">
                    <CCol className="text-center">
                        <SaveEmployeeRoleRegistration
                            saveToggleAlert={props.saveToggleAlert}
                        />
                        <DeleteEmployeeRoleRegistration
                            deleteToggleAlert={props.deleteToggleAlert}
                        />
                        {/* Confirm Save  */}
                        <Confirmation
                            type={props.type}
                            content={props.content}
                            show={props.saveModalBox}
                            cancel={() => props.setSaveModalBox(!props.saveModalBox)}
                            saveOK={props.saveOK}
                            okButton={t('Ok')}
                            cancelButton={t('Cancel')}
                        />
                        {/* Confirm Save Overwrite  */}
                        <Confirmation
                            type={props.type}
                            content={props.content}
                            show={props.saveOverWriteModalBox}
                            cancel={() => props.setSaveOverWriteModalBox(!props.saveOverWriteModalBox)}
                            owsaveOK={props.saveOverWriteOK}
                            okButton={t('Ok')}
                            cancelButton={t('Cancel')}
                        />
                        {/* Confirm Delete  */}
                        <Confirmation
                            type={props.type}
                            content={props.content}
                            show={props.deleteModalBox}
                            cancel={() => props.setDeleteModalBox(!props.deleteModalBox)}
                            deleteOK={props.deleteOK}
                            okButton={t('Ok')}
                            cancelButton={t('Cancel')}
                        />
                    </CCol>
                </CRow>

            </CCard>
        }
    </>)
}
export default EmployeeRoleRegistrationTable;
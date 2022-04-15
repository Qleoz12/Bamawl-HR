import React ,{useEffect} from 'react';
import {CCol,CRow,CButton,CSelect,CLabel } from '@coreui/react';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import ViewPermision from '../../../brycen-common/constant/ViewPermission';

const SearchCalculationList=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);
    let {
        changeAutocomplete,
        selectAutocomplete,
        idArr,
        employeeID,
        codeArr,
        employeeCode,
        nameArr,
        employeeName,
        searchList,
        roleAPI,
        methodAPI,
        viewPermissionAPI
    } = props;
    return (<>
            <CRow >
                <CCol className="mb-4 verticle-line" lg="4">
                    <div className="search-form ">
                        <CLabel id="lblEmployeeID">
                        {t('Employee ID')}
                        </CLabel>
                        <br />
                        <Autocomplete
                            autoFocus={true}
                            id="txtEmployeeID"
							onChange={(i) => changeAutocomplete('id', i)}
							onSelect={selectAutocomplete}
							items={idArr}
							name={employeeID}
                            disabled={parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
						/>
                    </div>
                </CCol>
                <CCol className="mb-4 verticle-line" lg="4">
                    <div  className="search-form">
                        <CLabel id="lblEmployeeCode">
                        {t('Employee Code')}
                        </CLabel>
                        <br />
                        <Autocomplete
                            id="txtEmployeeCode"
							onChange={(i) => changeAutocomplete('code', i)}
							onSelect={(i) =>selectAutocomplete('code',i)}
							items={codeArr}
							name={employeeCode}
                            disabled={parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
						/>
                    </div>
                </CCol>
                <CCol className="mb-4" lg="4">
                    <div  className="search-form">
                        <CLabel id="lblEmployeeName">
                        {t('Employee Name')}
                        </CLabel>
                        <br />
                        <Autocomplete
                            id="txtEmployeeName"
							onChange={(i) => changeAutocomplete('name', i)}
							onSelect={(i) =>selectAutocomplete('name',i)}
							items={nameArr}
							name={employeeName}
                            disabled={parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
						/>
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12">
                <CCol lg="4" className="mb-4 verticle-line" >
                    <label id='lbDepartmentName'>{t('Department Name')}</label><br/>
                    <CSelect onChange={props.deptChange} value={props.deptState} id='dropDepartment' className="bamawl-select" custom>
                        <option key="" value="" >{t('---Select Department---')}</option>
                        {props.departmentAPI != "" &&
                        props.departmentAPI.map((dept,index)=>{
                            return(
                            <option key={index} value={dept.id}>{dept.department_name}</option>
                            )
                        })
                        }
                    </CSelect>
                </CCol>
                <CCol lg="4" className="mb-4 verticle-line">
                    <label id='lbRole'>{t('Role')}</label><br/>
                    <CSelect onChange={props.roleChange} value={props.roleState} id='dropRole' className="bamawl-select" custom>
                        <option key="" value="" >{t('---Select Role---')}</option>
                        {roleAPI != "" &&
                        roleAPI.map((role,index)=>{
                            return(
                            <option key={index} value={role.id} >{role.admin_level_name}</option>
                            )
                        })
                        }
                    </CSelect>
                </CCol>
                <CCol lg="4" className="mb-4">
                    <label id='lblMethods'>{t('Methods')}</label><br/>
                    <CSelect onChange={props.methodChange} value={props.methodState} id='dropMethods' className="bamawl-select" custom>
                        <option key="" value="" >{t('---Select Methods---')}</option>
                        {methodAPI != "" &&
                        methodAPI.map((i,index)=>{
                            return(
                            <option key={index} value={i.id}>{i.description}</option>
                            )
                        })
                        }
                    </CSelect>
                </CCol>
            </CRow>
            <CRow  className="mb-4">
                <CCol lg="5">
                    <CLabel>{t('Join Date (From)')}</CLabel>
                    <DatePicker id="dropFromDate" value={props.selectedFromDate} change={props.handleFromDateChange} />
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel>{t('Join Date (To)')}</CLabel>
                    <DatePicker id="dropToDate" value={props.selectedToDate} change={props.handleToDateChange} />
                </CCol>
            </CRow>
            <br/>
            <CRow alignHorizontal="center" className="mt-3 mb-4">
                <CButton className="form-btn" onClick={searchList} id='btnSearch'>{t('Search')}</CButton>
            </CRow>
            <br/>
         </>
    );
}
export default SearchCalculationList;

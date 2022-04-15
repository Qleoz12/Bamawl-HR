import React, { useEffect } from "react";
import EmployeeListSearchDepartmentRoleBox from './EmployeeListSearchDepartmentRoleBox';
import EmployeeListSearchEmployeeBox from './EmployeeListSearchEmployeeBox';
import EmployeeListSearchPersonalDetailsBox from './EmployeeListSearchPersonalDetailsBox';
import SearchEmployeeList from './SearchEmployeeList';

const EmployeeListSearchBox = (props) => {
    useEffect(() => { });

    return (
        <>
            <EmployeeListSearchEmployeeBox
                idArr={props.idArr}
                nameArr={props.nameArr}
                codeArr={props.codeArr}
                empID={props.empID}
                empCode={props.empCode}
                empName={props.empName}
                changeAutocomplete={props.changeAutocomplete}
                selectAutocomplete={props.selectAutocomplete}
                permission={props.permission}
                ViewPermission={props.ViewPermission}

            />
            <EmployeeListSearchDepartmentRoleBox
                selectedFromDate={props.selectedFromDate}
                handleFromDateChange={props.handleFromDateChange}
                selectedToDate={props.selectedToDate}
                handleToDateChange={props.handleToDateChange}
                removeFromDate={props.removeFromDate}
                removeToDate={props.removeToDate}

                roleAPI={props.roleAPI}
                roleState={props.roleState}
                roleChange={props.roleChange}

                departmentAPI={props.departmentAPI}
                deptState={props.deptState}
                deptChange={props.deptChange}

                eligibleData={props.eligibleData}
                eligibleState={props.eligibleState}
                eligibleChange={props.eligibleChange}
            />
            <EmployeeListSearchPersonalDetailsBox
                statusState={props.statusState}
                statusChange={props.statusChange}

                maritalStatusState={props.maritalStatusState}
                maritalStatusChange={props.maritalStatusChange}

                genderState={props.genderState}
                genderChange={props.genderChange}

                emailState={props.emailState}
                emailChange={props.emailChange}
            />
            <SearchEmployeeList searchAPI={props.searchAPI} />
        </>
    )

}
export default EmployeeListSearchBox;
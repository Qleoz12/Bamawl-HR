import ApiPath from "../../../views/brycen-common/api-path/ApiPath";
import { ApiRequest } from './ApiRequest';
import ViewPermision from './../../brycen-common/constant/ViewPermission';
export default {
    async loadViewPermission () {
        let params = {
            login_employee_id: ApiPath.loginEmp
        };
        let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            window.location.href = `${window.location.origin}/${ApiPath.customerName}/hr/401`;
        } else if (Number(response.data?.view_permission) === ViewPermision.ONLY_ME) {
            const urlCheck = [
                'bonus-register',
                'bonus-rate-list',
                'role-and-permission-registration',
                'company-leave-setting',
                'shift-normal-rule-register',
                'shift-normal-rule-list',
                'allowance-list',
                'allowance-register',
                'sub-allowance-register-list',
                'deduction-register',
                'deduction-list',
                'overtime-rate-setting',
                'overtime-rate-list' 
            ];
            const url = window.location.href;
            if (urlCheck.includes(url.substring(url.lastIndexOf('/') + 1))) {
                window.location.href = `${window.location.origin}/${ApiPath.customerName}/hr/401`;
            }
        }
        return response;
    }
};

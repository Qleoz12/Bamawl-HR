import axios from 'axios';
import {ApiResponseErrorHandler} from './ApiResponseErrorHandler';
import ApiPath from "../../../views/brycen-common/api-path/ApiPath";

/**
 * To make API request (GET,POST,PUT,PATCH,DELETE)
 *
 * @author  Zin Min Myat, Nay Zaw Linn
 * @create  06/04/2021
 * Parameter must be object type and must be following format
 * @param{
 *          "method": "post",               // api request method (get, post, put, patch, delete)
 *          "url": "api/user/lists",        // api url
 *          "params": { "key" : "value" }   // parameter object to pass api request
 *          "type": "blob"                  // (optional) use this when you need api response as blob type data
 *       }
 * @returns success:
 *              api response object
 *          error:
 *              error message with following format
 *              {
 *                "flag": false,   // to know api response has error
 *                "message": []    // api response error message as array
 *              }
 */
export const ApiRequest = async (value) => {

    let result, responseType, parameter, message, path = "", data;

    // Set the AUTH token for any request
    axios.interceptors.request.use(config => {
        const token = localStorage.getItem('TOKEN');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        config.headers.Accept = 'application/json';
        return config;
    });

    // handle error
    axios.interceptors.response.use(response => response, error => {
        
        // if status is 401 unauthenticated, remove session and redirect to login page
        if(error.response.status === 401){
            window.location.href = `${window.location.origin}/${ApiPath.customerName}/hr/401`;                                                
        }
        // if status is 500 
        else if(error.response.status === 500){
            // window.location.href = `${window.location.origin}/${ApiPath.customerName}/hr/500`;                                                
        }
        // if not 401 AND 500 AND 422, send error response to user page
        else if(error.response.status !== 500 && error.response.status !== 401 && error.response.status !== 422){
            window.location.href = `${window.location.origin}/${ApiPath.customerName}/hr/500`;           
        }
        else{
            throw error;
        }
    });

    // if value.package_name has data, get value.domain and check condition
    if(value.package_name !== undefined){
        // if package_name is erp, then call api with ERP domain
        if(value.package_name === "erp") path = process.env.REACT_APP_API_ERP_URL;
        // if package_name is wms, then call api with WMS domain
        if(value.package_name === "wms") path = process.env.REACT_APP_API_WMS_URL;
        // if package_name is hr, then call api with HR domain
        if(value.package_name === "hr") path = process.env.REACT_APP_API_HR_URL;
    }
    // if value.package_name hasn't data, get url path
    else{
        let url = window.location.href; // get project name from url (wms, erp, hr, etc)
        let name = url.split("/")[4]; // call different api domain based on url path

        // if name is erp, then call api with ERP domain
        if(name === "erp") path = process.env.REACT_APP_API_ERP_URL;
        // if name is wms, then call api with WMS domain
        if(name === "wms") path = process.env.REACT_APP_API_WMS_URL;
        // if name is hr, then call api with HR domain
        if(name === "hr") path = process.env.REACT_APP_API_HR_URL;
    }

    // to decide responseType is exists or not
    value.type !== undefined ? responseType = value.type : responseType = ''    
    let getPKName = value.package_name;
    if (getPKName !== undefined) {
        if (getPKName === "hr") {
            // set parameter based on api request method
            if (value.params instanceof FormData) {
                data = new FormData();
                let formData = new FormData();
                for (var key of value.params.entries()) {
                    formData.append(key[0], key[1]);
                }
                if (!formData.has('company_id')) formData.append("company_id", ApiPath.companyID);
                if (!formData.has('login_id')) formData.append("login_id", ApiPath.loginEmp);
                if (!formData.has('language')) formData.append("language", ApiPath.lang);
                data = formData;
            } else {
                if(value.method === 'get'|| value.method === 'delete'){
                    data = { ...value.params };
                    if(!value.url.includes('company_id')) data['company_id'] = ApiPath.companyID;
                    if(!value.url.includes('login_id')) data['login_id'] = ApiPath.loginEmp;
                    if(!value.url.includes('language')) data['language'] = ApiPath.lang;
                } else {                    
                    data = { ...value.params, company_id: ApiPath.companyID, login_id: ApiPath.loginEmp, language: ApiPath.lang };
                }
            }
        }
        else {
            data = { ...value.params }
        }
    }

    if(value.method === 'post' || value.method === 'patch' || value.method === 'put' || value.method === 'delete') {
        parameter = { baseURL: path, method: value.method, url: value.url, data: data, responseType };
    }else{
        parameter = { baseURL: path, method: value.method, url: value.url, params: data, responseType };
    }

    // calling api
    await axios(parameter).then(async (response) => {        
        // call api response error handler
        message = await ApiResponseErrorHandler(response);
        message === true ? result = response : result = { "flag": false, "message": message, "data": response };
    }).catch(async (error) => {
        // call api response error handler
        message = await ApiResponseErrorHandler(error.response);
        result = { "flag": false, "message": message, "data": error.response };
    });
    //check view permission = null
    if(value.url.includes(ApiPath.employeeByViewPermission)){
        if(result.flag === false){
            window.location.href = `${window.location.origin}/${ApiPath.customerName}/hr/401`;
        }
    }
    return result
};

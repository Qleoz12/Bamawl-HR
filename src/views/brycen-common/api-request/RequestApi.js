import axios from 'axios';
import {RequestApiErrorHandler} from './RequestApiErrorHandler';
/**
 * To make API request (GET,POST,PUT,PATCH,DELETE)
 *
 * @author  Zin Min Myat, Nay Zaw Linn
 * @create  06/04/2021
 * Parameter must be object type and must be following format
 * @param{
 *          "package_name": "erp",          // (optional) use other project's shortcode if necessary to call api from other project(erp, hr, wms)
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

    let result, responseType, parameter, message, url_string = [], path = "";
    let customer_name = window.location.href.split("/")[3]; // customer name in url
    let project_name = window.location.href.split("/")[4]; // project name in url
    
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
            window.location.href = `${window.location.origin}/${customer_name}/erp/Login`;
        }else if(error.response.status === 404){
            window.location.href = `${window.location.origin}/${customer_name}/${project_name}/404`;
        }
        else if(error.response.status === 500){
            // window.location.href = `${window.location.origin}/${customer_name}/${project_name}/500`;
        }else if(error.response.status === 403){
            window.location.href = `${window.location.origin}/${customer_name}/${project_name}/403`;
        }
        // if not 401, send error response to user page
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

    // add customer name in api url
    value.url.split("/").forEach((t, i) => {
        i === 0 ? url_string = [t, customer_name] : url_string.push(t);
    });
    let prefix_url = url_string.join("/"); //eg - api/demo/department/get-all-department

   
    // set parameter based on api request method
    if(value.method === 'post' || value.method === 'patch' || value.method === 'put' || value.method === 'delete') {
        parameter = { baseURL: path, method: value.method, url: prefix_url, data: value.params, responseType };
    }else{
        parameter = { baseURL: path, method: value.method, url: prefix_url, params: value.params, responseType };
    }

    // calling api
    await axios(parameter).then(async (response) => {
        // call api response error handler
        message = await RequestApiErrorHandler(response);
        message === true ? result = response : result = { "flag": false, "message": message, "data": response };
    }).catch(async (error) => {
        // call api response error handler
        message = await RequestApiErrorHandler(error.response);
        result = { "flag": false, "message": message, "data": error.response };
    });
    return result
};

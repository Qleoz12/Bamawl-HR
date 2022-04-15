/**
 * Login Form
 * @author Thin Thin Nwe
 * @create
 */

import React, { useState, useEffect } from 'react'
import message from '../../erp/erp-common/commonMessage'
import { withTranslation } from 'react-i18next'
import i18n from '../../../i18n';
import {reactLocalStorage} from 'reactjs-localstorage'
import { useHistory } from "react-router-dom";
import LoginDesign from './ComponentLogin'
import { ApiRequest } from '../../brycen-common/api-request/RequestApi';
import Loading from '../../brycen-common/loading/Loading';

function LegacyWelcomeClass({ t }) {

  const [ loading, setLoading ] = useState(true)
  const [ id, setId ] = useState([])
  const [ password, setPassword ] = useState([])
  const [ error, setError ] = useState([])
  let [ loginData, setLoginData ] = useState([])
  let [ compareArr , setCompareArr ] = useState({
    id: "",
    count : 0
  })
  let customer_name = window.location.href.split("/")[3];
  
  useEffect(() => {
    getData();
    localStorage.removeItem('PHOTO');
    localStorage.removeItem("PERMISSION")    
  }, []);
  
  // get data when form load
  const getData = () => {
    setLoading(false)
  }
  
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.name);
    reactLocalStorage.remove('LANGUAGE');
    reactLocalStorage.set('LANGUAGE',e.target.name);
    window.location.reload(false);
  }

  const history = useHistory();

  // type id or code in Employee Code OR ID text box
  const idChange = (e) => {
    setId(e.target.value.trim())
  }
  
  // type password in Password text box
  const passwordChange = (e) => {
    setPassword(e.target.value.trim())
  };

  // click login button
  const login = async() => {

    let err = []; setError([]);
    
    if(id.toString() === "") {
      err.push(t(message.JSE001).replace('%s', t('Employee Code OR ID')))
    }
    if(password.toString() === "") {
      err.push(t(message.JSE001).replace('%s', t('Password')))
    }
    
    // no error in validation
    if(err.length < 1) {
      setLoading(true)
      let data = {
        "employee_id" : id,
        "password" : password,
        'remember_me' : true,
        "device_flag" : "1"
      }
      let obj = { method: 'post', url: 'api/auth/login', params: data }      
      let response = await ApiRequest(obj);
      let result = response.data
      
      if(response.flag === false){
        let total_count = result.data.login_count
        if(result.data.active_status === 1) { // check active employee
          if(compareArr["id"] === id) { // compare old id and new id
            compareArr["count"] = compareArr["count"] + 1
          } else {
            compareArr["id"] = id
            compareArr["count"] = 1
          }         
        } else {
          compareArr["id"] = id
          compareArr["count"] = 1
          setError(response.message);
        }
        setCompareArr({
          id: compareArr["id"],
          count : compareArr["count"]
        })
        
        if(compareArr["count"] >= total_count) {
          let obj = { method: 'post', url: 'api/auth/account_lock', params: data }
          let response = await ApiRequest(obj);
          setLoading(false)
          if(response.flag === false){
            setError(response.message);
          }
        } else {
          setError(response.message);
        }
        setLoading(false)
      }else{
        setLoading(false)        
        let err = []
        let access_token = result.access_token
        localStorage.setItem('DEPARTMENT_ID', JSON.stringify(result.department_id));
        localStorage.setItem('POSITION_ID', JSON.stringify(result.position_id));
        localStorage.setItem('POSITION_RANK', JSON.stringify(result.position_rank));
        localStorage.setItem('DEPARTMENT_POSITION', JSON.stringify(result.dept_pos));
        let login_data = result.login_data
        localStorage.setItem("LOGIN_ID", login_data.login_id);
        localStorage.setItem("COMPANY_ID", login_data.company_id);
        localStorage.setItem("PHOTO", login_data.photo);
        localStorage.setItem("EMP_NAME", login_data.employee_name);
        localStorage.setItem("ROLE_ID", login_data.role_id);
        localStorage.setItem("TOKEN", access_token);
        if(response.data.status === "NG") {
          if(access_token === null || access_token === "") {
            err.push(response.data.message)
            setError(err)
          }
        } else {
          setError([])
          
          // For User Input URL Route Control
          loginData = {
            "login_id": login_data.login_id,
            "company_id": login_data.company_id,
            "role_id": login_data.role_id
          }
          let obj = { method: 'get', url: 'api/menus', params: loginData }
          let response = await ApiRequest(obj);
          if(response.flag === false){
            setError(response.message)
          }else{
            let permission = []
            let menu = response.data.menus
            let count = menu.length
            permission.push("500")
            permission.push("404")
            permission.push("403")
            permission.push("Dashboard")

            if(count > 0) {
              for(let i=0; i<count; i++) {
                if(menu[i].hasOwnProperty('_children')) {
                  let child_count = menu[i]['_children'].length;
                  for(let j=0; j<child_count; j++) {
                    permission.push(menu[i]['_children'][j].to.replace("/",""))
                  }
                } else {
                  permission.push(menu[i].route.replace("/",""))                  
                }
              }
            }

            let pkg_count = localStorage.getItem("TOTAL_PACKAGE");
            if(parseInt(pkg_count) > 0) {
              for(let j=0; j<pkg_count; j++) {
                let pkg_id = localStorage.getItem(`PACKAGE_ID${j}`);
                if(parseInt(pkg_id) === 1) {
                  permission.push("dashboard");
                  let obj = { package_name: 'hr', method: 'get', url: 'api/get-menu-list', 
                    params:{
                        "login_id" : localStorage.getItem("LOGIN_ID"),
                        "company_id": localStorage.getItem("COMPANY_ID"),
                        "expense_flag":true
                        } 
                    }
                  let response = await ApiRequest(obj);
                  if(response.flag !== false) {
                    let menu = response.data.menus
                    let count = menu.length
					          localStorage.setItem("HR_MENU_COUNT", count)
                    if(count > 0) {
                      for(let i=0; i<count; i++) {
                        if(menu[i].hasOwnProperty('_children')) {
                          let child_count = menu[i]['_children'].length;
                          for(let j=0; j<child_count; j++) {
                            permission.push(menu[i]['_children'][j].to.split("/").pop())
                          }                  
                        } else {
                          permission.push(menu[i].to.split("/").pop())                  
                        }
                      }
                    } else permission.push("NoPermissionPackage")
                  }
                }
              }
            }
            localStorage.setItem("PERMISSION", permission);
          }       

          if(access_token !== "") history.push(`/${customer_name}/erp/Dashboard`);

        }
      }
    } else {
      setError(err)
    }
  }

  // click Forget password link
  function forgotPassword() {
    history.push(`/${customer_name}/erp/ForgotPassword`)
  }

  return (
    <>
      <Loading start={loading} />
      
      <LoginDesign t={t} error={error} idChange={idChange} passwordChange={passwordChange}
        forgotPassword={forgotPassword} login={login} changeLanguage={changeLanguage}
      />
    </>
  )
}

export default withTranslation()(LegacyWelcomeClass)
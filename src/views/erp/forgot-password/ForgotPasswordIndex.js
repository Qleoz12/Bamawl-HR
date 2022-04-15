/**
 * Forget Password Form
 * @author Thin Thin Nwe
 * @create
 */

import React, { useState, useEffect } from 'react'
import message from '../../erp/erp-common/commonMessage'
import { useHistory } from "react-router-dom";
import ComponentForgotPassword from './ComponentForgotPassword'
import { ApiRequest } from '../../brycen-common/api-request/RequestApi';
import Loading from '../../brycen-common/loading/Loading';
import { withTranslation } from 'react-i18next'
import {reactLocalStorage} from 'reactjs-localstorage'

function LegacyWelcomeClass({ t }) {

  const [ loading, setLoading ] = useState(true)
  let [ error, setError ] = useState("")
  let [ success, setSuccess ] = useState([])
  let [ data, setData ] = useState([])
  let [ formChange, setFormChange ] = useState()
  const history = useHistory();
  let [ loginData, setLoginData ] = useState([])
  //use customize customer name 
  let customer_name = window.location.href.split("/")[3];
  
  useEffect(() => {
    getData();
  }, []);
  
  // get data when form load
  const getData = () => {
    setLoading(false)
    let loginData = {
      "login_id"  : reactLocalStorage.get('LOGIN_ID'),
      "company_id": reactLocalStorage.get('COMPANY_ID'),
      "language"  : reactLocalStorage.get('LANGUAGE')
    }
    setLoginData(loginData)
  }

  // password changing is ok go back to login form
  function ok() {
    history.push(`/${customer_name}/erp/Login`);
  }

  // get data when change input data
  const dataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim() // Trimming any whitespace
    });
  };

  // click Back button go back to login form
  function Back() {
    history.push(`/${customer_name}/erp/Login`);
  }

  // click Submit button
  const mailSubmit = async() => {
    
    let mail = ""
    let err = []
    
    if(!data.employee_id) {
      err.push(t(message.JSE001).replace('%s', t('Employee ID')))
    }
  
    if(!data.email) {

      err.push(t(message.JSE001).replace('%s', t('Email')))

    } else {      
      let e = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			mail = e.test(data.email);

			if(!mail) {
			  err.push(t(message.JSE008).replace("%s", t("Email")))
			}
    }

    if(err.length < 1) {
      setLoading(true)
      let forgot_data = {
        "employee_id" : data.employee_id,
        "email"       : data.email
      }
      forgot_data = {
        ...forgot_data, ...loginData
      }
      let obj = { method: 'post', url: 'api/password/create', params: forgot_data }
      let response = await ApiRequest(obj);
      setLoading(false)
      if(response.flag === false){
          setError(response.message); setSuccess([]); window.scrollTo(0,0);
      }else{
          let suc = []
          suc.push(response.data.message)
          setSuccess(suc)
          setFormChange("submit")
      }    
    } else {
      setError(err)
    }
  }

  return (
    <>
      <Loading start={loading} />

      <ComponentForgotPassword
        error={error} success={success} ok={ok} formChange={formChange}
        dataChange={dataChange} Back={Back} mailSubmit={mailSubmit} t={t}
      />    
    </>
  )
}

export default withTranslation()(LegacyWelcomeClass)
/**
 * Reset Password Form
 * @author Thin Thin Nwe
 * @create
 */

import React, { useState, useEffect } from 'react'
import message from '../../erp/erp-common/commonMessage'
import ComponentResetPassword from './ComponentResetPassword'
import { useHistory } from "react-router-dom";
import { ApiRequest } from '../../brycen-common/api-request/RequestApi';
import Loading from '../../brycen-common/loading/Loading';
import { withTranslation } from 'react-i18next'
import {reactLocalStorage} from 'reactjs-localstorage'
import { validatePwd } from '../../erp/erp-common/commonValidation'

function LegacyWelcomeClass({ t }) {

  const [ loading, setLoading ] = useState(true)
  let [ error, setError ] = useState([])
  let [ data, setData ] = useState([])
  const history = useHistory();
  let [ loginData, setLoginData ] = useState([])
  const [ form_data, setFormData ] = useState({
    eye_type: 'eye-open.svg',
    eye_value: 0,
    input_type: 'password',
  });
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
 
  // get data when change input data
  const dataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim() // Trimming any whitespace
    });
  };

  // click Submit button
  const Submit = async() => {
    let err = []

    if(!data.password) {
      err.push(t(message.JSE001).replace('%s', t('New Password')))
    }
    // If password is less than 8, store error message
    else if(data.password.length < 8){
      err.push(t(message.JSE019).replace('%s', t('Password')))
    }
    else if(!validatePwd(data.password)){
      err.push(t(message.JSE008).replace('%s', t('Password')))
    }

    if(!data.confirmPassword) {
      err.push(t(message.JSE001).replace('%s', t('Confirm Password')))
    }
    
    if(data.password && data.confirmPassword) {
      if(data.password !== data.confirmPassword) {
        err.push(t(message.JSE009).replace())
      }
    }

    if(!data.email) {
      err.push(t(message.JSE001).replace('%s', t('Email')))
    } else {
      let mail = ""
      let e = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			mail = e.test(data.email);

			if(!mail) {
        err.push(t(message.JSE008).replace("%s", t("Email")))
			}
    }
    
    if(!data.token) {
      err.push(t(message.JSE001).replace('%s', t('Token')))
    }    

    if(err.length < 1) {
        setLoading(true)
        let reset_data = {
          "email" :  data.email,
          "password": data.password,
          "password_confirmation": data.confirmPassword,
          "token": data.token
        }
        reset_data = {
          ...reset_data, ...loginData
        }
        let obj = { method: 'post', url: 'api/password/reset', params: reset_data }
        let response = await ApiRequest(obj);
        setLoading(false)
        if(response.flag === false){
            setError(response.message); window.scrollTo(0,0);
        }else{
            setError([])
            history.push(`/${customer_name}/erp/Login`);
        } 
    } else {
      setError(err)
    }
  }
  
  /*** generate password method
    * @ref  Nay Zaw Linn
  */
  const generatePassword = () => {
      const six = 6; const eight = 8;
      let string = "abcdefghijklmnopqrstuvwxyz";
      let numeric = '0123456789';
      let special = '@$!%*#?&^~';
      let result = "", password = "";
  
      for ( let i = six; i < eight; i++ ) {
          result += string.charAt(Math.floor(Math.random() * string.length));
          result += string.toUpperCase().charAt(Math.floor(Math.random() * string.length));
          result += special.charAt(Math.floor(Math.random() * special.length));
          result += Math.ceil(numeric.length * Math.random() * Math.random());
      }
      password = result.split('').sort(()=>{return 0.5-Math.random()}).join('');
      setData({...data, password: password, confirmPassword: password});
  }

  const click_eye = () => {
    // if 0, type is password, (or) type is text
    if(form_data.eye_value === 0){
        setFormData({...form_data, input_type: 'text', eye_value: 1, eye_type: 'eye-close.svg'});
    }else{
        setFormData({...form_data, input_type: 'password', eye_value: 0, eye_type: 'eye-open.svg'});
    }
  }

  return (
    <>
      <Loading start={loading} />

      <ComponentResetPassword
        error={error} dataChange={dataChange} Submit={Submit} t={t} click_eye={click_eye}
        generatePassword={generatePassword} data={data} form_data={form_data}
      />
    </>
  )
}

export default withTranslation()(LegacyWelcomeClass)
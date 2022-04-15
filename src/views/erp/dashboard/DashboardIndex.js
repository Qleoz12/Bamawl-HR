/**
 * Dashboard Form
 * @author Thin Thin Nwe
 * @create 09/15/2021  mm/dd/yyyy
*/

import React, { useEffect, useState } from "react";
import { withTranslation } from 'react-i18next'
import ComponentDashboard from './ComponentDashboard'
import {reactLocalStorage} from 'reactjs-localstorage'
import { ApiRequest } from '../../brycen-common/api-request/RequestApi';

function LegacyWelcomeClass({ t }) {
  const [loading, setLoading] = useState(true);
  let [ error, setError ]     = useState([]);
  let [ empData, setEmpData ] = useState([]);

  useEffect(() => {
    // get data when form load
    const getData = async() => {
      let loginData = {
        "login_id"  : reactLocalStorage.get('LOGIN_ID'),
        "company_id": reactLocalStorage.get('COMPANY_ID'),
        "language"  : reactLocalStorage.get('LANGUAGE')
      }
      let obj = { method: 'get', url: 'api/dashboard', params: loginData }
      let response = await ApiRequest(obj);
      setLoading(false)
      if(response.flag === false){
        setError(response.message); window.scrollTo(0,0);
      }else{
        setEmpData(response.data.data)
      }
    }  
    getData()    
  }, []);
  
  return (
    <ComponentDashboard empData={empData}
    />
  );
};

export default withTranslation()(LegacyWelcomeClass)
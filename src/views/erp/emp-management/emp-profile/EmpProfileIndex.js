/**
 * Employee Profile Form
 * @author Thin Thin Nwe
 * @create
*/

import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi'
import Message from '../../../brycen-common/message/Message'
import ComponentEmpProfile from './ComponentEmpProfile'
import {reactLocalStorage} from 'reactjs-localstorage'

function LegacyWelcomeClass({ t }) {

  const [ loading, setLoading ]       = useState(true);
  let [ empData, setEmpData ]         = useState([])
  let [ deptPosData, setDeptPosData ] = useState([])
  let [ error, setError ]             = useState([])
  let [ success, setSuccess ]         = useState([])
  let [ address, setAddress ]         = useState([])
  let [ areaData, setAreaData ]       = useState([])
  let [ pkgData, setPkgData ]         = useState([])

  useEffect(() => {
    getData();
  }, []);
  
  // get data when form load
  async function getData() {
    let id = localStorage.getItem("EMP_ID");
    if(id) {
      localStorage.removeItem("EMP_ID");
    } else id = localStorage.getItem('LOGIN_ID')   

    let loginData = {
      "login_id"  : reactLocalStorage.get('LOGIN_ID'),
      "company_id": reactLocalStorage.get('COMPANY_ID'),
      "role_id"   : reactLocalStorage.get('ROLE_ID'),
      "language"  : reactLocalStorage.get('LANGUAGE')
    }
    let obj = { method: 'get', url: `api/emp_profile/${id}`, params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
      setEmpData([]); setError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
      setError([]); setSuccess([]);
      setEmpData(response.data.employee_info)
      setDeptPosData(response.data.dept_pos)
      setAddress(response.data.employee_info.address)
      setAreaData(response.data.employee_info.areas)
      setPkgData(response.data.employee_info.packages)
    }
  }

  return (
    <>
      {
        loading &&
        <div id="overlay">
          <div className="shapeshifter play" style={{ backgroundImage: `url(${'/image/sprite_60fps.svg'})` } } ></div>
        </div>
      }

      <Message error={error} success={success} error2={[]} />

      {
        error.length === 0 &&
        <ComponentEmpProfile
          empData={empData} address={address} deptPosData={deptPosData}
          areaData={areaData} pkgData={pkgData}
        />
      }
    </>
  )
}

export default withTranslation()(LegacyWelcomeClass)
/**
 * Employee Assign Department and Position Form
 * @author Aye Min Aung
 * @create
*/

import React, { useEffect, useState } from "react";
import "./employeeassign.scss";
import message from "../../../erp/erp-common/commonMessage";
import { withTranslation } from 'react-i18next'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import ComponentSearch from './ComponentSearch'
import ComponentDepPosition from './ComponentDepPosition'
import {reactLocalStorage} from 'reactjs-localstorage'

function LegacyWelcomeClass({ t }) {
  const [loading, setLoading] = useState(false);
  let [empId, setEmpId] = useState("");
  let [empName, setEmpName] = useState("");
  let [dept, setDept] = useState([]);
  let [post, setPost] = useState([]);
  let [selectedPos, setSelectedPos] = useState("");
  let [selectedDep, setSelectedDep] = useState("");
  let [mainResponse, setMainResponse] = useState("");
  let [empTable, setEmpTable] = useState([]);
  let [delDepId, setDelDepId] = useState("");
  let [delPosId, setDelPosId] = useState("");
  let [const_value] = useState(0);
  let [errors, setErrors] = useState([]);
  let [success, setSuccess] = useState([]);
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [show, setShow] = useState(false);
  let [ loginData, setLoginData ] = useState([])
  let [ loginPermission, setLoginPermission ] = useState([])  
  
  useEffect(() => {
    getData();    
  }, []);
  
  const getData = () => {
    let loginData = {
      "login_id"  : reactLocalStorage.get('LOGIN_ID'),
      "company_id": reactLocalStorage.get('COMPANY_ID'),
      "role_id"   : reactLocalStorage.get('ROLE_ID'),
      "language"  : reactLocalStorage.get('LANGUAGE')
    }
    setLoginData(loginData)
  }

  // click search button
  const searchEmpData = async() => {
    let err = [];
    if (empId === "") {
      err.push(t(message.JSE001).replace("%s", t("Employee ID")))
      setErrors(err);
    } else {
      setErrors([]);      
      setLoading(true);
      let obj = { method: 'get', url: `api/emp_assign_dept_pos/${empId}`, params: loginData }
      let response = await ApiRequest(obj);
      setLoading(false)
      if(response.flag === false){
        setEmpName(""); setErrors(response.message); setSuccess([]); window.scrollTo(0,0);
      }else{        
        setMainResponse(response.data);
        setEmpName(response.data.employee_name);
        setEmpTable(response.data.dept_pos);
        setDept(response.data.departments);
        setPost(response.data.positions);
      }
      
      /*****     show/ hide action button by login user permission     *****/
      let getPermission = {
        ...loginData,
        "page_name" : "Employee Assign Department & Position"
      }
      obj = { method: 'get', url: 'api/specific_permission', params: getPermission }
      response = await ApiRequest(obj);
      if(response.flag === false){
        setErrors(response.message); window.scrollTo(0,0);
      } else {
        let permit = response.data.permission
        permit.forEach((per, i) => {
          permit[i] = per["display_name"]        
        });
        setLoginPermission(permit)
      }
    }    
  }

  //table refresh after adding dep & post
  const updateEmpData = async() => {
    if (empId.length > 0) {
      setLoading(true);
      let obj = { method: 'get', url: `api/emp_assign_dept_pos/${empId}`, params: loginData }
      let response = await ApiRequest(obj);
      setLoading(false)
      if(response.flag === false){
          setErrors(response.message); setSuccess([]); window.scrollTo(0,0);
      }else{
          setEmpTable(response.data.dept_pos); setErrors([]);
      }
    }
  }

  // department change in form
  const deptChange = async(e) => {
    let value = e.target.value;
    setSelectedDep(value);
    setSelectedPos("");
    setPost(mainResponse.positions);
    
    if (value > 0) {
      let obj = { method: 'get', url: `api/get_dept_pos/${value}`, params: loginData }
      let response = await ApiRequest(obj);
      if(response.flag === false){
        setErrors(response.message); setSuccess([]); window.scrollTo(0,0);
      }else{
        setPost(response.data[0].positions); setErrors([]);
      }
    }
  }

  // Start Add Dept & Position Function
  let addDepPost = () => {
    let err = [];
    if (selectedDep === "") {
      err.push(t(message.JSE002).replace("%s", t("at least one Department")))
    }
    if (selectedPos === "") {
      err.push(t(message.JSE002).replace("%s", t("at least one Position")))
    }
    if (err.length > 0) {
      setErrors(err);
      setSuccess([]);
      window.scrollTo(0, 0);
    } else {
      setErrors("");
      setSuccess([]);
      setType('save'); setContent(t('Are you sure want to save?')); setShow(!show);
    }
  }
  
  let saveOK = async() => {    
    setShow(!show); setType(''); setContent('');
    setLoading(true)
    let data = {
      employee_id: empId,
      department_id: selectedDep,
      position_id: selectedPos,
    }
    data = {
      ...data, ...loginData
    }
    let obj = { method: 'post', url: `api/emp_assign_dept_pos`, params: data }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setErrors(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
        setErrors([]);
        let suc = []
        suc.push(response.data.message)
        setSuccess(suc);
        updateEmpData();
        dataReset();
    }
    window.scrollTo(0, 0);
  }  
  // End Add Dept & Position Function

  // clear data
  function dataReset() {
    setSelectedPos("");
    setSelectedDep("");
  }
  
  // Start Delete Function
  const deleteDepPos = () => {
    setContent(t('Are you sure want to delete?')); setType('delete');
    setShow(!show); setErrors([]); setSuccess([]);
  }
  
  const deleteOK = async () =>{
    setShow(!show); setContent(''); setType('');
    setLoading(true);
    let data = {
      "employee_id": empId,
      "department_id": delDepId,
      "position_id": delPosId,
    }
    data = {
      ...data, ...loginData
    }
    let obj = { method: 'post', url: `api/emp_assign_dept_pos/forcedelete`, params: data }
    let response = await ApiRequest(obj);
    setLoading(false);
    if(response.flag === false){
        setErrors(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
        setErrors([]);        
        let suc = []
        suc.push(response.data.message)
        setSuccess(suc);
        dataReset();
        updateEmpData();
    }
    window.scrollTo(0, 0);
  }
  // End Delete Function

  return (
    <>
      <Loading start={loading} />

      <Message success={success} error={errors} error2={[]} />
      
      <Confirmation
          content={content}
          okButton={t('Ok')}
          cancelButton={t('Cancel')}
          type={type}
          show={show}
          cancel={()=>setShow(!show)}
          saveOK={saveOK}
          deleteOK={deleteOK}
      />

      <ComponentSearch t={t} setEmpId={setEmpId} setDept={setDept} setPost={setPost}
        setEmpName={setEmpName} setSelectedDep={setSelectedDep}
        setSelectedPos={setSelectedPos} searchEmpData={searchEmpData}
      />      

      <ComponentDepPosition t={t} empName={empName} selectedDep={selectedDep}
        deptChange={deptChange} const_value={const_value} dept={dept}
        selectedPos={selectedPos} setSelectedPos={setSelectedPos} post={post}
        addDepPost={addDepPost} empTable={empTable} setDelPosId={setDelPosId}
        setDelDepId={setDelDepId} deleteDepPos={deleteDepPos}
        loginPermission={loginPermission}
      />
    </>
  );
};

export default withTranslation()(LegacyWelcomeClass)
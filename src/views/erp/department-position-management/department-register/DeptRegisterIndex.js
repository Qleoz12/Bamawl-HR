/**
 * Department Register Form
 * @author Thin Thin Nwe
 * @create
*/

import React, { useEffect, useState} from 'react'
import './dept-register.scss'
import message from '../../../erp/erp-common/commonMessage'
import { withTranslation } from 'react-i18next'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import ComponentDeptRegister from './ComponentDeptRegister'
import {reactLocalStorage} from 'reactjs-localstorage'

function LegacyWelcomeClass({ t }) {

  const [loading, setLoading] = useState(true);
  let [ number, setNumber ] = useState(0)
  let [ deptTable, setDeptTable ] = useState([])
  let [ deptData, setDeptData ] = useState({
    parent_id: "",
    department_code : "",
    department_name : ""
  })
  let [ total, setTotal ] = useState("")
  let [ error, setError ] = useState([])
  let [ error2, setError2 ] = useState([])
  let [ success, setSuccess ] = useState([])
  let [ btnSaveEdit, setBtnSaveEdit ] = useState('Save')
  const [ currentPage, setCurrentPage] = useState(1)
  const [ lastPage, setLastPage ] = useState()
  let [ deleteId, setDeleteId ] = useState(0)
  let [ flag, setFlag ] = useState(false)
  let [ parentRoot, setParentRoot ] = useState([])
  let [ editID, setEditID ] = useState("")
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [show, setShow] = useState(false);
  let [ loginData, setLoginData ] = useState([])
  let [ loginPermission, setLoginPermission ] = useState([])

  useEffect(() => {
    getData();    
  }, []);

  // get data when form load
  const getData = async() => {
    let loginData = {
      "login_id"  : reactLocalStorage.get('LOGIN_ID'),
      "company_id": reactLocalStorage.get('COMPANY_ID'),
      "role_id"   : reactLocalStorage.get('ROLE_ID'),
      "language"  : reactLocalStorage.get('LANGUAGE')
    }
    setLoginData(loginData)
    let obj = { method: 'get', url: 'api/dept_reg', params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setError2(response.message); setParentRoot([]); window.scrollTo(0,0);
    }else{
      let dept = response.data.dep_info
      setDeptTable(dept.data)
      setParentRoot(response.data.parent_root)
      setCurrentPage(dept.current_page)
      setLastPage(dept.last_page)      
      setNumber(dept.from)
      setTotal(dept.total)
    }
    
    /*****     show/ hide action button by login user permission     *****/
    let getPermission = {
      ...loginData,
      "page_name" : "Department Register"
    }
    obj = { method: 'get', url: 'api/specific_permission', params: getPermission }
    response = await ApiRequest(obj);
    if(response.flag === false){
      setError(response.message); window.scrollTo(0,0);
    } else {
      let permit = response.data.permission
      permit.forEach((per, i) => {
        permit[i] = per["display_name"]        
      });
      setLoginPermission(permit)
    }
  }

  // data change in form
  const dataChange = (e) => {
    setDeptData({
      ...deptData,
      [e.target.name]: e.target.value
    })
  }
  
  let Save = (event) => {
    event.preventDefault()
    let err = []
    if(!deptData.department_code) {
      err.push(t(message.JSE001).replace('%s', t('Department Code')))
    }
    if(!deptData.department_name) {
      err.push(t(message.JSE001).replace('%s', t('Department Name')))
    }    
    
    if(err.length > 0){
      setError(err); setSuccess([]); window.scrollTo(0,0);
    }else{
        setError([]); setError2([]); setSuccess([]);
        (editID === "") ?
          setContent(t('Are you sure want to save?'))
        : setContent(t('Are you sure want to update?'))
        setType('save'); setShow(!show);
    }
  }

  // click save or update button
  const saveOK = async() =>{
    setShow(!show); setType(''); setContent('');
    setLoading(true);
    let saveDeptData = {      
        "parent_id" : deptData.parent_id,
        "department_code" : deptData.department_code,
        "department_name" : deptData.department_name
        , ...loginData
    }
    let updateDeptData = {      
      "parent_id"   : deptData.parent_id,
      "parent_root" : deptData.parent_root,
      "department_code" : deptData.department_code,
      "department_name" : deptData.department_name
      , ...loginData
    }
    let obj = {}
    if(editID === "") {      
      obj = { method: 'post', url: 'api/dept_reg' , params: saveDeptData }           
    } else {
      obj = { method: 'put', url: `api/dept_reg/${editID}` , params: updateDeptData }     
    }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
      setError(response.message); setSuccess([]); window.scrollTo(0,0);
    } else{
      setBtnSaveEdit("Save")
      setEditID("");
      setError([]);
      let suc = []
      suc.push(response.data.message)
      setSuccess(suc);
      setFlag(false)
      getData()
      document.getElementById("dept_register").reset();
      setDeptData({
        department_code : "", department_name : ""
      })
    }    
    window.scrollTo(0,0);
  }
  
  // click edit button
  const editDepartment = async(id) =>{
    setSuccess([]); setError([])
    setEditID(id)
    setLoading(true)
    let obj = { method: 'get', url: `api/dept_reg/${id}`, params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    window.scrollTo(0,0);
    if(response.flag === false){
        setError(response.message); setEditID(""); setSuccess([]);
    }else{
      setFlag(true)
      document.getElementById("dept_register").reset();
      let edit = response.data
      setDeptData(edit)
      setBtnSaveEdit("Update")
    }
  }

  // click delete button start
  let deleteData = (id) => {
    if(id) {
      setContent(t('Are you sure want to delete?'));
      setType('delete'); setShow(!show); setError([]); setSuccess([]);
      setDeleteId(id)
    }
  }

  const deleteOK = async() =>{
    if(deleteId !== "") {
      setLoading(true)      
      setShow(!show); setContent(''); setType('');
      let obj = { method: 'delete', url: `api/dept_reg/${deleteId}`, params: loginData }
      let response = await ApiRequest(obj);
      setLoading(false)
      if(response.flag === false){
          setError(response.message); setSuccess([]); window.scrollTo(0,0);
      }else{
          setError([]);
          let succ = []
          succ.push(response.data.message)
          setSuccess(succ);
          setFlag(false)
          document.getElementById("dept_register").reset();
          setDeptData({
            parent_id: "", department_code : "", department_name : ""
          })
          setTotal("")
          getData()
          window.scrollTo(0,0);
      }
    }   
    window.scrollTo(0,0);
  }
  // click delete button end
  
  // table paging
  const setActivePage = async(i) => {
    setCurrentPage(i)
    setLoading(true)    
    let obj = { method: 'get', url: `api/dept_reg?page=${i}`, params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{      
      let dept = response.data.dep_info
      setDeptTable(dept.data)
      setLastPage(dept.last_page)
      setCurrentPage(dept.current_page)
      setNumber(dept.from)
    }
  }

  return (
    <>
      <Loading start={loading} />
      
      <Message success={success} error={error} error2={error2} />

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
        
      <ComponentDeptRegister t={t} deptData={deptData} dataChange={dataChange}
        flag={flag} parentRoot={parentRoot} Save={Save} btnSaveEdit={btnSaveEdit}
        deptTable={deptTable} number={number} deleteData={deleteData}
        editDepartment={editDepartment} lastPage={lastPage} currentPage={currentPage}
        setActivePage={setActivePage} loginPermission={loginPermission} total={total}
      />      
    </>
  );
}

export default withTranslation()(LegacyWelcomeClass)
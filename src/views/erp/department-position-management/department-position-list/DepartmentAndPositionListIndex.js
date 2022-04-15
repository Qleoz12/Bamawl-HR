/**
 * Department And Position List Form
 * @author Thin Thin Nwe
 * @create
*/

import React, { useEffect, useState } from 'react'
import './dept&positionList.scss'
import message from '../../../erp/erp-common/commonMessage'
import { withTranslation } from 'react-i18next'
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import ComponentDeptAndPositionList from './ComponentDeptAndPositionList'
import {reactLocalStorage} from 'reactjs-localstorage'

function LegacyWelcomeClass({ t }) {

  const [ loading, setLoading ] = useState(true);
  let [ number, setNumber ] = useState(0)
  let [ total, setTotal ] = useState("")
  let [ deptPosTable, setDeptPosTable ] = useState([])
  let [ deptPosition, setDeptPosition ] = useState([])
  let [ department, setDepartment ] = useState([])
  let [ position, setPosition ] = useState([])
  let [ error, setError ] = useState([])
  let [ error2, setError2 ] = useState([])
  let [ success, setSuccess ] = useState([])
  const [ currentPage, setCurrentPage] = useState(1)
  const [ lastPage, setLastPage ] = useState()
  let [ deleteId, setDeleteId ] = useState({
    department_id: "",
    position_id : ""
  })
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
    let obj = { method: 'get', url: 'api/dept_pos', params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setError2(response.message); window.scrollTo(0,0);
        if(response.data.data.departments.length > 0) {
          setDepartment(response.data.data.departments)
        }
        if(response.data.data.positions.length > 0) {
          setPosition(response.data.data.positions)
        }
    }else{      
      setDeptPosTable(response.data.dep_pos_data.data)
      setDepartment(response.data.departments)
      setPosition(response.data.positions)
      setCurrentPage(response.data.dep_pos_data.current_page)
      setLastPage(response.data.dep_pos_data.last_page)
      setNumber(response.data.dep_pos_data.from)
      setTotal(response.data.dep_pos_data.total)
    }
    
    /*****     show/ hide action button by login user permission     *****/
    let getPermission = {
      ...loginData,
      "page_name" : "Department & Position List"
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
    setDeptPosition({
      ...deptPosition,
      [e.target.name]: e.target.value.trim()
    })
  }

  /** Start Save Function */
  let Save = async(event) => {
    event.preventDefault()
    let err = []
    if(!deptPosition.department_id || deptPosition.department_id === "0") {
      err.push(t(message.JSE004).replace('%s', t('Department Name')))
    }
    if(!deptPosition.position_id || deptPosition.position_id === "0") {
      err.push(t(message.JSE004).replace('%s', t('Position Name')))
    }
    
    if(err.length > 0) {
      setError(err); setSuccess([]); window.scrollTo(0,0);
    } else {
      setError([]); setError2([]); setSuccess([]); setType('save');
      setContent(t('Are you sure want to save?')); setShow(!show);
    }
  }
  
  const saveOK = async() =>{
    setShow(!show); setType(''); setContent('');
    setLoading(true)
    deptPosition = {
      ...deptPosition, ...loginData
    }
    let obj = { method: 'post', url: 'api/dept_pos', params: deptPosition }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
        setError([]);
        let suc = []
        suc.push(response.data.message)
        setSuccess(suc);
        getData()
        setDeptPosition([])
        document.getElementById("dept_pos_register").reset();
    }
    window.scrollTo(0,0);
  }
  /** End Save Function */

  /** Start Delete Function */
  let deleteData = (deptId, posId) => {
    setContent(t('Are you sure want to delete?'));
    setType('delete'); setShow(!show); setError([]); setSuccess([]);
    setDeleteId({
      department_id : deptId,
      position_id : posId
    })
  }

  const deleteOK = async() =>{
    if(deleteId !== "") {
      setLoading(true)      
      setShow(!show); setContent(''); setType('');
      deleteId = {
        ...deleteId, ...loginData
      }
      let obj = { method: 'post', url: 'api/dept_pos/deleteDeptPos', params: deleteId }
      let response = await ApiRequest(obj);
      setLoading(false)
      if(response.flag === false){
          setError(response.message); setSuccess([]); window.scrollTo(0,0);
      }else{
          setError([]);
          let succ = []
          succ.push(response.data.message)
          setSuccess(succ);          
          setDeptPosition([])
          setTotal("")
          document.getElementById("dept_pos_register").reset();
      }
      getData()
    }   
    window.scrollTo(0,0);
  }

  // table paging
  const setActivePage = async(i) => {
    setCurrentPage(i)
    setLoading(true)    
    let obj = { method: 'get', url: `api/dept_pos?page=${i}`, params: loginData }
    let response = await ApiRequest(obj);
    if(response.flag === false){
        setError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
      setLoading(false)
      setDeptPosTable(response.data.dep_pos_data.data)
      setDepartment(response.data.departments)
      setPosition(response.data.positions)
      setCurrentPage(response.data.dep_pos_data.current_page)
      setLastPage(response.data.dep_pos_data.last_page)
      setNumber(response.data.dep_pos_data.from)
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
      
      <ComponentDeptAndPositionList t={t} dataChange={dataChange} department={department}
        position={position} Save={Save} deptPosTable={deptPosTable}
        deleteData={deleteData} lastPage={lastPage} currentPage={currentPage}
        setActivePage={setActivePage} number={number} loginPermission={loginPermission}
        total={total}
      />
    </>
  )
}

export default withTranslation()(LegacyWelcomeClass)
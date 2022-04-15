/**
 * Employee List Form
 * @author Thin Thin Nwe
 * @create
*/

import React, { useState, useEffect } from 'react'
import './emp-list.scss'
import { useHistory } from "react-router-dom";
import { withTranslation } from 'react-i18next'
import ComponentEmployeeList from './ComponentEmployeeList';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Loading from '../../../brycen-common/loading/Loading';
import {reactLocalStorage} from 'reactjs-localstorage'

function LegacyWelcomeClass({ t }) {

  const [ loading, setLoading ] = useState(true);
  let [ employeeData, setEmployeeData ] = useState([])
  let [ employeeTable, setEmployeeTable ] = useState([])
  let [ deptList, setDeptList ] = useState([])
  let [ posList, setPosList ] = useState([])
  let [ number, setNumber ] = useState(0)
  let [ total, setTotal ] = useState("")
  const [ currentPage, setCurrentPage] = useState(1)
  const [ lastPage, setLastPage ] = useState()
  const [ modalPermission, setModalPermission ] = useState(false)
  const [ modalData, setModalData ] = useState([])
  let [ error, setError ] = useState([])
  let [ success, setSuccess ] = useState([])
  let [ deleteId, setDeleteId ] = useState(0)
  let [ resignId, setResignId ] = useState(0)
  let [ rehireId, setRehireId ] = useState(0)
  const history = useHistory();
  const [ content, setContent ] = useState('');
  const [ type, setType ] = useState('');
  const [ show, setShow ] = useState(false);
  let [ loginData, setLoginData ] = useState([])
  let [ loginPermission, setLoginPermission ] = useState([])
  //use customize customer name 
  let customer_name = window.location.href.split("/")[3];

  useEffect(() => {
    getData();    
  }, []);

  // get data when form load
  const getData = async() => {
    let loginData = {
      "login_id"  : reactLocalStorage.get('LOGIN_ID'),
      "company_id": reactLocalStorage.get('COMPANY_ID'),
      "role_id"   : reactLocalStorage.get('ROLE_ID'),
      "paginate"  : true,
      "language"  : reactLocalStorage.get('LANGUAGE')
    }
    setLoginData(loginData)
    
    commonSearch(loginData)
    
    // show/ hide action button by login user permission
    let getPermission = {
      ...loginData,
      "page_name" : "Employee List"
    }
    let obj = { method: 'get', url: 'api/specific_permission', params: getPermission }
    let response = await ApiRequest(obj);
    setLoading(false)
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
  
  const commonSearch = async(data) => {
    let obj = { method: 'post', url: 'api/emp_management/searchEmployee', params: data }
    let response = await ApiRequest(obj);
    setLoading(false)
    let emp_list = response.data.employee_list
    if(response.flag === false){
      setError(response.message); window.scrollTo(0,0);
      setEmployeeTable([]); setTotal("");
      setDeptList(response.data.data.department_list);
      setPosList(response.data.data.position_list);
    } else {
      setEmployeeTable(emp_list.data)
      setCurrentPage(emp_list.current_page)
      setLastPage(emp_list.last_page)      
      setNumber(emp_list.from)
      setTotal(emp_list.total)
      setError([]);   
      setDeptList(response.data.department_list)
      setPosList(response.data.position_list)
    }
  }

  // data change in form
  const dataChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value.trim() // Trimming any whitespace
    });
  };
  
  // department change in form
  const deptChange = async(e) => {
    let deptId = e.target.value;

    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value
    });

    if(deptId !== "0"){
      let obj = { method: 'get', url: `api/get_dept_pos/${deptId}`, params: loginData }
      let response = await ApiRequest(obj);
      if(response.flag === false){
        setError(response.message); setSuccess([]); window.scrollTo(0,0);
      }else{
        setPosList(response.data[0].positions)
      }
    } else {
      let obj = { method: 'get', url: 'api/emp_register', params: loginData }
      let response = await ApiRequest(obj);
      if(response.flag === false){
        setError(response.message); setSuccess([]); window.scrollTo(0,0);
      }else{
        setPosList(response.data.position_list)
      }      
    }
  }

  // click permission modal box
  const showModalPermission = (e) => {
    let modalData = employeeTable.filter(emp => emp.id === parseInt(e.target.value))
    setModalData(modalData[0].permissions)
    setModalPermission(!modalPermission)
  }

  // click edit button
  const editEmployee = async(id) => {
    let obj = { method: 'get', url: `api/emp_management/${id}`, params: loginData }
    let response = await ApiRequest(obj);
    if(response.flag === false){
        setError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
        localStorage.setItem("EMPLOYEE_ID", id);
        history.push(`/${customer_name}/erp/EmployeeManagement/EmployeeRegistration`);
        setError([]); setSuccess([]);
    }
  }

  // click detail button
  const detailEmployee = async(id) => {
    let obj = { method: 'get', url: `api/emp_profile/${id}`, params: loginData }
    let response = await ApiRequest(obj);
    if(response.flag === false){
        setError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
        localStorage.setItem("EMP_ID", id);
        history.push(`/${customer_name}/erp/EmployeeManagement/EmployeeProfile`);
        setError([]); setSuccess([]);
    }
  }
  
  // click resign button
  let resignData = (id) => {
    if(id) {
      setContent(t('Are you sure want to resign?'));
      setType('resign'); setShow(!show); setError([]); setSuccess([]);
      setResignId(id)
    }
  }
  
  const resignOK = async () =>{
      setLoading(true)
      setShow(!show); setContent(''); setType('');
      let obj = { method: 'post', url: `api/emp_management/resign?employee_id=${resignId}`, params: loginData }
      let response = await ApiRequest(obj);
      setLoading(false)
      if(response.flag === false){
          setError(response.message); setSuccess([]); window.scrollTo(0,0);
      } else{
          setError([]);
          let succ = []
          succ.push(response.data.message)
          setSuccess(succ);
          searchAction(employeeData);
          window.scrollTo(0,0);
      }
  }
  
  // click rehire data
  let rehireData = (id) => {
    if(id) {
      setContent(t('Are you sure want to rehire?'));
      setType('rehire'); setShow(!show); setError([]); setSuccess([]);
      setRehireId(id)
    }
  }
  
  const rehireOK = async() =>{
    setLoading(true)
    setShow(!show); setContent(''); setType('');
    let obj = { method: 'post', url: `api/emp_management/un_resign?employee_id=${rehireId}`, params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setError(response.message); setSuccess([]); window.scrollTo(0,0);
    } else{
        let succ = []
        succ.push(response.data.message)
        searchAction(employeeData)
        setError([]); setSuccess(succ); window.scrollTo(0,0);
    }
  }

  // click delete button
  let deleteData = (id) => {
    if(id) {
      setContent(t('Are you sure want to delete?'));
      setType('delete'); setShow(!show); setError([]); setSuccess([]);
      setDeleteId(id)
    }
  }
  
  const deleteOK = async() =>{
    setShow(!show); setContent(''); setType('');
    setLoading(true)
    let obj = { method: 'delete', url: `api/emp_management/${deleteId}`, params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
      setError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{   
      setError([]); setEmployeeTable([])
      setSuccess([response.data.message]);
      if(loginData.login_id === deleteId) {
        history.push(`/${customer_name}/erp/Login`);
      }
      window.scrollTo(0,0);
      searchAction(employeeData)
    }
  }
  
  const searchAction = async(data) => {
    employeeData = {
      ...data, ...loginData
    }
    let search_obj = { method: 'post', url: 'api/emp_management/searchEmployee', params: employeeData }
    let search_response = await ApiRequest(search_obj);
    setLoading(false)
    let emp_list = search_response.data.employee_list
    if(search_response.flag === false){
      setEmployeeTable([]); setTotal("");
      setDeptList(search_response.data.data.department_list);
      setPosList(search_response.data.data.position_list);
    } else {
      setEmployeeTable(emp_list.data)
      setCurrentPage(emp_list.current_page)
      setLastPage(emp_list.last_page)      
      setNumber(emp_list.from)
      setTotal(emp_list.total)
      setError([]);
      setDeptList(search_response.data.department_list)
      setPosList(search_response.data.position_list)
    }
  }

  // click search button
  const search = async() => {
    setError([])
    setSuccess([])
    setLoading(true)
    employeeData = {
      ...employeeData, ...loginData
    }
    commonSearch(employeeData)
  }  

  // table paging
  const setActivePage = async(i) => {
    setLoading(true)
    setCurrentPage(i)
    employeeData = {
      ...employeeData, ...loginData
    }
    let obj = { method: 'post', url: `api/emp_management/searchEmployee?page=${i}`, params: employeeData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
      let result = response.data
      setEmployeeTable(result.employee_list.data)
      setDeptList(result.department_list)
      setPosList(result.position_list)      
      setCurrentPage(result.employee_list.current_page)
      setLastPage(result.employee_list.last_page)      
      setNumber(result.employee_list.from)
      setTotal(result.employee_list.total)
    }
  }

  return (
    <>
      <Loading start={loading} />
      
      <Message success={success} error={error} error2={[]} />
        
      <Confirmation
        content={content}
        okButton={t('Ok')}
        cancelButton={t('Cancel')}
        type={type}
        show={show}
        cancel={()=>setShow(!show)}
        deleteOK={deleteOK}
        resignOK={resignOK}
        rehireOK={rehireOK}
      />

      <ComponentEmployeeList t={t} dataChange={dataChange} deptChange={deptChange}
        deptList={deptList} posList={posList} search={search}
        total={total} employeeTable={employeeTable} number={number}
        showModalPermission={showModalPermission} modalPermission={modalPermission}
        setModalPermission={setModalPermission} modalData={modalData}
        editEmployee={editEmployee}  detailEmployee={detailEmployee}
        resignData={resignData} rehireData={rehireData} deleteData={deleteData}
        lastPage={lastPage} currentPage={currentPage} setActivePage={setActivePage}
        loginPermission={loginPermission}
      />
    </>
  )
}

export default withTranslation()(LegacyWelcomeClass)
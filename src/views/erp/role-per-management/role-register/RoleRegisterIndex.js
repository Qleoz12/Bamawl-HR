/**
 * Role Register Form
 * @author Aye Min Aung
 * @create
 * @modify Thin Thin Nwe 30/4/2021
*/

import React, { useState, useEffect } from "react";
import "./roleregister.scss";
import message from "../../../erp/erp-common/commonMessage";
import { withTranslation } from 'react-i18next'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import ComponentRoleRegister from "./ComponentRoleRegister";
import {reactLocalStorage} from 'reactjs-localstorage'

function LegacyWelcomeClass({ t }) {
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [assign, setAssign] = useState(false);
  let [errors, setErrors] = useState([]);
  let [error2, setError2] = useState([]);
  let [success, setSuccess] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [lastPage, setLastPage] = useState(1);
  let [dataTable, setDataTable] = useState([]); //data table for user interface
  let [pTable, setPTable] = useState([]); //Permission table when click assign permission table
  let [roleName, setRoleName] = useState("");
  let [description, setDescription] = useState("");
  let [id, setId] = useState("");
  let [edit_name, setEditName] = useState("");
  let [editDescription, setEditDescription] = useState("");
  let [ total, setTotal ] = useState("")
  let [ number, setNumber ] = useState(0)
  let [ editErr, setEditErr ] = useState([])
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
      "paginate"  : true,
      "language"  : reactLocalStorage.get('LANGUAGE')
    }
	  setLoginData(loginData)
    
    // get role data
    let obj = { method: 'get', url: 'api/role-register', params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false);
    if(response.flag === false){
        setDataTable(""); setError2(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
        setErrors([]);
        setDataTable(response.data.role_list.data);
        setCurrentPage(parseInt(response.data.role_list.current_page));
        setLastPage(parseInt(response.data.role_list.last_page));
        setNumber(response.data.role_list.from)
        setTotal(response.data.role_list.total)
    }
    
    /*****     show/ hide action button by login user permission     *****/
    let getPermission = {
      ...loginData,
      "page_name" : "Role Register"
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

  // table paging
  const setActivePage = async(i) => {
    setCurrentPage(i)
    setLoading(true)    
    let obj = { method: 'get', url: `api/role-register?page=${i}`, params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setErrors(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{      
      let result = response.data;
      if (result.role_list === "Data is Not Found!") {
        setDataTable("");
      } else {
        setDataTable(result.role_list.data);
        setCurrentPage(parseInt(result.role_list.current_page));
        setLastPage(parseInt(result.role_list.last_page));
        setNumber(result.role_list.from)
      }
    }
  }

  //Reset Error and Success Msg
  function reset() {
    setErrors("");
    setSuccess([]);
  }

  //get the new role text field value
  function roleNameChange(e) {
    let value = e.target.value;
    setRoleName(value);
    setErrors("");
    setSuccess([]);
  }

  //get the description text field value
  function descriptionChange(e) {
    let value = e.target.value;
    setDescription(value);
    setErrors("");
    setSuccess([]);
  }
  
  //get edit-description text field data
  function editNameChange(e) {
    setErrors("");
    setSuccess([]);
    let value = e.target.value;
    setEditName(value);
  }

  //get edit-description text field data
  function editDescriptionChange(e) {
    setErrors("");
    setSuccess([]);
    let value = e.target.value;
    setEditDescription(value);
  }

  //create role onClick function
  const createRole = async() => {
    let error = [];
    let role = roleName;

    if (role === "") {
      error.push(t(message.JSE001).replace('%s', t('Role Name')))
    }
    
    if (error.length > 0) {
        setErrors(error); setSuccess([]); window.scrollTo(0, 0);
    }else{
        setErrors([]); setError2([]); setSuccess([]); setType('save');
        setContent(t('Are you sure want to create role?')); setShow(!show);
    }
  }
  
  const saveOK = async () => {
    setShow(!show); setType(''); setContent('');    
    setErrors(errors); //set error to stage
    setLoading(true);
    let data = {
      ...loginData,
      "role_name"   : roleName,
      "description" : description,
    }
    let obj = { method: 'post', url: 'api/role-register', params: data }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setErrors(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
        setErrors([]);
        setRoleName("");
        setDescription("");
        let suc = []
        suc.push(response.data.message)
        setSuccess(suc);
        getData();
    }    
    window.scrollTo(0, 0);
  }

  // Start Delete Function
  const deleteRow = async() => {
    setContent(t('Are you sure want to delete?')); setType('delete');
    setShow(!show); setErrors([]); setSuccess([]);
  }
  
  const deleteOK = async() => {  
    setLoading(true);
    setShow(!show); setContent(''); setType('');
    let obj = { method: 'delete', url: `api/role-register/${id}`, params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setErrors(response.message); setSuccess([]);
    }else{
        setErrors([]);
        setTotal("")
        getData();
        let suc = []
        suc.push(response.data.message)
        setSuccess(suc);        
        setRoleName("")
        setDescription("")
    }
    window.scrollTo(0, 0);
  }

  // click edit button
  const editRow = async() => {    
    setLoading(true);
    let err = []
    if (edit_name === "") {
      err.push(t(message.JSE001).replace('%s', t('Category Name')))
    }

    if(err.length < 1) {
        let data = {
          ...loginData,
          "role_name" : edit_name,
          "description" : editDescription,
        }
        let obj = { method: 'put', url: `api/role-register/${id}`, params: data }
        let response = await ApiRequest(obj);
        setLoading(false);
        if(response.flag === false){
          setEditErr(response.message); setSuccess([]);
        }else{
            let suc = []
            suc.push(response.data.message)
            setSuccess(suc);
            setEditDescription("");
            setEdit(false);
        }
        getData();
        window.scrollTo(0, 0);
    } else {
      setLoading(false);
      setEditErr(err)
    }  
  }

  //Set default after closing assign permission modal box

  return (
    <div>
      <Loading start={loading} />
      
      <Message success={success} error={errors} error2={error2} />
      
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

      <ComponentRoleRegister t={t} roleName={roleName} roleNameChange={roleNameChange}
        description={description} descriptionChange={descriptionChange} createRole={createRole}
        dataTable={dataTable} number={number} reset={reset} setId={setId}
        setPTable={setPTable} setAssign={setAssign} assign={assign} setEditName={setEditName}
        setEditDescription={setEditDescription} setEditErr={setEditErr} setSuccess={setSuccess}
        setEdit={setEdit} edit={edit} deleteRow={deleteRow} lastPage={lastPage}
        currentPage={currentPage} setActivePage={setActivePage} pTable={pTable}
        editErr={editErr} edit_name={edit_name} editNameChange={editNameChange}
        editDescription={editDescription} editDescriptionChange={editDescriptionChange}
        editRow={editRow} loginPermission={loginPermission} total={total}
      />
    </div>
  );
};

export default withTranslation()(LegacyWelcomeClass)
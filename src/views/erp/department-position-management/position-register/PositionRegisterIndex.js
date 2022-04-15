/**
 * Position Register Form
 * @author Thin Thin Nwe
 * @create
*/

import React, { useEffect, useState } from 'react'
import './position-register.scss'
import message from '../../../erp/erp-common/commonMessage'
import { validateNumberOnly } from '../../../erp/erp-common/commonValidation'
import { withTranslation } from 'react-i18next'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import ComponentPositionRegister from './ComponentPositionRegister'
import {reactLocalStorage} from 'reactjs-localstorage'

function LegacyWelcomeClass({ t }) {

  let [ number, setNumber ] = useState(0)
  let [ total, setTotal ] = useState("")
  let [ positionTable, setPositionTable ] = useState([])
  let [ positionData, setPositionData ] = useState([])
  let [ error, setError ] = useState([])
  let [ error2, setError2 ] = useState([])
  let [ success, setSuccess ] = useState([])
  let [ btnSaveEdit, setBtnSaveEdit ] = useState('Save')  
  const [ currentPage, setCurrentPage] = useState(1)
  const [ lastPage, setLastPage ] = useState()
  let [ deleteId, setDeleteId ] = useState(0)
  let [ editId, setEditId ] = useState("")
  const [loading, setLoading] = useState(true);
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
    let obj = { method: 'get', url: 'api/pos_reg', params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
      setError2(response.message); window.scrollTo(0,0);
    }else{
      let position = response.data.positions
      setPositionTable(position.data)
      setCurrentPage(position.current_page)
      setLastPage(position.last_page)      
      setNumber(position.from)
      setTotal(position.total)   
    }
    
    /*****     show/ hide action button by login user permission     *****/
    let getPermission = {
      ...loginData,
      "page_name" : "Position Register"
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
    setPositionData({
      ...positionData,
      [e.target.name]: e.target.value
    })
  }
  
  /** Start Save or Update Function */
  let Save = async(event) => {
    event.preventDefault()    
    let err = []
    if(!positionData.position_name) {
      err.push(t(message.JSE001).replace('%s', t('Position Name')))
    }
    if(!positionData.position_rank && positionData.position_rank !== 0) {
      err.push(t(message.JSE001).replace('%s', t('Position Rank')))
    } else if(positionData.position_rank) {
      if(!validateNumberOnly(positionData.position_rank)) {
        err.push(t(message.JSE005).replace('%s', t('Position Rank')))
      } else if(positionData.position_rank > 255) {
        err.push(t(message.JSE021).replace('%s', t('Position Rank')).replace('%s', t('255')))
      }
    }
    
    if(err.length > 0) {
      setError(err); setSuccess([]); window.scrollTo(0,0);
    } else {
      setError([]); setError2([]); setSuccess([]); setType('save');
      (event.target.value === "")
        ? setContent(t('Are you sure want to save?'))
        : setContent(t('Are you sure want to update?'))
      setShow(!show);
    }
  }
  
  const saveOK = async() =>{
    setShow(!show); setType(''); setContent('');
    setLoading(true)
    let obj = {}    
    positionData = {
      ...positionData, ...loginData
    }
    if(editId === "") { // Save
        obj = { method: 'post', url: 'api/pos_reg', params: positionData }
    } else { // Update
        obj = { method: 'put', url: `api/pos_reg/${editId}`, params: positionData }
    }    
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
        setBtnSaveEdit("Save")
        setEditId("");
        setError([]);
        let suc = []
        suc.push(response.data.message)
        setSuccess(suc);
        getData()                
        setPositionData([])
    }
  }
  /** End Save Function */

  // click edit button
  const editPosition = async(id) => {
    setError([])
    setSuccess([])
    setEditId(id)
    setLoading(true)    
    let obj = { method: 'get', url: `api/pos_reg/${id}`, params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    window.scrollTo(0,0);
    if(response.flag === false){
      setError(response.message); setEditId(""); setSuccess([]);
    }else{
      document.getElementById("pos_register").reset();
      let edit = response.data
      setPositionData(edit)
      setBtnSaveEdit("Update")
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
    if(deleteId !== "") {
      setLoading(true)      
      setShow(!show); setContent(''); setType('');
      let obj = { method: 'delete', url: `api/pos_reg/${deleteId}`, params: loginData }
      let response = await ApiRequest(obj);
      setLoading(false)
      if(response.flag === false){
          setError(response.message); setSuccess([]); window.scrollTo(0,0);
      }else{
          setError([]); setSuccess([response.data.message]);          
          setPositionData([]); setTotal(""); getData();
      }
    }   
    window.scrollTo(0,0);
  }

  // table paging
  const setActivePage = async(i) => {
    setCurrentPage(i)
    setLoading(true)    
    let obj = { method: 'get', url: `api/pos_reg?page=${i}`, params: loginData }
    let response = await ApiRequest(obj);
    if(response.flag === false){
      setError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
      setLoading(false)
      let position = response.data.positions
      setPositionTable(position.data)      
      setLastPage(position.last_page)
      setCurrentPage(position.current_page)
      setNumber(position.from)
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
      
      <ComponentPositionRegister t={t} dataChange={dataChange} positionData={positionData}
        Save={Save} btnSaveEdit={btnSaveEdit} total={total}
        positionTable={positionTable} number={number} editPosition={editPosition}
        deleteData={deleteData} lastPage={lastPage} currentPage={currentPage}
        setActivePage={setActivePage} loginPermission={loginPermission}
      />   
    </>
  )
}

export default withTranslation()(LegacyWelcomeClass)
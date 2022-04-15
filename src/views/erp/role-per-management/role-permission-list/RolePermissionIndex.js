/**
 * Role and Permission Form
 * @author Thin Thin Nwe 3/6/2021
 * @create
*/

import React, { useState, useEffect } from "react";
import "./roleandpermission.scss";
import { withTranslation } from 'react-i18next'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import ComponentRolePermission from './ComponentRolePermission'
import {reactLocalStorage} from 'reactjs-localstorage'
import { CRow, CCol } from "@coreui/react";
import Confirmation from '../../../brycen-common/confirmation/Confirmation';

function LegacyWelcomeClass({ t }) {
  let [ loginData, setLoginData ] = useState([])  
  const [currentPage, setCurrentPage] = useState(1); // current page number in pagination
  const [lastPage, setLastPage] = useState(1); //last page of pagination
  const [error, setError] = useState([]); // error array
  const [error2, setError2] = useState([]); // error array 2
  const [success, setSuccess] = useState([]); // success message
  const [total, setTotal] = useState(0); // pagination's count
  const [loading, setLoading] = useState(true); // loading animation
  const [main, setMain] = useState([]); // merge array form API
  const [detail, setDetail] = useState(false); // go to detail flag
  const [detail_data, setDetailData] = useState([]); // detail data from api
  const [header, setHeader] = useState([]); // table header
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("")
  let [ loginPermission, setLoginPermission ] = useState([])
  
  useEffect(() => {
  
    let return_data = JSON.parse(localStorage.getItem('EDIT_USER_MENU_RETURN'));
    localStorage.removeItem('EDIT_USER_MENU_RETURN');
    if( return_data !== null ){
        let { return_status, message } = return_data;
        if( return_status !== undefined ){
            return_status === 'success' ? setSuccess([message]) : setError2([message]);
        }
    }

    search_list(1);
  }, []);

  // get data when form load
  const search_list = async (page) => {
    window.scrollTo({top: 0, left: 0 }); setCurrentPage(page);
    let loginData = {
      "login_id"  : reactLocalStorage.get('LOGIN_ID'),
      "company_id": reactLocalStorage.get('COMPANY_ID'),
      "role_id"   : reactLocalStorage.get('ROLE_ID'),
      "paginate"  : true,
      "language"  : reactLocalStorage.get('LANGUAGE')      
    }
	  setLoginData(loginData)
    let obj = { method: 'get', url: 'api/role-list', params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        window.scrollTo(0,0);
        const zero = 0; const one = 1;
        let subtract_page = page - one;
        // If current page is 0, show error message (or) show users data
        if( subtract_page !== zero ){
          search_list(subtract_page);
        }else{
          setError(response.message); ; setTotal(zero); setCurrentPage(one);
        }
    } else {
        setLastPage(response.data.role_data.last_page);
        setCurrentPage(response.data.role_data.current_page);
        setMain(response.data.role_data.data);
        setTotal(response.data.role_data.total);
    }
    
    /*****     show/ hide action button by login user permission     *****/
    let getPermission = {
      ...loginData,
      "page_name" : "Role and Permission List"
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
  
  /* click Edit button */
   const Edit = (i) => {
      let id = i.target.attributes['data-ref'].value;
      localStorage.setItem('ROLE_PERMISSION_EDIT', id);
      document.getElementById('go_to_assign_role_permission').click();
  }
  
  /* click Delete button */
    const Delete = (i) => {
        setError([]); setSuccess([]);
        let id = i.target.attributes['data-ref'].value;
        setContent('Are you sure want to delete?');
        setType('delete'); setShow(!show);
        setDeleteId(id)      
    }
    
    const deleteOK = async() => {
        setLoading(true)
        setShow(!show); setContent(''); setType('');
        let deleteData = {
          ...loginData,
          // "role_id"        :2,
          "delete_role_id" : deleteId
        }
        let obj = { method: 'delete', url: `api/permissions/${deleteId}`, params: deleteData }
        let response = await ApiRequest(obj);
        setLoading(false)
        if(response.flag === false){
            setError(response.message); setSuccess([]); window.scrollTo(0,0);
        }else{
            let suc = []; suc.push(response.data.message)
            setSuccess(suc); search_list(currentPage);
        }
    }

  /* click link in Admin level column from table  */
  const click_admin_level = (i) => {
    localStorage.setItem('ROLE_PERMISSION_EDIT', i.id);
    document.getElementById('go_to_emp_list').click();
  }
  
  /* click link in Action Name column from table */
   const click_go_to_detail = async () => {
      setError([]); setError2([]); setSuccess([]);
      setLoading(true);
      loginData = {
        ...loginData,
        // "role_id" : "2",
      }
      let obj = { method: 'get', url: 'api/role-list/detail', params: loginData }
      let response = await ApiRequest(obj);
      setLoading(false);
      if(response.flag === false){
          setError(response.message); window.scrollTo(0,0);
      } else {
        setDetail(true); setDetailData(response.data.user_menu_data);
        setHeader(response.data.user_menu_data[0].levels);
      }
  }
  
  /* click back button */
  const click_back = () => {
    setDetail(false); setLoading(false); search_list(1);
  }
  
  /* click paginate */
  const change_paginate = (page) => {
      setError([]); setSuccess([]); search_list(page); setLoading(false);
  }

  return (
    <CRow id="userlist-row">
      <CCol lg="12">
        <Loading start={loading} />
        
        <Confirmation
          content={content}
          okButton={'Ok'}
          cancelButton={'Cancel'}
          type={type}
          show={show}
          cancel={()=>setShow(!show)}
          deleteOK={deleteOK}
      />
        
        <Message success={success} error= {error} error2= {error2} />
        
        <ComponentRolePermission total={total} detail={detail} t={t} main={main}
          click_admin_level={click_admin_level} click_go_to_detail={click_go_to_detail}
          Edit={Edit} Delete={Delete} currentPage={currentPage} lastPage={lastPage}
          change_paginate={change_paginate} click_back={click_back} header={header}
          detail_data={detail_data} loginPermission={loginPermission}
        />
      </CCol>
    </CRow>
  );
};

export default withTranslation()(LegacyWelcomeClass)
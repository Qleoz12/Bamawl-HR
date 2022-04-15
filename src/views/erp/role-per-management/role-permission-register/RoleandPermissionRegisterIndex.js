/**
 * Assign Role and Permission Form
 * @author Thin Thin Nwe 3/6/2021
 * @create
*/

import React, { useState, useEffect } from "react";
import message from "../../../erp/erp-common/commonMessage";
import "./assignroleandpermission.scss";
import { withTranslation } from 'react-i18next'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import ComponentAssignRolePermission from './ComponentAssignRolePermission'
import {reactLocalStorage} from 'reactjs-localstorage'
import { CRow, CCol } from "@coreui/react";

function LegacyWelcomeClass({ t }) {
  const [loading, setLoading] = useState(false);
  let [error, setError] = useState([]);
  let [success, setSuccess] = useState([]);
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [show, setShow] = useState(false);
  let [ loginData, setLoginData ] = useState([])
  const [userLevel, setUserLevel] = useState([]); // to show user level
  const [levelShow, setLevelShow] = useState(false); // for user level show or hide
  const [levelMain, setLevelMain] = useState(false); // for user level main check box
  const [process, setProcess] = useState([]); // for process
  const [editID, setEditID] = useState(""); // for edit id
  const [company, setCompany] = useState(""); // to show company name
  let [ btnName, setBtnName ] = useState('Save')
  let [ loginPermission, setLoginPermission ] = useState([])

  useEffect(() => {
    index();
  }, []);
  
  const index = async() => {
    let loginData = {
      "login_id"  : reactLocalStorage.get('LOGIN_ID'),
      "company_id": reactLocalStorage.get('COMPANY_ID'),
      "role_id"   : reactLocalStorage.get('ROLE_ID'),
      "language"  : reactLocalStorage.get('LANGUAGE')
    }
	  setLoginData(loginData)
    let edit_id = reactLocalStorage.get("ROLE_PERMISSION_EDIT"); // for edit id from user menu setting list
    reactLocalStorage.remove("ROLE_PERMISSION_EDIT"); // for edit id from user menu setting list

    let obj = { method: 'get', url: 'api/permissions', params: loginData }
    let response = await ApiRequest(obj);
    setLoading(false);
    if(response.flag === false) {}
    else {
      let user_level = response.data.role;
      let process = response.data.permission;

      if(edit_id !== undefined){
        setEditID(edit_id);
        // for edit api
        let obj = { method: 'get', url: 'api/permissions/edit', params: {
          ...loginData,
          // "login_id"      : 1,
          // "company_id"    : 1,
          // "role_id"       : 2,
           // "language"      : "en"
          "edit_role_id"  : edit_id,
         
        }}
        response = await ApiRequest(obj);
        user_level = response.data.user_level
        if(response.flag === false) {
          let obj = { return_status: 'error', message: response.message[0] }
          localStorage.setItem('EDIT_USER_MENU_RETURN', JSON.stringify(obj) );
          window.history.back();
        } else {
          setBtnName("Update")
          let userLevel = user_level.filter(level => level.id === parseInt(edit_id));
          userLevel.forEach(level => {
            level.is_checked = true;
          });
          setUserLevel(userLevel);
          setLevelShow(true);
          setLevelMain(true);

          let checkedArr =[]; // modified checked menu to change format
          let chk_menu = response.data.checked_menu;
          chk_menu.forEach(chk => {
              checkedArr.push(chk.name);
          });
          let result = []
          checkedArr.map(check => {
            result = process.map(menu => {
              menu.sub.map(Sub => {
                Sub.sub.forEach(subs => {
                  if (subs.action_id === check){
                      subs.is_checked = true;
                      Sub.sub_show = true;                      
                      menu.show = true;
                  }
                })          
              })
              return menu;
            })            
            return check;
          });
          
          result.map(res => {
            let cFlag = true
            res.sub.map(Sub => {
              let sFlag = true
              Sub.sub.forEach(subs => {
                if(subs.is_checked === false) sFlag = false
              })
              if(sFlag) Sub.is_checked = true
              if(Sub.is_checked === false) cFlag = false
            })
            if(cFlag) res.is_checked = true
            return res
          })
          setProcess(result)
        }
      }else{
        setLoading(false);
        setUserLevel(user_level);
        setLevelShow(false);
        setLevelMain(false);
        setProcess(process)
      }
      if(response.data.company.length > 0) {
        setCompany(response.data.company[0].name);
      }
      
      /*****     show/ hide action button by login user permission     *****/
      let getPermission = {
        ...loginData,
        "page_name" : "User Role and Permission Register"
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
  }
  
  /***************   for user level start   ***************/

  // for user level plus minus button to show or hide function
  let userLevelChange =()=>{
    setLevelShow(!levelShow);
  }

  // for user level main check box show or hide function
  let userLevelMainChange =()=>{
    setLevelMain(!levelMain);
    userLevel.forEach(user=>{
      user.is_checked = !levelMain;
    })
  }

  // for user level sub check box show or hide function
  let userLevelSubChange =(e)=>{  
    let id= e['id'];
    let flag = true;
    let level_data = userLevel.map(user =>
      user.id === parseInt(id) ? { ...user, is_checked: !user.is_checked } : user
    );
    level_data.forEach(data=>{
      if(data.is_checked === false) {
        flag = false;
      }
    })
    setLevelMain(flag);
    setUserLevel(level_data);
  }

/***************     for user level end     ***************/

/***************     for process start     ***************/

  // for process first icon show or hide function
  let firstIcon = (e)=>{
    let menu = e['main_menu'];
    let process_data = process.map(process =>
      process.main_menu === menu ? { ...process, show: !process.show } : process
    );
    setProcess(process_data);
  }

  // for process second icon show or hide function
  let secondIcon = (e)=>{

    let firstID = e.target.getAttribute("value");
    let secondID = e.target.getAttribute("id");
    let process_data = process.map((first, index) => {
      if (index === parseInt(firstID)) {
          first.sub.map((second,ind)=>{
          if(ind === parseInt(secondID)) {
            second.sub_show = !second.sub_show;
            return second;
          }
          return  second
        })
      }
      return  first
    });
    setProcess(process_data);
  }

  //for process first checkbox function
  let processFirst = (e)=>{
    let menu = e['main_menu'];
    let flag = !e['is_checked'];
  
    let process_data = process.map(first => {
      if(first.main_menu === menu){
        first.is_checked = flag;
        first.sub.map(second=>{
          second.is_checked = flag;
          second.sub.map(third=>{
            third.is_checked = flag;
          })
        })
      }
      return  first
    });
    setProcess(process_data);
  }

  // for process second checkbox function
  let processSecond = (e)=>{
    let firstID = parseInt(e.target.getAttribute("value"));
    let secondID = parseInt(e.target.getAttribute("data-ref"));
    let flag = !process[firstID].sub[secondID].is_checked;
    let firstFlag = true; // first checkbox default is_checked -> true
    let process_data = process.map((first, index) => {
      if(index === firstID){
        first.sub.map((second,ind)=>{
          if(ind === secondID){
            second.is_checked = flag;
            second.sub.map(third=>{
              third.is_checked = flag;
            })
          }
        })
      }
      return first
    });

    setProcess(process_data);
    process_data.map((first,index) => {
      if(index === firstID){
        first.sub.map(second=>{
          if(second.is_checked === false){
            firstFlag = false;
          }
        })
      }  
    });  
    process_data[firstID].is_checked = firstFlag;
  }

  // for process third checkbox function
  let processThird = (e)=>{
    let firstID = parseInt(e.target.getAttribute("value"));
    let secondID = parseInt(e.target.getAttribute("data-ref"));
    let thirdID = parseInt(e.target.getAttribute("name"));
    let flag = !process[firstID].sub[secondID].sub[thirdID].is_checked;
    let check_name = process[firstID].sub[secondID].sub[thirdID].action_name;
    let secondFlag = true; // second checkbox default is_checked -> true
    let firstFlag = true; // first checkbox default is_checked -> true
    let process_data = process.map((first, index) => {
      if(index === firstID){
        first.sub.map((second,ind)=>{
          if(ind === secondID){
            let checkFlag = false
            second.sub.map((third,idx)=>{            
              if(idx === thirdID){
                third.is_checked = flag;
              }
              if(third.action_name === "View" || third.is_checked === true) {
                third.is_checked = true                
              }
              if(check_name === "View" && flag === false) {
                checkFlag = true
              }
            })
            if(checkFlag) {
              second.sub.map(third => {
                third.is_checked = false
              })              
            }
          }
        })
      }  
      return  first
    });
    setProcess(process_data);
  
    process_data.map((first, index) => {
      if(index === firstID){
        first.sub.map((second,ind)=>{
          if(ind === secondID){
            second.sub.map(third => {
              if(third.is_checked === false){
                secondFlag = false;
              }
            })
          }
        })
      }
    });
    process_data[firstID].sub[secondID].is_checked = secondFlag;
  
    process_data.map((first,index) => {
      if(index === firstID){
        first.sub.map(second=>{
          if(second.is_checked === false){
            firstFlag = false;
          }
        })
      }    
    });
    process_data[firstID].is_checked = firstFlag;
  }

  /***************     for process end     ***************/
  
  /***************     Start Save Function     ***************/
  let save = () => {
    let jse = message.JSE002;
    let change = t(jse);
    let s1 = t('User');
    let error= change.replace('%s', s1);

    userLevel.forEach(user=>{
      if(user.is_checked === true){
        error="";
      }
    });

    if(error !== ""){
      setError([error]);
      setSuccess("");
      window.scrollTo({top: 0, left: 0, behavior: 'smooth' });  
    }else{  
      let jse =message.JSE002;
      let change = t(jse);
      let s1 = t('Process');
      error= change.replace('%s', s1);
      process.forEach(process=>{
        process.sub.forEach(sub=>{
          sub.sub.forEach(subs=>{
            if(subs.is_checked === true){
              error="";
            }
          })
        })
      })

      if(error !== ""){
        setError([error]);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
      }else{
        setError([]); setSuccess([]); setType('save'); setShow(!show);
        (btnName === "Save") ?
          setContent('Are you sure want to save?')
        : setContent('Are you sure want to update?')
      }  
    }      
  }
  
  const saveOK = async () =>{
    setShow(!show); setType(''); setContent('');
    let choose_process = [];
    let choose_level = [];
  
    userLevel.forEach(user=>{
      if(user.is_checked === true){
        choose_level.push(user.id);
      }
    })
  
    process.forEach(process=>{
      process.sub.forEach(sub=>{
        sub.sub.forEach(subs=>{
          if(subs.is_checked ===  true){
            choose_process.push(subs.action_id);
          }
        })
      })
    })

    setLoading(true);
    
    let saveData = {
      ...loginData,
      "choose_process": choose_process,
      "choose_level": choose_level,
    }
    let obj = {}
    if(editID === "") { //save
      obj = { method: 'post', url: 'api/permissions', params: saveData }      
    } else { // update
      obj = { method: 'put', url: `api/permissions/${editID}`, params: saveData }
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if(response.flag === false) {
        setError(response.message); setSuccess("");
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    } else {        
        if(editID === "") {
          setError([]);
          let suc = []; suc.push(response.data.message)
          setSuccess(suc)
          index();
        }else{
          let obj = { return_status: 'success', message: response.data.message }
          localStorage.setItem('EDIT_USER_MENU_RETURN', JSON.stringify(obj) );
          window.history.back();
        }
    }
  }
  /***************     End Save Function     ***************/

  return (
    <CRow>
      <CCol lg="12">
        <Loading start={loading} />
  
        <Message success={success} error={error} error2={[]} />
        
        <Confirmation
            content={content}
            okButton={t('Ok')}
            cancelButton={t('Cancel')}
            type={type}
            show={show}
            cancel={()=>setShow(!show)}
            saveOK={saveOK}
        />     
  
        <ComponentAssignRolePermission
          t={t} userLevel={userLevel} levelShow={levelShow} userLevelChange={userLevelChange}
          userLevelMainChange={userLevelMainChange} userLevelSubChange={userLevelSubChange}
          levelMain={levelMain} firstIcon={firstIcon} processFirst={processFirst}
          secondIcon={secondIcon} company={company} processSecond={processSecond}
          processThird={processThird} save={save} process={process} btnName={btnName}
          loginPermission={loginPermission}
        />
      </CCol>
    </CRow>
  );
};

export default withTranslation()(LegacyWelcomeClass)
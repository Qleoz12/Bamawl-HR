import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement, CSidebar, CSidebarNav, CSidebarNavDivider, CSidebarNavTitle,
  CSidebarNavDropdown, CSidebarNavItem, CImg, CLabel,
} from '@coreui/react'
import { useTranslation } from "react-i18next";
import { reactLocalStorage } from 'reactjs-localstorage';
import { ApiRequest } from '../views/brycen-common/api-request/RequestApi';
import { sidebarNav, isEmpty } from '../views/erp/erp-common/commonValidation'
import DynamicMenu from './DynamicMenu';

const HRMainSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  let [ photo, setPhoto ] = useState("")
  let [ name, setName ] = useState("")
  let [ navItem, setNavItem ] = useState([])
  const {t} = useTranslation();
  //use customize customer name 
  let customer_name = window.location.href.split("/")[3];

  useEffect(() => {
    let photo = localStorage.getItem("PHOTO"); setPhoto(photo)
    let name = localStorage.getItem("EMP_NAME"); setName(name)
    fetchData();
  },[]);
  
  async function fetchData() {    
    const menu = DynamicMenu();
    Promise.all([menu]).then((values) => {
      let data = values[0];
      let count = data.length;
      for(let i=0; i<count; i++) {
        if(data[i].name !== "Dashboard" && data[i].name !== "Logout" && data[i].name !== "ERP"){
        // if(data[i].name !== "Logout"){
          data[i]._tag = 'CSidebarNavDropdown';

          if(data[i].name === t('Dashboard')){
            data[i].className = 'dashboard';
          }
          if(data[i].name === "Profile"){
            data[i].className = 'hr';
          }
          if(data[i].name === "Setting"){
            data[i].className = 'setting';
          }
          if(data[i].name === "Employee Management"){
            data[i].className = 'empmanage';
          }
          if(data[i].name === "Attendance Management"){
            data[i].className = 'attmanage';
          }
          if(data[i].name === "Operation Request For Attendance"){
            data[i].className = 'opreqatt';
          }
          if(data[i].name === "Operation Request For Salary"){
            data[i].className = 'opreqsal';
          }
          if(data[i].name === "Salary Calculation"){
            data[i].className = 'salary';
          }
          if(data[i].name === "Report"){
            data[i].className = 'reports';
          }
                
          if(data[i].hasOwnProperty('_children')) {
            let child_count = data[i]['_children'].length;
            for(let j=0; j<child_count; j++) {
              data[i]['_children'][j]._tag = 'CSidebarNavItem';
              data[i]['_children'][j].name = t(data[i]['_children'][j].name);
            }
          }
        }
        data[i].name = t(data[i].name);
        if(data[i].name === "Logout"){
          data[i].route = "/logout";
          data[i].to = "/logout";
        }            
        if(data[i].name === t('Dashboard')){
            data[i].route = "/dashboard";
            data[i].to = "/"+customer_name+"/hr/dashboard";
            data[i].className = 'dashboard'
        }
        if(data[i].name === "ERP"){
          data[i].route = "/erp";
          data[i].to = "/"+customer_name+"/erp/dashboard";
          data[i].className = 'erpdashboard'
        }

      } // end for loop
 
      setNavItem(data);
    })
  }

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <div className="c-avatar">
          {
            isEmpty(photo)
            ?
              <div className="c-avatar-img">
                <span className="d-block" style={{marginTop: "2.2rem"}}>No Image</span>
              </div>
            : 
              <CImg src={photo} alt="photo" className="c-avatar-img" />
          }
          <CLabel> { name } </CLabel>
      </div>
      <CSidebarNav>

        <CCreateElement
          items={navItem}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>

      <CImg
            src={'/image/wav_bg.png'}
            className="sidebar-bg "
            alt="wave-bg"
      />
    </CSidebar>
  )
}

export default React.memo(HRMainSidebar)
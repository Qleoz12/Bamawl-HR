import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement, CSidebar, CSidebarNav, CSidebarNavDivider, CSidebarNavTitle,
  CSidebarNavDropdown, CSidebarNavItem, CImg, CLabel,
} from '@coreui/react'
import { useTranslation } from "react-i18next";
import { reactLocalStorage } from 'reactjs-localstorage';
import { ApiRequest } from '../views/brycen-common/api-request/RequestApi';
import { isEmpty, sidebarNav } from '../views/erp/erp-common/commonValidation'

const ERPMainSidebar = () => {
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
    let loginData = {
      "login_id"  : reactLocalStorage.get('LOGIN_ID'),
      "employee_id"  : reactLocalStorage.get('LOGIN_ID'),
      "company_id": reactLocalStorage.get('COMPANY_ID'),
      "role_id"   : reactLocalStorage.get('ROLE_ID'),
      "language"  : reactLocalStorage.get('LANGUAGE'),
      "access_token" : reactLocalStorage.get('TOKEN')
    }
    
    let data = []
    data.push({
      "_tag": "CSidebarNavItem",
      "main_menu_id": null,
      "name": "Dashboard",
      "className": "dashboard",
      "to": `/${customer_name}/erp/Dashboard`,
      "route": `/${customer_name}/erp/Dashboard`,
      "fontIcon": null,
      "icon": null
    })
    
    data.push({
      "_tag": "CSidebarNavItem",
      "main_menu_id": null,
      "name": "No Permission Package",
      "className": "nopermit",
      "to": `/${customer_name}/erp/NoPermissionPackage`,
      "route": `/${customer_name}/erp/NoPermissionPackage`,
      "fontIcon": null,
      "icon": null
    })
    
    let obj = { method: 'post', url: 'api/choose_emp_package',
                params: {
                  ...loginData,
                  "device_flag" : "1"
                }
              }
    let response = await ApiRequest(obj);

    if(response.flag !== false) {
      let pkg = response.data.access_package;
      let count = 0;

      if(pkg.length > 0) {
        count = pkg.length;
        let obj = { package_name: 'hr', method: 'get', url: 'api/get-menu-list', 
                    params: {
                      "login_id" : localStorage.getItem("LOGIN_ID"),
                      "company_id": localStorage.getItem("COMPANY_ID"),
                      "expense_flag":true
                    }
                  }
        let pkg_response = await ApiRequest(obj);       
        let hr_menu_count = pkg_response.flag !== false ? pkg_response.data.menus.length : 0;

        for (let i=0; i<count; i++) {
          let tmpData = {};
          let pkg_id = parseInt(pkg[i].package_id);
          let pkg_name = pkg[i].package_name;

          if(hr_menu_count > 0) {
            tmpData = {
              "_tag": "CSidebarNavItem",
              "main_menu_id": null,
              "name": pkg[i].package_name,
              "className": 'sale',
              "to": `/${customer_name}/${pkg[i].package_link}`,
              "route": `/${customer_name}/${pkg[i].package_link}`,
              "fontIcon": null,
              "icon": null,
              "pkg_name": pkg[i].package_name
            }
          } else {
            if(pkg_id === 1 || (pkg_id === 2 && pkg_name === "Expense")) {
              tmpData = {
                "_tag": "CSidebarNavItem",
                "main_menu_id": null,
                "name": pkg[i].package_name,
                "className": 'sale',
                "id": (pkg_id === 2 && pkg_name === "Expense") ? 'expense' : 'hr',
                "to": `/${customer_name}/erp/NoPermissionPackage`,
                "route": `/${customer_name}/erp/NoPermissionPackage`,
                "fontIcon": null,
                "icon": null,
                "pkg_name": pkg[i].package_name
              }
            } else {
              tmpData = {
                "_tag": "CSidebarNavItem",
                "main_menu_id": null,
                "name": pkg[i].package_name,
                "className": 'sale',
                "to": `/${customer_name}/${pkg[i].package_link}`,
                "route": `/${customer_name}/${pkg[i].package_link}`,
                "fontIcon": null,
                "icon": null,
                "pkg_name": pkg[i].package_name
              }
            } 
          }          
          data.push(tmpData)
          localStorage.setItem(`PACKAGE_ID${i}`, pkg[i].package_id)          
        }
      }
      localStorage.setItem("TOTAL_PACKAGE", count);
    }

    let menu_obj = { method: 'get', url: 'api/menus', params: loginData }
    let menu_response = await ApiRequest(menu_obj);
    if(menu_response.flag !== false){        
      let menu = menu_response.data.menus
      let count = menu.length;
      for(let i=0; i<count; i++) {
        if(menu[i].name === "Dashboard") {            
          menu[i].route = `/${customer_name}/erp${menu[i].to}`;
          menu[i].to = `/${customer_name}/erp${menu[i].to}`;
        }
        if(menu[i].name === "Logout") {            
          menu[i].route = `/${customer_name}/erp${menu[i].to}`;
          menu[i].to = `/${customer_name}/erp${menu[i].to}`;
        }
        if(menu[i].name !== "Dashboard" && menu[i].name !== "Logout"){
            
          menu[i]._tag = 'CSidebarNavItem';
          
          if(menu[i].name === "Employee Management"){
            menu[i].className = 'hr';
          }
          if(menu[i].name === "Department & Position Management"){
            menu[i].className = 'department';
          }
          if(menu[i].name === "Role and Permission Management"){
            menu[i].className = 'role';
          }
          
          if(menu[i].hasOwnProperty('_children')) {
            menu[i]._tag = 'CSidebarNavDropdown';
            let child_count = menu[i]['_children'].length;
            for(let j=0; j<child_count; j++) {
              menu[i]['_children'][j]._tag = 'CSidebarNavItem';
              menu[i]['_children'][j].name = t(menu[i]['_children'][j].name);
            }
          }
        }
        menu[i].name = t(menu[i].name);
        data.push(menu[i])
      }
    }

    data.push({
      "_tag": "CSidebarNavItem",
      "main_menu_id": null,
      "name": "Logout",
      "className": "logout",
      "to": `/${customer_name}/erp/Login`,
      "route": `/${customer_name}/erp/Login`,
      "fontIcon": null,
      "icon": null
    })
    data = sidebarNav(data, customer_name)
    let count = data.length;
    for(let i=0; i<count; i++) {
      if(data[i].name !== "Dashboard" && data[i].name !== "Logout"
      && data[i].name !== "No Permission Package") {
          
        data[i]._tag = 'CSidebarNavItem';
        
        if(data[i].hasOwnProperty('_children')) {
            data[i]._tag = 'CSidebarNavDropdown';
            let child_count = data[i]['_children'].length;
            for(let j=0; j<child_count; j++) {
                data[i]['_children'][j]._tag = 'CSidebarNavItem';
                data[i]['_children'][j].name = t(data[i]['_children'][j].name);
            }
        }
      }
      data[i].name = t(data[i].name);          
    }
    setNavItem(data)
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
              <CImg src = {photo} alt="photo" className="c-avatar-img" />
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

export default React.memo(ERPMainSidebar)
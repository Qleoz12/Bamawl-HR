import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CBreadcrumbRouter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'
import { TheHeaderDropdown, TheHeaderDropdownNotif }  from './index'
import { useTranslation } from "react-i18next";

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const {t} = useTranslation();
  let [ rout, setRout ] = useState([])

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  useEffect(() => {
    let ro = routes
    for(let i=0; i<ro.length; i++) {
      ro[i].name = t(ro[i].name)
    }
    setRout(ro)      
  },[rout]);

  return (
    <CHeader withSubheader className="border-0 header-background">
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">        
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-0" 
          routes={rout} 
        />
      </CHeaderNav>

      <CHeaderNav className="px-4">
        <TheHeaderDropdownNotif/>
        <TheHeaderDropdown/>
      </CHeaderNav>
    </CHeader>
  )
}

export default TheHeader
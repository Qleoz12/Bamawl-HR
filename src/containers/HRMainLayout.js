import React from 'react'
import {
  TheContent,
  HRMainSidebar,
  // TheFooter,
  TheHeader
} from './index'

const ERPMainLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <HRMainSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        {/* <TheFooter/> */}
      </div>
    </div>
  )
}

export default ERPMainLayout

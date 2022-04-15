/**
 * Assign Role and Permission Form
 * @author Thin Thin Nwe
 * @create
*/

import React from "react";
import {
  CButton, CCard, CCol, CLabel, CRow, CFormGroup, CImg, CInputCheckbox
} from "@coreui/react";

const ComponentAssignRolePermission = (props) => {

  return (
    <CCard className="custom-card">
        <CRow style={{ marginTop: "15px", marginLeft: "5px"}}>
          <CCol lg="6">
            <CLabel>
              <h4 className="title-bottom-line">{props.t('User Level')}</h4>
            </CLabel>
            {
              props.userLevel.length > 0 &&
              <CRow>
                {
                  props.levelShow === false &&
                  <CImg
                    src="/image/plus.png" className="plus-minus"
                    draggable={false} onClick ={props.userLevelChange}
                  />
                }
                {
                  props.levelShow === true  &&
                  <CImg
                    src="/image/minus.png" className="plus-minus"
                    draggable={false} onClick ={props.userLevelChange}
                  />
                }
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom id="main" name="main"
                    onChange={props.userLevelMainChange} checked={props.levelMain}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="main">
                    {props.company}
                  </CLabel>
                </CFormGroup>
              </CRow>
            }
            {
              props.userLevel !== "" && props.levelShow === true &&
              props.userLevel.map(level => {
                return(
                <CRow style={{ marginTop: "10px", marginLeft: "48px"}} key={level.id}>
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox
                      custom id={level.admin_level_name} name={level.admin_level_name}
                      onChange={props.userLevelSubChange.bind(this,level)}
                      checked={level.is_checked === true}
                    />
                    <CLabel variant="custom-checkbox" htmlFor={level.admin_level_name}>
                      {level.admin_level_name}
                    </CLabel>
                  </CFormGroup>
                </CRow>
                )
              })
            }
          </CCol>
          <CCol lg="6" className="process">
            <CLabel>
            <h4 className="title-bottom-line">{props.t('Process')}</h4>
            </CLabel>
            {
              props.process !== "" &&
              props.process.map((first,first_index) => {
              return(
                <div key={first_index} >
                  <CRow style={{ marginTop: "8px"}}>
                    {
                      first.show === false &&
                      <CImg
                        src="/image/plus.png" className="plus-minus"
                        draggable={false} onClick ={props.firstIcon.bind(this,first)}
                      />
                    }
                    {
                      first.show ===  true  &&
                      <CImg
                        src="/image/minus.png" className="plus-minus"
                        draggable={false} onClick ={props.firstIcon.bind(this,first)}
                      />
                    }
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        custom id={first.main_menu} name={first.main_menu}
                        onChange={props.processFirst.bind(this,first)}
                        checked={first.is_checked}
                      />
                      <CLabel variant="custom-checkbox" htmlFor={first.main_menu}>
                        {props.t(first.main_menu)}
                      </CLabel>
                    </CFormGroup>
                  </CRow>
                  {
                    first.show === true &&
                    first.sub.map((second,second_index) => {
                      return(
                        <div key={second_index}>
                        <CRow className="mid_step">
                          {
                            second.sub_show === false &&
                            <CImg
                              src="/image/plus.png" className="plus-minus"
                              draggable={false} value={first_index} id={second_index}
                              onClick ={props.secondIcon}
                            />
                          }
                          {
                            second.sub_show ===  true  &&
                            <CImg
                              src="/image/minus.png" className="plus-minus"                              
                              draggable={false} value={first_index} id={second_index}
                              onClick ={props.secondIcon}
                            />
                          }
                          <CFormGroup variant="custom-checkbox"  inline>
                            <CInputCheckbox
                              custom id={second.sub_menu_name} name={second.sub_menu_name}
                              value={first_index} data-ref={second_index}
                              onChange={props.processSecond} checked={second.is_checked}
                            />
                            <CLabel
                              variant="custom-checkbox" htmlFor={second.sub_menu_name}
                              className="sub_menu_name">{props.t(second.sub_menu_name)}
                            </CLabel>
                          </CFormGroup>
                        </CRow>
                        {
                          second.sub_show === true &&
                          second.sub.map((third,third_index) => {
                            return(
                              <CRow key={third_index}  className="last_step">
                                <CFormGroup variant="custom-checkbox" inline >
                                  <CInputCheckbox
                                    custom id={third.action_id} name={third_index} value={first_index}
                                    data-ref={second_index} onChange={props.processThird} checked={third.is_checked}
                                  />
                                  <CLabel variant="custom-checkbox" htmlFor={third.action_id} className="action_name">
                                    {props.t(third.action_name)}
                                  </CLabel>
                                </CFormGroup>
                              </CRow>
                            )})
                        }
                        </div>
                      )})
                  }
                </div>
              )})
            }
          </CCol>
        </CRow>
        {
          props.process !== "" &&
          ((props.btnName === "Save" && props.loginPermission.includes("Save")) ||
           (props.btnName === "Update" && props.loginPermission.includes("Update"))) &&
          <CRow alignHorizontal="center" style={{marginTop: "30px",marginBottom: "40px"}}>
            <CButton className="form-btn" id="search-btn" onClick={props.save}>
              {props.t(props.btnName)}
            </CButton>
          </CRow>
        }
      </CCard>
  );
};

export default ComponentAssignRolePermission;
import React from 'react'
import {
  CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CForm, CFormGroup,
  CInput, CLabel, CSelect, CImg, CTextarea
} from '@coreui/react'
import message from '../../../erp/erp-common/commonMessage'
import CIcon from '@coreui/icons-react'

const BlockEmp = (props) => {

  return (
    <>
      <CCard>              
        <CCardHeader></CCardHeader>
        <CCardBody>
          <CForm action="" method="post" className="form-horizontal" id="emp_registeration">
            <CFormGroup row>
              <CCol md="2">
                  <CLabel htmlFor="employee-id">{props.t('Employee ID')}
                    <span className="require">*</span>
                  </CLabel>
              </CCol>
              <CCol xs="12" md="4">
                    <CInput id="employee-id" name="employee_id"
                     value={props.employeeData.employee_id || ''}
                     onChange={(e) => {props.dataChange(e)}} disabled
                    />
              </CCol>              
              <CCol md="2">
                  <CLabel htmlFor="employee-code">{props.t('Employee Code')}
                    <span className="require">*</span>
                  </CLabel>
              </CCol>
              <CCol xs="12" md="4">
                  <CInput id="employee-code" name="employee_code"
                    value={props.employeeData.employee_code || ''}
                    onChange={(e) => {props.dataChange(e)}}
                  />
              </CCol>
            </CFormGroup>
            
            <CFormGroup row>                    
              <CCol md="2">
                  <CLabel htmlFor="employee-name">{props.t('Employee Name')}
                    <span className="require">*</span>
                  </CLabel>
              </CCol>
              <CCol xs="12" md="4">
                  <CInput id="employee-name" name="name"
                   value={props.employeeData.name || ''}
                   onChange={(e) => {props.dataChange(e)}}
                  />
              </CCol>
              <CCol md="2">
                  <CLabel htmlFor="employee-name-eng">{props.t('Employee Name ENG')}
                    <span className="require">*</span>
                  </CLabel>
              </CCol>
              <CCol xs="12" md="4">
                  <CInput id="employee-name-eng" name="name_eng"
                   value={props.employeeData.name_eng || ''}
                   onChange={(e) => {props.dataChange(e)}}
                  />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="2">
                  <CLabel htmlFor="phone">{props.t('Phone Number')}</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                  <CInput id="phone" name="phone_no"
                   value={props.employeeData.phone_no || ''}
                   onChange={(e) => {props.dataChange(e)}}
                  />
              </CCol>
              <CCol md="2">
                  <CLabel htmlFor="nrc-num">{props.t('NRC Number')}
                  </CLabel>
              </CCol>
              <CCol xs="12" md="4">
                  <CInput id="nrc-num" name="nrc_number"
                   value={props.employeeData.nrc_number || ''}
                   onChange={(e) => {props.dataChange(e)}}
                  />
              </CCol>
            </CFormGroup>    

              <CFormGroup row>
                <CCol md="2"></CCol>
                <CCol xs="12" md="4" className="text-right generate_btn">
                {
                  props.btnSaveEdit === "Save" &&
                  <CButton className="form-btn" onClick={props.generatePassword}>
                    {props.t("Generate Password")}
                  </CButton>
                }
                </CCol>
                <CCol md="2" className="lblArea">
                  <CLabel htmlFor="area">{props.t('Area')}</CLabel>
                  <span className="require">*</span>
                </CCol>
                <CCol xs="12" md="4" className="selectArea">
                  <CSelect custom id="area"
                  value={props.employeeData.area_id || ''}
                  name="area_id" onChange={(e) => {props.dataChange(e)}}>
                    <option value="0">.....{props.t('select Area')}.....</option>
                    {
                      props.area.length > 0 &&
                      props.area.map(a => {
                      return(
                        <option key={a.id} value={a.id}>{a.area_name}</option>
                      )
                    })}
                  </CSelect>
                </CCol>
              </CFormGroup>         
            
            {
              props.btnSaveEdit === "Save" &&
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="phone">{props.t('Password')}
                    <span className="require">*</span>
                  </CLabel>
                </CCol>
                <CCol xs="12" md="4">
                  <CInput id="password" name="password" className="pr-4"
                   value={props.employeeData.password || ''}
                   onChange={(e) => {props.dataChange(e)}} type={props.form_data.input_type}
                  />
                  <span className="eye" data-ref={props.form_data.eye_value} onClick={props.click_eye}>
                    <CImg src={`/image/${props.form_data.eye_type}`} width="18px" style={ { opacity: 0.8 } } draggable={false} />
                  </span>
                </CCol>
                <CCol md="2" className="confirm_pwd">
                    <CLabel htmlFor="confirm-pwd">{props.t('Confirm Password')}
                        <span className="require">*</span>
                    </CLabel>
                </CCol>
                <CCol xs="12" md="4">
                    <CInput id="confirm-pwd" name="confirmPassword"
                     value={props.employeeData.confirmPassword || ''}
                     onChange={(e) => {props.dataChange(e)}}  type={props.form_data.input_type}
                    />
                </CCol>
              </CFormGroup>
            }
            
            {
              props.btnSaveEdit === "Save" &&
              <div className="info-msg">
                <div className="mt-1 mb-1">
                    <CIcon name="cil-warning" size="sm" style={{marginBottom: "5px"}}/>
                    <font className="ml-1">{props.t(message.JSE018)}</font>
                </div>
              </div>
            }

            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="email">{props.t('Email Address')}
                  <span className="require">*</span>
                </CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CInput type="email" id="email" autoComplete="email" name="email"
                 value={props.employeeData.email || ''}
                 onChange={(e) => {props.dataChange(e)}}
                />
              </CCol>
              <CCol md="2">
                <CLabel htmlFor="passport">{props.t('Passport Number')}</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CInput id="passport" name="passport_number"
                 value={props.employeeData.passport_number || ''}
                 onChange={(e) => {props.dataChange(e)}}
                />
              </CCol>
            </CFormGroup>
            
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="emp-type">
                  {props.t('Employee Type')}
                  <span className="require">*</span>
                </CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CSelect custom id="emp-type"
                value={props.employeeData.employee_type || ''}
                name="employee_type" onChange={(e) => {props.dataChange(e)}}>
                  <option value="0">.....{props.t('select Employee Type')}.....</option>
                  <option value="1">Permanent</option>
                  <option value="2">Part time</option>
                  <option value="3">Contract</option>
                  <option value="4">Indirect/Driver</option>
                </CSelect>
              </CCol>
              <CCol md="2">
                <CLabel htmlFor="role">
                  {props.t('Role')}
                  <span className="require">*</span>
                </CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CSelect custom id="role"
                value={props.employeeData.role || ''}
                name="role" onChange={(e) => {props.dataChange(e)}}>
                  <option value="0">.....{props.t('select Role')}.....</option>
                  {
                    props.role.length > 0 &&
                    props.role.map(r => {
                    return(
                      <option key={r.id} value={r.id}>{r.name}</option>
                    )
                  })}
                </CSelect>
              </CCol>              
            </CFormGroup> 
            
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="home_number">{props.t('House No/Unit No')}
                </CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CInput id="home_number" name="home_number"
                 value={props.employeeData.home_number || ''}
                 placeholder="e.g,No.23.3rd floor"
                 onChange={(e) => {props.dataChange(e)}}
                 onBlur={props.changeAddress}
                />
              </CCol>
              <CCol md="2">
                <CLabel htmlFor="streetward">{props.t('Streetward')}</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CInput id="streetward" name="street_quarter"
                 value={props.employeeData.street_quarter || ''}
                 onChange={(e) => {props.dataChange(e)}}
                 onBlur={props.changeAddress}
                />
              </CCol>                    
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="township">{props.t('Township')}</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CInput id="township" name="township"
                 value={props.employeeData.township || ''}
                 onChange={(e) => {props.dataChange(e)}}
                 onBlur={props.changeAddress}
                />
              </CCol>
              <CCol md="2">
                <CLabel htmlFor="city">{props.t('City')}</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CInput id="city" name="city"
                 value={props.employeeData.city || ''} onBlur={props.changeAddress}
                 onChange={(e) => {props.dataChange(e)}} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="division">{props.t('State / Division')}</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CSelect custom id="division" value={props.employeeData.state_division || ''}
                  name="state_division" onChange={(e) => {props.dataChange(e)}}
                  onBlur={props.changeAddress} >
                  <option value="0">.....{props.t('select State/Division')}.....</option>
                  {
                    props.states.length > 0 &&
                    props.states.map(s => {
                    return(
                      <option key={s.id} value={s.state_name}>{s.state_name}</option>
                    )                          
                  })}
                </CSelect>
              </CCol>
              <CCol md="2">
                <CLabel htmlFor="country">{props.t('Country')}</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CSelect custom id="country" value={props.employeeData.country || ''}
                  name="country" onChange={(e) => {props.dataChange(e)}}
                  onBlur={props.changeAddress} >
                  <option value="0">.....{props.t('select Country')}.....</option>                        
                  {
                    props.country.length > 0 &&
                    props.country.map(c => {
                    return(
                      <option key={c.id} value={c.country_name}>{c.country_name}</option>
                    )                          
                  })}
                </CSelect>
              </CCol>
            </CFormGroup>
            
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="address">{props.t('Address')}</CLabel>
              </CCol>
              <CCol xs="12" md="10" className="address">
                <CTextarea disabled className="form-control" id="address" rows="2"
                  value={props.employeeData.address || ''} />
              </CCol>
            </CFormGroup>
            
            <CFormGroup row>                    
              <CCol md="2">
                <CLabel htmlFor="postal">{props.t('Postal Code')}</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CInput id="postal" name="post_code"
                 value={props.employeeData.post_code || ''}
                 onChange={(e) => {props.dataChange(e)}} />
              </CCol>
              <CCol md="2">
                <CLabel htmlFor="photo">{props.t('Upload Photo')}</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <input accept="image/*" data-type='image' className="custom-file-input" id="photo"
                  onChange={(e) => props.handleImageChange(e)} name="photo" type="file" />
                <label className="custom-file-label" htmlFor="file-input">
                  { props.selectFile ? props.selectFile: props.t("Click to upload") }                        
                </label>
                <CButton className="photo-clear" onClick={props.clearPhoto}>Remove</CButton>

                <div className="require">
                    { props.imgError } 
                </div>

                {
                  props.imagePreviewUrl &&
                  <div className="imgPreview position-absolute">
                      <img src={props.imagePreviewUrl} alt={props.selectFile} />
                  </div>
                }

                {
                  !props.imagePreviewUrl && props.editImage &&
                  <div className="imgPreview position-absolute">
                    <img src={props.editImage}
                      alt={props.editImage}
                    />
                  </div>
                }
                
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="department">{props.t('Department Name')}
                  <span className="require">*</span>
                </CLabel>                
              </CCol>
              <CCol xs="12" md="4">
                <CSelect custom id="department"
                  name="department" onChange={(e) => {props.deptChange(e)}}>
                  <option value="0">---{props.t('select Department Name')}---</option>
                  {
                    props.department.length > 0 &&
                    props.department.map(s => {
                    return(
                      <option key={s.id} value={s.id}>{s.department_name}</option>
                    )                          
                  })}
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="position">{props.t('Position Name')}
                  <span className="require">*</span>
                </CLabel>
                
              </CCol>
              <CCol xs="12" md="4">
                <CSelect custom id="position"
                  name="position" onChange={(e) => {props.setPositionId(e.target.value)}}>
                  <option value="0">.....{props.t('select Position Name')}.....</option>                        
                  {
                    props.position.length > 0 &&
                    props.position.map(c => {
                    return(
                      <option key={c.id} value={c.id}>{c.position_name}</option>
                    )                          
                  })}
                </CSelect>
              </CCol>
            </CFormGroup>
          </CForm>
          <CRow>
              <CCol md="1"></CCol>
              <CCol className="dept_pos_btn">
                  <CButton className="add-dept-btn form-btn" type="submit" onClick={props.AddDeptPos}>{props.t('Add Dept & Position')}</CButton>
              <CCol md="2"></CCol>
              </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default BlockEmp
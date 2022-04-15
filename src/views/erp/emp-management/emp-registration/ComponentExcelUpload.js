/**
 * Employee Registration Form
 * @author Thin Thin Nwe
 * @create 20/5/2021
*/

import React from 'react'
import {
  CRow, CCol, CCard, CCardBody, CLabel, CForm, CButton, CImg, CInputFile
} from '@coreui/react'
import './emp-registration.scss'

const BlockExcelUpload = (props) => {

  return (
    <CCard className="custom-card">
        <CCardBody>
            <CForm className="form-horizontal mt-2 mb-2">
                <CRow className="mr-1">
                    <CCol lg="6">                                
                    </CCol>
                    <CCol lg="6">
                        <CRow alignHorizontal="end">
                            <CButton className="download-format-btn" onClick={props.excel_download}>
                                <CRow alignHorizontal="center">
                                    <CImg src="/image/xls.png" className="download-format" block/>
                                    <div className="download-format-text">{props.t('Excel Download Format')}</div>
                                </CRow>
                            </CButton>
                        </CRow>
                    </CCol>
                </CRow>
                <CCol lg="12">
                    <CRow className="m-top-20 mb-3" alignHorizontal="center">
                        <CCol lg="5" className="excel-border text-center">
                            <CRow alignHorizontal="center">
                                <CLabel htmlFor="importExcel" className="text-center pointer">
                                    <CImg src="/image/attach.png" className="excel-image ml-0" block/>
                                </CLabel>
                                <CInputFile id="importExcel" accept=".xls,.xlsx" className="hide" onChange={props.change_file} onClick={props.clear_file} required/>
                            </CRow>
                            <CRow>
                                <CCol className="text-center">
                                    <CLabel htmlFor="importExcel" className="c-browse pointer">{props.t('Browse your excel file')}</CLabel>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                    {
                        props.Save === true &&
                        <CRow>
                          <CCol md="12">
                            <CRow className="m-top-20 mb-3" alignHorizontal="center">
                                <CCol xs="8" sm="5" md="5" className="pl-0 excel_block">
                                  <p className="break-all d-inline-block">{props.ExcFileName}</p>
                                  {
                                    props.Remove === true &&
                                    <CImg src="/image/remove.png" className="excel-remove pointer" onClick={props.remove_file}/>
                                  }
                                </CCol>
                            </CRow>
                          </CCol>
                        </CRow>
                    }
                    {
                        props.Save === true &&
                        <CRow alignHorizontal="center" className="mt-2 mb-3">
                            <CButton className="form-btn" onClick={props.save_excel}>{props.t('Save')}</CButton>
                        </CRow>
                    }
                </CCol>
            </CForm>
        </CCardBody>
    </CCard>
  )
}

export default BlockExcelUpload
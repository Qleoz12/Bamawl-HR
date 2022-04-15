import React from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CLabel, CImg, CInput, CFormGroup, CForm, CButton, CTextarea } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const HeaderSetting = props => {
    const {t} = useTranslation();
    return(<>
        <CRow lg="12" xs="12" className="mt-3 mb-2">
            <CCol lg="3" xs="4">
                <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                <CLabel className="required middle ml-2">{props.label}</CLabel>
            </CCol>
            <CCol lg="3" xs="4" className="ml-2">
                <CInput type="text" className="bamawl-input" value={props.value} onChange={props.change} ></CInput>
            </CCol>
            <CCol>
                <CButton className="form-btn" onClick={props.add}>{t('Add')}</CButton>
            </CCol>
        </CRow>
        {
            props.data.length > 0 &&
            <CCard className='table-panel mb-3' style={{border:'1px solid #E6E6E6',borderRadius:'10px',margin:"10px 10px"}}>
                <CRow>
                    <CCol lg="12">
                        <div className="table-responsive">
                            <table className="table" style={{width:"40%",margin:"15px 45px"}}>
                                <tbody>
                                    {
                                        props.data.map( (i,index) => {
                                            return(
                                                <tr>
                                                    <td className="td-no" style={{textAlign:"right"}}>
                                                        {index+1}
                                                    </td>
                                                    <td className="td-green" style={{textAlign:"left"}}>
                                                        {i.header_name}
                                                    </td>
                                                    <td>
                                                        <CLabel style={{margin:"8px"}} onClick={props.remove.bind(this,i)}>{t('Delete')}</CLabel>
                                                        <CImg src={'avatars/remove.png'} className="icon-clt" alt="remove" onClick={props.remove.bind(this,i)} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </CCard>

        }
    </>)
}

export default HeaderSetting

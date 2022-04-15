import React from 'react';
import { useTranslation } from 'react-i18next';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CLabel, CImg, CInput, CFormGroup, CForm, CSelect, CButton, CTextarea } from '@coreui/react';


const AttachFileTable = props => {
    const {t} = useTranslation();
    return(<>
        {
            props.data.length > 0  &&
            <>
                <CRow className="mt-5 mb-4">
                    <CCol lg="12">
                        <div className="table-responsive">
                            <table className="table" aria-label="simple table">
                                <thead>
                                    <tr width="100%">
                                        <th style={{ minWidth: '50px' }}>
                                            { t('No') }
                                        </th>
                                        <th style={{ minWidth: '100px' }} style={{ borderRight: 'none' }}>
                                            { t('Name') }
                                        </th>
                                        <th style={{ minWidth: '50px' }} style={{ border: 'none' }}>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.data.map( (i,index) => {
                                            return(
                                                <tr key={index} width="100%">
                                                    <td className="td-no" style={{textAlign:"center"}}>{index+1}</td>
                                                    <td className="td-green" style={{ borderLeft: 'none', borderRight: 'none', wordBreak: 'break-word' }}>
                                                        {i.attach_file_name}
                                                    </td>
                                                    <td className="td-green" style={{ borderLeft: 'none', borderRight: 'none' }}>
                                                        <CImg className="icon-clt" src="/avatars/download.png" onClick={props.download.bind(this,i)} />
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
            </>
        }
    </>)
}

export default AttachFileTable

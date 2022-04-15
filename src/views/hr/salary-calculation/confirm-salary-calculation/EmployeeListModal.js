import React from 'react';
import { useTranslation } from 'react-i18next';
import { CModal, CModalHeader, CModalBody, CCol, CRow, CButton } from '@coreui/react';

const EmployeeListModal = props => {
    const {t} = useTranslation();
    return(<>
        {
            props.depList.length > 0 &&
            <>
            <CModal size="lg" closeOnBackdrop={false} show={props.showDepModal}>
            <CModalHeader style={{ color: 'black', fontSize: 18}}>{t(`Employee List For ${props.depNameInModal}`)}</CModalHeader>
            <CModalBody>
                <div className="mb-4 mt-3" style={{border:'1px solid #E6E6E6',borderRadius:'20px'}}>
                    <CRow className="mt-5 mb-4 ml-2 mr-2">
                        <CCol lg="12">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                { t('No') }
                                            </th>
                                            <th style={{ minWidth: '110px' }}>
                                                { t('Employee ID') }
                                            </th>
                                            <th style={{ minWidth: '110px' }}>
                                                { t('Employee Code') }
                                            </th>
                                            <th style={{ minWidth: '110px' }}>
                                                { t('Employee Name') }
                                            </th>
                                            <th style={{ minWidth: '110px' }}>
                                                { t('Email') }
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.depList.map( (i,index) => {
                                                return(
                                                    <tr key={index} width="100%">
                                                        <td className="text-center td-no">
                                                            {index+1}
                                                        </td>
                                                        <td className="text-right" style={{ minWidth: '110px' }}>
                                                            {i.employee_id}
                                                        </td>
                                                        <td className="text-left" style={{ minWidth: '110px' }}>
                                                            {i.employee_code}
                                                        </td>
                                                        <td className="text-left" style={{ minWidth: '110px' }}>
                                                            {i.employee_name}
                                                        </td>
                                                        <td className="text-center bg-blue" style={{ minWidth: '110px' }}>
                                                            {i.email}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <CRow alignHorizontal="center" className="mt-2">
                                <CButton className="form-btn" onClick={props.close}>{t('Close')}</CButton>
                            </CRow>
                        </CCol>
                    </CRow>
                </div>
            </CModalBody>
            </CModal>
            </>
        }
    </>)
}

export default EmployeeListModal

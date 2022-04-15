/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
    CCol,
    CRow,
    CImg,
    CLabel,
    CSelect,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const TitleOvertimeEmployeeOrvertimeRegistration = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        mainTable,
        OTNameAPI,
        otTitleChange,
        selectedOTData
    } = props

    return (<>
        {
            mainTable != "" &&
            <>
                <CRow lg="12" >
                    <CCol lg="2">
                        <CImg src={'avatars/list.png'} className="" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                        <CLabel id="lblOvertimeTitle" style={{ fontWeight: 'bold', marginLeft: "10px" }}>{t('Overtime Title')}<span className="required"></span></CLabel>
                    </CCol>
                    <CCol lg="3">
                        <CSelect className="bamawl-select" value={selectedOTData} onChange={otTitleChange} custom>
                            <option key="" value="">{t('---Select Title---')}</option>
                            {
                                OTNameAPI != "" &&
                                OTNameAPI.map((ot, index) => {
                                    return (
                                        <option key={index} value={ot.id}>{`${ot.overtime_name} (${ot.sn_name})`}</option>
                                    )
                                })
                            }
                        </CSelect>
                    </CCol>
                </CRow><br />
            </>
        }
    </>
    );
}
export default TitleOvertimeEmployeeOrvertimeRegistration;

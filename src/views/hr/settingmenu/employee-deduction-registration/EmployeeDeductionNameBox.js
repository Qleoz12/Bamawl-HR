/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
    CCard,
    CCol,
    CImg,
    CLabel,
    CSelect,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * EmployeeDeductionNameBox
 * 
 * @author  v_hao
 * @create_date  2021-05-31
 */
const EmployeeDeductionNameBox = props => {
    let {
        deductionName,
        deductionID,
        deductionNameChange,
        DeductionNameAPI,
    } = props;

    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            <>
                <CCol lg="12">
                    <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
                    <CLabel style={{ fontWeight: "bold" }} id="lbDeductionName" className="title-lbl">{t('Deduction Name')}</CLabel>
                </CCol>
                <CCard className="panel-employee-deduction" style={{ height: "75px" }}>
                    <div className="panel-name" style={{ width: "25%", minWidth: "250px" }}>
                        <CSelect className="bamawl-select" onChange={deductionNameChange} value={deductionID} custom>
                            <option key="" value="">{t('---Select Deduction Name---')}</option>
                            {
                                DeductionNameAPI != "" && props.DeductionNameAPI.length > 0 &&
                                DeductionNameAPI.map((ot, index) => {
                                    return (
                                        <option key={index} value={ot.id} name={ot.deduction_name}>{ot.deduction_name.length > 40 ? ot.deduction_name.substring(0, 40) + "..." : ot.deduction_name}</option>
                                    )
                                })
                            }
                        </CSelect>
                    </div>
                </CCard>
            </>
        }
    </>
    );
}
export default EmployeeDeductionNameBox;

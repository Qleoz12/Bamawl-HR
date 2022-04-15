import React, { useEffect } from 'react';
import { CCol, CRow, CImg, CLabel } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import $ from 'jquery';
/**
 * SalaryCalculateSettingCalculateSalary Component use for SalaryCalculateSettingIndex
 * 
 * @author  dh_khanh
 * @create_date  
 */
const SalaryCalculateSettingCalculateSalary = props => {
    let {
        radCalculateSalary,
        handleChangeRadCalculateSalary,
        detailData,
        elementFocus1,
        elementFocus2,
        elementFocus3
    } = props;
    const { t } = useTranslation();

    useEffect(() => {
    });

    return (<>
        <CRow>
            <CCol>
                <div className="d-flex align-items-center" >
                    <CImg src={'avatars/list.png'} alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                    <CLabel id="lblCalcualateSalary" style={{ margin: "0 10px" }}>{t('Calculate Salary')}</CLabel>
                </div>
                <div className="box-container box-container-grid">
                    <label className="box-content">
                        <span >{t('Not Calculate')}</span>
                        <input type="radio" id="radNotCalculateSalary" name="radCalculateSalary" value={2}
                            onChange={handleChangeRadCalculateSalary}
                            checked={radCalculateSalary === 2}
                            disabled={detailData !== null && radCalculateSalary !== 2}
                            ref={elementFocus1}
                        ></input>
                    </label>
                    <label className="box-content">
                        <span >{t('Calculate')}</span>
                        <input type="radio" id="radCalculate" name="radCalculateSalary" value={1}
                            onChange={handleChangeRadCalculateSalary}
                            checked={radCalculateSalary === 1}
                            disabled={detailData !== null && radCalculateSalary !== 1}
                            ref={elementFocus2}
                        ></input>
                    </label>
                    <label className="box-content">
                        <span >{t('Not Calculate But Pay Full Salary')}</span>
                        <input type="radio" id="radCalculateSalary" name="radCalculateSalary" value={3}
                            onChange={handleChangeRadCalculateSalary}
                            checked={radCalculateSalary === 3}
                            disabled={detailData !== null && radCalculateSalary !== 3}
                            ref={elementFocus3}
                        ></input>
                    </label>
                </div>
            </CCol>
        </CRow>
    </>)
}

export default SalaryCalculateSettingCalculateSalary;
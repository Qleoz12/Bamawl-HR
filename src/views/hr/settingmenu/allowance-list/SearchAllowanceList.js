/* eslint-disable no-use-before-define */
import React ,{useEffect} from 'react';
import {
    CCol,
    CRow,
    CImg,
    CButton,
    CSelect
} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const SearchAllowanceList=props=> {
    let{
        getAllowanceCategory,
        getAllowanceType,
        searchList,
        allowanceList,
        selectAllowance,
        defaultValueAllowance
    }=props
    const{t} = useTranslation();
    useEffect(() => {
    },); 

    return (<>
        <CRow className="mb-4">
            <CCol lg="12">
                <CImg
                    src={'avatars/list.png'}
                    className="list-icon mr-2 mb-1"
                    width="6px"
                    
                />
                <label id="lblAllowanceTitle">{t('Allowance Title')}</label>
            </CCol>
            <div className="drop-search"
            >
            <div className="p-1 ">
            <CSelect autoFocus={true} className="wrap select input-allowancename bamawl-select" style={{ width: '325px'}} onChange={selectAllowance} id="dropAllowanceTitle" value={defaultValueAllowance} custom>
                    <option key="" value="">
                    ---{t("Select Allowance")}---
                    </option>
                    {
                    allowanceList.map((allowance, index) => {
                        return(
                            <option style={{width:"50px"}} title={allowance.allowance_name} key={index} value={allowance.id}>{allowance.allowance_name.length>40?allowance.allowance_name.substring(0,40)+"...":allowance.allowance_name}</option>
                        )
                    })
                    }
                </CSelect>
            </div>
            </div>
        </CRow>
        <CRow className="mb-4">
            <CCol lg="12">
                <CImg
                    src={'avatars/list.png'}
                    className="list-icon mr-2 mb-1"
                    width="6px"
                    
                />
                <label id="lblAllowanceCategory">{t('Allowance Category')}</label>
            </CCol>
            <div className="radio-containt">
                <CRow>
                    <CCol md="3" sm="4">
                        <label id="lblExperience" className="chkAllowanceCategogyName">
                            {t('Experience')}
                            <input
                                className="chkAllowanceCategogyName"
                                onChange={getAllowanceCategory}
                                type="radio"
                                name="Category"
                                value="Experience"
                                id="1"
                            />
                        </label>
                    </CCol>
                    <CCol md="3" sm="4">
                        <label id="lblQualification">
                            {t('Qualification')}
                            <input
                                defaultChecked
                                className="chkAllowanceCategogyName"
                                onChange={getAllowanceCategory}
                                type="radio"
                                name="Category"
                                value="Qualification"
                                id="2"
                            />
                        </label>
                    </CCol>
                    <CCol md="3" sm="4">
                        <label id="lblOther">
                            {t('Other')}
                            <input
                                className="chkAllowanceCategogyName"
                                onChange={getAllowanceCategory}
                                type="radio"
                                name="Category"
                                value="Other"
                                id="3"
                            />
                        </label>
                    </CCol>
                </CRow>
            </div>
        </CRow>
        <CRow className="mb-4">
            <CCol lg="12">
                <CImg
                    src={'avatars/list.png'}
                    className="list-icon mr-2 mb-1"
                    width="6px"
                    
                />
                <label id="lblAllowanceType">{t('Allowance Type')}</label>
            </CCol>
            <div className="radio-containt">
                <CRow>
                    <CCol md="3" sm="4">
                        <label id="lblMonthly">
                            {t('Monthly')}
                            <input
                                defaultChecked
                                className="chkAllowanceTypeName"
                                type="radio"
                                onChange={getAllowanceType}
                                name="Type"
                                value="Monthly"
                                id="1"
                            />
                        </label>
                    </CCol>
                    <CCol md="3" sm="4">
                        <label id="lblDaily">
                            {t('Daily')}
                            <input
                                className="chkAllowanceTypeName"
                                type="radio"
                                onChange={getAllowanceType}
                                name="Type"
                                id="2"
                                value="Daily"
                            />
                        </label>
                    </CCol>
                    <CCol md="3" sm="4">
                        <label id="lblOneTime">
                            {t('One Time')}
                            <input
                                className="chkAllowanceTypeName"
                                type="radio"
                                onChange={getAllowanceType}
                                name="Type"
                                id="3"
                                value="OneTime"
                            />
                        </label>
                    </CCol>
                    <CCol md="3" sm="4">
                        <label id="lblOthers">
                            {t('Others')}
                            <input
                                className="chkAllowanceTypeName"
                                type="radio"
                                onChange={getAllowanceType}
                                name="Type"
                                id="4"
                                value="Other"
                            />
                        </label>
                    </CCol>
                </CRow>
            </div>
        </CRow>
        <CRow
         className="mb-4"
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <CButton className="form-btn" onClick={searchList}>
                {t('Search')}
            </CButton>
        </CRow>
    </>
    );
}
export default SearchAllowanceList;

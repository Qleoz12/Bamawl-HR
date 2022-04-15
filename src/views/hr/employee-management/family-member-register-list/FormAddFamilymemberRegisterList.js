import React, { useEffect } from 'react';
import { CCol, CRow, CSwitch, CSelect,CLabel } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { TextField } from "@material-ui/core";
const FormAddFamilymemberRegisterList = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });
    let {
        loadRelationship,
        relationshipChange,
        selectRelationship,
        living,
        livingChange,
        incomeTaxRelief,
        incomeChange,
        nameFamilyChange,
        nameFamily,
        nrcNumber,
        nrcNumberChange,
        occupation,
        occupationChange,
        checkAction
    } = props
    
    return (<>
        {checkAction == 1 && (
            <>
                <CRow lg="12" className="mb-4 expense-request-text-field">
                    <CCol lg="5">
                        <CLabel id="lblFamilyMember'sName" className="required">{t("Family Member's Name")}</CLabel>
                        <TextField fullWidth id="txtFamilyMembersName" className="bamawl-select" onChange={nameFamilyChange} value={nameFamily}
                            maxLength="50" autoFocus={true} />
                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg="5">
                        <CLabel id='lblRelationship' className="required">{t('Relationship')}</CLabel>
                        <CSelect className="bamawl-select" id="dropRelationship" value={selectRelationship} onChange={relationshipChange} custom>
                            <option key="" value="">---{t('Select Relationship')}---</option>
                            {
                                loadRelationship().map((item)=> {
                                    return (<option key={item.key} value={item.value}> {item.value} </option>)
                                })
                            }
                        </CSelect>
                    </CCol>
                </CRow>
                <CRow lg="12" className="mb-4 expense-request-text-field" >
                    <CCol lg="5" className="text-left">
                        <CLabel id="lblNRCNumber">{t("NRC Number")}</CLabel>
                        <TextField fullWidth id="txtNRCNumber" className="bamawl-select" value={nrcNumber} onChange={nrcNumberChange}
                            maxLength="40" />
                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg="5" className="text-left">
                        <CLabel id="lblOccupation">{t("Occupation")}</CLabel>
                        <TextField fullWidth id="txtOccupation" className="bamawl-select" value={occupation} onChange={occupationChange}
                            maxLength="100" />
                    </CCol>
                </CRow>
                <CRow className="mb-4 expense-request-text-field" >
                    <CCol lg='5' md='5' sm='5' className="d-inline-flex">
                        <CLabel htmlFor="toggleSwitch" className={living === 1 ? 'lableLiving mr-2' : 'mr-2 text-black-50'} >
                            {t("Living")}
                        </CLabel>
                        <CSwitch
                            name="swiItem"
                            id="toggleSwitch"
                            className="mx-1 switch-alive-die c-switch-sm"
                            checked={living === 2 ? true : false}
                            onChange={livingChange}
                            shape="pill"
                        />
                        <CLabel className={living === 2 ? 'lableLiving ml-2' : 'ml-2 text-black-50'} htmlFor="toggleSwitch">
                            {t("Deceased")}
                        </CLabel>
                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg='5' md='5' sm='5' className="d-inline-flex">
                        <CLabel htmlFor="toggleSwitch" id='lblIncomeTaxRelief'>
                            {t("Income Tax Relief")}
                        </CLabel>
                        <CSwitch
                            name="swiItem"
                            id="toggleSwitch"
                            className="mx-1 c-switch-sm ml-3"
                            labelOn={'Yes'} labelOff={'No'}
                            disabled={living === 2}
                            checked={incomeTaxRelief === 1 ? true : false}
                            onChange={incomeChange}
                            color="success"
                            shape="pill"
                        />

                    </CCol>
                </CRow>
            </>
        )}
    </>
    );

}
export default FormAddFamilymemberRegisterList;

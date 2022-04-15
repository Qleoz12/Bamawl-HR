import { CCard, CCol, CImg, CRow } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeInfoDetailFamilyMemberBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {props.detailData && props.detailData.family_members.length > 0 && (
                <Fragment>
                    <CRow lg="12">
                        <h5 className="pl-3 font-weight-bold mt-4" style={{ color: "#4E57AA" }}>
                            <CImg className="emp-info-detail-img-sub" src="avatars/list.png" alt="list" />
                            {t('Family Member')}</h5>
                    </CRow>
                    <div>
                        <CCard className="table-panel emp-info-detail-card ">
                            {props.detailData.family_members.map((i, index) => {
                                return (
                                    <CRow key={index} lg="12" className="mt-3 mb-lg-2">
                                        <CCol lg="5" className="px-lg-5">
                                            <div className="mb-2">
                                                <div>
                                                    <label
                                                        className="font-weight-bold"
                                                        id="lbName">
                                                        {t('Name')}
                                                    </label>
                                                </div>
                                                <div>
                                                    <TextField
                                                        id={"txtName" + index}
                                                        className="input-emp-info-detail"
                                                        fullWidth
                                                        value={i.name}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </CCol>
                                        <CCol lg="2">
                                            <div className="line"></div>
                                        </CCol>
                                        <CCol lg="5" className="px-lg-5">
                                            <div className="mb-2">
                                                <div>
                                                    <label
                                                        className="font-weight-bold"
                                                        id="lbRelationship"
                                                    >
                                                        {t('Relationship')}
                                                    </label>
                                                </div>
                                                <div>
                                                    <TextField
                                                        id={"txtRelationship" + index}
                                                        className="input-emp-info-detail"
                                                        fullWidth
                                                        value={i.relationship}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </CCol>
                                    </CRow>
                                )
                            })}
                        </CCard>
                    </div>
                </Fragment>
            )}
            {props.detailData && props.detailData.family_members.length === 0 && (
                <Fragment>
                    <CRow lg="12">
                        <h5 className="pl-3 font-weight-bold mt-4" style={{ color: "#4E57AA" }}>
                            <CImg className="emp-info-detail-img-sub" src="avatars/list.png" alt="list" />
                            {t('Family Member')}</h5>
                    </CRow>
                    <div>
                        <CCard className="table-panel emp-info-detail-card ">
                            <CRow lg="12" className="mt-3 mb-lg-2">
                                <CCol lg="5" className="px-lg-5">
                                    <div className="mb-2">
                                        <div>
                                            <label
                                                className="font-weight-bold"
                                                id="lbName">
                                                {t('Name')}
                                            </label>
                                        </div>
                                        <div>
                                            <TextField
                                                id="txtName"
                                                className="input-emp-info-detail"
                                                fullWidth
                                                value=""
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </CCol>
                                <CCol lg="2">
                                    <div className="line"></div>
                                </CCol>
                                <CCol lg="5" className="px-lg-5">
                                    <div className="mb-2">
                                        <div>
                                            <label
                                                className="font-weight-bold"
                                                id="lbRelationship"
                                            >
                                                {t('Relationship')}
                                            </label>
                                        </div>
                                        <div>
                                            <TextField
                                                id="txtRelationship"
                                                className="input-emp-info-detail"
                                                fullWidth
                                                value=""
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </CCol>
                            </CRow>
                        </CCard>
                    </div>
                </Fragment>
            )}
        </>
    )
}
export default EmployeeInfoDetailFamilyMemberBox;

import React ,{useEffect} from 'react';
import {CModal, CModalBody,CRow, CButton, CCardBody,CCol,CImg,CLabel,CSwitch,CSelect,CCard} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import { TextField } from "@material-ui/core";
const Confirmation = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });
    let experience = 1;
    let qualification = 2;
    let others = 3;
    return (
            <>
                {props.addModalBox == true && (
                    <div>
                        <CModal
                            size="lg"
                            centered
                            closeOnBackdrop={false}
                            htmlFor="addBtn"
                            show={props.addModalBox}
                            onClose={props.addOnClose}
                        >
                            {
                            <CModalBody style={{ padding: '1rem' }}>
                                <CCardBody>
                                {/* Error */}
                                {props.errorModal && props.errorModal.length > 0 &&
                                    <CCard className="custom-card error p-3 mb-5">
                                        {
                                            props.errorModal.map((data, index) => {
                                                return (
                                                    <div key={index} className="msg">
                                                        {data}
                                                    </div>
                                                )
                                            })}
                                    </CCard>
                                }
                                <CRow>
                                    <CCol md="4" xs='12' className="d-flex align-items-center mb-4">
                                        <CImg
                                            src={"avatars/list.png"}
                                            className=""
                                            alt="titleicon"
                                            style={{
                                            width: "5px",
                                            height: "12px",
                                            marginBottom: "2px",
                                            }}
                                        />
                                        <CLabel  className="required m-3" id="lblAllowanceTitle">
                                            {t("Allowance Title")}
                                        </CLabel>
                                    </CCol>
                                    <CCol md="7" xs='12' className="mb-4">
                                        <CSelect className="bamawl-select" onChange={props.editID? null: props.awTitleChange} value={props.selectedAWData} name={props.allowanceCR} disabled={props.editID} id="dropAllowanceTitle" autoFocus={true} custom>
                                            <option key="" value="" >
                                            ---{t("Select Title")}---
                                            </option>
                                            {
                                            props.awTitleAPI.map((item) => {
                                                return (
                                                <option key={item.id} value={item.id} title={item.allowance_name} name={item.allowance_category}>{item.allowance_name.length>40?item.allowance_name.substring(0,40)+"...":item.allowance_name}</option>
                                                )
                                            })
                                            }
                                        </CSelect>
                                    </CCol>
                                </CRow>
                                <div className="d-flex float-right flex-wrap">
                                    <label htmlFor="toggleSwitch" id='lblDoYouPaySalary' className="mr-3">
                                    {t("Do you want to pay with salary?")}
                                    </label>
                                    <CSwitch
                                    name="swPaySalary"
                                    id="toggleSwitch"
                                    className="mx-1 switch-include-shift c-switch-sm"
                                    labelOn={'Yes'} labelOff={'No'}
                                    checked={props.payWithSalary == 1 ? true : false}
                                    onChange={props.handleSalary}
                                    color="info"
                                    shape="pill"
                                    />
                                </div>
                                <br />
                                </CCardBody>
                                {/* experience */}
                                <CCardBody>
                                {
                                    props.allowanceCR == experience &&
                                    <>
                                    <CRow>
                                        <CCol className="title-body">
                                        <CImg
                                            src={"avatars/list.png"}
                                            className=""
                                            alt="titleicon"
                                            style={{
                                            width: "5px",
                                            height: "12px",
                                            marginBottom: "2px",
                                            }}
                                        />
                                        <CLabel id='lblExperience' className="required ml-3">
                                            {t("Experience")}
                                        </CLabel>
                                        </CCol>
                                    </CRow>
                                    {/* body experience */}
                                    <div className="body-modal">
                                        <CRow>
                                            <CCol xs="12" md="6" className="mb-4 verticle-line">
                                                <CImg
                                                    src={"avatars/year.png"}
                                                    className="list-icon"
                                                    width="15px"
                                                    style={{
                                                        marginRight: "10px",
                                                        marginBottom: "6px",
                                                    }}
                                                />
                                                <CLabel id='lblYear'> {t("Year")} </CLabel>
                                                <br />
                                                <CSelect autoFocus={true} id="dropYear" className='bamawl-select' onChange={props.yearChange} value={props.selectedYear || ""} custom>
                                                    <option key="" value=''>---{t('Select Year')}---</option>
                                                    {
                                                        props.loadYear().map((data, index) => {
                                                        return (
                                                            <option key={index} value={data}>{data}</option>
                                                        )
                                                        })
                                                    }
                                                </CSelect>
                                            </CCol>
                                            <CCol xs="12" md="6" className="mb-4" >
                                                <CImg
                                                    src={"avatars/month.png"}
                                                    className="list-icon"
                                                    width="15px"
                                                    style={{
                                                        marginRight: "10px",
                                                        marginBottom: "6px",
                                                    }}
                                                />
                                                <CLabel id='lblMonth'> {t("Month")} </CLabel>
                                                <CSelect  id="dropMonth" className='bamawl-select' onChange={props.monthChange} value={props.selectedMonth || ""} custom>
                                                    <option key="" value=''>---{t('Select Month')}---</option>
                                                    {
                                                        props.loadMonth().map((data, index) => {
                                                        return (
                                                            <option key={index} value={data}>{data}</option>
                                                        )
                                                        })
                                                    }
                                                </CSelect>
                                            </CCol>
                                        </CRow>
                                        {/* limit */}
                                        <CRow md="12" className="expense-request-input-card-detail-subAllowance">
                                            <CCol xs="12" md="6" className="mb-4 verticle-line">
                                                <CLabel id='lblLimit'> {t("Limit")} </CLabel>
                                                <CSelect id="dropLimit" className='bamawl-select' onChange={props.limitChange} value={props.selectLimit} custom >
                                                    <option key="" value='' >{t('---Select limit---')}</option>
                                                    {
                                                        props.loadLimit().map((item) => {
                                                        return (
                                                            <option key={item.key} value={item.key}>{item.value}</option>
                                                        )
                                                        })
                                                    }
                                                </CSelect>
                                            </CCol>
                                        {/* Amount */}
                                            <CCol xs="12" md="6" className="mb-4">
                                                <CLabel id='lblAmount'> {t("Amount")} </CLabel>
                                                <br />
                                                <TextField fullWidth id="txtAmount" placeholder="$0" className="bamawl-select"  value={props.selectAmount} onChange={props.amountChange} maxLength={props.amount_limit}/>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol lg="3" md="4" xs="12" className="payType">
                                                <CImg
                                                    id='imgPay'
                                                    src={"avatars/paymenttype.png"}
                                                    className="list-icon"
                                                    style={{
                                                        width:"20px",
                                                        height:"20px",
                                                        marginRight: "10px",
                                                        marginBottom: "6px",
                                                        marginLeft: '10px'
                                                    }}
                                                />
                                                <CLabel id='lblPaymentType'> {t("Payment Type")} </CLabel>
                                            </CCol>
                                            {
                                                props.currencyAPI.map((item, index) => {
                                                return (
                                                    <Fragment key={index} >
                                                        <CCol lg="3" md="12" xs="6" className="d-flex flex-wrap">
                                                            <span style={{ marginRight: "10px" }} id={item.id}>
                                                            {item.currency_desc}
                                                            </span>
                                                            <CSwitch
                                                            name='swItem'
                                                            id={item.id}
                                                            value={item.currency_desc}
                                                            className="mx-1 switch-include-shift c-switch-sm"
                                                            color={item.currency_desc == 'MMK' ? 'primary' : 'info'}
                                                            shape="pill"
                                                            checked={props.currentcies == item.id ? true : false}
                                                            onChange={props.handleToggleCurrency}
                                                            />
                                                        </CCol>
                                                    </Fragment>
                                                )
                                                }
                                            )}
                                        </CRow>
                                    </div>
                                {/* End of experience */}
                                </>
                                }
                                {/* Qualification */}
                                {
                                    props.allowanceCR == qualification &&
                                    <>
                                    <CRow>
                                        <CCol className="title-body">
                                            <CImg
                                                src={"avatars/list.png"}
                                                className=""
                                                alt="titleicon"
                                                style={{
                                                width: "5px",
                                                height: "12px",
                                                marginBottom: "2px",
                                                }}
                                            />
                                            <CLabel id='lblQualification' className="required ml-3">
                                                {t("Qualification")}
                                            </CLabel>
                                        </CCol>
                                    </CRow>
                                    <div className="body-modal">
                                        <CRow className="expense-request-input-card-detail-subAllowance">
                                            <CCol md="6" sx="6" className="mb-4 verticle-line">
                                                <CLabel id='lblQualificationTitle'>{t("Title")}</CLabel>
                                                <TextField fullWidth className="bamawl-select" id="txtQualificationTitle" value={props.selectQualifi} onChange={props.qualifiChange} autoFocus={true} placeholder="Enter title" />
                                            </CCol>
                                            <CCol md="6" sx="6" className="mb-4">
                                                <CLabel id='lblAmount'> {t("Amount")} </CLabel>
                                                <TextField fullWidth className="bamawl-select" id="txtAmount" placeholder="$0" value={props.selectAmount} onChange={props.amountChange} maxLength={props.amount_limit}/>
                                            </CCol>
                                        </CRow>
                                        <CRow >
                                            <CCol lg="3" md="12" xs="12" className="payType">
                                                <CImg
                                                    id='imgPay'
                                                    src={"avatars/paymenttype.png"}
                                                    className="list-icon"
                                                    style={{
                                                        width:"20px",
                                                        height:"20px",
                                                        marginRight: "10px",
                                                        marginBottom: "6px",
                                                        marginLeft: '10px'
                                                    }}
                                                />
                                                <CLabel id='lblPaymentType'> {t("Payment Type")} </CLabel>
                                            </CCol>
                                            {
                                            props.currencyAPI.map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <CCol lg="3" md="4" xs="6" className="d-flex flex-wrap">
                                                        <span style={{ marginRight: "10px" }} id={item.id}>
                                                        {item.currency_desc}
                                                        </span>
                                                        <CSwitch
                                                        name='swItem'
                                                        id={item.id}
                                                        value={item.currency_desc}
                                                        className="mx-1 switch-include-shift c-switch-sm"
                                                        color={item.currency_desc == 'MMK' ? 'primary' : 'info'}
                                                        shape="pill"
                                                        checked={props.currentcies == item.id ? true : false}
                                                        onChange={props.handleToggleCurrency}
                                                        />
                                                    </CCol>
                                                </Fragment>
                                             )}
                                            )}
                                        </CRow>
                                    </div>
                                    </>
                                }
                                {/* End of Qualification */}

                                {/* Others */}
                                {
                                    props.allowanceCR == others &&
                                    <>
                                    <CRow>
                                        <CCol className="title-body">
                                            <CImg
                                                src={"avatars/list.png"}
                                                className=""
                                                alt="titleicon"
                                                style={{
                                                width: "5px",
                                                height: "12px",
                                                marginBottom: "2px",
                                                }}
                                            />
                                            <CLabel className="required ml-3" id='lblOthers'>
                                                {t("Others")}
                                            </CLabel>
                                        </CCol>
                                    </CRow>
                                    <div className="body-modal">
                                        <CRow md="12" className="expense-request-input-card-detail-subAllowance">
                                            <CCol md="6" sx="6" className="mb-4 verticle-line"  >
                                                <CLabel id='lblOtherTitle'>{t("Title")}</CLabel>
                                                <TextField fullWidth className="bamawl-select" id="txtOtherTitle" value={props.selectOther} onChange={props.otherChange} maxLength={200} autoFocus={true}  placeholder="Enter title"/>
                                            </CCol>
                                            <br />
                                            <CCol md="6" sx="6">
                                                <CLabel id='lblAmount'> {t("Amount")} </CLabel>
                                                <TextField fullWidth className="bamawl-select" id="txtAmount" placeholder="$0" value={props.selectAmount} onChange={props.amountChange} maxLength={props.amount_limit}/>
                                            </CCol>
                                        </CRow>
                                        <br />
                                        <CRow>
                                            <CCol lg="3" md="12" xs="12" className="payType">
                                                <CImg
                                                    id='imgPay'
                                                    src={"avatars/paymenttype.png"}
                                                    className="list-icon"
                                                    style={{
                                                        width : "20px",
                                                        height: "20px",
                                                        marginRight: "10px",
                                                        marginBottom: "6px",
                                                        marginLeft: '10px'
                                                    }}
                                                />
                                                <CLabel> {t("Payment Type")} </CLabel>
                                            </CCol>
                                            {
                                                props.currencyAPI.map((item, index) => {
                                                return (
                                                    <Fragment key={index} >
                                                        <CCol lg="3" md="4" xs="6" className="d-flex flex-wrap">
                                                            <span style={{ marginRight: "10px" }} id={item.id}>
                                                                {item.currency_desc}
                                                            </span>
                                                            <CSwitch
                                                                name='swItem'
                                                                id={item.id}
                                                                value={item.currency_desc}
                                                                className="mx-1 switch-include-shift c-switch-sm"
                                                                color={item.currency_desc == 'MMK' ? 'primary' : 'info'}
                                                                shape="pill"
                                                                checked={props.currentcies == item.id ? true : false}
                                                                onChange={props.handleToggleCurrency}
                                                            />
                                                        </CCol>
                                                    </Fragment>
                                                )}
                                            )}
                                        </CRow>
                                    <br />
                                    </div>
                                    </>
                                }
                                {/* End of other */}
                                {/* Button Save/Close */}
                                <br />
                                <CRow>
                                    <CCol className="text-center">
                                        <CButton className="form-btn mr-3"
                                            id='btnSave'
                                            name='btnSave'
                                            onClick={props.saveData}
                                        >   {t('Save')}
                                        </CButton>
                                        <CButton className="form-btn"
                                            id='btnClose'
                                            name='btnClose'
                                            onClick={props.addOnClose}
                                        >{t('Close')}
                                        </CButton>
                                    </CCol>
                                </CRow>
                                {/* end button Save/Close */}
                                </CCardBody>
                            </CModalBody>
                        }
                        </CModal>
                    </div>
                )}
            </>
        );
}
export default Confirmation;

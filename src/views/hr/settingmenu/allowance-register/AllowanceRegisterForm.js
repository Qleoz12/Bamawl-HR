import React from 'react';

import { useTranslation } from 'react-i18next';
import {
    CInput, CAlert, CSwitch, CRow, CCol,CImg
} from "@coreui/react";
import { TextField } from '@material-ui/core';
const AllowanceRegisterForm = props => {
    const { t } = useTranslation();
    let {
        shiftNameAPI,
        shiftNormalRuleId,
        allowanceName,
        onAllowanceTitleChange,
        allowanceCategory,
        allowanceType,
        handleTick,
        handleSwitch,
        basicSalaryInclude,
        totalCalculateInclude,
        taxCalculateInclude,
        shiftNameDisabled,
        allowanceTitleDisabled,
        allowanceCategoryDisabled,
        allowanceTypeDisabled,
        allowanceSettingDisabled

    } = props;

    const listAllowanceCategory = [
        { id: 1, name: t("Experience") },
        { id: 2, name: t("Qualification") },
        { id: 3, name: t("Other") },
    ];
    const listAllowancyType = [
        { id: 1, name: t("Monthly") },
        { id: 2, name: t("Daily") },
        { id: 3, name: t("One Time") },
        { id: 4, name: t("Others") },
    ];
    const listSwitch = [
        {
            id: 1,
            name: t("Basic Salary"),
            _color: "blue",
            checked: basicSalaryInclude,
            idLabel:'lblBasicSalary',
            idSwitch:'swBasicSalary'
        },
        {
            id: 2,
            name: t("Total Salary"),
            _color: "green",
            checked: totalCalculateInclude,
            idLabel:'lblTotalSalary',
            idSwitch:'swTotalSalary'
        },
        {
            id: 3,
            name: t("Income Tax"),
            _color: "yellow",
            checked: taxCalculateInclude,
            idLabel:'lblIncomeTax',
            idSwitch:'swIncomeTax'
        }
    ];

    /** End style   */
    return (
        <>
            <CRow>
                <CCol lg="12"  className="mb-4">
                <CImg
                    src={'avatars/list.png'}
                    className="list-icon mr-2 mb-1"
                    width="6px"
                />
                    <label id='lblShiftname' className="required"> {t("Shift Name")}</label>
                    {
                        typeof(shiftNameAPI) === 'string' && shiftNameAPI === '' &&
                        <CAlert color='secondary'>{t('JSE022')}</CAlert>
                    }
                    {
                        typeof(shiftNameAPI) === 'string' &&  shiftNameAPI !== ''&&
                        <div className="ARGridContainer">
                            {
                               <CAlert color='secondary'>{shiftNameAPI}</CAlert> 
                            }
                        </div>
                    }
                    {
                        typeof(shiftNameAPI) === 'object' && shiftNameAPI.length > 0 &&
                        <div className="ml-1 ARGridContainer ARGridContainer--180">
                            {

                                shiftNameAPI.map((item, idx) => {
                                    return (
                                        <LabelInput
                                            key={idx}
                                            type="checkbox"
                                            displayName={item.sn_name}
                                            inputName="shift-name"
                                            value={item.id}
                                            checked={shiftNormalRuleId.includes(item.id)}
                                            disabled={shiftNameDisabled}
                                            onChange={handleTick}
                                            className='chkboxTypeShiftName'
                                            focused={idx === 0}
                                        />
                                    )
                                })
                            }
                        </div>
                    }

                </CCol>
            </CRow>
            <CRow>
                <CCol lg="12"  className="mb-4">
                <CImg
                    src={'avatars/list.png'}
                    className="list-icon mr-2 mb-1"
                    width="6px"
                />
                    <label id='lblAllowanceTitle' className="required">{t("Allowance Title")}</label>
                    <div className="ml-1 brc-card">
                    <CRow className="expense-request-text-field-allowance">
                        <CCol lg="3">
                        <TextField
                            placeholder="Enter Title"
                            onChange={onAllowanceTitleChange}
                            value={allowanceName}
                            required
                            id='txtAllowanceTitle'
                            disabled={allowanceTitleDisabled}
                            maxLength="200"
                        ></TextField>
                        </CCol>
                    </CRow>
                    </div>
                </CCol>
            </CRow>
            <CRow>
                <CCol lg="12"  className="mb-4">
                <CImg
                    src={'avatars/list.png'}
                    className="list-icon mr-2 mb-1"
                    width="6px"
                />
                    <label id='lblAllowanceCategory' className="required"> {t("Allowance Category")}</label>
                <div className="ml-1 brc-card">
                    <CRow>
                        {
                            listAllowanceCategory.map((item, index) => {
                                return (
                                    <CCol md="3" sm="4" className="mb-1" key={index}>
                                    <LabelInput
                                        type="radio"
                                        displayName={item.name}
                                        value={item.id}
                                        inputName="allowance-category"
                                        checked={allowanceCategory === item.id}
                                        disabled={allowanceCategoryDisabled}
                                        onChange={handleTick}
                                        className='radAllowanceCategory'
                                    />
                                    </CCol>
                                )
                            })
                        }
                    </CRow>
                    </div>
                    </CCol>
            </CRow>
            <CRow>
                <CCol lg="12"  className="mb-4">
                <CImg
                    src={'avatars/list.png'}
                    className="list-icon mr-2 mb-1"
                    width="6px"
                />
                    <label id='lblAllowanceType' className="required">{t("Allowance Type")}</label>
                    <div className="ml-1 brc-card">
                        <CRow>
                        {
                            listAllowancyType.map((item, index) => {
                                return (
                                    <CCol  md="3" sm="4" className="mb-1" key={index} >
                                    <LabelInput
                                        type="radio"
                                        displayName={item.name}
                                        inputName="allowance-type"
                                        value={item.id}
                                        checked={allowanceType === item.id}
                                        onChange={handleTick}
                                        disabled={allowanceTypeDisabled}
                                        className='radAllowanceType'
                                    />
                                    </CCol>
                                )
                            })
                        }
                        </CRow>
                    </div>
                </CCol>
            </CRow>
            <CRow>
                <CCol lg="12"  className="mb-4">
                <CImg
                    src={'avatars/list.png'}
                    className="list-icon mr-2 mb-1"
                    width="6px"
                />
                    <label id='lblAllowanceSetting' className="required">{t("Allowance Setting")}</label>
                    <div className="ml-1 brc-card">
                        <CRow>
                        {
                            listSwitch.map((item, index) => {
                                return (
                                    <CCol md="3" sm="4" className="mb-1" key={index}>
                                    <ToggleSwitch
                                        
                                        label={item.name}
                                        color={item._color}
                                        onChange={handleSwitch}
                                        checked={item.checked}
                                        idLabel={item.idLabel}
                                        idSwitch={item.idSwitch}
                                        disabled={allowanceSettingDisabled}
                                    />
                                    </CCol>
                                )
                            })
                        }
                        </CRow>
                    </div>
                </CCol>
            </CRow>
        </>
    )
}

const LabelInput = props => {
    let {
        displayName,
        inputName,
        value,
        type,
        checked,
        disabled,
        onChange,
        className,
        focused
    } = props
    const handleLabelClass = () => {
        return `ARLabelWithCheck ARLabelWithCheck--hasBorder  ${disabled ? "ARDisable" : ""}`
    }
    return (
        <label className={handleLabelClass()}>
            <span>{displayName}</span>
            <input
                className={className}
                type={type}
                name={inputName}
                value={value}
                onChange={onChange}
                checked={checked}
                disabled={disabled}
                autoFocus={focused}
            />
        </label>
    )
}

const ToggleSwitch = (props) => {
    let {
        label,
        color,
        onChange,
        checked,
        idLabel,
        idSwitch,
        disabled
    } = props;
    function handleColor() {
        switch (color) {
            case "blue":
                return "primary"
            case "green":
                return "success"
            case "yellow":
                return "warning";
            default:
                break;
        }
    }
    return (
        <div className="ARLabelWithCheck-swt">
            <span id={idLabel}>{label}</span>
            <CSwitch id={idSwitch} name={idSwitch} className="" 
                shape={'pill'} color={handleColor()} size={'sm'}
                checked={checked} onChange={onChange}
                disabled={disabled}
            />

        </div>
    )
}


export default AllowanceRegisterForm
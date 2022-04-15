import { CCard, CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SaveAndDeleteRoleAndPermissionRegistration from './SaveAndDeleteRoleAndPermissionRegistration';


const RoleAndPermissionRegistrationTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            props.mainTable && props.mainTable.length > 0 &&
            <CCard className='table-panel' style = {{ border : "1px solid #d8dbe0" }}>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{t("Total Rows").replace('%s', (props.rowCount != 0 ? props.rowCount : 0))}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table">
                                <thead id="thead-id">

                                    <tr width="100%">
                                        <th width="" className="t-align-center" >
                                            <input type="checkbox"
                                                id="chkCheckBox"
                                                value="all-check"
                                                checked={props.AllCheck == true}
                                                onChange={props.change_checkbox} />
                                        </th>

                                        <th width="" className="responsive-tableTh" id="tblNo">
                                            <img src={'avatars/titleicon.png'}
                                                className="column-table"
                                                alt="titleicon" />
                                            {t('No')}
                                        </th>
                                        <th width="" className="responsive-tableTh" id="tblMenu">
                                            <img src={'avatars/titleicon.png'}
                                                className="column-table"
                                                alt="titleicon"
                                            />
                                            {t('Menu')}
                                        </th>
                                        <th width="" className="responsive-tableTh" id="tblSubMenu">
                                            <img src={'avatars/titleicon.png'}
                                                className="column-table"
                                                alt="titleicon"
                                            />
                                            {t('Sub-Menu')}
                                        </th>
                                        {props.headTable.map((val, k) => {
                                            let IsAllNull = props.mainTable.every(item => 
                                                item.action[k].action_name === val ? ( item.action[k].action_value== null ? true : false) : {...item}                                                                                                    
                                            );
                                            let checkPermission = props.mainTable.every(item => 
                                                    item.action[k].action_name === val ? ( item.action[k].action_value== null ? true : item.action[k].action_value) : {...item}                                                                                                    
                                                );
                                            return (
                                                <th key={k} width="" className="responsive-tableTh" id="tblPermission">
                                                    <div className="d-flex">
                                                        <img src={'avatars/titleicon.png'}
                                                            className="role-and-permission-registration-img-table-header"
                                                            alt="titleicon"
                                                        />
                                                        <div className="role-and-permission-registration-chk-header">
                                                            <input type="checkbox" value={val}
                                                                checked={IsAllNull === true ? false : checkPermission }
                                                                onChange={props.change_checkbox_data}
                                                            />
                                                        </div>
                                                        {val}
                                                    </div>
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        props.mainTable.map((i, index) => {
                                            let isPermission = i.action.every(sec => (
                                                sec.action_value == null ? true : sec.action_value
                                            ))
                                            return (
                                                <tr key={index} width="100%">
                                                    <td width="" className="td-num role-and-permission-registration-chkbox-header" >
                                                        <input type="checkbox"
                                                            value={index}
                                                            id={"row_" + index}
                                                            checked={isPermission}
                                                            onChange={props.change_checkbox}
                                                        />
                                                    </td>
                                                    <td width="" className="td-no t-align-right" >
                                                        {index + 1}
                                                    </td>
                                                    <td width="" className="td-menu td-orange t-align-left" >
                                                        {i.menu_name}
                                                    </td>
                                                    <td width="" className="td-sub-menu td-green t-align-left" >
                                                        {i.sub_menu}
                                                    </td>
                                                    {i.action.map((val, idx) => {
                                                        return (
                                                            <td key={idx} width="" className="t-align-center">
                                                                {val.action_value !== null ? <input type="checkbox"
                                                                        value={val.action_value}
                                                                        id={val.action_name + "_" + index}
                                                                        checked={val.action_value === true}
                                                                        data_index={index}
                                                                        onChange={props.change_checkbox_data}
                                                                    /> : null
                                                                    }
                                                            </td>
                                                        )

                                                    })}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
                <SaveAndDeleteRoleAndPermissionRegistration saveData={props.saveData} deleteClick={props.deleteClick}/>
            </CCard>
        }
    </>
    );
}
export default RoleAndPermissionRegistrationTable;
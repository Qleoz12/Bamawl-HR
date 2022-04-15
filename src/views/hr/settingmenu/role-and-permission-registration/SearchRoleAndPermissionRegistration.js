import { CButton, CCol, CLabel, CRow, CSelect } from '@coreui/react';
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const SearchRoleAndPermissionRegistration = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        menuNameChange,
        menuNameState,
        editData,
        menuNameAPI,
        subMenuNameChange,
        subMenuNameState,
        subMenuNameAPI,
        roleAPI,
        selectedRoleNameData,
        RoleNameChange,
        searchClick,
    } = props;

    return (<>
        <CRow lg="12" className="header-title">
        <CCol lg="4" className="mb-4">
        <CLabel>{t('Menu Name')}</CLabel>
        <CSelect className="bamawl-select" value={menuNameState} onChange={menuNameChange} autoFocus={true} custom>
          <option key="" value="">---Select Menu Name---</option>
          {
            menuNameAPI.map(i => {
              return (<option key={i.id} value={i.id}> {i.menu_name} </option>)
            })
          }
        </CSelect>
      </CCol>
      <CCol lg="4" className="mb-4">
        <CLabel>{t('Sub Menu Name')}</CLabel>
        <CSelect className="bamawl-select" value={subMenuNameState} onChange={subMenuNameChange} custom>
          <option key="" value="">---Select Sub Menu Name---</option>
          {
            subMenuNameAPI.map(i => {
              return (<option key={i} value={i}> {i} </option>)
            })
          }
        </CSelect>
      </CCol>
            {/* Input Role Name */}
            <CCol lg="4">
                <label className='' id="lbRoleName">{t('Enter Role Name')}<span className="role-and-permission-registration-labe-required">*</span></label>
                <div className="ddl-auto-complete">
                    <Autocomplete
                        onInputChange={(_, val) => {
                            props.setRoleState(val);
                        }}
                        disabled={props.editData && props.editData != ""}
                        // disableClearable
                        selectOnFocus={true}
                        freeSolo={true}
                        options={roleAPI}
                        getOptionLabel={(roleAPI) => roleAPI.admin_level_name}
                        getOptionSelected={(option, value) => value.admin_level_name}
                        onChange={(event, newValue) => {
                            if (!props.isEmpty(newValue)) {
                                props.setSelectedRoleNameData(newValue.admin_level_name)
                            } else {
                                props.setSelectedRoleNameData('');
                            }
                        }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                id="txtRoleName"
                                placeholder={t('Type Role Name')}
                                fullWidth
                                value={selectedRoleNameData}
                                onChange={RoleNameChange}
                                InputProps={{ ...params.InputProps, type: "search" }}
                                aria-label="Close"
                            />
                        )}
                    />
                </div>
            </CCol>
        </CRow>
        <br></br>
        <CRow lg="12">
            <CCol className="t-align-center">
                <CButton id="btnSearch" className="form-btn" onClick={searchClick}>{t('Search')}</CButton>
            </CCol>
        </CRow><br />
    </>
    );
}

export default SearchRoleAndPermissionRegistration;
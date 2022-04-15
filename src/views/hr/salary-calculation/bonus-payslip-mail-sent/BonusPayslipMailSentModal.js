
import React ,{useEffect} from 'react';
import {CModal, CModalBody,CRow, CButton, CCardBody,CCardHeader} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import SearchBonusPayslipMailSent from "./SearchBonusPayslipMailSent";
import BonusPayslipMailSentTableModal from "./BonusPayslipMailSentTableModal";
import Message from '../../../brycen-common/message/Message';
const Confirmation = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });
    let {
      selectDepartmentName,
      departmentID,
      department,
      listEmployeeModal,
      allCheck,
      changeCheckbox,
      errorModal,
      addDataModal,
      closeDataModal,
      searchClick,
      positionList,
      selectPosition,
      positionID,
      changeAutocomplete,
      selectAutocomplete,
      idArr,
      employeeID,
      codeArr,
      employeeCode,
      nameArr,
      employeeName,
      ViewPermision,
      permission

  } = props;
    return (
  <>
  {props.addModalBox === true && (
    <div>
      <CModal
        size="xl"
        centered
        closeOnBackdrop={false}
        htmlFor="addBtn"
        show={props.addModalBox}
        onClose={closeDataModal}
      >
        {
          <CModalBody>
            <CCardHeader>
              <h5 id='lblEmployeeList'>{t('Employee List')}</h5>
            </CCardHeader>
            <CCardBody>
            {/* error modal */}
            <Message error={errorModal} success={[]} />
              <SearchBonusPayslipMailSent
               selectDepartmentName={selectDepartmentName}
               departmentID={departmentID}
               department={department}
               searchClick={searchClick}
               positionList={positionList}
               selectPosition={selectPosition}
               positionID={positionID}
               changeAutocomplete={changeAutocomplete}
               selectAutocomplete={selectAutocomplete}
               idArr={idArr}
               employeeID={employeeID}
               codeArr={codeArr}
               employeeCode={employeeCode}
               nameArr={nameArr}
               employeeName={employeeName}
               ViewPermision={ViewPermision}
               permission={permission}
               listEmployeeModal={listEmployeeModal}
              />
              <BonusPayslipMailSentTableModal
                listEmployeeModal={listEmployeeModal}
                allCheck={allCheck}
                changeCheckbox={changeCheckbox}
              />
              {/* Button Add/Close */}
              <br />
              <CRow className="justify-content-center">
                  <CButton className="form-btn mr-1"
                    id='btnAdd'
                    name='btnAdd'
                    hidden={listEmployeeModal.length==0}
                    onClick={addDataModal}
                  >{t('Add')}
                  </CButton>
                  <CButton className="form-btn mr-1" hidden={listEmployeeModal.length>0} id="btnSearch" onClick={searchClick}>{t('Search')}</CButton>
                  <CButton className="form-btn ml-1"
                    id='btnClose'
                    name='btnClose'
                    onClick={closeDataModal}
                  >{t('Close')}
                  </CButton>
              </CRow>
              {/* end button save */}
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

import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { checkNullOrBlank, englishCharacterNumberOnly } from "../../hr-common/common-validation/CommonValidation"; // Common validation function
import AddPrevNextFamilyMemberRegisterList from './AddPrevNextFamilyMemberRegisterList';
import RegisterListTable from './FamilyMemberRegisterListTable';
import FormAddFamilymemberRegisterList from './FormAddFamilymemberRegisterList';
import FamilyMemberRegisterListInfoEmployee from './FamilyMemberRegisterListInfoEmployee';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import { useHistory } from "react-router-dom";
import HeaderBox from "../../hr-common/employee-personal-header-box/HeaderBox";
import Message from '../../../brycen-common/message/Message';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import SaveFamilymemberRegisterList from './SaveFamilyMemberRegisterList';
import ViewPermision from './../../../brycen-common/constant/ViewPermission';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

function LegacyWelcomeClass({ t }) {
  const [deleteID, setDeleteID] = useState([]);
  const [selectRelationship, setSelectRelationship] = useState('');// select relationship
  const [mainTable, setMainTable] = useState([]); // for data table
  const [nameFamily, setNameFamily] = useState(''); // for nameFamily
  const [incomeTaxRelief, setincomeTaxRelief] = useState(1);  // for select income Tax Relief
  const [living, setLiving] = useState(1);  // for select living/deceased
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);
  const [nrcNumber, setNrcNumber] = useState(""); // for nrc Number
  const [occupation, setOccupation] = useState(""); // for occupation
  const [saveModalBox, setSaveModalBox] = useState(false); // Add confirm box show or hide
  const [chkSingle, setChkSingle] = useState(""); // check employee is single
  const [empId, setEmpID] = useState(""); // employee id
  const [empCode, setEmpCode] = useState(""); // employee code
  const [empName, setEmpName] = useState(""); // employee name
  const [total, setTotal] = useState(""); // total family member
  const [checkAction, setAction] = useState(""); // check action to employee list
  const [currencySetting, setCurrencySetting] = useState(false); // check currency
  const history = useHistory(); // For edit link
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [permission, setPermission] = useState(ViewPermision.ONLY_ME) // for view permission

  /**
  * If error state or succes state is changed, scroll automatically to top
  *
  * @author  dh_khanh
  * @create  23/07/2021 (D/M/Y)
  * @param
  * @return
  */
  useEffect(() => {
    if (error.length > 0 || success.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [error, success]);


  useEffect(() => {
    let editID = JSON.parse(sessionStorage.getItem("RETURN_EMP_LIST_ID_EDIT")); // return data from EMPLOYEE List Form
    let detailData = JSON.parse(sessionStorage.getItem("RETURN_EMP_LIST_ID_DETAILS")); // return data from EMPLOYEE List Form
    if (!editID && !detailData) {
        history.push('./employee-list')
    }
    else {
        loadViewPermission();
        if (editID != null) {
            let empId = editID['id'];
            setEmpID(empId);
            setAction(1);
            loadFamily(empId, 0);
        }
        if (detailData != null) {
            let empId = detailData;
            setEmpID(empId);
            loadFamily(empId, 0);
            setAction(0);
        }
    }
  }, []);

  let checkNRCNumber = (value) => {
    var nrc = /^[0-9]{0,2}\/[a-zA-Z]{0,9}\([a-zA-Z]\)[0-9]{0,6}/g;
    if (nrc.test(value)) {
        return true;
    }
    return false;
  }
  /* GET RELATIONSHIP DATA DROPDOWN */
  const loadRelationship = () => {
    return [
      {
        key: 1,
        value: "GrandFather"
      },
      {
        key: 2,
        value: "GrandMother"
      },
      {
        key: 3,
        value: "Father"
      },
      {
        key: 4,
        value: "Mother"
      },
      {
        key: 5,
        value: "Brother"
      },
      {
        key: 6,
        value: "Sister"
      },
      {
        key: 7,
        value: "Husband"
      },
      {
        key: 8,
        value: "Wife"
      },
      {
        key: 9,
        value: "Child"
      }
    ]
  }
  const nameFamilyChange = (e) => {
    let nameFamily = e.target.value;
    setNameFamily(nameFamily);
  }

  const nrcNumberChange = (e) => {
    let nrcNumber = e.target.value;
    setNrcNumber(nrcNumber);
  }

  const occupationChange = (e) => {
    let occupation = e.target.value;
    setOccupation(occupation);
  }

  /*Relationship change */
  const relationshipChange = (e) => {
    let relationship = e.target.value;
    setSelectRelationship(relationship);
  }

  const livingChange = (e) => {
    let checked = e.target.checked;
    let id = '';
    if (checked === true) {
        id = 2;
        setincomeTaxRelief(2);
    }
    else {
        id = 1;
    }
    setLiving(id);
  }

  const incomeChange = (e) => {
    let checked = e.target.checked;
    let id = '';
    if (checked === true)
         id = 1;
    else
        id = 2;
    setincomeTaxRelief(id);
  }

  /**PREV EMPLOYEE */
  const preEmp = () => {
    loadFamily(empId, -1);
    setError([]);
    setSuccess([]);
    setLiving(1);
    setincomeTaxRelief(1);
    setSelectRelationship("");
    setNameFamily("");
    setNrcNumber("");
    setDeleteID([]);
    setOccupation("");
  }

  /**NEXT EMPLOYEE */
  const nextEmp = () => {
    loadFamily(empId, 1);
    setError([]);
    setSuccess([]);
    setLiving(1);
    setincomeTaxRelief(1);
    setSelectRelationship("");
    setNameFamily("");
    setNrcNumber("");
    setDeleteID([]);
    setOccupation("");
  }

  /**
  * Load view permission user login
  *
  * @author  dh_khanh
  * @create  02/07/2021 (D/M/Y)
  * @param
  * @return
  */
  const loadViewPermission = async () => {
    let response = await ApiViewPermission.loadViewPermission();
    setLoading(false);
    if (response.flag !== false) {
        setPermission(response.data.view_permission);
    }
  }
  /* GET FAMILY MEMBER'S */
  const loadFamily = async (employeeID = empId, index = 0) => {
    let obj = { package_name: 'hr', url: `${ApiPath.FamlilyMemberGet}/${employeeID}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}&index=${index}`, method: 'get' };
    setLoading(true);
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
        setError(response.message);
    } else {
        let data = response.data.data;
        setMainTable(data.family_member_list);
        setTotal(data.family_member_list.length);
        setEmpID(data.employee_id);
        setEmpCode(data.emp_code);
        setEmpName(data.emp_name);
        setCurrencySetting(data.salary_transfer_setting);
        setChkSingle(data.marital_status);
        let dataEpl = {
            id: data.employee_id,
            is_new: data.is_new
    }
        index != 0 && sessionStorage.setItem('RETURN_EMP_LIST_ID_EDIT', JSON.stringify(dataEpl));
        data.is_new === true && history.push('./employee-personal');
    }
  }

  //Add family member
  const addFamily = async () => {
    let arrMess = [];
    if (!checkNullOrBlank(nameFamily.trim())) {
        let errMsg = t('JSE124').replace('%s', t("Family Member's Name"));
        arrMess.push(errMsg);
    } else if (!englishCharacterNumberOnly(nameFamily)) {
        let errMsg = t('JSE10019').replace('%s', t("Family Member's Name"));
        arrMess.push(errMsg);
    }
    if (!checkNullOrBlank(selectRelationship)) {
        let errMsg = t('JSE001').replace('%s', t("Relationship"));
        arrMess.push(errMsg);
    }
    if (checkNullOrBlank(occupation.trim())) {
        if (!englishCharacterNumberOnly(occupation)) {
                let errMsg = t('JSE10019').replace('%s', t("Occupation"));
                arrMess.push(errMsg);
        }
    }
    if (checkNullOrBlank(nrcNumber.trim())) {
        if (!checkNRCNumber(nrcNumber)) {
            let errMsg = t('JSE009').replace('%s', t("NRC Number"));
            arrMess.push(errMsg);
        }
    }
    if (chkSingle == "1" && (selectRelationship == "Husband" || selectRelationship == "Wife")) {
        let errMsg = t('JSE133')
        arrMess.push(errMsg);
    }
    if (arrMess.length > 0) {
        setSuccess([]);
        setError(arrMess);
        return;
    }
    else {
      let params = {
        company_id: ApiPath.companyID,
        employee_id: empId,
        family_member_name: nameFamily,
        relationship: selectRelationship,
        nrc_number: nrcNumber,
        occupation: occupation,
        alive: living,
        already_tax_relief: incomeTaxRelief
      };
        let data = { ...params };
        let duplicateFamily = 0;
        if (data.nrc_number.trim() == "") data.nrc_number = null;
        mainTable.filter((item) => {
          if (item.nrc_number == "") item.nrc_number = null;
          if (data.nrc_number == null) {
            if ((item.nrc_number == data.nrc_number) && (item.relationship == data.relationship))
              duplicateFamily++;
          }
          else {
            if ((item.nrc_number == data.nrc_number.trim()) && (item.relationship == data.relationship))
              duplicateFamily++;
          }
        });
        if (duplicateFamily === 0) {
          setMainTable([...mainTable, data]);
          setTotal([...mainTable, data].length);
          setError([]);
          setNameFamily("");
          setSelectRelationship("");
          setLiving(1);
          setOccupation("");
          setNrcNumber("");
          setincomeTaxRelief(1);
          setSuccess([]);
        }
        else {
          let errMsg = t("JSE006").replace('%s', t("That Family Member"));
          setError([errMsg]);
          setSuccess("");
        }
    }
  }

  // Save Family member's
  const saveConfirm = () => {
    if (total === 0) {
      let errMsg = t('JSE055');
      setError([errMsg]);
    } else {
      setError([]);
      setSuccess([]);
      setSaveModalBox(!saveModalBox);
      setContent(t('Are you sure want to save?')); setType('save');
    }
  }

  const saveOK = async () => {
    setSaveModalBox(!saveModalBox);
    let addFamilyData = [];
    addFamilyData = mainTable.filter(i => i.id == null);
    setLoading(true);
    let params = {
      "company_id": ApiPath.companyID,
      "info_family_list": addFamilyData,
      "family_member_id": deleteID,
      "created_emp": ApiPath.createdEmp,
      "updated_emp": ApiPath.updatedEmp
    };
    let obj = { package_name: 'hr', url: `${ApiPath.FamlilyMemberGet}/${empId}`, method: 'put', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
    } else {
      setDeleteID([]);
      loadFamily(empId);
      setNameFamily("");
      setSelectRelationship("");
      setLiving(1);
      setOccupation("");
      setNrcNumber("");
      setincomeTaxRelief(1);
      setSaveModalBox(!saveModalBox);
      setSuccess([response.data.message]);
    }
  }

  const closeSaveAlert = () => {
    setSaveModalBox(!saveModalBox);
  }
  //Delete family
  const deleteFamily = (e) => {
    setError([]);
    setSuccess([]);
    let familyDelete = mainTable.filter((item, i) => i === e)[0];
    if (familyDelete.id != null)
      setDeleteID([...deleteID, familyDelete.id]);
    setMainTable(mainTable.filter((item, i) => i !== e));

  }

  return (
    <CRow>
      <CCol>
        <Loading start={loading} />
        <Message success={success} error={error} />
        <Confirmation
          content={content}
          okButton={t('Ok')}
          cancelButton={t('Cancel')}
          type={type}
          show={saveModalBox}
          cancel={closeSaveAlert}
          saveOK={saveOK}
        />
        <CCard className="family-member-register-list">
          <HeaderBox
            setFamilyMember={true}
            PaymentSetting={currencySetting}
          />
          <CCardHeader>
            <div>
              <h5 className="float-left"><label>{t('Family Member Registration/List')}</label></h5>
              <div className="float-right">
                    <CButton className="mr-2"
                        onClick={() => history.push(`./employee-personal`)}
                        style={{ backgroundColor: "#F4F6FD" }}>
                        <i className="fa fa-step-backward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
                        {t("Previous")}
                    </CButton>
                    <CButton
                        onClick={() => history.push(`./employee-leave-setting`)}
                        style={{ backgroundColor: "#F4F6FD" }}>
                        {t("Next")}
                        <i className="fa fa-step-forward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
                    </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <FamilyMemberRegisterListInfoEmployee
              empId={empId}
              empCode={empCode}
              empName={empName}
            />
            <h4 id="lblFamilyMember" style={{ color: '#594fbd' }} className="mb-4">{t('Family Member')}</h4>
            <FormAddFamilymemberRegisterList
              checkAction={checkAction}
              loadRelationship={loadRelationship}
              selectRelationship={selectRelationship}
              relationshipChange={relationshipChange}
              living={living}
              livingChange={livingChange}
              incomeTaxRelief={incomeTaxRelief}
              incomeChange={incomeChange}
              occupation={occupation}
              occupationChange={occupationChange}
              nameFamily={nameFamily}
              nameFamilyChange={nameFamilyChange}
              nrcNumber={nrcNumber}
              nrcNumberChange={nrcNumberChange}
            />
            <AddPrevNextFamilyMemberRegisterList
              checkAction={checkAction}
              addFamily={addFamily}
              preEmp={preEmp}
              nextEmp={nextEmp}
              permission={permission}
            />
            <RegisterListTable
              mainTable={mainTable}
              deleteFamily={deleteFamily}
              checkAction={checkAction}
            />
            <SaveFamilymemberRegisterList
              checkAction={checkAction}
              saveConfirm={saveConfirm}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function SubAllowanceRegisterList() { return (<Welcome />) }

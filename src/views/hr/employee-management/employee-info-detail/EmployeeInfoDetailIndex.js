/* eslint-disable no-use-before-define */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import EmployeeInfoDetailAttachFileBox from './EmployeeInfoDetailAttachFileBox';
import EmployeeInfoDetailContactDetailsBox from './EmployeeInfoDetailContactDetailsBox';
import EmployeeInfoDetailContractFileBox from './EmployeeInfoDetailContractFileBox';
import EmployeeInfoDetailDepartmentRoleBox from './EmployeeInfoDetailDepartmentRoleBox';
import EmployeeInfoDetailEducationBox from './EmployeeInfoDetailEducationBox';
import EmployeeInfoDetailFamilyMemberBox from './EmployeeInfoDetailFamilyMemberBox';
import EmployeeInfoDetailGeneralInfoBox from './EmployeeInfoDetailGeneralInfoBox';
import EmployeeInfoDetailHeader from './EmployeeInfoDetailHeaderBox';
import EmployeeInfoDetailLeaveBox from './EmployeeInfoDetailLeaveBox';
import EmployeeInfoDetailPersonalDetailsBox from './EmployeeInfoDetailPersonalDetailsBox';
import EmployeeInfoDetailSalaryBox from './EmployeeInfoDetailSalaryBox';

function LegacyWelcomeClass({ t, i18n }) {

  const [error, setError] = useState([]);

  const [image, setImage] = useState("");

  const [empId, setEmpId] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [empName, setEmpName] = useState("");
  const [empNameMM, setEmpNameMM] = useState("");
  const [empType, setEmpType] = useState("");
  const [joinedDate, setJoinedDate] = useState("");
  const [contractStartDate, setContractStartDate] = useState("");
  const [contractEndDate, setContractEndDate] = useState("");

  const [nrcNumber, setNRCNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [ssbAccountNumber, setSSBAccountNumber] = useState("");

  const [education, setEducation] = useState("");
  const [qualificationEducation, setQualificationEducation] = useState("");

  const [dep_position, setDepPosition] = useState([]);
  const [eligible, setEligible] = useState("");

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const [familyMembers, setFamilyMember] = useState([]);

  const [leave, setLeave] = useState([]);

  const [attachFile, setAttachFile] = useState([]);

  const [contractFile, setContractFile] = useState([]);

  const [loading, setLoading] = useState(false);

  /** Start Form Load */
  useEffect(() => {
    setLoading(true)
    ApiViewPermission.loadViewPermission();
    // return data from EMPLOYEE List Form
    if (!JSON.parse(sessionStorage.getItem("RETURN_EMP_LIST_ID_DETAILS"))) {
      let detail_id = ApiPath.loginEmp;
      getDetailAPI(detail_id);
    } else {
      let detail_id = JSON.parse(sessionStorage.getItem("RETURN_EMP_LIST_ID_DETAILS"));
      sessionStorage.removeItem("RETURN_EMP_LIST_ID_DETAILS")
      getDetailAPI(detail_id);
    }
  }, [getDetailAPI]);
  /** End Form Load */


  /* Get Detail API Start */
  const [detailData, setDetailData] = useState("");
  const getDetailAPI = async (detail_id) => {
    setLoading(true);
    let obj = {
      package_name: 'hr',
      url: ApiPath.EmployeeInfoDetailGetDetail + detail_id + "?login_id=" + ApiPath.loginEmp + "&company_id=" + ApiPath.companyID,
      method: 'get'
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
    } else {
      if (response.data.data) {
        let dataDetail = response.data.data;

        setDetailData(response.data.data);
        setEmpName(dataDetail.emp_name ? dataDetail.emp_name : "");
        setEmpId(dataDetail.employee_id !== "" ? dataDetail.employee_id : "");
        setEmpCode(dataDetail.emp_code !== "" ? dataDetail.emp_code : "");
        setEmpNameMM(dataDetail.emp_name_mm ? dataDetail.emp_name_mm : "");
        setEmpType(dataDetail.employee_type !== "" ? getEmployeeTypeData(dataDetail.employee_type) : "");
        setJoinedDate(dataDetail.join_date ? dataDetail.join_date : "");
        setContractStartDate(dataDetail.contract_start_date ? dataDetail.contract_start_date : "");
        setContractEndDate(dataDetail.contract_end_date ? dataDetail.contract_end_date : "");
        setImage(dataDetail.avatar_path);

        setNRCNumber(dataDetail.nrc_number !== "" ? dataDetail.nrc_number : "");
        setPassportNumber(dataDetail.passport_number !== ""  ? dataDetail.passport_number : "");
        setGender(dataDetail.gender ? getGenderData(dataDetail.gender) : "");
        setDob(dataDetail.date_of_birth ? dataDetail.date_of_birth : "");
        setMaritalStatus(dataDetail.marital_status !== "" ? getMaritalData(dataDetail.marital_status) : "");
        setSSBAccountNumber(dataDetail.ssb_number !== "" ? dataDetail.ssb_number : "");

        setEducation(dataDetail.education ? dataDetail.education : "");
        setQualificationEducation(dataDetail.other_qualification ? dataDetail.other_qualification : "");

        setDepPosition(dataDetail.employee_has_dept_position);
        setEligible(dataDetail.eligible_noneligible !== "" ? getEligibleData(dataDetail.eligible_noneligible) : "");

        setAddress(dataDetail.address.address ? dataDetail.address.address : "");
        setPhoneNumber(dataDetail.address.phone ? dataDetail.address.phone : "");
        setEmailAddress(dataDetail.email ? dataDetail.email : "")

        setFamilyMember(dataDetail.family_members);

        setLeave(dataDetail.leaves);

        setAttachFile(dataDetail.employee_has_upload_info.attach_file);

        setContractFile(dataDetail.employee_has_upload_info.contract_file);
      }
    }
  }
  /* Get Detail API End */

  /**Start Download File */
  const downLoadFile = async (e, fileName) => {
    setLoading(true);
    let params = {
      company_id: ApiPath.companyID,
      file_id: e.id,
      login_id: ApiPath.loginEmp,
    };
    let obj = {
      package_name: 'hr',
      url: ApiPath.EmployeeInfoDetailDownloadFile,
      method: 'post',
      type: "arraybuffer",
      params
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    else {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); //or any other extension
      document.body.appendChild(link);
      link.click();
    }
  }
  /**Start Download File */

  /** Start Bind Data */
  const getGenderData = (id) => {
    let data = [
      {
        id: "M",
        value: t('Male')
      },
      {
        id: "F",
        value: t('Female')
      }
    ]
    let gender = "";
    gender = data.find(item => item.id === id).value;
    return gender
  }

  const getMaritalData = (id) => {
    let data = [
      {
        id: 1,
        value: t('Single')
      },
      {
        id: 2,
        value: t('Married')
      },
      {
        id: 3,
        value: t('Divorce')
      }
    ]
    let marital = "";
    marital = data.find(item => item.id === id).value;
    return marital;
  }

  const getEligibleData = (id) => {
    let data = [
      {
        id: 1,
        value: t('Eligible')
      },
      {
        id: 2,
        value: t('Non-Eligible')
      }
    ]
    let eligible = "";
    eligible = data.find(item => item.id === id).value;
    return eligible;
  }

  const getEmployeeTypeData = (id) => {
    let data = [
      {
        id: 1,
        value: t('Permanent')
      },
      {
        id: 2,
        value: t('Part Time')
      },
      {
        id: 3,
        value: t('Contract')
      },
      {
        id: 4,
        value: t('Indirect/Driver')
      }
    ]
    let empType = "";
    empType = data.find(item => item.id === id).value;
    return empType;
  }
  /** End Bind Data */


  return (
    <CRow className = "emp-info-detail">
      <CCol xs="12">
        <Loading start={loading} />
        <Message success={[]} error={error} />

        <CCard>
          <EmployeeInfoDetailHeader
            empName={empName}
            image={image}
          />
          <CCardHeader className="pb-0">
            <h5 id="cardTitle"><CLabel>{t('Employee Information Detail')}</CLabel></h5>
          </CCardHeader>
          <CCardBody>
            <EmployeeInfoDetailGeneralInfoBox
              detailData={detailData}
              empId={empId}
              empCode={empCode}
              empName={empName}
              empNameMM={empNameMM}
              empType={empType}
              joinedDate={joinedDate}
              contractStartDate={contractStartDate}
              contractEndDate={contractEndDate}
            />
            <EmployeeInfoDetailPersonalDetailsBox
              detailData={detailData}
              nrcNumber={nrcNumber}
              passportNumber={passportNumber}
              gender={gender}
              dob={dob}
              maritalStatus={maritalStatus}
              ssbAccountNumber={ssbAccountNumber}
              getGenderData={getGenderData}
            />
            <EmployeeInfoDetailEducationBox
              detailData={detailData}
              education={education}
              qualificationEducation={qualificationEducation}
            />
            <EmployeeInfoDetailDepartmentRoleBox
              detailData={detailData}
              dep_position={dep_position}
              eligible={eligible}
            />
            <EmployeeInfoDetailContactDetailsBox
              detailData={detailData}
              address={address}
              phoneNumber={phoneNumber}
              emailAddress={emailAddress}
            />
            <EmployeeInfoDetailFamilyMemberBox
              detailData={detailData}
              familyMembers={familyMembers}
            />
            <EmployeeInfoDetailLeaveBox
              detailData={detailData}
              leave={leave}
            />
            <EmployeeInfoDetailSalaryBox
              detailData={detailData}
            />
            <EmployeeInfoDetailAttachFileBox
              detailData={detailData}
              attachFile={attachFile}
              downLoadFile={downLoadFile}
            />
            <EmployeeInfoDetailContractFileBox
              detailData={detailData}
              contractFile={contractFile}
              downLoadFile={downLoadFile}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function EmployeeInfoDetailIndex() {
  return (
    <Welcome />
  )
}
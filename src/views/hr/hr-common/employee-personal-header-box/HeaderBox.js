/* eslint-disable no-use-before-define */
import { CCardHeader, CImg, CLabel, CModal, CModalBody } from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ApiPath from './../../../brycen-common/api-path/ApiPath';

const HeaderBox = props => {
  let customer_name = ApiPath.customerName;
  const { t } = useTranslation();
  useEffect(() => {
   
  });

  const [showss, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const inputFile = useRef(null);

  const handleFileUpload = e => {
    const { files } = e.target;
    if (files && files[0].type === "image/png" || files[0].type === "image/jpg" || files[0].type === "image/jpeg") {
      var reader = new FileReader();

      reader.onload = function (e) {
        props.setImage(e.target.result);
      }
      props.setAvatar(files[0]);
      reader.readAsDataURL(files[0]); // convert to base64 string
    }
  };
  
  const onButtonClick = () => {
    handleClose();
    inputFile.current.click();
  };
  return (<>
    <CCardHeader className="header-menu-bar mt-0">
      
      <div style={{ display: props.setActiveAvatar ? "block" : "none", height: "125px", width: "100px", position: "relative", textAlign: "center", margin: "auto", cursor: "pointer", paddingTop: "25px" }} >
        <CImg
          height="100%"
          width="100%"
          src={props.image !== null && props.image != "" ? props.image : 'avatars/change-profile-picture.png'}
          //className="c-avatar-img"
          style={{ borderRadius: "50%" }}
          alt="profile-pic"
        />
        <div className={props.image !== null && props.image != "" ? "change_picture3" : "change_picture"}>
          <small >{t('Change Profile Picture')}</small>
        </div>
      </div>

      <br />
      <nav className="mt-4 navbar-nav navbar-expand-sm justify-content-around">
        <li className="nav-item">
          <Link className={props.setEmployeePersonal ? "nav-link color-nav active" : "nav-link color-nav"} to={`/${customer_name}/hr/employee-management/employee-personal`}>{t("Personal Information")}</Link>
        </li>
        <li className="nav-item" >
          {
            props.setIsNew && <Link className={"nav-link color-nav"} to="" style={{ pointerEvents: "none" }}>{t('Family Member')}</Link>
          }
          {
            !props.setIsNew && <Link className={props.setFamilyMember ? "nav-link color-nav active" : "nav-link color-nav"} to={`/${customer_name}/hr/employee-management/family-member-register-list`}>{t('Family Member')}</Link>
          }

        </li>
        <li className="nav-item">
          {
            props.setIsNew && <Link className={"nav-link color-nav"} to="" style={{ pointerEvents: "none" }}>{t('Leave Setting')}</Link>
          }
          {
            !props.setIsNew && <Link className={props.setLeaveSetting ? "nav-link color-nav active" : "nav-link color-nav"} to={`/${customer_name}/hr/employee-management/employee-leave-setting`}>{t('Leave Setting')}</Link>
          }
        </li>
        <li className="nav-item">
          {
            props.setIsNew && <Link className={"nav-link color-nav"} to="" style={{ pointerEvents: "none" }}>{t('Salary Calculate Setting')}</Link>
          }
          {
            !props.setIsNew && <Link className={props.setSalaryCalculateSetting ? "nav-link color-nav active" : "nav-link color-nav"} to={`/${customer_name}/hr/employee-management/salary-calculate-setting`}>{t('Salary Calculate Setting')}</Link>
          }
        </li>
        {props.PaymentSetting ?
          <li className="nav-item">
            {
              props.setIsNew && <Link className={"nav-link color-nav"} to="" style={{ pointerEvents: "none" }}>{t("Salary Transfer Setting")}</Link>
            }
            {
              !props.setIsNew && <Link className={props.setSalaryTranferSetting ? "nav-link color-nav active" : "nav-link color-nav"} to={`/${customer_name}/hr/employee-management/salary-transfer-setting`}>{t("Salary Transfer Setting")}</Link>
            }
          </li> :
          <li className="nav-item">
            {
              <Link className={"nav-link color-nav"} to="" style={{ pointerEvents: "none" }}>{t("Salary Transfer Setting")}</Link>
            }
          </li>
        }
      </nav>

      <CModal show={showss} style={{ width: "200px", height: "200px", float: "right", marginTop: "210px", marginRight: "28px" }} onClose={handleClose}>
        <CModalBody>
          {t('Upload your photo')}
          <CLabel>
            <CImg
              height="80px"
              width="80px"
              style={{ marginTop: "5px" }}
              src={'avatars/add-user.png'}
              alt="profile-pic"
            />
          </CLabel><br />
          <div>
            <input
              style={{ display: "none" }}
              ref={inputFile}
              onChange={handleFileUpload}
              type="file"
              accept=".png,.jpg,.jpeg"
            />
            <button style={{ background: "#4E57AA", border: "none", borderRadius: "5px", color: "white", padding: "5px 16px" }} id='btnUpload' name='btnUpload' onClick={onButtonClick}>
              <i className="fas fa-pencil-alt"></i>&nbsp;{t('Upload')}
            </button>
          </div>
          <small style={{ color: "red" }}>{t('size')}</small>
        </CModalBody>

      </CModal>
    </CCardHeader>
  </>
  );
}
export default HeaderBox;

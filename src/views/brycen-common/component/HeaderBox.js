/* eslint-disable no-use-before-define */
import { CButton, CCardHeader, CImg, CLabel, CModal, CModalBody, CModalFooter } from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const HeaderBox = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });
  const [showss, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const [image, setImage] = useState("");
  const inputFile = useRef(null);

  const handleFileUpload = e => {
    const { files } = e.target;
    if (files && files[0]) {

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
    <CCardHeader className="header-menu-bar">
      {/* <CLabel onClick={props.handleShow} style={{cursor: "pointer"}}>
        <i className="fa fa-user-circle fa-6x"></i>
      </CLabel><br /> */}
      <div style={{ display: props.setActiveAvatar ? "block" : "none", height: "125px", width: "100px", position: "relative", textAlign: "center", margin: "auto", cursor: "pointer", paddingTop: "25px" }} onClick={props.editData ? handleShow : null}>
        <CImg
          height="100%"
          width="100%"
          src={props.image && props.image != "" ? props.image : 'avatars/change-profile-picture.png'}
          //className="c-avatar-img"
          style={{ borderRadius: "50%" }}
          alt="profile-pic"
        />
        <div className={props.image && props.image != "" ? "change_picture3" : "change_picture"}>
          <small >{t('Change Profile Picture')}</small>
        </div>
      </div>

      <br />
      <nav className="mt-4 navbar-nav navbar-expand-sm justify-content-around">
        <li className="nav-item">
          <Link className={props.setEmployeePersonal ? "nav-link color-nav active" : "nav-link color-nav"} to="/setting/employee-personal">{t("Personal Information")}</Link>
        </li>
        <li className="nav-item">
          <Link className={props.setFamilyMember ? "nav-link color-nav active" : "nav-link color-nav"} to="/setting/family-member-register-list">{t('Family Member')}</Link>
        </li>
        <li className="nav-item">
          <Link className={props.setLeaveSetting ? "nav-link color-nav active" : "nav-link color-nav"} to="/setting/employee-leave-setting">{t('Leave Setting')}</Link>
        </li>
        <li className="nav-item">
          <Link className={props.setSalaryCalculateSetting ? "nav-link color-nav active" : "nav-link color-nav"} to="/setting/salary-calculate-setting">{t('Salary Calculate Setting')}</Link>
        </li>
        {props.PaymentSetting &&
          <li className="nav-item">
            <Link className={props.setSalaryTranferSetting ? "nav-link color-nav active" : "nav-link color-nav"} to="/setting/salary-transfer-setting">{t("Salary Transfer Setting")}</Link>
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
          {/* <input type="file" id="file" accept=".jpg, .png, .jpeg"></input> */}
          <div>
            <input
              style={{ display: "none" }}
              // accept=".zip,.rar"
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

import { CImg } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeInfoDetailHeader = (props) => {
    const { t } = useTranslation();
    const [avatar, setAvatar] = useState("");
    const defaultImg = "avatars/change-profile-picture.png"
    
    useEffect(() => {
        if (props.image) {
            checkIfImageExists(props.image, (exists) => {
                if (exists) {
                    setAvatar(props.image)
                }
                else {
                    setAvatar(defaultImg);
                }
            });
        }
        else {
            setAvatar(defaultImg);
        }
    },[checkIfImageExists]);

    function checkIfImageExists(url, callback) {
        const img = new Image();

        img.src = url;

        if (img.complete) {
            callback(true);
        } else {
            img.onload = () => {
                callback(true);
            };
            img.onerror = () => {
                callback(false);
            };
        }
    }


    return (
        <>
            <header className="header-menu-bar emp-info-card" style={{ height: '201px' }}>
                <div
                    className="emp-info-detail-avatar"
                >
                    <CImg
                        height="100%"
                        width="100%"
                        id="imgAvatar"
                        src={avatar}
                        style={{ borderRadius: "50%" }}
                        alt="profile-pic"
                    />
                    <div className={avatar !== defaultImg ? "d-none" : "emp-info-detail-change-picture"}>
                        <small>{t('Change Profile Picture')}</small>
                    </div>
                </div>
                <div className="pt-3">
                    <h5 className="text-white">{props.empName}</h5>
                </div>
            </header>
        </>
    )
}
export default EmployeeInfoDetailHeader;

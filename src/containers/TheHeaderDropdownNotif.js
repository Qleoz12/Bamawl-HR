import React, { useState, useEffect } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import i18n from '../i18n';
import {reactLocalStorage} from 'reactjs-localstorage'
import { useTranslation } from "react-i18next";

const TheHeaderDropdownNotif = () => {
  const {t} = useTranslation();
  const [items] = useState([
    { label: t('English'), value: "en", img: "/image/english.png", },
    { label: t('Myanmar'), value: "mm", img: "/image/myanmar.png" },
    // { label: t('Japan'), value: "jp", img: "/image/japan.png" },
  ]);

  const [ dValue, setdValue] = useState("English");
  const [ img, setImg ] = useState('english');
  
  useEffect(() => {

    let language =reactLocalStorage.get('LANGUAGE');

    if(language === "mm"){
      setdValue('Myanmar')
      setImg('myanmar')
    }else if(language === "en"){
      setdValue('English')
      setImg('english')
    }
    // else if(language === "jp"){
    //   setdValue('Japan')
    //   setImg('japan')
    // }
  },[]);

  let changeValue = (e) => {
    let data = e;
    let lng = data['value'];
    let language = data['label'];
    i18n.changeLanguage(lng);
    setdValue(language);
    localStorage.removeItem('LANGUAGE');
    localStorage.setItem('LANGUAGE',lng);
    window.location.reload(false);
  };

  return (
    <CDropdown inNav className="pr-width language">
      <CDropdownToggle>
        <div>
          <div className="float-left pr-2">
            <CImg
              src={"/image/" + img + ".png"}
              className="d-img"
              alt={img + " logo"}
            />
          </div>
        </div>
        <span className="d-inline-block mt-2">{t(dValue)}</span>
      </CDropdownToggle>
      <CDropdownMenu className="p-0">
        {items.map((item) => (
          <CDropdownItem
            key={item.value}
            value={item.value}
            onClick={changeValue.bind(this,item)}
          >
            <div className="float-left">
              <CImg
                src={item.img}
                className="d-img"
                alt="admin@bootstrapmaster.com"
              />
            </div>
            <div className="pl-2">{t(item.label)}</div>
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;

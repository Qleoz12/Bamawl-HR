import React ,{ useState, useEffect} from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import {
        checkNullOrBlank,
        validateIntegerOnly
       } from "../../../hr/hr-common/common-validation/CommonValidation"; // Common validation function
import AddSubAllowanceRegisterList from './AddSubAllowanceRegisterList';
import RegisterListTable from './SubAllowanceRegisterListTable';
import ConfirmationRegisterList from './SubAllowanceRegisterListConfirmation';
import linkAPI from './../../../brycen-common/api-path/ApiPath';
import Confirmation from './../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';
import Loading from "../../../brycen-common/loading/Loading";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

function LegacyWelcomeClass({ t}) {
  const defaultPerPage                                   = 20;
  const [deleteID, setDeleteID]                          = useState('');
  const [deleteModalBox, setDeleteModalBox]              = useState(false); // Delete confirm box show or hide
  const [selectedYear, setSelectedYear]                  = useState(''); // selected Year
  const [selectedMonth, setSelectedMonth]                = useState(''); // selected Month
  const [selectLimit, setSelectLimit]                    = useState('');
  const [selectAmount, setSelectAmount]                  = useState("");
  const [selectQualifi, setSelectQualifi]                = useState("");
  const [selectOther, setSelectOther]                    = useState("");
  const [rowCount, setRowCount]                          = useState(); // For row count
  const [mainTable, setMainTable]                        = useState([]);
  const [selectedAWData, setSelectedAWData]              = useState(''); // for selected AW id
  const [payWithSalary, setPayWithSalary]                = useState(null);
  const [error, setError]                                = useState([]);
  const [success, setSuccess]                            = useState("");
  const [currencyAPI, setCurrencyAPI]                    = useState([]);
  const [currentcies, setCurrentcies]                    = useState(null);
  const [awTitleAPI, setAWTitleAPI]                      = useState([]);
  const [allowanceCR, setAllowanceCR]                    = useState('');
  const [addModalBox, setAddModalBox]                    = useState(false); // Add confirm box show or hide
  const [editModalBox, setEditModalBox]                  = useState(false); // Edit confirm box show or hide
  const [showModalBox, setShowModalBox]                  = useState(false); // Edit row confirm box show or hide
  const [editID, setEditID]                              = useState(null);
  const [currentPage, setActivePage]                     = useState(1) // for Pagination
  const [totalPage, setTotalPage]                        = useState(1) // for Pagination
  const amount_limit                                     = 11;
  const [errorModal, setErrorModal]                      = useState([]);
  const [saveModalBox, setSaveModalBox]                  = useState(false) ; // Add confirm box show or hide
  const [loading, setLoading]                            = useState(false);
  const [content, setContent]                            = useState('');
  const [type, setType]                                  = useState('');
  const [viewPermission, setViewPermission]              = useState('');

  /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  nt_linh
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
   useEffect(() => {
    if (error.length > 0 || success.length > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
}, [error, success]);

  useEffect(() => {
    setLoading(true);
    loadViewPermission();
    getList(1, defaultPerPage);
    loadCurency();
    loadAWTitle();
  }, []);

  const loadViewPermission = async () => {
    let response = await ApiViewPermission.loadViewPermission();
    setLoading(false);
    if (response.flag !== false) {
      setViewPermission(response.data.view_permission)
    }
};

  let checkInput = (value) => {
    var engstr = /^[a-zA-Z0-9-_+.,' \b]*$/;
    if(engstr.test(value)) {
      return true;
    }
    return false;
  }
  /* GET YEAR DATA DROPDOWN */
  const loadMonth = () => {
    let month = []
    for (let i = 1; i <= 11; i++) {
      month.push(i)
    }
    return month;
  }

  /* GET MONTH DATA DROPDOWN */
  const loadYear = () => {
    let year = []
    for (let i = 1; i < 16; i++) {
      year.push(i)
    }
    return year;
  }

  /* GET LIMIT DATA DROPDOWN
     1:below,2:equal,3:above,4:and above,5:and below
  */
  const loadLimit = () => {
    return [
      {
        key: 1,
        value: "below"
      },
      {
        key: 2,
        value: "equal"
      },
      {
        key: 3,
        value: "above"
      },
      {
        key: 4,
        value: "and above"
      },
      {
        key: 5,
        value: "and below"
      }
    ]
  }

  /* Show dropdown toggle */
  const awTitleChange = (e) => {
    let aw_id = e.target.value;
    let index = e.target.selectedIndex;
    let optionElement = e.target.childNodes[index];
    let aw_cr = optionElement.getAttribute('name');
    setSelectedAWData(aw_id);
    setAllowanceCR(Number(aw_cr));
    setSelectLimit("");
    setSelectedMonth("");
    setSelectedYear("");
    setSelectAmount("");
    setSelectOther("");
    setSelectQualifi("");
    setSuccess("");
    setError("");
    setCurrentcies(currencyAPI[0].id);
    setPayWithSalary(1);
    setErrorModal([]);
  }

  const yearChange = (e) => {
    let year = e.target.value;
    setSelectedYear(year);
  }

  const monthChange = (e) => {
    let month = e.target.value;
    setSelectedMonth(month);
  }

  /*limit change */
  const limitChange = (e) => {
    let limit = e.target.value;
    setSelectLimit(limit);
  }

  // Amount
  const amountChange = (e) => {
    let amount =e.target.value;
    if(validateIntegerOnly(amount) || amount =="")
       setSelectAmount(amount);
  }

  //Qualification
  const qualifiChange = (e) => {
    let amount = e.target.value;
    setSelectQualifi(amount);
  }

  // Other
  const otherChange = (e) => {
    let other = e.target.value;
    setSelectOther(other);
  }

  const handleSalary = (e) => {
    let checked = e.target.checked;
    let id = '';
    if (checked === true)
      id = 1;
    else
      id = 0;
    setPayWithSalary(id);
    setShowModalBox(!showModalBox);
  }

  // load currency
  const loadCurency = async() => {
    let obj = { package_name: 'hr',
    url: linkAPI.currencies,
    method: 'get',
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setCurrentcies('');
      setCurrencyAPI([]);
    } else {
        let data = response.data.data;
        if (data) {
            setCurrentcies(data[0].id);
            setCurrencyAPI(data);
        }
    };
  };

  const handleToggleCurrency = (e) => {
    if (currentcies !== Number(e.target.id)) {
      setCurrentcies(Number(e.target.id));
    }
  }

  /* GET ALLOWANCE TITLE DROPDOWN*/
  const loadAWTitle = async() => {
    let obj = { package_name: 'hr',
        url: `${linkAPI.SubAllowanceRegisterListGetTitleAllowance}?company_id=${linkAPI.companyID}&language=${linkAPI.lang}`,
        method: 'get',
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setAWTitleAPI([]);
    } else {
        setAWTitleAPI(response.data.data)
    };
  };

  // END OF LOAD ALLWANCE TITLE

  /* GET SUB-ALLOWANCE */
  const getList = async(page = 1, perPage = 20) => {
    let obj = { package_name: 'hr',
    url: `${linkAPI.SubAllowanceRegisterListGetAllAllowance}?company_id=${linkAPI.companyID}&language=${linkAPI.lang}&page=${page}&per_page=${perPage}`,
    method: 'get',
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
        setError([]);
        setSuccess("");
    } else {
       let data = response.data.data;
        setMainTable(data);
        setRowCount(response.data.total);
        setTotalPage(response.data?.last_page);
    };
  };
  /* END OF GET SUB-ALLOWANCE */


  /* ADD SUB-ALLOWANCE MODAL BOX */
  const addToggleAlert = (e) => {
    setAddModalBox(!addModalBox);
    setSelectLimit("");
    setSelectedMonth("");
    setSelectedYear("");
    setSelectedAWData("");
    setSelectAmount("");
    setSelectOther("");
    setAllowanceCR("");
    setSelectQualifi("");
    setEditID(null);
    setSuccess("");
    setError("");
    setPayWithSalary(1);
    setCurrentcies(currencyAPI[0].id);
    setErrorModal("");
  };
  const addOnClose = () => {
    setAddModalBox(!addModalBox);
  };

  /* EDIT SUB-ALLOWANCE MODAL BOX */

  const editToggleAlert = (e) => {
    if(currentcies !== null && awTitleAPI.length > 0){
      setEditID(e['id']);
      setContent(t('Are you sure want to edit?')); setType('edit');
      setEditModalBox(!editModalBox);
      setSuccess("");
      setError("");
      setErrorModal("");
    }
  };
  const onClose = () => {
    setEditID("");
    setEditModalBox(false);
    setDeleteModalBox(false);
    setSaveModalBox(false);
  };
  const editOK = () => {
    setEditModalBox(!editModalBox);
    editRow(editID);
  };
   const closeSaveAlert =()=>{
     setAddModalBox(!addModalBox);
     setSaveModalBox(!saveModalBox);
     setErrorModal("");
   }

  /*SAVE ALLOWANCE */
  const saveData = () => {
    let experience=1;
    let qualification=2;
    let others=3;
    let arMess = [];
    if (allowanceCR == qualification) {
        if (!checkNullOrBlank(selectQualifi.trim())) {
            let errMsg = t('JSE124').replace('%s', t('Qualification Title'));
            arMess.push(errMsg);
        }
        else if(!checkInput(selectQualifi)){
            let errMsg = t('JSE10019').replace('%s', t('Qualification Title'));
            arMess.push(errMsg);
        }
    }
    if (allowanceCR == experience) {
        if (!checkNullOrBlank(selectedYear) && !checkNullOrBlank(selectedMonth)) {
            let errMsg = t('JSE001').replace('%s', t('Year or Month'));
            arMess.push(errMsg);
        }
        if (!checkNullOrBlank(selectLimit)) {
            let errMsg = t('JSE001').replace('%s', t('Limit'));
            arMess.push(errMsg);
        }
    }

    if (checkNullOrBlank(selectedAWData)) {
        let maxAmount= 2147483647;
        if (selectAmount==="") {
            let errMsg = t('JSE124').replace('%s', t('Amount'));
            arMess.push(errMsg);
        }
        if(selectAmount>maxAmount){
            let errMsg = t('JSE007').replace('%s', t('Amount')).replace('%s', maxAmount);
            arMess.push(errMsg);
        }
    }
    if (allowanceCR == others) {
        if (!checkNullOrBlank(selectOther.trim())) {
            let errMsg = t('JSE124').replace('%s', t('Other Title'));
            arMess.push(errMsg);
        }
        else if(!checkInput(selectOther)){
            let errMsg = t('JSE10019').replace('%s', t('Other Title'));
            arMess.push(errMsg);
        }
    }
    if (!checkNullOrBlank(selectedAWData)) {
        let errMsg = t('JSE001').replace('%s', t('Allowance Title'));
        arMess.push(errMsg);
    }

    if (arMess.length > 0) {
        setErrorModal(arMess);
        return;
    }
    else{
        setContent(t('Are you sure want to save?')); setType('save');
        setSaveModalBox(!saveModalBox);
        setAddModalBox(!addModalBox);
    }
  }
  /*END OF SAVE ALLOWANCE */
 const saveOK = async ()=>{
    setSaveModalBox(!saveModalBox);
    let aw_data = [];
    mainTable.forEach((main, index) => {
      aw_data[index] = main.id
    })
    if (editID === null) { //REGISTER MODE
        setLoading(true);
        let params={
            "allowance_id": selectedAWData,
            "currency_id": currentcies,
            "created_emp": linkAPI.createdEmp,  // login data from erp
            "updated_emp": linkAPI.updatedEmp,
            "experience_allowance_year": selectedYear,
            "experience_allowance_month": selectedMonth,
            "experience_limit": selectLimit,
            "qualification_allowance": selectQualifi,
            "others_allowance": selectOther,
            "allowance_amount": parseInt(selectAmount),
            "paid_with_salary": payWithSalary,
            "language": linkAPI.lang
        }
        let data = {
            package_name: 'hr',
            url: linkAPI.SubAllowanceRegisterListSave,
            method: 'post',
            params
        }
        let response = await ApiRequest(data);
        setLoading (false);
        if(response.flag === false){
            setError(response.message)
        } else{
            getList(1, defaultPerPage);
            setActivePage(1);
            setSuccess([response.data.message]);
            setError([]);
            setSelectLimit("");
            setSelectedMonth("");
            setSelectedYear("");
            setSelectedAWData("");
            setSelectAmount("");
            setSelectOther("");
            setSelectQualifi("");
            setPayWithSalary(1);
            setErrorModal("");
        }
    } else { // EDIT MODE
        setLoading(true);
        let params={
            "company_id": linkAPI.companyID,
            "allowance_id": selectedAWData,
            "currency_id": currentcies,
            "updated_emp": linkAPI.updatedEmp,
            "experience_allowance_year": selectedYear,
            "experience_allowance_month": selectedMonth,
            "experience_limit": selectLimit,
            "qualification_allowance": selectQualifi,
            "others_allowance": selectOther,
            "allowance_amount": parseInt(selectAmount),
            "paid_with_salary": payWithSalary,
            "language": linkAPI.lang
        }
        let data = {
            package_name: 'hr',
            url: linkAPI.SubAllowanceRegisterListGetAllowance + editID,
            method: 'put',
            params
          }
        let response = await ApiRequest(data);
        setLoading (false);
        if(response.flag === false){
            setError(response.message)
        } else{
            setSelectLimit("");
            setSelectedMonth("");
            setSelectedYear("");
            setSelectedAWData("");
            setSelectAmount("");
            setSelectOther("");
            setSelectQualifi("");
            setPayWithSalary(1);
            getList(currentPage, defaultPerPage);
            setSuccess([response.data.message]);
            setError([]);
         }
    }
  }


  /* DELETE SUB-ALLOWANCE MODAL BOX */

  const deleteToggleAlert = () => {
    setDeleteID("");
    setDeleteModalBox(!deleteModalBox);
  };
  const deleteRow = (e) => {
    setDeleteID(e['id'])
    setContent(t('Are you sure want to delete?')); setType('delete');
    setDeleteModalBox(!deleteModalBox);
    setError("");
    setSuccess("");
  };

  /*DELETE FUNCTION ALLOWANCE */
  const deleteOK = async (e) => {
    setLoading(true);
    setDeleteModalBox(!deleteModalBox);
    let obj = { package_name: 'hr',
        url: `${linkAPI.SubAllowanceRegisterListGetAllowance}${deleteID}?company_id=${linkAPI.companyID}&language=${linkAPI.lang}`,
        method: 'delete',
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
        setError(response.message);
        setSuccess("");
        getList(1,defaultPerPage);
    } else {
        let currentPageCheck=currentPage;
        if(rowCount-((currentPage -1) *defaultPerPage) ===1 && currentPage!== 1){
            setActivePage(currentPage - 1);
            currentPageCheck=currentPage - 1
        }
        let successMsg = response.data.message;
        setSuccess([successMsg]);
        setError([]);
        setTimeout(function () {
            getList(currentPageCheck, defaultPerPage);
        }, 500);
    };
  }

  /* EDIT ROW */
  const editRow = (edit_id) => {
    const object = mainTable.find(item => item.id === edit_id);
    if (object) {
      setShowModalBox(true);
      setSelectedAWData(object['allowance_id']);
      setSelectedYear(object['experience_allowance_year']);
      setSelectedMonth(object['experience_allowance_month']);
      setSelectAmount(parseInt(object['allowance_amount']));
      setSelectLimit(object['experience_limit']);
      setSelectQualifi(object['qualification_allowance']);
      setSelectOther(object['others_allowance']);
      setCurrentcies(object['currency_id']);
      setAllowanceCR(object.allowances['allowance_category']);
      setPayWithSalary(object['paid_with_salary']);
      setAddModalBox(true);
    }
  };

  const editTest = (year, month, limit) => {
    var text = '';
    if (year !== null) {
      text += year + ' years ';
    }
    if (month !== null) {
      text += month + ' months ';
    }
    let limits = "";
    loadLimit().map((item) => {
      if (limit != null && limit == item.key)
        limits += item.value;
    })
    return text + limits;
  };

  let changePage = (newPage) => {
    setActivePage(newPage);
    getList(newPage, defaultPerPage);
  }

  let removeMessageError = () => {
    setErrorModal([]);
    setError([]);
  }

  return (
    <CRow>
        <CCol>
            <Loading start={loading} />
            <Message success={success} error={error} />
            <CCard className="subAllowanceRegisterList">
                <CCardHeader>
                    <h5 id='lbSubAllowanceRegisterList'><label>{t('SubAllowance Register List')}</label></h5>
                </CCardHeader>
                <AddSubAllowanceRegisterList
                    viewPermission={viewPermission}
                    addToggleAlert={addToggleAlert}
                    currentcies={currentcies}
                    awTitleAPI={awTitleAPI}/>
                <CCardBody>
                    <RegisterListTable
                        viewPermission={viewPermission}
                        mainTable={mainTable}
                        rowCount={rowCount}
                        editTest={editTest}
                        editToggleAlert={editToggleAlert}
                        deleteRow={deleteRow}
                        defaultPerPage={defaultPerPage}
                        totalPage={totalPage}
                        currentPage={currentPage}
                        changePage={changePage}
                    />
                    <Confirmation
                        content={content}
                        okButton={t('Ok')}
                        cancelButton={t('Cancel')}
                        show={editModalBox || deleteModalBox || saveModalBox }
                        type={type}
                        editModalBox={editModalBox}
                        editOK={editOK}
                        cancel={onClose}

                        deleteModalBox={deleteModalBox}
                        deleteToggleAlert={deleteToggleAlert}
                        deleteOK={deleteOK}
                        closeSaveAlert={closeSaveAlert}
                        saveOK={saveOK}
                        saveModalBox={saveModalBox}
                    />
                    <ConfirmationRegisterList
                        removeMessage={removeMessageError}
                        errorModal={errorModal}
                        editID={editID}
                        currencyAPI={currencyAPI}
                        allowanceCR={allowanceCR}
                        qualifiChange={qualifiChange}
                        otherChange={otherChange}
                        yearChange={yearChange}
                        monthChange={monthChange}
                        limitChange={limitChange}
                        amountChange={amountChange}
                        awTitleAPI={awTitleAPI}
                        awTitleChange={awTitleChange}
                        loadYear={loadYear}
                        loadMonth={loadMonth}
                        loadLimit={loadLimit}
                        payWithSalary={payWithSalary}
                        handleSalary={handleSalary}
                        selectAmount={selectAmount}
                        selectLimit={selectLimit}
                        selectOther={selectOther}
                        selectQualifi={selectQualifi}
                        selectedAWData={selectedAWData}
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                        currentcies={currentcies}
                        handleToggleCurrency={handleToggleCurrency}
                        amount_limit={amount_limit}
                        addModalBox={addModalBox}
                        addOnClose={addOnClose}
                        saveData={saveData}
                        deleteRow={deleteRow}
                    />
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
);
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function SubAllowanceRegisterList() { return ( <Welcome />) }

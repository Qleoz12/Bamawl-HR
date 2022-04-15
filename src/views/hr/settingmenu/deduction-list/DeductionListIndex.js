import React, { useState, useEffect } from 'react';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import apiPath from "../../../brycen-common/api-path/ApiPath";
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import SearchDeductionList from './SearchDeductionList';
import DeductionListTable from './DeductionListTable';
import DeleteDeductionList from './DeleteDeductionList';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  const history = useHistory(); // For edit link
  const [selectDeductionName, setSelectDeductionName] = useState(); // select Deduction Name Data
  const [deductionCategoryAPI, setDeductionCategoryAPI] = useState([]);
  const [OTData, setOTData] = useState(); // For Select Overtime Title
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(0);// total row per page
  const [rowCount, setRowCount] = useState(); // For row count
  const [mainTable, setMainTable] = useState([]); // for main table
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [show, setShow] = useState(false);// For show/hide confirmation box
  /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  v_hao
    * @create  07/08/2021 (D/M/Y)
    * @param
    * @return
    */
  useEffect(() => {
    if (error.length > 0 || success.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [error, success]);

  /**
    * Page Load
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
  useEffect(() => {
    setLoading(true);
    ApiViewPermission.loadViewPermission();
    loadDeductionCategory();
    loadOTName();
  }, []);

  /** start API for Deduction Name */

  /**
    * Load Deduction Category
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
  const loadDeductionCategory = async () => {
    let obj = { package_name: 'hr', url: apiPath.deductionGetDeductions, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
    } else {
      let data = response.data.data;
      setDeductionCategoryAPI(data);
    }
  }

  /**
   * Load Deduction Name
   *
   * @author  v_hao
   * @create  08/07/2021 (D/M/Y)
   * @param
   * @return
   */
  const [DeductionNameAPI, setDeductionNameAPI] = useState([]);
  const loadOTName = async () => {
    let params = {
      company_id: apiPath.companyID,
    };
    let obj = { package_name: 'hr', url: apiPath.deductionName, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
    } else {
      let data = response.data.data;
      setDeductionNameAPI(data);
    }
  }

  let chooseCategoryName = (i) => {
    let data = i.target.value;
    setSelectDeductionName(data)
  }

  let otTitleChange = (e) => {
    setOTData(e.target.value);
  }

  /** Search Function */
  const [requestState, setRequestState] = useState();
  let fnSearch = () => {
    let request = {
      "deduction_category_id": selectDeductionName ? selectDeductionName : "",
      "company_id": apiPath.companyID,
      "deduction_name": OTData ? OTData : "",
      "language": apiPath.lang,
      "per_page": 20,
    }

    setRequestState(request);
    searchAPI(request);
  }

  const searchAPI = async (request, pageNumber = 1, msg = true) => {
    request = { ...request, page: pageNumber }
    let params = {
      ...request,
      page: pageNumber
    }

    let obj = { package_name: 'hr', url: apiPath.deductionListSearchPage, method: 'post', params };
    setLoading(true);
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setRowCount('');
      msg && setError(response.message);
      msg && setSuccess("");
      setMainTable([]);
    } else {
      let res = response.data.deduction_list;
      let data = res.data;
      data = data.map(ele => ({
        ...ele,
        deduction_type: ele.deduction_type == 1 ? "Percentage" : "Amount",
        deduction_period: ele.deduction_period == 1 ? `${ele.deduction_month} Months` : "Every Month"
      }))
      setCurrentPage(res.current_page);
      setTotalPage(res.last_page);
      setPerPage(res.per_page)
      setRowCount(res.total);
      setMainTable(data);
      setAllCheck(false);
      setDeleteIdList("");
      msg && setError('');
      msg && setSuccess('');
    }
  }

  /** Page Change Navigation */
  async function pageChange(i) {
    await searchAPI(requestState, i);
    setAllCheck(false);
    setCurrentPage(i);
    setAllCheck(false);
    setDeleteIdList('');
  }

  /* DELETE MODAL BOX */
  const deleteToggleAlert = () => {
    if (isEmpty(deleteIdList)) {
      setSuccess("");
      let errorMsg = t('JSE004');
      setError([errorMsg]);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    else {
      setShow(!show); setContent(t('Are you sure want to delete?')); setType('delete');
      setError("");
    }
  }

  const deleteOK = async () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShow(!show);
    if (!isEmpty(deleteIdList)) {
      setLoading(true);
      let url = `${apiPath.deductionListDelete}${deleteIdList}?company_id=${apiPath.companyID}&device_flag=${apiPath.deviceFlag}&employee_id=${20000}&language=${apiPath.lang}`;
      let obj = { package_name: 'hr', url: url, method: 'delete' };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setSuccess('');
        let errorMsg = response.message;
        let error_del = [];
        if (!isEmpty(response.data.data.errors)) {
          error_del = response.data.data.errors.sort();
          let data = [];
          let arr_parent = [];
          data = mainTable?.map((i) => {
            arr_parent.push(i.id);
          })
          let teamp = [];
          error_del.forEach(function (error_del) {
            teamp.push(" " + "No" + (arr_parent.indexOf(error_del) + (currentPage - 1) * perPage + 1));
          });
          setError([errorMsg + teamp]);
        } else {
          setError(errorMsg);
          searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
        }
      } else {
        let successMsg = t("JSE003");
        setError('');
        setTimeout(function () {
          searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
          setSuccess([successMsg]);
        }, 2500);
        loadOTName();
      }
    } else {
      setSuccess('');
      let errorMsg = t("JSE004");
      setError([errorMsg]);
    }
  }

  /* CHECKBOX ACTION */
  const [AllCheck, setAllCheck] = useState(false);      // For select checkbox all or not
  const [deleteIdList, setDeleteIdList] = useState(''); // For delete data list
  const change_checkbox = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let data;
    let id_list = [];
    if (value === "all-check") {
      data = mainTable.map(item => ({ ...item, is_checked: checked }));
    } else {
      data = mainTable.map(item =>
        item.id === parseInt(value) ? { ...item, is_checked: checked } : item
      )
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_checked === true) {
        id_list.push(data[i].id);
      }
    }
    setDeleteIdList(id_list.toString());
    setAllCheck(data.every(item => item.is_checked));
    setMainTable(data);
  }

  /* EDIT MODAL BOX */
  const [editID, setEditID] = useState('');
  const editToggleAlert = (e) => {
    setEditID(e['id']);
    setShow(!show); setContent(t('Are you sure want to edit?')); setType('edit');
  }
  const editOK = () => {
    setShow(!show);
    editRow(editID);
  }
  /* EDIT LINK TO NEXT PAGE */
  const editRow = (id) => {
    localStorage.setItem('RETURN_DEDUCTION_DATA', JSON.stringify(id));
    history.push("./deduction-register");
  }
  const removeMessage = () => {
    setError("");
    setSuccess("");
  }
  return (
    <CRow className="deduclist">
      <CCol xs="12">
        <Loading start={loading} />
        <Message success={success} error={error} />
        <Confirmation
          content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
          cancel={() => setShow(!show)} deleteOK={deleteOK} editOK={editOK}
        />
        <CCard>
          <CCardHeader>
            <h5>{t('Deduction List')}</h5>
          </CCardHeader>
          <CCardBody>
            <SearchDeductionList
              deductionCategoryAPI={deductionCategoryAPI} chooseCategoryName={chooseCategoryName}
              otTitleChange={otTitleChange} OTData={OTData} DeductionNameAPI={DeductionNameAPI}
              searchAPI={() => fnSearch()}
            />
            <DeductionListTable
              mainTable={mainTable} rowCount={rowCount} AllCheck={AllCheck}
              change_checkbox={change_checkbox} editToggleAlert={editToggleAlert} currentPage={currentPage}
              totalPage={totalPage} perPage={perPage} pageChange={pageChange} />
            <DeleteDeductionList
              mainTable={mainTable} deleteToggleAlert={deleteToggleAlert}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function DeductionListIndex() {
  return (
    <Welcome />
  )
}

/**
 * Employee Registration Form
 * @author Thin Thin Nwe
 * @create
*/

import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CFormGroup, CInputRadio, CLabel } from '@coreui/react'
import './emp-registration.scss'
import BlockDepartmentPosition from './ComponentDeptPosition'
import BlockPackage from './ComponentPackage'
import BlockEmp from './ComponentEmployee'
import BlockExcelUpload from './ComponentExcelUpload'
import message from '../../../erp/erp-common/commonMessage'
import {
  validateEmail, validateNRC, validatePhone, isHan, engcharNumberOnly, validatePwd
} from '../../../erp/erp-common/commonValidation'
import { withTranslation } from 'react-i18next'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import {reactLocalStorage} from 'reactjs-localstorage'

function LegacyWelcomeClass({ t }) {

  const [ loading, setLoading ] = useState(true)
  const [ country, setCountry ] = useState([])
  const [ states, setStates ] = useState([])
  const [ packageInfo, setPackageInfo ] = useState([])
  let [ employeeData, setEmployeeData ] = useState([])
  let [ file, setFile ] = useState()
  let [ selectFile, setSelectFile ] = useState()
  let [ imagePreviewUrl, setImagePreviewUrl ] = useState()
  let [ imgError, setImgError ] = useState("")
  let [ empError, setEmpError ] = useState([])
  let [ error2, setError2 ] = useState([])
  let [ success, setSuccess ] = useState([]) 
  let [ department, setDepartment ] = useState([])
  let [ deptId, setDeptId ] = useState("")
  let [ deptIdArr, setDeptIdArr ] = useState("")
  let [ deptNameArr, setDeptNameArr ] = useState("")
  let [ position, setPosition ] = useState([])
  let [ positionId, setPositionId ] = useState("")
  let [ positionIdArr, setPositionIdArr ] = useState([])
  let [ posNameArr, setPosNameArr ] = useState([])
  let [ deptPosition, setDeptPosition ] = useState([])
  let [ btnSaveEdit, setBtnSaveEdit ] = useState('Save')
  let [ clear, setClear ] = useState(false)
  let [ editImage, setEditImage ] = useState("")
  const [ content, setContent ] = useState('');
  const [ type, setType ] = useState('');
  const [ show, setShow ] = useState(false);
  let [ loginData, setLoginData ] = useState([])
  const [ form_data, setFormData ] = useState({
    eye_type: 'eye-open.svg',
    eye_value: 0,
    input_type: 'password',
  });
  const [register_value, setRegisterValue] = useState(1); // register value for radio
  const [ExcFileName, setExcFileName] = useState(''); // excel file name
  const [ExcFile, setExcFile] = useState(''); // excel file
  const [Remove, setRemove] = useState(false); // remove button
  const [Save, setSave] = useState(false); // save button
  let [ loginPermission, setLoginPermission ] = useState([])
  let [ role, setRole ] = useState([]) // for Role dropdown
  let [ area, setArea ] = useState([]) // for Area dropdown
  let [ clearPhotoFlag, setClearPhotoFlag ] = useState(false)

  useEffect(() => {    
    getData()    
  }, []);

  // get data when form load
  const getData = async () =>{
    let loginData = {
      "login_id"  : reactLocalStorage.get('LOGIN_ID'),
      "company_id": reactLocalStorage.get('COMPANY_ID'),
      "role_id"   : reactLocalStorage.get('ROLE_ID'),
      "language"  : reactLocalStorage.get('LANGUAGE')
    }
	  setLoginData(loginData)
    let id = localStorage.getItem("EMPLOYEE_ID")
    localStorage.removeItem("EMPLOYEE_ID");
    setEmployeeData([])
    
    // show/ hide action button by login user permission
    let getPermission = {
      ...loginData,
      "page_name" : "Employee Registration"
    }
    let obj = { method: 'get', url: 'api/specific_permission', params: getPermission }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
      setError2(response.message); window.scrollTo(0,0);
    } else {
      setError2([])
      let permit = response.data.permission
      permit.forEach((per, i) => {
        permit[i] = per["display_name"]        
      });
      setLoginPermission(permit)
    }
    
    obj = { method: 'get', url: 'api/role-register', params: loginData }
    response = await ApiRequest(obj);
    setLoading(false);
    if(response.flag === false){
        setEmpError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
        setEmpError([]);
        setRole(response.data.role_list);
    }
    
    obj = { method: 'get', url: 'api/get_area', params: loginData }
    response = await ApiRequest(obj);
    setLoading(false);
    if(response.flag === false){
        setEmpError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
        setEmpError([]);
        setArea(response.data.area);
    }
    
    // get data when click edit button from Employee List
    if (id) {
      setBtnSaveEdit("Update")
      setEmployeeData({
        "employee_id": id
      })      
      let obj = { method: 'get', url: `api/emp_management/${id}`, params: loginData }
      let response = await ApiRequest(obj);
      setLoading(false)
      if(response.flag === false){        
        setSuccess([]);
        setEmpError(response.message);
      }else{
        let editData = response.data
        setDepartment(editData.department_list)
        setPosition(editData.position_list)
        setCountry(editData.country_list)
        setStates(editData.state_list)
        setDeptPosition(editData.dept_pos)
        setPackageInfo(editData.package_list)

        for(let i=0; i<editData.dept_pos.length; i++) {
          if(editData.dept_pos.length-1 !== i) {
            deptIdArr     += editData.dept_pos[i]["department_id"] + ','
            deptNameArr   += editData.dept_pos[i]["department_name"] + ','
            positionIdArr += editData.dept_pos[i]["position_id"] + ','
            posNameArr    += editData.dept_pos[i]["position_name"] + ','
          } else {
            deptIdArr     += editData.dept_pos[i]["department_id"]
            deptNameArr   += editData.dept_pos[i]["department_name"]
            positionIdArr += editData.dept_pos[i]["position_id"]
            posNameArr    += editData.dept_pos[i]["position_name"]
          }
        }
        
        let temp = {
          "department_id": deptIdArr,
          "position_id": positionIdArr
        }

        let tArr = {...editData.employee_data,...temp}
        setEmployeeData(tArr);        
        setDeptIdArr(deptIdArr)
        setDeptNameArr(deptNameArr)
        setPositionIdArr(positionIdArr)
        setPosNameArr(posNameArr)
        setSelectFile(editData.employee_data.photo)
        setImagePreviewUrl(editData.employee_data.photo_url)
        setEditImage(editData.employee_data.photo)
        window.scrollTo(0,0);
      }     
    } else { // get Employee Data
      let obj = { method: 'get', url: 'api/emp_register', params: loginData }
      let response = await ApiRequest(obj);
      setLoading(false)
      if(response.flag === false){
        setEmpError(response.message); setSuccess([])
      } else {        
        let res = response.data
        setCountry(res.country_list)
        setStates(res.state_list)
        setDepartment(res.department_list)
        setPosition(res.position_list)
        setEmployeeData({
          "employee_id": res.employee_id
        })
        setPackageInfo(res.package_list)
      }
    }
  }

  // image select in form
  const handleImageChange= (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    setEditImage(''); setSelectFile(''); setImagePreviewUrl(""); setFile('');

    if(file) {
      setClearPhotoFlag(false);
      reader.onloadend = () => {
        setFile(file)
        setImagePreviewUrl(reader.result)
        setSelectFile(file.name)
      }
      reader.readAsDataURL(file)
    }    
  }

  const clearPhoto = (e) => {
    setImgError('');
    setFile('')
    setImagePreviewUrl('')
    setSelectFile('')
    setEditImage("");
    setClearPhotoFlag(true);
  }

  // data change in form
  const dataChange = (e) => {  
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value
    });
  };
  
  // check package checkbox
  const checkPackage = (e, id, name) => {
    let data = [], temp = [], checked = e.target.checked;

    if(name === 'Expense'){
        if(checked) {
          temp = packageInfo.map(item =>
                  item.package_name === name ? { ...item, chk_status: checked } : item
                 );
          data = temp.map(item =>
                  item.pk_id === 1 ? { ...item, chk_status: checked } : item
                 );
        } else {
          data = packageInfo.map(item =>
                  item.package_name === name ? { ...item, chk_status: checked } : item
           );
        }
    }else{
      if(!checked && parseInt(id) === 1) {
        temp = packageInfo.map(item =>
          item.package_name === name ? { ...item, chk_status: checked } : item
         );
        data = temp.map(item =>
                item.package_name === 'Expense' ? { ...item, chk_status: checked } : item
               );
      } else {
        data = packageInfo.map(item =>
                item.pk_id === parseInt(id) ? { ...item, chk_status: checked } : item
               );
        }
    }
    setPackageInfo(data);
  }
  
  // select department in form
  const deptChange = async (e) => {
    let deptId = e.target.value;
    setDeptId(deptId)
    setPositionId("")
    setPosition([])

    if(deptId !== "0"){
      let obj = { method: 'get', url: `api/get_dept_pos/${deptId}`, params: loginData }
      let response = await ApiRequest(obj);
      if(response.flag === false){
        setEmpError(response.message); setSuccess([]);
      } else {
        const result=response.data[0].positions;
        setPosition(result)
      }
    } else {
      let obj = { method: 'get', url: 'api/emp_register', params: loginData }
      let response = await ApiRequest(obj);
      if(response.flag === false){
        setEmpError(response.message); setSuccess([]);
      } else {
        setPosition(response.data.position_list)
      }
    }
  }

  // click Add Dept & Position button
  const AddDeptPos = () => {
    setEmpError([])
    let error = []  
    if(!deptId || deptId === "0") {
      error.push(t(message.JSE002).replace('%s', t('Department Name')))
    }
    if(!positionId || positionId === "0") {
      error.push(t(message.JSE002).replace('%s', t('Position Name')))
    }
    if(error.length < 1) {
      let tmp  = false;
      if(deptIdArr.length > 0) {
        let tmpDeptIdArr  = deptIdArr.split(',');       
        for(let j=0; j<tmpDeptIdArr.length; j++){
          if(deptId === tmpDeptIdArr[j]) {
            tmp = true;
            let dname = department.filter(d => d.id === parseInt(deptId))
            error.push(t(message.JSE006).replace('%s', t(dname[0].department_name)))
            setEmpError(error)
            window.scrollTo(0,0);
          }          
        }
      }
      
      if (!tmp) {
        let dname = department.filter(d => d.id === parseInt(deptId))
        let pname = position.filter(p => p.id === parseInt(positionId))
        if(deptIdArr.length > 0) {
          deptIdArr     += ',' + deptId;
          deptNameArr   += ',' + dname[0].department_name
          positionIdArr += ',' + positionId
          posNameArr    += ',' + pname[0].position_name
        } else {
          deptIdArr     = deptId
          deptNameArr   = dname[0].department_name
          positionIdArr = positionId
          posNameArr    = pname[0].position_name
        }

        tempDepartPosition() // Add or Remove Dept and Position in form
        
        setDeptIdArr(deptIdArr)
        setDeptNameArr(deptNameArr)
        setPositionIdArr(positionIdArr)
        setPosNameArr(posNameArr)
        setDeptPosition(deptPosition)
      }
    } else {
      setSuccess([])
      setEmpError(error)
      window.scrollTo(0,0);
    }
  }

  // delete department and position button
  function delDeptPos(dId) {
    let deptIdRemove   = deptIdArr.split(','); 
    let deptNameRemove = deptNameArr.split(',');
    let posIdRemove    = positionIdArr.split(',');
    let posNameRemove  = posNameArr.split(',');
    
    for(let i=0; i<deptIdRemove.length; i++) {

      if(parseInt(deptIdRemove[i]) === parseInt(dId)) {

        // Remove id from department array
        deptIdRemove.splice(i, 1);       
        deptIdArr = deptIdRemove.join(",");
        setDeptIdArr(deptIdArr)
        deptNameRemove.splice(i, 1);          
        deptNameArr = deptNameRemove.join(",");
        setDeptNameArr(deptNameArr)

        // Remove id from position array
        posIdRemove.splice(i, 1);
        positionIdArr = posIdRemove.join(",");
        setPositionIdArr(positionIdArr)
        posNameRemove.splice(i, 1);
        posNameArr = posNameRemove.join(",");
        setPosNameArr(posNameArr)
      }
    }
    deptPosition = []
    for(let i=0; i <deptIdRemove.length; i++) {
      deptPosition[i] = {
        "department_id"   : deptIdRemove[i],
        "department_name" : deptNameRemove[i],
        "position_id"     : posIdRemove[i],
        "position_name"   : posNameRemove[i],
      }
    }
    setDeptPosition(deptPosition)
    
    let temp = {
      "department_id": deptIdArr,
      "position_id": positionIdArr
    }

    let tArr = {...employeeData,...temp}
    setEmployeeData(tArr);   
  }

  // click Save or Update button
  const SaveEmployee = (event) => {
    setEmpError([])
    setSuccess([])
    let error = []

    if(!employeeData.employee_code) {
      error.push(t(message.JSE001).replace('%s', t('Employee Code')))
    } else {
      if(employeeData.employee_code.length > 20) {        
        error.push(t(message.JSE014).replace('%s', t('Employee Code')).replace('%s', t('20')))
      } else {
        if(!engcharNumberOnly(employeeData.employee_code)) {
          error.push(t(message.JSE003).replace('%s', t('Employee Code')))
        }
      }
    }

    if(!employeeData.name) {
      error.push(t(message.JSE001).replace('%s', t('Employee Name')))
    }
    
    if(!employeeData.name_eng) {
      error.push(t(message.JSE001).replace('%s', t('Employee Name ENG')))
    } else if(!isHan(employeeData.name_eng)) {
      error.push(t(message.JSE003).replace('%s', t('Employee Name ENG')))
    }
    
    if(!employeeData.area_id || employeeData.area_id === "0") {
      error.push(t(message.JSE002).replace('%s', t('Area')))
    }
    
    if(employeeData.phone_no && !validatePhone(employeeData.phone_no)) {
      error.push(t(message.JSE008).replace('%s', t('Phone Number')))
    }
    
    if(employeeData.nrc_number && !validateNRC(employeeData.nrc_number)) {
      error.push(t(message.JSE008).replace('%s', t('NRC Number')))
    }
    
    if(btnSaveEdit === "Save") {
      if(!employeeData.password) {
        error.push(t(message.JSE001).replace('%s', t('Password')))
      }
      // If password is less than 8, store error message
      else if(employeeData.password.length < 8){
        error.push(t(message.JSE019).replace('%s', t('Password')))
      }
      else if(!validatePwd(employeeData.password)){
        error.push(t(message.JSE008).replace('%s', t('Password')))
      }
  
      if(!employeeData.confirmPassword) {
        error.push(t(message.JSE001).replace('%s', t('Confirm Password')))
      }
      // If Confirm Password is less than 8, store error message
      else if(employeeData.confirmPassword.length < 8){
        error.push(t(message.JSE019).replace('%s', t('Confirm Password')))
      }
      else if(!validatePwd(employeeData.confirmPassword)){
        error.push(t(message.JSE008).replace('%s', t('Confirm Password')))
      }
      
      if(employeeData.password && employeeData.confirmPassword) {
        if(employeeData.password !== employeeData.confirmPassword) {
          error.push(t(message.JSE009).replace())
        }
      }
    }
    
    if(!employeeData.email) {
      error.push(t(message.JSE001).replace('%s', t('Email Address')))
    } else {
      if(!validateEmail(employeeData.email)) {
        error.push(t(message.JSE008).replace('%s', t('Email Address')))
      }
    }
    
    if(employeeData.passport_number) {
      if(!engcharNumberOnly(employeeData.passport_number)) {
        error.push(t(message.JSE003).replace('%s', t('Passport Number')))
      } else if(employeeData.passport_number.length < 6 || employeeData.passport_number.length > 10) {
        error.push(t(message.JSE012).replace('%s', t('Passport Number')).replace('%s', t('6')).replace('%s', t('10')))
      }      
    }
    
    if(!employeeData.employee_type || employeeData.employee_type === "0") {
      error.push(t(message.JSE002).replace('%s', t('Employee Type')))
    }
    
    if(!employeeData.role || employeeData.role === "0") {
      error.push(t(message.JSE002).replace('%s', t('Role')))
    }
    
    // #3 Catching files that are too large on the client
    if(file) {
      if (file.size > 10485760) { //check image size greater than 10MB
        error.push(t(message.JSE007).replace('%s', t(`'${file.name}'`)).replace('%s', t('10MB')))
      }
    }

    if(!employeeData.department_id) {
      error.push(t(message.JSE002).replace('%s', t('Department Name')))
    }
    if(!employeeData.position_id) {
      error.push(t(message.JSE002).replace('%s', t('Position Name')))
    }

    if (file && !selectFile.match(/\.(jpg|jpeg|png|gif)$/) ) {
      error.push(t(message.JSE017).replace('%s', t('Upload Photo')))
    }    
    
    let flag = false
    let temp = []
    packageInfo.map(item => {
      if(item.package_name === "Expense" && item.chk_status) {
        flag = true
        temp = packageInfo.filter(pkg => {
          return pkg.package_name === "HR Management" && pkg.chk_status
        })        
      }
    })

    if(flag && temp.length !== 1)
      error.push(t(message.JSE020).replace('%s', t('HR Management')))

    if(error.length > 0 || imgError !== "") {
      setEmpError(error); setSuccess([]); window.scrollTo(0,0);
    } else {
      setEmpError([]); setSuccess([]); setType('save');
      (event.target.value === "Save")
        ? setContent(t('Are you sure want to save?'))
        : setContent(t('Are you sure want to update?'))
       setShow(!show);
    }    
  }
  
  const saveOK = async(saveEdit) =>{
    setShow(!show); setType(''); setContent('');    
    setLoading(true)
    let empData = ""
    if(packageInfo !== "") {     
      let pk_id = packageInfo
        .filter((data) => data.chk_status)
        .map((data) => data.pk_id)
        .toString();

      let temp = {
        "package_id": pk_id
      }
        
      empData = {
        ...employeeData,...temp, ...loginData
      }
    } else {
      empData = {...employeeData, ...loginData}
    }
    
    let obj = {}
    let formData = new FormData();

    if(saveEdit === "Save") {
      
      for (let key in empData) {
        if(empData[key] !== "" || empData[key] !== null) {
          formData.append(
            key, empData[key]
          )
        }
      }        
      
      if(file && selectFile) {
        formData.append(
          "photo", file, selectFile,
        )
      }
      
      if(clearPhotoFlag) {
        formData.delete('photo');
      }

      obj = { method: 'post', url: 'api/emp_register', params: formData }
    } else {
    
      tempDepartPosition() // Add or Remove Dept and Position in form
      
      for (let k in empData) {
        formData.append(
          k, empData[k]
        )
      }
      
      if(file && selectFile) {
        formData.append(
          "photo", file, selectFile,
        )
      }
      
      if(clearPhotoFlag) {
        formData.delete('photo');
      }

      obj = { method: 'post', url: 'api/emp_management/update', params: formData}
    }

    let response = await ApiRequest(obj);
    setLoading(false)

    if(response.flag === false) {
        setEmpError(response.message); setSuccess([]); window.scrollTo(0,0);
    } else {
        setBtnSaveEdit("Save")
        setEmpError([]);
        setSuccess([response.data.message]);
        window.scrollTo(0,0)
        document.getElementById("emp_registeration").reset();
        setPosition([])
        setDepartment([])
        setCountry([])
        setStates([])
        getData()
        setEmployeeData([])
        setDeptPosition([])
        setDeptId("")
        setDeptIdArr([])
        setDeptNameArr([])
        setPositionId("")
        setPosNameArr([])
        setClear(true)
        setFile("")
        setImagePreviewUrl("")
        setEditImage("")
        setSelectFile("")
        formData.delete('photo');
    }
  }
  
  // temporarily save department and position
  function tempDepartPosition() {
    if(deptIdArr.length > 0) {
      let dNameArr = deptNameArr.split(',')
      let dIdArr   = deptIdArr.split(',')
      let pIdArr   = positionIdArr.split(',')  
      let pNameArr = posNameArr.split(',')
      if(dNameArr.length > 0) {            
        for(let i=0; i <dNameArr.length; i++) {
          deptPosition[i] = {
            "department_id"   : dIdArr[i],
            "department_name" : dNameArr[i],
            "position_id"     : pIdArr[i],
            "position_name"   : pNameArr[i],
          }
        }
  
        let temp = {
          "department_id" : deptIdArr,
          "position_id"   : positionIdArr
        }
  
        let tArr = {...employeeData,...temp}
        setEmployeeData(tArr);
      }
    }
  }
  
  // to fill address in Company Address Text Box
  function changeAddress() {

    let address = ""
    let targetValue = ""

    if(document.getElementById("home_number").value !== "")
      address = document.getElementById("home_number").value
      
    if(document.getElementById("streetward").value !== "") {
      targetValue = document.getElementById("streetward").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }

    if(document.getElementById("township").value !== "") {
      targetValue = document.getElementById("township").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }
    
    if(document.getElementById("city").value !== "") {
      targetValue = document.getElementById("city").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }
    
    if(document.getElementById("division").value !== '0') {
      targetValue = document.getElementById("division").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }
    
    if(document.getElementById("country").value !== '0') {
      targetValue = document.getElementById("country").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }    

    if(address !== "") {
      document.getElementById("address").value = address
      setEmployeeData({
        ...employeeData,
        "address": address
      });
    } else document.getElementById("address").value = ""
  }

  /**
    * generate password method
    * @ref  Nay Zaw Linn
  */
  const generatePassword = () => {
      const six = 6; const eight = 8;
      let string = "abcdefghijklmnopqrstuvwxyz";
      let numeric = '0123456789';
      let special = '@$!%*#?&^~';
      let result = "", password = "";
  
      for ( let i = six; i < eight; i++ ) {
          result += string.charAt(Math.floor(Math.random() * string.length));
          result += string.toUpperCase().charAt(Math.floor(Math.random() * string.length));
          result += special.charAt(Math.floor(Math.random() * special.length));
          result += Math.ceil(numeric.length * Math.random() * Math.random());
      }
      password = result.split('').sort(()=>{return 0.5-Math.random()}).join('');
      setEmployeeData({...employeeData, password: password, confirmPassword: password});
  }
  
  const click_eye = () => {
      // if 0, type is password, (or) type is text
      if(form_data.eye_value === 0){
          setFormData({...form_data, input_type: 'text', eye_value: 1, eye_type: 'eye-close.svg'});
      }else{
          setFormData({...form_data, input_type: 'password', eye_value: 0, eye_type: 'eye-open.svg'});
      }
  }
  
  /**  excel upload start
    @ref  Nay Zaw Linn
  */
  
  /* register method */
  let change_register = (i) => {
      setRegisterValue(parseInt(i.target.value));
      remove_file(i)
  }

  /* download excel method */
  let excel_download = async () => {
    setEmpError([]); setSuccess([]); setLoading(true);      
    let obj = { method: 'get', url: 'api/excel-format-download', params: loginData, type: 'blob',
    headers: {"Access-Control-Allow-Origin": "http://10.95.101.117:8082"} }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setEmpError(response.message); setSuccess([]); window.scrollTo(0,0);
    }else{
      if( response.data.type === 'application/json' ){ // if return type is json,
          let reader = new FileReader();
          reader.readAsBinaryString(response.data);
          reader.onload = function () {
              let obj = JSON.parse(reader.result);
              // if NG, show error message
              if( obj.status === 'NG' ){
                  setEmpError([obj.message]); window.scrollTo(0,0);
              }
          }
      }else{
          let getHeader = response.headers["content-disposition"];
          // get only file name from getHeader variable
          let fileName = getHeader.split('filename=')[1];
          // generate link for blob object
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName; //or any other extension
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }
    }
  }
  
  /* File change */
   let change_file = (i) => {
      const zero = 0;
      if( i.target.files.length > zero ){
          setExcFileName(i.target.files[zero].name);
          setExcFile(i.target.files[zero]);
          setRemove(true);
          setSave(true);
      }
  }
  
  /* Clear excel filename and file */
   let clear_file = (i) => {
      i.target.value = null;
  }
  
  /* Clear excel filename and file */
  let remove_file = (i) => {
      setExcFileName(''); setExcFile(''); setRemove(false); setSave(false);
      i.target.value = null;
  }
  
  /* to confimr save excel file */
  let save_excel = () => {
      let error = [];
      if(ExcFile) {
        if (ExcFile.size > 10485760) { //check excel file size greater than 10MB
          error.push(t(message.JSE007).replace('%s', t(`'${ExcFileName}'`)).replace('%s', t('10MB')))
        }
      }
      if(error.length > 0) {
        setEmpError(error); setSuccess([]); window.scrollTo(0,0);
      } else {
        setEmpError([]); setSuccess([]); setType('save');
        setContent(t('Are you sure want to save?')); setShow(!show);
      }
  }
  
  let saveExcelOK = async() => {
    setShow(!show);
    setLoading(true);
    const formData  = new FormData();
    formData.append("import_file", ExcFile, ExcFileName);
    formData.append("login_id",loginData.login_id);
    formData.append("company_id",loginData.company_id);
    formData.append("role_id",loginData.role_id);
    formData.append("language",loginData.language);
    formData.append("from",'upload');
    let obj = { method: 'post', url: 'api/emp-excel-import', params: formData }
    let response = await ApiRequest(obj);
    setLoading(false)
    if(response.flag === false){
        setEmpError(response.data.data.message);
        setSuccess([]); 
    }else{
        setExcFileName(''); setExcFile(''); setRemove(false); setSave(false);
        setSuccess([response.data.message]);
        setPosition([]); setDepartment([]); setCountry([]); setStates([]); getData();
        setEmployeeData([]); setDeptPosition([]); setDeptId(""); setDeptIdArr([]);
        setDeptNameArr([]); setPositionId(""); setPosNameArr([]); setClear(true);
        setFile(""); setImagePreviewUrl(""); setEditImage(""); setSelectFile("");
        
        let obj1 = { method: 'get', url: 'api/emp_register', params: loginData }
        let response1 = await ApiRequest(obj1);
        setLoading(false)
        if(response1.flag !== false){
          let res = response1.data
          setCountry(res.country_list)
          setStates(res.state_list)
          setDepartment(res.department_list)
          setPosition(res.position_list)
          setEmployeeData({
            "employee_id": res.employee_id
          })
          setPackageInfo(res.package_list)
        }
    }
    window.scrollTo(0,0);
  }
  
  /**  excel upload end */

  return (
    <>
      <Loading start={loading} />

      <Message success={success} error={empError} error2={error2} />
      
      <Confirmation
        content={content}
        okButton={t('Ok')}
        cancelButton={t('Cancel')}
        type={type}
        show={show}
        cancel={()=>setShow(!show)}
        saveOK={()=>
          (register_value === 1) ? saveOK(btnSaveEdit) : saveExcelOK()
        }
      />
      <CRow id="emp_register">
        <CCol xs="12" md="12">
        
          {
            btnSaveEdit === "Save" &&
            <CCard className="custom-card">
              <CRow>
                  <CCardBody>
                      <CCol lg="12">
                          <CRow>
                              <CCol lg="4" md="6" sm="6" xs="12">
                                  <CFormGroup variant="custom-radio" inline>
                                      <CInputRadio custom id="normal" name="inline-radios" value={1} onChange={change_register} checked={register_value === 1}/>
                                      <CLabel variant="custom-checkbox" htmlFor="normal" className="p-top-1">{t('Normal Register')}</CLabel>
                                  </CFormGroup>
                              </CCol>
                              <CCol lg="4" md="6" sm="6" xs="12">
                                  <CFormGroup variant="custom-radio" inline>
                                      <CInputRadio custom id="super" name="inline-radios" value={2} onChange={change_register} checked={register_value === 2}/>
                                      <CLabel variant="custom-checkbox" htmlFor="super" className="p-top-1">{t('Excel Upload Register')}</CLabel>
                                  </CFormGroup>
                              </CCol>
                          </CRow>
                      </CCol>
                  </CCardBody>
              </CRow>
            </CCard>
          }
                    
          {
            // employee register data
            register_value === 1 &&
            <CCard>
              <BlockEmp dataChange={dataChange} states={states} country={country}
               department={department} position={position} click_eye={click_eye}
               AddDeptPos={AddDeptPos} generatePassword={generatePassword}
               file={file} imagePreviewUrl={imagePreviewUrl} imgError={imgError}
               deptChange={deptChange} setPositionId={setPositionId} form_data={form_data}
               deptPosition={deptPosition} employeeData={employeeData} role={role}
               handleImageChange={handleImageChange} clear={clear} t={t}
               btnSaveEdit={btnSaveEdit} selectFile={selectFile} editImage={editImage}
               changeAddress={changeAddress} area={area} clearPhoto={clearPhoto}
              />
              <BlockDepartmentPosition deptPosition={deptPosition}
               delDeptPos={delDeptPos} t={t}
              />
              
              <BlockPackage
               packageInfo={packageInfo} checkPackage={checkPackage} btnSaveEdit={btnSaveEdit}
               dataChange={dataChange} Save={SaveEmployee} t={t} loginPermission={loginPermission}
              />
            </CCard>
          }         
          
          {
            // upload file
            register_value === 2 &&
            <BlockExcelUpload excel_download={excel_download} t={t} change_file={change_file}
              clear_file={clear_file} Save={Save} ExcFileName={ExcFileName} Remove={Remove}
              remove_file={remove_file} save_excel={save_excel}
            />
          }
        </CCol>
      </CRow>
    </>
  )
}

export default withTranslation()(LegacyWelcomeClass)
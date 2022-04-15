/**
 * Common Javascript
 *
 * @author Thin Thin Nwe
 */

/**
 * Validate Email
 *
 * @param email
 * @reutrn True (valid) | False (not valid)
 */
export const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Validate Phone Number
 *
 * @param phone
 * @reutrn True (valid) | False (not valid)
 */
export const validatePhone = (phone) => {
	var re = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\ \\\/]?)?((?:\(?\d{1,}\)?[\-\ \\\/]?){0,})(?:[\-\ \\\/]?(?:#|ext\.?|extension|x)[\-\ \\\/]?(\d+))?$/g;
    return re.test(phone);
}

export const validateNRC = (nrc) => {
	var re = /^[0-9]{0,2}\/[a-zA-Z]{0,9}\([a-zA-Z]\)[0-9]{0,6}/g;
	//var re = /[0-9] | [0-9][0-9]\[A-Z]([A-Z])[0-9][0-9][0-9][0-9][0-9][0-9]/g;
    return re.test(nrc);
}

/**
 * Validate Number Only
 *
 * @param num
 * @reutrn True (valid) | False (not valid)
 */
export const validateNumberOnly = (num)=>{
	var re = /^\d+$/;
    return re.test(num);
}

export const validateURL = (url)=>{
    var re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
	return re.test(url)
}

/**
 * Validate Formart (English Character & Number Only)
 *
 * @param value
 * @reutrn True (valid) | False (not valid)
 */
 export const englishCharacterNumberOnly = (value) => {
	var engstr = /^[\r\na-zA-Z0-9-()=.'"\/\\:;& _]*$/;
	if(engstr.test(value)) {
		return true;
	}
	return false;
}

export const engcharNumberOnly = (value) => {
	var engstr = /^[A-Za-z0-9+]*$/;
	if(engstr.test(value)) {
		return true;
	}
	return false;
}

/**
 * Validation of only allow decimal or integer
 *
 * @param number
 * @reutrn true | false
 */
 export const onlyAllowDecimalInteger = (number) => {
    let isValid = new RegExp(/^[0-9]+([.][0-9]+)?$/);
    if (isValid.test(number)) {
        return true;
    }
    return false;
}

/**
 * Validate Formart (English Character & Number & allow hyphen and underscore)
 *
 * @param value
 * @reutrn True (valid) | False (not valid)
 */
 export const engCharNumHyphenScore = (value) => {
    var engstr = /^[a-zA-Z0-9-_\s]*$/;///^[a-zA-Z0-9-_]*$/;
    if(engstr.test(value)) {
        return true;
    }
    return false;
}

/**
 * Validate Formart (English Character & Number & allow underscore)
 *
 * @param value
 * @reutrn True (valid) | False (not valid)
 */
 export const engCharNumUnderscore = (value) => {
    var engstr = /^[a-zA-Z0-9_]*$/;///^[a-zA-Z0-9_]*$/;
    if(engstr.test(value)) {
        return true;
    }
    return false;
}

/**
 * Validate Singal Byte Character
 *
 * @param string
 * @reutrn True (valid) | False (not valid)
 */
 export function isHan(str){
    for (var i=0; i<str.length; i++) {
        var len=escape(str.charAt(i)).length;
        if (len<4){
        }else{
            return false;
        }
    }
    return true;
}

export const validatePwd = (pwd) => {
    // const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,1000}$/;
    const reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^~])([a-zA-Z0-9@$!%*#?&^~]{8,1000})$/;
    if(reg.test(pwd)) {
        return true;
    }else{
        return false;
    }
}

/**
 * Dynamic Sidebar Data
 * @author Thin Thin Nwe
 * @create 1/6/2021
 * @param data
 * @return data
*/
export const sidebarNav = (data, customer_name) => {

    let route = "";
    let to ="";
    let count = data.length;
    for(let i=0; i<count; i++) {
        let pkg_name = data[i].pkg_name;
        if(data[i].name !== "Dashboard" && data[i].name !== "Logout" &&
         data[i].name !== "Page 404" && data[i].name !== "Page 500"  && data[i].name !== "Page 403" && 
         data[i].name !== "No Permission Package" &&
         data[i].name !== pkg_name) {
            route = data[i].route;
            data[i]._tag = 'CSidebarNavItem';
            data[i].to = '/';
            if(data[i].hasOwnProperty('_children')) {
                let child_count = data[i]['_children'].length;
                for(let j=0; j<child_count; j++) {
                    route = `/${customer_name}/erp${data[i].route}`;
                    data[i]['_children'][j]._tag = 'CSidebarNavItem';
                    to = data[i]['_children'][j].to;
                    data[i]['_children'][j].to = route+to;
                }
            }
        }
    }    
    return data
}

/**
 * Fill address in Company Address Text Box
 * @author Thin Thin Nwe
 * @create 18/6/2021
 * @param
 * @return address
*/
export const companyAddress = () => {
    let address = ""
    let targetValue = ""

    if(document.getElementById("house").value !== "")
      address = document.getElementById("house").value
      
    if(document.getElementById("company-streetward").value !== "") {
      targetValue = document.getElementById("company-streetward").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }
    
    if(document.getElementById("company-division").value !== '0') {
      targetValue = document.getElementById("company-division").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }

    if(document.getElementById("company-township").value !== "") {
      targetValue = document.getElementById("company-township").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }
    
    if(document.getElementById("company-country").value !== '0') {
      targetValue = document.getElementById("company-country").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }

    if(document.getElementById("company-city").value !== "") {
      targetValue = document.getElementById("company-city").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }
    
    return address
}

/**
 * Fill address in Contact Person Address Text Box
 * @author Thin Thin Nwe
 * @create 18/6/2021
 * @param
 * @return address
*/
export const contactAddress = () => {
  
    let address = ""
    let targetValue = ""

    if(document.getElementById("contact-house").value !== "")
      address = document.getElementById("contact-house").value
      
    if(document.getElementById("contact-streetward").value !== "") {
      targetValue = document.getElementById("contact-streetward").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }
    
    if(document.getElementById("division").value !== '0') {
      targetValue = document.getElementById("division").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }

    if(document.getElementById("contact-township").value !== "") {
      targetValue = document.getElementById("contact-township").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }
    
    if(document.getElementById("country").value !== '0') {
      targetValue = document.getElementById("country").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    }

    if(document.getElementById("city").value !== "") {
      targetValue = document.getElementById("city").value
      if(address !== "") address = address + ', ' + targetValue
      else address = targetValue
    } 

    return address
  }
  
  /**
 * Test empty
 * @param value
 * @reutrn boolean
 * @date 2021-08-19
 */
 export const isEmpty = (val) =>{
  return (val === undefined || val == null || val.length <= 0 || val == 'null') ? true : false;
}
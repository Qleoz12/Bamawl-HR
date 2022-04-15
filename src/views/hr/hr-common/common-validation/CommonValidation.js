// /**
//  * Common Javascript
//  *
//  * @author
//  */

// const SYSTEM_URL= "/wms/";

// /**
//  * Validate Email
//  *
//  * @param email
//  * @reutrn True (valid) | False (not valid)
//  */
// export const validateEmail = (email) => {
//     var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
// }

// /**
//  * Validate Phone Number
//  *
//  * @param phone
//  * @reutrn True (valid) | False (not valid)
//  */
// export const validatePhone = (phone) => {
// 	var re = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\ \\\/]?)?((?:\(?\d{1,}\)?[\-\ \\\/]?){0,})(?:[\-\ \\\/]?(?:#|ext\.?|extension|x)[\-\ \\\/]?(\d+))?$/g;
//     return re.test(phone);
// }

// function validateNRC(nrc) {
// 	var re = /^[0-9]{0,2}\/[a-zA-Z]{0,9}\([a-zA-Z]\)[0-9]{0,6}/g;
// 	//var re = /[0-9] | [0-9][0-9]\[A-Z]([A-Z])[0-9][0-9][0-9][0-9][0-9][0-9]/g;
//     return re.test(nrc);
// }

// /**
//  * Validate Number Only
//  *
//  * @param num
//  * @reutrn True (valid) | False (not valid)
//  */
// export const validateNumberOnly = (num)=>{
// 	var re = /^\d+$/;
//     return re.test(num);
// }


// /**
//  * Validate Integer Only
//  *
//  * @param num
//  * @reutrn True (valid) | False (not valid)
//  */
//  export const validateIntegerOnly = (num)=>{
// 	var re = /^[0-9\b]+$/;
//     return re.test(num);
// }

// export const validateIntegerOnlyT = (num)=>{
// 	var re = /^(\s*|\d+)$/;
//     return re.test(num);
// }

// /**
//  * Validate Special Character Only
//  *
//  * @param character
//  * @reutrn True (valid) | False (not valid)
//  */
//  export const validateSpecialCharacterOnly = (character)=>{
//     var format = /[\\[\]'"\|?]+/;    
//     if(format.test(character)){
//         return true;
//       } else {
//         return false;
//       }
// }

// export const validateSpecialCharacterT = (character)=>{
//     var format = /^[a-zA-Z0-9]+$/u;    
//     if(format.test(character)){
//         return true;
//       } else {
//         return false;
//       }
// }

// /**
//  * Validate Number Only
//  *
//  * @param num
//  * @reutrn True (valid) | False (not valid)
//  */
// export function validateNumberOnlyT(num){
// 	var isValid = /^[-+]?\d+$/;
//     if (isValid.test(num)) {
//         return true;
//     }
//     return false;
// }

// /**
//  * Check Number Between Two Value
//  *
//  * @param number, check value1, check value2
//  * @reutrn True (valid) | False (not valid)
//  */
// export const isBetween = (n, a, b) => {
// 	return (n - a) * (n - b) <= 0
// }

// /**
//  * Check null or blank
//  *
//  * @param num
//  * @reutrn True (has value) | False (null or blank)
//  */
// export function checkNullOrBlank(value) {
// 	if (value == '' || value == null) {
// 		return false;
// 	}
//     return true;
// }

// export function checkNullOrBlankString(value) {
//     if (value == null)
//         return false;
//     else {
//         value = value.toString()
//         if (value === '') {
//             return false;
//         }
//     }
//     return true;
// }


// export function checkNullOrBlankRadio(value) {
// 	if (value == null) {
// 		return false;
//     }
//     return true;
// }
// /**
//  * Left Padding
//  *
//  * @param original string
//  * @param count of padding
//  * @param padding character (default '0')
//  * @reutrn padding string
//  */
// export const paddy = (n, p, c) => {
//     var pad_char = typeof c !== 'undefined' ? c : '0';
//     var pad = new Array(1 + p).join(pad_char);
//     return (pad + n).slice(-pad.length);
// }

// /**
//  * Validate Singal Byte Character
//  *
//  * @param string
//  * @reutrn True (valid) | False (not valid)
//  */
// export function isHan(str){
//     for (var i=0; i<str.length; i++) {
//         var len=escape(str.charAt(i)).length;
//         if (len<4){
//         }else{
//             return false;
//         }
//     }
//     return true;
// }

// /**
//  * Validate Singal Byte Alpha Character
//  *
//  * @param Html Object
//  * @reutrn True (valid) | False (not valid)
//  */
// export const isHanAlpha = (obj) => {
//     var str=obj.value;
//     for(var i=0 ; i<str.length; i++){
//         var code=str.charCodeAt(i);
//         if ((65<=code && code<=90) || (97<=code && code<=122) ||
//              str.substr(i,1)==' ') {

//         }else{
//             return false;
//         }
//     }
//     return true;
// }

// /**
//  * Validate Formart (15 Digit and 2 Decimal Point)
//  *
//  * @param value
//  * @reutrn True (valid) | False (not valid)
//  */
// export const isDecimal = (value) => {
// 	var decimalOnly = /^\s*-?(\d{1,15})(\.\d{0,})?\s*$/;
// 	if(decimalOnly.test(value)) {
// 		return true;
// 	}
// 	return false;
// }

// /**
//  * Validate Decimal Formart
//  * @author PhyoNaing Htun
//  * @param value
//  * @reutrn True (valid) | False (not valid)
//  */
// export function validateDecimal(value){
// 	var decimalOnly = /^(\+|-)?(\d*\.?\d*)$/;
// 	if(decimalOnly.test(value)) {
// 		return true;
// 	}
// 	return false;
// }

// /**
//  * Validate Formart (12 Digit and 3 Decimal Point)
//  * @author PhyoNaing Htun
//  * @param value
//  * @reutrn True (valid) | False (invalid)
//  */
// export function checkDecimal(value){
// 	var decimalOnly = /^\s*-?(\d{1,9})(\.\d{0,3})?\s*$/;
// 	if(decimalOnly.test(value)) {
// 		return true;
// 	}
// 	return false;
// }

// /**
//  * Validate Formart (8 Digit and 2 Decimal Point)
//  *
//  * @param value
//  * @reutrn True (valid) | False (not valid)
//  */
// export const is2Decimal = (value) => {
// 	var decimalOnly =/^\s*-?(\d{1,9})(\.\d{0,2})?\s*$/;
// 	if(decimalOnly.test(value)) {
// 		return true;
// 	}
// 	return false;
// }
// /**
//  * Validate Formart (6 Digit and 3 Decimal Point)
//  * Myat Thiri Swe
//  * @param value
//  * @reutrn True (valid) | False (not valid)
//  */
// export const is3Decimal = (value)=>{
//     var decimalOnly =/^\s*-?(\d{1,6})(\.\d{0,3})?\s*$/;
//     if(decimalOnly.test(value)) {
//         return true;
//     }
//     return false;
// }
// /**
//  * Validate Formart (English Number with Decimal Number Only)
//  * Myat Thiri Swe
//  * @param value
//  * @reutrn True (valid) | False (not valid)
//  */
// export const isdigit = (value) => {
//     var digit =/^0$|^[0-9]\d*$|^\.\d+$|^0\.\d*$|^[0-9]\d*\.\d*$/;
//     if(digit.test(value)) {
//         return true;
//     }
//     return false;
// }
// /**
//  * Validate Formart (English Character & Number Only)
//  *
//  * @param value
//  * @reutrn True (valid) | False (not valid)
//  */
// export const englishCharacterNumberOnly = (value) => {
// 	var engstr = /^[\r\na-zA-Z0-9-()=.'"\/\\:;& _]*$/;
// 	if(engstr.test(value)) {
// 		return true;
// 	}
// 	return false;
// }
// export const engspecialcharsNumberOnly = (value) => {
//     var engstr = /^[\r\na-zA-Z0-9-()=.,'"\/\\:;& _]*$/;
//     if(engstr.test(value)) {
//         return true;
//     }
//     return false;
// }
// export const engcharNumberOnly = (value) => {
// 	var engstr = /^[A-Za-z0-9+]*$/;
// 	if(engstr.test(value)) {
// 		return true;
// 	}
// 	return false;
// }
// /**
//  * Validate Formart (English Character & Number & allow greek alphabat)
//  *
//  * @param value
//  * @reutrn True (valid) | False (not valid)
//  * @author Thura Moe
//  */
// export const engCharNumGreek = (value) => {
//     var engstr = /^[a-zA-Z0-9-().'"/:;=_α-ωΑ-ΩØ ]*$/;///^[a-zA-Z0-9_ -().'"/:;]*$/;
//     if(engstr.test(value)) {
//         return true;
//     }
//     return false;
// }

// /**
//  * Validate Formart (English Character & Number & allow hyphen)
//  *
//  * @param value
//  * @reutrn True (valid) | False (not valid)
//  * @author Nu Nu Lwin
//  */
// export const engCharNumHyphen = (value) => {
//     var engstr = /^[a-zA-Z0-9-]*$/;///^[a-zA-Z0-9_]*$/;
//     if(engstr.test(value)) {
//         return true;
//     }
//     return false;
// }
// /**
//  * Validate Formart (Number & hyphen)
//  *
//  * @param value
//  * @reutrn True (valid) | False (not valid)
//  * @author Khin Nyein Chan Thu
//  */
// export const numberHypen = (num) => {
//     var engNum = /^[0-9-]*$/;///^[a-zA-Z0-9_]*$/;
//     return engNum.test(num);
// }

// /**
//  * Validate Formart (Fax)
//  *
//  * @Poe Ei Ei Naing
//  * @reutrn True (valid) | False (not valid)
//  */
// export const validateFax = (value) => {
//     var engstr = /[\+? *[1-9]+]?[0-9 ]+/;
//     if(engstr.test(value)) {
//         return true;
//     }
//     return false;
// }

// /**
//  * Change Number format with commas
//  *
//  * @param value
//  * @reutrn string with commas
//  */
// export const numberWithCommas = (x) => {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// /**
//  * Change Number format without commas
//  *
//  * @param value
//  * @reutrn string without commas
//  */
// export const removeCommas = (str) => {
//     return(str.replace(/,/g,''));
// }

// /**
//  * Round Method
//  *
//  * @param value
//  * @param decimal ponit (default '0')
//  * @reutrn rounded value
//  */
// export const round = (value, decimals) => {
//     return parseFloat(Math.round(value+'e'+decimals)+'e-'+decimals);
// }

// /**
//  * Check max length
//  *
//  * @param num
//  * @reutrn True (has value) | False (length exceed)
//  */
// export const checkMaxLength = (value,num) => {
// 	if (value.length > num) {
// 		return false;
// 	}
//     return true;
// }
// /**
//  * Validate Formart (English Character)
//  *
//  * @param value
//  * @reutrn True (valid) | False (not valid)
//  */
// export const englishCharacterOnly = (value) => {
// 	var engstr = /^[a-zA-Z-_ ]+$/;
// 	if(engstr.test(value)) {
// 		return true;
// 	}
// 	return false;
// }
// /**
//  * Validation white space
//  *
//  * @param value
//  * @reutrn
//  */
// export const validationWhiteSpace = (value) =>{
//     let reWhiteSpace = new RegExp(/^\s+$/);
//      // Check for white space
//     if (reWhiteSpace.test(value)) {
//       return false;
//     }
//     return true;
// }


// /**
//  * Validation Date Format
//  *
//  * @author Thura Moe (10/31/2018)
//  * @param date
//  * @reutrn true | false
//  */
// export const validDateFormat = (date) => {
//     let isValid = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
//     if (isValid.test(date)) {
//       return true;
//     }
//     return false;
// }

// /**
//  * Validation of only allow decimal or integer
//  *
//  * @author Thura Moe (10/31/2018)
//  * @param number
//  * @reutrn true | false
//  */
// export const onlyAllowDecimalInteger = (number) => {
//     let isValid = new RegExp(/^[0-9]+([.][0-9]+)?$/);
//     if (isValid.test(number)) {
//         return true;
//     }
//     return false;
// }

// /**
//  * Validation of only allow 2 decimal place
//  *
//  * @author Thura Moe (11/05/2018)
//  * @param number
//  * @reutrn true | false
//  */
// export const onlyAllow2DecimalPlace = (number) => {
//     let isValid = new RegExp(/^\d{1,}(.\d{1,2})?$/);
//     if (isValid.test(number)) {
//         return true;
//     }
//     return false;
// }

// export const onlyAllow3DecimalPlace = (number) => {
//     let isValid = new RegExp(/^\d{1,}(.\d{1,3})?$/);
//     if (isValid.test(number)) {
//         return true;
//     }
//     return false;
// }

// /**
//  * Not accept characters for all input
//  *
//  * @author Thura Moe (11/05/2018)
//  * @param  user input string
//  * @reutrn true | false
//  */
// export const notAcceptCharacter = (user_input) => {
//     let isFound = new RegExp(/[!#^&_\[\]{}<>?]/);
//     if (isFound.test(user_input)) {
//         return true;
//     }
//     return false;
// }


// /**
//  * Validate Formart For Item Name
//  *
//  * @param value
//  * @reutrn True (valid) | False (not valid)
//  * @author Zayar Phone Naing
//  */
// export const ItemNameInputCheck = (value) => {
//     var input = /^[a-zA-Z0-9-().,|*&^%$#@?!\/\'":+=_α-ωΑ-ΩΦφπⅡ ]*$/;
//     if(input.test(value)) {
//         return true;
//     }
//     return false;
// }
// /**
//  * Get decimal 3 place and return number ceiling
//  * For example return number is 3.5354 result is 3.535, return number is 6.1105 result is 6.111
//  *
//  * @param value
//  * @reutrn decimal 3 place
//  * @author Khin Nyein Chan Thu
//  * @date 2020-08-27
//  */
// export const roundUp = (num) => {
//     return Number.parseFloat(num).toFixed(3);
// }

// /**
//  * to get current first day and last day
//  *
//  * @param value
//  * @reutrn year month day
//  * @author Zin Min Myat
//  * @date 2020-11-16
//  */
// export const formatDate =() =>{
//         let date        = new Date();
//         let d = new Date(new Date(date.getFullYear(), date.getMonth(), 1)),
//         month1 = '' + (d.getMonth() + 1),
//         day1 = '' + d.getDate(),
//         year1 = d.getFullYear();

//         let D = new Date(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
//         month2 = '' + (D.getMonth() + 1),
//         day2 = '' + D.getDate(),
//         year2 = D.getFullYear();

//     if (month1.length < 2)
//         month1 = '0' + month1;
//     if (day1.length < 2)
//         day1 = '0' + day1;

//     if (month2.length < 2)
//         month2 = '0' + month2;
//     if (day2.length < 2)
//         day2 = '0' + day2;

//     let from_date = [year1, month1, day1].join('-');
//     let to_date = [year2, month2, day2].join('-');
//     let obj = {from_date,to_date };
//     return  obj ;
// }

// /**
//  * to get current date
//  *
//  * @param value
//  * @reutrn year month day
//  * @author Zin Min Myat
//  * @date 2021-01-21
//  */
// export const currentDate =() =>{
//     let date        = new Date(),
//     month1 = '' + (date.getMonth() + 1),
//     day1 = '' + date.getDate(),
//     year1 = date.getFullYear();

// if (month1.length < 2)
//     month1 = '0' + month1;
// if (day1.length < 2)
//     day1 = '0' + day1;

// let current_date = [year1, month1, day1].join('-');
// return  current_date ;
// }

// /**
//  * Test empty or not
//  *
//  * @param value
//  * @reutrn boolean
//  * @author Aye Thiri Mon
//  * @date 2021-02-10
//  */
// export const isEmpty = (val) =>{
//     return (val === undefined || val == null || val.length <= 0) ? true : false;
//   }
  
// /**
//  * Validate input value is 1 or 0
//  *
//  * @param value
//  * @reutrn boolean
//  * @author Aye Thiri Mon
//  * @date 2021-03-18
//  */
//  export const ValidateNumberZeroOrOne = (val) => {
//     if(val < 0 || val > 1)
//     {
//     return true;
//     }
// }

// /**
//  * To replace with original greaterThanHundred function from Aye Thiri Mon
//  *
//  * @param
//  * @reutrn
//  * @author Sample
//  * @date 2021-03-18
//  */
//  export const greaterThanHundred = (val) => {
//     if(val < 0 || val > 1)
//     {
//     return true;
//     }
// }
/**
 * Common Javascript
 *
 * @author
 */

 const SYSTEM_URL= "/wms/";

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
 
 function validateNRC(nrc) {
     var re = /^[0-9]{0,2}\/[a-zA-Z]{0,9}\([a-zA-Z]\)[0-9]{0,6}/g;
     //var re = /[0-9] | [0-9][0-9]\[A-Z]([A-Z])[0-9][0-9][0-9][0-9][0-9][0-9]/g;
     return re.test(nrc);
 }
 
 /**
  * Validate Integer Only
  *
  * @param num
  * @reutrn True (valid) | False (not valid)
  */
  export const validateIntegerOnly = (num)=>{
     var re = /^[0-9\b]+$/;
     return re.test(num);
 }
 
 export const validateIntegerOnlyT = (num)=>{
     var re = /^(\s*|\d+)$/;
     return re.test(num);
 }
 
 /**
  * Validate Special Character Only
  *
  * @param character
  * @reutrn True (valid) | False (not valid)
  */
  export const validateSpecialCharacterOnly = (character)=>{
     var format = /[\\[\]'"\|?]+/;    
     if(format.test(character)){
         return true;
       } else {
         return false;
       }
 }
 
 export const validateSpecialCharacterT = (character)=>{
     var format = /^[a-zA-Z0-9]+$/u;    
     if(format.test(character)){
         return true;
       } else {
         return false;
       }
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
 
 /**
  * Validate Number Only
  *
  * @param num
  * @reutrn True (valid) | False (not valid)
  */
 export function validateNumberOnlyT(num){
     var isValid = /^[-+]?\d+$/;
     if (isValid.test(num)) {
         return true;
     }
     return false;
 }
 
 /**
  * Check Number Between Two Value
  *
  * @param number, check value1, check value2
  * @reutrn True (valid) | False (not valid)
  */
 export const isBetween = (n, a, b) => {
     return (n - a) * (n - b) <= 0
 }
 
 /**
  * Check null or blank
  *
  * @param num
  * @reutrn True (has value) | False (null or blank)
  */
 export function checkNullOrBlank(value) {
     if (value == '' || value == null) {
         return false;
     }
     return true;
 }
 
 export function checkNullOrBlankString(value) {
     if (value == null)
         return false;
     else {
         value = value.toString()
         if (value === '') {
             return false;
         }
     }
     return true;
 }
 
 
 export function checkNullOrBlankRadio(value) {
     if (value == null) {
         return false;
     }
     return true;
 }
 
 /**
  * Left Padding
  *
  * @param original string
  * @param count of padding
  * @param padding character (default '0')
  * @reutrn padding string
  */
 export const paddy = (n, p, c) => {
     var pad_char = typeof c !== 'undefined' ? c : '0';
     var pad = new Array(1 + p).join(pad_char);
     return (pad + n).slice(-pad.length);
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
 
 /**
  * Validate Singal Byte Alpha Character
  *
  * @param Html Object
  * @reutrn True (valid) | False (not valid)
  */
 export const isHanAlpha = (obj) => {
     var str=obj.value;
     for(var i=0 ; i<str.length; i++){
         var code=str.charCodeAt(i);
         if ((65<=code && code<=90) || (97<=code && code<=122) ||
              str.substr(i,1)==' ') {
 
         }else{
             return false;
         }
     }
     return true;
 }
 
 /**
  * Validate Formart (15 Digit and 2 Decimal Point)
  *
  * @param value
  * @reutrn True (valid) | False (not valid)
  */
 export const isDecimal = (value) => {
     var decimalOnly = /^\s*-?(\d{1,15})(\.\d{0,})?\s*$/;
     if(decimalOnly.test(value)) {
         return true;
     }
     return false;
 }
 
 /**
  * Validate Decimal Formart
  * @author PhyoNaing Htun
  * @param value
  * @reutrn True (valid) | False (not valid)
  */
 export function validateDecimal(value){
     var decimalOnly = /^(\+|-)?(\d*\.?\d*)$/;
     if(decimalOnly.test(value)) {
         return true;
     }
     return false;
 }
 
 /**
  * Validate Formart (12 Digit and 3 Decimal Point)
  * @author PhyoNaing Htun
  * @param value
  * @reutrn True (valid) | False (invalid)
  */
 export function checkDecimal(value){
     var decimalOnly = /^\s*-?(\d{1,9})(\.\d{0,3})?\s*$/;
     if(decimalOnly.test(value)) {
         return true;
     }
     return false;
 }
 
 /**
  * Validate Formart (8 Digit and 2 Decimal Point)
  *
  * @param value
  * @reutrn True (valid) | False (not valid)
  */
 export const is2Decimal = (value) => {
     var decimalOnly =/^\s*-?(\d{1,9})(\.\d{0,2})?\s*$/;
     if(decimalOnly.test(value)) {
         return true;
     }
     return false;
 }
 /**
  * Validate Formart (8 Digit and 1 Decimal Point)
  *
  * @param value
  * @reutrn True (valid) | False (not valid)
  */
  export const is1Decimal = (value) => {
    var decimalOnly =/^\s*-?(\d{1,9})(\.\d{0,1})?\s*$/;
    if(decimalOnly.test(value)) {
        return true;
    }
    return false;
}
 /**
  * Validate Formart (6 Digit and 3 Decimal Point)
  * Myat Thiri Swe
  * @param value
  * @reutrn True (valid) | False (not valid)
  */
 export const is3Decimal = (value)=>{
     var decimalOnly =/^\s*-?(\d{1,6})(\.\d{0,3})?\s*$/;
     if(decimalOnly.test(value)) {
         return true;
     }
     return false;
 }
 /**
  * Validate Formart (English Number with Decimal Number Only)
  * Myat Thiri Swe
  * @param value
  * @reutrn True (valid) | False (not valid)
  */
 export const isdigit = (value) => {
     var digit =/^0$|^[0-9]\d*$|^\.\d+$|^0\.\d*$|^[0-9]\d*\.\d*$/;
     if(digit.test(value)) {
         return true;
     }
     return false;
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
 export const engspecialcharsNumberOnly = (value) => {
     var engstr = /^[\r\na-zA-Z0-9-()=.,'"\/\\:;& _]*$/;
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
  * Validate Formart (English Character & Number & allow greek alphabat)
  *
  * @param value
  * @reutrn True (valid) | False (not valid)
  * @author Thura Moe
  */
 export const engCharNumGreek = (value) => {
     var engstr = /^[a-zA-Z0-9-().'"/:;=_α-ωΑ-ΩØ ]*$/;///^[a-zA-Z0-9_ -().'"/:;]*$/;
     if(engstr.test(value)) {
         return true;
     }
     return false;
 }
 
 /**
  * Validate Formart (English Character & Number & allow hyphen)
  *
  * @param value
  * @reutrn True (valid) | False (not valid)
  * @author Nu Nu Lwin
  */
 export const engCharNumHyphen = (value) => {
     var engstr = /^[a-zA-Z0-9-]*$/;///^[a-zA-Z0-9_]*$/;
     if(engstr.test(value)) {
         return true;
     }
     return false;
 }
 /**
  * Validate Formart (Number & hyphen)
  *
  * @param value
  * @reutrn True (valid) | False (not valid)
  * @author Khin Nyein Chan Thu
  */
 export const numberHypen = (num) => {
     var engNum = /^[0-9-]*$/;///^[a-zA-Z0-9_]*$/;
     return engNum.test(num);
 }
 
 /**
  * Validate Formart (Fax)
  *
  * @Poe Ei Ei Naing
  * @reutrn True (valid) | False (not valid)
  */
 export const validateFax = (value) => {
     var engstr = /[\+? *[1-9]+]?[0-9 ]+/;
     if(engstr.test(value)) {
         return true;
     }
     return false;
 }
 
 /**
  * Change Number format with commas
  *
  * @param value
  * @reutrn string with commas
  */
 export const numberWithCommas = (x) => {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }
 
 /**
  * Change Number format without commas
  *
  * @param value
  * @reutrn string without commas
  */
 export const removeCommas = (str) => {
     return(str.replace(/,/g,''));
 }
 
 /**
  * Round Method
  *
  * @param value
  * @param decimal ponit (default '0')
  * @reutrn rounded value
  */
 export const round = (value, decimals) => {
     return parseFloat(Math.round(value+'e'+decimals)+'e-'+decimals);
 }
 
 /**
  * Check max length
  *
  * @param num
  * @reutrn True (has value) | False (length exceed)
  */
 export const checkMaxLength = (value,num) => {
     if (value.length > num) {
         return false;
     }
     return true;
 }
 /**
  * Validate Formart (English Character)
  *
  * @param value
  * @reutrn True (valid) | False (not valid)
  */
 export const englishCharacterOnly = (value) => {
     var engstr = /^[a-zA-Z-_ ]+$/;
     if(engstr.test(value)) {
         return true;
     }
     return false;
 }
 /**
  * Validation white space
  *
  * @param value
  * @reutrn
  */
 export const validationWhiteSpace = (value) =>{
     let reWhiteSpace = new RegExp(/^\s+$/);
      // Check for white space
     if (reWhiteSpace.test(value)) {
       return false;
     }
     return true;
 }
 
 
 /**
  * Validation Date Format
  *
  * @author Thura Moe (10/31/2018)
  * @param date
  * @reutrn true | false
  */
 export const validDateFormat = (date) => {
     let isValid = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
     if (isValid.test(date)) {
       return true;
     }
     return false;
 }
 
 /**
  * Validation of only allow decimal or integer
  *
  * @author Thura Moe (10/31/2018)
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
  * Validation of only allow 2 decimal place
  *
  * @author Thura Moe (11/05/2018)
  * @param number
  * @reutrn true | false
  */
 export const onlyAllow2DecimalPlace = (number) => {
     let isValid = new RegExp(/^\d{1,}(.\d{1,2})?$/);
     if (isValid.test(number)) {
         return true;
     }
     return false;
 }
 
 export const onlyAllow3DecimalPlace = (number) => {
     let isValid = new RegExp(/^\d{1,}(.\d{1,3})?$/);
     if (isValid.test(number)) {
         return true;
     }
     return false;
 }
 
 /**
  * Not accept characters for all input
  *
  * @author Thura Moe (11/05/2018)
  * @param  user input string
  * @reutrn true | false
  */
 export const notAcceptCharacter = (user_input) => {
     let isFound = new RegExp(/[!#^&_\[\]{}<>?]/);
     if (isFound.test(user_input)) {
         return true;
     }
     return false;
 }
 
 
 /**
  * Validate Formart For Item Name
  *
  * @param value
  * @reutrn True (valid) | False (not valid)
  * @author Zayar Phone Naing
  */
 export const ItemNameInputCheck = (value) => {
     var input = /^[a-zA-Z0-9-().,|*&^%$#@?!\/\'":+=_α-ωΑ-ΩΦφπⅡ ]*$/;
     if(input.test(value)) {
         return true;
     }
     return false;
 }
 /**
  * Get decimal 3 place and return number ceiling
  * For example return number is 3.5354 result is 3.535, return number is 6.1105 result is 6.111
  *
  * @param value
  * @reutrn decimal 3 place
  * @author Khin Nyein Chan Thu
  * @date 2020-08-27
  */
 export const roundUp = (num) => {
     return Number.parseFloat(num).toFixed(3);
 }
 
 /**
  * to get current first day and last day
  *
  * @param value
  * @reutrn year month day
  * @author Zin Min Myat
  * @date 2020-11-16
  */
 export const formatDate =() =>{
         let date        = new Date();
         let d = new Date(new Date(date.getFullYear(), date.getMonth(), 1)),
         month1 = '' + (d.getMonth() + 1),
         day1 = '' + d.getDate(),
         year1 = d.getFullYear();
 
         let D = new Date(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
         month2 = '' + (D.getMonth() + 1),
         day2 = '' + D.getDate(),
         year2 = D.getFullYear();
 
     if (month1.length < 2)
         month1 = '0' + month1;
     if (day1.length < 2)
         day1 = '0' + day1;
 
     if (month2.length < 2)
         month2 = '0' + month2;
     if (day2.length < 2)
         day2 = '0' + day2;
 
     let from_date = [year1, month1, day1].join('-');
     let to_date = [year2, month2, day2].join('-');
     let obj = {from_date,to_date };
     return  obj ;
 }
 
 /**
  * to get current date
  *
  * @param value
  * @reutrn year month day
  * @author Zin Min Myat
  * @date 2021-01-21
  */
 export const currentDate =() =>{
     let date        = new Date(),
     month1 = '' + (date.getMonth() + 1),
     day1 = '' + date.getDate(),
     year1 = date.getFullYear();
 
 if (month1.length < 2)
     month1 = '0' + month1;
 if (day1.length < 2)
     day1 = '0' + day1;
 
 let current_date = [year1, month1, day1].join('-');
 return  current_date ;
 }
 
 /**
  * Test empty or not
  *
  * @param value
  * @reutrn boolean
  * @author Aye Thiri Mon
  * @date 2021-02-10
  */
 export const isEmpty = (val) =>{
     return (val === undefined || val == null || val.length <= 0) ? true : false;
 }
 /**
  * Validate input value is 1 or 0
  *
  * @param value
  * @reutrn boolean
  * @author Aye Thiri Mon
  * @date 2021-03-18
  */
  export const ValidateNumberZeroOrOne = (val) => {
     if(val < 0 || val > 1)
     {
     return true;
     }
 }
 
 /**
  * To replace with original greaterThanHundred function from Aye Thiri Mon
  *
  * @param
  * @reutrn
  * @author 
  * @date 2021-03-18
  */
 export const greaterThanHundred = (val) => {
     if(val.length < 100){
         return true;
     }else{
         return false;
     }
 }
 
 /**
  * to get current month
  *
  * @param value
  * @reutrn year month 
  * @author Zin Min Myat
  * @date 2021-07-16
  */
  export const currentMonth =() =>{
     let date        = new Date(),
     month1 = '' + (date.getMonth() + 1),
     day1 = '' + date.getDate(),
     year1 = date.getFullYear();
 
 if (month1.length < 2)
     month1 = '0' + month1;
 
 let current_month = [year1, month1].join('-');
 return  current_month ;
 }
 
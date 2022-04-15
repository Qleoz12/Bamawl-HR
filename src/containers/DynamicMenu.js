import {reactLocalStorage} from 'reactjs-localstorage';
import { ApiRequest } from '../views/brycen-common/api-request/RequestApi';
let company_id = reactLocalStorage.get('COMPANY_ID');
let login_id = reactLocalStorage.get('LOGIN_ID');
let admin_level_id = reactLocalStorage.get('ADMIN_LEVEL_ID');

let customer_name = window.location.href.split("/")[3];
if (customer_name === ""){
    customer_name = 'demo';
}

const DynamicMenu = async() => {
    let obj = { method: 'get', url: 'api/get-menu-list', 
    params:{
        "login_id" : login_id,
        "company_id": company_id,
        "expense_flag":true
        } 
    }
    let response = await ApiRequest(obj);
    if(response.flag === false){
        return [];
    }else{
        let status = response.data.status;
        if(status == "NG"){
            return [];
        }else{
            let data = response.data.menus;
            let route = "";
            let to ="";
            data = data.filter((menu) => {
                let flagSetMenu = [];
                if(menu.hasOwnProperty('_children')) {
                    flagSetMenu = menu._children.filter((child) => {
                        return child.menu_flag == "true";
                    });

                    menu._children = [...flagSetMenu];

                    return menu;
                } else {
                    if(menu.menu_flag == "true"){
                        return menu;
                    }
                    
                }
            });
            let count = data.length;
            for(let i=0; i<count; i++) {
                if(data[i].name != "Dashboard" && data[i].name != "Logout" && data[i].name != "ERP"){
                // if(data[i].name != "Logout"){
                    route = data[i].route;
                    data[i]._tag = 'CSidebarNavDropdown';
                    data[i].className = 'setting';
                    data[i].to = '/';
                    if(data[i].hasOwnProperty('_children')) {
                        let child_count = data[i]['_children'].length;
                        for(let j=0; j<child_count; j++) {
                            data[i]['_children'][j]._tag = 'CSidebarNavItem';
                            to = '/'+customer_name+'/hr'+data[i]['_children'][j].to;
                            // data[i]['_children'][j].to = route+to;
                            data[i]['_children'][j].to = to;
                        }
                    }
                }
            } 
            return data;
        }
    }
}
export default DynamicMenu
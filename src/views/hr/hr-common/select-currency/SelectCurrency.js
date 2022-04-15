/**
 *
 * @author Nay Zaw Linn
 * @date 2021-04-28
 * @param {
 *          temp: selected currency id from API response(currency_id should be included in object).
 *              eg - [
 *                      {id: 1, company_id: 2, bank_id: 1, currency_id: 1, deleted_at: null},
 *                      {id: 2, company_id: 2, bank_id: 1, currency_id: 2, deleted_at: null}
 *                   ]
 *          currency: currency array from API response.
 *              eg - [
 *                      {id : 1, currency_name: "Kyat", currency_desc: "MMK", "main_flag": 1},
 *                      {id : 2, currency_name: "Dollor", currency_desc: "USD","main_flag": 1}
 *                   ]
 *        }
 *
 * @return  tempID, tempArray
 *
 *          eg. tempID: [1,2,3]
 *          eg. tempArray: [
 *                  {id : 1, currency_name: "Kyat", currency_desc: "MMK", "main_flag": 1, "is_checked": true},
 *                  {id : 2, currency_name: "Dollor", currency_desc: "USD", "main_flag": 1, "is_checked": false}
 *              ]
 *
 */
export const SelectCurrency = ( temp, currency ) => {
    let result, tempArray = [], tempID = [], tempIndex = [], arr = [];

    for (let i = 0; i < currency.length; i++) {
        if( i === 0 ){
            temp.forEach((item, i) => {
                arr.push(item.currency_id);
            });
        }
        result = arr.find( e => e === currency[i].id );
        if(typeof(result) === 'number'){
            tempArray.push({ ...currency[i], is_checked: true });
            tempID.push(currency[i].id);
        }else{
            tempArray.push({ ...currency[i], is_checked: false });
        }
    }
    return { tempID, tempArray }
}

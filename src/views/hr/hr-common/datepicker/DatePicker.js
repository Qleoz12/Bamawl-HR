import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';

const DatePicker = props => {
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                id={props.id ? props.id : "date-picker-dialog"}
                className="date-css"
                disabled={props.disabled} // disabled from/to date
                // format="yyyy-MM-dd"
                value={props.value}
                onChange={props.change}
                // cancelLabel={false}
                // okLabel={false}
                // autoOk={true}
                clearable={true}
                minDate={props.fromDate !== null && props.fromDate}
                InputProps={{ readOnly: true }}
                format={props.format === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd'}
                views={props.format === 'month' ? ["year", "month"] : ["year", "month", "date"]}
            />
        </MuiPickersUtilsProvider>
    )
}

export default DatePicker

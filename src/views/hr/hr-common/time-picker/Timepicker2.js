import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Popover from '@material-ui/core/Popover';

//component - Brycen / TimePicker v1
const commonPropTypes = {
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
    innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    valid: PropTypes.bool,
    invalid: PropTypes.bool
}

const TimePicker = props => {

    let {
        className,
        //
        innerRef,
        valid,
        invalid,
        plaintext,
        size,
        sizeHtml,
        stepMinutes,
        onChangeTime,
        value,
        disabled,
        ...attributes
    } = props

    // render
    const classes =
        classNames(
            plaintext ? 'form-control-plaintext' : 'form-control',
            size && `form-control-${size}`,
            invalid && 'is-invalid',
            valid && 'is-valid',
            className
        )

    const [hours, setHours] = useState("000");
    const [minutes, setMinutes] = useState("000");
    const [times, setTime] = useState("000:00");
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (value) {
            let timeInput = value.split(":");
            setHours(timeInput[0]);
            setMinutes(timeInput[1]);
        }
    }, [value])

    let isNumber = (e) => {
        console.log(e);
        if(!((e.keyCode > 95 && e.keyCode < 106)
          || (e.keyCode > 47 && e.keyCode < 58) 
          || e.keyCode == 8)) {
            e.preventDefault();
        }
    }

    let changeHours = (e) => {
        const hour = e.target.value;
        if(hour.length > 3){
            return;
        }
        if (Number(hour) >= 999) {
            setHours(Number(999));
            return;
        }
        setHours(hour);
    }

    let changeMinutes = (e) => {
        const minutes = e.target.value;
        if(minutes.length > 2){
            return;
        }
        if (Number(minutes) >= 60) {
            setMinutes(Number(60));
            return;
        }
        setMinutes(minutes);
    }

    function n(n) {
        return n > 9 ? "" + n : "0" + n;
    }

    function m(n) {
        return (n > 9 && n <= 99) ? "0" + n : n > 99 ? "" + n : "00" + n;
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handeClose = (e) => {
        setHours(m(Number(hours)));
        setMinutes(n(Number(minutes)));
        onChangeTime && onChangeTime(m(Number(hours)) + ':' + n(Number(minutes)));
        !value && setTime(m(Number(hours)) + ':' + n(Number(minutes)));
        setAnchorEl(null);
    }

    let incremenHour = () => {
        if (Number(hours) === 999) {
            setHours(m(0));
            onChangeTime && onChangeTime(m(0) + ":" + m(Number(minutes)));
            !value && setTime(m(0) + ":" + m(Number(minutes)));
            return;
        }
        setHours(m(Number(hours) + 1));
        onChangeTime && onChangeTime(m(Number(hours) + 1) + ":" + minutes);
        !value && setTime(m(Number(hours) + 1) + ":" + minutes);
    }

    let decremenHour = () => {
        const hour = Number(hours);
        if (hour === 0) {
            setHours(m(999));
            onChangeTime && onChangeTime(m(Number(999)) + ":" + minutes);
            !value && setTime(m(Number(999)) + ":" + minutes);
            return;
        }
        setHours(m(hour - 1));
        onChangeTime && onChangeTime(m(Number(hour - 1)) + ":" + minutes);
        !value && setTime(m(Number(hour - 1)) + ":" + minutes);
    }

    let incremenMinutes = () => {
        const step = stepMinutes ? stepMinutes : 15;
        if (Number(step) + Number(minutes) >= 60) {
            setMinutes(n(0));
            onChangeTime && onChangeTime(hours + ":" + n(0));
            !value && setTime(hours + ":" + n(0));
        } else {
            setMinutes(n(Number(step) + Number(minutes)));
            onChangeTime && onChangeTime(hours + ":" + n(Number(step) + Number(minutes)));
            !value && setTime(hours + ":" + n(Number(step) + Number(minutes)));
        }
    }

    let decremenMinutes = () => {
        const step = stepMinutes ? stepMinutes : 15;
        if (Number(minutes) - Number(step) < 0) {
            setMinutes(n(60 - step));
            onChangeTime && onChangeTime(hours + ":" + n(60 - step));
            !value && setTime(hours + ":" + n(60 - step));
        } else {
            setMinutes(n(Number(minutes) - Number(step)));
            onChangeTime && onChangeTime(hours + ":" + n(Number(minutes) - Number(step)));
            !value && setTime(hours + ":" + n(Number(minutes) - Number(step)));
        }
    }


    let handleKeyDown = (e) => {
        //press Enter or Space
        if(e.keyCode === 13 || e.keyCode === 32) {
            setAnchorEl(e.currentTarget);
        }
    }

    const styleWidth = { width: "130px" };
    const styleCursorPointer = { cursor: "pointer" }
    return (
        <Fragment>
            <div className="flex-grow-1" onClick={handleClick}>
                <input
                    style={disabled ? null : styleCursorPointer}
                    className={classes}
                    type="text"
                    {...attributes}
                    size={sizeHtml}
                    ref={innerRef}
                    readOnly
                    disabled={disabled}
                    value={value ? value : times}
                    onKeyDown={handleKeyDown}
                />
            </div>
            {
                !disabled &&
                <Popover
                    id={Boolean(anchorEl) ? 'simple-popover' : undefined}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handeClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <div className="d-flex pl-2 pr-2 pt-1 pb-1" style={styleWidth}>
                        <div className="d-flex flex-column">
                            <button className="mb-1 btn" name="incremenHour" type="button" tabIndex="-1"
                                onClick={incremenHour}
                            ><i name="incremenHour" className="fa fa-chevron-up fa-lg"></i></button>
                            <input className="form-control mb-1 text-center" type="text"
                                value={hours} onKeyDown={isNumber} onChange={changeHours}
                            >
                            </input>
                            <button className="mb-1 btn" name="decremenHour" type="button" tabIndex="-1"
                                onClick={decremenHour}
                            ><i name="decremenHour" className="fa fa-chevron-down fa-lg"></i></button>
                        </div>
                        <div className="d-flex flex-column ml-2">
                            <button className="mb-1 btn" type="button" tabIndex="-1"
                                onClick={incremenMinutes}
                            ><i id="incremenMinutes" className="fa fa-chevron-up fa-lg"></i></button>
                            <input className="form-control mb-1 text-center"  type="text"
                                value={minutes} onKeyDown={isNumber} onChange={changeMinutes}
                            ></input>
                            <button className="mb-1 btn" type="button" tabIndex="-1"
                                onClick={decremenMinutes}
                            ><i id="decremenMinutes" className="fa fa-chevron-down fa-lg"></i></button>
                        </div>
                    </div>
                </Popover>
            }

        </Fragment>
    )
}

TimePicker.propTypes = {
    ...commonPropTypes,
    plaintext: PropTypes.bool,
    size: PropTypes.string,
    stepMinutes: PropTypes.number,
    onChangeTime: PropTypes.func,
    sizeHtml: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TimePicker;
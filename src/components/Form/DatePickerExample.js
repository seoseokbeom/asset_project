import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./BuySellModal.css";

import { DatePicker } from "@y0c/react-datepicker";
import "./red.scss";

import "dayjs/locale/ko";

function DatePickerExample() {
    const [action, setAction] = useState({});
    return (
        <div className="App">
            <label className="section-container">날짜</label>
            <div />
            <DatePicker
                onChange={(ac) => {
                    setAction(ac);
                    console.log(action);
                    console.log(ac);
                }}
            />

            <hr />
        </div>
    );
}
export default DatePickerExample;

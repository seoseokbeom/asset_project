import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./BuySellModal.css";

import { DatePicker } from "@y0c/react-datepicker";
// import calendar style
// You can customize style by copying asset folder.
import "./red.scss";

// Please include the locale you want to use.
// and delivery props to calendar component
import "dayjs/locale/ko";

function DatePickerExample() {
    // let action = "";
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

import React, { Fragment, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import NumberFormat from "react-number-format";
import Button from "react-bootstrap/Button";
import SaveIcon from "@material-ui/icons/Save";
// import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./BuySellModal.css";

import { DatePicker } from "@y0c/react-datepicker";
import "./red.scss";

import "dayjs/locale/ko";
import DatePickerExample from "./DatePickerExample";
// import DateFnsUtils from "@date-io/date-fns";
// import { ThemeProvider, createMuiTheme } from "@material-ui/core";

// import {
//     KeyboardDatePicker,
//     MuiPickersUtilsProvider,
// } from "@material-ui/pickers";

import "./BuySellModal.css";

// const theme = createMuiTheme({
//     palette: {
//         type: "dark",
//     },
// });

const defaultValues = {
    ReactDatepicker: "",
    ReactSelect: {},
    numberFormat: 0,
};

function BuySellModal({ closeModal }) {
    const { handleSubmit, register, reset, control } = useForm({
        defaultValues,
    });
    const [data, setData] = useState(null);
    const [action, setAction] = useState({});
    const [selectedDate, handleDateChange] = useState(new Date());

    const clickButton = (e) => {
        closeModal();
        console.log(e);
    };

    return (
        // <MuiPickersUtilsProvider utils={DateFnsUtils}>
        // <form onSubmit={handleSubmit((data) => setData(data))} className="form">
        <form
            onSubmit={handleSubmit((data) => console.log(data))}
            className="form"
        >
            <div className="form-container">
                <section className="section-container">
                    <label className="section-label">거래</label>
                    <Controller
                        as={ReactSelect}
                        options={[
                            { value: "매수", label: "매수" },
                            { value: "매도", label: "매도" },
                        ]}
                        name="BuySellSelector"
                        isClearable
                        control={control}
                    />
                    <hr />
                </section>
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Controller
                        name="MUIPicker"
                        control={control}
                        render={({ ref, ...rest }) => (
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                                {...rest}
                            />
                        )}
                    />
                </MuiPickersUtilsProvider> */}
                {/* <label className="black-color">날짜</label>
                    <div />
                    <KeyboardDatePicker
                        placeholder="2018/10/10"
                        value={selectedDate}
                        onChange={(date) => handleDateChange(date)}
                        format="yyyy/MM/dd"
                    />
                    <hr /> */}
                <section>
                    <label className="section-container">수량</label>
                    <input
                        type="number"
                        name="example"
                        className="input"
                        defaultValue="0"
                        ref={register}
                    />
                    <hr />
                </section>
                {/* <DatePickerExample /> */}
                <section>
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
                </section>
                <section>
                    <label className="section-container">가격</label>
                    <div />
                    <Controller
                        as={NumberFormat}
                        thousandSeparator
                        name="numberFormat"
                        className="input"
                        control={control}
                        // onClick={}
                        //   onClick={this.props.closeModal}
                    />
                </section>
                <Button
                    className="buy-sell-add-button"
                    style={{ position: "absolute", right: "0px" }}
                    variant="outline-primary"
                    type="submit"
                    onClick={clickButton}
                >
                    {/* // onClick={closeModal */}
                    <SaveIcon /> {"  "}
                    Primary
                </Button>{" "}
            </div>
        </form>
        // </MuiPickersUtilsProvider>
    );
}

export default BuySellModal;

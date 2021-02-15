import React, { Fragment, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import NumberFormat from "react-number-format";
import Button from "react-bootstrap/Button";
import SaveIcon from "@material-ui/icons/Save";
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

function BuySellModal({ row, setRow, closeModal, setFormData }) {
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

    // const submitFunc = (data) => {
    //     handleSubmit((data) => console.log(data));
    //     closeModal();
    // };

    // return (
    //     <form
    //         onSubmit={submitFunc(data)}
    //         // handleSubmit((data) => console.log(data))
    //         className="form"
    //     ></form>

    // const item = {
    //     symbol: "aaaaa",
    //     name: "",
    //     cost: "",
    //     marketValue: "",
    //     return: "",
    // };
    return (
        <form
            onSubmit={handleSubmit((data) => {
                console.log(data);
                setFormData(data);
                // setRow()
                {
                    data.BuySellSelector &&
                        setRow([
                            ...row,
                            {
                                symbol: data.BuySellSelector.value,
                                name: data.date,
                                // JSON.stringify(
                                // : data["numOfStock"],
                                cost: data.price,
                                date: data["date"],
                                marketValue: data.numOfStock,
                                return: "",
                            },
                        ]);
                }

                closeModal();
            })}
            className="form"
        >
            <div className="form-container">
                <section>
                    <label className="section-container">티커</label>
                    <div />
                    <Controller
                        as={NumberFormat}
                        thousandSeparator
                        // type="number"
                        name="price"
                        className="input"
                        control={control}
                        // onClick={}
                        //   onClick={this.props.closeModal}
                    />
                </section>
                <section className="section-container">
                    <label className="section-container">거래</label>
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

                {/* <DatePickerExample /> */}
                <section>
                    <label className="section-container">날짜</label>
                    <div />
                    <DatePicker
                        onChange={(ac) => {
                            console.log(ac);
                            setAction(
                                `${ac["$y"]}-${ac["$M"] + 1}-${ac["$D"]}`
                            );
                            //console.log(action);
                            // console.log(ac["$d"]);
                            console.log(action);
                        }}
                    />
                    <input
                        type="text"
                        name="date"
                        value={action}
                        // defaultValue="0"
                        className="disable"
                        ref={register}
                    />
                    <hr />
                </section>
                <section>
                    <label className="section-container">수량</label>
                    <input
                        type="number"
                        name="numOfStock"
                        className="input"
                        defaultValue="0"
                        ref={register}
                    />
                    <hr />
                </section>
                <section>
                    <label className="section-container">가격</label>
                    <div />
                    <Controller
                        as={NumberFormat}
                        thousandSeparator
                        // type="number"
                        name="price"
                        className="input"
                        control={control}
                        // onClick={}
                        //   onClick={this.props.closeModal}
                    />
                </section>
                <input type="submit" value="Save" />
                {/* <Button
                    className="buy-sell-add-button"
                    style={{ position: "absolute", right: "0px" }}
                    variant="outline-primary"
                    type="submit"
                    onClick={clickButton}
                >
                    <SaveIcon /> {"  "}
                    Save
                </Button> */}
            </div>
        </form>
        // </MuiPickersUtilsProvider>
    );
}

export default BuySellModal;

import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import ReactSelect from "react-select";
import { useForm, Controller } from "react-hook-form";
import ShowAndAddCategory from "./ShowAndAddCategory";
import { useParams } from "react-router-dom";
import axios from "axios";

import { DatePicker } from "@y0c/react-datepicker";
import styled from "styled-components";
import StockAutoCompleteSearchBar from "./StockAutoCompleteSearchBar";
import StockAutoComplete2 from "./StockAutoComplete2";
import StockAutoComplete3 from "./StockAutoComplete3";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../store/GlobalState";

import NumberFormat from "react-number-format";
// import "./KRWFormHooks.css";

const defaultValues = {
    ReactDatepicker: "",
    ReactSelect: {},
    numberFormat: 0,
};
function KRWFormHooks({ portfolioId, handleModalIsOpen, passedId }) {
    const [ticker, setTicker] = useState("");
    const [category, setCategory] = useState("");
    const [action, setAction] = useState("");
    const [timestamp, setTimestamp] = useState(0);
    const [stockInfo, setStockInfo] = useState({});
    const [krw, setKrw] = useState(0);
    const { userState, userDispatch, stockDispatch } = useContext(
        GlobalContext
    );
    let history = useHistory();

    const stockInfoHandle = (param) => {
        setStockInfo(param);
    };

    const categoryHandle = (param) => {
        setCategory(param);
    };

    const tickerHandle = (param) => {
        setTicker(param);
    };

    useEffect(() => {
        console.log("stockInfo:", stockInfo);
    }, [stockInfo]);
    useEffect(() => {
        console.log("timestamp:", timestamp);
    }, [timestamp]);

    useEffect(() => {
        console.log("ticker:", ticker);
    }, [ticker]);
    useEffect(() => {
        console.log("date action:", action);
    }, [action]);
    useEffect(() => {
        console.log("category:", category);
    }, [category]);
    const { id } = useParams();
    const { register, handleSubmit, watch, errors, control } = useForm({
        defaultValues,
    });
    const onSubmit = (data) => {
        console.log(data);
        console.log("passedId:", passedId);
        console.log(stockInfo);
        console.log(category);
        // console.log(data.BuySellSelector.value == "매수" ? "Buy" : "Sell");
        // console.log(parseInt(data.amount.replace(/,/g, "")));
        console.log(parseFloat(data.price.replace(/,/g, "")));
        console.log(timestamp);
        // const response = await
        axios
            .post(
                `/portfolio/${portfolioId}/cash/history`,
                {
                    cashFlowType: "Deposit",
                    data: {
                        balance: parseFloat(data.price.replace(/,/g, "")),
                        country: passedId == 0 ? "korea" : "usa",
                        timestamp: timestamp,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${userState.loginInfo.access_token}`,
                    },
                }
            )
            .then((res) => {
                console.log("res:", res);
                // userDispatch({ type: "trigger_rerender" });
            })
            .then((res) => {
                handleModalIsOpen();
                userDispatch({ type: "trigger_rerender" });
            })
            .then(() => {
                history.push(`/portfolio/diverse/${portfolioId}`);
            })
            .catch((err) => console.log(err));
    };

    console.log(watch("example")); // you can watch individual input by pass the name of the input

    return (
        <Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    {passedId == 0 ? (
                        <label className="section-container">KRW 입금액</label>
                    ) : (
                        <label className="section-container">USD 입금액</label>
                    )}

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
                <section>
                    <label className="section-container">날짜</label>
                    <div />
                    <DatePicker
                        onChange={(date) => {
                            console.log(date);

                            setAction(
                                // date
                                `${date["$y"]}-${
                                    date["$M"] + 1 < 10
                                        ? "0" + (date["$M"] + 1)
                                        : date["$M"] + 1
                                }-${
                                    date["$D"] < 10
                                        ? "0" + date["$D"]
                                        : date["$D"]
                                }`
                            );
                            var newDate = new Date(
                                date["$y"],
                                date["$M"],
                                date["$D"]
                            );
                            setTimestamp(newDate.getTime());
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
                    {/* <hr /> */}
                </section>
                {errors.exampleRequired && <p>This field is required</p>}
                <input type="submit" value="Save" />
            </Form>
        </Body>
    );
}
const Body = styled.div`
    // height: 100%;
    margin: 0 0 0 0;

    // background: #0e101c;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
`;

const Form = styled.form`
    max-width: 500px;
    margin: 0 auto;
`;

const Label = styled.label`
    line-height: 2;
    text-align: left;
    display: block;
    margin-bottom: 10px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 300;
    color: black;
`;

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 10px 15px;
    font-size: 14px;
`;
export default KRWFormHooks;

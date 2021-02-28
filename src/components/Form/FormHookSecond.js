import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import ReactSelect from "react-select";
import { watch, useForm, Controller } from "react-hook-form";
import ShowAndAddCategory from "./ShowAndAddCategory";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../store/GlobalState";

import { DatePicker } from "@y0c/react-datepicker";
import styled from "styled-components";
import StockAutoCompleteSearchBar from "./StockAutoCompleteSearchBar";
import StockAutoComplete2 from "./StockAutoComplete2";
import StockAutoComplete3 from "./StockAutoComplete3";
import { useHistory } from "react-router-dom";
import { Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import StockChart from "../Charts/StockChart";

import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

function FormHookSecond({ portfolioId, handleModalIsOpen }) {
    const classes = useStyles();

    const [checked, setChecked] = useState(true);
    const [ticker, setTicker] = useState("");
    const [tickerLen, setTickerLen] = useState(0);
    const defaultValues = {
        ReactDatepicker: "",
        ReactSelect: {},
        numberFormat: 0,
        Checkbox: checked,
        tickerLen2: tickerLen,
    };
    const { userState, userDispatch, stockDispatch } = useContext(
        GlobalContext
    );

    const {
        register,
        handleSubmit,
        watch,
        errors,
        control,
        setValue,
    } = useForm({
        defaultValues,
    });
    const watchFields = watch(["Checkbox"]); // you can also target specific fields by their names
    console.log("watchFields:", watchFields);

    const [category, setCategory] = useState("");
    const [action, setAction] = useState("");
    const [timestamp, setTimestamp] = useState(0);
    const [stockInfo, setStockInfo] = useState({});

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
        console.log("checked:", checked);
    }, [checked]);
    useEffect(() => {
        console.log("ticker:", ticker);
        console.log("ticker length:", ticker.length);
        // setTickerLen(ticker.length);

        axios
            .get(`/stock/now/${ticker}`, {
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            })
            .then((res) => {
                console.log("rpiceNow:", parseFloat(res.data.price));
                setValue("tickerLen2", res.data.price);
            });
    }, [ticker]);
    useEffect(() => {
        console.log("date action:", action);
    }, [action]);
    useEffect(() => {
        console.log("category:", category);
    }, [category]);
    const { id } = useParams();
    const onSubmit = async (data) => {
        console.log("data:", data);
        console.log("stockInfo:", stockInfo);
        console.log("category:", category);
        console.log(data.BuySellSelector.value == "매수" ? "Buy" : "Sell");
        console.log(parseFloat(data.amount.replace(/,/g, "")));
        console.log(parseFloat(data.price.replace(/,/g, "")));
        console.log(timestamp);
        // const response = await
        if (data.Checkbox == false && data.BuySellSelector.value == "매수") {
            if (stockInfo.country == "usa") {
                console.log(
                    `stockInfo.country == "usa"stockInfo.country == "usa"stockInfo.country == "usa",`,
                    parseFloat(data.amount.replace(/,/g, "")) *
                        parseFloat(data.price.replace(/,/g, ""))
                );

                await axios
                    .post(
                        `/portfolio/${portfolioId}/cash/history`,
                        {
                            cashFlowType: "Deposit",
                            data: {
                                balance: parseInt(
                                    parseFloat(data.amount.replace(/,/g, "")) *
                                        parseFloat(
                                            data.price.replace(/,/g, "")
                                        ) +
                                        1
                                ),
                                country: "usa",
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
                    })
                    .catch((err) => alert(err));
                // .then((res) => console.log("res:", res))
                // .then((res) => {
                //     handleModalIsOpen();
                // })
                // .then(() => {
                //     history.push(`/portfolio/diverse/${portfolioId}`);
                // })
                // .catch((err) => console.log(err));
            } else {
                await axios.post(
                    `/portfolio/${portfolioId}/cash/history`,
                    {
                        cashFlowType: "Deposit",
                        data: {
                            balance: parseInt(
                                parseFloat(data.amount.replace(/,/g, "")) *
                                    parseFloat(data.price.replace(/,/g, "")) +
                                    1
                            ),
                            country: "korea",
                            timestamp: timestamp,
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userState.loginInfo.access_token}`,
                        },
                    }
                );
            }
        }
        await axios
            .post(
                `/portfolio/${portfolioId}/stock`,
                {
                    stock: stockInfo,
                    category: category,
                    tradingHistories: [
                        {
                            tradeType:
                                data.BuySellSelector.value == "매수"
                                    ? "Buy"
                                    : "Sell",
                            data: {
                                amount: parseFloat(
                                    data.amount.replace(/,/g, "")
                                ),
                                price: parseFloat(data.price.replace(/,/g, "")),
                                timestamp: timestamp,
                            },
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${userState.loginInfo.access_token}`,
                    },
                }
            )
            .then((res) => console.log("res:", res))
            .then((res) => {
                handleModalIsOpen();
                userDispatch({ type: "trigger_rerender" });
            })
            .then(() => {
                history.push(`/portfolio/diverse/${portfolioId}`);
            })
            .catch((err) => {
                alert("현금이 부족합니다. 현금을 등록해주세요.");
                console.log("err:", err);
            });
        // console.log("async awiat Result:", response);
        // console.log("response.config.data:", response.config.data);
        // const JsonParsed = JSON.parse(response.config.data);
        // console.log(`response.config.data.category`, JsonParsed.category);
        // setButtonBoxList([...buttonBoxList, JsonParsed.category]);
    };

    console.log(watch("example")); // you can watch individual input by pass the name of the input

    return (
        <Body>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        {/* <Paper> */}
                        <StockChart ticker={ticker} />
                        {/* </Paper> */}
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {/* <Label>티커</Label> */}
                                {/* <StockAutoCompleteSearchBar
                    stockInfoHandle={stockInfoHandle}
                    tickerHandle={tickerHandle}
                    stockInfo={stockInfo}
                /> */}
                                {/* <StockAutoComplete2 /> */}
                                <br />
                                <StockAutoComplete3
                                    stockInfoHandle={stockInfoHandle}
                                    tickerHandle={tickerHandle}
                                    stockInfo={stockInfo}
                                    userState={userState}
                                />
                                {/* <Controller /> */}
                                <label className="section-container">
                                    거래
                                </label>
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
                                <section>
                                    <label className="section-container">
                                        가격 {ticker}
                                    </label>
                                    <div />
                                    <Controller
                                        as={NumberFormat}
                                        thousandSeparator
                                        name="price"
                                        name="tickerLen2"
                                        className="input"
                                        control={control}
                                    />
                                </section>
                                <section>
                                    <label className="section-container">
                                        수량
                                    </label>
                                    <div />
                                    <Controller
                                        as={NumberFormat}
                                        thousandSeparator
                                        // type="number"
                                        name="amount"
                                        className="input"
                                        control={control}
                                        // onClick={}
                                        //   onClick={this.props.closeModal}
                                    />
                                </section>
                                <section>
                                    <label className="section-container">
                                        날짜
                                    </label>
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
                                <br />
                                <section>
                                    <ShowAndAddCategory
                                        categoryHandle={categoryHandle}
                                        id={id}
                                    />
                                </section>
                                <section onClick={() => setChecked(!checked)}>
                                    <Controller
                                        name="Checkbox"
                                        control={control}
                                        defaultValue={true}
                                        // rules={{ required: true }}
                                        render={(props) => (
                                            <Checkbox
                                                onChange={(e) =>
                                                    props.onChange(
                                                        e.target.checked
                                                    )
                                                }
                                                checked={props.value}
                                            />
                                        )} // props contains: onChange, onBlur and value
                                    />
                                    {/* <Controller
                        as={Checkbox}
                        name="Checkbox"
                        ref={register}
                        type="checkbox"
                        control={control}
                        defaultChecked={checked}
                        checked={checked}
                    /> */}
                                    <span>매수시, 등록한 현금에서 뺍니다.</span>
                                </section>
                                {/* <Label>Example</Label>
                <Input name="example" defaultValue="test" ref={register} /> */}
                                {/* <Label>ExampleRequired</Label>
                <Input
                    name="exampleRequired"
                    ref={register({ required: true, maxLength: 10 })}
                /> */}
                                {errors.exampleRequired && (
                                    <p>This field is required</p>
                                )}
                                <input type="submit" value="Save" />
                            </Form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
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
export default FormHookSecond;

import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import "./EasyTableBody.css";
import OneStockDetailedTradingHistory from "./OneStockDetailedTradingHistory";
import { GlobalContext } from "../../store/GlobalState";
import { AXIS_LINE_COLOR } from "@gooddata/sdk-ui-charts/dist/highcharts/utils/color";
import FormModalHooks from "../Form/FormModalHooks";

function EasyTableBody({
    DATA,
    stockInfo,
    currPrice,
    title,
    portfolioId,
    handleUsdCost,
    setKrwCost,
    stockCodeAndCurrPrice,
}) {
    const { userState, userDispatch } = useContext(GlobalContext);
    const [tableData, setTableData] = useState([]);
    const [newStockInfo, setNewStockInfo] = useState([]);
    const [nowPrice, setNowPrice] = useState([]);
    const [newStockCodeAndCurrPrice, setnewStockCodeAndCurrPrice] = useState(
        []
    );
    const [decimalPoint, setDecimalPoint] = useState(0);
    const [isExpanded, setIsExpanded] = useState([]);
    const [reRender, setReRenter] = useState(true);
    const handleReRender = () => setReRenter((prev) => !prev);
    useEffect(() => {
        console.log("isExpanded:", isExpanded);
    }, [isExpanded]);
    useEffect(() => {
        console.log("stockCodeAndCurrPrice:", stockCodeAndCurrPrice);
        setnewStockCodeAndCurrPrice(stockCodeAndCurrPrice);
    }, [stockCodeAndCurrPrice]);

    useEffect(() => {
        setNewStockInfo(stockInfo);
    }, []);
    useEffect(() => {
        setNewStockInfo(stockInfo);
    }, [stockInfo]);
    useEffect(() => {
        setNowPrice(currPrice);
    }, []);
    useEffect(() => {
        setNowPrice(currPrice);
    }, [currPrice]);
    useEffect(() => {
        setTableData(DATA);
    }, []);
    useEffect(() => {
        setTableData(DATA);
    }, [DATA]);
    useEffect(() => {
        console.log("tableData:", tableData);
    }, [tableData]);
    // useEffect(() => {
    //     userDispatch({
    //         type: "krw_cost_zero",
    //     });
    //     userDispatch({
    //         type: "usd_cost_zero",
    //     });
    //     userDispatch({
    //         type: "krw_real_time_value_zero",
    //     });
    //     userDispatch({
    //         type: "usd_real_time_value_zero",
    //     });
    //     userDispatch({
    //         type: "krw_today_value_zero",
    //     });
    //     userDispatch({
    //         type: "usd_today_value_zero",
    //     });
    // }, []);

    useEffect(() => {
        var krwCount = 0;
        var usdCount = 0;
        var krwRealTimeValue = 0;
        var usdRealTimeValue = 0;
        var krwTodayEarnValue = 0;
        var usdTodayEarnValue = 0;
        // tableData &&
        tableData.map(({ code, name }, i) => {
            if (newStockInfo[i]) {
                if (newStockInfo[i].data.stock.country == "korea") {
                    console.log(
                        "test4:",
                        i,
                        newStockInfo,
                        newStockInfo[i].data.avgPrice *
                            newStockInfo[i].data.amount
                    );
                    console.log(
                        "------------------:",
                        newStockInfo[i].data.avgPrice *
                            newStockInfo[i].data.amount
                    );
                    userDispatch({
                        type: "krw_cost_update",
                        cost:
                            newStockInfo[i].data.avgPrice *
                            newStockInfo[i].data.amount,
                    });
                    // krwCount +=
                    //     newStockInfo[i].data.avgPrice * newStockInfo[i].data.amount;
                    setDecimalPoint(0);
                } else {
                    usdCount +=
                        newStockInfo[i].data.avgPrice *
                        newStockInfo[i].data.amount;
                    setDecimalPoint(2);
                }
            }
            console.log(
                "nowPrice[i] newStockInfo[i]:",
                nowPrice[i],
                newStockInfo[i]
            );
            if (nowPrice[i]) {
                if (newStockInfo[i].data.stock.country == "korea") {
                    krwRealTimeValue +=
                        nowPrice[i].data.price * newStockInfo[i].data.amount;
                    // krw today earned value change
                    krwTodayEarnValue +=
                        (nowPrice[i].data.price -
                            (1 / (nowPrice[i].data.changePercent / 100 + 1)) *
                                nowPrice[i].data.price) *
                        newStockInfo[i].data.amount;
                } else {
                    usdRealTimeValue +=
                        nowPrice[i].data.price * newStockInfo[i].data.amount;
                    // usd today earned value change
                    usdTodayEarnValue +=
                        (nowPrice[i].data.price -
                            (1 / (nowPrice[i].data.changePercent / 100 + 1)) *
                                nowPrice[i].data.price) *
                        newStockInfo[i].data.amount;
                }
            }
            console.log(
                "krwRealTimeValue, usd:",
                krwRealTimeValue,
                usdRealTimeValue
            );
        });
        // userDispatch({
        //     type: "krw_cost_update",
        //     cost: krwCount,
        // });
        userDispatch({
            type: "usd_cost_update",
            cost: usdCount,
        });
        userDispatch({
            type: "krw_real_time_value_update",
            payload: krwRealTimeValue,
        });
        userDispatch({
            type: "usd_real_time_value_update",
            payload: usdRealTimeValue,
        });
        userDispatch({
            type: "krw_today_value_update",
            payload: krwTodayEarnValue,
        });
        userDispatch({
            type: "usd_today_value_update",
            payload: usdTodayEarnValue,
        });
    }, [nowPrice]);
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleDelete = (i, newStockInfoTmp, title) => {
        console.log("newStockInfoTmp:", newStockInfoTmp, title);
        axios
            .delete(`/portfolio/${portfolioId}/stock`, {
                data: { stock: newStockInfoTmp, category: title },
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            })
            .then((res) => {
                console.log(res);
                userDispatch({ type: "trigger_rerender" });
            })
            .catch((err) => console.log(err));
    };
    return (
        tableData &&
        tableData.map(({ code, name }, i) => {
            // setIsExpanded((prev) => {
            //     return {
            //         ...prev,
            //     };
            // });
            return (
                <>
                    <tr
                        key={i}
                        onClick={() =>
                            setIsExpanded((prev) => {
                                var index = isExpanded.indexOf(code);
                                if (index == -1) {
                                    return [...prev, code];
                                } else {
                                    return prev.filter((ele) => {
                                        return ele != code;
                                    });
                                    // prev.splice(index, 1);
                                    return prev;
                                }

                                // if (isExpanded.includes(code)) {
                                //     if (index !== -1) {
                                //         array.splice(index, 1);
                                //     }
                                //     return [...prev];
                                // } else {
                                // }
                            })
                        }
                    >
                        {/* 티커 */}
                        <td style={{ fontWeight: "bold" }}>{code}</td>
                        {/* 종목명 */}
                        <td>{name}</td>
                        {/* 현재가 */}
                        <td style={{ textAlign: "right" }}>
                            {nowPrice[i]
                                ? numberWithCommas(nowPrice[i].data.price)
                                : "something went wrong"}
                        </td>
                        {/* 등락률 */}
                        <td
                            style={
                                nowPrice[i] &&
                                nowPrice[i].data.changePercent >= 0
                                    ? {
                                          color: "green",
                                          fontWeight: "normal",
                                          textAlign: "right",
                                      }
                                    : {
                                          color: "red",
                                          fontWeight: "normal",
                                          textAlign: "right",
                                      }
                            }
                        >
                            {nowPrice[i]
                                ? nowPrice[i].data.changePercent + "%"
                                : "something went wrong"}
                        </td>
                        {/* 등락 */}
                        <td style={{ textAlign: "right" }}>
                            {nowPrice[i]
                                ? numberWithCommas(
                                      (
                                          nowPrice[i].data.price -
                                          (1 /
                                              (nowPrice[i].data.changePercent /
                                                  100 +
                                                  1)) *
                                              nowPrice[i].data.price
                                      ).toFixed(decimalPoint)
                                  )
                                : "something went wrong"}
                        </td>
                        {/* 주 */}
                        <td id="text_align_right">
                            {newStockInfo[i]
                                ? numberWithCommas(newStockInfo[i].data.amount)
                                : JSON.stringify(newStockInfo[i])}
                        </td>
                        {/* 매입평균가 */}
                        <td id="text_align_right">
                            {newStockInfo[i] &&
                                numberWithCommas(newStockInfo[i].data.avgPrice)}
                        </td>
                        {/* 매수금 */}
                        <td id="text_align_right">
                            {newStockInfo[i] &&
                                numberWithCommas(
                                    (
                                        newStockInfo[i].data.avgPrice *
                                        newStockInfo[i].data.amount
                                    ).toFixed(decimalPoint)
                                )}
                        </td>
                        {/* 마켓 벨류 */}
                        <td id="text_align_right">
                            {nowPrice[i] && newStockInfo[i]
                                ? numberWithCommas(
                                      (
                                          nowPrice[i].data.price *
                                          newStockInfo[i].data.amount
                                      ).toFixed(decimalPoint)
                                  )
                                : "something went wrong"}
                        </td>
                        {/* 총 수익 */}
                        <td id="text_align_right">
                            {newStockInfo[i] && nowPrice[i]
                                ? numberWithCommas(
                                      (
                                          nowPrice[i].data.price *
                                              newStockInfo[i].data.amount -
                                          newStockInfo[i].data.avgPrice *
                                              newStockInfo[i].data.amount
                                      ).toFixed(decimalPoint)
                                  )
                                : "something went wrong"}
                        </td>
                        {/* 하루 수익 */}
                        <td id="text_align_right">
                            {nowPrice[i] && newStockInfo[i]
                                ? numberWithCommas(
                                      (
                                          (nowPrice[i].data.price -
                                              (1 /
                                                  (nowPrice[i].data
                                                      .changePercent /
                                                      100 +
                                                      1)) *
                                                  nowPrice[i].data.price) *
                                          newStockInfo[i].data.amount
                                      ).toFixed(decimalPoint)
                                  )
                                : "something went wrong"}
                        </td>
                        {/* 수익률 */}

                        {nowPrice[i] && newStockInfo[i] ? (
                            <td
                                id="text_align_right"
                                // className={
                                //     nowPrice[i].data.price /
                                //         newStockInfo[i].data.avgPrice >
                                //     0
                                //         ? "plus"
                                //         : "minus"
                                // }
                                style={
                                    nowPrice[i].data.price /
                                        newStockInfo[i].data.avgPrice >
                                    0
                                        ? { color: "green", fontWeight: "bold" }
                                        : { color: "red", fontWeight: "bold" }
                                }
                            >
                                {numberWithCommas(
                                    (
                                        (nowPrice[i].data.price /
                                            newStockInfo[i].data.avgPrice -
                                            1) *
                                        100
                                    ).toFixed(2) + "%"
                                )}
                            </td>
                        ) : (
                            // : (
                            //     <td style={{ color: "red" }}>
                            //         numberWithCommas( ( (currPrice[i].data.price /
                            //         newStockInfo[i].data.avgPrice - 1) * 100
                            //         ).toFixed(decimalPoint) + "%" )
                            //     </td>
                            // )
                            "something went wrong"
                        )}

                        {/* <td id="text_align_center">
                            <Button
                                key={i}
                                // newStockInfo={newStockInfo[i].data}
                                // category={title}
                                ticker={code}
                                variant="contained"
                                onClick={() =>
                                    handleDelete(
                                        i,
                                        newStockInfo[i].data.stock,
                                        title
                                    )
                                }
                            >
                                EDIT
                            </Button>
                        </td> */}
                        <td id="text_align_center">
                            {newStockInfo[i] && (
                                <FormModalHooks
                                    handleReRender={handleReRender}
                                    portfolioId={portfolioId}
                                    userState={userState}
                                    formType="stock_update"
                                    buttonText="매수/매도 내역"
                                    stockInfo={newStockInfo[i].data.stock}
                                />
                            )}

                            {/* <Button
                                key={i}
                                // newStockInfo={newStockInfo[i].data}
                                // category={title}
                                ticker={code}
                                variant="contained"
                                onClick={() =>
                                    handleDelete(
                                        i,
                                        newStockInfo[i].data.stock,
                                        title
                                    )
                                }
                            >
                                기록
                            </Button> */}
                        </td>
                        <td id="text_align_center">
                            <Button
                                key={i}
                                // newStockInfo={newStockInfo[i].data}
                                // category={title}
                                ticker={code}
                                variant="contained"
                                onClick={() =>
                                    handleDelete(
                                        i,
                                        newStockInfo[i].data.stock,
                                        title
                                    )
                                }
                            >
                                삭제
                            </Button>
                        </td>
                    </tr>
                    {/* && isExpanded.includes(code) */}
                    {newStockInfo[i] && (
                        <OneStockDetailedTradingHistory
                            userState={userState}
                            portfolioId={portfolioId}
                            code={code}
                            stockInfo={newStockInfo[i].data.stock}
                            isExpanded={isExpanded}
                        />
                    )}
                    {/* <tr>
                        <td>sss</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> */}
                </>
            );
        })
    );
}

export default EasyTableBody;

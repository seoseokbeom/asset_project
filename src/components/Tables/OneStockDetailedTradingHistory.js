import React, { useEffect, useState } from "react";
import axios from "axios";

function OneStockDetailedTradingHistory({
    stockInfo,
    portfolioId,
    userState,
    isExpanded,
    code,
}) {
    const [newIsExpanded, setNewIsExpanded] = useState([]);

    useEffect(() => {
        setNewIsExpanded(isExpanded);
    }, [isExpanded]);
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const [tradeHistory, setTradeHistory] = useState([]);
    useEffect(() => {
        console.log("stockInfo:", stockInfo);
        let encoded = encodeURI(JSON.stringify(stockInfo));
        axios
            .get(`/portfolio/${portfolioId}/stock/info/${encoded}`, {
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            })
            .then((res) => {
                console.log("OneStockDetailedTradingHistory succ:", res);
                setTradeHistory(res.data.tradeHistories);
            })
            .catch((err) => "OneStockDetailedTradingHistory");
    }, []);
    useEffect(() => {
        console.log("21241dc:", code);
        console.log("tradeHistory:", tradeHistory);
    }, [tradeHistory]);

    const timestampToDate = (timeStamp) => {
        var date = new Date(timeStamp);
        console.log(
            "tiemstamp:",
            date.getFullYear() +
                "년 " +
                (date.getMonth() + 1) +
                "월 " +
                date.getDate() +
                "일"
        );
        return (
            date.getFullYear() +
            "년 " +
            (date.getMonth() + 1) +
            "월 " +
            date.getDate() +
            "일"
        );
    };
    return (
        <>
            {tradeHistory &&
                newIsExpanded.includes(code) &&
                tradeHistory.map((elem) => {
                    return (
                        <tr>
                            <td></td>
                            <td>{elem.tradeType == "Buy" ? "매수" : "매도"}</td>
                            <td>{elem.data.price}</td>
                            <td>{elem.data.amount}</td>
                            <td>
                                {numberWithCommas(
                                    elem.data.price * elem.data.amount
                                )}
                            </td>
                            <td>
                                {timestampToDate(elem.data.timestamp)}
                                {/* new Date(elem.data.timestamp).getTime() */}
                                {/* // new Date(timestamp) // elem.data.timestamp } */}
                            </td>
                        </tr>
                    );
                })}
        </>
    );
}

export default OneStockDetailedTradingHistory;

import React, { useState, useEffect } from "react";
import axios from "axios";
import EasyTableBody from "./EasyTableBody";
import EasyTableBody2 from "./EasyTableBody2";
import ReactTableEasy from "../Tables/ReactTableEasy";
// const URL = "https://jsonplaceholder.typicode.com/users";

function EasyTable({
    title,
    DATA,
    userState,
    portfolioId,
    handleUsdCost,
    setKrwCost,
    handleNowKrValue,
    handleNowUsaValue,
    handleKrTodayEarning,
    handleUsaTodayEarning,
}) {
    const [tableData, setTableData] = useState([]);
    const [stockInfo, setStockInfo] = useState([]);
    const [currPrice, setCurrPrice] = useState([]);
    const [stockCodeAndCurrPrice, setStockCodeAndCurrPrice] = useState([]);
    useEffect(() => {
        setTableData(DATA);
    }, []);
    useEffect(() => {
        setTableData(DATA);
    }, [DATA]);
    useEffect(() => {
        setStockInfo([]);
        setCurrPrice([]);
        setStockCodeAndCurrPrice([]);
        tableData.map(async (e) => {
            console.log("e;", e);

            let encoded = encodeURI(JSON.stringify(e));
            const stockInfo2 = await axios.get(
                `/portfolio/${portfolioId}/stock/info/${encoded}`,
                {
                    headers: {
                        Authorization: `Bearer ${userState.loginInfo.access_token}`,
                    },
                }
            );
            const priceNow = await axios.get(`/stock/now/${e.code}`, {
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            });
            console.log("stockInfo2priceNow:", stockInfo2, priceNow);
            if (stockInfo2.data.stock.country == "korea") {
                // 현재 평가금
                handleNowKrValue(stockInfo2.data.amount * priceNow.data.price);
                // 오늘 하루 수익
                handleKrTodayEarning(
                    stockInfo2.data.amount *
                        priceNow.data.price *
                        priceNow.data.changePercent *
                        0.01
                );
            } else if (stockInfo2.data.stock.country == "usa") {
                handleNowUsaValue(stockInfo2.data.amount * priceNow.data.price);
                handleUsaTodayEarning(
                    stockInfo2.data.amount *
                        priceNow.data.price *
                        priceNow.data.changePercent *
                        0.01
                );
            }
            console.log("resresrresr:", stockInfo2, priceNow);

            setStockInfo((prev) => [...prev, stockInfo2]);
            setCurrPrice((prev) => [...prev, priceNow]);
            setStockCodeAndCurrPrice((prev) => [
                ...prev,
                [stockInfo2, priceNow],
            ]);
        });
    }, [tableData]);

    useEffect(() => {
        console.log("currPrice:", currPrice);
    }, [currPrice]);

    useEffect(() => {
        console.log("title, DATA:", title, tableData);
    }, [tableData]);

    const renderHeader = () => {
        let headerElement = [
            "티커",
            "종목명",
            "현재가",
            "등락률",
            "등락",
            "주",
            "매입평균가",
            "매수금",
            "마켓벨류",
            "총 수익",
            "하루 수익",
            "수익률",
            "매수/매도 내역",
            "삭제",
        ];

        return headerElement.map((key, idx) => {
            return <th key={idx}>{key.toUpperCase()}</th>;
        });
    };

    return (
        <>
            <h1
                id="title_sm"
                style={{
                    color: "#3f50b4",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "1.3rem",
                }}
            >
                {title}
            </h1>
            {/* <ReactTableEasy
                        title={title}
                        stockInfo={stockInfo}
                        stockCodeAndCurrPrice={stockCodeAndCurrPrice}
                        DATA={tableData}
                        currPrice={currPrice}
                        portfolioId={portfolioId}
                        userState={userState}
                        handleUsdCost={handleUsdCost}
                        setKrwCost
                        /> */}

            <table id="employee">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    <EasyTableBody2
                        title={title}
                        stockInfo={stockInfo}
                        stockCodeAndCurrPrice={stockCodeAndCurrPrice}
                        DATA={tableData}
                        currPrice={currPrice}
                        portfolioId={portfolioId}
                        userState={userState}
                        handleUsdCost={handleUsdCost}
                        setKrwCost
                    />
                </tbody>
            </table>
            <br />
        </>
    );
}

export default EasyTable;

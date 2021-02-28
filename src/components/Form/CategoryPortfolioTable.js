import React, { useState, useContext, useEffect } from "react";
import EasyTable from "../Tables/EasyTable";
import ReactTableEasy from "../Tables/ReactTableEasy";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "./../../store/GlobalState";

function CategoryPortfolioTable({
    portfolioId,
    handleUsdCost,
    handleKoreanCost,
    handleNowKrValue,
    handleKrTodayEarning,
    handleUsaTodayEarning,
    handleNowUsaValue,
}) {
    const { userState, userDispatch } = useContext(GlobalContext);
    const [stockCategoryList, setStockCategoryList] = useState([]);
    const [stockTitleAndStockList, setStockTitleAndStockList] = useState([]);
    const [title, setTitle] = useState("");
    const [insideCategoryStockList, setInsideCategoryStockList] = useState([]);
    let history = useHistory();
    useEffect(() => {
        axios
            .get(`/portfolio/${portfolioId}`, {
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            })
            .then((res) => {
                console.log("axios.get(`/portfolio/${portfolioId}`:", res);

                // getstock Category 결과값: {미국 주식: Array(4), 한국 주식: Array(2)}
                console.log(
                    "getstock Category:",
                    res.data.assetCategory.stockCategory
                );
                for (const [key, value] of Object.entries(
                    res.data.holdings.stockHoldings
                )) {
                    console.log("value222:", value);
                    if (value.stock.country == "korea") {
                        handleKoreanCost(value.amount * value.avgPrice);
                    } else if (value.stock.country == "usa") {
                        handleUsdCost(value.amount * value.avgPrice);
                    }
                }

                // for (const property in object) {
                //     console.log(`${property}: ${object[property]}`);
                // }
                // console.log(
                //     "getstock Category Stock[0]:",
                //     e.data.assetCategory.stockCategory["한국 주식"][0]
                // );

                // console.log(
                //     "JSON.stringify( getstock Category Stock[0]:",
                //     JSON.stringify(
                //         e.data.assetCategory.stockCategory["한국 주식"][0]
                //     )
                // );
                // const encoded = encodeURI(
                //     JSON.stringify(
                //         e.data.assetCategory.stockCategory["한국 주식"][0]
                //     )
                // );
                // console.log(
                //     "encodeURI JSON.stringify( getstock Category Stock[0]:",
                //     encoded
                // );
                setStockCategoryList(res.data.assetCategory.stockCategory);
            })
            .then((res) => {});
    }, [userState.rerender]);

    useEffect(() => {
        console.log("stockCategoryList:", stockCategoryList);
        setStockTitleAndStockList([]);
        for (const [key, value] of Object.entries(stockCategoryList)) {
            console.log(`${key} + ${JSON.stringify(value)}`);
            setStockTitleAndStockList((prevState) => [
                ...prevState,
                [key, value],
            ]);
        }
    }, [stockCategoryList]);

    useEffect(() => {
        console.log("stockTitleAndStockList:", stockTitleAndStockList);
    }, [stockTitleAndStockList]);

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

    return (
        <div>
            {stockTitleAndStockList.map((res) => {
                return (
                    <EasyTable
                        handleUsdCost={handleUsdCost}
                        setKrwCost
                        title={res[0]}
                        DATA={res[1]}
                        portfolioId={portfolioId}
                        userState={userState}
                        stockCategoryList={stockCategoryList}
                        handleNowKrValue={handleNowKrValue}
                        handleNowUsaValue={handleNowUsaValue}
                        handleKrTodayEarning={handleKrTodayEarning}
                        handleUsaTodayEarning={handleUsaTodayEarning}
                    />
                );
            })}
        </div>
    );
}

export default CategoryPortfolioTable;

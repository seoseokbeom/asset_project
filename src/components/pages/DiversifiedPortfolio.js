import React, {
    useMemo,
    useState,
    useEffect,
    useContext,
    useReducer,
} from "react";
import { userReducer } from "../../store/reducers";
import { useTable } from "react-table";
import styled from "styled-components";
import PortfolioAdd from "../Content/PortfolioAdd";
import { useParams } from "react-router-dom";
import ShowAndAddCategory from "../Form/ShowAndAddCategory";
// import EasyTable from "../Tables/EasyTable";
import CashTable from "../Tables/CashTable";
import StockAutoCompleteSearchBar from "../Form/StockAutoCompleteSearchBar";
import FormModalHooks from "../Form/FormModalHooks";
import CategoryPortfolioTable from "../Form/CategoryPortfolioTable";
import { GlobalContext } from "../../store/GlobalState";
import RechartsDoublePie2 from "../Charts/RechartsDoublePie2";
import RechartsDoublePie3 from "../Charts/RechartsDoublePie3";
import RechartsDoublePie from "../Charts/RechartsDoublePie";
// import Doughnut2 from "../Charts/Doughnut2";
import axios from "axios";
import StockChart from "../Charts/StockChart";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// const data01 = [
//     { name: "미국 주식", value: 400 },
//     { name: "한국 주식", value: 300 },
// ];
// const data02 = [
//     { name: "A1", value: 100 },
//     { name: "A2", value: 300 },
// ];
const DiversifiedPortfolio = () => {
    const { userState, userDispatch, stockDispatch } = useContext(
        GlobalContext
    );

    const [koreanCost, setKoreanCost] = useState(0);
    const [usdCost, setUsdCost] = useState(0);
    const [currencyRate, setCurrencyRate] = useState(0);
    const [nowKrValue, setNowKrValue] = useState(0);
    const [nowUsaValue, setNowUsaValue] = useState(0);
    const [krTodayEarning, setKrTodayEarning] = useState(0);
    const [usaTodayEarning, setUsaTodayEarning] = useState(0);
    // const [usdCost, setUsdCost] = useState(0);
    const [krwUsdSum, setKrwUsdSum] = useState(0);
    const [tmp, setKrwCost] = useState(userState.krwCost);
    const [reRender, setReRenter] = useState(true);
    const [rechartsStockData, setRechartsStockData] = useState({});
    const [rechartsCategoryData, setRechartsCategoryData] = useState({});
    // const [rechartsData, setRechartsData] = useState({})

    const handleReRender = () => setReRenter((prev) => !prev);
    const handleKrTodayEarning = (earning) => {
        setKrTodayEarning((prev) => prev + earning);
    };
    const handleUsaTodayEarning = (earning) => {
        setUsaTodayEarning((prev) => prev + earning);
    };
    const handleUsdCost = (cost) => {
        setUsdCost((prev) => prev + cost);
    };

    const handleKoreanCost = (cost) => {
        setKoreanCost((prev) => prev + cost);
    };
    const handleNowKrValue = (cost) => {
        setNowKrValue((prev) => prev + cost);
    };
    const handleNowUsaValue = (cost) => {
        setNowUsaValue((prev) => prev + cost);
    };
    const [row, setRow] = useState([
        {
            symbol: "ss",
            name: "",
            cost: "",
            marketValue: "",
            return: "",
        },
    ]);

    useEffect(() => {
        console.log("koreanCost:", koreanCost);
    }, [koreanCost]);

    useEffect(() => {
        console.log("usdCost:", usdCost);
    }, [usdCost]);

    useEffect(() => {
        console.log("nowKrValue:", nowKrValue);
    }, [nowKrValue]);

    useEffect(() => {
        console.log("nowUsaValue:", nowUsaValue);
    }, [nowUsaValue]);

    const { id } = useParams();

    // useEffect(() => {
    //     setKoreanCost(userState.krwCost);
    // }, [userState.krwCost]);
    // useEffect(async () => {
    //     axios
    //         .get(`/portfolio/${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${userState.loginInfo.access_token}`,
    //             },
    //         })
    //         .then((e) => {
    //             console.log("axios.olioId}`:", e);
    //             // getstock Category 결과값: {미국 주식: Array(4), 한국 주식: Array(2)}
    //             // setStockCategoryList(e.data.assetCategory.stockCategory);
    //         });
    // }, []);

    // useEffect(() => {
    // }, [userState.rerender]);

    useEffect(() => {
        axios
            .get("/krwusd", {
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            })
            .then((res) => {
                var currencyRate = res.data.rate;
                setCurrencyRate(currencyRate);
            });
    }, []);

    useEffect(() => {
        setRechartsStockData([]);
        setRechartsCategoryData([]);
        axios
            .get(`/portfolio/${id}/status`, {
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            })
            .then((res) => {
                console.log("status result:", res.data.assetRatio);
                var tmp = "test";
                var cnt = 0;
                var obj1 = res.data.assetRatio.stockRatios;
                // key는 미국주식, 한국주식... value는 [goalRatio , nowRatio ,,,]
                for (const [key, value] of Object.entries(obj1)) {
                    console.log("key, value:", key, value);
                    value.map((e2) => {
                        console.log("e2:", e2);
                        if (e2.nowRatio) {
                            setRechartsStockData((prev) => [
                                ...prev,
                                {
                                    country: e2.stock.country,
                                    stockCode: e2.stock.code,
                                    stockName: e2.stock.name,
                                    nowRatio: e2.nowRatio,
                                },
                            ]);
                            cnt += e2.nowRatio;
                        }
                    });
                    if (cnt) {
                        setRechartsCategoryData((prev) => [
                            ...prev,
                            {
                                categoryName: key,
                                nowRatio: cnt,
                            },
                        ]);
                    }
                    cnt = 0;
                }
                console.log("test::", res.data.assetRatio.cashRatios);
                var cashArr = res.data.assetRatio.cashRatios["Cash"];
                if (cashArr) {
                    cashArr.map((e3) => {
                        if (e3.nowRatio) {
                            setRechartsStockData((prev) => [
                                ...prev,
                                {
                                    country: null,
                                    stockCode: e3.country,
                                    stockName:
                                        e3.country == "korea" ? "KRW" : "USD",
                                    nowRatio: e3.nowRatio,
                                },
                            ]);
                            cnt += e3.nowRatio;
                        }
                    });
                }
                if (cnt) {
                    setRechartsCategoryData((prev) => [
                        ...prev,
                        {
                            categoryName: "현금",
                            nowRatio: cnt,
                        },
                    ]);
                }
            });
    }, [userState.rerender]);
    useEffect(() => {
        console.log("rechartsStockData:", rechartsStockData);
        console.log("rechartsCategoryData:", rechartsCategoryData);
    }, [rechartsStockData]);
    // useEffect(() => {
    //     axios
    //         .get("/krwusd", {
    //             headers: {
    //                 Authorization: `Bearer ${userState.loginInfo.access_token}`,
    //             },
    //         })
    //         .then((res) => {
    //             var currencyRate = res.data.rate;

    //             setUsdCost(currencyRate * userState.usdCost);
    //             console.log("res:", res);
    //         });
    // }, [userState.usdCost]);

    useEffect(() => {
        console.log("diverse:", id);
        // setKrwCost(userState.krwCost);
        console.log("userstate useeff:", userState);
        console.log("userState.krwCost:", userState.krwCost);
        console.log("userState.krwCost:", userState.usdRealTimeValue);
    }, [userState]);

    const handleAddRow = () => {
        const item = {
            symbol: "gggss",
            name: "",
            cost: "",
            marketValue: "",
            return: "",
        };
        setRow([...row, item]);
        // this.setState({
        //     rows: [...this.state.rows, item],
        // });
        console.log(row);
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <div>
            <Background>
                <Container2>
                    <WatchListContainer>
                        <div className="watchlist">
                            포트폴리오 {"            "}
                            {/* <Link to="/portfolio/add">
                                <span className="portfolio_add">
                                    +새로운 포트폴리오
                                </span>
                            </Link> */}
                        </div>

                        {/* KRWFormModal */}
                    </WatchListContainer>
                    <FlexContainer>
                        <div className="divbox">
                            <div>
                                <small>오늘 수익</small>
                                <h2>
                                    ￦
                                    {numberWithCommas(
                                        (
                                            krTodayEarning +
                                            currencyRate * usaTodayEarning
                                        ).toFixed(0)
                                    )}
                                </h2>
                            </div>
                            <div></div>
                            <div className="box_right">
                                <small>
                                    {" "}
                                    {(
                                        ((krTodayEarning +
                                            currencyRate * usaTodayEarning) /
                                            (nowKrValue +
                                                nowUsaValue * currencyRate -
                                                (krTodayEarning +
                                                    currencyRate *
                                                        usaTodayEarning))) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </small>
                            </div>
                        </div>
                        <div className="divbox">
                            <div>
                                <small>총 평가순익</small>
                                <h2>
                                    ￦
                                    {numberWithCommas(
                                        (
                                            nowKrValue +
                                            nowUsaValue * currencyRate -
                                            (koreanCost +
                                                usdCost * currencyRate)
                                        ).toFixed(0)
                                    )}
                                </h2>
                            </div>
                            <div></div>
                            <div className="box_right">
                                <small>
                                    {" "}
                                    {numberWithCommas(
                                        (
                                            ((nowKrValue +
                                                nowUsaValue * currencyRate -
                                                (koreanCost +
                                                    usdCost * currencyRate)) /
                                                (koreanCost +
                                                    usdCost * currencyRate)) *
                                            100
                                        ).toFixed(2)
                                    )}
                                    %
                                </small>
                            </div>
                        </div>
                        <div className="divbox">
                            <div>
                                <small>주식 매입금</small>
                                {/* <h2>￦{krwCost}</h2> */}
                                <h2
                                // onClick={() =>
                                //     userDispatch({
                                //         type: "krw_cost_update",
                                //         cost: 1000,
                                //     })
                                // }
                                >
                                    ￦
                                    {numberWithCommas(
                                        (
                                            koreanCost +
                                            usdCost * currencyRate
                                        ).toFixed(0)
                                        // currencyRate * userState.usdCost
                                    )}
                                </h2>
                            </div>
                            <div></div>
                        </div>
                        <div className="divbox">
                            <div>
                                <small>주식 평가금</small>
                                <h2>
                                    ￦
                                    {numberWithCommas(
                                        (
                                            nowKrValue +
                                            nowUsaValue * currencyRate
                                        )
                                            // userState.krwRealTimeValue +
                                            // currencyRate *
                                            //     userState.usdRealTimeValue
                                            .toFixed(0)
                                    )}
                                </h2>
                            </div>
                            <div></div>
                        </div>
                        {/* <div>
                            <small>총 평가금액</small>
                            <h2>$630,864.89</h2>
                        </div>
                        <div>
                            <small>총 매입비용</small>
                            <h2>$531,111.60</h2>
                        </div> */}
                    </FlexContainer>
                    <div style={{ marginLeft: "500" }}>
                        {rechartsCategoryData.length &&
                            rechartsStockData.length && (
                                <RechartsDoublePie3
                                    dataAA={rechartsCategoryData}
                                    data02={rechartsStockData}
                                    // style={{ paddingLeft: "1000" }}
                                />
                            )}
                    </div>
                    {/* <RechartsDoublePie2 /> */}
                    {/* <RechartsDoublePie
                        data01={data01}
                        data02={data02}
                        color="red"
                    /> */}
                    {/* {/* <Doughnut2 />  */}
                    <FormModalHooks
                        handleReRender={handleReRender}
                        portfolioId={id}
                        userState={userState}
                    />
                    <CategoryPortfolioTable
                        handleUsdCost={handleUsdCost}
                        setKrwCost
                        portfolioId={id}
                        userState={userState}
                        handleKoreanCost={handleKoreanCost}
                        handleUsdCost={handleUsdCost}
                        handleNowKrValue={handleNowKrValue}
                        handleNowUsaValue={handleNowUsaValue}
                        handleKrTodayEarning={handleKrTodayEarning}
                        handleUsaTodayEarning={handleUsaTodayEarning}
                    />
                    {/* <StockAutoCompleteSearchBar suggestions={[]} /> */}
                    {/* <PortfolioAdd row={row} setRow={setRow} /> */}
                    {/* <ShowAndAddCategory id={id} /> */}
                    <CashTable
                        // setUsdCost
                        // setKrwCost
                        id={id}
                        title="현금"
                        ticker="AAPL"
                        stockName="apple"
                    />
                </Container2>
            </Background>
        </div>
    );
};

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    // background-color: DodgerBlue;
    justify-content: space-between;

    .box_right {
        vertical-align: middle;
        background-color: #eaf9ef;
        width: 10rem;
        padding: 10px;
    }
    .divbox {
        display: flex;
    }
    .divbox > div > small {
        // text-align: left;
        // text-align: justify;

        // display: flex;
    }

    .divbox:first-child > * {
        text-align: left;
    }

    .divbox > div {
        flex: 1 1 1;
    }

    div {
        border-radius: 10px;
        background-color: #fff;
        width: 100%;
        margin: 10px;
        // padding: 10px 20px;
        text-align: left;
        // line-height: 75px;
        font-size: 20px;
        color: #565b75;
    }

    h2 {
        font-size: 20px;
    }
`;

const Background = styled.div`
    width: 100%;
    height: 200vh;
    background-color: #eff0f3;
`;

const Container2 = styled.div`
    width: 1580px;
    margin: auto;
`;
const WatchListContainer = styled.div`
    margin: auto;
    padding-top: 20px;
    margin-bottom: 10px;

    .watchlist {
        padding: 40px 0;
        line-height: 1.4;
        font-size: 2rem;
        font-weight: 900;
        color: #13113c;
        margin-right: 10px;
        margin-bottom: 15px;
        font-family: merriweather, sans-serif, Helvetica, Arial;
    }
`;

export default DiversifiedPortfolio;

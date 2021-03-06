import React, { useEffect, useContext, useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useTable } from "react-table";

import Button from "@material-ui/core/Button";
import "./EasyTableBody.css";
import { GlobalContext } from "../../store/GlobalState";
import { AXIS_LINE_COLOR } from "@gooddata/sdk-ui-charts/dist/highcharts/utils/color";
import ReactTable from "react-table";
// import "react-table/react-table.css";
const COLUMNS = [
    {
        Header: "티커",
        accessor: "ticker",
    },
    {
        Header: "종목명",
        accessor: "stockName",
    },
    {
        Header: "현재가",
        accessor: "nowPrice",
    },
    {
        Header: "등락률",
        accessor: "todayChangePercent",
    },
    {
        Header: "등락",
        accessor: "todayChange",
    },
    {
        Header: "수량",
        accessor: "amount",
    },
    {
        Header: "매입평균가",
        accessor: "avgBuyPrice",
    },
    {
        Header: "매수금",
        accessor: "stockBuyingCost",
    },
    {
        Header: "마켓벨류",
        accessor: "stockMarketValue",
    },
    {
        Header: "총 수익",
        accessor: "earningThisStock",
    },
    {
        Header: "하루 수익",
        accessor: "todayEarningThisStock",
    },
    {
        Header: "수익률",
        accessor: "earningRatioThisStock",
    },
    {
        Header: "Edit",
        accessor: "edit",
    },
    {
        Header: "Delete",
        accessor: "delete",
    },
    // {
    //     Header: "종목명",
    //     accessor: "name",
    // },

    // "티커",s
    // "종목명",
    // "현재가",
    // "등락률",
    // "등락",
    // "주",
    // "매입평균가",
    // "매수금",
    // "마켓벨류",
    // "총 수익",
    // "하루 수익",
    // "수익률",
];
function ReactTableEasy({
    // title,
    // DATA,
    // // userState,
    // portfolioId,
    // handleUsdCost,
    // setKrwCost,
    // handleNowKrValue,
    // handleNowUsaValue,
    // handleKrTodayEarning,
    // handleUsaTodayEarning,
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
    const [decimalPoint, setDecimalPoint] = useState(0);
    const [newStockCodeAndCurrPrice, setNewStockCodeAndCurrPrice] = useState(
        []
    );
    // useEffect(() => {
    //     setNewStockCodeAndCurrPrice(stockCodeAndCurrPrice);
    // }, []);
    useEffect(() => {
        setNewStockCodeAndCurrPrice(stockCodeAndCurrPrice);
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
    const [data2, setData2] = useState([]);
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        // arr : 0: (2) [{…}, {…}]
        // 1: (2) [{…}, {…}]
        // 2: (2) [{…}, {…}]
        // 3: (2) [{…}, {…}]
        setData2([]);
        newStockCodeAndCurrPrice &&
            newStockCodeAndCurrPrice.map((arr) => {
                if (arr[0].data.stock.country == "korea") {
                    setDecimalPoint(0);
                } else {
                    setDecimalPoint(2);
                }
                setData2((prev) => [
                    ...prev,
                    // "티커",s
                    // "종목명",
                    // "현재가",
                    // "등락률",
                    // "등락",
                    // "주",
                    // "매입평균가",
                    // "매수금",
                    // "마켓벨류",
                    // "총 수익",
                    // "하루 수익",
                    // "수익률",
                    {
                        ticker: arr[1].data.code,
                        stockName: arr[0].data.stock.name,
                        nowPrice: numberWithCommas(arr[1].data.price),
                        todayChangePercent: arr[1].data.changePercent + "%",
                        todayChange: arr[1]
                            ? numberWithCommas(
                                  (
                                      arr[1].data.price -
                                      (1 /
                                          (arr[1].data.changePercent / 100 +
                                              1)) *
                                          arr[1].data.price
                                  ).toFixed(2)
                              )
                            : "something went wrong",
                        amount: numberWithCommas(arr[0].data.amount),
                        // "매입평균가",
                        avgBuyPrice: numberWithCommas(arr[0].data.avgPrice),
                        // "매수금",
                        stockBuyingCost: numberWithCommas(
                            (arr[0].data.amount * arr[0].data.avgPrice).toFixed(
                                decimalPoint
                            )
                        ),
                        // "마켓벨류",
                        stockMarketValue: numberWithCommas(
                            (arr[0].data.amount * arr[1].data.price).toFixed(
                                decimalPoint
                            )
                        ),
                        // "총 수익",
                        earningThisStock: numberWithCommas(
                            (
                                arr[0].data.amount *
                                (arr[1].data.price - arr[0].data.avgPrice)
                            ).toFixed(decimalPoint)
                        ),
                        // "하루 수익",
                        todayEarningThisStock: numberWithCommas(
                            (
                                (arr[1].data.price -
                                    (1 /
                                        (arr[1].data.changePercent / 100 + 1)) *
                                        arr[1].data.price) *
                                arr[0].data.amount
                            ).toFixed(decimalPoint)
                        ),

                        // "수익률",
                        earningRatioThisStock: numberWithCommas(
                            (
                                (arr[1].data.price / arr[0].data.avgPrice - 1) *
                                100
                            ).toFixed(2) + "%"
                        ),
                        edit: (
                            <Button
                                // key={i}
                                // newStockInfo={newStockInfo[i].data}
                                // category={title}
                                ticker={arr[0].data.stock}
                                variant="contained"
                                // onClick={() =>
                                //     handleDelete(
                                //         i,
                                //         newStockInfo[i].data.stock,
                                //         title
                                //     )
                                // }
                            >
                                기록
                            </Button>
                        ),
                        delete: (
                            <Button
                                // key={i}
                                // newStockInfo={newStockInfo[i].data}
                                // category={title}
                                ticker={arr[0].data.stock}
                                variant="contained"
                                // onClick={() =>
                                //     handleDelete(
                                //         i,
                                //         newStockInfo[i].data.stock,
                                //         title
                                //     )
                                // }
                            >
                                삭제
                            </Button>
                        ),
                    },
                ]);
            });
    }, [newStockCodeAndCurrPrice]);
    useEffect(() => {
        console.log("newStockCodeAndCurrPrice:", newStockCodeAndCurrPrice);
    }, [newStockCodeAndCurrPrice]);

    useEffect(() => {
        console.log("data2:", data2);
    }, [data2]);

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
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => data2, [data2]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });
    return (
        <div>
            {tableData && tableData.length && (
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ReactTableEasy;

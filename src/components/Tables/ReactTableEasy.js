import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import "./EasyTableBody.css";
import { GlobalContext } from "../../store/GlobalState";
import { AXIS_LINE_COLOR } from "@gooddata/sdk-ui-charts/dist/highcharts/utils/color";
import ReactTable from "react-table";
// import "react-table/react-table.css";

function ReactTableEasy({
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
    return (
        <div>
            {tableData && tableData.length && (
                <ReactTable
                    data={tableData}
                    columns={[
                        {
                            // Header: "Name",
                            columns: [
                                {
                                    Header: "티커",
                                    accessor: "code",
                                },
                                {
                                    Header: "종목명",
                                    accessor: "name",
                                },
                            ],
                        },
                    ]}
                />
            )}
        </div>
    );
}

export default ReactTableEasy;

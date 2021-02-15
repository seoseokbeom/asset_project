import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../../store/GlobalState";

function EasyTable({ title, ticker, stockName, id }) {
    const { userState, userDispatch, stockDispatch } = useContext(
        GlobalContext
    );
    const URL = "/portfolio/" + id;
    console.log(URL);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await axios.get(`/portfolio/${id}`, {
            headers: {
                Authorization: `Bearer ${userState.loginInfo.access_token}`,
            },
        });
        console.log("getdata2 response:", response);
        console.log(
            "response.data.holdings.cashHoldings.korea.balance:",
            response.data.holdings.cashHoldings.korea.balance
        );
        const [KRW, USD] = [
            response.data.holdings.cashHoldings.korea.balance,
            response.data.holdings.cashHoldings.usa.balance,
        ];
        console.log("KRW, USD:", KRW, USD);
        setTableData([KRW, USD]);
        // setTableData(response.data);
    };

    const removeData = (id) => {
        axios.delete(`${URL}/${id}`).then((res) => {
            const del = tableData.filter((employee) => id !== employee.id);
            setTableData(del);
        });
    };

    const renderHeader = () => {
        let headerElement = [
            "현금",
            "예수금",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
        ];

        return headerElement.map((key, idx) => {
            return <th key={idx}>{key.toUpperCase()}</th>;
        });
    };

    const renderBody = () => {
        return (
            tableData &&
            tableData.map((e, i) => {
                return (
                    <tr key={i}>
                        {i == 1 ? <td>USD</td> : <td>KRW</td>}
                        {i == 0 ? <td>{e}</td> : <td>{e}</td>}
                        {/* <td>{KRW}</td>
                        <td>{USD}</td> */}
                        {/* <td>{name}</td>
                        <td>{phone}</td> */}
                        {/* <td className="opration">
                            <button
                                className="button"
                                onClick={() => removeData(id)}
                            >
                                Delete
                            </button>
                        </td> */}
                    </tr>
                );
            })
        );
    };

    return (
        <>
            <h1 id="title" style={{ color: "black" }}>
                {title}
            </h1>
            <table id="employee">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>{renderBody()}</tbody>
            </table>
        </>
    );
}

export default EasyTable;

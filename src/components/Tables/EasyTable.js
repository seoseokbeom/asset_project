import React, { useState, useEffect } from "react";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/users";

function EasyTable({ title, ticker, stockName }) {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await axios.get(URL);
        console.log("getdata response:", response);

        setTableData(response.data);
    };

    const removeData = (id) => {
        axios.delete(`${URL}/${id}`).then((res) => {
            const del = tableData.filter((employee) => id !== employee.id);
            setTableData(del);
        });
    };

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
            "수익",
            "하루 수익",
            "수익률",
        ];

        return headerElement.map((key, idx) => {
            return <th key={idx}>{key.toUpperCase()}</th>;
        });
    };

    const renderBody = () => {
        return (
            tableData &&
            tableData.map(({ id, name, email, phone }) => {
                return (
                    <tr key={id}>
                        <td>{ticker}</td>
                        <td>{stockName}</td>
                        <td>{name}</td>
                        <td>{phone}</td>
                        <td className="opration">
                            <button
                                className="button"
                                onClick={() => removeData(id)}
                            >
                                Delete
                            </button>
                        </td>
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

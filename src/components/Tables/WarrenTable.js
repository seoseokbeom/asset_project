import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BTable from "react-bootstrap/Table";
import { useTable } from "react-table";
import makeData from "./makeData";
import warrenStockData from "../json/warren_buffet_portfolio";

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });
    // console.log(warrenStockData);

    // Render the UI for your table
    return (
        <BTable striped bordered hover size="sm" {...getTableProps()}>
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
            <tbody>
                {rows.map((row, i) => {
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
        </BTable>
    );
}
// "회사코드": "WFC",
//    "회사명": "Wells Fargo",
//    "보유금액($)": "23.89M",
//    "3개월평균 보유금액": "39.51M",
//    "시가총액": "96.21B"
function App() {
    const warrenData = warrenStockData.map(function (warren) {
        var info = {
            회사코드: warren.회사코드,
            lastName: warren.회사명,
            age: warren["보유금액"],
            visits: warren["3개월평균 보유금액"],
            status: warren.시가총액,
        };
        return info;
    });
    // console.log(warrenData);

    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                columns: [
                    {
                        Header: "회사코드",
                        accessor: "회사코드",
                    },
                    {
                        Header: "회사명",
                        accessor: "lastName",
                    },
                ],
            },
            {
                Header: "Info",
                columns: [
                    {
                        Header: "보유금액($)",
                        accessor: "age",
                    },
                    {
                        Header: "3개월평균 보유금액",
                        accessor: "visits",
                    },
                    {
                        Header: "시가총액",
                        accessor: "status",
                    },
                    // {
                    //     Header: "Profile Progress",
                    //     accessor: "progress",
                    // },
                ],
            },
        ],
        []
    );
    // 회사코드	회사명	Age	Visits	Status	Profile Progress
    const data = React.useMemo(
        () => [
            // { 회사코드: "1", lastName: "2", age: "3", visits: "4" },
            // { 회사코드: "1", lastName: "2", age: "3", visits: "4" },
            // { 회사코드: "1", lastName: "2", age: "3", visits: "4" },
            // { 회사코드: "1", lastName: "2", age: "3", visits: "4" },
            ...warrenData,
        ],
        []
    );

    return (
        <div>
            <Table columns={columns} data={data} />
        </div>
    );
}

export default App;

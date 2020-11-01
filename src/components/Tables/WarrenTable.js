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
function App() {
    const warrenData = warrenStockData.map(function (warren) {
        var info = {
            회사코드: warren.회사코드,
            lastName: warren.회사명,
            age: warren["보유금액"],
            visits: warren["보유주식수"],
            status: warren.지분률,
        };
        return info;
    });

    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                columns: [
                    {
                        Header: "회사코드",
                        accessor: "회사코드",

                        style: {
                            background: "red",
                            color: "yellow",
                        },
                        getProps: (state, rowInfo, column) => {
                            return {
                                style: {
                                    background: "red",
                                    color: "yellow",
                                },
                            };
                        },
                    },
                    {
                        Header: "회사명",
                        accessor: "lastName",
                    },
                ],
                style: {
                    background: "red",
                    color: "yellow",
                },
            },
            {
                Header: "Info",
                columns: [
                    {
                        Header: "보유금액",
                        accessor: "age",
                    },
                    {
                        Header: "보유 주식 수",
                        accessor: "visits",
                    },
                    {
                        Header: "지분률",
                        accessor: "status",
                    },
                ],
            },
        ],
        []
    );
    const data = React.useMemo(
        () => [...warrenData.slice(1), warrenData[0]],
        []
    );

    return (
        <div>
            <Table columns={columns} data={data} />
        </div>
    );
}

export default App;

import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
// import { columns, data } from "./dataSource";
import styled from "styled-components";
import PortfolioAdd from "../Content/PortfolioAdd";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./table.css";

export const data = [
    {
        symbol: "Alice",
        name: "Johnson",
        age: 9,
        gender: "F",
        grade: 4,
    },
    {
        firstName: "Mike",
        lastName: "Ford",
        age: 5,
        gender: "M",
        grade: 1,
    },
    {
        firstName: "John",
        lastName: "Smith",
        age: 8,
        gender: "M",
        grade: 4,
    },
    {
        firstName: "Joe",
        lastName: "Johnson",
        age: 11,
        gender: "M",
        grade: 6,
    },
    {
        firstName: "Linda",
        lastName: "Ford",
        age: 8,
        gender: "F",
        grade: 5,
    },
    {
        firstName: "Noah",
        lastName: "Wilson",
        age: 9,
        gender: "M",
        grade: 3,
    },
    {
        firstName: "Emma",
        lastName: "Lee",
        age: 7,
        gender: "F",
        grade: 3,
    },
    {
        firstName: "James",
        lastName: "Jones",
        age: 10,
        gender: "M",
        grade: 5,
    },
    {
        firstName: "Mia",
        lastName: "Brown",
        age: 8,
        gender: "F",
        grade: 5,
    },
    {
        firstName: "William",
        lastName: "Davis",
        age: 11,
        gender: "M",
        grade: 6,
    },
];

export const columns = [
    {
        Header: "종목코드",
        accessor: "symbol",
    },
    {
        Header: "종목명",
        accessor: "name",
    },
    {
        Header: "비용",
        accessor: "cost",
    },
    {
        Header: "평가금액",
        accessor: "marketValue",
    },
    {
        Header: "수익률",
        accessor: "return",
    },
];

export const tmp = [
    {
        symbol: "Alice",
        name: "Johnson",
        age: 9,
        gender: "F",
        grade: 4,
    },
    {
        firstName: "Mike",
        lastName: "Ford",
        age: 5,
        gender: "M",
        grade: 1,
    },
    {
        firstName: "John",
        lastName: "Smith",
        age: 8,
        gender: "M",
        grade: 4,
    },
    {
        firstName: "Joe",
        lastName: "Johnson",
        age: 11,
        gender: "M",
        grade: 6,
    },
    {
        firstName: "Linda",
        lastName: "Ford",
        age: 8,
        gender: "F",
        grade: 5,
    },
    {
        firstName: "Noah",
        lastName: "Wilson",
        age: 9,
        gender: "M",
        grade: 3,
    },
    {
        firstName: "Emma",
        lastName: "Lee",
        age: 7,
        gender: "F",
        grade: 3,
    },
    {
        firstName: "James",
        lastName: "Jones",
        age: 10,
        gender: "M",
        grade: 5,
    },
    {
        firstName: "Mia",
        lastName: "Brown",
        age: 8,
        gender: "F",
        grade: 5,
    },
    {
        firstName: "William",
        lastName: "Davis",
        age: 11,
        gender: "M",
        grade: 6,
    },
];

function PortfolioManageContent() {
    // const columns = useMemo(() => columns, []);
    // const data = useMemo(() => data, []);

    const [row, setRow] = useState([
        {
            symbol: "ss",
            name: "",
            cost: "",
            marketValue: "",
            return: "",
        },
    ]);

    const data = row;
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
    return (
        <Background>
            <Container2>
                <WatchListContainer>
                    <div className="watchlist">
                        포트폴리오 {"            "}
                        <Link to="/portfolio/add">
                            <span className="portfolio_add">
                                +새로운 포트폴리오
                            </span>
                        </Link>
                    </div>
                </WatchListContainer>
                <PortfolioAdd row={row} setRow={setRow} />
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
                    <tfoot>
                        {footerGroups.map((footerGroup) => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {footerGroup.headers.map((column) => (
                                    <td {...column.getFooterProps()}>
                                        {column.render("Footer")}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
            </Container2>
        </Background>
    );
}

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

export default PortfolioManageContent;

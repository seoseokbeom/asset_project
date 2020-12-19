import React, { useMemo, useState, useReducer } from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import PortfolioAdd from "../Content/PortfolioAdd";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./table.css";
import { initialState, userReducer } from "../../store/reducers";

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

function PortfolioManageContent() {
    // const columns = useMemo(() => columns, []);
    // const data = useMemo(() => data, []);
    const [state, dispatch] = useReducer(userReducer, initialState);

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

    const getPortfolioStatus = () => {
        dispatch({ type: "get_portfolio_status" });
    };

    return (
        <Background>
            <Container2>
                <WatchListContainer>
                    <div className="watchlist" onClick={getPortfolioStatus}>
                        포트폴리오 {"            "}
                        <Link to="/portfolio/add">
                            <span className="portfolio_add">
                                +새로운 포트폴리오
                            </span>
                        </Link>
                    </div>
                </WatchListContainer>
                <Link
                    to="/portfolio/diverse"
                    style={{
                        textDecoration: "none",
                        color: "black",
                    }}
                >
                    <Container3
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        내가만든포트폴리오1
                    </Container3>
                </Link>
                {/* <PortfolioAdd row={row} setRow={setRow} />
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
                </table> */}
            </Container2>
        </Background>
    );
}

const Container3 = styled.div`
    margin: 0 20px;
    height: 130px;
    width: 100%;
    background-color: white;
    color: balck;
    padding: 30px;
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

export default PortfolioManageContent;

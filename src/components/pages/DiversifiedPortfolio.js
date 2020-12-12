import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import PortfolioAdd from "../Content/PortfolioAdd";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./table.css";

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

const DiversifiedPortfolio = () => {
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
        <div>
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
                    <FlexContainer>
                        <div className="divbox">
                            <div>
                                <small>오늘 수익률</small>
                                <h2>+$6,927.93</h2>
                            </div>
                            <div></div>
                            <div className="box_right">
                                <small> 수익률 1.10%</small>
                            </div>
                        </div>
                        <div className="divbox">
                            <div>
                                <small>총 평가순익</small>
                                <h2>+$99,753.29</h2>
                            </div>
                            <div></div>
                            <div className="box_right">
                                <small> 수익률 1.10%</small>
                            </div>
                        </div>
                        <div>
                            <small>총 평가금액</small>
                            <h2>$630,864.89</h2>
                        </div>
                        <div>
                            <small>총 매입비용</small>
                            <h2>$531,111.60</h2>
                        </div>
                    </FlexContainer>

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
        background-color: yellow;
        margin: 10px;
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

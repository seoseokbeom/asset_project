import React, { useState, useReducer, useContext, useEffect } from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import PortfolioAdd from "../Content/PortfolioAdd";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import "./table.css";
import produce from "immer";

// import { initialState, userReducer } from "../../store/reducers";
import { GlobalContext } from "../../store/GlobalState";

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
    const { userState, userDispatch, stockDispatch } = useContext(
        GlobalContext
    );
    const [userId, setUserId] = useState([]);
    const [portfolioInfo, setPortfolioInfo] = useState([]);

    async function getUser(ID) {
        try {
            const response = await axios.get(`/portfolio/${ID}`, {
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            });
            console.log("response:", response);
        } catch (error) {
            console.log("err:", error);
        }
    }
    useEffect(() => {
        axios
            .get("/user", {
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            })
            .then((res) => {
                console.log("getuser succeed1:", res.data);
                console.log("getuser succeed2:", res.data.portfolios);
                setUserId(() => [...res.data.portfolios]);

                return userId;
            })
            .then((res) => {
                // res.map((ID) => {
                //     setInterval(getUser(ID), 1000);
                // });
                // console.log("res:", res);
                // userId.map((ID) => {
                //     setInterval(getUser(ID), 1000);
                // });
            })
            .catch((err) => console.log("err:", err));
    }, []);

    useEffect(() => {
        console.log("userId:", userId);
        // console.log("now state:", userState);
        userId.map((ID) => {
            axios
                .get(`/portfolio/${ID}`, {
                    headers: {
                        Authorization: `Bearer ${userState.loginInfo.access_token}`,
                    },
                })
                .then((res) => {
                    setPortfolioInfo(
                        (currState) => [...currState, res],
                        console.log("portfolioINFO:", portfolioInfo)
                    );
                    // console.log("portfolio/ res:", res);
                    // console.log("portfolioINFO:", portfolioInfo);
                });
            // .then(console.log("portfolioINFO:", portfolioInfo));
        });
    }, [userId]);

    useEffect(() => {
        console.log("portfolioINFO2:", portfolioInfo);
    }, [portfolioInfo]);

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
        console.log(row);
    };
    const ab = (props) => {
        const value = props.value;
        value.map((id) => {
            <Container3
                style={{
                    fontWeight: "bold",
                }}
            >
                포트폴리오
            </Container3>;
            <br />;
        });
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
                {portfolioInfo.map((res) => {
                    console.log("res.data.name:", res.data.name);
                    return (
                        <Link
                            to={`/portfolio/diverse/${res.data.portfolioId}`}
                            style={{ textDecoration: "none" }}
                        >
                            <Container3
                                style={{
                                    color: "black",
                                }}
                            >
                                {res.data.name}
                            </Container3>
                        </Link>
                    );
                })}
                {/* {portfolioInfo.map((portfolioData) => {
                    console.log("portfolioData:", portfolioData);
                    <Container3>{portfolioData.data.name}</Container3>;
                })} */}

                {/* {console.log("userId:", userId)} */}
                {/* {console.log(
                    "userState.portfolioInfo:",
                    userState.portfolioInfo
                )} */}
                {/* {userState.portfolioInfo.map((obj) => (
                    <Container3>{obj.portfolioName}</Container3>
                ))} */}
                {/* {userId.map(
                    (portfolioId) => (
                        // <span>{portfolioId}</span>
                        <Container3>{portfolioId}</Container3>
                    )
                    // axios
                    //     .get(`/portfolio/${portfolioId}`, {
                    //         headers: {
                    //             Authorization: `Bearer ${userState.loginInfo.access_token}`,
                    //         },
                    //     })
                    //     .then((res) => {
                    //         console.log("res:", res);
                    //         // <Container3>sdf</Container3>;
                    //     })
                    //     .catch((err) => console.log("err"))
                )} */}
                {/* {userId.map((id) =>
                    axios
                        .get(`/portfolio/${id}`, {
                            headers: {
                                Authorization: `Bearer ${userState.loginInfo.access_token}`,
                            },
                        })
                        .then((res) => {
                            console.log("userid portfolio info:", res);
                        })
                        .catch((err) => console.log(err))
                )} */}

                {/* {userId.length &&
                    userId.map((id) =>
                        axios
                            .get(`/portfolio/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                                },
                            })
                            .then((res) => {
                                console.log("res:", res);
                                <p>{res.data.owner}</p>;
                            })
                    )} */}
                {/* <Container3>a</Container3>
                <Container3>b</Container3> */}
                {/* {userState.portfolioIdList.map(
                    (id) =>
                        axios
                            .get(`/portfolio/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                                },
                            })
                            .then((res) => {
                                console.log("getPortfolio succeed:", res);
                                // userState = {
                                //     ...userState,
                                //     portfolioIdList: res.data.portfolios,
                                // };
                            })
                    // .then((res) => {
                    //     console.log("now state:", userState);
                    //     <Container3>{id}</Container3>;
                    // })
                )} */}
                {/* {ab} */}
                {/* <Container3  */}
                {/* {ab} */}
                {/* <Container3
                    style={{
                        fontWeight: "bold",
                    }}
                >
                    포트폴리오
                </Container3> */}
                {/* <Link
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
                </Link> */}
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
    margin: 20px 20px;
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

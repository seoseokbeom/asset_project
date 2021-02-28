import React, { useState, useReducer, useContext, useEffect } from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import PortfolioAdd from "../Content/PortfolioAdd";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import "./table.css";
import produce from "immer";
import MenuIcon from "@material-ui/icons/Menu";
import MenuIconThreeDots from "../Form/MenuIconThreeDots";
import AlertDialogModal from "../Form/AlertDialogModal";

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
            })
            .catch((err) => console.log("err:", err));
    }, []);

    useEffect(() => {
        console.log("userId:", userId);
        setPortfolioInfo([]);
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
                });
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

    const handleDeletePortfolio = async (portfolioId) => {
        console.log("portfolioId?:", portfolioId);
        const result = await axios.delete(`/portfolio/${portfolioId}`, {
            headers: {
                Authorization: `Bearer ${userState.loginInfo.access_token}`,
            },
        });
        console.log("result:", result);
        const newList = userId.filter((item) => item !== portfolioId);
        setUserId(newList);
    };

    const handleUserId = (param) => {
        setUserId(param);
    };

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
                    console.log("res.data.portfolioId:", res.data.portfolioId);
                    return (
                        <div>
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
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <MenuIcon style={{ fontSize: 25 }} />
                                    </div>
                                </Container3>
                            </Link>
                            <span
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <AlertDialogModal
                                    // userState={userState}
                                    portfolio_Id={res.data.portfolioId}
                                    // setUserId={setUserId}
                                    handleUserId={handleUserId}
                                    userId={userId}

                                    // portfolioInfo={res.data.portfolioId}
                                />
                                {/* <br />
                                <hr />
                                <div
                                    onClick={() =>
                                        handleDeletePortfolio(
                                            res.data.portfolioId
                                        )
                                    }
                                >
                                    .......
                                </div> */}
                                <MenuIconThreeDots
                                    portfolioId={res.data.portfolioId}
                                    onClick={() =>
                                        handleDeletePortfolio(
                                            res.data.portfolioId
                                        )
                                    }
                                />
                            </span>
                        </div>
                    );
                })}
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

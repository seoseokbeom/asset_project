import React, { useEffect, useState, useReducer, useContext } from "react";
// import React from "react";
import "./WallHeader.css";
// import compass from "../images/compass.png";
// import Kakao from "../images/kakao_login_medium_narrow.png";
import brandImg from "./../images/SVG/brand_icon.svg";
import KaKaoLogin from "react-kakao-login";
import axios from "axios";
import styled from "styled-components";
import { login_user, getuser, handleLogout } from "../../store/reducers";
import WarrenBuffet from "../Content/WarrenBuffet";
import PortfolioAdd from "../Content/PortfolioAdd";
import IntroPageContent from "../Content/IntroPageContent";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { GlobalContext } from "../../store/GlobalState";

const WallHeader = (props) => {
    const { userState, userDispatch, stockDispatch } = useContext(
        GlobalContext
    );
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setLoggedIn(true);
            console.log("loggedInUser:", loggedInUser);
            const foundUser = JSON.parse(loggedInUser);
            console.log("foundUser:", foundUser);
            userDispatch({
                type: "userState_update",
                access_token: foundUser.data.accessToken,
                id: foundUser.data.userId,
            });
        }
        // }
    }, []);

    // useEffect(() => {
    // const loggedInUser = localStorage.getItem("user");
    // console.log(
    //     'localStorage.getItem("user")2:',
    //     localStorage.getItem("user")
    // );
    // console.log("Hi");
    // console.log("userState:", userState);
    // });

    const responseFail = (err) => {
        console.log("login failed", err);
    };

    const responseKaKao = (res) => {
        axios
            .post("/user/login", {
                socialType: "kakao",
                socialToken: res.response.access_token,
            })
            .then((res) => {
                console.log("res", res);
                localStorage.setItem("user", JSON.stringify(res));
                userDispatch({
                    type: "userState_update",
                    access_token: res.data.accessToken,
                    id: res.data.userId,
                });
                setLoggedIn(true);
            })
            .catch((err) => alert("1111111111"));
    };

    return (
        <header className="navbar">
            <div className="navbar__title navbar__item">
                <Link to="/" className="navbar__item">
                    <img className="brand_img" src={brandImg} alt="brand_img" />
                    {"    "}
                    <span className="bold_nav"> Assetlocation</span>
                </Link>
            </div>
            <div
                className="navbar__item"
                // onClick={() => userDispatch({ type: "stock_auto_complete" })}
            >
                <Link to="/portfolio" className="navbar__item">
                    포트폴리오
                </Link>
            </div>
            <div className="navbar__item">
                <Link to="/warren" className="navbar__item">
                    워렌버핏
                </Link>
            </div>
            {/* <div
                className="navbar__item"
                onClick={() =>
                    userDispatch({ type: "get_now_price", code: "qqq" })
                }
            >
                통계
            </div>
            <div
                className="navbar__item"
                onClick={() => console.log(userState.loginInfo.access_token)}
            >
                뉴스
            </div> */}
            <div className="navbar__item">
                {loggedIn ? (
                    <div>
                        <div
                            className="navbar__item"
                            onClick={
                                () => {
                                    axios
                                        .delete("/user/logout", {
                                            headers: {
                                                Authorization: `Bearer ${userState.loginInfo.access_token}`,
                                            },
                                        })
                                        .then((res) => {
                                            userDispatch({
                                                type: "userState_update",
                                                access_token: "",
                                                id: "",
                                            });
                                            console.log(
                                                "----------------------logout succeed",
                                                res
                                            );
                                            localStorage.clear();
                                            setLoggedIn(false);
                                        })
                                        .catch((err) => {
                                            const loggedInUser = localStorage.getItem(
                                                "user"
                                            );
                                            alert("22222222");
                                            if (loggedInUser) {
                                                console.log(
                                                    "type:",
                                                    typeof loggedInUser
                                                );
                                                console.log(
                                                    "loggedInUser:",
                                                    loggedInUser
                                                );
                                                const foundUser = JSON.parse(
                                                    loggedInUser
                                                );
                                                console.log(
                                                    "foundUser:",
                                                    foundUser
                                                );
                                                axios
                                                    .post("/user/refresh", {
                                                        userId:
                                                            foundUser.data
                                                                .userId,
                                                        accessToken:
                                                            foundUser.data
                                                                .accessToken,
                                                        refreshToken:
                                                            foundUser.data
                                                                .refreshToken,
                                                    })
                                                    .then((res) => {
                                                        console.log(
                                                            "refresh succ:",
                                                            res
                                                        );
                                                        axios
                                                            .delete(
                                                                "/user/logout",
                                                                {
                                                                    headers: {
                                                                        Authorization: `Bearer ${userState.loginInfo.access_token}`,
                                                                    },
                                                                }
                                                            )
                                                            .then((res) => {
                                                                userDispatch({
                                                                    type:
                                                                        "userState_update",
                                                                    access_token:
                                                                        "",
                                                                    id: "",
                                                                });
                                                                console.log(
                                                                    "logout succeed",
                                                                    res
                                                                );
                                                                localStorage.clear();
                                                                setLoggedIn(
                                                                    false
                                                                );
                                                            });
                                                    })
                                                    .catch((res) => alert(res));
                                                // console.log(
                                                //     "loggedInUser:",
                                                //     loggedInUser
                                                // );
                                                // console.log(foundUser);
                                                //     console.log(
                                                //         foundUser.accessToken
                                                //     );
                                                //     console.log(
                                                //         foundUser.refreshToken
                                                //     );
                                                //     axios
                                                //         .post("/user/refresh", {
                                                //             userId:
                                                //                 foundUser.userId,
                                                //             accessToken:
                                                //                 foundUser.accessToken,
                                                //             refreshToken:
                                                //                 foundUser.refreshToken,
                                                //         })
                                                //         .catch((res) => alert(res));
                                            }
                                        });
                                }
                                // userDispatch({ type: "logout_user" })
                            }
                        >
                            Logout
                        </div>
                        {/* <div
                            className="navbar__item"
                            onClick={() => getuser(userState)}
                        >
                            getUser
                        </div> */}
                    </div>
                ) : (
                    (console.log("userState:", userState),
                    (
                        <KaKaoBtn
                            jsKey={"af45d260886da3efeecc059923fb619e"}
                            buttonText="카카오 kakao"
                            onSuccess={responseKaKao}
                            // onSuccess={responseKaKao}
                            onFailure={responseFail}
                            getProfile={true}
                        />
                    ))
                )}
            </div>
            {/* </Router> */}
        </header>
    );
};

const KaKaoBtn = styled(KaKaoLogin)`
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    background-color: #ffeb00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
    }
`;

export default WallHeader;

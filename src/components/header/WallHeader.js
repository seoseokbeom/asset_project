import React, { useEffect, useState, useReducer } from "react";
// import React from "react";
import "./WallHeader.css";
// import compass from "../images/compass.png";
// import Kakao from "../images/kakao_login_medium_narrow.png";
import brandImg from "./../images/SVG/brand_icon.svg";
import KaKaoLogin from "react-kakao-login";
import axios from "axios";
import styled from "styled-components";
import { userReducer, initialState } from "../../store/reducers";
import WarrenBuffet from "../Content/WarrenBuffet";
import PortfolioAdd from "../Content/PortfolioAdd";
import IntroPageContent from "../Content/IntroPageContent";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const WallHeader = (props) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        console.log(
            'localStorage.getItem("user")2:',
            localStorage.getItem("user")
        );
        if (loggedInUser) {
            console.log("Hi");
            console.log("state:", state);
        }
    });
    const responseFail = (err) => {
        alert("login failed", err);
    };

    const tmp = (res) => {
        console.log("1", res);
        // console.log()
        dispatch({ type: "login_user", res });
        console.log("2");
    };

    return (
        <header className="navbar">
            <div
                className="navbar__title navbar__item"
                onClick={() => dispatch({ type: "create_portfolio" })}
            >
                <Link to="/" className="navbar__item">
                    <img className="brand_img" src={brandImg} alt="brand_img" />
                    {"    "}
                    <span className="bold_nav"> Assetlocation</span>
                </Link>
            </div>
            {/* <div className="navbar__item">
                        <Link to="/">홈</Link>
                    </div> */}
            <div
                className="navbar__item"
                onClick={() => dispatch({ type: "stock_auto_complete" })}
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
            <div
                className="navbar__item"
                onClick={() => dispatch({ type: "get_now_price", code: "qqq" })}
            >
                통계
            </div>
            <div className="navbar__item">뉴스</div>
            {/* <div>
                <div
                    className="navbar__item"
                    onClick={() => dispatch({ type: "logout_user" })}
                >
                    Logout
                </div>
                <div
                    className="navbar__item"
                    onClick={() => dispatch({ type: "getuser" })}
                >
                    getUser
                </div>
            </div> */}
            <div
                className="navbar__item"
                key={initialState.loginInfo.access_token}
            >
                {" "}
                {initialState.loginInfo.access_token ? (
                    <div>
                        <div
                            className="navbar__item"
                            onClick={() => dispatch({ type: "logout_user" })}
                        >
                            Logout
                        </div>
                        <div
                            className="navbar__item"
                            onClick={() => dispatch({ type: "getuser" })}
                        >
                            getUser
                        </div>
                    </div>
                ) : (
                    <KaKaoBtn
                        jsKey={initialState.loginInfo.jsKey}
                        buttonText="카카오 kakao"
                        onSuccess={tmp}
                        // onSuccess={responseKaKao}
                        onFailure={responseFail}
                        getProfile={true}
                    />
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
// function WallHeader() {
//     return <div></div>;
// }

export default WallHeader;

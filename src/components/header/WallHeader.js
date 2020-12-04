import React, { Component } from "react";
// import React from "react";
import "./WallHeader.css";
// import compass from "../images/compass.png";
// import Kakao from "../images/kakao_login_medium_narrow.png";
import brandImg from "./../images/SVG/brand_icon.svg";
import KaKaoLogin from "react-kakao-login";
import axios from "axios";
import styled from "styled-components";
import WarrenBuffet from "../Content/WarrenBuffet";
import PortfolioAdd from "../Content/PortfolioAdd";
import IntroPageContent from "../Content/IntroPageContent";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class WallHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "kakao",
            jsKey: "af45d260886da3efeecc059923fb619e",
            access_token: "",
            id: "",
            user: {},
        };
    }
    componentDidMount(prevProps) {
        const loggedInUser = localStorage.getItem("user");
        console.log(
            'localStorage.getItem("user")2:',
            localStorage.getItem("user")
        );
        if (loggedInUser) {
            console.log("Hi");
            console.log(loggedInUser);
            console.log(JSON.parse(loggedInUser));
            const foundUser = JSON.parse(loggedInUser);
            const user = foundUser;
        }
    }
    responseKaKao = (res) => {
        this.setState({
            data: res,
            access_token: res.response.access_token,
            id: res.profile.id,
        });
        console.log(JSON.stringify(this.state.data));
        console.log(JSON.stringify(this.state.access_token));
        axios
            .post("/user/login", {
                socialType: "kakao",
                socialToken: res.response.access_token,
            })
            .then((res) => {
                console.log(res);
                if (res && res.status != 404) {
                    console.log("response:", res);
                    console.log("access_token:", res.data.accessToken);
                    const token = res.data.accessToken;
                    console.log("Login Successed!");

                    this.setState({
                        data: res,
                        access_token: res.data.accessToken,
                        id: res.data.userId,
                    });
                    // console.log(JSON.stringify(res.data))
                    localStorage.setItem("user", JSON.stringify(res.data));
                    console.log(
                        'localStorage.getItem("user"):',
                        localStorage.getItem("user")
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    responseFail = (err) => {
        alert(err);
    };

    render() {
        return (
            <header className="navbar">
                {/* <ul>
                    </ul> */}

                <div className="navbar__title navbar__item ">
                    <Link to="/" className="navbar__item">
                        <img
                            className="brand_img"
                            src={brandImg}
                            alt="brand_img"
                        />
                        {"    "}
                        <span className="bold_nav"> Assetlocation</span>
                    </Link>
                </div>
                {/* <div className="navbar__item">
                        <Link to="/">홈</Link>
                    </div> */}
                <div className="navbar__item">
                    <Link to="/portfolio" className="navbar__item">
                        포트폴리오
                    </Link>
                </div>
                <div className="navbar__item">
                    <Link to="/warren" className="navbar__item">
                        워렌버핏
                    </Link>
                </div>
                <div className="navbar__item">통계</div>
                <div className="navbar__item">뉴스</div>
                <div className="navbar__item">
                    {" "}
                    <KaKaoBtn
                        jsKey={this.state.jsKey}
                        buttonText="카카오 kakao"
                        onSuccess={this.responseKaKao}
                        onFailure={this.responseFail}
                        getProfile={true}
                    />
                    {/* <img
                        jsKey={"af45d260886da3efeecc059923fb619e"}
                        // buttonText="KaKao"
                        onSuccess={this.responseKaKao}
                        onFailure={this.responseFail}
                        getProfile={true}
                        src={Kakao}
                        alt="Kakao"
                        className="kakao_login"
                    /> */}
                </div>
                {/* </Router> */}
            </header>
        );
    }

    // render() {
    //     // window.Kakao.init("af45d260886da3efeecc059923fb619e");
    //     return (
    //         <header className="navbar">
    //             <div className="navbar__title navbar__item ">
    //                 <img className="brand_img" src={brandImg} alt="brand_img" />{" "}
    //                 Assetlocation
    //             </div>
    //             <div className="navbar__item">포트폴리오</div>
    //             <div className="navbar__item">워렌버핏</div>
    //             <div className="navbar__item">통계</div>
    //             <div className="navbar__item">뉴스</div>
    //             <div className="navbar__item">
    //                 {" "}
    //                 <KaKaoBtn
    //                     jsKey={"2b67838751764359be17923f29aa820e"}
    //                     buttonText="KaKao 계정으로 로그인"
    //                     onSuccess={this.responseKaKao}
    //                     onFailure={this.responseFail}
    //                     getProfile={true}
    //                 />
    //                 {/* <img
    //                     jsKey={"af45d260886da3efeecc059923fb619e"}
    //                     // buttonText="KaKao"
    //                     onSuccess={this.responseKaKao}
    //                     onFailure={this.responseFail}
    //                     getProfile={true}
    //                     src={Kakao}
    //                     alt="Kakao"
    //                     className="kakao_login"
    //                 /> */}
    //             </div>
    //         </header>
    //     );
    // }
}

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

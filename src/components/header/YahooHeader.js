import React from "react";
import "./Header.css";
import compass from "../images/compass.png";
import Kakao from "../images/kakao_login_medium_narrow.png";

function YahooHeader() {
    return (
        <section className="header">
            <section className="header-upper"></section>
            <section className="header-vertically-mid">
                <section className="header2 layout">
                    <section className="header-left">
                        <section className="header-left-logo">
                            <a href="/" className="header-logo">
                                <img src={compass} alt="" />
                                {"  "}
                                <span className="purple"> 주식</span> 백테스트
                            </a>
                        </section>
                        {/* <section className="header-top_navbar"> </section> */}
                    </section>
                    <section className="header-mid"></section>
                    <section className="header-right">
                        <a href="https://www.qries.com/">
                            <img className="kakao-image" src={Kakao} alt="" />
                        </a>
                    </section>
                </section>
            </section>
            <section className="header-down"></section>
        </section>
    );
}

export default YahooHeader;

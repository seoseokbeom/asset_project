import React from "react";
import "./Logo.css";
import Kakao from "../images/SVG/free_try_kakao.svg";
import grafana from "../images/JPG/grafana.JPG";
import doughnut_chart02 from "../images/JPG/doughnut_chart02.jpg";

function Logo() {
    return (
        <section className="container-name ">
            <div className="layout2">
                <div className="title">
                    <div className="smart_invest">투자를 현명하게</div>
                    <div className="detail_desc">
                        포트폴리오 거래를 기록으로 남기고 정리하세요.
                    </div>
                    <div className="kakao">
                        <img
                            src={Kakao}
                            alt="Kakao"
                            className="kakao_login_logo"
                        />
                    </div>
                </div>
                {/* <div className="right_img"> */}
                <img
                    className="grafana"
                    src={doughnut_chart02}
                    alt="Grafana"
                    style={{ opacity: 0.9, marginTop: 103 }}
                />
                {/* </div>   */}
            </div>
        </section>
    );
}
{
    /* <span className='title_sub'></span> */
}
export default Logo;

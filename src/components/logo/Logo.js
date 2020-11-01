import React from "react";
import "./Logo.css";
import Kakao from "../images/SVG/free_try_kakao.svg";
import grafana from "../images/JPG/grafana.JPG";

function Logo() {
    return (
        <section className="container-name ">
            <div className="layout2">
                <div className="title">
                    <div className="smart_invest">투자를 현명하게</div>
                    <div className="detail_desc">
                        포트폴리오 등록하면 리스크를 분석해드립니다.
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
                <img className="grafana" src={grafana} alt="Grafana" />
                {/* </div>   */}
            </div>
        </section>
    );
}
{
    /* <span className='title_sub'></span> */
}
export default Logo;

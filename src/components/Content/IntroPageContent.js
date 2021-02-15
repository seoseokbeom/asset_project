import React from "react";
import styled from "styled-components";
import portfolioImg from "../images/JPG/portfolioImg.JPG";
import Logo from "../logo/Logo";
import "./IntroPageContent.css";

const IntroPageContent = () => (
    <Container>
        <Logo />
        <Title>
            <div className="main_title">주식 포트폴리오 기록</div>
            <div className="sub_title">
                주식, ETF, 채권, 현금의 움직임을 간단히 포트폴리오로 기록을
                남기세요.
            </div>
        </Title>
        <PortfolioImg>
            <div>
                <img
                    className="portfolio_img"
                    src={portfolioImg}
                    alt="portfolioImg"
                />
            </div>
        </PortfolioImg>
        {/* <div>Hi</div> */}
    </Container>
);

const Container = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 200vh;
    background-color: #eff0f3;
`;

const Title = styled.div`
    position: relative;
    padding-top: 123px;
    text-align: center;
    margin: auto;
    // overflow: hidden;
    width: 757px;
    // height: 115px;
    .main_title {
        position: relative;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 46px;
    }
    .sub_title {
        position: relative;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        line-height: 152.4%;
    }
`;

const PortfolioImg = styled.div`
    position: relative;
    padding-top: 30px;
    margin: auto;
    text-align: center;
    width: 1288px;
    height: 765px;

    .portfolio_img {
        filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.25));
    }
`;
export default IntroPageContent;

import React from "react";
import styled from "styled-components";

function PortfolioManageContent() {
    return (
        <Container>
            <WatchListContainer>
                <div className="watchlist">포트폴리오</div>
            </WatchListContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 200vh;
    background-color: #eff0f3;
`;
const WatchListContainer = styled.div`
    width: 1809px;
    margin: auto;
    height: 677px;
    padding-top: 20px;
    margin-bottom: 10px;
    // margin: 20px 0 10px;
    // background-color: red;

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

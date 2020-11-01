import React, { useState, useEffect } from "react";
// import YahooHeader from "./components/header/YahooHeader";
import WallHeader from "./components/header/WallHeader";
import Logo from "./components/logo/Logo";
import IntroPageContent from "./components/Content/IntroPageContent";
import styled from "styled-components";
// import Pie from "./components/Charts/Pie";
import StockChart from "./components/Charts/StockChart";
import PortfolioManage from "./components/pages/PortfolioManage";
import Doughnut from "./components/Charts/Doughnut";
import buffett from "./components/images/PNG/buffett.png";
import BuffetTable from "./components/Tables/WarrenTable";

function App() {
    return (
        <div className="App">
            <WallHeader />
            <Logo />
            <IntroPageContent />
            <ChartContainer>
                <Img src={buffett} />
                <Doughnut />
                <BuffetTable />
            </ChartContainer>
            <StockChart />
            <PortfolioManage />
        </div>
    );
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((json) => {
                setIsLoaded(true);
                setItems(json);
            });
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="App">
                <WallHeader />
                <Logo />
                <IntroPageContent />
                <ChartContainer>
                    <Img src={buffett} />
                    <Doughnut />
                    <BuffetTable />
                </ChartContainer>
                <StockChart />
                <PortfolioManage />
            </div>
        );
    }
    // return <div className="App"></div>;
}

const ChartContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 720px;
    padding: 1em;
`;

const Img = styled.img`
    max-width: 720px;
`;
export default App;

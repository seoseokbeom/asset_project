import React, { useState, useEffect } from "react";
// import YahooHeader from "./components/header/YahooHeader";
import WallHeader from "./components/header/WallHeader";
import IntroPageContent from "./components/Content/IntroPageContent";
import PortfolioAdd from "./components/Content/PortfolioAdd";
import WarrenBuffet from "./components/Content/WarrenBuffet";

import styled from "styled-components";
// import Pie from "./components/Charts/Pie";
import Logo from "./components/logo/Logo";
import StockChart from "./components/Charts/StockChart";
import PortfolioManage from "./components/pages/PortfolioManage";
import Doughnut from "./components/Charts/Doughnut";
import buffett from "./components/images/PNG/buffett.png";
import BuffetTable from "./components/Tables/WarrenTable";
import BuySellModal from "./components/Form/BuySellModal";
import ModalPopup from "./components/Form/ModalPopup";
import DatePickerExample from "./components/Form/DatePickerExample";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Counter = () => {
    return (
        <div>
            <h1>여기엔 숫자를 담자</h1>
            <button>+ 1</button>
            <button>- 1</button>
        </div>
    );
};

function App() {
    const triggerText = "+";
    const onSubmit = (event) => {
        event.preventDefault(event);
        console.log(event.target.name.value);
        console.log(event.target.email.value);
    };
    return (
        <div
            className="App"
            // style={{
            //     position: "absolute",
            //     left: "50%",
            //     top: "50%",
            //     transform: "translate(-50%, -50%)",
            // }}
        >
            <Router>
                <WallHeader />

                <Switch>
                    <Route exact path="/" component={IntroPageContent} />
                    <Route exact path="/portfolio" component={PortfolioAdd} />
                    ;
                    <Route exact path="/warren" component={WarrenBuffet} />;
                    {/* component={WarrenBuffet} */}
                </Switch>

                {/* <Logo /> */}
                {/* <DatePickerExample /> */}
                {/* <BuySellModal /> */}
                {/* <Counter /> */}
                {/* <IntroPageContent /> */}
                {/* <ModalPopup triggerText={triggerText} onSubmit={onSubmit} /> */}
                {/* <ChartContainer>
                    <Img src={buffett} />
                    <Doughnut />
                    <BuffetTable />
                </ChartContainer> */}
                <StockChart />
                <PortfolioManage />
            </Router>
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

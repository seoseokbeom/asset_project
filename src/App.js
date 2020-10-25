import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Logo from "./components/logo/Logo";
import styled from "styled-components";
// import Pie from "./components/Charts/Pie";
import Doughnut from "./components/Charts/Doughnut";
import buffett from "./components/images/PNG/buffett.png";
import BuffetTable from "./components/Tables/WarrenTable";
function App() {
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
                <Header />
                <Logo />
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            Name: {item.name} | Email: {item.email}
                        </li>
                    ))}
                </ul>
                <ChartContainer>
                    <Img src={buffett} />
                    <Doughnut />
                    <BuffetTable />
                </ChartContainer>
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

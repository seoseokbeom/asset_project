import buffett from "../images/PNG/buffett.png";
import Doughnut from "../Charts/Doughnut";
import BuffetTable from "../Tables/WarrenTable";
import styled from "styled-components";

// import Doughnut from "./components/Charts/Doughnut";
// import buffett from "./components/images/PNG/buffett.png";
function WarrenBuffet() {
    return (
        <div>
            <ChartContainer>
                <Img src={buffett} />
                <Doughnut />
                <BuffetTable />
            </ChartContainer>
        </div>
    );
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

export default WarrenBuffet;

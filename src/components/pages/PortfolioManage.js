import React from "react";
import styled from "styled-components";
import ShortHeader from "../header/ShortHeader";

import PortfolioManageContent from "../Content/PortfolioManageContent";
import DiversifiedPortfolio from "../pages/DiversifiedPortfolio";
import { useLocation } from "react-router-dom";

function PortfolioManage({ history }) {
    const location = useLocation();
    let tmp = null;
    if (history.location.state) {
        tmp = JSON.stringify(history.location.state.data.portfolio_name);
    }
    return (
        <div>
            {tmp && <span>{tmp}</span>}
            <PortfolioManageContent />
            {/* <ShortHeader /> */}
            <DiversifiedPortfolio />
        </div>
    );
}

export default PortfolioManage;

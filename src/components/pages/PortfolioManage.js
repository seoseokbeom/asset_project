import React from "react";
import styled from "styled-components";
import ShortHeader from "../header/ShortHeader";

import PortfolioManageContent from "../Content/PortfolioManageContent";
import { useLocation } from "react-router-dom";

function PortfolioManage({ history }) {
    const location = useLocation();
    let tmp = null;
    if (history.location.state.data.portfolio_name) {
        tmp = JSON.stringify(history.location.state.data.portfolio_name);
    }
    return (
        <div>
            {/* <span>
                {if(history.location.state) {JSON.stringify(history.location.state.data.portfolio_name)}
                }
            </span> */}
            {tmp && <span>{tmp}</span>}
            <PortfolioManageContent />
            {/* <ShortHeader /> */}
            {/* {console.log(
                history,
                "----",
                history.location.state.data.portfolio_name
            )} */}
        </div>
    );
}

export default PortfolioManage;

import React from "react";
import styled from "styled-components";

function ShortHeader() {
    return (
        <div>
            <Header />
        </div>
    );
}
const Header = styled.div`
    height: 72px;
    width: 100%;

    background: #13113c;
`;

export default ShortHeader;

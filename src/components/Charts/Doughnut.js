import React from "react";
import { Doughnut } from "react-chartjs-2";

var Doughnut2 = () => {
    const data = {
        labels: [
            "Bank of America",
            "Wells Fargo",
            "Occidental Petroleum",
            "Delta Air",
            "Coca-Cola",
            "American Express",
            "etc    [단위: M$]",
        ],
        datasets: [
            {
                data: [48.93, 23.89, 19.49, 15.06, 12.99, 7.95, 44],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#E0BBE4",
                    "#957DAD",
                    "#D291BC",
                    "#FFDFD3",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#E0BBE4",
                    "#957DAD",
                    "#D291BC",
                    "#FFDFD3",
                ],
            },
        ],
    };

    return (
        <div>
            <h3>워렌버핏 포트폴리오 비중</h3>
            <Doughnut data={data} />
        </div>
    );
};

export default Doughnut2;

// export default React.createClass({
//     displayName: "DoughnutExample",

//     render() {
//         return (
//         );
//     },
// });

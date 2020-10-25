import React from "react";
import { Doughnut } from "react-chartjs-2";
import warrenStockData from "../json/warren_buffet_portfolio";
import pastelColors from "../json/pastel_tone_colors_hex";
var companyName = warrenStockData.map(function (warren) {
    return warren["회사명"];
});

var volumData = warrenStockData.map(function (warren) {
    return parseFloat(warren["보유금액"].slice(0, -1));
});

var backgroundColor2 = pastelColors.map(function (color) {
    return color["hex"];
});

var Doughnut2 = () => {
    console.log(volumData);
    const data = {
        labels: [
            // "Bank of America",
            // "Wells Fargo",
            // "Occidental Petroleum",
            // "Delta Air",
            // "Coca-Cola",
            // "American Express",
            // "etc    [단위: M$]",
            ...companyName,
        ],
        datasets: [
            {
                data: volumData,
                // [48.93, 23.89, 19.49, 15.06, 12.99, 7.95, 44, 55],
                backgroundColor: backgroundColor2,

                // [

                // "#FF6384",
                // "#36A2EB",
                // "#FFCE56",
                // "#E0BBE4",
                // "#957DAD",
                // "#D291BC",
                // "#FFDFD3",
                // "#E0BBE4",
                // ],
                hoverBackgroundColor: backgroundColor2,
                // [
                //     "#FF6384",
                //     "#36A2EB",
                //     "#FFCE56",
                //     "#E0BBE4",
                //     "#957DAD",
                //     "#D291BC",
                //     "#FFDFD3",
                //     "#E0BBE4",
                // ],
            },
        ],
    };

    for (var i = 0; i < data.labels.length; i++) {}
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

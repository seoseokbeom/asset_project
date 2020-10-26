import React from "react";
import { Doughnut } from "react-chartjs-2";
import warrenStockData from "../json/warren_buffet_portfolio.json";
import pastelColors from "../json/pastel_tone_colors_hex";
var companyName = warrenStockData.map(function (warren) {
    return warren["회사명"];
});

// "id": 0,
// "회사명": "TOTAL",
// "회사코드": "TOTAL",
// "보유주식수": "",
// "보유금액": "$238,386,028,163",
// "지분률": ""

// "id": 1,
// "회사명": "Apple Inc.",
// "회사코드": "AAPL",
// "보유주식수": "1,003,466,264",
// "보유금액": "$115,438,759,011",
// "지분률": "5.90%"
var totalVolum = 238386028163;
var volumData = warrenStockData.map(function (warren) {
    if (warren.id != 0) {
        console.log(
            // Math.round(num * 100) / 100
            Math.round(
                (warren["보유금액"].replace("$", "").replace(/,/g, "") *
                    10000) /
                    totalVolum
            ) / 100
        );
        return parseFloat(
            Math.round(
                (warren["보유금액"].replace("$", "").replace(/,/g, "") *
                    10000) /
                    totalVolum
            ) / 100
        );
    }
});

var backgroundColor2 = pastelColors.map(function (color) {
    return color["hex"];
});

var Doughnut2 = () => {
    // console.log(volumData);
    const data = {
        labels: [
            // "Bank of America",
            // "Wells Fargo",
            // "Occidental Petroleum",
            // "Delta Air",
            // "Coca-Cola",
            // "American Express",
            // "etc    [단위: M$]",
            ...companyName.slice(1),
        ],
        datasets: [
            {
                // data: [48.93, 23.89, 19.49, 15.06, 12.99, 7.95, 44, 55],
                data: volumData.slice(1),
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
            {/* <h3>워렌버핏 포트폴리오</h3> */}
            <Doughnut
                data={data}
                options={{
                    // responsive: true,
                    // maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    // responsive: true,
                    // maintainAspectRatio: true,
                }}
            />
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

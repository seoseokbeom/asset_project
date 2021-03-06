// import "./styles.css";
import React, { useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { pastel_tone } from "../json/pastel_tone_color.js";
import { colors_piecharts } from "../json/colors_for_piecharts.js";

// const dataAA = [
//     { name: "Group A", value: 400 },
//     { name: "Group B", value: 300 },
//     { name: "Group C", value: 300 },
//     { name: "Group D", value: 200 },
// ];
// const data02 = [
//     { name: "A1", value: 100 },
//     { name: "A2", value: 300 },
//     { name: "B1", value: 100 },
//     { name: "B2", value: 80 },
//     { name: "B3", value: 40 },
//     { name: "B4", value: 30 },
//     { name: "B5", value: 50 },
//     { name: "C1", value: 100 },
//     { name: "C2", value: 200 },
//     { name: "D1", value: 150 },
//     { name: "D2", value: 50 },
// ];

export default function RechartsDoublePie3({ dataAA, data02 }) {
    const RADIAN = Math.PI / 180;

    // const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
        name,
        nowRatio,
        categoryName,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontSize={12}
            >
                <tspan textAnchor="middle" dx="0">{`${categoryName}`}</tspan>
                {/* <tspan
                    textAnchor="middle"
                    dx="-40"
                    dy="20"
                >{`${nowRatio.toFixed(1)}%`}</tspan> */}
            </text>
        );
    };
    let renderLabel = (entry) => {
        if (entry.country == "usa") {
            return `${entry.stockCode} 
            ${entry.nowRatio}%`;
        }
        return `${entry.stockName} 
        ${entry.nowRatio}%`;
    };
    useEffect(() => {
        console.log("ratio:", dataAA);
    }, []);

    {
        /* {`${name} `}
                {`${(percent * 100).toFixed(1)}%`} */
    }
    // const renderCustomizedLabel = ({ name, value }) => {
    //     // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     // const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     // const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //     return (
    //         <text textAnchor="middle" dominantBaseline="central">
    //             {`${name} `}
    //         </text>
    //     );
    // };
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    return (
        <PieChart
            width={800}
            height={400}
            margin={{ top: 0, right: 50, left: 150, bottom: 5 }}
        >
            <Pie
                data={dataAA}
                dataKey="nowRatio"
                cx={200}
                cy={200}
                outerRadius={90}
                // fill="#1c1c68"
                fill="#6464c2"
                labelLine={false}
                isAnimationActive={false}
                label={renderCustomizedLabel}
            >
                {dataAA.map((entry, index) => (
                    <Cell
                        fill={
                            pastel_tone[(index + 12) % pastel_tone.length][
                                "hex"
                            ]
                        }
                    />
                ))}
            </Pie>
            <Pie
                data={data02}
                dataKey="nowRatio"
                cx={200}
                cy={200}
                innerRadius={100}
                outerRadius={140}
                // fill="#e35022"
                fill="#82ca9d"
                isAnimationActive={false}
                label={renderLabel}
                allowDataOverflow={true}
            >
                {data02.map((entry, index) => (
                    <Cell
                        fill={
                            colors_piecharts[index % colors_piecharts.length][
                                "hex"
                            ]
                        }
                    />
                ))}
            </Pie>
        </PieChart>
    );
}

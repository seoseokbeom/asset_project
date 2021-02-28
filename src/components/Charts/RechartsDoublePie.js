import React, { PureComponent, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
// import "../../../src/RechartsDoublePie.css";

function RechartsDoublePie({ color, data01, data02 }) {
    useEffect(() => {
        data01 = data01;
        data02 = data02;
    }, []);
    let renderLabel = function (entry) {
        console.log("entry:", entry);
        return `${entry.payload.name} + ${entry.payload.value}`;
    };
    var demoUrl = "https://codesandbox.io/s/pie-chart-of-two-levels-gor24";

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill={color}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    // const renderCustomizedLabel = ({
    //     cx,
    //     cy,
    //     midAngle,
    //     innerRadius,
    //     outerRadius,
    //     percent,
    //     index,
    //     name,
    //     value,
    // }) => {
    //     const RADIAN = Math.PI / 180;
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //     return (
    //         // ${value}
    //         <text
    //             x={x}
    //             y={y}
    //             fill="white"
    //             textAnchor={x > cx ? "start" : "end"}
    //             dominantBaseline="central"
    //             // style={{ fontSize: "20" }}
    //         >
    //             {`${name} ${(percent * 100).toFixed(1)}%`}
    //         </text>
    //     );
    // };
    return (
        <div className="RechartsDoublePie">
            {/* <header className="RechartsDoublePie-header">
                <img src={logo} className="RechartsDoublePie-logo" alt="logo" />
            </header> */}
            <PieChart width={400} height={400}>
                <Pie
                    data={data01}
                    dataKey="value"
                    cx={200}
                    cy={200}
                    outerRadius={100}
                    fill="#8884d8"
                />
                <Pie
                    data={data02}
                    dataKey="value"
                    cx={200}
                    cy={200}
                    innerRadius={110}
                    outerRadius={130}
                    fill="#82ca9d"
                    label={renderCustomizedLabel}
                    style={{
                        textAnchor: "middle",
                        fontSize: "100%",
                        fill: "rgba(0, 0, 0, 0.87)",
                    }}
                />
            </PieChart>
        </div>
    );
}

// label
// textAnchor="middle"
// position="insideBottom"
export default RechartsDoublePie;

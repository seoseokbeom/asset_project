import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Divider, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        minWidth: 400,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

    TextField: {
        width: "5px",
    },
});
export default function SimpleCardGoalRatio({
    categoryAndStockData,
    assetCategory,
    cashRatio,
    userState,
    portfolioId,
}) {
    const [values, setValues] = useState({
        // textmask: "(1  )    -    ",
        // numberformat: "1320",
    });
    const [cash, setCash] = useState({});
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    // 주식카테고리와 주식들 정보
    const [titleStock, setTitleStock] = useState(categoryAndStockData);

    const [categoryAndStockAndRatio, setCategoryAndStockAndRatio] = useState(
        []
    );
    const [sum2, setSum] = useState(0);

    useEffect(() => {
        console.log("categoryAndStockData:", categoryAndStockData);
        setTitleStock(categoryAndStockData);
    }, [categoryAndStockData]);

    // sum1 += parseInt(value);
    useEffect(() => {
        setSum(0);
        Object.entries(values).map(([key, value]) => {
            setSum((prev) => prev + parseFloat(value));
        });
        Object.entries(cash).map(([key, value]) => {
            setSum((prev) => prev + parseFloat(value));
        });
    }, [cash, values]);
    useEffect(() => {
        console.log("values@:", values);
    }, [values]);
    useEffect(() => {
        // console.log("sum2@:", sum2);
        console.log("sum@:", sum2);
    }, [sum2]);
    useEffect(() => {
        setSum(0);
        Object.entries(titleStock).map(([key, value]) => {
            value.map((elem) => {
                console.log(
                    "2c222ode:",
                    elem.stock.code,
                    "goalRatio:",
                    elem.goalRatio
                );
                setSum((prev) => prev + parseFloat(elem.goalRatio));
                setValues((prev) => {
                    return {
                        ...prev,
                        [elem.stock.code]: parseFloat(elem.goalRatio),
                    };
                });
            });
        });

        cashRatio.map((elem, i) => {
            setSum((prev) => prev + parseFloat(elem.goalRatio));
            setCash((prev) => {
                return {
                    ...prev,
                    [i]: parseFloat(elem.goalRatio),
                };
            });
        });
    }, [titleStock]);

    useEffect(() => {
        // console.log("sum2@:", sum2);
        console.log("cash@:", cash);
    }, [cash]);

    const handleSubmit = () => {
        var jsonResult = JSON.parse(`{"ratios":
            {
                "stockRatios": {
                    ${Object.entries(titleStock).map(([key, value]) => {
                        return `"${key}": [${value.map(
                            (elem) =>
                                `{"stock": ${JSON.stringify(elem.stock)},
                                "ratio": ${
                                    values[elem.stock.code]
                                        ? values[elem.stock.code]
                                        : 0
                                }
                            }`
                        )}
                        ]`;
                    })}
                },
                
                "cashRatios": {
                    "Cash": [
                        {"country" : "usa", "ratio" : ${cash[0] ? cash[0] : 0}},
                        {"country" : "korea", "ratio" : ${
                            cash[1] ? cash[1] : 0
                        }}
                    ]
                }
            }
        ,
        "categories": 
        ${JSON.stringify(assetCategory)}
        }`);

        console.log("jsonResult:", jsonResult);

        axios
            .post(`/portfolio/${portfolioId}/goal`, jsonResult, {
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            })
            .then((res) => {
                console.log("goal success");
                alert("저장되었습니다.");
            })
            .catch((err) => {
                console.log("100%");
                alert("100% 합계를 맞춰주세요.");
            });
    };
    const handleCashChange = (event) => {
        const { name, value } = event.target;
        setCash((prev) => {
            return {
                ...prev,
                [name]: parseFloat(value),
            };
        });
    };

    const handleChange = (event) => {
        var sum1 = 0;
        const { name, value } = event.target;
        setValues((prev) => {
            return {
                ...prev,
                [name]: parseFloat(value),
            };
        });
    };

    function NumberFormatCustom(props) {
        const { inputRef, onChange, ...other } = props;

        return (
            <NumberFormat
                {...other}
                getInputRef={inputRef}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                isNumericString
                prefix="$"
            />
        );
    }
    const StyledTextField = withStyles((theme) => ({
        root: {
            // margin: theme.spacing(2),
            width: 50,
            "& .MuiInputBase-root": {
                color: theme.palette.primary.main,
                // height: 60,
                "& input": {
                    textAlign: "right",
                },
            },
        },
    }))(TextField);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <div>합계: {sum2}</div>
                <span style={{ float: "right" }}>
                    {"                 "} 목표 비율 설정
                    {"                 "}
                </span>
                <br />
                {Object.entries(titleStock).map(([key, value]) => {
                    return (
                        <>
                            <div
                                style={{
                                    fontWeight: "bold",
                                    marginBottom: "7px",
                                }}
                            >
                                {key}
                            </div>
                            {value.map((arr) => {
                                return (
                                    <div>
                                        {arr.stock.country == "usa"
                                            ? arr.stock.code
                                            : arr.stock.name}{" "}
                                        {arr.nowRatio}% {"       /        "}
                                        {/* / {arr.goalRatio}% */}
                                        {/* <TextField
                                            id="standard-number"
                                            label="Number"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /> */}
                                        <TextField
                                            id={arr.stock.code}
                                            // id="formatted-numberformat-input"
                                            // label="react-number-format"
                                            // value={values.numberformat}
                                            value={values[arr.stock.code]}
                                            defaultValue={
                                                values[arr.stock.code]
                                            }
                                            min={0}
                                            // value={}
                                            onChange={handleChange}
                                            name={arr.stock.code}
                                            type="number"
                                            InputProps={{
                                                endAdornment: "%",
                                                // inputComponent: NumberFormatCustom,
                                            }}
                                            size="small"
                                        />
                                    </div>
                                );
                            })}

                            <br />
                        </>
                    );
                })}

                <div
                    style={{
                        fontWeight: "bold",
                        marginBottom: "7px",
                    }}
                >
                    현금
                </div>
                {cashRatio.map((elem, i) => {
                    return (
                        <div>
                            {i == 0 ? "KRW" : "USD"}: {elem.nowRatio}% /
                            {/* {elem.goalRatio}% */}
                            <TextField
                                id={i}
                                // id="formatted-numberformat-input"
                                // label="react-number-format"
                                // value={values.numberformat}
                                value={cash[i]}
                                defaultValue={elem.goalRatio}
                                // defaultValue={elem.goalRatio}
                                min={0}
                                // value={}
                                onChange={handleCashChange}
                                name={i}
                                type="number"
                                InputProps={{
                                    endAdornment: "%",
                                    // inputComponent: NumberFormatCustom,
                                }}
                                size="small"
                            />
                        </div>
                    );
                })}
                {/* <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
                </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography> */}
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}

// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from "cross-fetch";
import axios from "axios";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

// function sleep(delay = 0) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     });
// }
function StockAutoComplete3({
    userState,
    stockInfoHandle,
    tickerHandle,

    stockInfo,
    passedStockInfo,
}) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [koreaStocks, setKoreaStocks] = useState([]);
    const [usaStocks, setUsaStocks] = useState([]);
    const [typedValue, setTypedValue] = useState("");
    const loading = open && usaStocks && usaStocks.length === 0;

    useEffect(() => {
        console.log("passedStockInfo last:", passedStockInfo);
    }, [passedStockInfo]);
    const onChangeHandle = async (value) => {
        // use the changed value to make request and then use the result. Which
        console.log("value:", value);
        const response = await axios.get(`/search/prefix/${value}`, {
            headers: {
                Authorization: `Bearer ${userState.loginInfo.access_token}`,
            },
        });

        // const response = await fetch(
        //     "https://country.register.gov.uk/records.json?page-size=5000"
        // );
        // const countries = await response.json();
        console.log("/search/prefix result:", response);
        setKoreaStocks(response.data.koreaStocks);
        setUsaStocks(response.data.usaStocks);
        if (response.data) {
            if (response.data.koreaStocks.length) {
                setOptions(response.data.koreaStocks);
            } else {
                setOptions(response.data.usaStocks);
            }
        }
    };

    useEffect(() => {
        if (!open) {
            setKoreaStocks([]);
            setUsaStocks([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: "100%" }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            // defaultValue={"PLT"}
            // {
            //     code: "PLTR",
            //     country: "usa",
            //     market: "nyse",
            //     name: "PALANTIR TECHNOLOGIES INC-A",
            // }
            defaultValue={passedStockInfo}
            getOptionSelected={(option, value) => {
                // console.log("object, value:", option, value);
                stockInfoHandle(value);
                tickerHandle(value.code);
                return option.name === value.name;
            }}
            getOptionLabel={(option) => `${option.code} | ${option.name}`}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="티커"
                    variant="outlined"
                    onChange={(ev, value) => {
                        console.log("value:", value);
                        if (
                            ev.target.value !== "" ||
                            ev.target.value !== null
                        ) {
                            onChangeHandle(ev.target.value);
                        }
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default StockAutoComplete3;

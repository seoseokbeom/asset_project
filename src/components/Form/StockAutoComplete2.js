import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

function StockAutoComplete2() {
    // useEffect(async () => {
    //     let top100Films = await axios.get(`/search/prefix/${userInput}`, {
    //         headers: {
    //             Authorization: `Bearer ${userState.loginInfo.access_token}`,
    //         },
    //     });
    // }, []);
    const [top100Films, setTop100Films] = useState([
        { title: "Witness for the Prosecution", year: 1957 },
        { title: "Das Boot", year: 1981 },
        { title: "The Kid", year: 1921 },
        { title: "Inglourious Basterds", year: 2009 },
    ]);
    // var top100Films = [
    //     { title: "Witness for the Prosecution", year: 1957 },
    //     { title: "Das Boot", year: 1981 },
    //     { title: "The Kid", year: 1921 },
    //     { title: "Inglourious Basterds", year: 2009 },
    // ];
    const [param, setParam] = useState("");
    useEffect(() => {
        setTop100Films((prev) => [...prev, { title: param, year: 1999 }]);
    }, [param]);

    const renderInputFunc = (params) => {
        console.log("params;", params);
        setParam(params);
        return <TextField {...params} label="Combo box" variant="outlined" />;
    };

    return (
        <div>
            <br />
            <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={renderInputFunc}
            />
        </div>
    );
}

export default StockAutoComplete2;

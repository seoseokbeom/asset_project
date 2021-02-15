import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

export default function ButtonBox({
    key,
    buttonText,
    buttonColor,
    setActiveButtonIndex,
    activeButtonIndex,
}) {
    const classes = useStyles();
    // const [activeIndex, setActiveIndex] = useState(false);

    // const primary = pink[500];
    return (
        <span className={classes.root}>
            {console.log(key)}
            <Button
                variant="contained"
                color={buttonColor}
                // onClick={() => {
                // console.log("onClick");
                // setActiveIndex(!activeIndex);
                // setActiveButtonIndex(key);
                // }}
            >
                {buttonText}
            </Button>
            {/* {activeButtonIndex !== key ? (
                <Button
                    variant="contained"
                    onClick={() => {
                        // console.log("onClick");
                        // setActiveIndex(!activeIndex);
                        setActiveButtonIndex(key);
                    }}
                >
                    {buttonText}
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        // console.log("onClick");
                        // setActiveIndex(!activeIndex);
                        setActiveButtonIndex(key);
                    }}
                >
                    {buttonText}
                </Button>
            )} */}
            {/*     
            <Button variant="contained" color="primary">
                Primary
            </Button>
            <Button variant="contained" color="secondary">
                Secondary
            </Button>
            <Button variant="contained" disabled>
                Disabled
            </Button>
            <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
            >
                Link
            </Button> */}
        </span>
    );
}

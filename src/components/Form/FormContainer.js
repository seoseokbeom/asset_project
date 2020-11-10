import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import Divider from "@material-ui/core/Divider";
// import Grid from "@material-ui/core/Grid";
// import KrwInput from "./KrwInput";
import BuySellModal from "./BuySellModal";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridGap: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "left",
        color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        marginBottom: theme.spacing(0),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));

export const FormContainer = ({ onSubmit, closeModal }) => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                새로운 매매 일지:
            </Typography>
            <br />
            <BuySellModal closeModal={closeModal} />
            {/* <KrwInput /> */}
        </div>
    );
};
export default FormContainer;

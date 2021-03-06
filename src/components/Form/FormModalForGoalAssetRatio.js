import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import FormHookSecond from "./FormHookSecond";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormHookForGoalAssetRatio from "./FormHookForGoalAssetRatio";
Modal.setAppElement("#root");
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: 0,
            padding: 0,
        },
    },
}));

function FormModalForGoalAssetRatio({
    portfolioId,
    userState,
    handleReRender,
    formType,
    buttonText,
    stockInfo,
}) {
    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleModalIsOpen = () => {
        setModalIsOpen((prev) => !prev);
    };
    useEffect(() => {
        console.log("formodal stockInfo: ", stockInfo);
        handleReRender();
    }, [modalIsOpen]);
    return (
        <div style={{ marginTop: "-18px", padding: 0, height: "10px" }}>
            <Button
                className={classes.root}
                variant="contained"
                // color="primary"
                onClick={() => setModalIsOpen(true)}
            >
                {buttonText}
            </Button>
            <br />
            <br />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                // style={{
                //     overlay: {
                //         backgroundColor: "grey",
                //     },
                //     content: {
                //         color: "orange",
                //     },
                // }}
                // shouldCloseOnOverlayClick={false}
            >
                <div>
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
                <FormHookForGoalAssetRatio
                    handleModalIsOpen={handleModalIsOpen}
                    portfolioId={portfolioId}
                    userState={userState}
                    formType={formType}
                    passedStockInfo={stockInfo}
                />
            </Modal>
        </div>
    );
}

export default FormModalForGoalAssetRatio;

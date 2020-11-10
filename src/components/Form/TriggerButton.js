import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
const Trigger = ({ triggerText, buttonRef, showModal }) => {
    return (
        <Fab color="primary" size="small" aria-label="add">
            <AddIcon ref={buttonRef} onClick={showModal} />
        </Fab>
        // <button
        //     className="btn btn-lg btn-danger center modal-button"
        //     ref={buttonRef}
        //     onClick={showModal}
        // >
        //     {triggerText}
        // </button>
    );
};
export default Trigger;

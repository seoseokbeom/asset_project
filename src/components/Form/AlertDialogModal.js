import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { GlobalContext } from "../../store/GlobalState";

export default function AlertDialogModal(param) {
    useEffect(() => {
        console.log("param.portfolio_Id:", param.portfolio_Id);
    }, [param.portfolio_Id]);
    useEffect(() => {
        console.log("userId4:", param.userId);
    }, [param.userId]);
    const { userState, userDispatch, stockDispatch } = useContext(
        GlobalContext
    );
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteAndClose = async () => {
        console.log("param.portfolio_Id3:", param.portfolio_Id);
        // console.log("userId:", userId);
        const result = await axios.delete(`/portfolio/${param.portfolio_Id}`, {
            headers: {
                Authorization: `Bearer ${userState.loginInfo.access_token}`,
            },
        });
        console.log("result:", result);
        // userId = [...userId];
        const newList = param.userId.filter(
            (item) => item !== param.portfolio_Id
        );
        // setUserId(newList);
        param.handleUserId(newList);
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                삭제
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"포트폴리오를 삭제하시겠습니까?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        포트폴리오 삭제시 포트폴리오에 등록된 데이터 모두
                        삭제됩니다.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteAndClose} color="primary">
                        삭제
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

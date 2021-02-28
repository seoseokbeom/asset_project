import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import KRWFormHooks from "./KRWFormHooks";
import Button from "@material-ui/core/Button";
Modal.setAppElement("#root");

function KRWFormModal({ portfolioId, userState, passedId }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleModalIsOpen = () => {
        setModalIsOpen((prev) => !prev);
    };
    // useEffect(() => {
    //     handleReRender();
    // }, [modalIsOpen]);
    return (
        <div className="App">
            <Button
                key={passedId}
                variant="contained"
                onClick={() => setModalIsOpen(true)}
            >
                추가
            </Button>
            {/* <button onClick={() => setModalIsOpen(true)}>추가</button> */}
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
                <KRWFormHooks
                    handleModalIsOpen={handleModalIsOpen}
                    passedId={passedId}
                    portfolioId={portfolioId}
                    userState={userState}
                />
            </Modal>
        </div>
    );
}

export default KRWFormModal;

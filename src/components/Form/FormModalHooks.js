import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import FormHookSecond from "./FormHookSecond";
Modal.setAppElement("#root");
function FormModalHooks({ portfolioId, userState, handleReRender }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleModalIsOpen = () => {
        setModalIsOpen((prev) => !prev);
    };
    useEffect(() => {
        handleReRender();
    }, [modalIsOpen]);
    return (
        <div className="App">
            <button onClick={() => setModalIsOpen(true)}>주식 등록</button>
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
                <FormHookSecond
                    handleModalIsOpen={handleModalIsOpen}
                    portfolioId={portfolioId}
                    userState={userState}
                />
            </Modal>
        </div>
    );
}

export default FormModalHooks;

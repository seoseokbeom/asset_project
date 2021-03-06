import React from "react";
import ReactDOM from "react-dom";
import { FormContainer } from "./FormContainer";
import FocusTrap from "focus-trap-react";
export const Modal = ({
    onClickOutside,
    onKeyDown,
    modalRef,
    buttonRef,
    closeModal,
    onSubmit,
    setRow,
    row,
}) => {
    return ReactDOM.createPortal(
        <FocusTrap>
            <aside
                tag="aside"
                role="dialog"
                tabIndex="-1"
                aria-modal="true"
                className="modal-cover"
                onClick={onClickOutside}
                onKeyDown={onKeyDown}
            >
                <div className="modal-area" ref={modalRef}>
                    {/* <div className="tmp" onClick={closeModal}> */}
                    <button
                        onClick={closeModal}
                        ref={buttonRef}
                        aria-label="Close Modal"
                        aria-labelledby="close-modal"
                        className="_modal-close"
                        /* style={{
                            position: "absolute",
                            left: "90%",
                            // top: "50%",
                            transform: "translate(-50%, 0%)",
                        }} */
                    >
                        <span id="close-modal" className="_hide-visual">
                            Close
                        </span>
                        {/* <svg className="_modal-close-icon" viewBox="0 0 40 40">
                            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                        </svg> */}
                    </button>
                    {/* </div> */}
                    <div className="modal-body">
                        <FormContainer
                            closeModal={closeModal}
                            onSubmit={onSubmit}
                            setRow={setRow}
                            row={row}
                        />
                    </div>
                </div>
            </aside>
        </FocusTrap>,
        document.body
    );
};

export default Modal;

import ModalPopup from "../Form/ModalPopup";

function PortfolioAdd({ row, setRow }) {
    const triggerText = "+";
    const onSubmit = (event) => {
        event.preventDefault(event);
        // console.log(event.target.name.value);
        // console.log(event.target);
    };

    return (
        <div>
            <ModalPopup
                row={row}
                setRow={setRow}
                triggerText={triggerText}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default PortfolioAdd;

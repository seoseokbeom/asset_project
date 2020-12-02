import ModalPopup from "../Form/ModalPopup";

function PortfolioAdd() {
    const triggerText = "+";
    const onSubmit = (event) => {
        event.preventDefault(event);
        console.log(event.target.name.value);
        console.log(event.target);
    };

    return (
        <div>
            <ModalPopup triggerText={triggerText} onSubmit={onSubmit} />
        </div>
    );
}

export default PortfolioAdd;

import React, { Fragment, useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { GlobalContext } from "../../store/GlobalState";

require("./StockAutoCompleteSearchBar.css");

function StockAutoCompleteSearchBar({}) {
    const { userState, userDispatch, stockDispatch } = useContext(
        GlobalContext
    );
    // const propTypes = {
    //     suggestions: PropTypes.instanceOf(Array),
    // };

    // const defaultProps = {
    //     suggestions: [],
    // };

    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState("");
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         // The active selection's index
    //         activeSuggestion: 0,
    //         // The suggestions that match the user's input
    //         filteredSuggestions: [],
    //         // Whether or not the suggestion list is shown
    //         showSuggestions: false,
    //         // What the user has entered
    //         userInput: "",
    //     };
    // }

    const onChange = async (e) => {
        const userInput = e.currentTarget.value;
        // const { suggestions } = this.props;
        setShowSuggestions(false);
        const suggestions = await axios.get(`/search/prefix/${userInput}`, {
            headers: {
                Authorization: `Bearer ${userState.loginInfo.access_token}`,
            },
        });
        console.log("suggestions.data.usaStocks:", suggestions.data.usaStocks);
        let usaStockSuggestions = [];
        suggestions.data.usaStocks.map((e) => {
            usaStockSuggestions.push(e["name"]);
        });
        console.log("usaStockSuggestions:", usaStockSuggestions);
        setFilteredSuggestions(usaStockSuggestions);

        setActiveSuggestion(0);
        setShowSuggestions(true);
        setUserInput(userInput);

        // setFilteredSuggestions(
        //     usaStockSuggestions.filter(
        //         (suggestion) =>
        //             suggestion.toLowerCase().indexOf(userInput.toLowerCase()) >
        //             -1
        //     )
        // );

        // Filter our suggestions that don't contain the user's input
        // const filteredSuggestions = suggestions.filter(
        //     (suggestion) =>
        //         suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        // );

        // this.setState({
        //     activeSuggestion: 0,
        //     filteredSuggestions,
        //     showSuggestions: true,
        //     userInput: e.currentTarget.value,
        // });
    };

    const onClick = (e) => {
        const userInput = e.currentTarget.value;
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput(userInput);

        // this.setState({
        //     activeSuggestion: 0,
        //     filteredSuggestions: [],
        //     showSuggestions: false,
        //     userInput: e.currentTarget.innerText,
        // });
    };

    const onKeyDown = (e) => {
        // const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setShowSuggestions(false);
            setUserInput(filteredSuggestions[activeSuggestion]);
            // this.setState({
            //     activeSuggestion: 0,
            //     showSuggestions: false,
            //     userInput: filteredSuggestions[activeSuggestion],
            // });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
            // this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestion(activeSuggestion + 1);
            // this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    // render() {
    //     const {
    //         onChange,
    //         onClick,
    //         onKeyDown,
    //         state: {
    //             activeSuggestion,
    //             filteredSuggestions,
    //             showSuggestions,
    //             userInput,
    //         },
    //     } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul class="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                        let className;

                        // Flag the active suggestion with a class
                        if (index === activeSuggestion) {
                            className = "suggestion-active";
                        }

                        return (
                            <li
                                className={className}
                                key={suggestion}
                                onClick={onClick}
                            >
                                {suggestion}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            suggestionsListComponent = (
                <div class="no-suggestions">
                    <em>No suggestions, you're on your own!</em>
                </div>
            );
        }
    }

    return (
        <Fragment>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
            />
            {suggestionsListComponent}
        </Fragment>
    );
    // }
}

export default StockAutoCompleteSearchBar;

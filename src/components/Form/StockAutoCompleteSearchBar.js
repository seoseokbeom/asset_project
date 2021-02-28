import React, { Fragment, useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { GlobalContext } from "../../store/GlobalState";

require("./StockAutoCompleteSearchBar.css");

function StockAutoCompleteSearchBar({
    tickerHandle,
    stockInfoHandle,
    stockInfo,
}) {
    const { userState, userDispatch, stockDispatch } = useContext(
        GlobalContext
    );
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState("");

    const onChange = async (e) => {
        const userInput = e.currentTarget.value;
        setShowSuggestions(false);
        const suggestions = await axios.get(`/search/prefix/${userInput}`, {
            headers: {
                Authorization: `Bearer ${userState.loginInfo.access_token}`,
            },
        });
        console.log("suggestions.data.usaStocks:", suggestions.data.usaStocks);
        let usaStockSuggestions = [];
        suggestions.data.usaStocks.map((e) => {
            usaStockSuggestions.push(`${e["code"]} | ${e["name"]}`);
        });
        let koreaStockSuggestions = [];
        suggestions.data.koreaStocks.map((e) => {
            koreaStockSuggestions.push(`${e["code"]} | ${e["name"]}`);
        });
        console.log("usaStockSuggestions:", usaStockSuggestions);
        console.log("koreaStockSuggestions:", koreaStockSuggestions);
        usaStockSuggestions
            ? setFilteredSuggestions(usaStockSuggestions)
            : setFilteredSuggestions(koreaStockSuggestions);
        // 여기서 axios return값인 stock information을 parent에게 건네줌
        stockInfoHandle(suggestions.data);

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
        console.log("userInput:", userInput);
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

    const SliceTicker = (str) => {
        var pos = str.lastIndexOf(" | ");
        var res = str.slice(0, pos).toLowerCase();
        return res;
    };

    const setParentTickerState = (str) => {
        var str2 = SliceTicker(str);
        tickerHandle(str2);
    };

    const onKeyDown = (e) => {
        // const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.key === "Enter") {
            setActiveSuggestion(0);
            setShowSuggestions(false);
            setUserInput(filteredSuggestions[activeSuggestion]);
            console.log("e.key enter:", filteredSuggestions[activeSuggestion]);
            // setParentTickerState(filteredSuggestions[activeSuggestion]);
            var pos = filteredSuggestions[activeSuggestion].lastIndexOf(" | ");
            var res = filteredSuggestions[activeSuggestion]
                .slice(0, pos)
                .toLowerCase();
            tickerHandle(res);

            console.log("stockInfo:", stockInfo);
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
                    <em>해당하는 티커가 없습니다.</em>
                </div>
            );
        }
    }

    return (
        <Fragment>
            <input
                className="ticker_auto_complete_bar"
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

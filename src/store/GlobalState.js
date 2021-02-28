import React, { createContext, useReducer, useEffect } from "react";
import { userReducer, stockReducer } from "./reducers";

// Initial State
export const initialState = {
    loginInfo: {
        data: "kakao",
        jsKey: "af45d260886da3efeecc059923fb619e",
        access_token: "",
        id: "",
        user: {},
    },
    portfolioIdList: [],
    portfolioInfo: [
        // {
        //     portfolioId: "ca875074-ffc1-401b-9550-54bd3abe5f2a",
        //     portfolioName: "test",
        //     updateTimestamp: 1605011442,
        // },
    ],
    activePortfolioId: "",
    krwCost: 3,
    usdCost: 0,
    krwRealTimeValue: 0,
    usdRealTimeValue: 0,
    krwTodayEarnValue: 0,
    usdTodayEarnValue: 0,
    rerender: 0,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [userState, userDispatch] = useReducer(userReducer, initialState);
    const [stockState, stockDispatch] = useReducer(stockReducer, initialState);
    return (
        <GlobalContext.Provider value={{ userState, userDispatch }}>
            {/* <GlobalContext.Provider
            value={{ userState, userDispatch, stockState, stockDispatch }}
        > */}
            {children}
        </GlobalContext.Provider>
    );
};

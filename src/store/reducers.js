import React, { useEffect, useContext } from "react";
import axios from "axios";
import produce from "immer";
import { GlobalContext } from "./GlobalState";

const stockAutoComplete = (res) => {
    axios.get("/search/prefix/005").then((res) => {
        console.log("/search/prefix/005:", res);
    });
};

// export const login_user = (state, res) =>
//     axios
//         .post("/user/login", {
//             socialType: "kakao",
//             socialToken: res.response.access_token,
//         })
//         .then((res) => {
//             console.log("res:", res);
//             if (res && res.status != 404) {
//                 console.log("response:", res);
//                 console.log("access_token:", res.data.accessToken);
//                 console.log("Login Successed!");

//                 // produce(state, (draft) => {
//                 //     draft.loginInfo.access_token = res.data.accessToken;
//                 //     draft.loginInfo.id = res.data.userId;
//                 // });
//                 localStorage.setItem("user", JSON.stringify(res.data));
//                 // const {
//                 //     userState,
//                 //     userDispatch,
//                 //     stockState,
//                 //     stockDispatch,
//                 // } = useContext(GlobalContext);
//                 // userDispatch({
//                 //     type: "userState_update",
//                 //     access_token: res.data.accessToken,
//                 // });
//                 console.log(
//                     'localStorage.getItem("user"):',
//                     localStorage.getItem("user")
//                 );
//             }
//             console.log("tets:", state.loginInfo);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// });

export const getuser = (state) => {
    return axios.get("/user", {
        headers: {
            Authorization: `Bearer ${state.loginInfo.access_token}`,
        },
    });
    // .then((res) => {
    //     console.log(res);
    // })
    // .catch((res) => {
    //     console.log(state.loginInfo.access_token, res);
    // });
};

export const handleLogout = (state) => {
    console.log("handlelogout excuted");
    axios
        .delete("/user/logout", {
            headers: {
                Authorization: `Bearer ${state.loginInfo.access_token}`,
            },
        })
        .then(() => {
            console.log("logout succeeded");
            // console.log("initialState.loginInfo:", initialState.loginInfo);
        })
        .catch(console.log("err"));
};

export const userReducer = (state, action) => {
    switch (action.type) {
        case "userState_update": {
            return produce(state, (draft) => {
                draft.loginInfo.access_token = action.access_token;
                draft.loginInfo.id = action.id;
            });
        }

        case "userState_portfolio_update": {
            return produce(state, (draft) => {
                console.log("action,action", action);
                draft.portfolioIdList = action.portfolios2;
                console.log("userState_portfolio_update:", state);
            });
        }

        case "krw_cost_update": {
            return {
                ...state,
                krwCost: state.krwCost + action.cost,
            };
        }
        case "krw_cost_zero": {
            return {
                ...state,
                krwCost: 0,
            };
        }

        case "krw_real_time_value_update": {
            return {
                ...state,
                krwRealTimeValue: state.krwRealTimeValue + action.payload,
            };
        }
        case "krw_real_time_value_zero": {
            return {
                ...state,
                krwRealTimeValue: 0,
            };
        }
        case "krw_today_value_update": {
            return {
                ...state,
                krwTodayEarnValue: state.krwTodayEarnValue + action.payload,
            };
        }
        case "krw_today_value_zero": {
            return {
                ...state,
                krwTodayEarnValue: 0,
            };
        }

        case "usd_cost_update": {
            return {
                ...state,
                usdCost: state.usdCost + action.cost,
            };
        }
        case "usd_cost_zero": {
            return {
                ...state,
                usdCost: 0,
            };
        }

        case "usd_real_time_value_update": {
            return {
                ...state,
                usdRealTimeValue: state.usdRealTimeValue + action.payload,
            };
        }
        case "usd_real_time_value_zero": {
            return {
                ...state,
                usdRealTimeValue: 0,
            };
        }
        case "usd_today_value_update": {
            return {
                ...state,
                usdTodayEarnValue: state.usdTodayEarnValue + action.payload,
            };
        }
        case "usd_today_value_zero": {
            return {
                ...state,
                usdTodayEarnValue: 0,
            };
        }

        case "trigger_rerender": {
            return {
                ...state,
                rerender: state.rerender + 1,
            };
        }

        // case "refresh_token": {
        //     return axios
        //         .post("/user/refresh", {
        //             refreshToken: action.refreshToken,
        //             userId: action.userId,
        //             accessToken: action.accessToken,
        //         })
        //         .then(console.log("refresh tocken succeeded"));
        // }

        // case "logout_user": {
        //     return produce(state, (draftState) => {
        //         draftState.loginInfo.access_token = "";
        //         draftState.loginInfo.id = "";
        //     });
        // }

        // case "delete_user": {
        //     return axios.delete("/user").then(console.log("delete succeeded"));
        // }

        // // Stock API
        // case "stock_auto_complete": {
        //     return axios
        //         .get("/search/prefix/0057", {
        //             headers: {
        //                 Authorization: `Bearer ${state.loginInfo.access_token}`,
        //             },
        //         })
        //         .then((res) => {
        //             console.log("/search/prefix/0057:", res);
        //         });
        // }

        // case "get_now_price": {
        //     return axios
        //         .get(`/stock/now/${action.code}`, {
        //             headers: {
        //                 Authorization: `Bearer ${state.loginInfo.access_token}`,
        //             },
        //         })
        //         .then((res) => {
        //             console.log("get_now_price:", res);
        //         });
        // }
        // case "get_now_prices": {
        //     return axios
        //         .get(`/stock/now`, {
        //             headers: {
        //                 Authorization: `Bearer ${state.loginInfo.access_token}`,
        //             },
        //         })
        //         .then((res) => {
        //             console.log("get_now_prices succeeded, res:", res);
        //         });
        // }
        // case "get_now_krw_usd": {
        //     return axios
        //         .get("/krwusd", {
        //             headers: {
        //                 Authorization: `Bearer ${state.loginInfo.access_token}`,
        //             },
        //         })
        //         .then((res) => {
        //             console.log("get_now_krw_usd:", res);
        //         });
        // }
        // // Portfolio API
        // case "create_portfolio": {
        //     return axios
        //         .post(
        //             "/portfolio",
        //             { name: action.payload },
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${state.loginInfo.access_token}`,
        //                 },
        //             }
        //         )
        //         .then((res) => {
        //             console.log(
        //                 "create_portfolio executed, portfolio Object:",
        //                 res
        //             );
        //         })
        //         .catch((err) => {
        //             console.log(
        //                 `state.loginInfo.access_token:${state.loginInfo.access_token}`
        //             );
        //             console.log("create_portfolio err:", err);
        //         });
        // }

        // case "get_portfolio_status": {
        //     return axios
        //         .get(`/portfolio/${action.portfolioId}/status`, {
        //             headers: {
        //                 Authorization: `Bearer ${state.loginInfo.access_token}`,
        //             },
        //         })
        //         .then((res) => {
        //             console.log("---", res);
        //         })
        //         .catch((res) => {
        //             console.log("err", res);
        //             console.log("${action.portfolioId}", action.portfolioId);
        //         });
        // }
    }
};

export const stockReducer = (state, action) => {
    debugger;
    switch (action.type) {
        // Stock API
        case "stock_auto_complete": {
            return axios
                .get("/search/prefix/0057", {
                    headers: {
                        Authorization: `Bearer ${state.loginInfo.access_token}`,
                    },
                })
                .then((res) => {
                    console.log("/search/prefix/0057:", res);
                });
        }

        case "get_now_price": {
            return axios
                .get(`/stock/now/${action.code}`, {
                    headers: {
                        Authorization: `Bearer ${state.loginInfo.access_token}`,
                    },
                })
                .then((res) => {
                    console.log("get_now_price:", res);
                });
        }
        case "get_now_prices": {
            return axios
                .get(`/stock/now`, {
                    headers: {
                        Authorization: `Bearer ${state.loginInfo.access_token}`,
                    },
                })
                .then((res) => {
                    console.log("get_now_prices succeeded, res:", res);
                });
        }
        case "get_now_krw_usd": {
            return axios
                .get("/krwusd", {
                    headers: {
                        Authorization: `Bearer ${state.loginInfo.access_token}`,
                    },
                })
                .then((res) => {
                    console.log("get_now_krw_usd:", res);
                });
        }

        default: {
            console.log("stockReducer err");
            return;
        }
    }
};

export const portfolioReducer = (state, action) => {
    switch (action.type) {
        // Portfolio API
        case "create_portfolio": {
            return axios
                .post(
                    "/portfolio",
                    { name: "test" },
                    {
                        headers: {
                            Authorization: `Bearer ${state.loginInfo.access_token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(
                        "create_portfolio executed, portfolio Object:",
                        res
                    );
                })
                .catch((err) => {
                    console.log(
                        `state.loginInfo.access_token:${state.loginInfo.access_token}`
                    );
                    // console.log(initialState);
                    console.log("err:", err);
                });
        }

        case "get_portfolio_status": {
            return axios.get(`/portfolio/${action.portfolioId}/status`, {
                headers: {
                    Authorization: `Bearer ${state.loginInfo.access_token}`,
                },
            });
        }
    }
};

import React, { useEffect } from "react";
import axios from "axios";

export const initialState = {
    loginInfo: {
        data: "kakao",
        jsKey: "af45d260886da3efeecc059923fb619e",
        access_token: "",
        id: "",
        user: {},
    },
    portfolioInfo: [
        {
            portfolioId: "ca875074-ffc1-401b-9550-54bd3abe5f2a",
            updateTimestamp: 1605011442,
        },
    ],
};

const stockAutoComplete = (res) => {
    axios.get("/search/prefix/005").then((res) => {
        console.log("/search/prefix/005:", res);
    });
};

const responseKaKao = (res) => {
    console.log("------------");
    console.log("------------");
    console.log("res:", res);
    initialState.loginInfo = {
        ...initialState,
        // data: res,
        access_token: res.response.access_token,
        id: res.profile.id,
    };
    // setLoginInfo({
    //     data: res,
    //     access_token: res.response.access_token,
    //     id: res.profile.id,
    // });
    console.log(JSON.stringify(initialState.loginInfo.data));
    console.log(JSON.stringify(initialState.loginInfo.access_token));
    // return;
    axios
        .post("/user/login", {
            socialType: "kakao",
            socialToken: res.response.access_token,
        })
        .then((res) => {
            console.log(res);
            if (res && res.status != 404) {
                console.log("response:", res);
                console.log("access_token:", res.data.accessToken);
                // const token = res.data.accessToken;
                console.log("Login Successed!");

                initialState.loginInfo = {
                    ...initialState.loginInfo,
                    // data: res,
                    access_token: res.data.accessToken,
                    id: res.data.userId,
                };
                localStorage.setItem("user", JSON.stringify(res.data));
                console.log(
                    'localStorage.getItem("user"):',
                    localStorage.getItem("user")
                );
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

const handleLogout = () => {
    console.log("handlelogout excuted");
    console.log(
        "initialState.loginInfo.access_token:",
        initialState.loginInfo.access_token
    );
    axios
        .delete("/user/logout", {
            headers: {
                Authorization: `Bearer ${initialState.loginInfo.access_token}`,
            },
        })
        .then((res) => {
            console.log(res);
            initialState.loginInfo = {
                ...initialState.loginInfo,
                access_token: "",
                id: "",
            };
            console.log("logout succeeded");
            console.log("initialState.loginInfo:", initialState.loginInfo);
        })
        .catch(console.log("err"));
};
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // User API
        case "getuser": {
            return axios
                .get("/user", {
                    headers: {
                        Authorization: `Bearer ${initialState.loginInfo.access_token}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                });
        }

        case "refresh_token": {
            return axios
                .post("/user/refresh", {
                    refreshToken: action.refreshToken,
                    userId: action.userId,
                    accessToken: action.accessToken,
                })
                .then(console.log("refresh tocken succeeded"));
        }
        case "login_user": {
            return responseKaKao(action.res);
        }

        case "logout_user": {
            return handleLogout();
        }
        case "delete_user": {
            return axios.delete("/user").then(console.log("delete succeeded"));
        }
        // Stock API
        case "stock_auto_complete": {
            return axios
                .get("/search/prefix/0057", {
                    headers: {
                        Authorization: `Bearer ${initialState.loginInfo.access_token}`,
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
                        Authorization: `Bearer ${initialState.loginInfo.access_token}`,
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
                        Authorization: `Bearer ${initialState.loginInfo.access_token}`,
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
                        Authorization: `Bearer ${initialState.loginInfo.access_token}`,
                    },
                })
                .then((res) => {
                    console.log("get_now_krw_usd:", res);
                });
        }
        // Portfolio API
        case "create_portfolio": {
            return axios
                .post(
                    "/portfolio",
                    { name: action.payload },
                    {
                        headers: {
                            Authorization: `Bearer ${initialState.loginInfo.access_token}`,
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
                        `initialState.loginInfo.access_token:${initialState.loginInfo.access_token}`
                    );
                    console.log("create_portfolio err:", err);
                });
        }

        case "get_portfolio_status": {
            return axios
                .get(`/portfolio/${action.portfolioId}/status`, {
                    headers: {
                        Authorization: `Bearer ${initialState.loginInfo.access_token}`,
                    },
                })
                .then((res) => {
                    console.log("---", res);
                })
                .catch((res) => {
                    console.log("err", res);
                    console.log("${action.portfolioId}", action.portfolioId);
                });
        }
    }
};

export const stockReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        // Stock API
        case "stock_auto_complete": {
            return axios
                .get("/search/prefix/0057", {
                    headers: {
                        Authorization: `Bearer ${initialState.loginInfo.access_token}`,
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
                        Authorization: `Bearer ${initialState.loginInfo.access_token}`,
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
                        Authorization: `Bearer ${initialState.loginInfo.access_token}`,
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
                        Authorization: `Bearer ${initialState.loginInfo.access_token}`,
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

export const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
        // Portfolio API
        case "create_portfolio": {
            return axios
                .post(
                    "/portfolio",
                    { name: "test" },
                    {
                        headers: {
                            Authorization: `Bearer ${initialState.loginInfo.access_token}`,
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
                        `initialState.loginInfo.access_token:${initialState.loginInfo.access_token}`
                    );
                    console.log("err:", err);
                });
        }

        case "get_portfolio_status": {
            return axios.get(`/portfolio/${action.portfolioId}/status`, {
                headers: {
                    Authorization: `Bearer ${initialState.loginInfo.access_token}`,
                },
            });
        }
    }
};

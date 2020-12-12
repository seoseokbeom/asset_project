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
};

const responseKaKao = (res) => {
    console.log("------------");
    console.log("------------");
    console.log("res:", res);
    initialState.loginInfo = {
        ...initialState,
        data: res,
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
                const token = res.data.accessToken;
                console.log("Login Successed!");

                initialState.loginInfo = {
                    ...initialState.loginInfo,
                    data: res,
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
                ...initialState,
                access_token: "",
            };
            // setLoginInfo({
            //     access_token: "",
            //     // id: "",
            //     // user: {},
            // });
        });
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
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

        case "login_user": {
            return responseKaKao(action.res);
            // return;
        }

        case "logout_user": {
            return handleLogout();
        }
    }
};

// export const

import { createStore } from "redux";

const initialState = {
    counter: 0,
    text: "",
    list: [],
};

// ACTION TYPE
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TODO_LIST = "ADD_TODO_LIST";

// 액션 생성 함수
function increase() {
    return {
        type: INCREASE,
    };
}

const decrease = () => ({
    type: DECREASE,
});

console.log("hello");

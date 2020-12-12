import React, { useRef, useReducer } from "react";
import { init, reducer } from "./reducers";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function Counter({ initialCount }) {
    const [state, dispatch] = useReducer(reducer, initialCount, init);
    return (
        <>
            Count: {state.count}
            <button
                onClick={() =>
                    dispatch({ type: "reset", payload: initialCount })
                }
            >
                Reset
            </button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
        </>
    );
}

function App() {
    return (
        <>
            <Counter initialCount={0} />
        </>
    );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./exercise";
// import { createStore } from "react";
// import { Provider } from "react-redux";
// import rootReducer from "./modules";
// const store = createStore(rootReducer);

{
    /* <Provider store={store}> */
}
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
// </Provider>,

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

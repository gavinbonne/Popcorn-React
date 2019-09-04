import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import * as Auth from "./Auth";

export default function configureStore() {
    const reducers = {
        auth: Auth.reducer
    };

    const middleware = [thunk];

    const rootReducer = combineReducers({
        ...reducers
    });

    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middleware))
    );
}

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/auth.reducer';
import snackBarReducer from "./reducers/snackBar.reducer";
import infocardReducer from "./reducers/infocard.reducer";
import engageReducer from "./reducers/engage.reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    authState: authReducer,
    snackBarState: snackBarReducer,
    infocardState: infocardReducer,
    engageState: engageReducer,
})


export default configureStore({
    reducer: rootReducer
}, composeWithDevTools);
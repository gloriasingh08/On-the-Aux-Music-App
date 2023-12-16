import {combineReducers} from "redux";
import musicReducer from "./music-reducer.js";

const reducers = combineReducers({
    musicReducer,
});

export default reducers;
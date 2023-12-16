import {createStore} from "redux";
import reducer from "../Reducers/index.js";

const store = createStore(reducer);

export default store;
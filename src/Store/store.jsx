import { createStore } from "redux";
import { reducer } from "../Todos/reducer";

export const store = createStore(reducer);

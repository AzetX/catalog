import { combineReducers } from "redux";
import { basketReducer } from "./productsBasketReducer.js"


export const rootReducer = combineReducers({
    productsBasket: basketReducer
})
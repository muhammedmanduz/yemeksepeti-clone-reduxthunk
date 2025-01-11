import { combineReducers, createStore, applyMiddleware } from "redux";
import cartReducer from "./reducers/productsReducer";
import restaurantReducer from "./reducers/restaurantReducer";
import productReducer from "./reducers/productsReducer";
import { thunk } from "redux-thunk";

//reducerlar birleştir
const rootReducer = combineReducers({
  product: productReducer,
  restaurant: restaurantReducer,
  cart: cartReducer,
});

//store i oluştur
const store = createStore(rootReducer, applyMiddleware);

/*
 * applyMiddleware herhangi bir arayazılımı redux'a dahil etmeye yarar.
 * biz burda thunk'u dahil etmek için kullancaz
 */

export default store;

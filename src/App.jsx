import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import { useDispatch } from "react-redux";
import api from "./utils/api";
import ActionTypes from "./redux/actionTypes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ActionTypes.REST_LOADING });

    api
      .get("/restaurants")
      .then((res) =>
        dispatch({ type: ActionTypes.REST_SUCCESS, payload: res.data })
      )
      .catch((err) => dispatch({ type: ActionTypes.REST_ERROR, payload: err }));
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

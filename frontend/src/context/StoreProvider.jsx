import React, { useReducer } from "react";
import storeReducer from "./storeReducer";
import storeContext from "./storeContext";
import { decode_token } from "../utils/index";

const initialState = {
  userInfo: decode_token(localStorage.getItem("crud_token")) || "",
  token: localStorage.getItem("crud_token") || "",
};

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialState);
  return (
    <storeContext.Provider value={{ store, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreProvider;

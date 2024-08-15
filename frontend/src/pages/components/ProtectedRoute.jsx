import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import storeContext from "../../context/storeContext";

const ProtectedRoute = ({ children }) => {
  const { store } = useContext(storeContext);

  if (store.userInfo) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

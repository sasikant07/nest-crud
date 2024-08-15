import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import storeContext from "../../context/storeContext";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { store, dispatch } = useContext(storeContext);

  const logout = () => {
    localStorage.removeItem("crud_token");
    dispatch({ type: "logout", payload: "" });
    navigate("/login");
  };

  return (
    <div className="w-full h-full p-4 bg-white">
      <div className="w-[80%] mx-auto h-full flex justify-between items-center">
        <Link to="/">CRUD</Link>
        <ul className="flex justify-center items-center gap-4">
          <li
            className={`px-2 py-[5px] ${
              pathname === "/user/post" ? "bg-indigo-500 text-white" : ""
            } rounded-md`}
          >
            <Link to="/user/post">My Post</Link>
          </li>
          <li
            className={`px-2 py-[5px] ${
              pathname === "/post/create" ? "bg-indigo-500 text-white" : ""
            } rounded-md`}
          >
            <Link to="/post/create">Create Post</Link>
          </li>
          {store.userInfo ? (
            <li className={`px-2 py-[5px] rounded-md`} onClick={logout}>
              <span className="cursor-pointer">Logout</span>
            </li>
          ) : (
            <li className={`px-2 py-[5px] rounded-md`}>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;

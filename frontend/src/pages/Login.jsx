import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { base_url } from "../utils/config";
import storeContext from "../context/storeContext";

const user = {
  email: "",
  password: "",
};

const Login = () => {
  const { dispatch } = useContext(storeContext);
  const navigate = useNavigate();
  const [state, setState] = useState(user);
  const [loader, setLoader] = useState(false);

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${base_url}/api/auth/user/login`,
        state
      );
      setLoader(false);
      localStorage.setItem("crud_token", data.token);
      toast.success(data.message);
      dispatch({ type: "login_success", payload: { token: data.token } });
      navigate("/post/all");
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
    setState(user);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-[370px] text-slate-600">
        <div className="bg-white h-full shadow-sm px-7 py-8 rounded-md">
          <h2 className="text-2xl font-semibold text-center">CRUD</h2>
          <p className="text-sm text-center mt-2 mb-4">
            Please login to your account and start the adventure
          </p>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandler}
                value={state.email || ""}
                type="email"
                name="email"
                id="email"
                placeholder="email"
                required
                className="px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo-500 overflow-hidden"
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandler}
                value={state.password || ""}
                type="password"
                name="password"
                id="password"
                placeholder="password"
                required
                className="px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo-500 overflow-hidden"
              />
            </div>
            <button
              type="submit"
              disabled={loader}
              className="bg-indigo-500 w-full hover:bg-indigo-600 text-white rounded-md px-7 py-[6px] text-md"
            >
              {loader ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

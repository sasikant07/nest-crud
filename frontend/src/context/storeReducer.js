import { decode_token } from "../utils";

const storeReducer = (state, action) => {
  const { type, payload } = action;
  if (type === "login_success" || type === "register_success") {
    state.userInfo = decode_token(payload.token);
    state.token = payload.token;
  }
  if (type === "logout") {
    state.userInfo = "";
    state.token = "";
  }
  return state;
};

export default storeReducer;

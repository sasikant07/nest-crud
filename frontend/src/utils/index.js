import { jwtDecode } from "jwt-decode";

export const decode_token = (token) => {
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const exp = new Date(decodedToken.exp * 1000);
      if (new Date() > exp) {
        localStorage.removeItem("crud_token");
        return "";
      } else {
        return decodedToken;
      }
    } catch (error) {
      return "";
    }
  } else {
    return "";
  }
};

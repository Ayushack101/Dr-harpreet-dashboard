import { reducer } from "./AuthReducer";

/* eslint-disable react/prop-types */
const { createContext, useReducer, useContext } = require("react");

const AuthContext = createContext(null);

const user = localStorage.getItem("Credentials")
  ? JSON.parse(localStorage.getItem("Credentials"))
  : null;

const INITIALSTATE = {
  user: user,
};

export const AuthContextProvider = ({ children }) => {
  const [state, authDispatch] = useReducer(reducer, INITIALSTATE);
  // console.log(state.user);
  return <AuthContext.Provider value={{ ...state, authDispatch }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

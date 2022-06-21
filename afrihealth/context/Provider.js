import { View, Text } from "react-native";
import React, { useReducer } from "react";
import globalReducer from "./reducers/globalReducer";
import themeReducer from "./reducers/themeReducer";
import { getRides } from "./actions/ride";

const defaultValues = {
  error: null,
  loading: false,
  data: {},
};

export const GlobalContext = React.createContext({
  rideState: defaultValues,
  themeState: {
    value: "light",
    mode: "light",
  },
  themeDispatch: () => {},
  rideDispatch: () => {},
});

const Provider = ({ children }) => {
  const [rideState, rideDispatch] = useReducer(globalReducer, defaultValues);
  const [themeState, themeDispatch] = useReducer(themeReducer, {
    mode: "default",
    value: "light",
  });

  React.useEffect(() => {
    getRides(rideDispatch);
  }, []);
  return (
    <GlobalContext.Provider
      value={{ themeState, themeDispatch, rideState, rideDispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Provider;

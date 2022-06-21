import React from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../context/Provider";

const Storage = () => {
  const { themeDispatch, rideState, rideDispatch } =
    React.useContext(GlobalContext);
  const colorScheme = useColorScheme();
  // Check the storage
  React.useEffect(() => {
    AsyncStorage.getItem("rides").then((data) => {
      if (data) {
        rideDispatch({
          type: "FETCHED_DATA",
          payload: JSON.parse(data),
        });
      }
    });
  }, []);
  //   Themes
  React.useEffect(() => {
    AsyncStorage.getItem("theme").then((val) => {
      if (val) {
        if (val === "default") {
          themeDispatch({
            type: "default",
            payload: colorScheme,
          });
        } else
          themeDispatch({
            type: val,
          });
      } else {
        themeDispatch({
          type: "default",
          payload: colorScheme,
        });
      }
    });
  }, [colorScheme]);
  return <></>;
};

export default Storage;

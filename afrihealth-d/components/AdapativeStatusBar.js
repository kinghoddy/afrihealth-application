import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import { Platform, StatusBar } from "react-native";
import { GlobalContext } from "../context/Provider";
import colors from "../theme/colors";

const AdaptiveStatusBar = ({ translucent = false }) => {
  const [focused, setFocused] = useState(false);
  const { themeState } = useContext(GlobalContext);
  useFocusEffect(
    React.useCallback(() => {
      // setFocused(true);
      StatusBar.setBarStyle(
        themeState.value === "dark" ? "light-content" : "dark-content"
      );
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor(
          colors(themeState.value).white[1] + (translucent ? "0" : "")
        );
        StatusBar.setTranslucent(true);
      }
      // return () => setFocused(false);
    }, [themeState])
  );

  React.useEffect(() => {
    // setFocused(true);
    StatusBar.setBarStyle(
      themeState.value === "dark" ? "light-content" : "dark-content"
    );
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(
        colors(themeState.value).white[1] + (translucent ? "0" : "")
      );
      StatusBar.setTranslucent(true);
    }
    // return () => setFocused(false);
  }, [themeState]);
  return <></>;
};

export default AdaptiveStatusBar;

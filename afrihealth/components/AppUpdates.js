import * as Updates from "expo-updates";
import React, { useState } from "react";

const appJson = require("../app.json");
const version = appJson.expo.version;

const AppUpdates = () => {
  React.useEffect(() => {
    (async () => {
      try {
        const res = await Updates.fetchUpdateAsync();
        if (res.isNew) {
          // Alert.alert("New update found", "Restart app to install");
          await Updates.reloadAsync();
          // Alert.alert("App updated in the background");
        }
      } catch (error) {
        console.log("Error", error.message);
      }
    })();
  }, []);
  return <></>;
};

export default AppUpdates;

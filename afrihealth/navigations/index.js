import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform } from "react-native";
import { GlobalContext } from "../context/Provider";
import Home from "../screens/Home";
import OrderScreen from "../screens/OrderScreen";
import colors from "../theme/colors";

const RootStack = createNativeStackNavigator();

const AppWrapper = () => {
  const { themeState } = React.useContext(GlobalContext);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        defaultScreenOptions={{}}
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors(themeState.value).white[1],
            borderBottomColor: colors(themeState.value).white[3],
            borderBottomWidth: 0.5,
          },

          contentStyle: {
            backgroundColor: colors(themeState.value).white[1],
          },
          headerTitleStyle: {
            color: colors(themeState.value).black[1],
          },
          headerTintColor:
            Platform.OS === "android"
              ? colors(themeState.value).black[1]
              : colors(themeState.value).blue.light,
        }}
      >
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Order" component={OrderScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;

import { Platform, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? moderateScale(35) : 0,
  },
});

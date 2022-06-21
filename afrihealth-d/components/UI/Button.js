import React from "react";
import {
  View,
  Platform,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import colors from "../../theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { moderateScale, scale, ScaledSheet } from "react-native-size-matters";
import { GlobalContext } from "../../context/Provider";

export function LinkButton({
  title,
  style = {},
  color = "blue",
  fontSize = 12,
  disabled,
  onPress = () => {},
}) {
  const { themeState } = React.useContext(GlobalContext);

  const styles = ScaledSheet.create({
    text: {
      fontSize: moderateScale(fontSize),
      fontWeight: "700",
      color: disabled ? "#777" : colors(themeState.value)[color].main,
    },
  });
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={{ ...styles.text, ...style }}>{title}</Text>
    </TouchableOpacity>
  );
}

export const IconButton = ({
  style = {},
  color = "dark",
  disabled,
  icon,
  bg = false,
  size = 24,
  containerStyles = {},
  onPress = () => {},
}) => {
  const { themeState } = React.useContext(GlobalContext);

  const styles = ScaledSheet.create({
    container: {
      alignSelf: "center",
      backgroundColor: bg
        ? colors(themeState.value)[color].main + (color === "dark" ? "2" : "4")
        : null,
      padding: "5@ms",
      borderRadius: 50,
    },
    text: {
      color: disabled ? "#777" : colors(themeState.value)[color].main,
    },
  });
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.3}
      style={{ ...styles.container, ...containerStyles }}
    >
      <MaterialIcons
        style={{ ...styles.text, ...style }}
        name={icon}
        size={size}
      />
    </TouchableOpacity>
  );
};

export default function Button({
  elevation = 4,
  onPress = () => {},
  disabled = false,
  title,
  loading,
  size,
  rounded = false,
  gutterBottom,
  style = {},
  fullWidth = false,
  translucent = false,
  color = "primary",
  variant = "contained",
  start,
  end,
}) {
  const { themeState } = React.useContext(GlobalContext);
  const styles = ScaledSheet.create({
    con: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        variant === "text" || variant === "outlined"
          ? null
          : translucent
          ? translucent === "dark"
            ? colors(themeState.value).white[3] + "2"
            : colors(themeState.value).black[3] + "2"
          : loading
          ? colors(themeState.value)[color].light
          : disabled
          ? colors(themeState.value).white[4]
          : colors(themeState.value)[color].main,
      borderRadius: rounded ? 30 : 10,
      elevation: variant === "text" ? 0 : elevation,
      paddingVertical: size === "small" ? 8 : "10@vs",
      paddingHorizontal: size === "small" ? "10@ms" : "18@ms",
      borderColor: colors(themeState.value)[color].main,
      borderWidth: variant === "outlined" ? 1 : 0,
      shadowColor: "#000",
      shadowRadius: elevation,
      marginBottom: gutterBottom,
      shadowOffset: {
        height: elevation / 2,
        width: 0,
      },
      shadowOpacity: variant === "text" ? 0 : 0.3,
      width: fullWidth ? "100%" : null,
      ...style,
    },
    text: {
      color: disabled
        ? variant === "text" || variant === "outlined"
          ? colors(themeState.value).black[1]
          : colors(themeState.value)[color].text
        : colors(themeState.value)[color][
            variant === "text" || variant === "outlined" ? "main" : "text"
          ],
      fontWeight: variant === "outlined" ? "700" : "400",
      fontSize: size === "small" ? "12@ms" : "16@ms",
    },
  });

  let Touch = (props) =>
    Platform.OS === "android" ? (
      <TouchableNativeFeedback {...props} />
    ) : (
      <TouchableOpacity {...props} activeOpacity={0.7} />
    );
  return (
    <TouchableOpacity style={styles.con} onPress={onPress} disabled={disabled}>
      {start}
      {loading && (
        <ActivityIndicator
          size="small"
          color={colors(themeState.value)[color].text}
          style={{ marginRight: 10 }}
        />
      )}
      <Text style={styles.text}>{title}</Text>
      {end}
    </TouchableOpacity>
  );
}

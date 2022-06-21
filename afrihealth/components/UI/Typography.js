import React from "react";
import { Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { GlobalContext } from "../../context/Provider";
import colors from "../../theme/colors";

const Typography = ({
  children,
  color = "dark",
  style,
  textCase,
  variant = "body1",
  align,
  gutterBottom,
  fontWeight = 400,
}) => {
  const { themeState } = React.useContext(GlobalContext);
  const fontSize = {
    h1: moderateScale(42),
    h2: moderateScale(37),
    h3: moderateScale(32),
    h4: moderateScale(27),
    h5: moderateScale(22),
    h6: moderateScale(17),
    body1: moderateScale(15),
    body2: moderateScale(12),
    caption: moderateScale(10),
  };
  const styles = StyleSheet.create({
    text: {
      fontSize: fontSize[variant],
      marginBottom: verticalScale(gutterBottom) || 0,
      color:
        colors(themeState.value)[color].main ||
        colors(themeState.value)[color][1] ||
        color,
      textTransform: textCase,
      alignItems: "center",
      textAlign: align,
      fontWeight: fontWeight.toString(),
      //   fontFamily: "Roboto-" + fontWeight.toString(),
    },
  });
  return (
    <Text adjustsFontSizeToFit style={{ ...styles.text, ...style }}>
      {children}
    </Text>
  );
};

export default Typography;

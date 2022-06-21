import { TextInput, View } from "react-native";
import React from "react";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import colors from "../../theme/colors";
import { GlobalContext } from "../../context/Provider";

const TextField = ({
  value,
  onChangeText,
  gutterBottom = 0,
  placeholder = "",
}) => {
  const { themeState } = React.useContext(GlobalContext);
  const height = 40;
  const styles = ScaledSheet.create({
    root: {
      backgroundColor: colors(themeState.value).white[3],
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      height: moderateScale(height),
      paddingHorizontal: "15@ms",
      marginBottom: moderateScale(gutterBottom),
    },
    input: {
      fontSize: "14@ms",
      flex: 1,
      color: colors(themeState.value).dark.main,
      height: "100%",
    },
  });
  return (
    <View style={styles.root}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors(themeState.value).textSecondary.main}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextField;

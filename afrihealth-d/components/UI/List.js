import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import colors from "../../theme/colors";
import Typography from "./Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalContext } from "../../context/Provider";

export const ListItemText = ({
  primary,
  divider,
  primaryProps = {},
  secondaryProps = {},
  secondary,
  style = {},
}) => {
  const { themeState } = React.useContext(GlobalContext);
  const styles = ScaledSheet.create({
    container: {
      borderBottomColor: colors(themeState.value).white[4],
      borderBottomWidth: divider ? 1 : 0,
      paddingVertical: 0,
      flexGrow: 1,
      ...style,
    },
  });
  return (
    <View style={styles.container}>
      {primary && (
        <Typography
          style={{ alignItems: "center" }}
          variant="body1"
          gutterBottom={2}
          {...primaryProps}
        >
          {primary}
        </Typography>
      )}
      {secondary && (
        <Typography variant="body2" color="textSecondary" {...secondaryProps}>
          {secondary}
        </Typography>
      )}
    </View>
  );
};
export const ListItem = ({
  link = false,
  divider = false,
  onPress,
  index = 1,
  style = {},
  children,
}) => {
  const { themeState } = React.useContext(GlobalContext);

  const styles = ScaledSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: "10@s",
      borderBottomColor: colors(themeState.value).white[4],
      borderBottomWidth: divider ? 1 : 0,
      paddingVertical: "10@vs",
    },
  });
  return (
    <View

    // layout={Layout.springify()}
    // exiting={SlideOutDown.delay(index * 100)}
    // entering={SlideInUp.delay(index * 100)}
    >
      <TouchableOpacity disabled={Boolean(!onPress)} onPress={onPress}>
        <View style={{ ...styles.root, ...style }}>
          {children}
          {link && (
            <MaterialIcons
              color={colors(themeState.value).white[5]}
              name="arrow-forward-ios"
              size={15}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const List = ({ style = {}, children }) => {
  const styles = ScaledSheet.create({
    flex: 1,
    paddingHorizontal: "20@ms",
    ...style,
  });
  return <View style={styles}>{children}</View>;
};

import { View, Text } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { MaterialIcons } from "@expo//vector-icons";
import Typography from "./UI/Typography";
import colors from "../theme/colors";
import { GlobalContext } from "../context/Provider";
import { date as dateFormatter } from "../utility";

const RideComp = ({ pickup, date, status, destination }) => {
  const { themeState } = React.useContext(GlobalContext);
  const styles = ScaledSheet.create({
    root: {
      borderRadius: 10,
      borderColor: colors(themeState.value).white[3],
      borderWidth: 1,
      paddingHorizontal: "10@ms",
      paddingVertical: "10@ms",
      marginBottom: "15@ms",
    },
    loc: {
      flexDirection: "row",
      paddingVertical: "5@ms",
      //   paddingHorizontal: "10@ms",
      marginLeft: "10@ms",
      borderLeftColor: colors(themeState.value).white[4],
      borderLeftWidth: 1,
    },
    pin: {
      left: "-10@ms",
    },
    status: {
      borderWidth: 1,
      padding: "10@ms",
      marginTop: "10@ms",
      borderColor: colors(themeState.value).primary.main,
      borderRadius: 10,
    },
  });
  return (
    <View style={styles.root}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Typography variant="h5" color="primary">
          New Ride
        </Typography>
        <Typography
          textCase="uppercase"
          variant="caption"
          color="textSecondary"
        >
          {dateFormatter(date)}
        </Typography>
      </View>
      <View style={styles.loc}>
        <MaterialIcons
          style={styles.pin}
          name="location-pin"
          color="#07f"
          size={24}
        />

        <Typography variant="body2">{pickup.description}</Typography>
      </View>
      <View style={styles.loc}>
        <MaterialIcons
          style={styles.pin}
          name="location-pin"
          color="#f00"
          size={24}
        />

        <Typography variant="body2">{destination.description}</Typography>
      </View>

      <View style={styles.status}>
        <Typography color="primary" variant="caption" gutterBottom={2}>
          Status
        </Typography>
        <Typography variant="body2" textCase="capitalize">
          {status || "Requested"}
        </Typography>
      </View>
    </View>
  );
};

export default RideComp;

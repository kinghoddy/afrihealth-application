import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Map from "../components/Map";
import { ScaledSheet } from "react-native-size-matters";
import Button, { IconButton } from "../components/UI/Button";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../theme/colors";
import Grid, { GridItem } from "../components/UI/Grid";
import { GlobalContext } from "../context/Provider";
import Typography from "../components/UI/Typography";
import { currencyFormatter } from "../utility";
import { getDatabase, ref, set, update } from "firebase/database";
import { app } from "../firebase";

const TripScreen = ({
  navigation,
  route: {
    params: { id },
  },
}) => {
  const { themeState, rideState, rideDispatch } =
    React.useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const styles = ScaledSheet.create({
    root: {
      flex: 1,
    },
    backBtn: {
      position: "absolute",
      top: "40@ms",
      left: "20@ms",
      zIndex: 100,
      backgroundColor: colors(themeState.value).white[1],
      borderRadius: 25,
      height: 50,
      width: 50,
      alignItems: "center",
      justifyContent: "center",
      elevation: 6,
      shadowColor: "#000",
      shadowRadius: 6,
      shadowOpacity: 0.1,
    },
    stepper: {
      paddingHorizontal: "20@ms",
      paddingVertical: "20@ms",
    },

    loading: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: 0,
      left: 0,
      height: "100%",
      zIndex: 100,
      width: "100%",
      backgroundColor: colors(themeState.value).white[1] + "a",
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
  });

  const startTrip = async () => {
    setLoading(true);
    const db = getDatabase(app);
    await update(ref(db, "rides/" + id), { status: "active" });
    setLoading(false);
  };
  const endTrip = async () => {
    setLoading(true);
    const db = getDatabase(app);
    await update(ref(db, "rides/" + id), { status: "ended" });
    setLoading(false);
    navigation.navigate("Home");
  };
  const { pickup, destination, cost, status } = rideState.data[id];
  return (
    <View style={styles.root}>
      <Map
        origin={{
          latitude: pickup?.lat,
          longitude: pickup?.lng,
        }}
        destination={{
          latitude: destination?.lat,
          longitude: destination?.lng,
        }}
        style={{ height: Dimensions.get("screen").height / 2 }}
      />
      <TouchableOpacity style={styles.backBtn} onPress={navigation.goBack}>
        <MaterialIcons
          name="arrow-back"
          size={26}
          color={colors(themeState.value).black[1]}
        />
      </TouchableOpacity>
      <View>
        <View style={styles.stepper}>
          {!status ? (
            <>
              <Typography gutterBottom={20}>Trip info</Typography>
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

                <Typography variant="body2">
                  {destination.description}
                </Typography>
              </View>

              <Grid>
                <GridItem>
                  <Typography variant="h6">{cost.duration?.text}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Duration
                  </Typography>
                </GridItem>
                <GridItem>
                  <Typography variant="h6">{cost.distance?.text}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Distance{" "}
                  </Typography>
                </GridItem>
              </Grid>
              <Typography
                style={{ marginTop: 20 }}
                variant="body2"
                color="textSecondary"
              >
                Trip cost
              </Typography>
              <Typography variant="h5" fontWeight={700} gutterBottom={15}>
                {currencyFormatter(cost?.price)}
              </Typography>
              <Button
                style={{ marginTop: 20 }}
                onPress={startTrip}
                title="Start Trip"
              />
            </>
          ) : (
            <>
              <Typography color="textSecondary" variant="body2">
                Status
              </Typography>
              <Typography
                textCase="uppercase"
                color="primary"
                variant="h6"
                gutterBottom={5}
              >
                In transit
              </Typography>

              <Typography gutterBottom={20}>Trip info</Typography>
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

                <Typography variant="body2">
                  {destination.description}
                </Typography>
              </View>
              <Button
                style={{ marginTop: 20 }}
                onPress={endTrip}
                title="End Trip"
              />
            </>
          )}
        </View>

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator
              size="large"
              color={colors(themeState.value).primary.light}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default TripScreen;
